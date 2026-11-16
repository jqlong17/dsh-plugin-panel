# 移动端接入模板

把这个目录里的 `mobile.ts` 复制到你的插件，改三处名字就能用。

## 复制步骤

```bash
cp node_modules/dsh-plugin-panel/templates/mobile-plugin/mobile.ts 你的插件/src/mobile.ts
```

## 改三处名字

**① `src/mobile.ts` 里的前缀**

```ts
const MOBILE_CHANNEL = '<REPLACE_ME>/mobile'
//                     ↑ 换成你的插件前缀，统一用 '/<包名>/mobile'（如 '/dsh-audio-parse/mobile'）
```

**② `package.json` 的声明**

```json
"dsh": {
  "mobile": {
    "version": 1,
    "kind": "web",
    "title": "你的插件名",
    "path": "/你的前缀/mobile"
  }
}
```

`path` 必须和 `MOBILE_CHANNEL` **完全一致**，且以 `/` 开头。

**③ `src/index.ts` 里接入**

```ts
import { registerMobile } from './mobile.ts'    // ← 相对 import 带 .ts

ctx.inject(['connection', 'webServer'], (scope) => {
  scope.effect(() => registerMobile(scope), '我的插件: 移动端页面')
})
```

## 然后替换数据源

`mobile.ts` 里 `renderPage(items, ...)` 的 `items` 是占位数据，换成你自己的：

```ts
// 示例：读你自己的任务列表
const items = listTasks().map(t => ({ title: t.title, subtitle: t.status }))
```

## 两个必须遵守的规则

**数据服务端直出。** 页面里不要 `fetch` 自己的 RPC——WebView 里没有 cookie，会被 `connection.requestRejection` 挡掉（它只信任 loopback / trustedHosts / bind 地址）。

**token 只验格式。** App 的「打开」是从 `dsh-plugin-panel` 换一次 token，再用它打开所有插件的页面。你自己维护一张 token 表的话，跨插件必然 401。

## 自查

**复制到你的插件之后**再跑（模板目录本身没有 package.json，直接诊断会报「清单可读」失败，属正常）：

```bash
node node_modules/dsh-plugin-panel/scripts/check-plugin-mobile.mjs 你的插件目录
```

加 `--base http://127.0.0.1:3091` 会额外跑运行时检查（换 token、页面可访问、占位符残留、`window.__MT__` 是否注入）。
