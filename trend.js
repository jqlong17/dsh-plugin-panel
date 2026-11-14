/**
 * Catalog trend: how many plugins the dsh-plugin-shop catalog listed on each
 * day. The catalog publishes one immutable npm version per build, so the
 * version list doubles as a dated history; we read only the small index.json
 * of each version instead of downloading its multi-megabyte tarball.
 */

const CATALOG = 'dsh-plugin-shop-catalog'
const CDN_BASES = ['https://cdn.jsdelivr.net/npm', 'https://unpkg.com']
const REGISTRY = 'https://registry.npmjs.org'
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
    if (!tag || cached.latest === tag) return cached.value
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
      summary: summary.zh || summary.en || '',
    })
  }

  const ranked = [...rows.values()].sort((a, b) => b.delta - a.delta).slice(0, 50)
  const icons = await readIcons(latest).catch(() => new Map())
  const top = ranked.map((row) => ({
    ...row,
    icon: icons.get(`repo:${row.repo}`) || icons.get(`npm:${String(row.name).toLowerCase()}`) || '',
  }))
  const value = { days, from: older, to: latest, fromDay: versionDate(older), toDay: latestDay, total: rows.size, top }
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
  const file = await readCatalogFile(latest, 'plugins')
  const entries = (file && file.body && file.body.plugins) || []
  const rows = []
  for (const entry of entries) {
    if (!entry || !entry.name) continue
    const catalog = entry.catalog || {}
    const summary = catalog.summary || {}
    rows.push({
      name: entry.name,
      version: entry.version || '',
      category: catalog.category || '',
      summary: summary.zh || summary.en || '',
      repo: String(entry.repository || '').replace(/^https?:\/\/github\.com\//i, '').replace(/\/$/, ''),
    })
  }
  return { latest: tag || latest, rows }
}

async function collectSearch(readCache, writeCache, query, limit = 100) {
  const needle = String(query || '').trim().toLowerCase()
  if (!needle) return { query: '', items: [], total: 0 }

  let index = readCache()
  if (!index || !Array.isArray(index.rows) || !index.rows.length) {
    index = await buildCatalogIndex()
    writeCache(index)
  } else {
    const tag = await latestTag()
    if (tag && index.latest !== tag) {
      index = await buildCatalogIndex()
      writeCache(index)
    }
  }

  const items = []
  for (const row of index.rows) {
    if (row.name.toLowerCase().includes(needle)
      || row.summary.toLowerCase().includes(needle)
      || row.category.toLowerCase().includes(needle)) {
      items.push(row)
      if (items.length >= limit) break
    }
  }
  return { query, items, total: index.rows.length }
}

export { collectTrend, collectHot, collectSearch }
