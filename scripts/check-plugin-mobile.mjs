#!/usr/bin/env node
/**
 * check-plugin-mobile.mjs —— DSH 插件移动端接入的严格诊断。
 *
 * 为什么需要它：接入移动端有六处「改了但没连上」的静默失败——声明漏字段、
 * import 漏写、模板占位符缺失、页面里 fetch 被挡、媒体通道没开 token……
 * 全部**构建通过、运行时才炸**，而且现象各不相同（405 / 空白 / 401 / 少一块 UI）。
 *
 * 这个脚本把能静态判定的都判定掉，剩下的（视觉）用截图。
 *
 * 用法：
 *   node check-plugin-mobile.mjs <插件目录>
 *   node check-plugin-mobile.mjs <插件目录> --json
 *   node check-plugin-mobile.mjs <插件目录> --base http://127.0.0.1:3091   # 加运行时检查
 *
 * 退出码：0 全通过；1 有 error；2 参数错误
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const SUPPORTED_VERSION = 1
const TOKEN_RE = /^[A-Za-z0-9_-]{32}$/

const results = []
const add = (level, id, ok, detail, hint) => results.push({ level, id, ok, detail, hint })

// ── 工具 ─────────────────────────────────────────────────────────────
function readJSON(file) {
  try { return JSON.parse(readFileSync(file, 'utf8')) } catch { return null }
}

// 构建产物目录：esbuild 打包后 import 都被内联了，拿它做静态检查只会误报
const BUILD_OUTPUT_DIRS = new Set(['lib', 'dist', 'build', 'out', 'node_modules', 'scripts'])

function walk(dir, depth = 0, out = []) {
  if (depth > 4) return out
  let entries
  try { entries = readdirSync(dir, { withFileTypes: true }) } catch { return out }
  for (const entry of entries) {
    if (BUILD_OUTPUT_DIRS.has(entry.name) || entry.name === '.git' || entry.name.startsWith('.')) continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, depth + 1, out)
    else out.push(full)
  }
  return out
}

const rel = (root, file) => path.relative(root, file).split(path.sep).join('/')

// ── 检查项 ───────────────────────────────────────────────────────────

/** 1. package.json 的 dsh.mobile 声明 */
function checkManifest(root) {
  const pkg = readJSON(path.join(root, 'package.json'))
  if (!pkg) return add('error', '清单可读', false, '读不到 package.json')

  const mobile = pkg?.dsh?.mobile
  if (mobile === undefined) {
    return add('error', 'dsh.mobile 声明', false,
      'package.json 里没有 dsh.mobile',
      '在 package.json 的 dsh 字段下加 mobile 对象，见规范第一节')
  }
  if (typeof mobile !== 'object' || mobile === null || Array.isArray(mobile)) {
    return add('error', 'dsh.mobile 声明', false, 'dsh.mobile 不是对象')
  }

  const problems = []
  const version = Number(mobile.version)
  if (!Number.isFinite(version)) problems.push('缺 version（固定写 1）')
  else if (version > SUPPORTED_VERSION) problems.push(`version=${version} 高于 App 支持的 ${SUPPORTED_VERSION}`)

  const kind = typeof mobile.kind === 'string' ? mobile.kind.trim() : ''
  if (kind !== 'web' && kind !== 'native') problems.push('kind 必须是 web 或 native')

  if (typeof mobile.title !== 'string' || mobile.title.trim() === '') problems.push('缺 title（手机上面板标题）')

  if (kind === 'web') {
    const p = typeof mobile.path === 'string' ? mobile.path.trim() : ''
    if (p === '') problems.push('kind=web 但没有 path')
    else if (!p.startsWith('/')) problems.push(`path="${p}" 必须以 / 开头`)
  }
  if (kind === 'native') {
    const s = typeof mobile.schema === 'string' ? mobile.schema.trim() : ''
    if (s === '') problems.push('kind=native 但没有 schema')
    // native 渲染器在 App 里还没实现，现在做了也打不开
    problems.push('kind=native 的渲染器尚未实现，移动端会显示「需要更新版本的 App」，建议先用 web')
  }

  add(problems.length === 0 ? 'error' : 'error', 'dsh.mobile 声明', problems.length === 0,
    problems.length === 0 ? '字段齐全' : problems.join('；'),
    problems.length ? '见规范第一节的字段表' : undefined)

  return mobile
}

/** 2. 路由注册与 import 是否对得上 */
function checkRegistration(root, files, mobile) {
  const sources = files.filter((f) => /\.(ts|js|mjs)$/.test(f) && !f.includes('node_modules'))
  const texts = new Map(sources.map((f) => [f, readFileSync(f, 'utf8')]))

  // 找出所有 register*(ctx) 的被调用但未 import 的情况——最典型的「改了没连上」
  const missingImports = []
  for (const [file, text] of texts) {
    // 只在「接线文件」里查：含 export function apply 或 ctx.inject 的调用。
    // 排除两类：
    //  - client*.js：浏览器端 UI，不参与 host 路由接线
    //  - 规范文档里的示例代码（字符串里的 registerXxx(...) 不是真实调用）
    const base = path.basename(file)
    if (/^client/.test(base)) continue
    if (!/export function apply|ctx\.inject/.test(text)) continue
    // 去掉字符串和模板字面量，避免把文档示例当成真实调用
    const codeOnly = text
      .replace(/'(?:[^'\\]|\\.)*'/g, "''")
      .replace(/"(?:[^"\\]|\\.)*"/g, '""')
      .replace(/`(?:[^`\\]|\\.)*`/g, '``')
    const imported = new Set()
    const locallyDefined = new Set()
    for (const m of text.matchAll(/import\s+(?:type\s+)?\{([^}]+)\}\s+from\s+['"]\.\/[^'"]+['"]/g)) {
      for (const part of m[1].split(',')) imported.add(part.trim().split(/\s+as\s+/).pop().trim())
    }
    // 同文件里定义的函数不算「没 import」（单文件插件很常见）。
    // 用最宽的正则：任何 `function <name>(` 都算定义，不做字符串清洗——
    // 清洗会把 `function foo() {` 里的引号内内容也吃掉，反而漏掉定义。
    for (const m of text.matchAll(/function\s+([A-Za-z_$][\w$]*)\s*\(/g)) locallyDefined.add(m[1])
    for (const m of text.matchAll(/(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s*)?\(/g)) locallyDefined.add(m[1])

    // 只在「去掉字符串后的代码」里找调用，避免把文档示例当成真实调用
    for (const m of codeOnly.matchAll(/(?:^|[^.\w])(register[A-Z]\w*)\s*\(/g)) {
      const name = m[1]
      if (imported.has(name) || locallyDefined.has(name)) continue
      missingImports.push(`${rel(root, file)} 用了 ${name} 但没 import`)
    }
  }
  add('error', '路由函数已 import', missingImports.length === 0,
    missingImports.length ? missingImports.join('；') : '接线文件里的 register* 都有 import',
    missingImports.length ? '相对 import 记得带 .ts 后缀（本项目约定）' : undefined)

  // 移动路由路径必须在源码里出现
  if (mobile?.kind === 'web' && typeof mobile.path === 'string') {
    const needle = mobile.path.split('?')[0]
    const found = [...texts.entries()].filter(([, t]) => t.includes(needle)).map(([f]) => rel(root, f))
    add('error', '页面路径与代码一致', found.length > 0,
      found.length ? `在 ${found.join(', ')} 里找到 ${needle}` : `声明的 path=${needle} 在源码里找不到`,
      found.length ? undefined : 'package.json 的 path 要和 webServer.register 的 path 一致')
  }

  // 相对 import 的扩展名一致性
  const noExt = []
  for (const [file, text] of texts) {
    for (const m of text.matchAll(/from\s+['"](\.[^'"]*)['"]/g)) {
      const spec = m[1]
      if (/\.(ts|js|mjs|json|svg|css|html)$/.test(spec)) continue
      noExt.push(`${rel(root, file)} -> ${spec}`)
    }
  }
  add('warn', '相对 import 带扩展名', noExt.length === 0,
    noExt.length ? `${noExt.length} 处没带扩展名：${noExt.slice(0, 3).join('；')}` : '都带扩展名',
    noExt.length ? '本项目约定相对 import 带 .ts，否则替换/构建时容易静默不生效' : undefined)
}

/** 3. 认证规则：只验格式，不自建 token 表 */
function checkToken(root, files) {
  const sources = files.filter((f) => /\.(ts|js|mjs)$/.test(f))
  const texts = sources.map((f) => [rel(root, f), readFileSync(f, 'utf8')])

  const hasFormatCheck = texts.some(([, t]) => /\[A-Za-z0-9_-\]\{32\}|A-Za-z0-9_-/.test(t) && t.includes('test'))
  add('error', 'token 只验格式', hasFormatCheck,
    hasFormatCheck ? '找到格式校验' : '没找到 /^[A-Za-z0-9_-]{32}$/ 形式的校验',
    'App 的 token 由 dsh-plugin-panel 签发，插件自建 Map 会跨插件 401')

  // 自建 token 表是反模式（发 token 的服务端可以有，但校验必须兼容外部 token）
  const ownMap = texts.filter(([, t]) => /new Map\(\)/.test(t) && /mint|issue|签发/.test(t))
  if (ownMap.length > 0) {
    const alsoAcceptsAny = texts.some(([, t]) => /A-Za-z0-9_-/.test(t))
    add(alsoAcceptsAny ? 'info' : 'error', '不依赖自建 token 表', alsoAcceptsAny,
      alsoAcceptsAny
        ? `${ownMap.map(([f]) => f).join(', ')} 有自建 token 表，但同时也接受格式正确的任意 token（可接受）`
        : `${ownMap.map(([f]) => f).join(', ')} 只认自己签发的 token，跨插件会 401`,
      '见规范第二节')
  }
}

/** 4. 页面里不能 fetch 自己的 RPC */
function checkPageFetch(root, files) {
  const pages = files.filter((f) => /\.(html|ts|js|mjs)$/.test(f))
  const offenders = []
  for (const file of pages) {
    const text = readFileSync(file, 'utf8')
    // 页面模板里出现 fetch 到本插件 RPC 通道的调用
    const fetches = [...text.matchAll(/fetch\(\s*['"`]([^'"`]+)['"`]/g)].map((m) => m[1])
    for (const url of fetches) {
      // 允许打自己的移动 API（带 mt 的），禁止打 rpc 通道（要 cookie）
      if (/rpc|api/i.test(url) && !url.includes('mobile')) offenders.push(`${rel(root, file)} -> ${url}`)
    }
  }
  add('error', '页面不 fetch RPC', offenders.length === 0,
    offenders.length ? offenders.join('；') : '页面里没有 fetch RPC 通道',
    offenders.length ? 'WebView 没有 cookie，会被 requestRejection 挡掉；数据应服务端直出' : undefined)
}

/** 5. 模板占位符：替换逻辑与模板文件必须对得上 */
function checkTemplate(root, files) {
  const templates = files.filter((f) => /\.html$/.test(f))
  const sourcesAll = files.filter((f) => /\.(ts|js|mjs)$/.test(f))
  const hasInlineTemplate = sourcesAll.some((f) => /<!doctype html|<html/i.test(readFileSync(f, 'utf8')))
  if (templates.length === 0) {
    add('warn', '模板独立成文件', false,
      hasInlineTemplate ? '模板写在代码里（.ts 字符串）' : '没有找到模板',
      '建议把模板放独立文件，改文案/样式就不用重载插件')
    // 没有独立模板也要查占位符：模板字符串在源码里
    if (hasInlineTemplate) checkPlaceholdersInSources(root, sourcesAll)
    return
  }

  // 替换侧的占位符
  const sources = files.filter((f) => /\.(ts|js|mjs)$/.test(f)).map((f) => readFileSync(f, 'utf8')).join('\n')
  const replaced = new Set([...sources.matchAll(/replaceAll\(\s*['"](\{\{[A-Z_]+\}\})['"]/g)].map((m) => m[1]))

  // 模板侧的占位符（含被 import 的局部模板）
  const declared = new Set()
  for (const file of templates) {
    for (const m of readFileSync(file, 'utf8').matchAll(/\{\{[A-Z_]+\}\}/g)) declared.add(m[0])
  }

  const unusedInTemplate = [...replaced].filter((p) => !declared.has(p))
  const neverReplaced = [...declared].filter((p) => !replaced.has(p))

  add('error', '占位符双向对齐', unusedInTemplate.length === 0,
    unusedInTemplate.length
      ? `替换逻辑里有、模板里没有：${unusedInTemplate.join(', ')}（这块 UI 不会渲染）`
      : '替换逻辑里的占位符模板都有',
    unusedInTemplate.length ? '踩过：{{TOGGLE}} / {{TOGGLE_SCRIPT}} / {{TOKEN_JSON}} 都是这么漏的' : undefined)

  add('warn', '模板占位符都能被替换', neverReplaced.length === 0,
    neverReplaced.length ? `模板里有、替换逻辑没有：${neverReplaced.join(', ')}` : '模板里的占位符都会替换',
    neverReplaced.length ? '会原样显示在页面上' : undefined)
}

/** 6. 媒体通道是否接受 token */
/** 模板写在源码字符串里时的占位符检查：替换的和模板里出现的必须一致。 */
function checkPlaceholdersInSources(root, sources) {
  const texts = sources.map((f) => [rel(root, f), readFileSync(f, 'utf8')])
  const all = texts.map(([, t]) => t).join('\n')
  const replaced = new Set([...all.matchAll(/replaceAll\(\s*['"](\{\{[A-Z_]+\}\})['"]/g)].map((m) => m[1]))
  const declared = new Set([...all.matchAll(/\{\{[A-Z_]+\}\}/g)].map((m) => m[0]))
  // 有替换但模板里没出现 → 替换无效
  const orphan = [...replaced].filter((p) => !declared.has(p))
  add('error', '占位符双向对齐', orphan.length === 0,
    orphan.length ? `替换了但模板里没有：${orphan.join(', ')}` : '替换与模板对齐',
    orphan.length ? '踩过：{{TOGGLE}} / {{TOKEN_JSON}} 都是这么漏的' : undefined)
}

function checkMedia(root, files) {
  const sources = files.filter((f) => /\.(ts|js|mjs)$/.test(f))
  const texts = sources.map((f) => [rel(root, f), readFileSync(f, 'utf8')])
  const mediaLike = texts.filter(([name, t]) => /media|Media/.test(name) || /media/i.test(t.slice(0, 400)))
  if (mediaLike.length === 0) {
    add('info', '媒体通道', true, '没有媒体路由，跳过')
    return
  }
  const acceptsToken = mediaLike.some(([, t]) => /A-Za-z0-9_-/.test(t) && t.includes('mt'))
  add('error', '媒体通道接受 token', acceptsToken,
    acceptsToken ? '媒体路由接受 mt' : `${mediaLike.map(([f]) => f).join(', ')} 里没找到 token 校验`,
    '手机拿不到 cookie，媒体路由不开 token 的话图片/视频/音频都加载不出来')
}

/** 7. 规范里约定的自测脚本是否存在 */
function checkSelfTest(root, files) {
  const hasScript = files.some((f) => /check-plugin-mobile\.mjs$|selftest.*\.(mjs|js)$/.test(f))
  add('info', '自测脚本', hasScript,
    hasScript ? '有' : '没有自测脚本',
    hasScript ? undefined : '建议加一个能 curl 页面的自测，别靠人拿手机点')
}

// ── 运行时检查（可选，需要 --base） ───────────────────────────────────
async function checkRuntime(base, mobile) {
  stripProxy()
  const norm = base.replace(/\/$/, '')
  const channel = typeof mobile?.path === 'string' ? mobile.path.split('?')[0] : ''

  // token
  let token = ''
  try {
    const res = await fetch(`${norm}/dsh-plugin-panel/mobile/token`, {
      method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}',
    })
    if (res.status !== 200) throw new Error(`HTTP ${res.status}`)
    token = (await res.json()).token ?? ''
    add('error', '运行时：换 token', TOKEN_RE.test(token), `${token.length} 字符`)
  } catch (error) {
    add('error', '运行时：换 token', false, error.message, '确认 DSH 在跑、dsh-plugin-panel 已启用')
    return
  }

  if (!channel) return

  // 页面
  try {
    const res = await fetch(`${norm}${channel}?mt=${token}&_=${Date.now()}`)
    const html = await res.text()
    if (res.status !== 200) {
      add('error', '运行时：页面可访问', false, `HTTP ${res.status}`,
        res.status === 401 ? 'token 校验没过：插件可能只认自签 token' : '路由可能没注册（漏 import？）')
      return
    }
    const failure = html.match(/读取[^<]{0,8}失败[^<]*/)
    add('error', '运行时：页面无错误', !failure, failure ? failure[0] : '页面正常返回',
      failure ? '插件渲染时抛异常，看错误文案定位' : undefined)

    const leftover = html.match(/\{\{[A-Z_]+\}\}/g) ?? []
    add('error', '运行时：无残留占位符', leftover.length === 0,
      leftover.length ? leftover.join(', ') : '无残留', leftover.length ? '模板和替换逻辑对不上' : undefined)

    const mtOk = /window\.__MT__\s*=\s*"[A-Za-z0-9_-]{32}"/.test(html)
    const needsMt = /fetch\(|__MT__/.test(html)
    if (needsMt) {
      add('error', '运行时：页面 token 已注入', mtOk,
        mtOk ? 'window.__MT__ 有值' : 'window.__MT__ 缺失或为空',
        mtOk ? undefined : '页面里要注入 {{TOKEN_JSON}}，否则 fetch 带空 token')
    }

    add('info', '运行时：页面体积', true, `${html.length} 字节`)
  } catch (error) {
    add('error', '运行时：页面可访问', false, error.message)
  }
}

function stripProxy() {
  for (const key of ['NODE_USE_ENV_PROXY', 'HTTP_PROXY', 'http_proxy', 'HTTPS_PROXY', 'https_proxy', 'ALL_PROXY', 'all_proxy']) {
    delete process.env[key]
  }
}

// ── 主流程 ───────────────────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2)
  const wantsJson = args.includes('--json')
  const baseIdx = args.indexOf('--base')
  const base = baseIdx >= 0 ? args[baseIdx + 1] : undefined
  const target = args.find((a, i) => !a.startsWith('--') && args[i - 1] !== '--base')

  if (!target) {
    console.error('用法: node check-plugin-mobile.mjs <插件目录> [--json] [--base http://127.0.0.1:3091]')
    process.exit(2)
  }
  const root = path.resolve(target)
  if (!existsSync(root) || !statSync(root).isDirectory()) {
    console.error(`不是目录: ${root}`)
    process.exit(2)
  }

  const files = walk(root)
  const mobile = checkManifest(root)
  checkRegistration(root, files, mobile)
  checkToken(root, files)
  checkPageFetch(root, files)
  checkTemplate(root, files)
  checkMedia(root, files)
  checkSelfTest(root, files)
  if (base) await checkRuntime(base, mobile)

  const errors = results.filter((r) => !r.ok && r.level === 'error')
  const warns = results.filter((r) => !r.ok && r.level === 'warn')

  if (wantsJson) {
    console.log(JSON.stringify({ ok: errors.length === 0, root, results }, null, 2))
  } else {
    console.log(`插件移动端接入诊断：${root}\n`)
    const icon = (r) => (r.ok ? '✓' : r.level === 'error' ? '✗' : '!')
    for (const r of results) {
      console.log(`${icon(r)} ${r.id} — ${r.detail}`)
      if (!r.ok && r.hint) console.log(`    ↳ ${r.hint}`)
    }
    console.log('')
    console.log(`${results.length} 项：${results.filter((r) => r.ok).length} 通过，${errors.length} 错误，${warns.length} 警告`)
    if (errors.length > 0) console.log('\n规范：~/.dsh/... 或 dsh-plugin-panel 右侧栏「移动端接入」')
  }

  process.exit(errors.length === 0 ? 0 : 1)
}

main().catch((error) => {
  console.error(wantsJson ? JSON.stringify({ ok: false, error: error.message }) : `诊断异常: ${error.message}`)
  process.exit(1)
})
