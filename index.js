import { createRequire } from 'node:module'
import { spawn } from 'node:child_process'
import { appendFileSync, mkdirSync, readFileSync, readdirSync, statSync, unlinkSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { collectHot, collectSearch, collectTrend } from './trend.js'

// 插件自身所在目录与 node_modules 根：移动端要扫 package.json 找 dsh.mobile，
// 日志也要落在插件目录里。**必须定义在所有引用它们的常量之前**——
// 之前把 MOBILE_LOG 写在 SELF_DIR 前面，const 的暂时性死区直接让整个插件加载失败
// （表现为所有路由 404/405，2026-11-16 踩到）。
const SELF_DIR = path.dirname(fileURLToPath(import.meta.url))
const NODE_MODULES_DIR = path.resolve(SELF_DIR, '..')

const CHANNEL = '/dsh-plugins-ui-rpc'

// ── 移动端（P2）─────────────────────────────────────────────
// 服务器上没有任何图形界面可以确认身份，App 也没法把 cookie 注入 WKWebView，
// 所以用一个「一次性 token」：App 用自己的 cookie 换一个 5 分钟有效的短令牌，
// 再把令牌拼进 WebView 的 URL。token 只存内存，用完/过期即弃。
const MOBILE_CHANNEL = '/dsh-plugin-panel/mobile'
const MOBILE_TTL_MS = 5 * 60 * 1000
const mobileTokens = new Map()

// 极简限流：同一来源 IP 每分钟最多换 10 次 token。
// 因为换 token 的口子不能走 DSH 的认证（Host 校验会挡掉局域网 IP），
// 所以至少要靠频率把它从「无限开放」收紧到「难以滥用」。
const mintBuckets = new Map()

// 移动端请求日志。这个插件没有 logger 机制，而 Tailscale 那条路径在本机观测不到
// （开发机没装 Tailscale），只能把收到的请求写进文件事后看。
const MOBILE_LOG = path.join(SELF_DIR, '.mobile.log')

function mobileLog(line) {
  try { appendFileSync(MOBILE_LOG, `${new Date().toISOString()} ${line}\n`) } catch { /* 写不了就算了 */ }
}

function allowMint(req) {
  const ip = String(req.socket?.remoteAddress ?? 'unknown')
  const now = Date.now()
  const windowStart = now - 60_000
  const hits = (mintBuckets.get(ip) ?? []).filter((t) => t > windowStart)
  if (hits.length >= 10) {
    mintBuckets.set(ip, hits)
    return false
  }
  hits.push(now)
  mintBuckets.set(ip, hits)
  // 顺手清理过期的 bucket，避免 Map 无限增长
  if (mintBuckets.size > 64) {
    for (const [key, list] of mintBuckets) {
      if (list.every((t) => t <= windowStart)) mintBuckets.delete(key)
    }
  }
  return true
}

function mintMobileToken() {
  const token = Array.from({ length: 32 }, () =>
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
      [Math.floor(Math.random() * 64)]).join('')
  mobileTokens.set(token, Date.now() + MOBILE_TTL_MS)
  // 顺手清掉过期的，避免 Map 无限增长
  const now = Date.now()
  for (const [k, exp] of mobileTokens) if (exp < now) mobileTokens.delete(k)
  return token
}

function mobileTokenValid(token) {
  if (typeof token !== 'string' || token.length !== 32) return false
  const exp = mobileTokens.get(token)
  if (exp === undefined) return false
  if (exp < Date.now()) { mobileTokens.delete(token); return false }
  return true
}
const MAX_SOURCE_BYTES = 1_200_000
const MAX_FILES = 40
const MAX_DOC_CHARS = 2400
const MAX_COUNT_BATCH = 40
const moduleTools = new Map()

export function apply(ctx) {
  ctx.inject(['connection', 'webServer', 'tools', 'pluginManager'], (scoped) => {
    const tools = scoped.tools
    const pluginManager = scoped.pluginManager
    scoped.effect(() => registerDetailRpc(scoped, { tools, pluginManager }), 'plugin-canvas: detail rpc')
    // 移动端：一次性 token + 移动版页面 + 聚合接口
    scoped.effect(() => registerMobile(scoped, { pluginManager }), 'plugin-canvas: mobile routes')
  })
}

// ── 移动端路由 ────────────────────────────────────────────────
// 三条路径：
//   POST /dsh-plugin-panel/mobile/token        用 cookie 换一次性 token
//   GET  /dsh-plugin-panel/mobile?mt=<token>   移动版页面（HTML，数据服务端直出）
//   GET  /dsh-plugin-panel/mobile/list?mt=     聚合接口（哪些插件声明了 dsh.mobile）
//
// 为什么移动页面用服务端直出而不是前端 fetch：
// WKWebView 拿不到 App 的 cookie，页面里的 fetch 会被 requestRejection 挡住。
// 直出可以完全避开这个问题，页面里不需要任何跨域请求。
const MOBILE_PAGE_CSS = `
:root{--bg:#fff;--fg:#1c1c1e;--fg2:#6b7280;--line:#e5e7eb;--accent:#147a5e;--card:#f7f8f9}
@media (prefers-color-scheme:dark){:root{--bg:#000;--fg:#f2f2f7;--fg2:#8e8e93;--line:#2c2c2e;--card:#1c1c1e}}
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
body{margin:0;background:var(--bg);color:var(--fg);font:15px/1.5 -apple-system,BlinkMacSystemFont,"SF Pro Text",system-ui,sans-serif;padding-bottom:env(safe-area-inset-bottom)}
header{position:sticky;top:0;z-index:2;background:var(--bg);border-bottom:.5px solid var(--line);padding:14px 16px;display:flex;align-items:baseline;gap:8px}
header h1{margin:0;font-size:17px;font-weight:600}
header .count{color:var(--fg2);font-size:13px}
main{padding:8px 12px 24px}
.item{background:var(--card);border-radius:12px;margin:8px 0;overflow:hidden}
.item summary{list-style:none;cursor:pointer;padding:14px 16px;display:flex;align-items:center;gap:10px;min-height:44px}
.item summary::-webkit-details-marker{display:none}
.item .name{flex:1;min-width:0;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.item .ver{color:var(--fg2);font-size:12px;font-variant-numeric:tabular-nums}
.item[open] summary{border-bottom:.5px solid var(--line)}
.detail{padding:12px 16px 16px;color:var(--fg2);font-size:13px}
.detail p{margin:0 0 8px}
.detail a{color:var(--accent);text-decoration:none}
.empty{padding:48px 24px;text-align:center;color:var(--fg2)}
.note{margin:16px 12px 0;padding:12px;border-radius:10px;background:var(--card);color:var(--fg2);font-size:12px}
`

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;').replaceAll("'", '&#39;')
}

async function collectBundles(pluginManager) {
  if (!pluginManager || typeof pluginManager.listBundles !== 'function') return []
  try {
    const bundles = await pluginManager.listBundles()
    return Array.isArray(bundles) ? bundles : []
  } catch { return [] }
}

/**
 * 直接扫 node_modules 读每个插件的 package.json，挑出声明了 dsh.mobile 的。
 *
 * 为什么不用 `pluginManager.listBundles()`：它返回的是「安装清单」视图
 * （name / version / rows / removable / availability），**不含 dsh 字段**，
 * 判断不了某个插件有没有声明移动端。读文件是唯一拿得到 `dsh.mobile` 的途径，
 * 而且不依赖 plugin-manager 的内部实现，升级 DSH 也不会坏。
 */
function readMobileManifests() {
  const out = []
  const seen = new Set()

  const consider = (dir, fallbackName) => {
    try {
      const pkg = JSON.parse(readFileSync(path.join(dir, 'package.json'), 'utf8'))
      const mobile = pkg?.dsh?.mobile
      if (!mobile || typeof mobile !== 'object') return
      const name = typeof pkg.name === 'string' && pkg.name ? pkg.name : fallbackName
      if (!name || seen.has(name)) return
      seen.add(name)
      // **必须带上 path / schema**：App 侧解析要求 kind=web 有 path、kind=native 有 schema，
      // 少一个字段整条就会被判为「声明无效」并过滤掉，表现为「这台电脑上没有支持手机端的插件」
      // （2026-11-16 踩到——聚合接口只回了 module/title/kind/version）。
      out.push({
        module: name,
        title: typeof mobile.title === 'string' && mobile.title ? mobile.title : name,
        kind: mobile.kind === 'native' ? 'native' : 'web',
        version: Number(mobile.version) || 1,
        path: typeof mobile.path === 'string' && mobile.path ? mobile.path : undefined,
        schema: typeof mobile.schema === 'string' && mobile.schema ? mobile.schema : undefined,
      })
    } catch { /* 坏包/无 package.json：跳过，不影响其它插件 */ }
  }

  try {
    for (const entry of readdirSync(NODE_MODULES_DIR, { withFileTypes: true })) {
      if (!entry.isDirectory() || entry.name.startsWith('.')) continue
      const full = path.join(NODE_MODULES_DIR, entry.name)
      if (entry.name.startsWith('@')) {
        // scope 包：@scope/pkg
        try {
          for (const sub of readdirSync(full, { withFileTypes: true })) {
            if (sub.isDirectory()) consider(path.join(full, sub.name), `${entry.name}/${sub.name}`)
          }
        } catch { /* 跳过不可读的 scope */ }
      } else {
        consider(full, entry.name)
      }
    }
  } catch { /* node_modules 不可读：返回空列表 */ }

  return out
}

function renderMobilePage(bundles) {
  const rows = bundles.map((bundle) => {
    const name = escapeHtml(bundle.name)
    const version = escapeHtml(bundle.version ?? '')
    const summary = escapeHtml(bundle.rows?.[0]?.summary ?? '')
    const repo = typeof bundle.repo === 'string' ? bundle.repo : ''
    const removable = bundle.removable === false ? '' : ''
    return `<details class="item">`
      + `<summary><span class="name">${name}</span>`
      + `<span class="ver">${version}</span></summary>`
      + `<div class="detail">`
      + (summary ? `<p>${summary}</p>` : '<p>（这个插件没有写简介）</p>')
      + (repo ? `<a href="${escapeHtml(repo)}" target="_blank" rel="noreferrer">打开仓库</a>` : '')
      + removable
      + `</div></details>`
  }).join('\n')

  return `<!doctype html>
<html lang="zh"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>插件</title><style>${MOBILE_PAGE_CSS}</style>
</head><body>
<header><h1>插件</h1><span class="count">${bundles.length}</span></header>
<main>${rows || '<p class="empty">还没有安装任何插件</p>'}</main>
<p class="note">这是插件的移动版页面（P2 验证版）。桌面端的完整管理在右侧栏。</p>
</body></html>`
}

function registerMobile(ctx, services) {
  return ctx.webServer.register({
    kind: 'prefix',
    path: MOBILE_CHANNEL,
    handler: async (req, res) => {
      const url = new URL(req.url ?? '/', 'http://127.0.0.1')
      const send = (status, body, type = 'text/plain; charset=utf-8') => {
        res.writeHead(status, { 'content-type': type, 'cache-control': 'no-store' })
        res.end(body)
      }

      // ① 换 token。
      //
      // **不能走 `requestRejection`**：App 连的是局域网 IP（如 192.168.1.18:3091），
      // DSH 的 `isTrustedApiRequest` 只信任 loopback / trustedHosts / bind 地址，
      // 三个都不满足 → 403 → App 显示「需要先连接到电脑」（2026-11-16 实测）。
      // 我们的 /dsh-pocket-ios/* 端点是靠免认证白名单绕开的，这里同理。
      //
      // 安全性用「限流 + token 短期」兜底：token 只用于打开面板（面板里目前只有
      // 插件列表这一种只读数据），5 分钟过期、只存内存。
      if (url.pathname === `${MOBILE_CHANNEL}/token`) {
        mobileLog(`token method=${req.method} host=${req.headers.host} remote=${req.socket?.remoteAddress} ua=${String(req.headers['user-agent'] ?? '').slice(0, 50)}`)
        if (req.method !== 'POST') return send(405, 'method not allowed')
        if (!allowMint(req)) return send(429, 'too many requests')
        return send(200, JSON.stringify({ token: mintMobileToken(), expiresIn: MOBILE_TTL_MS / 1000 }),
          'application/json; charset=utf-8')
      }

      // ② 其余两条都要一次性 token（WebView 带不上 cookie）
      const token = url.searchParams.get('mt')
      if (!mobileTokenValid(token)) return send(401, '请从 DSH Pocket App 内打开')

      if (url.pathname === `${MOBILE_CHANNEL}/list`) {
        return send(200, JSON.stringify({ version: 1, plugins: readMobileManifests() }),
          'application/json; charset=utf-8')
      }
      if (url.pathname === MOBILE_CHANNEL) {
        mobileLog(`page host=${req.headers.host} remote=${req.socket?.remoteAddress}`)
        const bundles = await collectBundles(services.pluginManager)
        return send(200, renderMobilePage(bundles), 'text/html; charset=utf-8')
      }
      mobileLog(`unmatched path=${url.pathname} method=${req.method} host=${req.headers.host}`)
      return send(404, 'not found')
    },
  })
}

function registerDetailRpc(ctx, services) {
  return ctx.webServer.register({
    kind: 'prefix',
    path: CHANNEL,
    handler: async (req, res) => {
      const rejection = ctx.connection.requestRejection(req)
      if (rejection !== undefined) {
        res.statusCode = rejection
        res.end()
        return
      }
      if (req.method !== 'POST') {
        res.statusCode = 404
        res.end('not found')
        return
      }
      const mediaType = String(req.headers['content-type'] ?? '').split(';', 1)[0].trim().toLowerCase()
      if (mediaType !== 'application/json') {
        res.statusCode = 415
        res.end('content type must be application/json')
        return
      }
      let body
      try {
        body = await readJson(req)
      } catch (error) {
        res.statusCode = 400
        res.end(error instanceof Error ? error.message : 'invalid body')
        return
      }
      const record = body && typeof body === 'object' ? body : {}
      const rpcId = typeof record.rpcId === 'string' ? record.rpcId : ''
      const method = typeof record.method === 'string' ? record.method : ''
      if (!rpcId || !method) {
        res.statusCode = 400
        res.end('invalid client-request envelope')
        return
      }
      let result
      try {
        if (method === 'detail') result = { ok: true, value: await readDetail(services, record.payload) }
        else if (method === 'counts') result = { ok: true, value: countTools(services, record.payload) }
        else if (method === 'facts') result = { ok: true, value: readFacts(record.payload) }
        else if (method === 'reveal') result = { ok: true, value: revealPackage(record.payload) }
        else if (method === 'trend') result = { ok: true, value: await readTrend() }
        else if (method === 'hot') result = { ok: true, value: await readHot() }
        else if (method === 'search') result = { ok: true, value: await readSearch(record.payload) }
        else if (method === 'diagnose') {
          const entries = Array.isArray(record.payload && record.payload.plugins) ? record.payload.plugins.length : 0
          writeDiagnoseLog(`diagnose called with ${entries} plugins`)
          const value = diagnoseAll(services, record.payload)
          const keys = Object.keys(value || {}).length
          const bad = Object.values(value || {}).filter((v) => v && v.level === 'bad').length
          const warn = Object.values(value || {}).filter((v) => v && v.level === 'warn').length
          writeDiagnoseLog(`diagnose done: ${keys} results, bad=${bad} warn=${warn}`)
          result = { ok: true, value }
        }
        else throw new Error('Unknown detail method.')
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error)
        result = { ok: false, error: { code: 'plugin-canvas/detail', message: message.slice(0, 500), details: {} } }
      }
      res.statusCode = 200
      res.setHeader('content-type', 'application/json; charset=utf-8')
      res.setHeader('cache-control', 'no-store')
      res.end(JSON.stringify({ type: 'server-response', rpcId, result }))
    },
  })
}

async function readDetail(services, payload) {
  const input = payload && typeof payload === 'object' ? payload : {}
  const moduleName = typeof input.moduleName === 'string' ? input.moduleName : ''
  const entryId = typeof input.entryId === 'string' ? input.entryId : ''
  const language = typeof input.language === 'string' ? input.language : 'zh'
  const tools = toolsForModule(listTools(services.tools), moduleName)
  const located = locatePackage(moduleName)
  const manifest = located ? readManifest(located.root) : null
  const bundle = await findBundle(services.pluginManager, moduleName, entryId, manifest && manifest.name)
  const document = await readDocument(services.pluginManager, bundle && bundle.name, language)
  return {
    summary: manifest && manifest.summary ? manifest.summary : '',
    packageDescription: manifest && manifest.description ? manifest.description : '',
    bundleName: bundle && bundle.name ? bundle.name : '',
    version: bundle && bundle.version ? bundle.version : (manifest && manifest.version) || '',
    source: bundle && bundle.source ? bundle.source : '',
    official: bundle ? bundle.official === true : false,
    document,
    tools,
    toolNote: tools.length ? '' : '没有在这个插件的代码里对上已注册、会交给 AI 的工具。',
  }
}

function revealPackage(payload) {
  const input = payload && typeof payload === 'object' ? payload : {}
  const moduleName = typeof input.moduleName === 'string' ? input.moduleName : ''
  const source = typeof input.source === 'string' ? input.source : ''
  const located = locatePackage(moduleName)
  const dir = (located && located.root) || directoryFromSource(source)
  if (!dir) throw new Error('找不到这个插件的目录。')
  const command = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'explorer' : 'xdg-open'
  const child = spawn(command, [dir], { detached: true, stdio: 'ignore' })
  child.on('error', () => {})
  child.unref()
  return { path: dir }
}

function directoryFromSource(source) {
  const raw = String(source || '')
  const at = raw.lastIndexOf('@')
  const text = (at >= 0 ? raw.slice(at + 1) : raw).replace(/^link:/, '')
  if (!text || text.startsWith('http')) return ''
  try {
    const file = text.startsWith('file:') ? fileURLToPath(text) : text
    if (!file.startsWith('/')) return ''
    const stat = statSync(file)
    const dir = stat.isDirectory() ? file : path.dirname(file)
    return packageRoot(dir)
  } catch {
    return ''
  }
}

function trendCacheFile() {
  const profile = process.env.DSH_PROFILE_DIR || path.join(process.env.HOME || '', '.dsh/profiles/desktop')
  return path.join(profile, '.plugin-panel', 'trend.json')
}

function readTrendCache() {
  try {
    return JSON.parse(readFileSync(trendCacheFile(), 'utf8'))
  } catch {
    return null
  }
}

function writeTrendCache(value) {
  try {
    const file = trendCacheFile()
    mkdirSync(path.dirname(file), { recursive: true })
    writeFileSync(file, JSON.stringify(value))
  } catch {
    /* the chart still renders without a cache */
  }
}

const memo = new Map()

/** Keep one in-process result briefly; the on-disk archive is the real cache. */
async function withMemo(key, ttlMs, run) {
  const hit = memo.get(key)
  if (hit && Date.now() - hit.at < ttlMs) return hit.value
  const value = await run()
  memo.set(key, { at: Date.now(), value })
  return value
}

function readTrend() {
  return withMemo('trend', 5 * 60 * 1000, () => collectTrend(readTrendCache, writeTrendCache))
}

function hotCacheFile() {
  const profile = process.env.DSH_PROFILE_DIR || path.join(process.env.HOME || '', '.dsh/profiles/desktop')
  return path.join(profile, '.plugin-panel', 'hot.json')
}

function readHotCache() {
  try {
    return JSON.parse(readFileSync(hotCacheFile(), 'utf8'))
  } catch {
    return null
  }
}

function writeHotCache(value) {
  try {
    const file = hotCacheFile()
    mkdirSync(path.dirname(file), { recursive: true })
    writeFileSync(file, JSON.stringify(value))
  } catch {
    /* ranking still renders without a cache */
  }
}

function readHot() {
  return withMemo('hot', 5 * 60 * 1000, () => collectHot(readHotCache, writeHotCache, 7))
}

function searchCacheFile() {
  const profile = process.env.DSH_PROFILE_DIR || path.join(process.env.HOME || '', '.dsh/profiles/desktop')
  return path.join(profile, '.plugin-panel', 'search-index.json')
}

function readSearchCache() {
  try {
    return JSON.parse(readFileSync(searchCacheFile(), 'utf8'))
  } catch {
    return null
  }
}

function writeSearchCache(value) {
  try {
    const file = searchCacheFile()
    mkdirSync(path.dirname(file), { recursive: true })
    writeFileSync(file, JSON.stringify(value))
  } catch {
    /* search still works without the cache */
  }
}

function readSearch(payload) {
  const input = payload && typeof payload === 'object' ? payload : {}
  const query = typeof input.query === 'string' ? input.query : ''
  const sort = input.sort === 'new' ? 'new' : 'hot'
  const category = typeof input.category === 'string' ? input.category : ''
  const checkVersion = input.refresh === true
  const offset = Number.isFinite(Number(input.offset)) ? Math.max(0, Math.floor(Number(input.offset))) : 0
  return collectSearch(readSearchCache, writeSearchCache, query, 100, sort, { category, checkVersion, offset })
}

/**
 * 元信息与运行时体检。
 *
 * 每条检查都对应一个真实会出问题的后果（显示成包名、详情空白、图标是灰方块、
 * 面板 405 等），`fix` 是给 AI 直接执行的一句话改法。
 */
/** 体检的调用日志，写在 profile 下的 .plugin-panel/diagnose.log，便于排查接口是否被调用。 */
function writeDiagnoseLog(line) {
  try {
    const profile = process.env.DSH_PROFILE_DIR || path.join(process.env.HOME || '', '.dsh/profiles/desktop')
    const dir = path.join(profile, '.plugin-panel')
    mkdirSync(dir, { recursive: true })
    writeFileSync(path.join(dir, 'diagnose.log'), `${new Date().toISOString()} ${line}\n`, { flag: 'a' })
  } catch { /* 诊断日志失败不影响体检 */ }
}

function diagnosePackage(root, moduleName) {
  const items = []
  const add = (level, label, message, fix) => items.push({ level, label, message, fix })
  const readFile = (rel) => {
    try { return readFileSync(path.join(root, rel), 'utf8') } catch { return null }
  }
  const exists = (rel) => {
    try { return statSync(path.join(root, rel)).isFile() } catch { return false }
  }
  const readJson = (rel) => {
    const text = readFile(rel)
    if (!text) return null
    try { return JSON.parse(text) } catch { return null }
  }

  const manifest = readJson('package.json')
  if (!manifest) {
    add('bad', 'package.json', '读不到或不是合法 JSON', '修复 package.json 的 JSON 语法')
    return items
  }
  const pkgName = typeof manifest.name === 'string' ? manifest.name : ''
  const dsh = manifest.dsh && typeof manifest.dsh === 'object' ? manifest.dsh : {}
  const isBundle = Boolean(dsh.bundle && dsh.bundle.patch)
  const isUi = Boolean(dsh.client)

  // 1) 加载行。只有自带 patch 的 bundle 才需要，靠别的 bundle 插入的行本来就没有。
  if (isBundle) {
    const patchRel = dsh.bundle.patch
    if (!exists(patchRel)) {
      add('bad', '加载行', `dsh.bundle.patch 指向的 ${patchRel} 不存在`, `创建 ${patchRel}`)
    } else {
      const patchText = readFile(patchRel) || ''
      const m = patchText.match(/^\s*name:\s*(.+)$/m)
      const patchName = m ? m[1].trim().replace(/^['"]|['"]$/g, '') : ''
      // name 是模块说明符：写包名（可以是别人的包，bundle 常这样插入）都正常；
      // 写相对路径才会让宿主找不到包根、读不到 locale。
      if (patchName.startsWith('./') || patchName.startsWith('../')) {
        add('warn', '加载行', `patch name 是相对路径「${patchName}」，宿主会读不到包根的 locale`,
          `把 ${patchRel} 的 name 改成包名 ${pkgName}`)
      } else {
        add('ok', '加载行', patchName || '(未写 name)', '')
      }
    }
  }

  // 2) 界面相关项只对 UI 插件要求。纯 host 插件不显示图标、不渲染标题，要求它们没有依据。
  if (isUi) {
    const zh = readJson('locale/zh.json')
    const en = readJson('locale/en.json')
    if (!zh) {
      add('bad', '中文 locale', '缺 locale/zh.json，面板会显示包名', '新建 locale/zh.json，写入 meta.title 和 meta.description')
    } else {
      const title = (zh.meta && zh.meta.title) || ''
      if (!title) add('bad', '中文标题', 'locale/zh.json 缺 meta.title，面板显示包名', '在 locale/zh.json 的 meta.title 写中文名')
      else add('ok', '中文标题', title, '')
      if (!(zh.meta && zh.meta.description)) {
        add('warn', '中文说明', '缺 meta.description，卡片副标题空白', '在 locale/zh.json 的 meta.description 写一句话说明')
      }
      const detail = (zh.meta && zh.meta.detail) || ''
      if (detail && !exists(detail)) {
        // 只有「写了但文件不在」才是错；不写是允许的，详情页回落读 README。
        add('bad', '详情文档', `meta.detail 指向的 ${detail} 不存在`, `创建 ${detail}，或把 meta.detail 改成实际存在的文件`)
      } else if (detail) {
        add('ok', '详情文档', detail, '')
      }
    }
    if (!en) add('warn', '英文 locale', '缺 locale/en.json，英文界面显示包名', '新建 locale/en.json，结构与 zh.json 相同')

    const exportsField = manifest.exports && typeof manifest.exports === 'object' ? manifest.exports : {}
    const iconExport = exportsField['./icon']
    const manifestIcon = dsh.manifest && dsh.manifest.icon
    if (!iconExport && !manifestIcon) {
      add('warn', '图标', '没有导出图标，面板显示默认方块', '在 package.json 加 exports["./icon"] = "./icon.svg"，并把 icon.svg 加入 files')
    } else if (iconExport) {
      const iconPath = typeof iconExport === 'string' ? iconExport : (iconExport.default || '')
      if (iconPath && !exists(iconPath)) {
        add('bad', '图标', `exports["./icon"] 指向的 ${iconPath} 不存在`, `创建 ${iconPath}`)
      } else {
        add('ok', '图标', iconPath || 'manifest icon', '')
      }
    }

    const files = Array.isArray(manifest.files) ? manifest.files : []
    const packed = (needle) => files.some((f) => typeof f === 'string' && f.includes(needle))
    const missingPacked = []
    if (!packed('locale')) missingPacked.push('locale')
    if (iconExport && !packed('icon') && !packed('.svg')) missingPacked.push('icon.svg')
    const zhDetail = (readJson('locale/zh.json') || {}).meta && (readJson('locale/zh.json') || {}).meta.detail
    if (zhDetail && !files.some((f) => typeof f === 'string' && (zhDetail.startsWith(f) || f.startsWith(zhDetail)))) {
      missingPacked.push(zhDetail)
    }
    if (missingPacked.length) {
      add('bad', '打包清单', `files 里没包含：${missingPacked.join('、')}`, `把 ${missingPacked.join('、')} 加进 package.json 的 files`)
    }
  } else {
    add('ok', '插件形态', '纯 host 插件，不要求图标与 locale', '')
  }

  // 3) 面板 RPC 写法（405 的根因），只对带 host 代码的插件有意义
  const jsFiles = []
  for (const rel of ['lib/index.js', 'index.js', 'lib/client.js', 'client.js']) {
    const text = readFile(rel)
    if (text) jsFiles.push({ rel, text })
  }
  const stripStrings = (text) => text
    .replace(/'(?:[^'\\]|\\.)*'/g, "''")
    .replace(/"(?:[^"\\]|\\.)*"/g, '""')
    .replace(/`(?:[^`\\]|\\.)*`/g, '``')
  const hostCode = stripStrings(jsFiles.filter((f) => !f.rel.includes('client')).map((f) => f.text).join('\n'))
  if (/\.rpc\.handle\b/.test(hostCode)) {
    add('bad', '面板 RPC', 'host 用 connection.rpc.handle 注册通道，客户端 call 会 405',
      '改成 ctx.webServer.register({ kind:"prefix", path, handler })，客户端保持 ctx.connection.rpc.call 不变')
  }

  // 4) 构建产物新鲜度
  const staleOf = (target, srcDir, skipClient) => {
    try {
      if (!exists(target)) return false
      if (!statSync(path.join(root, srcDir)).isDirectory()) return false
      const builtAt = statSync(path.join(root, target)).mtimeMs
      let newer = false
      const walk = (dir) => {
        for (const entry of readdirSync(dir, { withFileTypes: true })) {
          if (newer) return
          const full = path.join(dir, entry.name)
          const isClientDir = entry.isDirectory() && entry.name === 'client'
          if (entry.isDirectory()) {
            if (skipClient && isClientDir) continue
            walk(full)
          } else if (isClientDir && skipClient) {
            continue
          } else if (statSync(full).mtimeMs > builtAt) {
            newer = true
          }
        }
      }
      walk(path.join(root, srcDir))
      return newer
    } catch { return false }
  }
  const stale = []
  const isPlugin = Object.keys(dsh).length > 0
  if (isPlugin && staleOf('lib/index.js', 'src', true)) stale.push('lib/index.js')
  if (isPlugin && staleOf('lib/client.js', 'src/client', false)) stale.push('lib/client.js')
  if (stale.length) {
    add('warn', '构建产物', `${stale.join('、')} 比源码旧，改了源码没重新构建`, '跑 npm run build 重新构建，然后重启 DeepSeek Harness')
  }

  return items
}

function diagnoseDir() {
  const profile = process.env.DSH_PROFILE_DIR || path.join(process.env.HOME || '', '.dsh/profiles/desktop')
  return path.join(profile, '.plugin-panel', 'diagnostics')
}

/** 把一份诊断结果写成 Markdown（与面板复制出去的格式一致）。 */
function diagnosisMarkdown(name, diagnosis) {
  const items = (diagnosis && diagnosis.items) || []
  const bad = items.filter((i) => i.level === 'bad')
  const warn = items.filter((i) => i.level === 'warn')
  const ok = items.filter((i) => i.level === 'ok')
  const verdict = diagnosis.level === 'bad'
    ? `需要修复（${bad.length} 项问题${warn.length ? `、${warn.length} 项建议` : ''}）`
    : diagnosis.level === 'warn' ? `可用，有 ${warn.length} 项建议`
      : diagnosis.level === 'ok' ? '健康' : '无法判断'
  const lines = [`# 插件体检：${name}`, '', `- 目录：${diagnosis.root || ''}`, `- 健康度：${verdict}`, '']
  if (bad.length) {
    lines.push('## 需要修复', '')
    bad.forEach((item, index) => {
      lines.push(`${index + 1}. **${item.label}** — ${item.message}`)
      if (item.fix) lines.push(`   - 修法：${item.fix}`)
    })
    lines.push('')
  }
  if (warn.length) {
    lines.push('## 建议改进', '')
    warn.forEach((item, index) => {
      lines.push(`${index + 1}. **${item.label}** — ${item.message}`)
      if (item.fix) lines.push(`   - 修法：${item.fix}`)
    })
    lines.push('')
  }
  if (ok.length) {
    lines.push('## 已通过', '')
    ok.forEach((item) => lines.push(`- ${item.label}：${item.message}`))
    lines.push('')
  }
  return lines.join('\n')
}

/** 每次体检后落盘：每个插件一份，外加一份全部汇总。 */
function writeDiagnosisReports(results) {
  const dir = diagnoseDir()
  try { mkdirSync(dir, { recursive: true }) } catch { return }
  // 目录只反映最近一次体检：先清掉上一次的散文件，避免已卸载/不再体检的插件留下旧报告
  try {
    for (const entry of readdirSync(dir)) {
      if (entry.endsWith('.md')) {
        try { unlinkSync(path.join(dir, entry)) } catch { /* 单个删除失败忽略 */ }
      }
    }
  } catch { /* 目录为空或不可读 */ }
  const stamp = new Date().toISOString()
  const chunks = [`# 插件体检汇总`, '', `- 生成时间：${stamp}`, '']
  let bad = 0
  let warn = 0
  const rows = []
  for (const [entryId, diagnosis] of Object.entries(results || {})) {
    const name = String((diagnosis && diagnosis.root) || entryId).split('/').pop() || entryId
    const safe = String(entryId).replace(/^include:/, '').replace(/[^\w.@-]+/g, '_')
    const markdown = diagnosisMarkdown(name, diagnosis)
    try { writeFileSync(path.join(dir, `${safe}.md`), `${markdown}\n`) } catch { /* 单个失败不影响其它 */ }
    if (diagnosis && diagnosis.level === 'bad') bad += 1
    else if (diagnosis && diagnosis.level === 'warn') warn += 1
    const count = (diagnosis && diagnosis.items || []).filter((i) => i.level === 'bad').length
    const tips = (diagnosis && diagnosis.items || []).filter((i) => i.level === 'warn').length
    if (diagnosis && diagnosis.level !== 'ok') {
      rows.push(`| ${name} | ${diagnosis.level === 'bad' ? '需修复' : '有建议'} | ${count} | ${tips} |`)
    }
  }
  if (rows.length) {
    chunks.push('| 插件 | 状态 | 问题 | 建议 |', '| --- | --- | --- | --- |', ...rows, '')
  } else {
    chunks.push('所有插件元信息完整。', '')
  }
  chunks.push(`共 ${bad} 个需修复，${warn} 个有建议。`, '')
  for (const [entryId, diagnosis] of Object.entries(results || {})) {
    if (!diagnosis || diagnosis.level === 'ok') continue
    const name = String(diagnosis.root || entryId).split('/').pop() || entryId
    chunks.push('---', '', diagnosisMarkdown(name, diagnosis))
  }
  try {
    writeFileSync(path.join(dir, 'all.md'), chunks.join('\n'))
    writeDiagnoseLog(`reports written to ${dir}`)
  } catch { /* 汇总写失败不影响体检 */ }
  return dir
}

function diagnoseAll(services, payload) {
  const input = payload && typeof payload === 'object' ? payload : {}
  const plugins = Array.isArray(input.plugins) ? input.plugins : []
  const result = {}
  for (const plugin of plugins) {
    const entryId = typeof plugin.entryId === 'string' ? plugin.entryId : ''
    if (!entryId) continue
    const moduleName = typeof plugin.moduleName === 'string' ? plugin.moduleName : ''
    const located = locatePackage(moduleName) || (plugin.source ? { root: directoryFromSource(plugin.source) } : null)
    if (!located || !located.root) {
      result[entryId] = { level: 'unknown', items: [{ level: 'warn', label: '包目录', message: '找不到插件目录，无法体检', fix: '' }] }
      continue
    }
    const items = diagnosePackage(located.root, moduleName)
    const level = items.some((i) => i.level === 'bad') ? 'bad' : items.some((i) => i.level === 'warn') ? 'warn' : 'ok'
    result[entryId] = { level, root: located.root, items }
  }
  try { writeDiagnosisReports(result) } catch { /* 落盘失败不影响返回值 */ }
  return result
}

function readFacts(payload) {
  const input = payload && typeof payload === 'object' ? payload : {}
  const moduleName = typeof input.moduleName === 'string' ? input.moduleName : ''
  const source = typeof input.source === 'string' ? input.source : ''
  const located = locatePackage(moduleName)
  const root = (located && located.root) || directoryFromSource(source)
  const manifest = root ? readManifest(root) : null
  const document = root ? readLocalDocument(root) : ''
  if (!manifest && !document) return { manifest: null, document: '' }
  return {
    document,
    manifest: manifest && {
      name: manifest.name,
      version: manifest.version,
      description: manifest.description,
      summary: manifest.summary,
      license: manifest.license,
      homepage: manifest.homepage,
      repository: manifest.repository,
      keywords: manifest.keywords,
      engines: manifest.engines,
      clientPlatform: manifest.clientPlatform,
      clientInject: manifest.clientInject,
    },
  }
}

function countTools(services, payload) {
  const input = payload && typeof payload === 'object' ? payload : {}
  const plugins = Array.isArray(input.plugins) ? input.plugins.slice(0, MAX_COUNT_BATCH) : []
  const all = listTools(services.tools)
  const counts = {}
  for (const plugin of plugins) {
    if (!plugin || typeof plugin.entryId !== 'string' || !plugin.entryId) continue
    const moduleName = typeof plugin.moduleName === 'string' ? plugin.moduleName : ''
    counts[plugin.entryId] = toolsForModule(all, moduleName).length
  }
  return { counts }
}

function toolsForModule(allTools, moduleName) {
  const key = moduleName || ''
  if (moduleTools.has(key)) return moduleTools.get(key)
  const located = locatePackage(key)
  const source = located ? readPackageSource(located.root, located.entryFile) : ''
  const manifest = located ? readManifest(located.root) : null
  const tools = ownedTools(allTools, source, manifest && manifest.name)
  moduleTools.set(key, tools)
  return tools
}

function listTools(tools) {
  if (!tools || typeof tools.definitions !== 'function') return []
  const definitions = tools.definitions()
  if (!Array.isArray(definitions)) return []
  return definitions.map((tool) => ({
    name: typeof tool.name === 'string' ? tool.name : '',
    description: typeof tool.description === 'string' ? tool.description : '',
    parameters: summarizeParams(tool.parameters),
  })).filter((tool) => tool.name)
}

function summarizeParams(parameters) {
  if (!parameters || typeof parameters !== 'object') return []
  const props = parameters.properties && typeof parameters.properties === 'object'
    ? parameters.properties
    : null
  if (!props) return []
  return Object.entries(props).slice(0, 16).map(([name, schema]) => ({
    name,
    type: schema && typeof schema.type === 'string' ? schema.type : '',
    description: schema && typeof schema.description === 'string' ? schema.description : '',
  }))
}

function ownedTools(tools, source, packageName) {
  if (!source) return []
  const prefix = packagePrefix(packageName)
  return tools.filter((tool) => {
    if (source.includes(`'${tool.name}'`) || source.includes(`"${tool.name}"`) || source.includes(`\`${tool.name}\``)) return true
    return prefix && (tool.name === prefix || tool.name.startsWith(`${prefix}_`) || tool.name.startsWith(`${prefix}-`))
  })
}

function packagePrefix(name) {
  if (!name) return ''
  const bare = name.startsWith('@') ? name.slice(name.indexOf('/') + 1) : name
  return bare.replace(/^dsh-/, '').replace(/[^a-z0-9]+/gi, '_').replace(/^_|_$/g, '').toLowerCase()
}

async function findBundle(pluginManager, moduleName, entryId, packageName) {
  if (!pluginManager || typeof pluginManager.listBundles !== 'function') return null
  const bundles = await pluginManager.listBundles()
  if (!Array.isArray(bundles)) return null
  return bundles.find((bundle) => {
    if (packageName && bundle.name === packageName) return true
    if (moduleName && bundle.name === moduleName) return true
    const rows = Array.isArray(bundle.rows) ? bundle.rows : []
    return rows.some((row) => row.moduleName === moduleName || (entryId && row.entryId === entryId))
  }) || null
}

async function readDocument(pluginManager, name, language) {
  if (!name || !pluginManager || typeof pluginManager.readBundleDetail !== 'function') return ''
  try {
    const detail = await pluginManager.readBundleDetail(name, language)
    if (!detail || detail.status !== 'found' || typeof detail.markdown !== 'string') return ''
    return detail.markdown.replace(/^---[\s\S]*?---\s*/, '').trim().slice(0, MAX_DOC_CHARS)
  } catch {
    return ''
  }
}

function locatePackage(moduleName) {
  if (!moduleName) return null
  if (moduleName.startsWith('file:')) {
    const entryFile = fileURLToPath(moduleName)
    return { entryFile, root: packageRoot(path.dirname(entryFile)) }
  }
  const profile = process.env.DSH_PROFILE_DIR || path.join(process.env.HOME || '', '.dsh/profiles/desktop')
  try {
    const req = createRequire(path.join(profile, 'package.json'))
    const resolved = req.resolve(moduleName)
    return { entryFile: resolved, root: packageRoot(path.dirname(resolved)) }
  } catch {
    try {
      const direct = path.join(profile, 'node_modules', moduleName)
      if (statSync(path.join(direct, 'package.json')).isFile()) return { entryFile: '', root: direct }
    } catch { /* not installed under that folder name */ }
    return null
  }
}

function packageRoot(start) {
  let dir = start
  for (let i = 0; i < 8; i += 1) {
    try {
      if (statSync(path.join(dir, 'package.json')).isFile()) return dir
    } catch { /* keep walking */ }
    const parent = path.dirname(dir)
    if (parent === dir) break
    dir = parent
  }
  return start
}

function readManifest(root) {
  try {
    const manifest = JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8'))
    const hub = manifest.dsh && manifest.dsh.hub
    const client = manifest.dsh && manifest.dsh.client
    return {
      name: typeof manifest.name === 'string' ? manifest.name : '',
      version: typeof manifest.version === 'string' ? manifest.version : '',
      description: typeof manifest.description === 'string' ? manifest.description : '',
      summary: hub && typeof hub.summary === 'string' ? hub.summary : '',
      license: typeof manifest.license === 'string' ? manifest.license : '',
      homepage: typeof manifest.homepage === 'string' ? manifest.homepage : '',
      repository: repositoryOf(manifest.repository),
      keywords: Array.isArray(manifest.keywords) ? manifest.keywords.filter((item) => typeof item === 'string').slice(0, 12) : [],
      engines: manifest.engines && typeof manifest.engines.dsh === 'string' ? manifest.engines.dsh : '',
      clientPlatform: client && typeof client.platform === 'string' ? client.platform : '',
      clientInject: client && Array.isArray(client.inject) ? client.inject.filter((item) => typeof item === 'string').slice(0, 12) : [],
    }
  } catch {
    return null
  }
}

function readLocalDocument(root) {
  const names = ['docs/DETAIL.zh.md', 'docs/DETAIL.md', 'README.md', 'README.zh.md']
  for (const name of names) {
    try {
      const text = readFileSync(path.join(root, name), 'utf8').replace(/^---[\s\S]*?---\s*/, '').trim()
      if (text) return text.slice(0, 8000)
    } catch { /* try the next name */ }
  }
  return ''
}

function repositoryOf(value) {
  if (typeof value === 'string') return value
  if (value && typeof value.url === 'string') return value.url
  return ''
}

function readPackageSource(root, entryFile) {
  const files = []
  if (entryFile) files.push(entryFile)
  collectJs(root, files, 0)
  let text = ''
  const seen = new Set()
  for (const file of files) {
    if (seen.has(file) || text.length >= MAX_SOURCE_BYTES) continue
    seen.add(file)
    try {
      const chunk = readFileSync(file, 'utf8')
      text += `\n${chunk.slice(0, 180_000)}`
    } catch { /* unreadable file is skipped */ }
  }
  return text
}

function collectJs(dir, files, depth) {
  if (depth > 3 || files.length >= MAX_FILES) return
  let entries
  try { entries = readdirSync(dir, { withFileTypes: true }) } catch { return }
  for (const entry of entries) {
    if (files.length >= MAX_FILES) return
    if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) collectJs(full, files, depth + 1)
    else if (/\.(js|mjs|cjs|ts)$/.test(entry.name)) files.push(full)
  }
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    let size = 0
    req.on('data', (chunk) => {
      size += chunk.length
      if (size > 64_000) {
        reject(new Error('Request body is too large.'))
        req.destroy()
        return
      }
      chunks.push(chunk)
    })
    req.on('end', () => {
      const text = Buffer.concat(chunks).toString('utf8').trim()
      if (!text) {
        resolve({})
        return
      }
      try { resolve(JSON.parse(text)) } catch { reject(new Error('Request body is not valid JSON.')) }
    })
    req.on('error', reject)
  })
}
