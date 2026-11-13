window.__ModuleLoader__.load({
  id: 'dsh-plugin-panel',
  factory(require) {
    const React = require('react')
    const h = React.createElement
    const PANEL_ID = 'dsh-plugins-ui'
    const TAB_KIND = 'plugin-canvas'
    const NS = 'dsh-plugins-ui'
    const VERSION = 'v0.1.0'
    const PREF_KEY = 'dsh.plugin-list.pref.v2'

    const COPY = {
      zh: {
        'tab.title': '插件管理',
        'guide.title': '插件管理',
        'guide.description': '查看并打开右侧栏插件。',
        'list.installed': '用户安装',
        'list.builtin': '系统内置',
        'list.all': '全部',
        'list.refresh': '刷新',
        'list.viewList': '列表',
        'list.viewCard': '卡片',
        'list.open': '打开',
        'list.placeRight': '右侧栏',
        'list.placeSettings': '设置',
        'list.placeLeft': '左侧菜单',
        'list.placeNone': '无界面入口',
        'list.pin': '置顶',
        'list.unpin': '取消置顶',
        'list.noPanel': '这个插件没有右侧栏页面。',
        'list.loading': '正在读取插件…',
        'list.empty': '没有匹配的插件。',
        'list.error': '读不到插件列表。',
        'list.retry': '重试',
        'list.unavailable': '这个配置档没有插件管理服务。',
        'list.running': '运行中',
        'list.stopped': '已停用',
        'list.failed': '失败',
        'list.install': '安装',
        'list.active': '活跃',
        'list.unknown': '未记录',
        
        'list.close': '关闭',
        'list.enable': '启用',
        'list.disable': '停用',
        'list.reveal': '打开所在位置',
        'list.revealFailed': '没有打开目录。',
        'list.revealRestart': '打开所在位置需要在重启 DeepSeek Harness 后可用。',
        'list.locked': '这项不能在这里开关。',
        'list.intro': '介绍',
        'list.package': '包名',
        'list.version': '版本',
        'list.source': '来源',
        'list.doc': '说明文档',
        
        'list.docLoading': '正在读取说明…',
        'list.docEmpty': '没有说明文档。',
        'list.module': '模块',
        'list.entry': '入口',
        'list.place': '位置',
        'list.placeInstallation': '系统安装',
        'list.placeProfile': '本机安装',
        'list.status': '状态',
        'list.flags': '标记',
        'list.official': '官方',
        'list.optional': '可选',
        'list.removable': '可卸载',
        'list.fixed': '不可卸载',
        'list.components': '同包组件',
        'list.license': '许可',
        'list.repo': '仓库',
        'list.engines': '引擎',
        'list.keywords': '关键词',
        'list.inject': '界面依赖',
      },
      en: {
        'tab.title': 'Plugin manager',
        'guide.title': 'Plugin manager',
        'guide.description': 'Browse and open right-sidebar plugins.',
        'list.installed': 'Installed',
        'list.builtin': 'Built-in',
        'list.all': 'All',
        'list.refresh': 'Refresh',
        'list.viewList': 'List',
        'list.viewCard': 'Cards',
        'list.open': 'Open',
        'list.placeRight': 'Right sidebar',
        'list.placeSettings': 'Settings',
        'list.placeLeft': 'Left menu',
        'list.placeNone': 'No UI entry',
        'list.pin': 'Pin',
        'list.unpin': 'Unpin',
        'list.noPanel': 'This plugin has no right-sidebar page.',
        'list.loading': 'Reading plugins…',
        'list.empty': 'No plugins match.',
        'list.error': 'Could not read the plugin list.',
        'list.retry': 'Retry',
        'list.unavailable': 'This profile has no plugin manager.',
        'list.running': 'Running',
        'list.stopped': 'Stopped',
        'list.failed': 'Failed',
        'list.install': 'Installed',
        'list.active': 'Active',
        'list.unknown': 'Unknown',
        
        'list.close': 'Close',
        'list.enable': 'Enable',
        'list.disable': 'Disable',
        'list.reveal': 'Show in Finder',
        'list.revealFailed': 'The folder did not open.',
        'list.revealRestart': 'Show in Finder becomes available after restarting DeepSeek Harness.',
        'list.locked': 'This row cannot be switched here.',
        'list.intro': 'Introduction',
        'list.package': 'Package',
        'list.version': 'Version',
        'list.source': 'Source',
        'list.doc': 'Notes',
        
        'list.docLoading': 'Reading notes…',
        'list.docEmpty': 'No notes.',
        'list.module': 'Module',
        'list.entry': 'Entry',
        'list.place': 'Location',
        'list.placeInstallation': 'Shipped with DSH',
        'list.placeProfile': 'Installed in this profile',
        'list.status': 'Status',
        'list.flags': 'Flags',
        'list.official': 'Official',
        'list.optional': 'Optional',
        'list.removable': 'Removable',
        'list.fixed': 'Not removable',
        'list.components': 'Components',
        'list.license': 'License',
        'list.repo': 'Repository',
        'list.engines': 'Engine',
        'list.keywords': 'Keywords',
        'list.inject': 'UI dependencies',
      },
    }

    function textOf(t, key) {
      try {
        const value = typeof t === 'function' ? t(key) : key
        return typeof value === 'string' && value ? value : key
      } catch {
        return key
      }
    }

    function loadPref() {
      try {
        const parsed = JSON.parse(window.localStorage.getItem(PREF_KEY) || '{}')
        return {
          filter: ['installed', 'builtin', 'all'].includes(parsed.filter) ? parsed.filter : 'installed',
          pins: Array.isArray(parsed.pins) ? parsed.pins.filter((id) => typeof id === 'string') : [],
          layout: parsed.layout === 'card' ? 'card' : 'list',
        }
      } catch {
        return { filter: 'installed', pins: [], layout: 'list' }
      }
    }

    function savePref(pref) {
      try { window.localStorage.setItem(PREF_KEY, JSON.stringify(pref)) } catch { /* ignore */ }
    }

    function resolveText(value, localeId) {
      if (typeof value === 'string') return value
      if (!value || typeof value !== 'object') return ''
      const lang = String(localeId || 'zh').split('-')[0].toLowerCase()
      return value[localeId] || value[lang] || value.zh || value.en || Object.values(value).find((item) => typeof item === 'string') || ''
    }

    function shortModule(name) {
      const text = String(name || '')
      if (!text) return ''
      if (text.startsWith('file:') || text.includes('/node_modules/')) {
        const parts = text.replace(/^file:\/\//, '').split('/')
        const at = parts.lastIndexOf('node_modules')
        if (at >= 0 && parts[at + 1]) {
          return parts[at + 1].startsWith('@') && parts[at + 2] ? `${parts[at + 1]}/${parts[at + 2]}` : parts[at + 1]
        }
      }
      return text
    }

    function pluginTitle(plugin, localeId) {
      const title = resolveText(plugin.meta && plugin.meta.title, localeId)
      if (title && !title.startsWith('file:') && !title.includes('/node_modules/')) return title
      return shortModule(plugin.moduleName) || shortModule(plugin.entryId) || title || ''
    }

    // Keep aligned with catalog.js originOf. The browser bundle cannot import it.
    function originOf(plugin) {
      const name = String(plugin.moduleName || '')
      if (name.startsWith('cordis:')) return 'system'
      if (name.startsWith('@deepseek-ai/')) return 'builtin'
      return 'installed'
    }

    function phaseKey(plugin) {
      if (!plugin.enabled) return 'list.stopped'
      if (plugin.fiberPhase === 'failed') return 'list.failed'
      return 'list.running'
    }

    function safeIcon(src) {
      if (typeof src !== 'string') return ''
      const value = src.trim()
      if (value.startsWith('data:image/') || value.startsWith('/') || value.startsWith('plugins/') || value.startsWith('https://') || value.startsWith('http://')) return value
      return ''
    }

    function languageOf(id) {
      const match = String(id || 'zh').match(/[a-z]{2,8}(?:-[a-z0-9]{1,8})*/i)
      return match ? match[0] : 'zh'
    }

    function markdownOf(result) {
      const value = result && result.ok === true ? result.value : result
      const body = value && value.markdown ? value : (value && value.value) || value
      const text = body && typeof body.markdown === 'string' ? body.markdown : ''
      return text.replace(/^---[\s\S]*?---\s*/, '').trim().slice(0, 8000)
    }

    function inlineMarkdown(text) {
      const nodes = []
      const pattern = /(`[^`]+`)|(\*\*[^*]+\*\*)|(\[[^\]]+\]\(https?:\/\/[^)\s]+\))/g
      let last = 0
      let match = pattern.exec(text)
      while (match) {
        if (match.index > last) nodes.push(text.slice(last, match.index))
        const token = match[0]
        if (token.startsWith('`')) nodes.push(h('code', null, token.slice(1, -1)))
        else if (token.startsWith('**')) nodes.push(h('strong', null, token.slice(2, -2)))
        else {
          const link = token.match(/^\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)$/)
          if (link) nodes.push(h('a', { href: link[2], target: '_blank', rel: 'noreferrer' }, link[1]))
        }
        last = match.index + token.length
        match = pattern.exec(text)
      }
      if (last < text.length) nodes.push(text.slice(last))
      return nodes
    }

    function directoryFromSource(source) {
      const raw = String(source || '')
      const at = raw.lastIndexOf('@')
      const tail = at >= 0 ? raw.slice(at + 1) : raw
      if (tail.startsWith('link:')) return tail.slice(5)
      if (tail.startsWith('file:') && !/\.(tgz|tar\.gz)$/i.test(tail)) return tail.slice(5)
      return ''
    }

    function detailNames(plugin, bundle) {
      const names = []
      const moduleName = String((plugin && plugin.moduleName) || '')
      if (moduleName && !moduleName.includes('/') && !moduleName.startsWith('file:')) names.push(moduleName)
      if (bundle && bundle.name && !names.includes(bundle.name)) names.push(bundle.name)
      return names
    }

    function tableCells(line) {
      return line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((cell) => cell.trim())
    }

    function isTableRow(line) {
      const trimmed = line.trim()
      return trimmed.startsWith('|') && trimmed.endsWith('|') && trimmed.includes('|')
    }

    function renderTable(rows) {
      const parsed = rows.map(tableCells).filter((cells) => cells.some(Boolean))
      const body = parsed.filter((cells) => !cells.every((cell) => /^:?-{3,}:?$/.test(cell)))
      if (body.length < 2) return null
      const head = body[0]
      const rest = body.slice(1)
      return h('div', { className: 'dsh-pl-table-wrap' },
        h('table', null,
          h('thead', null, h('tr', null, head.map((cell, index) => h('th', { key: index }, inlineMarkdown(cell))))),
          h('tbody', null, rest.map((row, rowIndex) => h('tr', { key: rowIndex },
            head.map((_, index) => h('td', { key: index }, inlineMarkdown(row[index] || ''))))))))
    }

    function markdownView(source) {
      const lines = String(source || '').replace(/\r\n/g, '\n').split('\n')
      const blocks = []
      let list = null
      let paragraph = []
      let table = null
      const flushParagraph = () => {
        if (!paragraph.length) return
        blocks.push(h('p', { key: `p-${blocks.length}` }, inlineMarkdown(paragraph.join(' '))))
        paragraph = []
      }
      const flushList = () => {
        if (!list) return
        blocks.push(h('ul', { key: `ul-${blocks.length}` }, list.map((item, index) => h('li', { key: index }, inlineMarkdown(item)))))
        list = null
      }
      const flushTable = () => {
        if (!table) return
        const node = renderTable(table)
        if (node) blocks.push(h('div', { key: `table-${blocks.length}` }, node))
        table = null
      }
      lines.forEach((line) => {
        const trimmed = line.trim()
        if (isTableRow(trimmed)) {
          flushParagraph()
          flushList()
          table = table || []
          table.push(trimmed)
          return
        }
        flushTable()
        if (!trimmed || trimmed.startsWith('![')) {
          flushParagraph()
          flushList()
          return
        }
        const heading = /^(#{1,4})\s+(.*)$/.exec(trimmed)
        if (heading) {
          flushParagraph()
          flushList()
          blocks.push(h(heading[1].length <= 2 ? 'h3' : 'h4', { key: `h-${blocks.length}`, className: 'dsh-pl-md-h' }, inlineMarkdown(heading[2])))
          return
        }
        const item = /^[-*]\s+(.*)$/.exec(trimmed)
        if (item) {
          flushParagraph()
          list = list || []
          list.push(item[1])
          return
        }
        flushList()
        paragraph.push(trimmed.replace(/^>\s?/, ''))
      })
      flushParagraph()
      flushList()
      flushTable()
      return h('div', { className: 'dsh-pl-md' }, blocks)
    }

    function unwrapList(result) {
      if (Array.isArray(result)) return result
      if (result && result.ok === true && Array.isArray(result.value)) return result.value
      throw new Error(result && result.error && result.error.message ? result.error.message : 'list failed')
    }

    function tabKindFor(plugin, entries, localeId) {
      const names = new Set([
        plugin.entryId,
        plugin.moduleName,
        shortModule(plugin.moduleName),
        plugin.patchId,
        String(plugin.entryId || '').replace(/^include:/, ''),
      ].filter(Boolean))
      const title = pluginTitle(plugin, localeId)
      const hit = (entries || []).find((entry) => {
        if (!entry || !entry.kind) return false
        if (names.has(entry.id) || names.has(entry.providerId) || names.has(entry.kind)) return true
        const label = typeof entry.title === 'function' ? entry.title() : entry.title
        return Boolean(label && title && label === title)
      })
      return hit ? hit.kind : ''
    }

    function namesOf(plugin) {
      return new Set([
        plugin.entryId,
        plugin.moduleName,
        shortModule(plugin.moduleName),
        plugin.patchId,
        String(plugin.entryId || '').replace(/^include:/, ''),
      ].filter(Boolean))
    }

    function placesFor(plugin, guide, seats, localeId) {
      const names = namesOf(plugin)
      const places = []
      if (tabKindFor(plugin, guide, localeId)) places.push('right')
      for (const seat of seats || []) {
        const id = seat.id || seat.key
        const owner = seat.registrant
        if (names.has(id) || names.has(owner) || names.has(shortModule(owner))) {
          if (!places.includes(seat.place)) places.push(seat.place)
        }
      }
      return places
    }

    function matchBundle(plugin, bundles) {
      const moduleName = String(plugin.moduleName || '')
      const short = shortModule(moduleName)
      return bundles.find((bundle) => {
        if (!bundle) return false
        if (bundle.name === moduleName || bundle.name === short) return true
        const rows = Array.isArray(bundle.rows) ? bundle.rows : []
        return rows.some((row) => row.moduleName === moduleName || row.entryId === plugin.entryId)
      }) || null
    }

    function DefaultPluginIcon() {
      return h('svg', {
        className: 'dsh-pl-fallback',
        width: 28,
        height: 28,
        viewBox: '0 0 32 32',
        'aria-hidden': true,
      },
      h('rect', { x: 1, y: 1, width: 30, height: 30, rx: 7, fill: 'var(--dsw-alias-bg-layer-2)', stroke: 'var(--dsw-alias-border-l2)' }),
      h('rect', { x: 8, y: 8, width: 7, height: 7, rx: 1.6, fill: 'var(--dsw-alias-label-secondary)' }),
      h('rect', { x: 17, y: 8, width: 7, height: 7, rx: 1.6, fill: 'var(--dsw-alias-label-secondary)', opacity: 0.45 }),
      h('rect', { x: 8, y: 17, width: 7, height: 7, rx: 1.6, fill: 'var(--dsw-alias-label-secondary)', opacity: 0.45 }),
      h('rect', { x: 17, y: 17, width: 7, height: 7, rx: 1.6, fill: 'var(--dsw-alias-label-secondary)' }))
    }

    function PluginIcon({ size }) {
      const edge = size > 0 ? size : 16
      return h('svg', {
        width: edge, height: edge, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': true,
        style: { display: 'block' },
      },
      h('rect', { x: 4, y: 5, width: 16, height: 3, rx: 1, fill: 'currentColor' }),
      h('rect', { x: 4, y: 10.5, width: 16, height: 3, rx: 1, fill: 'currentColor' }),
      h('rect', { x: 4, y: 16, width: 10, height: 3, rx: 1, fill: 'currentColor' }))
    }

    function ListView(props) {
      const t = typeof props.t === 'function' ? props.t : (key) => key
      const listPlugins = props.listPlugins
      const listBundles = props.listBundles
      const readBundleDetail = props.readBundleDetail
      const loadFacts = props.loadFacts
      const setPluginEnabled = props.setPluginEnabled
      const listGuide = props.listGuide
      const openPanel = props.openPanel
      const pref = React.useRef(loadPref())
      const [filter, setFilter] = React.useState(pref.current.filter)
      const [pins, setPins] = React.useState(pref.current.pins || [])
      const [view, setView] = React.useState(pref.current.layout === 'card' ? 'card' : 'list')
      const [plugins, setPlugins] = React.useState([])
      const [bundles, setBundles] = React.useState([])
      const [status, setStatus] = React.useState(listPlugins ? 'loading' : 'unavailable')
      const [error, setError] = React.useState('')
      const [selectedId, setSelectedId] = React.useState('')
      const [readme, setReadme] = React.useState('')
      const [readmeStatus, setReadmeStatus] = React.useState('')
      const [facts, setFacts] = React.useState(null)
      const [revealNote, setRevealNote] = React.useState('')
      const [guide, setGuide] = React.useState(() => typeof listGuide === 'function' ? listGuide() : [])
      const [seats, setSeats] = React.useState(() => typeof props.listSeats === 'function' ? props.listSeats() : [])
      const [localeId, setLocaleId] = React.useState('zh')

      function remember(next) {
        pref.current = { ...pref.current, ...next }
        savePref(pref.current)
      }

      const load = React.useCallback(async () => {
        if (!listPlugins) {
          setStatus('unavailable')
          return
        }
        setStatus((current) => (current === 'ready' ? 'ready' : 'loading'))
        setError('')
        try {
          const list = unwrapList(await listPlugins()).filter((item) => item && item.entryId && originOf(item) !== 'system')
          setPlugins(list)
          setStatus('ready')
          if (typeof listBundles === 'function') {
            try {
              const bundleResult = unwrapList(await listBundles())
              setBundles(Array.isArray(bundleResult) ? bundleResult : [])
            } catch { /* package facts stay empty; the list itself still renders */ }
          }
          } catch (failure) {
          setError(failure instanceof Error ? failure.message : textOf(t, 'list.error'))
          setStatus((current) => (current === 'ready' ? 'ready' : 'error'))
        }
      }, [listPlugins, listBundles, t])

      React.useEffect(() => { void load() }, [load])
      React.useEffect(() => {
        if (typeof listGuide !== 'function') return undefined
        const refresh = () => setGuide(listGuide() || [])
        refresh()
        return typeof props.subscribeGuide === 'function' ? props.subscribeGuide(refresh) : undefined
      }, [listGuide, props.subscribeGuide])
      React.useEffect(() => {
        if (typeof props.listSeats !== 'function') return undefined
        setSeats(props.listSeats() || [])
        return typeof props.subscribeSeats === 'function' ? props.subscribeSeats(() => setSeats(props.listSeats() || [])) : undefined
      }, [props.listSeats, props.subscribeSeats])
      React.useEffect(() => {
        if (typeof props.subscribeLocale !== 'function') return undefined
        const read = () => {
          try {
            const snap = props.readLocale()
            return snap && (snap.id || snap.locale) || 'zh'
          } catch {
            return 'zh'
          }
        }
        setLocaleId(read())
        return props.subscribeLocale(() => setLocaleId(read()))
      }, [props.subscribeLocale, props.readLocale])

      React.useEffect(() => {
        if (!selectedId) {
          setReadme('')
          setReadmeStatus('')
          return undefined
        }
        const plugin = plugins.find((item) => item.entryId === selectedId)
        const bundle = plugin ? matchBundle(plugin, bundles) : null
        const candidates = plugin ? detailNames(plugin, bundle) : []
        if (!candidates.length) {
          setReadme('')
          setReadmeStatus('empty')
          return undefined
        }
        let cancelled = false
        setReadmeStatus('loading')
        const run = async () => {
          for (const name of candidates) {
            if (cancelled) return
            try {
              const result = await readBundleDetail(name, languageOf(localeId))
              if (cancelled) return
              const markdown = markdownOf(result)
              if (markdown) {
                setReadme(markdown)
                setReadmeStatus('ready')
                return
              }
            } catch { /* the next candidate may still resolve */ }
          }
          if (!cancelled) {
            setReadme('')
            setReadmeStatus('empty')
          }
        }
        void run()
        return () => { cancelled = true }
      }, [selectedId, plugins, bundles, localeId, readBundleDetail])

      React.useEffect(() => {
        if (!selectedId || typeof loadFacts !== 'function') {
          setFacts(null)
          return undefined
        }
        const plugin = plugins.find((item) => item.entryId === selectedId)
        if (!plugin) return undefined
        let cancelled = false
        loadFacts({
          moduleName: plugin.moduleName || '',
          source: (matchBundle(plugin, bundles) || {}).source || '',
        }).then((result) => {
          if (cancelled) return
          const value = result && result.ok === true ? result.value : result
          setFacts(value && (value.document || value.manifest) ? value : null)
        }).catch(() => { if (!cancelled) setFacts(null) })
        return () => { cancelled = true }
      }, [selectedId, plugins, bundles, loadFacts])

      const visible = React.useMemo(() => {
        const rows = plugins.filter((plugin) => {
          const origin = originOf(plugin)
          if (filter === 'installed') return origin === 'installed'
          if (filter === 'builtin') return origin === 'builtin'
          return true
        })
        const rank = (plugin) => {
          const places = placesFor(plugin, guide, seats, localeId)
          if (places.includes('right')) return 0
          if (places.includes('settings')) return 1
          if (places.includes('left')) return 2
          return 3
        }
        const pinAt = (plugin) => {
          const index = pins.indexOf(plugin.entryId)
          return index < 0 ? Number.POSITIVE_INFINITY : index
        }
        rows.sort((a, b) => pinAt(a) - pinAt(b) || rank(a) - rank(b) || pluginTitle(a, localeId).localeCompare(pluginTitle(b, localeId), 'zh'))
        return rows
      }, [plugins, filter, localeId, guide, seats, pins])

      const selected = plugins.find((item) => item.entryId === selectedId) || null
      const selectedBundle = selected ? matchBundle(selected, bundles) : null

      function fact(label, value) {
        if (!value) return null
        return h('div', { className: 'dsh-pl-fact' },
          h('span', { className: 'dsh-pl-fact-label' }, label),
          h('span', { className: 'dsh-pl-fact-value' }, value))
      }

      function revealHint(text) {
        const raw = String(text || '')
        if (/Unknown detail method|invalid server-response|unaddressable|not found/i.test(raw)) return textOf(t, 'list.revealRestart')
        return raw || textOf(t, 'list.revealFailed')
      }

      function detailAside(plugin) {
        const title = pluginTitle(plugin, localeId)
        const icon = safeIcon(plugin.meta && plugin.meta.icon)
        const manifest = facts && facts.manifest
        const intro = resolveText(plugin.meta && plugin.meta.description, localeId)
          || (manifest && manifest.summary)
          || (selectedBundle && selectedBundle.description)
          || ''
        const place = selectedBundle && selectedBundle.availability === 'profile'
          ? textOf(t, 'list.placeProfile')
          : selectedBundle && selectedBundle.availability === 'installation'
            ? textOf(t, 'list.placeInstallation')
            : ''
        const source = (selectedBundle && selectedBundle.source) || place
        const flags = [
          selectedBundle && selectedBundle.official ? textOf(t, 'list.official') : '',
          selectedBundle && selectedBundle.optional ? textOf(t, 'list.optional') : '',
          selectedBundle ? (selectedBundle.removable ? textOf(t, 'list.removable') : textOf(t, 'list.fixed')) : '',
        ].filter(Boolean).join(' · ')
        const rows = selectedBundle && Array.isArray(selectedBundle.rows) ? selectedBundle.rows : []
        const siblings = rows
          .filter((row) => row && row.entryId !== plugin.entryId)
          .slice(0, 6)
          .map((row) => shortModule(row.moduleName) || row.rowId)
          .filter(Boolean)
        const componentText = rows.length
          ? `${rows.length}${siblings.length ? ` · ${siblings.join('、')}${rows.length > 7 ? '…' : ''}` : ''}`
          : ''
        return h('aside', { className: 'dsh-pl-detail' },
          h('div', { className: 'dsh-pl-detail-head' },
            icon ? h('img', { src: icon, alt: '' }) : h(DefaultPluginIcon),
            h('strong', null, title),
            h('button', { type: 'button', onClick: () => setSelectedId('') }, textOf(t, 'list.close'))),
          h('div', { className: 'dsh-pl-detail-body' },
            fact(textOf(t, 'list.intro'), intro || textOf(t, 'list.unknown')),
            fact(textOf(t, 'list.module'), shortModule(plugin.moduleName)),
            fact(textOf(t, 'list.entry'), plugin.entryId),
            fact(textOf(t, 'list.status'), textOf(t, phaseKey(plugin))),
            fact(textOf(t, 'list.package'), (selectedBundle && selectedBundle.name) || (manifest && manifest.name) || shortModule(plugin.moduleName)),
            fact(textOf(t, 'list.version'), (selectedBundle && selectedBundle.version) || (manifest && manifest.version)),
            fact(textOf(t, 'list.place'), place),
            fact(textOf(t, 'list.source'), source),
            fact(textOf(t, 'list.flags'), flags),
            fact(textOf(t, 'list.components'), componentText),
            fact(textOf(t, 'list.license'), manifest && manifest.license),
            fact(textOf(t, 'list.repo'), manifest && manifest.repository),
            fact(textOf(t, 'list.engines'), manifest && manifest.engines),
            fact(textOf(t, 'list.keywords'), manifest && Array.isArray(manifest.keywords) ? manifest.keywords.join('、') : ''),
            fact(textOf(t, 'list.inject'), manifest && Array.isArray(manifest.clientInject) ? manifest.clientInject.join('、') : ''),
            h('section', { className: 'dsh-pl-doc-block' },
              h('div', { className: 'dsh-pl-fact-label' }, textOf(t, 'list.doc')),
              readmeStatus === 'loading'
                ? h('p', null, textOf(t, 'list.docLoading'))
                : (readme || (facts && facts.document))
                  ? markdownView(readme || facts.document)
                  : h('p', null, textOf(t, 'list.docEmpty'))),
            h('div', { className: 'dsh-pl-actions' },
              tabKindFor(plugin, guide, localeId) && typeof openPanel === 'function'
                ? h('button', {
                  type: 'button',
                  onClick: () => openPanel(tabKindFor(plugin, guide, localeId)),
                }, textOf(t, 'list.open'))
                : null,
              typeof props.revealPackage === 'function'
                ? h('button', {
                  type: 'button',
                  onClick: () => {
                    setRevealNote('')
                    const source = selectedBundle && selectedBundle.source
                    Promise.resolve(props.revealPackage({ moduleName: plugin.moduleName || '', source: source || '' })).then((result) => {
                      if (result && result.ok === false) setRevealNote(revealHint(result.error && result.error.message))
                    }).catch((failure) => {
                      setRevealNote(revealHint(failure instanceof Error ? failure.message : ''))
                    })
                  },
                }, textOf(t, 'list.reveal'))
                : null,
              plugin.patchId && plugin.readOnlyReason == null && setPluginEnabled
                ? h('button', {
                  type: 'button',
                  onClick: () => { void setPluginEnabled(plugin.entryId, plugin.enabled !== true).then(() => load()) },
                }, plugin.enabled ? textOf(t, 'list.disable') : textOf(t, 'list.enable'))
                : plugin.readOnlyReason
                  ? h('span', { className: 'dsh-pl-note' }, String(plugin.readOnlyReason))
                  : h('span', { className: 'dsh-pl-note' }, textOf(t, 'list.locked')),
              revealNote ? h('span', { className: 'dsh-pl-note' }, revealNote) : null)))
      }

      function togglePin(entryId) {
        setPins((current) => {
          const next = current.includes(entryId)
            ? current.filter((id) => id !== entryId)
            : [entryId, ...current]
          remember({ pins: next })
          return next
        })
      }

      function chip(id, label, current, onPick) {
        return h('button', {
          type: 'button',
          className: current === id ? 'is-on' : '',
          'aria-pressed': current === id,
          onClick: () => onPick(id),
        }, label)
      }

      return h('div', { className: 'dsh-pl' },
        h('style', null, CSS),
        h('header', { className: 'dsh-pl-bar' },
          h('div', { className: 'dsh-pl-tools' },
            h('div', { className: 'dsh-pl-seg', role: 'group', 'aria-label': 'filter' },
              chip('installed', textOf(t, 'list.installed'), filter, (id) => { setFilter(id); remember({ filter: id }) }),
              chip('builtin', textOf(t, 'list.builtin'), filter, (id) => { setFilter(id); remember({ filter: id }) }),
              chip('all', textOf(t, 'list.all'), filter, (id) => { setFilter(id); remember({ filter: id }) })),
            h('button', { type: 'button', onClick: () => { void load() } }, textOf(t, 'list.refresh')),
            h('div', { className: 'dsh-pl-view', role: 'group', 'aria-label': 'view' },
              chip('list', textOf(t, 'list.viewList'), view, (id) => { setView(id); remember({ layout: id }) }),
              chip('card', textOf(t, 'list.viewCard'), view, (id) => { setView(id); remember({ layout: id }) })),
            h('span', { className: 'dsh-pl-version' }, VERSION))),
        status === 'loading' && plugins.length === 0
          ? h('p', { className: 'dsh-pl-state' }, textOf(t, 'list.loading'))
          : status === 'unavailable'
            ? h('p', { className: 'dsh-pl-state' }, textOf(t, 'list.unavailable'))
            : status === 'error' && plugins.length === 0
              ? h('div', { className: 'dsh-pl-state' },
                h('p', null, error || textOf(t, 'list.error')),
                h('button', { type: 'button', onClick: () => { void load() } }, textOf(t, 'list.retry')))
              : selected
                ? detailAside(selected)
                : h('div', { className: 'dsh-pl-body' },
                h('div', { className: `dsh-pl-grid${view === 'card' ? ' is-card' : ''}` },
                  visible.length === 0
                    ? h('p', { className: 'dsh-pl-state' }, textOf(t, 'list.empty'))
                    : visible.map((plugin) => {
                      const title = pluginTitle(plugin, localeId)
                      const icon = safeIcon(plugin.meta && plugin.meta.icon)
                      const kind = tabKindFor(plugin, guide, localeId)
                      const pinned = pins.includes(plugin.entryId)
                      return h('div', {
                        key: plugin.entryId,
                        className: `dsh-pl-item${selectedId === plugin.entryId ? ' is-on' : ''}${pinned ? ' is-pinned' : ''}${plugin.fiberPhase === 'failed' ? ' is-failed' : ''}`,
                        role: 'button',
                        tabIndex: 0,
                        onClick: () => setSelectedId(plugin.entryId),
                        onKeyDown: (event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault()
                            setSelectedId(plugin.entryId)
                          }
                        },
                      },
                      icon
                        ? h('img', { src: icon, alt: '', draggable: false })
                        : h(DefaultPluginIcon),
                      h('span', { className: 'dsh-pl-copy' },
                        h('strong', null, title),
                        h('span', { className: 'dsh-pl-where' },
                          (placesFor(plugin, guide, seats, localeId).map((place) => textOf(t, place === 'right' ? 'list.placeRight' : place === 'settings' ? 'list.placeSettings' : 'list.placeLeft')).join(' · ')
                            || textOf(t, 'list.placeNone')))),
                      h('div', { className: 'dsh-pl-acts' },
                        h('button', {
                          type: 'button',
                          className: 'dsh-pl-pin',
                          'aria-pressed': pinned,
                          onClick: (event) => {
                            event.stopPropagation()
                            togglePin(plugin.entryId)
                          },
                        }, pinned ? textOf(t, 'list.unpin') : textOf(t, 'list.pin')),
                        kind ? h('button', {
                          type: 'button',
                          className: 'dsh-pl-open',
                          onClick: (event) => {
                            event.stopPropagation()
                            if (typeof openPanel === 'function') openPanel(kind)
                          },
                        }, textOf(t, 'list.open')) : null))
                    }))))
    }

    const CSS = `
.dsh-pl, .dsh-pl * { box-sizing: border-box; }
.dsh-pl { display: flex; flex-direction: column; flex: 1 1 auto; height: 100%; min-height: 0; min-width: 0; padding-top: 8px; color: var(--dsw-alias-label-primary); background: var(--dsw-alias-bg-base); font: 13px/1.4 inherit; }
.dsh-pl-bar { display: flex; flex: none; flex-direction: column; gap: 8px; margin: 0; padding: 12px 12px 10px; border-bottom: 1px solid var(--dsw-alias-border-l1); background: var(--dsw-specific-sidebar-fill, var(--dsw-alias-bg-layer-1)); position: relative; z-index: 1; }
.dsh-pl-top { display: flex; align-items: center; justify-content: space-between; }
.dsh-pl-version, .dsh-pl-hint, .dsh-pl-item span { color: var(--dsw-alias-label-secondary); font-size: 11px; }
.dsh-pl-hint { margin: 0; }
.dsh-pl-tools { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; width: 100%; }
.dsh-pl-version { margin-left: 8px; }
.dsh-pl-view { display: flex; gap: 2px; margin-left: auto; padding: 2px; border-radius: 8px; background: var(--dsw-alias-bg-layer-2); }
.dsh-pl-view button { border: 0; border-radius: 6px; padding: 3px 8px; font-size: 11px; background: transparent; color: var(--dsw-alias-label-secondary); }
.dsh-pl-view button.is-on { background: var(--dsw-alias-bg-base); color: var(--dsw-alias-label-primary); font-weight: 600; }
.dsh-pl-seg { display: flex; gap: 2px; padding: 3px; border: 0; border-radius: 10px; background: var(--dsw-alias-bg-layer-2); }
.dsh-pl button { font: inherit; font-size: 12px; line-height: 1.2; color: var(--dsw-alias-label-primary); background: var(--dsw-alias-bg-base); border: 1px solid var(--dsw-alias-border-l1); border-radius: 10px; padding: 6px 12px; cursor: pointer; }
.dsh-pl-seg button { border: 0; border-radius: 7px; background: transparent; color: var(--dsw-alias-label-secondary); padding: 5px 12px; }
.dsh-pl-seg button.is-on { background: var(--dsw-alias-bg-base); color: var(--dsw-alias-label-primary); font-weight: 600; box-shadow: none; }
.dsh-pl-item.is-on { border-color: var(--dsw-alias-brand-primary); background: var(--dsw-alias-bg-layer-2); box-shadow: inset 0 0 0 1px var(--dsw-alias-brand-primary); }
.dsh-pl-body { display: flex; flex: 1 1 auto; min-height: 0; min-width: 0; overflow: hidden; }
.dsh-pl-rows, .dsh-pl-grid { flex: 1 1 auto; min-width: 0; overflow: auto; padding: 8px; }
.dsh-pl-rows { display: flex; flex-direction: column; gap: 6px; }
.dsh-pl-grid { display: flex; flex-direction: column; gap: 10px; align-content: start; padding: 12px; }
.dsh-pl-grid.is-card { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
.dsh-pl-grid.is-card .dsh-pl-item { padding: 10px; gap: 8px; }
.dsh-pl-acts { display: flex; gap: 6px; align-items: center; margin-left: auto; flex: none; }
.dsh-pl-item { position: relative; }
.dsh-pl-grid.is-card .dsh-pl-acts { position: absolute; top: 8px; right: 8px; margin: 0; padding: 0; background: transparent; opacity: 0; pointer-events: none; transition: opacity .12s ease; }
.dsh-pl-grid.is-card .dsh-pl-acts .dsh-pl-pin, .dsh-pl-grid.is-card .dsh-pl-acts .dsh-pl-open { padding: 4px 8px; font-size: 11px; border: 0; background: var(--dsw-alias-bg-layer-2); }
.dsh-pl-grid.is-card .dsh-pl-item:hover .dsh-pl-acts, .dsh-pl-grid.is-card .dsh-pl-item:focus-within .dsh-pl-acts { opacity: 1; pointer-events: auto; }
.dsh-pl-item { display: flex; gap: 10px; align-items: center; width: 100%; min-width: 0; min-height: 64px; padding: 12px; text-align: left; border: 1px solid var(--dsw-alias-border-l2); border-radius: 16px; background: var(--dsw-alias-bg-layer-1); overflow: hidden; }
.dsh-pl-open, .dsh-pl-pin { margin-left: 0; flex: none; position: static; }
.dsh-pl-item.is-pinned { background: color-mix(in srgb, var(--dsw-alias-label-primary) 7%, var(--dsw-alias-bg-layer-1)); }
.dsh-pl-item img, .dsh-pl-fallback { width: 22px; height: 22px; border-radius: 6px; object-fit: cover; flex: none; }
.dsh-pl-copy { min-width: 0; flex: 1 1 auto; display: flex; flex-direction: column; gap: 2px; }
.dsh-pl-copy strong { font-size: 14px; font-weight: 560; color: var(--dsw-alias-label-primary); white-space: normal; overflow-wrap: anywhere; }
.dsh-pl-where { color: var(--dsw-alias-label-secondary); font-size: 11px; }
.dsh-pl-item.is-failed { border-color: var(--dsw-alias-state-error-primary); }
.dsh-pl-state { margin: 16px; color: var(--dsw-alias-label-secondary); }
.dsh-pl-detail { flex: 1 1 auto; width: auto; max-width: none; min-width: 0; min-height: 0; overflow: auto; background: var(--dsw-alias-bg-base); padding: 12px 16px 20px; }
.dsh-pl-detail-head { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
.dsh-pl-detail-head strong { flex: 1 1 auto; min-width: 0; font-size: 16px; line-height: 1.35; overflow-wrap: anywhere; }
.dsh-pl-detail-head button { flex: none; white-space: nowrap; align-self: flex-start; }
.dsh-pl-detail-head img, .dsh-pl-detail-head .dsh-pl-fallback { width: 32px; height: 32px; }
.dsh-pl-fact { display: grid; grid-template-columns: 4.5em minmax(0, 1fr); column-gap: 12px; align-items: start; margin: 0 0 10px; }
.dsh-pl-fact-label { color: var(--dsw-alias-label-secondary); font-size: 12px; line-height: 1.45; }
.dsh-pl-fact-value { color: var(--dsw-alias-label-primary); font-size: 13px; line-height: 1.45; overflow-wrap: anywhere; }
.dsh-pl-detail h3 { margin: 14px 0 6px; font-size: 12px; color: var(--dsw-alias-label-secondary); }
.dsh-pl-detail p, .dsh-pl-doc { margin: 0 0 8px; font-size: 13px; line-height: 1.45; overflow-wrap: anywhere; }
.dsh-pl-note { color: var(--dsw-alias-label-secondary); }
.dsh-pl-doc-block { margin-top: 12px; }
.dsh-pl-md h3, .dsh-pl-md-h { margin: 14px 0 6px; font-size: 14px; line-height: 1.4; font-weight: 650; color: var(--dsw-alias-label-primary); }
.dsh-pl-md h4 { margin: 10px 0 4px; font-size: 13px; font-weight: 650; }
.dsh-pl-md p, .dsh-pl-md li { margin: 0 0 8px; font-size: 13px; line-height: 1.55; }
.dsh-pl-md ul { margin: 0 0 10px; padding-left: 18px; }
.dsh-pl-md code { font-size: 12px; padding: 0 4px; border-radius: 4px; background: var(--dsw-alias-bg-layer-2); }
.dsh-pl-md a { color: var(--dsw-alias-brand-primary); }
.dsh-pl-table-wrap { margin: 8px 0 14px; overflow-x: auto; border: 1px solid var(--dsw-alias-border-l1); border-radius: 10px; }
.dsh-pl-md table { width: 100%; border-collapse: collapse; font-size: 13px; }
.dsh-pl-md th, .dsh-pl-md td { padding: 8px 10px; text-align: left; vertical-align: top; border-bottom: 1px solid var(--dsw-alias-border-l1); }
.dsh-pl-md th { color: var(--dsw-alias-label-secondary); font-weight: 650; background: var(--dsw-alias-bg-layer-1); white-space: nowrap; }
.dsh-pl-md td:first-child { white-space: nowrap; }
.dsh-pl-md tr:last-child td { border-bottom: 0; }
.dsh-pl-actions { display: flex; gap: 8px; align-items: center; margin-top: 16px; }
`

    return {
      name: 'dsh-plugins-ui',
      inject: ['slots', 'sidebarRightTabs', 'sidebarRight', 'layout', 'locale', 'remote', 'remote.pluginManager', 'remote.session', 'connection'],
      apply(ctx) {
        ctx.effect(() => ctx.locale.register(NS, COPY), 'plugin-list: dictionaries')
        const locale = ctx.locale
        const pluginManager = ctx.remote.pluginManager
        const listPlugins = pluginManager.listPlugins.bind(pluginManager)
        const listBundles = pluginManager.listBundles.bind(pluginManager)
        const readBundleDetail = pluginManager.readBundleDetail.bind(pluginManager)
        const setPluginEnabled = pluginManager.setPluginEnabled.bind(pluginManager)
        const rpcCall = ctx.connection.rpc.call.bind(ctx.connection.rpc)
        const loadFacts = (payload) => rpcCall('/dsh-plugins-ui-rpc', 'facts', payload || {})
        const revealPackage = async (payload) => {
          const input = payload && typeof payload === 'object' ? payload : {}
          const dir = directoryFromSource(input.source)
          const session = ctx.remote && ctx.remote.session
          if (dir && session && typeof session.openWorkspacePath === 'function') {
            try {
              await session.openWorkspacePath({ path: dir, action: 'reveal' })
              return { ok: true }
            } catch { /* the host RPC below is the fallback */ }
          }
          try {
            return await rpcCall('/dsh-plugins-ui-rpc', 'reveal', {
              moduleName: input.moduleName || '',
              source: input.source || '',
            })
          } catch {
            return { ok: false, error: { message: dir ? '' : '找不到这个插件的目录。' } }
          }
        }
        const listGuide = () => (typeof ctx.sidebarRightTabs.guide === 'function' ? ctx.sidebarRightTabs.guide() : [])
        const subscribeGuide = (fn) => (typeof ctx.sidebarRightTabs.subscribe === 'function' ? ctx.sidebarRightTabs.subscribe(fn) : undefined)
        const SEATS = [
          ['sidebar.right.pane.tab', 'right'],
          ['settings.section', 'settings'],
          ['settings.plugins.tab', 'settings'],
          ['settings.general.item', 'settings'],
          ['sidebar.panellist', 'left'],
          ['sidebar.footer.action', 'left'],
        ]
        const readSeat = (key, place) => {
          if (!ctx.slots || typeof ctx.slots.entries !== 'function') return []
          try {
            return (ctx.slots.entries(key) || []).map((row) => ({
              place,
              registrant: row && (row.registrant || (row.options && row.options.registrant)) || '',
              id: row && (row.id || row.key || (row.options && (row.options.id || row.options.key))) || '',
            }))
          } catch {
            return []
          }
        }
        const listSeats = () => SEATS.flatMap(([key, place]) => readSeat(key, place))
        const subscribeSeats = (fn) => (ctx.slots && typeof ctx.slots.subscribe === 'function'
          ? ctx.slots.subscribe('settings.section', fn)
          : undefined)
        const openPanel = (kind) => {
          if (ctx.layout && typeof ctx.layout.openRightbar === 'function') ctx.layout.openRightbar(true, false)
          ctx.sidebarRight.openTab(kind)
        }
        const t = locale.bind(NS)
        const readLocale = () => (locale.getSnapshot ? locale.getSnapshot() : locale.getLocale())
        const subscribeLocale = (fn) => locale.subscribe(fn)

        ctx.effect(() => {
          const definition = {
            id: PANEL_ID,
            priority: 'extension',
            title: () => t('tab.title'),
            icon: PluginIcon,
          }
          try {
            return ctx.sidebarRightTabs.register({ ...definition, kind: 'guide' })
          } catch {
            return ctx.sidebarRightTabs.register({ ...definition, kind: TAB_KIND })
          }
        }, 'plugin-list: tab type')

        function TabTitle() {
          return t('tab.title')
        }

        ctx.effect(() => {
          const stops = [PANEL_ID, TAB_KIND].map((key) => ctx.slots.inject('sidebar.right.pane.tab.title', () => ctx.slots.register({
            name: 'sidebar.right.pane.tab.title',
            key,
          }, TabTitle)))
          return () => stops.forEach((stop) => stop())
        }, 'plugin-list: tab title')

        ctx.effect(() => ctx.slots.inject('sidebar.right.pane.tab', () => ctx.slots.register({
          name: 'sidebar.right.pane.tab',
          key: PANEL_ID,
          locale: NS,
          inject: () => ({ listPlugins, listBundles, readBundleDetail, setPluginEnabled, loadFacts, revealPackage, listGuide, subscribeGuide, listSeats, subscribeSeats, openPanel, t, readLocale, subscribeLocale }),
        }, ListView)), 'plugin-list: tab body')
      },
    }
  },
})
