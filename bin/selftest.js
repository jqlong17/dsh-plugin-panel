#!/usr/bin/env node
/**
 * dsh-plugin-panel selftest —— 移动端链路的端到端自测。
 *
 * 解决的问题：改完插件只能靠用户拿手机点一次才知道有没有坏，
 * 一轮反馈要十几分钟。这个脚本把「服务端能验证的部分」全自动跑掉：
 *
 *   token → list → page → css → 契约
 *
 * 覆盖不到的唯一环节是 App 的渲染与交互（那只能真机看）。
 *
 * 用法：
 *   node bin/selftest.js                       # 默认 http://127.0.0.1:3091
 *   node bin/selftest.js http://192.168.1.18:3091
 *   node bin/selftest.js --json
 */
import process from 'node:process'

// 自测打的是本机/局域网地址，不能走系统代理。
// 本机的 NODE_USE_ENV_PROXY=1 + http_proxy=127.0.0.1:7897 会让 fetch 把
// 192.168.1.18 也转发给代理，结果 fetch failed（2026-11-16 踩到）。
for (const key of ['NODE_USE_ENV_PROXY', 'HTTP_PROXY', 'http_proxy', 'HTTPS_PROXY', 'https_proxy', 'ALL_PROXY', 'all_proxy']) {
  delete process.env[key]
}

const args = process.argv.slice(2)
const wantsJson = args.includes('--json')
const baseArg = args.find((a) => a.startsWith('http')) ?? 'http://127.0.0.1:3091'
const base = baseArg.replace(/\/$/, '')

const results = []
function record(name, ok, detail) {
  results.push({ name, ok, detail })
  if (!wantsJson) {
    console.log(`${ok ? '✓' : '✗'} ${name}${detail ? ` — ${detail}` : ''}`)
  }
}

async function fetchText(url, options) {
  const response = await fetch(url, options)
  return { status: response.status, text: await response.text() }
}

async function main() {
  // ① token
  let token = ''
  try {
    const { status, text } = await fetchText(`${base}/dsh-plugin-panel/mobile/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{}',
    })
    if (status !== 200) return record('token', false, `HTTP ${status}`)
    token = JSON.parse(text).token ?? ''
    record('token', token.length === 32, `${token.length} 字符`)
  } catch (error) {
    return record('token', false, error.message)
  }
  if (token.length !== 32) return finish()

  // ② 无 token 必须被拒（安全）
  try {
    const { status } = await fetchText(`${base}/dsh-plugin-panel/mobile/list`)
    record('无 token 被拒', status === 401, `HTTP ${status}`)
  } catch (error) {
    record('无 token 被拒', false, error.message)
  }

  // ③ list 结构
  let list = null
  try {
    const { status, text } = await fetchText(`${base}/dsh-plugin-panel/mobile/list?mt=${token}`)
    if (status !== 200) return record('list', false, `HTTP ${status}`)
    list = JSON.parse(text)
    const hasShape = Array.isArray(list.plugins) && Array.isArray(list.invalid)
    record('list 结构', hasShape, `plugins=${list.plugins?.length ?? '?'} invalid=${list.invalid?.length ?? '?'}`)
    // 每个合法条目都必须能让 App 渲染：kind=web 要有 path
    const broken = (list.plugins ?? []).filter((p) => p.kind === 'web' && !p.path)
    record('list 必填字段', broken.length === 0, broken.length ? `缺 path: ${broken.map((b) => b.module).join(',')}` : '全部完整')
  } catch (error) {
    record('list', false, error.message)
  }

  // ④ page
  let html = ''
  try {
    const { status, text } = await fetchText(`${base}/dsh-plugin-panel/mobile?mt=${token}`)
    html = text
    if (status !== 200) return record('page', false, `HTTP ${status}`)
    const items = (html.match(/class="item"/g) ?? []).length
    const descs = (html.match(/class="desc"/g) ?? []).length
    record('page 渲染', items > 0, `${items} 个条目，${descs} 个带简介`)
    record('page 引用样式', html.includes('/dsh-plugin-panel/mobile/style.css'), 'style.css 已挂上')
    // 未替换的模板变量说明渲染有 bug
    const leftover = html.match(/\{\{[A-Z]+\}\}/g) ?? []
    record('模板变量全替换', leftover.length === 0, leftover.length ? leftover.join(',') : '无残留')
  } catch (error) {
    record('page', false, error.message)
  }

  // ⑤ css
  try {
    const { status, text } = await fetchText(`${base}/dsh-plugin-panel/mobile/style.css?mt=${token}`)
    record('style.css', status === 200 && text.length > 100, `HTTP ${status}, ${text.length} 字节`)
  } catch (error) {
    record('style.css', false, error.message)
  }

  // ⑥ 页面注入安全：插件名里的尖括号必须被转义
  if (html.includes('<script') && !html.includes('<script type="module"')) {
    record('XSS 防护', false, '页面里出现了未预期的 <script>')
  } else {
    record('XSS 防护', true, '无未转义脚本注入')
  }

  finish()
}

function finish() {
  const failed = results.filter((r) => !r.ok)
  if (wantsJson) {
    console.log(JSON.stringify({ ok: failed.length === 0, results }, null, 2))
  } else {
    console.log('')
    console.log(`${results.length} 项检查，${results.length - failed.length} 通过，${failed.length} 失败`)
  }
  process.exit(failed.length === 0 ? 0 : 1)
}

main().catch((error) => {
  console.error(wantsJson ? JSON.stringify({ ok: false, error: error.message }) : `自测异常: ${error.message}`)
  process.exit(1)
})
