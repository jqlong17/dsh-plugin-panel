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
  const cached = readCache()
  if (cached && Array.isArray(cached.entries) && cached.entries.length) {
    const age = Date.now() - (cached.fetchedAt || 0)
    if (age < 6 * 3600 * 1000) return shape(cached.entries, cached.title, cached.at)
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
  writeCache({ entries, fetchedAt: Date.now(), at, title: CATALOG })
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

export { collectTrend }
