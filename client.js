window.__ModuleLoader__.load({
  id: 'dsh-plugin-panel',
  factory(require) {
    const React = require('react')
    const h = React.createElement
    const PANEL_ID = 'dsh-plugin-panel'
    const TAB_KIND = 'plugin-canvas'
    const NS = 'dsh-plugin-panel'
    const VERSION = 'v0.1.4'
    const PREF_KEY = 'dsh.plugin-list.pref.v2'

    const COPY = {
      zh: {
        'tab.title': '插件管理',
        'guide.title': '插件管理',
        'guide.description': '查看并打开右侧栏插件。',
        'list.installed': '用户安装',
        'list.builtin': '系统内置',
        'list.refresh': '刷新',
        'list.market': '市场趋势',
        'list.featured': '精选推荐',
        'list.back': '返回',
        'list.marketTitle': '插件市场趋势',
        'list.marketHint': '来自 dsh-plugin-shop 目录的每日快照，不是 npm 全站统计。',
        'list.marketLoading': '正在取历史数据，第一次大约十几秒…',
        'list.marketError': '取不到目录数据。如果刚更新过插件，重启一次 DeepSeek Harness 再试。',
        'list.countNow': '当前收录',
        'list.countFiltered': '已过滤',
        'list.perDay': '日均新增',
        'list.spanDays': '覆盖天数',
        'list.marketFirstNote': '首日已含此前录入的存量，不是从 0 开始',
        'list.install': '安装',
        'list.uninstall': '卸载',
        'list.uninstallConfirm': '确认卸载',
        'list.installing': '安装中…',
        'list.removing': '卸载中…',
        'list.hotDelta': '7 天增长',
        'list.hotStars': '仓库 star',
        'list.hotCategory': '分类',
        'list.tags': '标签',
        'list.hotRepo': '仓库',
        'list.installedState': '已安装',
        'list.notInstalled': '未安装',
        'list.chartTitle': '插件市场的增长趋势',
        'list.chartCumulative': '累计',
        'list.chartDaily': '每日增量',
        'list.chartDailyHint': '每天新增多少，比累计更能看出快慢',
        'list.marketSearch': '搜索整个市场，支持中文，例如「记忆」「截图」',
        'list.marketSearching': '搜索中…',
        'list.searchError': '搜索暂时不可用。如果刚更新过插件，在插件管理里停用再启用一次即可。',
        'list.marketNoMatch': '没有找到匹配的插件',
        'list.marketHits': '找到 {n} 个',
        'list.sortRelevance': '相关',
        'list.sortHot': '最热',
        'list.sortNew': '最新',
        'list.hotSearch': '搜索插件名、说明或分类…',
        'list.hotNoMatch': '没有匹配的插件',
        'list.featuredLead': '所列插件均经实际安装与使用后收录。',
        'list.featuredPending': '仍在持续筛选，后续陆续更新。',
        'list.featuredContact': '如需推荐插件，或希望自己的插件被收录，欢迎微信联系：ruskacoffee',
        'list.hotTitle': '最近 7 天增长最快',
        'list.hotHint': '按 GitHub 仓库 star 的 7 天增量排序，同一仓库只算一次。',
        'list.hotLoading': '正在算增长…',
        'list.hotError': '取不到增长数据。如果刚更新插件，需要重启一次 DeepSeek Harness 才会启用这个榜单。',
        'list.hotEmpty': '这 7 天没有增长记录。',
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
        'list.refresh': 'Refresh',
        'list.market': 'Market trends',
        'list.featured': 'Featured',
        'list.back': 'Back',
        'list.marketTitle': 'Plugin market trend',
        'list.marketHint': 'Daily snapshots of the dsh-plugin-shop catalog, not a site-wide npm count.',
        'list.marketLoading': 'Fetching history, about ten seconds the first time…',
        'list.marketError': 'Could not read the catalog. Restart DeepSeek Harness once if you just updated.',
        'list.countNow': 'Listed',
        'list.countFiltered': 'Filtered',
        'list.perDay': 'Per day',
        'list.spanDays': 'Days',
        'list.marketFirstNote': 'First point already includes earlier stock; not growth from zero',
        'list.install': 'Install',
        'list.uninstall': 'Remove',
        'list.uninstallConfirm': 'Confirm',
        'list.installing': 'Installing…',
        'list.removing': 'Removing…',
        'list.hotDelta': '7-day growth',
        'list.hotStars': 'Repo stars',
        'list.hotCategory': 'Category',
        'list.tags': 'Tags',
        'list.hotRepo': 'Repository',
        'list.installedState': 'Installed',
        'list.notInstalled': 'Not installed',
        'list.chartTitle': 'Plugin market growth',
        'list.chartCumulative': 'Total',
        'list.chartDaily': 'Per day',
        'list.chartDailyHint': 'New plugins per day, which shows pace better than a total',
        'list.marketSearch': 'Search the whole market, Chinese works too',
        'list.marketSearching': 'Searching…',
        'list.searchError': 'Search is unavailable. If you just updated the plugin, disable and re-enable it once.',
        'list.marketNoMatch': 'No matching plugin',
        'list.marketHits': '{n} found',
        'list.sortRelevance': 'Relevant',
        'list.sortHot': 'Popular',
        'list.sortNew': 'Newest',
        'list.hotSearch': 'Search by name, description or category…',
        'list.hotNoMatch': 'No matching plugin',
        'list.featuredLead': 'Listed plugins were installed and used before being included.',
        'list.featuredPending': 'Still being curated; more will be added.',
        'list.featuredContact': 'To suggest a plugin or have yours listed, contact us on WeChat: ruskacoffee',
        'list.hotTitle': 'Fastest growing, last 7 days',
        'list.hotHint': 'Ranked by 7-day GitHub repository star delta; one row per repository.',
        'list.hotLoading': 'Crunching growth…',
        'list.hotError': 'Could not load growth data. Restart DeepSeek Harness once to enable this ranking.',
        'list.hotEmpty': 'No growth recorded in the last 7 days.',
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
          filter: parsed.filter === 'builtin' ? 'builtin' : 'installed',
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

    /** Bars for the day-over-day change; the first day has no previous snapshot. */
    function barChart(days, hoverIndex, onHover) {
      const W = 1000
      const H = 250
      const L = 68
      const R = 24
      const T = 18
      const B = 42
      const deltas = days.map((day, index) => (index === 0 ? null : day.count - days[index - 1].count))
      const usable = deltas.filter((value) => typeof value === 'number')
      const peak = Math.max(...usable, 1) * 1.15
      const n = days.length
      const slot = (W - L - R) / Math.max(n, 1)
      const barW = Math.max(2, Math.min(slot * 0.62, 14))
      const x = (i) => L + slot * i + slot / 2
      const zeroY = T + (H - T - B)
      const y = (v) => zeroY - ((H - T - B) * v) / Math.max(peak, 1)
      const ticks = [0, 0.5, 1].map((r) => Math.round((peak * r) / 500) * 500)
      const labelIndexes = n <= 1 ? [0] : [0, Math.floor((n - 1) / 2), n - 1]

      const pick = (event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        if (!rect.width) return
        const px = ((event.clientX - rect.left) / rect.width) * W
        const index = Math.round((px - L - slot / 2) / Math.max(slot, 1))
        onHover(Math.max(0, Math.min(n - 1, index)))
      }

      const hovered = hoverIndex >= 0 && hoverIndex < n ? hoverIndex : -1
      const hx = hovered >= 0 ? x(hovered) : 0
      const value = hovered >= 0 ? deltas[hovered] : null
      const boxW = 200
      const boxH = 64
      const boxX = hovered >= 0 ? Math.min(Math.max(hx - boxW / 2, L), W - R - boxW) : 0
      const boxY = hovered >= 0 ? Math.max(T + 8, y(typeof value === 'number' ? value : 0) - boxH - 14) : 0
      const shown = typeof value === 'number' ? `${value >= 0 ? '+' : ''}${value.toLocaleString()}` : '—'

      return h('svg', {
        className: 'dsh-pl-chart',
        viewBox: `0 0 ${W} ${H}`,
        role: 'img',
        onMouseMove: pick,
        onMouseLeave: () => onHover(-1),
      },
        ticks.map((tick, i) => h('line', {
          key: `g${i}`, x1: L, x2: W - R, y1: y(tick), y2: y(tick),
          stroke: 'var(--dsw-alias-border-l1)', strokeWidth: 1,
        })),
        ticks.map((tick, i) => h('text', {
          key: `t${i}`, x: L - 12, y: y(tick) + 6, textAnchor: 'end',
          fill: 'var(--dsw-alias-label-secondary)', fontSize: 16,
        }, `+${Math.round(tick / 1000)}k`)),
        deltas.map((delta, i) => {
          if (typeof delta !== 'number') return null
          const top = Math.min(y(delta), zeroY)
          const height = Math.max(1, Math.abs(zeroY - y(delta)))
          return h('rect', {
            key: `b${i}`, x: x(i) - barW / 2, y: top, width: barW, height,
            rx: Math.min(2, barW / 2),
            fill: 'var(--dsw-alias-brand-primary)',
            opacity: hovered === i ? 0.95 : 0.55,
          })
        }),
        labelIndexes.map((i) => h('text', {
          key: `d${i}`, x: x(i), y: H - B + 34, textAnchor: i === 0 ? 'start' : i === n - 1 ? 'end' : 'middle',
          fill: 'var(--dsw-alias-label-secondary)', fontSize: 16,
        }, days[i].day.slice(5))),
        hovered >= 0 ? h('g', null,
          h('line', {
            x1: hx, x2: hx, y1: T, y2: H - B,
            stroke: 'var(--dsw-alias-label-secondary)', strokeWidth: 1, strokeDasharray: '4 4', opacity: 0.5,
          }),
          h('rect', {
            x: boxX, y: boxY, width: boxW, height: boxH, rx: 10,
            fill: 'var(--dsw-alias-bg-overlay)', stroke: 'var(--dsw-alias-border-l2)', strokeWidth: 1,
          }),
          h('text', { x: boxX + 14, y: boxY + 24, fill: 'var(--dsw-alias-label-secondary)', fontSize: 16 }, days[hovered].day),
          h('text', { x: boxX + 14, y: boxY + 50, fill: 'var(--dsw-alias-label-primary)', fontSize: 22, fontWeight: 600 }, shown),
        ) : null,
      )
    }

    function trendChart(days, hoverIndex, onHover, firstNote) {
      const W = 1000
      const H = 250
      const L = 68
      const R = 24
      const T = 18
      const B = 42
      const values = days.map((d) => d.count)
      const max = Math.max(...values, 1) * 1.2
      const n = days.length
      const x = (i) => L + (W - L - R) * (n <= 1 ? 0.5 : i / (n - 1))
      const y = (v) => T + (H - T - B) * (1 - v / max)
      const line = days.map((d, i) => `${i === 0 ? 'M' : 'L'} ${x(i).toFixed(1)} ${y(d.count).toFixed(1)}`).join(' ')
      const area = `${line} L ${x(n - 1).toFixed(1)} ${H - B} L ${x(0).toFixed(1)} ${H - B} Z`
      const ticks = [0, 0.25, 0.5, 0.75, 1].map((r) => Math.round((max * r) / 1000) * 1000)
      const labelIndexes = n <= 1 ? [0] : [0, Math.floor((n - 1) / 2), n - 1]

      const pick = (event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        if (!rect.width) return
        const px = ((event.clientX - rect.left) / rect.width) * W
        const ratio = (px - L) / Math.max(W - L - R, 1)
        const index = Math.round(ratio * Math.max(n - 1, 1))
        onHover(Math.max(0, Math.min(n - 1, index)))
      }

      const hovered = hoverIndex >= 0 && hoverIndex < n ? hoverIndex : -1
      const hx = hovered >= 0 ? x(hovered) : 0
      const hy = hovered >= 0 ? y(values[hovered]) : 0
      const isFirst = hovered === 0
      const boxW = isFirst ? 246 : 196
      const boxH = isFirst ? 96 : 64
      const boxX = hovered >= 0 ? Math.min(Math.max(hx - boxW / 2, L), W - R - boxW) : 0
      const boxY = hovered >= 0 ? Math.max(hy - boxH - 16, T) : 0

      return h('svg', {
        className: 'dsh-pl-chart',
        viewBox: `0 0 ${W} ${H}`,
        role: 'img',
        onMouseMove: pick,
        onMouseLeave: () => onHover(-1),
      },
        ticks.map((tick, i) => h('line', {
          key: `g${i}`, x1: L, x2: W - R, y1: y(tick), y2: y(tick),
          stroke: 'var(--dsw-alias-border-l1)', strokeWidth: 1,
        })),
        ticks.map((tick, i) => h('text', {
          key: `t${i}`, x: L - 12, y: y(tick) + 6, textAnchor: 'end',
          fill: 'var(--dsw-alias-label-secondary)', fontSize: 16,
        }, `${Math.round(tick / 1000)}k`)),
        h('path', { d: area, fill: 'var(--dsw-alias-brand-primary)', opacity: 0.08 }),
        h('path', { d: line, fill: 'none', stroke: 'var(--dsw-alias-brand-primary)', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }),
        labelIndexes.map((i) => h('text', {
          key: `d${i}`, x: x(i), y: H - B + 34, textAnchor: i === 0 ? 'start' : i === n - 1 ? 'end' : 'middle',
          fill: 'var(--dsw-alias-label-secondary)', fontSize: 16,
        }, days[i].day.slice(5))),
        h('text', {
          x: x(n - 1), y: y(values[n - 1]) - 16, textAnchor: 'end',
          fill: 'var(--dsw-alias-label-primary)', fontSize: 22, fontWeight: 600,
        }, String(values[n - 1])),
        hovered >= 0 ? h('g', null,
          h('line', {
            x1: hx, x2: hx, y1: T, y2: H - B,
            stroke: 'var(--dsw-alias-label-secondary)', strokeWidth: 1, strokeDasharray: '4 4', opacity: 0.5,
          }),
          h('circle', { cx: hx, cy: hy, r: 4.5, fill: 'var(--dsw-alias-brand-primary)', stroke: '#fff', strokeWidth: 2 }),
          h('rect', {
            x: boxX, y: boxY, width: boxW, height: boxH, rx: 10,
            fill: 'var(--dsw-alias-bg-overlay)', stroke: 'var(--dsw-alias-border-l2)', strokeWidth: 1,
          }),
          h('text', { x: boxX + 14, y: boxY + 24, fill: 'var(--dsw-alias-label-secondary)', fontSize: 16 },
            days[hovered].day),
          h('text', { x: boxX + 14, y: boxY + 50, fill: 'var(--dsw-alias-label-primary)', fontSize: 22, fontWeight: 600 },
            `${values[hovered].toLocaleString()} 个`),
          isFirst && firstNote
            ? h('text', { x: boxX + 14, y: boxY + 78, fill: 'var(--dsw-alias-label-secondary)', fontSize: 14 }, firstNote)
            : null,
        ) : null,
      )
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

    const SELF_NAMES = new Set(['dsh-plugin-panel', 'dsh-plugins-ui', 'dsh-plugin-canvas'])

    function isSelf(plugin) {
      const entry = String((plugin && plugin.entryId) || '').replace(/^include:/, '')
      const moduleName = String((plugin && plugin.moduleName) || '')
      return SELF_NAMES.has(entry) || SELF_NAMES.has(moduleName) || SELF_NAMES.has(shortModule(moduleName))
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
      if (tabKindFor(plugin, guide, localeId) || isSelf(plugin)) places.push('right')
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

    /** Split a sentence around a token so the token can be emphasized. */
    function withAccent(text, token) {
      const source = String(text || '')
      const at = source.indexOf(token)
      if (!token || at < 0) return source
      return [
        source.slice(0, at),
        h('strong', { key: 'accent', className: 'dsh-pl-accent' }, token),
        source.slice(at + token.length),
      ]
    }

    function compactNumber(value) {
      const n = Number(value) || 0
      if (n >= 10000) return `${(n / 1000).toFixed(1)}k`
      if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
      return String(n)
    }

    function relativeDay(iso) {
      if (!iso) return ''
      const then = Date.parse(iso)
      if (Number.isNaN(then)) return ''
      const days = Math.floor((Date.now() - then) / 86400000)
      if (days <= 0) return '今天'
      if (days === 1) return '昨天'
      if (days < 30) return `${days} 天前`
      if (days < 365) return `${Math.floor(days / 30)} 个月前`
      return `${Math.floor(days / 365)} 年前`
    }

    function marketMetric(row) {
      const stars = row.stars > 0 ? `★ ${compactNumber(row.stars)}` : ''
      const when = relativeDay(row.publishedAt || '')
      const parts = [stars, when].filter(Boolean)
      if (!parts.length) return null
      return {
        text: parts.join(' · '),
        title: [row.stars > 0 ? `${row.stars} stars` : '', row.publishedAt || ''].filter(Boolean).join('  '),
      }
    }

    /** One card shape, shared by the plugin list and the market ranking. */
    function PluginCard(options) {
      const { icon, title, subtitle, actions, className, onClick, badge } = options
      const classes = ['dsh-pl-item']
      if (className) classes.push(className)
      return h('div', {
        className: classes.join(' '),
        role: 'button',
        tabIndex: 0,
        onClick,
        onKeyDown: (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            if (onClick) onClick()
          }
        },
      },
      icon || h(DefaultPluginIcon),
      h('span', { className: 'dsh-pl-copy' },
        h('strong', null, title),
        subtitle ? h('span', { className: 'dsh-pl-where' }, subtitle) : null),
      badge || null,
      actions && actions.length ? h('div', { className: 'dsh-pl-acts' }, actions) : null)
    }

    /** One detail shape, shared by the plugin detail and the market detail. */
    function DetailPanel(options) {
      const { icon, title, facts, onClose, closeLabel, actions, note, children, tags } = options
      const rows = (facts || []).filter((entry) => entry && entry.value)
      return h('aside', { className: 'dsh-pl-detail' },
        h('div', { className: 'dsh-pl-detail-head' },
          icon || h(DefaultPluginIcon),
          h('strong', null, title),
          h('button', { type: 'button', onClick: onClose }, closeLabel)),
        h('div', { className: 'dsh-pl-detail-body' },
          rows.map((entry, index) => h('div', { className: 'dsh-pl-fact', key: index },
            h('span', { className: 'dsh-pl-fact-label' }, entry.label),
            h('span', { className: 'dsh-pl-fact-value' }, entry.value))),
          tags && tags.length
            ? h('div', { className: 'dsh-pl-fact' },
              h('span', { className: 'dsh-pl-fact-label' }, options.tagLabel),
              h('span', { className: 'dsh-pl-tags' }, tags.map((tag, index) => h('span', { className: 'dsh-pl-tag', key: index }, tag))))
            : null,
          note ? h('p', { className: 'dsh-pl-note' }, note) : null,
          children || null,
          actions && actions.length ? h('div', { className: 'dsh-pl-actions' }, actions) : null))
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
      const [surface, setSurface] = React.useState('plugins')
      const [trend, setTrend] = React.useState(null)
      const [trendStatus, setTrendStatus] = React.useState('')
      const [hoverIndex, setHoverIndex] = React.useState(-1)
      const [hot, setHot] = React.useState(null)
      const [hotError, setHotError] = React.useState('')
      const [busyKey, setBusyKey] = React.useState('')
      const [confirmKey, setConfirmKey] = React.useState('')
      const [selectedMarket, setSelectedMarket] = React.useState(null)
      const [chartMode, setChartMode] = React.useState('cumulative')
      const [hotQuery, setHotQuery] = React.useState('')
      const [marketQuery, setMarketQuery] = React.useState('')
      const [searchResult, setSearchResult] = React.useState(null)
      const [searchStatus, setSearchStatus] = React.useState('')
      const [searchSort, setSearchSort] = React.useState('relevance')
      const [trendError, setTrendError] = React.useState('')
      const [hotStatus, setHotStatus] = React.useState('')
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

      const MARKET_CACHE_KEY = 'dsh.plugin-list.market.v1'

      function todayKey() {
        return new Date().toISOString().slice(0, 10)
      }

      function readMarketCache() {
        try {
          const raw = JSON.parse(window.localStorage.getItem(MARKET_CACHE_KEY) || '{}')
          return raw && raw.day === todayKey() ? raw : null
        } catch {
          return null
        }
      }

      function writeMarketCache(patch) {
        try {
          const raw = readMarketCache() || { day: todayKey() }
          window.localStorage.setItem(MARKET_CACHE_KEY, JSON.stringify({ ...raw, ...patch }))
        } catch { /* caching is best effort */ }
      }

      const loadTrend = React.useCallback(async () => {
        const cached = readMarketCache()
        if (cached && cached.trend) {
          setTrend(cached.trend)
          setTrendStatus('ready')
          return
        }
        const call = props.loadMarketTrend
        if (typeof call !== 'function') return
        setTrendStatus('loading')
        try {
          const result = await call()
          if (result && result.ok === false) {
            setTrendError((result.error && result.error.message) || '')
            setTrendStatus('error')
            return
          }
          const value = result && result.ok === true ? result.value : result
          if (value && Array.isArray(value.days) && value.days.length) {
            setTrend(value)
            writeMarketCache({ trend: value })
            setTrendStatus('ready')
          } else {
            setTrendStatus('error')
          }
        } catch (failure) {
          setTrendError(failure instanceof Error ? failure.message : '')
          setTrendStatus('error')
        }
      }, [props.loadMarketTrend])

      const loadHot = React.useCallback(async () => {
        const cached = readMarketCache()
        if (cached && cached.hot) {
          setHot(cached.hot)
          setHotStatus('ready')
          return
        }
        const call = props.loadMarketHot
        if (typeof call !== 'function') return
        setHotStatus('loading')
        try {
          const result = await call()
          if (result && result.ok === false) {
            setHotError((result.error && result.error.message) || '')
            setHotStatus('error')
            return
          }
          const value = result && result.ok === true ? result.value : result
          if (value && Array.isArray(value.top) && value.top.length) {
            setHot(value)
            writeMarketCache({ hot: value })
            setHotStatus('ready')
          } else {
            setHotStatus('empty')
          }
        } catch (failure) {
          setHotError(failure instanceof Error ? failure.message : '')
          setHotStatus('error')
        }
      }, [props.loadMarketHot])

      React.useEffect(() => {
        if (surface !== 'market') return
        if (trendStatus === '') void loadTrend()
        if (hotStatus === '') void loadHot()
      }, [surface, trendStatus, hotStatus, loadTrend, loadHot])

      const visible = React.useMemo(() => {
        const rows = plugins.filter((plugin) => {
          const origin = originOf(plugin)
          return filter === 'builtin' ? origin === 'builtin' : origin === 'installed'
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
        const detailFacts = [
          { label: textOf(t, 'list.intro'), value: intro || textOf(t, 'list.unknown') },
          { label: textOf(t, 'list.module'), value: shortModule(plugin.moduleName) },
          { label: textOf(t, 'list.entry'), value: plugin.entryId },
          { label: textOf(t, 'list.status'), value: textOf(t, phaseKey(plugin)) },
          { label: textOf(t, 'list.package'), value: (selectedBundle && selectedBundle.name) || (manifest && manifest.name) || shortModule(plugin.moduleName) },
          { label: textOf(t, 'list.version'), value: (selectedBundle && selectedBundle.version) || (manifest && manifest.version) },
          { label: textOf(t, 'list.place'), value: place },
          { label: textOf(t, 'list.source'), value: source },
          { label: textOf(t, 'list.flags'), value: flags },
          { label: textOf(t, 'list.components'), value: componentText },
          { label: textOf(t, 'list.license'), value: manifest && manifest.license },
          { label: textOf(t, 'list.repo'), value: manifest && manifest.repository },
          { label: textOf(t, 'list.engines'), value: manifest && manifest.engines },
          { label: textOf(t, 'list.keywords'), value: manifest && Array.isArray(manifest.keywords) ? manifest.keywords.join('、') : '' },
          { label: textOf(t, 'list.inject'), value: manifest && Array.isArray(manifest.clientInject) ? manifest.clientInject.join('、') : '' },
        ]

        const detailActions = []
        const openKind = tabKindFor(plugin, guide, localeId)
        if (openKind && typeof openPanel === 'function') {
          detailActions.push(h('button', {
            key: 'open',
            type: 'button',
            onClick: () => openPanel(openKind),
          }, textOf(t, 'list.open')))
        }
        if (typeof props.revealPackage === 'function') {
          detailActions.push(h('button', {
            key: 'reveal',
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
          }, textOf(t, 'list.reveal')))
        }
        if (plugin.patchId && plugin.readOnlyReason == null && setPluginEnabled) {
          detailActions.push(h('button', {
            key: 'toggle',
            type: 'button',
            onClick: () => { void setPluginEnabled(plugin.entryId, plugin.enabled !== true).then(() => load()) },
          }, plugin.enabled ? textOf(t, 'list.disable') : textOf(t, 'list.enable')))
        }
        if (revealNote) detailActions.push(h('span', { key: 'note', className: 'dsh-pl-note' }, revealNote))
        if (plugin.readOnlyReason) detailActions.push(h('span', { key: 'locked', className: 'dsh-pl-note' }, String(plugin.readOnlyReason)))

        return h(DetailPanel, {
          icon: icon ? h('img', { src: icon, alt: '' }) : null,
          title,
          closeLabel: textOf(t, 'list.close'),
          onClose: () => setSelectedId(''),
          facts: detailFacts,
          actions: detailActions,
          children: h('section', { className: 'dsh-pl-doc-block' },
            h('div', { className: 'dsh-pl-fact-label' }, textOf(t, 'list.doc')),
            readmeStatus === 'loading'
              ? h('p', null, textOf(t, 'list.docLoading'))
              : (readme || (facts && facts.document))
                ? markdownView(readme || facts.document)
                : h('p', null, textOf(t, 'list.docEmpty'))),
        })
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

      function isInstalled(name) {
        const target = String(name || '')
        return plugins.some((plugin) => {
          const moduleName = String(plugin.moduleName || '')
          return moduleName === target || plugin.patchId === target || plugin.entryId === `include:${target}`
        })
      }

      async function installFromMarket(name) {
        if (typeof props.installBundle !== 'function' || busyKey) return
        setBusyKey(name)
        try {
          const result = await props.installBundle(String(name))
          const value = result && result.ok === true ? result.value : result
          if (value && value.application === 'failed') {
            setHotError((value.error && (value.error.diagnostic || value.error.code)) || '')
          } else if (value && Array.isArray(value.pendingBuilds) && value.pendingBuilds.length) {
            setHotError(`需要批准构建脚本：${value.pendingBuilds.join(', ')}`)
          }
          await load()
        } catch (failure) {
          setHotError(failure instanceof Error ? failure.message : '')
        } finally {
          setBusyKey('')
        }
      }

      async function removeFromMarket(name) {
        if (typeof props.removeBundle !== 'function' || busyKey) return
        setBusyKey(name)
        setConfirmKey('')
        try {
          const result = await props.removeBundle(String(name))
          const value = result && result.ok === true ? result.value : result
          if (value && value.application === 'failed') {
            setHotError((value.error && (value.error.diagnostic || value.error.code)) || '')
          }
          await load()
        } catch (failure) {
          setHotError(failure instanceof Error ? failure.message : '')
        } finally {
          setBusyKey('')
        }
      }

      function hotAction(row) {
        const name = row.name
        if (busyKey === name) {
          return h('span', { className: 'dsh-pl-busy' }, isInstalled(name) ? textOf(t, 'list.removing') : textOf(t, 'list.installing'))
        }
        if (isInstalled(name)) {
          return confirmKey === name
            ? h('button', {
              type: 'button',
              className: 'dsh-pl-card-btn',
              onClick: (event) => { event.stopPropagation(); void removeFromMarket(name) },
            }, textOf(t, 'list.uninstallConfirm'))
            : h('button', {
              type: 'button',
              className: 'dsh-pl-card-btn',
              onClick: (event) => { event.stopPropagation(); setConfirmKey(name) },
            }, textOf(t, 'list.uninstall'))
        }
        return h('button', {
          type: 'button',
          className: 'dsh-pl-card-btn',
          onClick: (event) => { event.stopPropagation(); void installFromMarket(name) },
        }, textOf(t, 'list.install'))
      }

      function hotView() {
        const rows = hot && Array.isArray(hot.top) ? hot.top : []
        const query = hotQuery.trim().toLowerCase()
        const shown = query
          ? rows.filter((row) => [row.name, row.summary, row.category]
            .filter(Boolean)
            .some((field) => String(field).toLowerCase().includes(query)))
          : rows
        return h('section', { className: 'dsh-pl-hot' },
          h('div', { className: 'dsh-pl-block-head' },
            h('strong', null, textOf(t, 'list.hotTitle')),
            hot && hot.fromDay
              ? h('span', null, rows.length === shown.length ? `${hot.fromDay} → ${hot.toDay}` : `${shown.length} / ${rows.length}`)
              : null),
          h('p', { className: 'dsh-pl-note' }, textOf(t, 'list.hotHint')),
          hotStatus === 'loading'
            ? h('p', { className: 'dsh-pl-state' }, textOf(t, 'list.hotLoading'))
            : hotStatus === 'error'
              ? h('p', { className: 'dsh-pl-state' }, hotError ? `${textOf(t, 'list.hotError')}（${hotError}）` : textOf(t, 'list.hotError'))
              : rows.length === 0
                ? h('p', { className: 'dsh-pl-state' }, textOf(t, 'list.hotEmpty'))
                : shown.length === 0
                ? h('p', { className: 'dsh-pl-state' }, textOf(t, 'list.hotNoMatch'))
                : h('div', { className: `dsh-pl-grid${view === 'card' ? ' is-card' : ''}` },
                  shown.map((row, index) => h(PluginCard, {
                    key: row.repo || row.name || index,
                    icon: row.icon ? h('img', { src: row.icon, alt: '', draggable: false }) : null,
                    title: row.name,
                    subtitle: row.summary || row.categoryZh || row.category || '',
                    className: 'is-market',
                    badge: h('span', { className: 'dsh-pl-delta' }, `+${row.delta.toLocaleString()}`),
                    onClick: () => setSelectedMarket(row),
                    actions: [hotAction(row)],
                  }))))
      }

      const searchTimer = React.useRef(null)

      const runMarketSearch = React.useCallback((query, sort) => {
        const call = props.searchCatalog
        if (typeof call !== 'function') return
        if (!query.trim()) {
          setSearchResult(null)
          setSearchStatus('')
          return
        }
        setSearchStatus('loading')
        Promise.resolve(call({ query, sort: sort || 'relevance' })).then((result) => {
          if (result && result.ok === false) {
            setSearchResult(null)
            setSearchStatus('error')
            return
          }
          const value = result && result.ok === true ? result.value : result
          setSearchResult(value && Array.isArray(value.items) ? value.items : [])
          setSearchStatus('ready')
        }).catch(() => {
          setSearchResult(null)
          setSearchStatus('error')
        })
      }, [props.searchCatalog, searchSort])

      function onMarketQuery(value) {
        setMarketQuery(value)
        if (searchTimer.current) clearTimeout(searchTimer.current)
        searchTimer.current = setTimeout(() => runMarketSearch(value, searchSort), 300)
      }

      function featuredView() {
        return h('div', { className: 'dsh-pl-market' },
          h('div', { className: 'dsh-pl-featured' },
            h('p', { className: 'dsh-pl-featured-lead' }, textOf(t, 'list.featuredLead')),
            h('p', { className: 'dsh-pl-note' }, textOf(t, 'list.featuredPending')),
            h('p', { className: 'dsh-pl-featured-contact' }, withAccent(textOf(t, 'list.featuredContact'), 'ruskacoffee'))))
      }

      function marketDetail(row) {
        const installed = isInstalled(row.name)
        const facts = [
          typeof row.delta === 'number'
            ? { label: textOf(t, 'list.hotDelta'), value: `+${row.delta.toLocaleString()}` }
            : null,
          typeof row.stars === 'number'
            ? { label: textOf(t, 'list.hotStars'), value: row.stars.toLocaleString() }
            : null,
          row.version ? { label: textOf(t, 'list.version'), value: row.version } : null,
          row.categoryZh || row.category ? { label: textOf(t, 'list.hotCategory'), value: row.categoryZh || row.category } : null,
          row.repo ? { label: textOf(t, 'list.hotRepo'), value: row.repo } : null,
          { label: textOf(t, 'list.status'), value: installed ? textOf(t, 'list.installedState') : textOf(t, 'list.notInstalled') },
        ].filter(Boolean)
        return h(DetailPanel, {
          title: row.name,
          closeLabel: textOf(t, 'list.close'),
          onClose: () => setSelectedMarket(null),
          facts,
          tags: Array.isArray(row.keywords) ? row.keywords : [],
          tagLabel: textOf(t, 'list.tags'),
          note: row.summary || '',
          actions: [hotAction(row)],
        })
      }

      function marketView() {
        const days = trend && Array.isArray(trend.days) ? trend.days : []
        const first = days[0]
        const last = days[days.length - 1]
        const span = first && last
          ? Math.max(1, Math.round((Date.parse(last.day) - Date.parse(first.day)) / 86400000))
          : 0
        const perDay = first && last ? Math.round((last.count - first.count) / Math.max(span, 1)) : 0
        const query = marketQuery.trim()
        const searchBox = h('input', {
          type: 'search',
          className: 'dsh-pl-search',
          placeholder: textOf(t, 'list.marketSearch'),
          value: marketQuery,
          onChange: (event) => onMarketQuery(event.target.value),
        })
        if (query) {
          const items = Array.isArray(searchResult) ? searchResult : []
          return h('div', { className: 'dsh-pl-market' },
            searchBox,
            searchStatus === 'loading'
              ? h('p', { className: 'dsh-pl-state' }, textOf(t, 'list.marketSearching'))
              : searchStatus === 'error'
                ? h('p', { className: 'dsh-pl-state' }, textOf(t, 'list.searchError'))
                : items.length === 0
                  ? h('p', { className: 'dsh-pl-state' }, textOf(t, 'list.marketNoMatch'))
                  : h('div', null,
                    h('div', { className: 'dsh-pl-block-head' },
                      h('strong', null, textOf(t, 'list.marketHits').replace('{n}', String(items.length))),
                      h('div', { className: 'dsh-pl-seg', role: 'group', 'aria-label': 'sort' },
                        chip('relevance', textOf(t, 'list.sortRelevance'), searchSort, (id) => { setSearchSort(id); runMarketSearch(marketQuery, id) }),
                        chip('hot', textOf(t, 'list.sortHot'), searchSort, (id) => { setSearchSort(id); runMarketSearch(marketQuery, id) }),
                        chip('new', textOf(t, 'list.sortNew'), searchSort, (id) => { setSearchSort(id); runMarketSearch(marketQuery, id) }))),
                    h('div', { className: `dsh-pl-grid${view === 'card' ? ' is-card' : ''}` },
                      items.map((row, index) => h(PluginCard, {
                        key: row.name || index,
                        icon: null,
                        title: row.name,
                        subtitle: row.summary || row.categoryZh || row.category || '',
                        className: 'is-market',
                        badge: (() => {
                          const metric = marketMetric(row)
                          return metric ? h('span', { className: 'dsh-pl-metric', title: metric.title }, metric.text) : null
                        })(),
                        onClick: () => setSelectedMarket(row),
                        actions: [hotAction(row)],
                      })))))
        }
        return h('div', { className: 'dsh-pl-market' },
          searchBox,
          trendStatus === 'loading'
            ? h('p', { className: 'dsh-pl-state' }, textOf(t, 'list.marketLoading'))
            : trendStatus === 'error'
              ? h('p', { className: 'dsh-pl-state' }, textOf(t, 'list.marketError'))
              : days.length
                ? [
                  h('section', { className: 'dsh-pl-block', key: 'trend' },
                    h('div', { className: 'dsh-pl-block-head' },
                      h('strong', null, textOf(t, 'list.chartTitle')),
                      h('div', { className: 'dsh-pl-seg', role: 'group', 'aria-label': 'chart' },
                        chip('cumulative', textOf(t, 'list.chartCumulative'), chartMode, setChartMode),
                        chip('daily', textOf(t, 'list.chartDaily'), chartMode, setChartMode))),
                    h('div', { className: 'dsh-pl-market-stats' },
                      stat(textOf(t, 'list.countNow'), last.count.toLocaleString()),
                      stat(textOf(t, 'list.countFiltered'), (last.rejected || 0).toLocaleString()),
                      stat(textOf(t, 'list.perDay'), `+${perDay.toLocaleString()}`),
                      stat(textOf(t, 'list.spanDays'), String(days.length))),
                    h('div', { className: 'dsh-pl-chart-wrap' },
                      chartMode === 'daily'
                        ? barChart(days, hoverIndex, setHoverIndex)
                        : trendChart(days, hoverIndex, setHoverIndex, textOf(t, 'list.marketFirstNote'))),
                    h('p', { className: 'dsh-pl-note' }, chartMode === 'daily' ? textOf(t, 'list.chartDailyHint') : textOf(t, 'list.marketHint'))),
                  hotView(),
                ]
                : null)
      }

      function stat(label, value) {
        return h('div', { className: 'dsh-pl-stat' },
          h('span', null, label),
          h('strong', null, value))
      }

      return h('div', { className: 'dsh-pl' },
        h('style', null, CSS),
        h('header', { className: 'dsh-pl-bar' },
          h('div', { className: 'dsh-pl-tools' },
            h('div', { className: 'dsh-pl-seg', role: 'group', 'aria-label': 'filter' },
              chip('installed', textOf(t, 'list.installed'), surface === 'market' || surface === 'featured' ? '' : filter, (id) => { setSurface('plugins'); setFilter(id); remember({ filter: id }) }),
              chip('builtin', textOf(t, 'list.builtin'), surface === 'market' || surface === 'featured' ? '' : filter, (id) => { setSurface('plugins'); setFilter(id); remember({ filter: id }) }),
              chip('market', textOf(t, 'list.market'), surface === 'market' ? 'market' : '', () => setSurface('market')),
              chip('featured', textOf(t, 'list.featured'), surface === 'featured' ? 'featured' : '', () => setSurface('featured'))),
            h('button', {
              type: 'button',
              className: 'dsh-pl-refresh',
              onClick: () => {
                if (surface === 'market') {
                  try { window.localStorage.removeItem('dsh.plugin-list.market.v1') } catch { /* ignore */ }
                  setTrendStatus('')
                  setHotStatus('')
                } else {
                  void load()
                }
              },
            }, textOf(t, 'list.refresh')),
            h('div', { className: 'dsh-pl-view', role: 'group', 'aria-label': 'view' },
              chip('list', textOf(t, 'list.viewList'), view, (id) => { setView(id); remember({ layout: id }) }),
              chip('card', textOf(t, 'list.viewCard'), view, (id) => { setView(id); remember({ layout: id }) })),
            h('span', { className: 'dsh-pl-version' }, VERSION))),
        surface === 'featured'
          ? featuredView()
          : surface === 'market'
          ? selectedMarket ? marketDetail(selectedMarket) : marketView()
          : status === 'loading' && plugins.length === 0
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
                      const iconUrl = safeIcon(plugin.meta && plugin.meta.icon)
                      const kind = tabKindFor(plugin, guide, localeId)
                      const pinned = pins.includes(plugin.entryId)
                      const places = placesFor(plugin, guide, seats, localeId)
                        .map((place) => textOf(t, place === 'right' ? 'list.placeRight' : place === 'settings' ? 'list.placeSettings' : 'list.placeLeft'))
                        .join(' · ') || textOf(t, 'list.placeNone')
                      const classes = [
                        selectedId === plugin.entryId ? 'is-on' : '',
                        pinned ? 'is-pinned' : '',
                        plugin.fiberPhase === 'failed' ? 'is-failed' : '',
                      ].filter(Boolean).join(' ')
                      return h(PluginCard, {
                        key: plugin.entryId,
                        icon: iconUrl ? h('img', { src: iconUrl, alt: '', draggable: false }) : null,
                        title,
                        subtitle: places,
                        className: classes,
                        onClick: () => setSelectedId(plugin.entryId),
                        actions: [
                          h('button', {
                            key: 'pin',
                            type: 'button',
                            className: 'dsh-pl-card-btn',
                            'aria-pressed': pinned,
                            onClick: (event) => {
                              event.stopPropagation()
                              togglePin(plugin.entryId)
                            },
                          }, pinned ? textOf(t, 'list.unpin') : textOf(t, 'list.pin')),
                          kind ? h('button', {
                            key: 'open',
                            type: 'button',
                            className: 'dsh-pl-card-btn',
                            onClick: (event) => {
                              event.stopPropagation()
                              if (typeof openPanel === 'function') openPanel(kind)
                            },
                          }, textOf(t, 'list.open')) : null,
                        ],
                      })
                    }))))
    }

    const CSS = `
.dsh-pl, .dsh-pl * { box-sizing: border-box; }
.dsh-pl {
  --pl-fs-xs: 11px;
  --pl-fs-sm: 12px;
  --pl-fs-md: 13px;
  --pl-fs-lg: 14px;
  --pl-fs-title: 16px;
  --pl-fs-num: 18px;
  --pl-gap-1: 4px;
  --pl-gap-2: 8px;
  --pl-gap-3: 12px;
  --pl-radius-card: 16px;
  --pl-radius-inner: 12px;
  --pl-radius-chip: 10px;
  --pl-radius-pill: 7px;
}
.dsh-pl { display: flex; flex-direction: column; flex: 1 1 auto; height: 100%; min-height: 0; min-width: 0; padding-top: 8px; color: var(--dsw-alias-label-primary); background: var(--dsw-alias-bg-base); font-family: inherit; font-size: var(--pl-fs-md); line-height: 1.4; }
.dsh-pl-bar { display: flex; flex: none; flex-direction: column; gap: 8px; margin: 0; padding: 12px 12px 10px; border-bottom: 1px solid var(--dsw-alias-border-l1); background: var(--dsw-specific-sidebar-fill, var(--dsw-alias-bg-layer-1)); position: relative; z-index: 1; }
.dsh-pl-top { display: flex; align-items: center; justify-content: space-between; }
.dsh-pl-version, .dsh-pl-hint, .dsh-pl-item span { color: var(--dsw-alias-label-secondary); font-size: var(--pl-fs-xs); }
.dsh-pl-hint { margin: 0; }
.dsh-pl-tools { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; width: 100%; }
.dsh-pl-refresh { margin-left: auto; }
.dsh-pl-version { margin-left: 10px; }
.dsh-pl-view { display: flex; gap: 2px; padding: 2px; border-radius: var(--pl-radius-inner); background: var(--dsw-alias-bg-layer-2); }
.dsh-pl-view button { border: 0; border-radius: var(--pl-radius-pill); padding: 3px 8px; font-size: var(--pl-fs-xs); background: transparent; color: var(--dsw-alias-label-secondary); }
.dsh-pl-view button.is-on { background: var(--dsw-alias-bg-base); color: var(--dsw-alias-label-primary); font-weight: 600; }
.dsh-pl-seg { display: flex; gap: 2px; padding: 3px; border: 0; border-radius: var(--pl-radius-inner); background: var(--dsw-alias-bg-layer-2); }
.dsh-pl button { font: inherit; font-size: var(--pl-fs-sm); line-height: 1.2; color: var(--dsw-alias-label-primary); background: var(--dsw-alias-bg-base); border: 1px solid var(--dsw-alias-border-l1); border-radius: var(--pl-radius-chip); padding: 6px 12px; cursor: pointer; }
.dsh-pl-seg button { border: 0; border-radius: var(--pl-radius-pill); background: transparent; color: var(--dsw-alias-label-secondary); padding: 5px 12px; }
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
.dsh-pl-grid.is-card .dsh-pl-acts .dsh-pl-card-btn { padding: 4px 8px; font-size: var(--pl-fs-xs); border: 0; background: var(--dsw-alias-bg-layer-2); }
.dsh-pl-grid.is-card .dsh-pl-item:hover .dsh-pl-acts, .dsh-pl-grid.is-card .dsh-pl-item:focus-within .dsh-pl-acts { opacity: 1; pointer-events: auto; }
.dsh-pl-item { display: flex; gap: 10px; align-items: center; width: 100%; min-width: 0; min-height: 64px; padding: 12px; text-align: left; border: 1px solid var(--dsw-alias-border-l2); border-radius: var(--pl-radius-card); background: var(--dsw-alias-bg-layer-1); overflow: hidden; }
.dsh-pl-card-btn { margin-left: 0; flex: none; position: static; }
.dsh-pl-item.is-pinned { background: color-mix(in srgb, var(--dsw-alias-label-primary) 7%, var(--dsw-alias-bg-layer-1)); }
.dsh-pl-item img, .dsh-pl-fallback { width: 22px; height: 22px; border-radius: var(--pl-radius-pill); object-fit: cover; flex: none; }
.dsh-pl-copy { min-width: 0; flex: 1 1 auto; display: flex; flex-direction: column; gap: 2px; }
.dsh-pl-copy strong { font-size: var(--pl-fs-lg); font-weight: 560; color: var(--dsw-alias-label-primary); white-space: normal; overflow-wrap: anywhere; }
.dsh-pl-where { color: var(--dsw-alias-label-secondary); font-size: var(--pl-fs-xs); }
.dsh-pl-item.is-market .dsh-pl-where { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.dsh-pl-item.is-market .dsh-pl-copy strong { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.dsh-pl-item.is-failed { border-color: var(--dsw-alias-state-error-primary); }
.dsh-pl-state { margin: 16px; color: var(--dsw-alias-label-secondary); }
.dsh-pl-detail { flex: 1 1 auto; width: auto; max-width: none; min-width: 0; min-height: 0; overflow: auto; background: var(--dsw-alias-bg-base); padding: 12px 16px 20px; }
.dsh-pl-detail-head { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
.dsh-pl-detail-head strong { flex: 1 1 auto; min-width: 0; font-size: var(--pl-fs-title); line-height: 1.35; overflow-wrap: anywhere; }
.dsh-pl-detail-head button { flex: none; white-space: nowrap; align-self: flex-start; }
.dsh-pl-detail-head img, .dsh-pl-detail-head .dsh-pl-fallback { width: 32px; height: 32px; }
.dsh-pl-fact { display: grid; grid-template-columns: 4.5em minmax(0, 1fr); column-gap: 12px; align-items: start; margin: 0 0 10px; }
.dsh-pl-fact-label { color: var(--dsw-alias-label-secondary); font-size: var(--pl-fs-sm); line-height: 1.45; }
.dsh-pl-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.dsh-pl-tag { padding: 2px 8px; border-radius: var(--pl-radius-pill); background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-secondary); font-size: var(--pl-fs-xs); }
.dsh-pl-fact-value { color: var(--dsw-alias-label-primary); font-size: var(--pl-fs-md); line-height: 1.45; overflow-wrap: anywhere; }
.dsh-pl-detail h3 { margin: 14px 0 6px; font-size: var(--pl-fs-sm); color: var(--dsw-alias-label-secondary); }
.dsh-pl-detail p, .dsh-pl-doc { margin: 0 0 8px; font-size: var(--pl-fs-md); line-height: 1.45; overflow-wrap: anywhere; }
.dsh-pl-note { color: var(--dsw-alias-label-secondary); font-size: var(--pl-fs-sm); line-height: 1.5; }
.dsh-pl-doc-block { margin-top: 12px; }
.dsh-pl-md h3, .dsh-pl-md-h { margin: 14px 0 6px; font-size: var(--pl-fs-lg); line-height: 1.4; font-weight: 650; color: var(--dsw-alias-label-primary); }
.dsh-pl-md h4 { margin: 10px 0 4px; font-size: var(--pl-fs-md); font-weight: 650; }
.dsh-pl-md p, .dsh-pl-md li { margin: 0 0 8px; font-size: var(--pl-fs-md); line-height: 1.55; }
.dsh-pl-md ul { margin: 0 0 10px; padding-left: 18px; }
.dsh-pl-md code { font-size: var(--pl-fs-sm); padding: 0 4px; border-radius: 4px; background: var(--dsw-alias-bg-layer-2); }
.dsh-pl-md a { color: var(--dsw-alias-brand-primary); }
.dsh-pl-table-wrap { margin: 8px 0 14px; overflow-x: auto; border: 1px solid var(--dsw-alias-border-l1); border-radius: var(--pl-radius-chip); }
.dsh-pl-md table { width: 100%; border-collapse: collapse; font-size: var(--pl-fs-md); }
.dsh-pl-md th, .dsh-pl-md td { padding: 8px 10px; text-align: left; vertical-align: top; border-bottom: 1px solid var(--dsw-alias-border-l1); }
.dsh-pl-md th { color: var(--dsw-alias-label-secondary); font-weight: 650; background: var(--dsw-alias-bg-layer-1); white-space: nowrap; }
.dsh-pl-md td:first-child { white-space: nowrap; }
.dsh-pl-md tr:last-child td { border-bottom: 0; }
.dsh-pl-market { flex: 1 1 auto; min-height: 0; overflow: auto; padding: 12px; }
.dsh-pl-featured { padding: 18px 20px; border: 1px solid var(--dsw-alias-border-l2); border-radius: var(--pl-radius-card); background: var(--dsw-alias-bg-layer-1); }
.dsh-pl-featured-lead { margin: 0 0 6px; font-size: var(--pl-fs-md); line-height: 1.7; color: var(--dsw-alias-label-primary); }
.dsh-pl-featured .dsh-pl-note { margin: 0; line-height: 1.7; }
.dsh-pl-featured-contact { margin: 18px 0 0; padding-top: 16px; border-top: 1px solid var(--dsw-alias-border-l1); font-size: var(--pl-fs-sm); line-height: 1.7; color: var(--dsw-alias-label-secondary); }
.dsh-pl-accent { color: var(--dsw-alias-brand-primary); font-weight: 600; }
.dsh-pl-market-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px; margin-bottom: 12px; }
.dsh-pl-stat { display: flex; flex-direction: column; gap: 6px; padding: 12px 14px; border: 1px solid var(--dsw-alias-border-l2); border-radius: var(--pl-radius-card); background: var(--dsw-alias-bg-layer-1); }
.dsh-pl-stat span { font-size: var(--pl-fs-xs); color: var(--dsw-alias-label-secondary); }
.dsh-pl-stat strong { font-size: var(--pl-fs-num); font-weight: 600; line-height: 1.2; }
.dsh-pl-chart-wrap { padding: 10px 12px 4px; border: 1px solid var(--dsw-alias-border-l2); border-radius: var(--pl-radius-card); background: var(--dsw-alias-bg-layer-1); }
.dsh-pl-chart { display: block; width: 100%; height: auto; }
.dsh-pl-block-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 10px; }
.dsh-pl-block-head strong { font-size: var(--pl-fs-lg); }
.dsh-pl-block-head span { font-size: var(--pl-fs-xs); color: var(--dsw-alias-label-secondary); }
.dsh-pl-block { margin-bottom: 22px; }
.dsh-pl-market .dsh-pl-note { margin: 10px 2px 0; }
.dsh-pl-hot { margin-top: 4px; }
.dsh-pl-search { width: 100%; margin: 2px 0 8px; padding: 8px 12px; border: 1px solid var(--dsw-alias-border-l2); border-radius: var(--pl-radius-inner); background: var(--dsw-alias-bg-layer-1); color: var(--dsw-alias-label-primary); font-family: inherit; font-size: var(--pl-fs-sm); }
.dsh-pl-search::placeholder { color: var(--dsw-alias-label-secondary); }
.dsh-pl-search:focus { outline: none; border-color: var(--dsw-alias-brand-primary); }
.dsh-pl-metric { flex: none; margin-left: auto; padding-left: 8px; font-size: var(--pl-fs-xs); color: var(--dsw-alias-label-secondary); white-space: nowrap; font-variant-numeric: tabular-nums; }
.dsh-pl-delta { flex: none; margin-left: auto; font-size: var(--pl-fs-sm); font-weight: 600; color: var(--dsw-alias-brand-primary); }
.dsh-pl-busy { flex: none; font-size: var(--pl-fs-xs); color: var(--dsw-alias-label-secondary); }
.dsh-pl-hot-busy { flex: none; font-size: var(--pl-fs-xs); color: var(--dsw-alias-label-secondary); }
.dsh-pl-actions { display: flex; gap: 8px; align-items: center; margin-top: 16px; }
`

    return {
      name: 'dsh-plugin-panel',
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
        const loadMarketTrend = (payload) => rpcCall('/dsh-plugins-ui-rpc', 'trend', payload || {})
        const loadMarketHot = (payload) => rpcCall('/dsh-plugins-ui-rpc', 'hot', payload || {})
        const searchCatalog = (payload) => rpcCall('/dsh-plugins-ui-rpc', 'search', payload || {})
        const installBundle = pluginManager.installBundle.bind(pluginManager)
        const removeBundle = pluginManager.removeBundle.bind(pluginManager)
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
          inject: () => ({ listPlugins, listBundles, readBundleDetail, setPluginEnabled, installBundle, removeBundle, loadFacts, revealPackage, loadMarketTrend, loadMarketHot, searchCatalog, listGuide, subscribeGuide, listSeats, subscribeSeats, openPanel, t, readLocale, subscribeLocale }),
        }, ListView)), 'plugin-list: tab body')
      },
    }
  },
})
