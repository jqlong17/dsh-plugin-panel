import { createRequire } from 'node:module'
import { spawn } from 'node:child_process'
import { appendFileSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync, unlinkSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { collectHot, collectRemoteDetail, collectRemoteSearch, collectSearch, collectTrend } from './trend.js'

// 插件自身所在目录与 node_modules 根：移动端要扫 package.json 找 dsh.mobile，
// 日志也要落在插件目录里。**必须定义在所有引用它们的常量之前**——
// 之前把 MOBILE_LOG 写在 SELF_DIR 前面，const 的暂时性死区直接让整个插件加载失败
// （表现为所有路由 404/405，2026-11-16 踩到）。
const bundleRequire = createRequire(import.meta.url)
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
    // 每天检查一次自己的更新（软链安装会跳过）
    scoped.effect(() => scheduleSelfUpdate(pluginManager), 'plugin-canvas: self update')
    // 移动端接入诊断：把 scripts/check-plugin-mobile.mjs 的判断暴露成工具，
    // 这样别的插件维护者（或智能体）能直接调，不用自己拼 curl。
    //
    // **必须在 effect 里 try/catch**：工具注册失败（比如运行时对 defineTool
    // 的校验更严）不能连累整个插件的路由注册——2026-11-16 就因为这里抛错，
    // 整个插件没起来，所有路由 405，排查了很久。
    scoped.effect(() => {
      try {
        return registerMobileCheckTool(scoped, { pluginManager })
      } catch (error) {
        mobileLog(`mobile check tool 注册失败（不影响其它功能）: ${error instanceof Error ? error.message : String(error)}`)
        return () => {}
      }
    }, 'plugin-canvas: mobile check tool')
  })
}

// ── 本地目录扫描 ──────────────────────────────────────────────
// 用途：插件还在本地开发、或者 DSH 重置后掉出了 profile，它们不会出现在已安装列表里。
// 给一个目录，扫出下面所有「长得像 DSH 插件」的包，标出装没装。
//
// 判定「是插件」的标准和官方一致：package.json 里有 dsh.bundle / dsh.client，
// 或者根目录有 cordis.patch.yml。不靠目录名猜。

function expandHome(input) {
  const raw = String(input || '').trim()
  if (!raw) return ''
  if (raw === '~') return process.env.HOME || raw
  if (raw.startsWith('~/')) return path.join(process.env.HOME || '', raw.slice(2))
  return raw
}

/** 一个目录下的 DSH 插件候选。只看一层，不递归。 */
function scanPluginDir(root, services) {
  const dir = expandHome(root)
  if (!dir) return { dir: '', items: [], error: '没有指定目录' }
  if (!existsSync(dir)) return { dir, items: [], error: '这个目录不存在' }
  let entries
  try {
    entries = readdirSync(dir, { withFileTypes: true })
  } catch {
    return { dir, items: [], error: '目录读不了（权限？）' }
  }

  const items = []
  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name.startsWith('.') || entry.name === 'node_modules') continue
    const folder = path.join(dir, entry.name)
    let pkg
    try {
      pkg = JSON.parse(readFileSync(path.join(folder, 'package.json'), 'utf8'))
    } catch {
      continue
    }
    const dsh = pkg.dsh && typeof pkg.dsh === 'object' ? pkg.dsh : {}
    const hasBundle = Boolean(dsh.bundle)
    const hasClient = Boolean(dsh.client)
    const hasMobile = Boolean(dsh.mobile)
    const hasPatch = existsSync(path.join(folder, 'cordis.patch.yml'))
    if (!hasBundle && !hasClient && !hasPatch) continue
    const texts = readBundleTexts(pkg.name || entry.name, 'zh')
    items.push({
      folder,
      name: typeof pkg.name === 'string' ? pkg.name : entry.name,
      version: typeof pkg.version === 'string' ? pkg.version : '',
      title: texts.title || '',
      description: pkg.description || '',
      hasBundle,
      hasClient,
      hasMobile,
    })
  }

  items.sort((a, b) => a.name.localeCompare(b.name))
  return { dir, items, error: '' }
}

/**
 * 扫出来的包在 profile 里是什么状态。
 *
 * 「装了」不等于「在跑」，所以分成五种：
 *   missing  不在 profile 里
 *   disabled 在 profile 里但被停用
 *   failed   启用了，但运行时报错没起来
 *   active   正在运行
 *   inactive 在 profile 里、也没被停用，但没有对应的运行条目（少见，通常是刚装还没加载）
 */
async function markScanned(pluginManager, scanned) {
  let bundles = []
  let plugins = []
  try {
    bundles = await pluginManager.listBundles()
  } catch {
    bundles = []
  }
  try {
    plugins = await pluginManager.listPlugins()
  } catch {
    plugins = []
  }

  const byName = new Map()
  const byPath = new Map()
  for (const bundle of Array.isArray(bundles) ? bundles : []) {
    if (!bundle || typeof bundle.name !== 'string') continue
    byName.set(bundle.name, bundle)
    const source = String(bundle.source || '')
    const at = source.lastIndexOf('@')
    const tail = at >= 0 ? source.slice(at + 1) : source
    if (tail.startsWith('link:') || tail.startsWith('file:')) {
      byPath.set(path.resolve(tail.slice(tail.indexOf(':') + 1)), bundle)
    }
  }

  const running = new Map()
  for (const plugin of Array.isArray(plugins) ? plugins : []) {
    if (plugin && typeof plugin.moduleName === 'string') running.set(plugin.moduleName, plugin)
  }

  return scanned.map((item) => {
    const bundle = byPath.get(path.resolve(item.folder)) || byName.get(item.name) || null
    const plugin = running.get(item.name) || null
    let state = 'missing'
    if (bundle && bundle.installed !== false) {
      if (plugin) {
        if (plugin.fiberPhase === 'failed') state = 'failed'
        else if (plugin.enabled === false) state = 'disabled'
        else state = 'active'
      } else {
        state = bundle.enabled === false ? 'disabled' : 'inactive'
      }
    }
    return {
      ...item,
      installed: state !== 'missing',
      state,
      entryId: plugin && typeof plugin.entryId === 'string' ? plugin.entryId : '',
      canToggle: Boolean(plugin && plugin.patchId && plugin.readOnlyReason == null),
      installedSource: bundle && typeof bundle.source === 'string' ? bundle.source : '',
      installedVersion: bundle && typeof bundle.version === 'string' ? bundle.version : '',
    }
  })
}

// ── 自我更新 ──────────────────────────────────────────────────
// 每天查一次 npm，有新版就装上；装完必须重启 DSH 才生效（host 模块不会热替换）。
//
// 两条硬约束：
//   1. **软链安装（开发环境）绝不自动更新**——源码就是真相，覆盖它等于把工作区清了
//   2. 更新失败只记录，不重试、不影响插件运行
const SELF_UPDATE_FIRST_DELAY_MS = 3 * 60 * 1000
const SELF_UPDATE_INTERVAL_MS = 24 * 60 * 60 * 1000
const SELF_REGISTRY = 'https://registry.npmjs.org'

const selfUpdateState = {
  checkedAt: 0,
  installed: '',
  latest: '',
  status: 'idle',   // idle | skipped | up-to-date | updated | failed
  note: '',
}

function compareSemver(a, b) {
  const norm = (v) => String(v || '').replace(/^v/, '').split(/[.+-]/).slice(0, 3).map((n) => parseInt(n, 10) || 0)
  const x = norm(a)
  const y = norm(b)
  for (let i = 0; i < 3; i += 1) if (x[i] !== y[i]) return x[i] - y[i]
  return 0
}

async function fetchPublishedVersion(name) {
  const response = await fetch(`${SELF_REGISTRY}/-/package/${encodeURIComponent(name)}/dist-tags`, {
    signal: AbortSignal.timeout(8000),
  })
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  const tags = await response.json()
  return tags && typeof tags.latest === 'string' ? tags.latest : ''
}

/** 找到自己的 bundle 条目，判断是软链还是 npm 装的。 */
async function selfSource(pluginManager, name) {
  try {
    const bundles = await pluginManager.listBundles()
    const own = (Array.isArray(bundles) ? bundles : []).find((b) => b && b.name === name)
    return own && typeof own.source === 'string' ? own.source : ''
  } catch {
    return ''
  }
}

async function runSelfUpdate(pluginManager) {
  const manifest = readManifest(SELF_DIR)
  const name = manifest && manifest.name
  const installed = manifest && manifest.version
  if (!name || !installed) return

  selfUpdateState.checkedAt = Date.now()
  selfUpdateState.installed = installed

  try {
    const source = await selfSource(pluginManager, name)
    if (source.startsWith('link:')) {
      selfUpdateState.status = 'skipped'
      selfUpdateState.note = '开发环境（软链安装），跳过自动更新'
      return
    }
    const latest = await fetchPublishedVersion(name)
    selfUpdateState.latest = latest
    if (!latest || compareSemver(latest, installed) <= 0) {
      selfUpdateState.status = 'up-to-date'
      selfUpdateState.note = ''
      return
    }
    if (typeof pluginManager.updateBundle !== 'function') {
      selfUpdateState.status = 'skipped'
      selfUpdateState.note = `发现新版本 ${latest}，但当前 DSH 不支持在插件内更新`
      return
    }
    const answer = await pluginManager.updateBundle(name, latest, { registry: SELF_REGISTRY })
    const change = answer && answer.result
    if (change && change.application === 'failed') {
      selfUpdateState.status = 'failed'
      selfUpdateState.note = `自动更新到 ${latest} 失败，保持 ${installed} 继续运行`
      return
    }
    selfUpdateState.status = 'updated'
    selfUpdateState.note = `已更新到 ${latest}，重启 DeepSeek Harness 后生效`
  } catch (error) {
    selfUpdateState.status = 'failed'
    selfUpdateState.note = `检查更新失败：${error instanceof Error ? error.message : String(error)}`
  }
}

/** 启动后先等一会儿再查，之后每天一次；effect 释放时清掉定时器。 */
function scheduleSelfUpdate(pluginManager) {
  let timer = null
  let disposed = false
  const tick = () => {
    if (disposed) return
    void runSelfUpdate(pluginManager)
    timer = setTimeout(tick, SELF_UPDATE_INTERVAL_MS)
  }
  timer = setTimeout(tick, SELF_UPDATE_FIRST_DELAY_MS)
  return () => {
    disposed = true
    if (timer) clearTimeout(timer)
  }
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
function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;').replaceAll("'", '&#39;')
}

/**
 * 取一个插件的「简介」和「详情摘要」。
 *
 * 为什么不用 `bundle.rows[0].summary`：那是市场索引的数据，本地装的插件大多是空，
 * 所以之前页面上一片「（这个插件没有写简介）」。
 * package.json 的 description 覆盖 188/189，README 覆盖 185/189，直接用这两个最可靠。
 */
function firstParagraph(markdown) {
  const out = []
  for (const raw of String(markdown).split('\n')) {
    const line = raw.trim()
    if (line === '') { if (out.length > 0) break; else continue }
    // 跳过标题、徽章、纯 HTML、代码围栏
    if (/^#{1,6}\s/.test(line)) continue
    if (line.startsWith('![') || line.startsWith('[![') || line.startsWith('<')) continue
    if (line.startsWith('```')) continue
    out.push(line)
  }
  return out.join(' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')   // 链接留文字
    .replace(/[*_`>]/g, '')                    // 去掉行内标记
    .trim()
    .slice(0, 220)
}

/**
 * 定位一个包的真实目录。
 *
 * **不能用 `path.join(NODE_MODULES_DIR, name)`**：profile 里的插件很多是指向源码目录的
 * 符号链接（如 dsh-plugin-panel → ~/projects/dsh-plugins/dsh-plugin-canvas），
 * 而 `import.meta.url` 会解析成真实路径，算出来的 NODE_MODULES_DIR 就成了源码目录的父级，
 * 完全不是 DSH 的 node_modules（2026-11-16：48 个插件只有 16 个能读到简介）。
 *
 * 用 Node 的解析链最稳：`require.resolve` 会沿真实的 node_modules 找到每个包。
 */
function profileRoots() {
  // 插件可能是「指向源码目录的符号链接」也可能是实体装进 profile，
  // 而 import.meta.url 会解析成真实路径（源码目录），所以从它推不出 DSH 的 node_modules。
  // 工作目录是 /、环境变量里也没有 profile 信息（2026-11-16 实测），只能扫。
  const roots = [NODE_MODULES_DIR]
  const profilesRoot = path.join(process.env.HOME ?? '', '.dsh', 'profiles')
  try {
    for (const entry of readdirSync(profilesRoot, { withFileTypes: true })) {
      if (entry.isDirectory()) roots.push(path.join(profilesRoot, entry.name, 'node_modules'))
    }
  } catch { /* 没有 profiles 目录：只留源码目录那条 */ }
  return roots
}

function resolvePackageDir(name) {
  // ① Node 的解析链：覆盖「插件依赖里能找到的包」
  try {
    return path.dirname(bundleRequire.resolve(`${name}/package.json`))
  } catch { /* 被 exports 挡住 */ }
  try {
    let dir = path.dirname(bundleRequire.resolve(name))
    for (let i = 0; i < 6; i += 1) {
      if (existsSync(path.join(dir, 'package.json'))) return dir
      const parent = path.dirname(dir)
      if (parent === dir) break
      dir = parent
    }
  } catch { /* 解析不了 */ }

  // ② 逐个候选根找：覆盖「源码目录」与「各个 profile 的 node_modules」
  for (const root of profileRoots()) {
    const dir = path.join(root, name)
    if (existsSync(path.join(dir, 'package.json'))) return dir
  }
  return null
}

/**
 * 读一个插件的 locale 字典，规则和 DSH 启动时一致：
 *
 * 1. 入口是 `locale/en.json`——它不存在就整个不加载（官方就是这么定位的）
 * 2. 扫描同目录所有 `*.json`，文件名（去掉 .json）就是语言 id
 * 3. 每个文件取 `meta.title` / `meta.description` / `meta.detail`
 *
 * 这样移动端和桌面端看到的是同一份数据，不会出现「桌面中文、手机包名」。
 */
function readLocaleDictionaries(dir) {
  const dicts = new Map()
  const localeDir = path.join(dir, 'locale')
  let names
  try {
    names = readdirSync(localeDir)
  } catch {
    return dicts
  }
  // 官方入口缺失时 DSH 根本不读这套文件，这里跟着不读，保持一致
  if (!names.includes('en.json')) return dicts
  for (const file of names) {
    if (!file.endsWith('.json')) continue
    const language = file.slice(0, -5)
    if (!/^[a-z]{2,3}(-[a-z0-9]+)*$/i.test(language)) continue
    try {
      const parsed = JSON.parse(readFileSync(path.join(localeDir, file), 'utf8'))
      const meta = parsed && typeof parsed.meta === 'object' && parsed.meta ? parsed.meta : null
      if (!meta) continue
      const text = (value) => (typeof value === 'string' && value.trim() ? value.trim() : '')
      dicts.set(language.toLowerCase(), {
        title: text(meta.title),
        description: text(meta.description),
        detail: text(meta.detail),
      })
    } catch {
      /* 坏文件：跳过，不影响其它语言 */
    }
  }
  return dicts
}

/** 按请求语言挑字典：先精确匹配，再按主语言匹配，最后 zh → en。 */
function pickLanguage(dicts, acceptLanguage) {
  const wanted = String(acceptLanguage || '')
    .toLowerCase()
    .split(',')
    .map((part) => part.split(';')[0].trim())
    .filter(Boolean)
  for (const tag of wanted) {
    if (dicts.has(tag)) return tag
    const base = tag.split('-')[0]
    if (dicts.has(base)) return base
  }
  if (dicts.has('zh')) return 'zh'
  return 'en'
}

/** 读 meta.detail 指向的文档，限制在包目录内，防止写出路径穿越。 */
function readDetailFile(dir, relative) {
  if (!relative) return ''
  try {
    const full = path.resolve(dir, relative)
    const root = path.resolve(dir)
    if (full !== root && !full.startsWith(root + path.sep)) return ''
    return firstParagraph(readFileSync(full, 'utf8'))
  } catch {
    return ''
  }
}

function readBundleTexts(name, acceptLanguage) {
  const dir = resolvePackageDir(name)
  if (dir === null) return { title: '', description: '', detail: '' }

  let manifestName = ''
  let manifestDescription = ''
  try {
    const pkg = JSON.parse(readFileSync(path.join(dir, 'package.json'), 'utf8'))
    if (typeof pkg.name === 'string') manifestName = pkg.name.trim()
    if (typeof pkg.description === 'string') manifestDescription = pkg.description.trim()
  } catch {
    /* 坏包：后面全靠 locale */
  }

  const dicts = readLocaleDictionaries(dir)
  const language = pickLanguage(dicts, acceptLanguage)
  const chosen = dicts.get(language) || {}
  const english = dicts.get('en') || {}

  // 字段顺序和官方一致：当前语言 → en → package.json
  const title = chosen.title || english.title || manifestName
  const description = chosen.description || english.description || manifestDescription

  // 长文：meta.detail 指定的文件优先，没有再用 README 第一段
  let detail = readDetailFile(dir, chosen.detail || english.detail)
  if (!detail) {
    try {
      detail = firstParagraph(readFileSync(path.join(dir, 'README.md'), 'utf8'))
    } catch {
      /* 没有 README：留空 */
    }
  }
  if (detail && description && detail.startsWith(description)) {
    detail = detail.slice(description.length).trim()
  }
  return { title, description, detail }
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
/**
 * 按 App 侧同一套规则校验声明，返回问题列表。
 *
 * 规则必须和 `dsh-pocket-ios` 的 PluginMobileManifest.parse 保持一致：
 * 那边任一必填项缺失就判 unsupported 并过滤整条。
 * bin/check.js 里有同样的规则（供开发者本地跑），改动时三处一起改。
 */
function mobileDeclarationProblems(mobile) {
  const problems = []
  const version = Number(mobile.version)
  if (!Number.isFinite(version)) problems.push('缺少 version')
  else if (version > 1) problems.push(`version=${version} 高于 App 支持的 1`)
  const kind = typeof mobile.kind === 'string' ? mobile.kind.trim() : ''
  if (kind !== 'web' && kind !== 'native') problems.push('kind 必须是 web 或 native')
  const title = typeof mobile.title === 'string' ? mobile.title.trim() : ''
  if (title === '') problems.push('缺少 title')
  if (kind === 'web' && (typeof mobile.path !== 'string' || mobile.path.trim() === '')) {
    problems.push('kind=web 但没有 path')
  }
  if (kind === 'native' && (typeof mobile.schema !== 'string' || mobile.schema.trim() === '')) {
    problems.push('kind=native 但没有 schema')
  }
  return problems
}

/**
 * 所有插件的移动端入口表：{ 包名: path }。
 * 不带 dsh.mobile 的插件也能查到——列表里要点它时才知道该打开哪。
 */
function mobilePaths() {
  const map = new Map()
  const push = (dir, fallbackName) => {
    try {
      const pkg = JSON.parse(readFileSync(path.join(dir, 'package.json'), 'utf8'))
      const mobile = pkg?.dsh?.mobile
      if (!mobile || typeof mobile !== 'object') return
      const name = typeof pkg.name === 'string' && pkg.name ? pkg.name : fallbackName
      if (!name) return
      if (typeof mobile.path === 'string' && mobile.path) map.set(name, mobile.path)
    } catch { /* 跳过坏包 */ }
  }
  try {
    for (const entry of readdirSync(NODE_MODULES_DIR, { withFileTypes: true })) {
      const dirLike = entry.isDirectory() || entry.isSymbolicLink()
      if (!dirLike || entry.name.startsWith('.')) continue
      const full = path.join(NODE_MODULES_DIR, entry.name)
      if (entry.name.startsWith('@')) {
        try {
          for (const sub of readdirSync(full, { withFileTypes: true })) {
            if (sub.isDirectory() || sub.isSymbolicLink()) push(path.join(full, sub.name), `${entry.name}/${sub.name}`)
          }
        } catch { /* 跳过 */ }
      } else {
        push(full, entry.name)
      }
    }
  } catch { /* 跳过 */ }
  return map
}

/**
 * 运行时插件状态：{ 包名 -> { entryId, enabled } }。
 *
 * `listBundles()` 只有安装清单（name/version/rows），**没有 enabled 和 entryId**；
 * 那两样在 `listPlugins()` 里（client.js 用的就是 plugin.enabled / plugin.entryId）。
 * 移动页面同时需要「列表信息」和「开关状态」，所以两边都读、按包名合并。
 */
async function readPluginStates(pluginManager) {
  const states = new Map()
  if (!pluginManager || typeof pluginManager.listPlugins !== 'function') return states
  try {
    const plugins = await pluginManager.listPlugins()
    for (const plugin of Array.isArray(plugins) ? plugins : []) {
      const name = plugin?.moduleName || plugin?.name
      if (typeof name !== 'string' || !name) continue
      states.set(name, {
        entryId: typeof plugin.entryId === 'string' ? plugin.entryId : '',
        enabled: plugin.enabled !== false,
      })
    }
  } catch { /* 读不到就当作全部启用 */ }
  return states
}

function readMobileManifests() {
  const plugins = []
  const invalid = []
  const seen = new Set()

  const consider = (dir, fallbackName) => {
    try {
      const pkg = JSON.parse(readFileSync(path.join(dir, 'package.json'), 'utf8'))
      const mobile = pkg?.dsh?.mobile
      if (!mobile || typeof mobile !== 'object') return
      const name = typeof pkg.name === 'string' && pkg.name ? pkg.name : fallbackName
      if (!name || seen.has(name)) return
      seen.add(name)
      // 声明有问题时**记下来而不是丢掉**：静默过滤会让 App 显示「没有插件」，
      // 让人以为是没装，实际只是少个字段（2026-11-16 因此浪费半小时）。
      const problems = mobileDeclarationProblems(mobile)
      if (problems.length > 0) {
        invalid.push({ module: name, problems })
        return
      }
      // **必须带上 path / schema**：App 侧解析要求 kind=web 有 path、kind=native 有 schema，
      // 少一个字段整条就会被判为「声明无效」并过滤掉，表现为「这台电脑上没有支持手机端的插件」
      // （2026-11-16 踩到——聚合接口只回了 module/title/kind/version）。
      plugins.push({
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

  // **聚合页排第一**：App 目前取 `entries.first` 打开（协议 v1 是「一个按钮 → 一个面板」），
  // 如果按名字排序，第一个会是 dsh-meeting-memo 之类的具体插件，点「插件」就直接进了它，
  // 别的插件根本没机会出现。所以固定让 dsh-plugin-panel 的列表页打头，它就是手机端的入口。
  const AGGREGATOR = 'dsh-plugin-panel'
  plugins.sort((a, b) => {
    if (a.module === AGGREGATOR) return -1
    if (b.module === AGGREGATOR) return 1
    return a.module.localeCompare(b.module)
  })

  return { plugins, invalid }
}

const MOBILE_PAGE_PATH = path.join(SELF_DIR, 'mobile', 'page.html')
const MOBILE_STYLE_PATH = path.join(SELF_DIR, 'mobile', 'style.css')

/** 每次请求都重读模板和样式——改文案/配色不需要重启 DSH。 */
function readIfExists(file, fallback) {
  try { return readFileSync(file, 'utf8') } catch { return fallback }
}

function renderMobilePage(bundles, token, states = new Map(), acceptLanguage = '') {
  const paths = mobilePaths()
  // 手机屏幕小，只列「用户自己装的、而且启用着」的插件。
  // 判定和桌面端一致：包名以 @deepseek-ai/ 开头的是 DSH 自带的，不列；
  // cordis: 开头的是内核内置条目，也不列。
  const visible = bundles.filter((bundle) => {
    if (!bundle || typeof bundle.name !== 'string') return false
    if (bundle.name.startsWith('@deepseek-ai/') || bundle.name.startsWith('cordis:')) return false
    return bundle.enabled !== false
  })
  const items = visible.map((bundle) => {
    const moduleName = String(bundle.name ?? '')
    const version = escapeHtml(bundle.version ?? '')
    const { description, detail, title } = readBundleTexts(moduleName, acceptLanguage)
    // 和桌面端一致：优先 `meta.title`（中文名），没有才退回包名
    const name = escapeHtml(title || moduleName)
    // 包名单独给一行小字——排重名、查文档、贴给 AI 都用得上
    const packageLine = title ? `<div class="pkg">${escapeHtml(moduleName)}</div>` : ''
    const repo = typeof bundle.repo === 'string' ? bundle.repo : ''
    const inline = description ? `<span class="desc">${escapeHtml(description)}</span>` : ''
    // 这个插件有没有移动端页面；有就给它一个「打开」入口，没有就不显示按钮
    const mobilePath = paths.get(moduleName)
    const mobileLink = mobilePath
      ? `${escapeHtml(mobilePath)}${mobilePath.includes('?') ? '&' : '?'}mt=${encodeURIComponent(token ?? '')}`
      : ''
    // item 模板也在文件里：改列表结构不用重启
    const itemTemplate = readIfExists(
      path.join(SELF_DIR, 'mobile', 'item.html'),
      '<details class="item"><summary><div class="head"><span class="name">{{NAME}}</span>'
        + '<span class="ver">{{VERSION}}</span></div>{{PACKAGE}}{{INLINE}}</summary>{{DETAIL}}</details>',
    )
    return itemTemplate
      .replaceAll('{{NAME}}', name)
      .replaceAll('{{PACKAGE}}', packageLine)
      .replaceAll('{{VERSION}}', version)
      .replaceAll('{{INLINE}}', inline ? `<div class="inline">${inline}</div>` : '')
      .replaceAll('{{TOGGLE}}', (() => {
        const state = states.get(moduleName)
        const enabled = state ? state.enabled : true
        return `<button class="toggle" data-name="${escapeHtml(moduleName)}"`
          + ` data-enabled="${enabled ? 'true' : 'false'}">`
          + `${enabled ? '关闭' : '开启'}</button>`
      })())
      .replaceAll('{{DETAIL}}', `<div class="detail">`
        + (detail ? `<p>${escapeHtml(detail)}</p>` : '')
        + (!detail && !description ? '<p>这个插件没有写简介也没有 README。</p>' : '')
        + (repo ? `<a href="${escapeHtml(repo)}" target="_blank" rel="noreferrer">打开仓库</a>` : '')
        + (mobileLink ? `<a class="open" href="${mobileLink}">打开</a>` : '')
        + `</div>`)
  }).join('\n')

  const template = readIfExists(
    MOBILE_PAGE_PATH,
    '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body><main>{{ITEMS}}</main></body></html>',
  )
  return template
    .replaceAll('{{TITLE}}', escapeHtml('插件'))
    .replaceAll('{{COUNT}}', String(visible.length))
    .replaceAll('{{ITEMS}}', items || '<p class="empty">还没有安装任何启用的插件</p>')
    .replaceAll('{{NOTE}}', '只显示你自己安装、并且启用着的插件。停用的和 DSH 自带的都不在这里，去桌面端右侧栏可以看全部。')
    .replaceAll('{{TOGGLE_SCRIPT}}', TOGGLE_SCRIPT)
    .replaceAll('{{TOKEN}}', escapeHtml(token ?? ''))
    .replaceAll('{{TOKEN_JSON}}', JSON.stringify(String(token ?? '')))
}

/** 从 listBundles 里找出插件的 entryId（enable/disable 需要它，不是包名）。 */
function resolveEntryId(bundles, name) {
  for (const bundle of bundles) {
    if (bundle.name !== name) continue
    if (typeof bundle.entryId === 'string' && bundle.entryId) return bundle.entryId
    for (const row of Array.isArray(bundle.rows) ? bundle.rows : []) {
      if (typeof row.entryId === 'string' && row.entryId
        && (row.moduleName === name || row.name === name)) return row.entryId
    }
  }
  // 大多数情况 entryId 就是 include:<包名>
  return bundles.some((b) => b.name === name) ? `include:${name}` : ''
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (chunk) => { data += chunk; if (data.length > 8192) reject(new Error('body too large')) })
    req.on('end', () => resolve(data))
    req.on('error', reject)
  })
}

/**
 * 开启/关闭插件的点击逻辑。
 *
 * 为什么用一段内联脚本而不是服务端表单：重载插件是幂等的两步操作
 * （改 enabled → 刷新页面），内联脚本比整页 POST 再重定向更省事，
 * 而且失败时能在原地提示。
 */
const TOGGLE_SCRIPT = `<script>
(function () {
  document.querySelectorAll('button.toggle').forEach(function (btn) {
    btn.addEventListener('click', async function (event) {
      event.preventDefault();
      event.stopPropagation();
      const name = btn.getAttribute('data-name');
      const enabled = btn.getAttribute('data-enabled') !== 'true';
      btn.disabled = true;
      btn.textContent = enabled ? '开启中…' : '关闭中…';
      try {
        const res = await fetch('/dsh-plugin-panel/mobile/toggle?mt=' + encodeURIComponent(window.__MT__ || ''), {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ name: name, enabled: enabled })
        });
        if (!res.ok) throw new Error(await res.text() || ('HTTP ' + res.status));
        // 插件重载后列表会变，直接刷新最省事
        setTimeout(function () { location.reload(); }, 600);
      } catch (error) {
        btn.disabled = false;
        btn.textContent = '失败';
        btn.title = String(error && error.message ? error.message : error);
      }
    });
  });
  document.addEventListener('DOMContentLoaded', function () {
    // window.__MT__ 由页面内联注入
  });
})();
</script>`

/**
 * 移动端接入诊断工具。
 *
 * 为什么复用 scripts/check-plugin-mobile.mjs 而不是在 JS 里重写一遍：
 * 那个脚本要能独立跑（CI、本地、别人没装 DSH），两边逻辑必须一致，
 * 所以这里直接 spawn 它、把 JSON 输出翻译成工具结果。
 */
function registerMobileCheckTool(ctx, services) {
  if (!ctx.tools || typeof ctx.tools.register !== 'function') return () => {}
  return ctx.tools.register({
    name: 'plugin_check_mobile',
    description:
      'Diagnose whether a DSH plugin is correctly wired for the DSH Pocket iOS plugin panel. '
      + 'Checks the dsh.mobile manifest, route registration and imports, token rules, template placeholders, '
      + 'and media channel auth. Pass a plugin directory (e.g. /Users/me/projects/dsh-plugins/my-plugin). '
      + 'Returns per-check pass/fail with the fix hint.',
    parameters: {
      dir: { type: 'string', description: 'The plugin directory to diagnose.' },
    },
    // DSH 要求工具声明输出形状（dsh-tools/lib/index.js:436）：
    //   must declare output { schema, render, presentationMeta? }
    // schema 用参数式 spec（和 parameters 同一套），render 把结果转成给模型看的文本。
    // output.schema 要的是 **JSON Schema**（不是 parameters 那种参数式 spec），
    // 支持的子集：type / oneOf / properties / required / additionalProperties / items / enum / const。
    // 写成 { ok: {type:'boolean'} } 这种参数式会被拒：schema.ok is not a supported keyword。
    output: {
      schema: {
        type: 'object',
        properties: {
          ok: { type: 'boolean', description: 'All checks passed.' },
          summary: { type: 'string', description: 'One-line result.' },
          results: {
            type: 'array',
            description: 'Per-check results.',
            items: {
              type: 'object',
              properties: {
                level: { type: 'string' },
                id: { type: 'string' },
                ok: { type: 'boolean' },
                detail: { type: 'string' },
                hint: { type: 'string' },
              },
              additionalProperties: true,
            },
          },
          error: { type: 'string' },
        },
        additionalProperties: true,
      },
      // render 的返回值直接当 tool result 的 content，**必须是数组**，
      // 返回字符串会炸 `content.some is not a function`。
      render(_args, value) {
        const lines = []
        if (value?.error) {
          lines.push(`诊断失败：${value.error}`)
        } else {
          lines.push(value?.summary ?? '')
          for (const item of value?.results ?? []) {
            const mark = item.ok ? '✓' : item.level === 'error' ? '✗' : '!'
            lines.push(`${mark} ${item.id} — ${item.detail}`)
            if (!item.ok && item.hint) lines.push(`    ↳ ${item.hint}`)
          }
        }
        return [{ type: 'text', text: lines.join('\n') }]
      },
    },
    async execute({ dir }) {
      const target = typeof dir === 'string' ? dir.trim() : ''
      if (!target) return { ok: false, error: 'dir is required' }
      const script = path.join(SELF_DIR, 'scripts', 'check-plugin-mobile.mjs')
      if (!existsSync(script)) return { ok: false, error: `诊断脚本缺失: ${script}` }
      const output = await new Promise((resolve) => {
        const child = spawn(process.execPath, [script, target, '--json'], { stdio: ['ignore', 'pipe', 'pipe'] })
        let out = ''
        let err = ''
        child.stdout.on('data', (chunk) => { out += chunk })
        child.stderr.on('data', (chunk) => { err += chunk })
        child.on('close', () => resolve({ out, err }))
        child.on('error', (error) => resolve({ out: '', err: error.message }))
      })
      try {
        const parsed = JSON.parse(output.out)
        const failed = (parsed.results ?? []).filter((r) => !r.ok)
        return {
          ok: parsed.ok === true,
          summary: parsed.ok
            ? `通过：${parsed.results.length} 项检查全部满足`
            : `${failed.length} 项不满足：${failed.map((r) => r.id).join('、')}`,
          results: parsed.results,
        }
      } catch {
        return { ok: false, error: output.err || output.out || '诊断脚本没有返回 JSON' }
      }
    },
  })
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

      // ①.5 开启/关闭插件。手机端也要能重载插件——改完插件代码不用回电脑。
      // 只认一次性 token（手机连的是局域网/Tailscale，过不了 DSH 的 Host 校验）。
      if (url.pathname === `${MOBILE_CHANNEL}/toggle`) {
        if (req.method !== 'POST') return send(405, 'method not allowed')
        const token = url.searchParams.get('mt')
        if (!mobileTokenValid(token)) return send(401, '请从 DSH Pocket App 内打开')
        let payload = {}
        try { payload = JSON.parse(await readBody(req)) ?? {} } catch { return send(400, 'bad body') }
        const name = typeof payload.name === 'string' ? payload.name : ''
        const enabled = payload.enabled === true
        if (!name) return send(400, 'missing name')
        // **不能自己关自己**：禁用它之后，这条 toggle 路由连同整个插件一起消失，
        // 再也调不回来（2026-11-16 踩到，只能手工改 cordis.patch.yml 再重启 DSH）。
        if (name === 'dsh-plugin-panel' && !enabled) {
          return send(409, '不能关闭插件管理自身：关掉之后这个开关也会消失')
        }
        try {
          const states = await readPluginStates(services.pluginManager)
          const entryId = states.get(name)?.entryId || `include:${name}`
          if (!entryId) return send(404, `找不到插件 ${name} 的入口`)
          await services.pluginManager.setPluginEnabled(entryId, enabled)
          mobileLog(`toggle ${name} -> ${enabled ? 'enabled' : 'disabled'} (${entryId})`)
          return send(200, JSON.stringify({ ok: true, module: name, enabled }), 'application/json; charset=utf-8')
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error)
          mobileLog(`toggle ${name} failed: ${message}`)
          return send(500, message)
        }
      }

      // ② 其余两条都要一次性 token（WebView 带不上 cookie）
      const token = url.searchParams.get('mt')
      if (!mobileTokenValid(token)) return send(401, '请从 DSH Pocket App 内打开')

      if (url.pathname === `${MOBILE_CHANNEL}/list`) {
        const { plugins, invalid } = readMobileManifests()
        // invalid 让 App 能显示「这个插件的移动端声明不完整」，而不是当成没装
        return send(200, JSON.stringify({ version: 1, plugins, invalid }),
          'application/json; charset=utf-8')
      }
      if (url.pathname === MOBILE_CHANNEL) {
        mobileLog(`page host=${req.headers.host} remote=${req.socket?.remoteAddress}`)
        const bundles = await collectBundles(services.pluginManager)
        const states = await readPluginStates(services.pluginManager)
        const language = String(req.headers['accept-language'] ?? '')
        return send(200, renderMobilePage(bundles, token, states, language), 'text/html; charset=utf-8')
      }
      // 样式独立成一个文件：调字号配色改 mobile/style.css 再刷新即可，不用重启
      if (url.pathname === `${MOBILE_CHANNEL}/style.css`) {
        return send(200, readIfExists(MOBILE_STYLE_PATH, 'body{font:15px system-ui;padding:16px}'),
          'text/css; charset=utf-8')
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
        else if (method === 'remote-search') {
          const found = await collectRemoteSearch(record.payload)
          let added = 0
          if (found && Array.isArray(found.items) && found.items.length) {
            try {
              added = rememberRemoteItems(found.items)
            } catch {
              /* 写缓存失败不影响这次结果 */
            }
          }
          result = { ok: true, value: { ...found, added } }
        }
        else if (method === 'remote-detail') result = { ok: true, value: await collectRemoteDetail(record.payload) }
        else if (method === 'self-update') result = { ok: true, value: { ...selfUpdateState } }
        else if (method === 'scan') {
          const input = record.payload && typeof record.payload === 'object' ? record.payload : {}
          const found = scanPluginDir(input.dir, services)
          const items = await markScanned(services.pluginManager, found.items)
          result = { ok: true, value: { dir: found.dir, error: found.error, items } }
        }
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

/**
 * 把 npm 上找到的包补进本地索引，下次搜索直接命中本地。
 *
 * 只补索引里没有的名字；条目带 fromNpm 标记，分类留空（不参与分类筛选）。
 * 目录索引重建时会整体覆盖，届时这些条目若已进入新品目录就自然留下。
 */
function rememberRemoteItems(items) {
  const index = readSearchCache()
  if (!index || !Array.isArray(index.rows) || !index.rows.length) return 0
  const known = new Set()
  for (const row of index.rows) if (row && row.name) known.add(row.name)
  const today = new Date().toISOString().slice(0, 10)
  const additions = []
  for (const item of items) {
    if (!item || typeof item.name !== 'string' || !item.name || known.has(item.name)) continue
    additions.push({
      name: item.name,
      version: item.version || '',
      category: '',
      categoryZh: '',
      summary: item.summary || '',
      repo: item.repo || '',
      added: today,
      publishedAt: item.date || '',
      stars: null,
      keywords: Array.isArray(item.keywords) ? item.keywords : [],
      fromNpm: true,
    })
    known.add(item.name)
  }
  if (!additions.length) return 0
  index.rows = index.rows.concat(additions)
  writeSearchCache(index)
  return additions.length
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

/** 量一个包目录的体积：跳过 node_modules 和 .git，符号链接不跟进去。 */
function measureDirectory(root) {
  const skip = new Set(['node_modules', '.git'])
  let bytes = 0
  let files = 0
  const walk = (dir, depth) => {
    if (depth > 8) return
    let entries
    try {
      entries = readdirSync(dir, { withFileTypes: true })
    } catch {
      return
    }
    for (const entry of entries) {
      if (skip.has(entry.name)) continue
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        walk(full, depth + 1)
      } else if (entry.isFile()) {
        try {
          bytes += statSync(full).size
          files += 1
        } catch {
          /* 读不到就跳过，不影响其它文件 */
        }
      }
    }
  }
  walk(root, 0)
  return { bytes, files }
}

function readFacts(payload) {
  const input = payload && typeof payload === 'object' ? payload : {}
  const moduleName = typeof input.moduleName === 'string' ? input.moduleName : ''
  const source = typeof input.source === 'string' ? input.source : ''
  const located = locatePackage(moduleName)
  const root = (located && located.root) || directoryFromSource(source)
  const manifest = root ? readManifest(root) : null
  const document = root ? readLocalDocument(root) : ''
  if (!manifest && !document) return { manifest: null, document: '', size: null }
  return {
    document,
    size: root ? measureDirectory(root) : null,
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
