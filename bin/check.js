#!/usr/bin/env node
/**
 * dsh-plugin-panel check mobile —— 插件移动端声明的契约校验。
 *
 * 为什么需要它：App 侧解析要求 kind=web 有 path、kind=native 有 schema，
 * 但插件声明漏一个字段时**两边都不会报错**——App 只是把这条静默过滤掉，
 * 表现为「这台电脑上没有支持手机端的插件」，排查成本极高（2026-11-16 实测浪费半小时）。
 *
 * 这个命令把同一套规则**在插件开发者本地跑一遍**，当场指出缺什么。
 *
 * 用法：
 *   npx dsh-plugin-panel check mobile              # 检查全部已安装插件
 *   npx dsh-plugin-panel check mobile <name>       # 只检查一个
 *   npx dsh-plugin-panel check mobile --json       # 机器可读输出
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'

/** App 当前支持的协议版本，必须与 dsh-pocket-ios 的 PluginMobileManifest.supportedVersion 一致。 */
const SUPPORTED_VERSION = 1

const KINDS = new Set(['web', 'native'])

function profileRoots() {
  const roots = []
  const profilesRoot = path.join(process.env.HOME ?? '', '.dsh', 'profiles')
  try {
    for (const entry of readdirSync(profilesRoot, { withFileTypes: true })) {
      if (entry.isDirectory()) roots.push(path.join(profilesRoot, entry.name, 'node_modules'))
    }
  } catch { /* 没有 profiles 目录 */ }
  return roots
}

/** 扫所有 profile 的 node_modules，找出声明了 dsh.mobile 的插件。 */
function collectPlugins(onlyName) {
  const found = []
  const seen = new Set()
  for (const root of profileRoots()) {
    let entries
    try { entries = readdirSync(root, { withFileTypes: true }) } catch { continue }
    const dirs = []
    // 注意：`isDirectory()` 对符号链接返回 false，而插件几乎都是用软链装的
    // （node_modules/dsh-plugin-panel -> ~/projects/...）。这里必须同时接受软链，
    // 否则一个插件都扫不到（2026-11-16 踩到，和 App 侧那个 import.meta.url 是同一个坑）。
    const isDirLike = (e) => e.isDirectory() || e.isSymbolicLink()
    for (const entry of entries) {
      if (!isDirLike(entry) || entry.name.startsWith('.')) continue
      if (entry.name.startsWith('@')) {
        try {
          for (const sub of readdirSync(path.join(root, entry.name), { withFileTypes: true })) {
            if (isDirLike(sub)) dirs.push(path.join(root, entry.name, sub.name))
          }
        } catch { /* 跳过不可读的 scope */ }
      } else {
        dirs.push(path.join(root, entry.name))
      }
    }
    for (const dir of dirs) {
      const pkgPath = path.join(dir, 'package.json')
      if (!existsSync(pkgPath)) continue
      let pkg
      try { pkg = JSON.parse(readFileSync(pkgPath, 'utf8')) } catch { continue }
      const name = typeof pkg.name === 'string' ? pkg.name : path.basename(dir)
      if (onlyName && name !== onlyName) continue
      if (seen.has(name)) continue
      seen.add(name)
      const mobile = pkg?.dsh?.mobile
      if (mobile === undefined) continue
      found.push({ name, dir, mobile, version: pkg.version })
    }
  }
  return found
}

/** 按 App 侧的同一套规则校验，返回问题列表（空数组表示通过）。 */
function checkDeclaration(plugin) {
  const problems = []
  const mobile = plugin.mobile

  if (typeof mobile !== 'object' || mobile === null || Array.isArray(mobile)) {
    return ['dsh.mobile 不是一个对象']
  }

  const version = Number(mobile.version)
  if (!Number.isFinite(version)) problems.push('缺少 version 字段（应为 1）')
  else if (version > SUPPORTED_VERSION) {
    problems.push(`version=${version} 高于 App 支持的 ${SUPPORTED_VERSION}，会被降级忽略`)
  }

  const kind = typeof mobile.kind === 'string' ? mobile.kind.trim() : ''
  if (kind === '') problems.push('缺少 kind 字段（web 或 native）')
  else if (!KINDS.has(kind)) problems.push(`kind="${kind}" 非法，只能是 web 或 native`)

  const title = typeof mobile.title === 'string' ? mobile.title.trim() : ''
  if (title === '') problems.push('缺少 title 字段（手机上面板标题与按钮文案）')

  if (kind === 'web') {
    const p = typeof mobile.path === 'string' ? mobile.path.trim() : ''
    if (p === '') problems.push('kind=web 但没有 path 字段（App 会用它在 WebView 里加载页面）')
    else if (!p.startsWith('/')) problems.push(`path="${p}" 应以 / 开头`)
    if (typeof mobile.schema === 'string' && mobile.schema.trim() !== '') {
      problems.push('kind=web 时 schema 字段会被忽略，建议删掉')
    }
  } else if (kind === 'native') {
    const s = typeof mobile.schema === 'string' ? mobile.schema.trim() : ''
    const l = typeof mobile.layout === 'string' ? mobile.layout.trim() : ''
    if (s === '' && l === '') {
      problems.push('kind=native 但没有 schema 或 layout 字段')
    }
  }

  return problems
}

/** 额外提示：声明合法但页面/数据端点是否真的存在（只做推测，不联网）。 */
function checkHints(plugin) {
  const hints = []
  const mobile = plugin.mobile
  if (mobile.kind === 'web' && typeof mobile.path === 'string') {
    hints.push(`手动验证：curl -X POST <地址>${String(mobile.path).replace(/\/?$/, '/token')} 应返回 token`)
  }
  return hints
}

function main() {
  const args = process.argv.slice(2)
  // 支持 `check mobile [name] [--json]`
  const wantsJson = args.includes('--json')
  const rest = args.filter((a) => !a.startsWith('--'))
  const onlyName = rest[2] // rest = ['check', 'mobile', <name>?]

  if (rest[0] !== 'check' || rest[1] !== 'mobile') {
    console.error('用法: dsh-plugin-panel check mobile [插件名] [--json]')
    process.exit(2)
  }

  const plugins = collectPlugins(onlyName)
  if (plugins.length === 0) {
    if (wantsJson) console.log(JSON.stringify({ ok: true, checked: 0, results: [] }, null, 2))
    else console.log(onlyName ? `没有找到插件 ${onlyName}，或它没有声明 dsh.mobile` : '没有插件声明 dsh.mobile')
    process.exit(0)
  }

  const results = plugins.map((plugin) => {
    const problems = checkDeclaration(plugin)
    return {
      module: plugin.name,
      version: plugin.version,
      dir: plugin.dir,
      ok: problems.length === 0,
      problems,
      hints: checkHints(plugin),
    }
  })

  if (wantsJson) {
    console.log(JSON.stringify({ ok: results.every((r) => r.ok), checked: results.length, results }, null, 2))
    process.exit(results.every((r) => r.ok) ? 0 : 1)
  }

  let failed = 0
  for (const result of results) {
    if (result.ok) {
      console.log(`✓ ${result.module}${result.version ? ` ${result.version}` : ''}`)
    } else {
      failed += 1
      console.log(`✗ ${result.module}${result.version ? ` ${result.version}` : ''}`)
      for (const problem of result.problems) console.log(`    · ${problem}`)
      for (const hint of result.hints) console.log(`    ↳ ${hint}`)
    }
  }
  console.log('')
  console.log(`检查 ${results.length} 个，${results.length - failed} 个通过，${failed} 个有问题`)
  process.exit(failed === 0 ? 0 : 1)
}

main()
