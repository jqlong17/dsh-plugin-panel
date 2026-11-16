/**
 * 移动端页面骨架（DSH 插件移动端接入模板）。
 *
 * 复制步骤见同目录 README.md。改名时注意三处：
 *   1. MOBILE_CHANNEL 前缀
 *   2. package.json 的 dsh.mobile.path（要和 MOBILE_CHANNEL 一致）
 *   3. apply() 里的 registerMobile 调用
 */
import type { Context } from 'cordis'

/** 这个前缀要和 package.json 的 dsh.mobile.path 完全一致。 */
const MOBILE_CHANNEL = '<REPLACE_ME>/mobile'

/** token 格式校验：App 统一签发 32 位 base64url，插件只验格式，不自建 token 表。 */
const TOKEN_RE = /^[A-Za-z0-9_-]{32}$/

function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

/**
 * 页面渲染。
 *
 * **数据必须服务端直出**：页面里不要 fetch 自己的 RPC——WebView 里没有 cookie，
 * 会被 connection.requestRejection 挡掉（127.0.0.1 之外的 Host 一律拒绝）。
 */
function renderPage(items: Array<{ title: string; subtitle?: string }>, token: string): string {
  const rows = items.map((item) =>
    `<section class="item"><h2>${escapeHtml(item.title)}</h2>`
    + (item.subtitle ? `<p>${escapeHtml(item.subtitle)}</p>` : '')
    + `</section>`).join('\n')

  return `<!doctype html>
<html lang="zh"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title><REPLACE_ME></title>
<style>
:root{--bg:#fff;--fg:#1c1c1e;--fg2:#6b7280;--line:#e5e7eb;--card:#f7f8f9}
@media (prefers-color-scheme:dark){:root{--bg:#000;--fg:#f2f2f7;--fg2:#8e8e93;--line:#2c2c2e;--card:#1c1c1e}}
body{margin:0;background:var(--bg);color:var(--fg);font:15px/1.5 -apple-system,system-ui,sans-serif;padding-bottom:env(safe-area-inset-bottom)}
header{position:sticky;top:0;background:var(--bg);border-bottom:.5px solid var(--line);padding:14px 16px}
header h1{margin:0;font-size:17px;font-weight:600}
main{padding:12px}
.item{background:var(--card);border-radius:12px;padding:14px 16px;margin:8px 0}
.item h2{margin:0;font-size:15px;font-weight:500}
.item p{margin:6px 0 0;color:var(--fg2);font-size:13px}
.empty{padding:48px 24px;text-align:center;color:var(--fg2)}
</style>
</head><body>
<header><h1><REPLACE_ME></h1></header>
<main>${rows || '<p class="empty">还没有内容</p>'}</main>
<script>window.__MT__ = ${JSON.stringify(token)};</script>
</body></html>`
}

/**
 * 注册移动端路由。
 *
 * 两条路径：
 *   POST <MOBILE_CHANNEL>/token   换 token（走 DSH 认证，App 带 cookie）
 *   GET  <MOBILE_CHANNEL>?mt=xxx  页面（只认格式正确的 token）
 */
export function registerMobile(ctx: Context): () => void {
  const webServer = (ctx as any).webServer
  if (!webServer || typeof webServer.register !== 'function') return () => {}

  return webServer.register({
    kind: 'prefix',
    path: MOBILE_CHANNEL,
    handler: async (req: any, res: any) => {
      const url = new URL(req.url ?? '/', 'http://127.0.0.1')
      const send = (status: number, body: string, type = 'text/plain; charset=utf-8') => {
        res.writeHead(status, { 'content-type': type, 'cache-control': 'no-store' })
        res.end(body)
      }

      // ① 换 token：这条仍要过 DSH 认证，因为 App 的 URLSession 带 cookie
      if (url.pathname === `${MOBILE_CHANNEL}/token`) {
        if (req.method !== 'POST') return send(405, 'method not allowed')
        const rejection = (ctx as any).connection?.requestRejection?.(req)
        if (rejection !== undefined) return send(rejection, 'unauthorized')
        // 这里返回任意 32 位串即可：App 自己也会从 dsh-plugin-panel 换 token，
        // 两个插件各有自己的入口，插件侧只要求格式正确。
        return send(200, JSON.stringify({ token: 'a'.repeat(32), expiresIn: 300 }),
          'application/json; charset=utf-8')
      }

      // ② 页面：只验格式（见 README 的「认证」一节）
      if (!TOKEN_RE.test(url.searchParams.get('mt') ?? '')) {
        return send(401, '请从 DSH Pocket App 内打开')
      }

      if (url.pathname === MOBILE_CHANNEL) {
        // ← 换成你自己的数据源
        const items = [{ title: '示例条目', subtitle: '把这里换成 listTasks() 之类的真实数据' }]
        return send(200, renderPage(items, url.searchParams.get('mt') ?? ''), 'text/html; charset=utf-8')
      }
      return send(404, 'not found')
    },
  })
}
