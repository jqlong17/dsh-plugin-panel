import { createRequire } from 'node:module'
import { spawn } from 'node:child_process'
import { mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { collectHot, collectSearch, collectTrend } from './trend.js'

const CHANNEL = '/dsh-plugins-ui-rpc'
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
  return collectSearch(readSearchCache, writeSearchCache, query, 100)
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
