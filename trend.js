/**
 * Catalog trend: how many plugins the dsh-plugin-shop catalog listed on each
 * day. The catalog publishes one immutable npm version per build, so the
 * version list doubles as a dated history; we read only the small index.json
 * of each version instead of downloading its multi-megabyte tarball.
 */

const CATALOG = 'dsh-plugin-shop-catalog'
const CDN_BASES = ['https://cdn.jsdelivr.net/npm', 'https://unpkg.com']
const REGISTRY = 'https://registry.npmjs.org'
/**
 * Chinese search terms mapped to the English words the catalog actually uses,
 * so a query typed in Chinese still reaches English-named packages.
 */
const ZH_TERMS = {
  '上下文': ['context'],
  '上游': ['upstream'],
  '专家': ['expert'],
  '主机': ['host'],
  '主题': ['theme', 'skin', 'color'],
  '书签': ['bookmark'],
  '云': ['cloud'],
  '交互': ['interactive'],
  '人设': ['persona'],
  '代理': ['agent', 'delegate', 'proxy'],
  '代码': ['code', 'coding'],
  '任务': ['task', 'job', 'todo'],
  '会话': ['session', 'chat', 'conversation'],
  '会话管理': ['session', 'sessions'],
  '依赖': ['dependencies', 'dependency'],
  '侧栏': ['sidebar', 'panel'],
  '免费': ['free'],
  '内联': ['inline'],
  '分叉': ['fork'],
  '删除': ['delete', 'remove', 'purge', 'uninstall'],
  '剪贴板': ['clipboard', 'paste'],
  '办公': ['office'],
  '加密': ['encrypt', 'crypto'],
  '助手': ['assistant'],
  '卡片': ['card', 'cards'],
  '卸载': ['uninstall', 'remove', 'purge'],
  '压缩': ['compress', 'zip'],
  '同步': ['sync'],
  '启动': ['boot', 'launch', 'startup'],
  '团队': ['team'],
  '图像': ['image', 'img'],
  '图片': ['image', 'img', 'picture', 'photo'],
  '图表': ['chart', 'charts'],
  '在线': ['online'],
  '地图': ['map'],
  '壁纸': ['background', 'wallpaper'],
  '备份': ['backup'],
  '外观': ['appearance', 'theme'],
  '多智能体': ['agents', 'multi', 'multi-agent'],
  '多模型': ['multi', 'provider'],
  '子代理': ['subagent', 'agent'],
  '字体': ['font', 'typeface'],
  '安装': ['install', 'add'],
  '官方': ['official'],
  '实时': ['live'],
  '审批': ['approval', 'approve'],
  '审查': ['review', 'audit'],
  '客户端': ['client'],
  '容器': ['docker', 'container'],
  '密钥': ['key', 'secret', 'credential'],
  '对话': ['chat', 'conversation', 'session'],
  '导入': ['import'],
  '导出': ['export'],
  '工作区': ['workspace', 'worktree'],
  '工作室': ['studio'],
  '工具': ['tool', 'tools'],
  '幻灯片': ['slide', 'ppt', 'presentation'],
  '引擎': ['engine'],
  '录音': ['record', 'audio', 'voice'],
  '待办': ['todo'],
  '微信': ['wechat'],
  '快捷键': ['shortcut', 'hotkey'],
  '截图': ['screenshot', 'snapshot', 'capture'],
  '技能': ['skill', 'skills'],
  '报错': ['error', 'debug'],
  '接口': ['api', 'endpoint'],
  '控制': ['control'],
  '推理': ['reasoning'],
  '提供商': ['provider'],
  '提示词': ['prompt'],
  '插件': ['plugin', 'bundle'],
  '搜索': ['search', 'find', 'query'],
  '数据': ['data', 'dataset'],
  '数据库': ['database', 'sql', 'db'],
  '整理': ['organize', 'sort'],
  '文件': ['file', 'files'],
  '文本': ['text'],
  '文档': ['markdown', 'doc', 'document'],
  '日志': ['log', 'logs'],
  '日程': ['schedule', 'cron', 'job'],
  '智能体': ['agent', 'agents'],
  '服务器': ['server'],
  '本地': ['local'],
  '机器人': ['bot'],
  '核心': ['core'],
  '桌宠': ['pet'],
  '桌面': ['desktop'],
  '档案': ['profile'],
  '桥接': ['bridge'],
  '模型': ['model', 'llm'],
  '模式': ['mode'],
  '毛玻璃': ['blur', 'glass'],
  '浅色': ['light'],
  '测试': ['test', 'testing'],
  '浏览': ['browse'],
  '浏览器': ['browser', 'web', 'chrome'],
  '消息': ['message', 'messages'],
  '深色': ['dark', 'night'],
  '清单': ['list', 'checklist'],
  '渲染': ['render', 'rendered'],
  '游戏': ['game'],
  '爬虫': ['crawl', 'spider', 'scrape'],
  '状态': ['status'],
  '生成': ['gen', 'generate'],
  '用量': ['token', 'usage', 'cost'],
  '电报': ['telegram'],
  '画布': ['canvas'],
  '登录': ['login', 'auth', 'oauth'],
  '监控': ['monitor', 'metrics', 'watch'],
  '看板': ['board', 'kanban'],
  '知识': ['knowledge', 'kb'],
  '研究': ['research'],
  '离线': ['offline'],
  '窗口': ['window'],
  '策略': ['policy'],
  '管理': ['manage', 'manager', 'management'],
  '系统': ['system'],
  '终端': ['terminal', 'cli', 'shell'],
  '统计': ['stats', 'meter', 'cost'],
  '编排': ['orchestrate', 'orchestration'],
  '编程': ['coding', 'code', 'dev'],
  '编辑': ['edit'],
  '网关': ['gateway', 'proxy'],
  '群聊': ['group'],
  '翻译': ['translate', 'translation', 'i18n'],
  '聊天': ['chat'],
  '背景': ['background'],
  '自动化': ['auto', 'automation'],
  '补丁': ['patch'],
  '表单': ['form', 'forms'],
  '表格': ['table', 'sheet', 'excel'],
  '视频': ['video', 'media', 'movie'],
  '计算': ['calc', 'math'],
  '记忆': ['memory', 'recall', 'mem'],
  '设置': ['settings', 'config', 'preferences'],
  '设计': ['design'],
  '访问': ['access'],
  '识别': ['recognize', 'ocr'],
  '语音': ['audio', 'voice', 'asr', 'speech'],
  '调试': ['debug'],
  '跨平台': ['across', 'cross'],
  '轮次': ['turn'],
  '输入': ['input', 'composer'],
  '远程': ['remote'],
  '连接': ['connect'],
  '通知': ['notify', 'notification', 'alert'],
  '邮件': ['mail', 'email'],
  '部署': ['deploy'],
  '配置': ['config', 'profile', 'settings'],
  '配色': ['color', 'colors', 'palette'],
  '配额': ['limit', 'quota'],
  '阅读': ['read'],
  '阅读器': ['reader'],
  '隔离': ['isolate', 'isolated'],
  '面板': ['panel', 'sidebar', 'ui', 'widget'],
  '音乐': ['music', 'audio'],
  '页面': ['page'],
  '项目': ['project'],
  '预设': ['preset'],
  '频道': ['channel'],
  '驱动': ['drive', 'driver'],
}

/** Chinese keywords a catalog row matches, derived from the term table. */
const GENERIC_ZH = new Set(['插件', '工具', '管理', '系统', '设置', '桌面'])

function zhKeywords(row) {
  const text = `${row.name || ''} ${row.summary || ''} ${row.category || ''}`.toLowerCase()
  const hits = []
  for (const [zh, english] of Object.entries(ZH_TERMS)) {
    if (GENERIC_ZH.has(zh)) continue
    if (english.some((word) => text.includes(word))) hits.push(zh)
  }
  return hits.slice(0, 8)
}

const SEARCH_INDEX_VERSION = 3

const CATEGORY_ZH = {
  tool: '工具',
  ui: '界面',
  integration: '集成',
  workflow: '工作流',
  other: '其他',
  provider: '模型接入',
  theme: '主题',
}

const MAX_PARALLEL = 6
const FETCH_TIMEOUT_MS = 20000

async function fetchJson(url, timeoutMs = FETCH_TIMEOUT_MS) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const response = await fetch(url, { signal: controller.signal })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return await response.json()
  } finally {
    clearTimeout(timer)
  }
}

/** The catalog's current published version, without downloading the manifest. */
async function latestTag() {
  try {
    const tags = await fetchJson(`${REGISTRY}/-/package/${CATALOG}/dist-tags`, 10000)
    return tags && typeof tags.latest === 'string' ? tags.latest : ''
  } catch {
    return ''
  }
}

async function fetchIndex(version) {
  for (const base of CDN_BASES) {
    try {
      return await fetchJson(`${base}/${CATALOG}@${version}/v1/index.json`)
    } catch {
      /* try the next mirror */
    }
  }
  return null
}

async function mapLimit(items, limit, worker) {
  const queue = items.slice()
  const runners = Array.from({ length: Math.min(limit, queue.length) }, async () => {
    while (queue.length) {
      const item = queue.shift()
      try {
        await worker(item)
      } catch {
        /* a single version failing must not abort the sweep */
      }
    }
  })
  await Promise.all(runners)
}

/** Fold per-version snapshots into one row per day, keeping the day's last build. */
function foldByDay(entries) {
  const days = new Map()
  for (const entry of entries) {
    const day = (entry.builtAt || entry.publishedAt || '').slice(0, 10)
    if (!day) continue
    const current = days.get(day)
    if (!current || (entry.builtAt || '') >= (current.builtAt || '')) days.set(day, { ...entry, day })
  }
  return [...days.values()].sort((a, b) => a.day.localeCompare(b.day))
}

async function collectTrend(readCache, writeCache) {
  const latest = await latestTag()
  const cached = readCache()
  if (cached && Array.isArray(cached.entries) && cached.entries.length) {
    // One probe per day is enough: the archive only grows when the catalog publishes.
    if (!latest || cached.latest === latest) return shape(cached.entries, cached.title, cached.at)
  }

  const meta = await fetchJson(`${REGISTRY}/${CATALOG}`)
  const versions = Object.keys(meta.versions || {})
  const published = meta.time || {}
  const known = new Map((cached && Array.isArray(cached.entries) ? cached.entries : []).map((e) => [e.version, e]))
  const missing = versions.filter((version) => !known.has(version))

  await mapLimit(missing, MAX_PARALLEL, async (version) => {
    const index = await fetchIndex(version)
    if (!index) return
    known.set(version, {
      version,
      count: Number(index.count) || 0,
      rejected: Number(index.rejected) || 0,
      builtAt: index.builtAt || published[version] || '',
      publishedAt: published[version] || '',
    })
  })

  const entries = [...known.values()].sort((a, b) => String(a.builtAt).localeCompare(String(b.builtAt)))
  const at = new Date().toISOString()
  writeCache({ entries, fetchedAt: Date.now(), at, title: CATALOG, latest })
  return shape(entries, CATALOG, at)
}

function shape(entries, title, at) {
  const days = foldByDay(entries)
  return {
    title,
    at,
    days: days.map((d) => ({ day: d.day, count: d.count, rejected: d.rejected })),
    versions: entries.length,
    latest: days.length ? days[days.length - 1] : null,
    first: days.length ? days[0] : null,
  }
}

/** Repository icons from the catalog, keyed by the `github:owner/repo` prefix. */
async function readIcons(version) {
  const file = await readCatalogFile(version, 'icons')
  const body = file && file.body
  if (!body || !body.icons || !body.sources) return new Map()
  const index = new Map()
  for (const [source, hash] of Object.entries(body.sources)) {
    const data = body.icons[hash]
    if (!data) continue
    if (source.startsWith('github:')) {
      const repo = source.slice(7).split('@')[0].toLowerCase()
      if (!index.has(`repo:${repo}`)) index.set(`repo:${repo}`, data)
    } else if (source.startsWith('npm:')) {
      const name = source.slice(4).split('@')[0].toLowerCase()
      if (name && !index.has(`npm:${name}`)) index.set(`npm:${name}`, data)
    }
  }
  return index
}

/** `2026.1113.0` -> `2026-11-13`; the middle segment packs month and day. */
function versionDate(version) {
  const [year, md] = String(version).split('.')
  if (!year || !md) return ''
  const month = md.length === 3 ? md.slice(0, 1) : md.slice(0, 2)
  const day = md.length === 3 ? md.slice(1) : md.slice(2)
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
}

function shiftDays(day, offset) {
  const date = new Date(`${day}T00:00:00Z`)
  date.setUTCDate(date.getUTCDate() + offset)
  return date.toISOString().slice(0, 10)
}

/** Read one file out of a catalog version. */
async function readCatalogFile(version, name) {
  const index = await fetchIndex(version)
  if (!index || !index[name] || !index[name].url) return null
  const url = `${CDN_BASES[0]}/${CATALOG}@${version}/v1/${index[name].url}`
  try {
    return { index, body: await fetchJson(url, 60000) }
  } catch {
    return { index, body: null }
  }
}

/**
 * Plugins whose repository gained the most GitHub stars over a window.
 * Star counts are repository-level, so entries sharing a repository collapse
 * into one row; the caller should label them as repository stars.
 */
async function collectHot(readCache, writeCache, days = 7) {
  const tag = await latestTag()
  const cached = readCache()
  if (cached && cached.value && Array.isArray(cached.value.top) && cached.value.top.length) {
    if (cached.value.v === SEARCH_INDEX_VERSION && (!tag || cached.latest === tag)) return cached.value
  }

  const meta = await fetchJson(`${REGISTRY}/${CATALOG}`)
  const versions = Object.keys(meta.versions || {})
  if (!versions.length) throw new Error('catalog has no versions')
  const latest = versions[versions.length - 1]
  const latestDay = versionDate(latest)
  const cutoff = shiftDays(latestDay, -days)
  const older = versions.filter((v) => versionDate(v) <= cutoff).pop()
  if (!older) throw new Error('catalog has no snapshot old enough')

  const [current, previous] = await Promise.all([
    readCatalogFile(latest, 'stars'),
    readCatalogFile(older, 'stars'),
  ])
  if (!current || !current.body || !previous || !previous.body) throw new Error('star snapshots unavailable')
  const pluginsFile = await readCatalogFile(latest, 'plugins')

  const byName = new Map()
  for (const entry of (pluginsFile && pluginsFile.body && pluginsFile.body.plugins) || []) {
    if (entry && entry.name) byName.set(entry.name, entry)
  }

  const repoOf = (key) => {
    const entry = byName.get(key)
    const repo = entry && entry.repository
    return repo ? repo.replace(/^https?:\/\/github\.com\//i, '').replace(/\/$/, '').toLowerCase() : String(key).toLowerCase()
  }

  const newStars = current.body.stars || {}
  const oldStars = previous.body.stars || {}
  const rows = new Map()
  for (const [key, value] of Object.entries(newStars)) {
    const before = oldStars[key]
    if (typeof before !== 'number') continue
    const delta = value - before
    if (delta <= 0) continue
    const repo = repoOf(key)
    const seen = rows.get(repo)
    if (seen && seen.delta >= delta) continue
    const entry = byName.get(key)
    const catalog = (entry && entry.catalog) || {}
    const summary = catalog.summary || {}
    rows.set(repo, {
      name: (entry && entry.name) || key,
      repo,
      delta,
      stars: value,
      category: catalog.category || '',
      categoryZh: CATEGORY_ZH[catalog.category] || '',
      summary: summary.zh || summary.en || '',
    })
  }

  const ranked = [...rows.values()].sort((a, b) => b.delta - a.delta).slice(0, 50)
  const icons = await readIcons(latest).catch(() => new Map())
  const top = ranked.map((row) => ({
    ...row,
    icon: icons.get(`repo:${row.repo}`) || icons.get(`npm:${String(row.name).toLowerCase()}`) || '',
  }))
  const value = { v: SEARCH_INDEX_VERSION, days, from: older, to: latest, fromDay: versionDate(older), toDay: latestDay, total: rows.size, top }
  writeCache({ fetchedAt: Date.now(), value, latest })
  return value
}

/**
 * Compact plugin index for search: one row per package with only the fields
 * the UI shows. Built once from the catalog and cached on disk.
 */
async function buildCatalogIndex() {
  const tag = await latestTag()
  const versions = await fetchJson(`${REGISTRY}/${CATALOG}`).then((m) => Object.keys(m.versions || {}))
  const latest = versions[versions.length - 1]
  if (!latest) throw new Error('catalog has no versions')
  const [file, starFile] = await Promise.all([
    readCatalogFile(latest, 'plugins'),
    readCatalogFile(latest, 'stars'),
  ])
  const starMap = (starFile && starFile.body && starFile.body.stars) || {}
  const entries = (file && file.body && file.body.plugins) || []
  const rows = []
  for (const entry of entries) {
    if (!entry || !entry.name) continue
    const catalog = entry.catalog || {}
    const summary = catalog.summary || {}
    const repo = String(entry.repository || '').replace(/^https?:\/\/github\.com\//i, '').replace(/\/$/, '')
    rows.push({
      name: entry.name,
      version: entry.version || '',
      category: catalog.category || '',
      categoryZh: CATEGORY_ZH[catalog.category] || '',
      summary: summary.zh || summary.en || '',
      repo,
      added: entry.added || '',
      publishedAt: entry.publishedAt || '',
      stars: starMap[entry.name] || starMap[repo] || 0,
    })
    rows[rows.length - 1].keywords = zhKeywords(rows[rows.length - 1])
  }
  return { v: SEARCH_INDEX_VERSION, latest: tag || latest, rows }
}

async function collectSearch(readCache, writeCache, query, limit = 100, sort = 'hot', options = {}) {
  const needle = String(query || '').trim().toLowerCase()
  const category = typeof options.category === 'string' ? options.category : ''
  if (!needle && !category) return { query: '', items: [], total: 0, refreshed: false }

  let index = readCache()
  const missing = !index
    || index.v !== SEARCH_INDEX_VERSION
    || !Array.isArray(index.rows)
    || !index.rows.length

  let refreshed = false
  if (missing) {
    // 首次使用或索引格式变更：必须建一次
    index = await buildCatalogIndex()
    writeCache(index)
    refreshed = true
  } else if (options.checkVersion === true) {
    // 只有显式要求时才联网确认目录版本（「刷新」按钮）。日常搜索完全走本地。
    const tag = await latestTag()
    if (tag && index.latest !== tag) {
      index = await buildCatalogIndex()
      writeCache(index)
      refreshed = true
    }
  }

  const terms = [needle]
  for (const [zh, english] of Object.entries(ZH_TERMS)) {
    if (needle.includes(zh)) terms.push(...english)
  }

  const matched = []
  for (const row of index.rows) {
    if (category && row.category !== category) continue
    if (!needle) { matched.push(row); continue }
    const haystack = `${row.name} ${row.summary} ${row.category} ${row.categoryZh || ''}`.toLowerCase()
    if (terms.some((term) => haystack.includes(term))) matched.push(row)
  }

  // 排序独立于分类：选了分类照样能切「最热 / 最新」
  if (sort === 'new') {
    matched.sort((a, b) => String(b.publishedAt || b.added || '').localeCompare(String(a.publishedAt || a.added || '')))
  } else {
    matched.sort((a, b) => (b.stars || 0) - (a.stars || 0))
  }

  const offset = Math.max(0, Number(options.offset) || 0)
  const total = matched.length
  const page = matched.slice(offset, offset + limit)
  return {
    query,
    sort,
    category,
    refreshed,
    total,
    offset,
    limit,
    pageCount: Math.max(1, Math.ceil(total / limit)),
    items: page,
  }
}

export { collectTrend, collectHot, collectSearch }
