window.__ModuleLoader__.load({
  id: 'dsh-plugin-panel',
  factory(require) {
    const React = require('react')
    const h = React.createElement
    const PANEL_ID = 'dsh-plugin-panel'
    const TAB_KIND = 'plugin-canvas'
    const NS = 'dsh-plugin-panel'
    const VERSION = 'v0.1.11'
    const PREF_KEY = 'dsh.plugin-list.pref.v2'

    const COPY = {
      zh: {
        'tab.title': '插件管理',
        'guide.title': '插件管理',
        'guide.description': '查看并打开右侧栏插件。',
        'list.installed': '用户安装',
        'list.builtin': '系统内置',
        'list.refresh': '刷新',
        'list.market': '插件市场',
        'list.featured': '精选推荐',
        'list.design': '设计规范',
        'list.about': '关于',
        'list.aboutWhat': '这个插件做什么',
        'list.aboutWhatBody1': '「插件管理」是 DeepSeek Harness 的右侧栏插件管理器。它列出所有已安装的插件，并标出每个插件从哪里进——右侧栏、设置页、左侧菜单，或者根本没有界面。常用的可以置顶，点一下就跳过去。',
        'list.aboutWhatBody2': '它还带一个插件市场：目录增长趋势、最近 7 天增长最快榜、支持中文的全库搜索，看到顺眼的点一下就装。另外每个插件卡片上有元信息体检，缺什么、会怎样、怎么补都写在报告里，一键复制就能交给 AI 去改。',
        'list.aboutFacts': '基本信息',
        'list.aboutPackage': '包名',
        'list.aboutVersion': '版本',
        'list.aboutLicense': '许可',
        'list.aboutRepo': '仓库',
        'list.aboutData': '数据位置',
        'list.aboutShare': '分享给别人',
        'list.aboutShareHint': '把下面这段整段复制，发给任意一个能操作电脑的 AI，它就能自己把插件装上。',
        'list.aboutCopy': '复制这段话',
        'list.aboutCopied': '安装说明已复制，粘给任意 AI 即可让它帮你装',
        'list.designTitle': '插件设计规范',
        'list.designHint': '按场景选一段复制，粘给任意 AI 即可。所有 token 名都对照 DSH 实际样式表核对过。',
        'list.designCopy': '复制规范',
        'list.designCopied': '{name}规范已复制，粘给任意 AI 智能体即可让它照做',
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
        'list.installFailed': '安装失败',
        'list.removeFailed': '卸载失败',
        'list.installCancelled': '安装已取消',
        'list.needBuilds': '需要批准构建脚本',
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
        'list.chartTitle': '插件市场增长趋势',
        'list.chartCumulative': '累计',
        'list.chartDaily': '每日增量',
        'list.chartDailyHint': '每天新增多少，比累计更能看出快慢',
        'list.marketSearchTitle': '搜索整个市场',
        'list.marketSearch': '搜索整个市场，支持中文，例如「记忆」「截图」',
        'list.marketSearching': '搜索中…',
        'list.searchError': '搜索暂时不可用。如果刚更新过插件，在插件管理里停用再启用一次即可。',
        'list.marketNoMatch': '没有找到匹配的插件',
        'list.categoryAll': '全部',
        'list.categoryTool': '工具',
        'list.categoryUi': '界面',
        'list.categoryIntegration': '集成',
        'list.categoryWorkflow': '工作流',
        'list.categoryProvider': '模型接入',
        'list.categoryTheme': '主题',
        'list.categoryOther': '其他',
        'list.marketHits': '找到 {n} 个',
        'list.sortHot': '最热',
        'list.sortNew': '最新',
        'list.pagePrev': '上一页',
        'list.pageNext': '下一页',
        'list.pageInfo': '第 {page} / {pages} 页',
        'list.hotSearch': '搜索插件名、说明或分类…',
        'list.hotNoMatch': '没有匹配的插件',
        'list.featuredTag': '精选',
        'list.featuredFoot': '如需推荐插件，或希望自己的插件被收录，欢迎微信联系：ruskacoffee',
        'list.featuredContact': '如需推荐插件，或希望自己的插件被收录，欢迎微信联系：ruskacoffee',
        'list.hotTitle': '最近 7 天增长最快的插件',
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
        'list.copiedHint': '体检结果已复制，粘贴到左侧对话框或任意 AI 智能体即可按建议修正',
        'list.copyFailed': '复制失败',
        'list.healthFailed': '体检调用失败',
        'list.healthEmpty': '体检没有返回结果',
        'list.healthPending': '体检中',
        'list.remove': '卸载',
        'list.confirmRemove': '确认卸载',
        'list.removeCancelled': '卸载已取消',
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
        'list.market': 'Plugin market',
        'list.featured': 'Featured',
        'list.design': 'Design spec',
        'list.about': 'About',
        'list.aboutWhat': 'What this plugin does',
        'list.aboutWhatBody1': 'Plugin manager for the DeepSeek Harness right sidebar. It lists every installed plugin and shows where each one lives — right sidebar, settings, left menu, or no UI at all. Pin the ones you use and jump straight to them.',
        'list.aboutWhatBody2': 'It also carries a plugin market: catalog growth trends, a 7-day growth ranking, whole-catalog search that understands Chinese, and one-click install. Each card shows a metadata health check that says what is missing, what it breaks, and how to fix it — copy the report and hand it to an AI.',
        'list.aboutFacts': 'Basics',
        'list.aboutPackage': 'Package',
        'list.aboutVersion': 'Version',
        'list.aboutLicense': 'License',
        'list.aboutRepo': 'Repository',
        'list.aboutData': 'Data',
        'list.aboutShare': 'Share it',
        'list.aboutShareHint': 'Copy the whole block below and hand it to any computer-operating AI; it can install the plugin by itself.',
        'list.aboutCopy': 'Copy this',
        'list.aboutCopied': 'Install instructions copied — paste them into any agent',
        'list.designTitle': 'Plugin design spec',
        'list.designHint': 'Copy the section that matches your situation and hand it to any AI. Token names are verified against the real DSH stylesheet.',
        'list.designCopy': 'Copy spec',
        'list.designCopied': '{name} spec copied — paste it into any agent',
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
        'list.installFailed': 'Install failed',
        'list.removeFailed': 'Remove failed',
        'list.installCancelled': 'Install cancelled',
        'list.needBuilds': 'Build scripts need approval',
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
        'list.marketSearchTitle': 'Search the whole market',
        'list.marketSearch': 'Search the whole market, Chinese works too',
        'list.marketSearching': 'Searching…',
        'list.searchError': 'Search is unavailable. If you just updated the plugin, disable and re-enable it once.',
        'list.marketNoMatch': 'No matching plugin',
        'list.categoryAll': 'All',
        'list.categoryTool': 'Tools',
        'list.categoryUi': 'UI',
        'list.categoryIntegration': 'Integration',
        'list.categoryWorkflow': 'Workflow',
        'list.categoryProvider': 'Providers',
        'list.categoryTheme': 'Themes',
        'list.categoryOther': 'Other',
        'list.marketHits': '{n} found',
        'list.sortHot': 'Popular',
        'list.sortNew': 'Newest',
        'list.pagePrev': 'Previous',
        'list.pageNext': 'Next',
        'list.pageInfo': 'Page {page} of {pages}',
        'list.hotSearch': 'Search by name, description or category…',
        'list.hotNoMatch': 'No matching plugin',
        'list.featuredContact': 'To suggest a plugin or have yours listed, contact us on WeChat: ruskacoffee',
        'list.hotTitle': 'Fastest growing plugins, last 7 days',
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
        'list.copiedHint': 'Health report copied — paste it into the chat or any agent to fix it',
        'list.copyFailed': 'Copy failed',
        'list.healthFailed': 'Health check failed',
        'list.healthEmpty': 'Health check returned nothing',
        'list.healthPending': 'Checking',
        'list.remove': 'Remove',
        'list.confirmRemove': 'Confirm',
        'list.removeCancelled': 'Remove cancelled',
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
            fill: 'var(--dsw-alias-state-business-primary)',
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
        h('path', { d: area, fill: 'var(--dsw-alias-state-business-primary)', opacity: 0.08 }),
        h('path', { d: line, fill: 'none', stroke: 'var(--dsw-alias-state-business-primary)', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }),
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
          h('circle', { cx: hx, cy: hy, r: 4.5, fill: 'var(--dsw-alias-state-business-primary)', stroke: 'var(--dsw-alias-bg-layer-1)', strokeWidth: 2 }),
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
        if (!label || !title) return false
        // Tabs registered through sidebarRightTabs carry no owning-plugin id, so the
        // label is the only link. Compare loosely: a localized label is usually a
        // prefix of the inventory title, which often appends the package name.
        const a = String(label).trim()
        const b = String(title).trim()
        return a === b || b.includes(a) || a.includes(b)
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

    /** Turn a repository field into a link, tolerating the shapes npm allows. */
    function repoLinkOf(value) {
      const text = String(value || '').trim()
      if (!text) return text
      let url = ''
      if (/^git\+https?:\/\//i.test(text)) url = text.replace(/^git\+/, '')
      else if (/^https?:\/\//i.test(text)) url = text
      else if (/^git@github\.com:/i.test(text)) url = `https://github.com/${text.replace(/^git@github\.com:/i, '')}`
      else if (/^[\w.-]+\/[\w.-]+$/.test(text)) url = `https://github.com/${text}`
      if (!url) return text
      const href = url.replace(/\.git$/, '')
      return h('a', {
        className: 'dsh-pl-link',
        href,
        target: '_blank',
        rel: 'noreferrer noopener',
        onClick: (event) => event.stopPropagation(),
      }, text.replace(/^git\+/, ''))
    }

    /**
     * 插件设计规范（官方风格）。
     *
     * 这份文本是**交付物**：用户可以整段复制给任意大模型，让它按规范改插件的
     * 颜色、间距、圆角和图标。所以写成 Markdown、规则可执行、每条带判断依据。
     */
    /**
     * 设计规范按场景拆成三段，各自可独立复制。
     *
     * A 新建：从零到能装，骨架 + 命名 + 元信息 + 自检。
     * B 视觉：纯样式，颜色/间距/图标/图表。
     * C 元信息修正：给已经做好的插件逐条对齐，面向体检结果。
     */
    const SPEC_NEW = [
      '# DSH 插件 · 新建清单',
      '',
      '从零做到「装上能被正确显示」。按顺序走，走完就能装。',
      '',
      '## 一、先定名字',
      '',
      '四个名字必须能互相对上：',
      '',
      '| 名字 | 写在哪 | 例子 |',
      '| --- | --- | --- |',
      '| 中文名 | `locale/zh.json` → `meta.title` | `插件管理` |',
      '| 英文名 | `locale/en.json` → `meta.title` | `Plugin manager` |',
      '| 包名 | `package.json` → `name` | `dsh-plugin-panel` |',
      '| 行标识 | `cordis.patch.yml` → `id` | `dsh-plugin-panel` |',
      '',
      '- 中文名 **2–6 字**，名词短语，说「做什么」。不要版本号、不要「测试」后缀',
      '- 包名全小写 + 连字符，`dsh-` 开头',
      '- **行标识写包名，不要写相对路径**（`./lib/index.js` 会让宿主读不到 locale，面板永远显示英文名）',
      '',
      '## 二、目录骨架',
      '',
      '```',
      'my-plugin/',
      '├── package.json          清单：入口、dsh 字段、files',
      '├── cordis.patch.yml      加载行',
      '├── icon.svg              图标，24×24 描边',
      '├── locale/',
      '│   ├── zh.json           meta.title / description / detail',
      '│   └── en.json',
      '├── docs/',
      '│   └── DETAIL.zh.md      详情长文（可被 meta.detail 指向）',
      '├── src/',
      '│   ├── index.ts          host 半片：工具、RPC',
      '│   └── client/           client 半片：面板界面',
      '└── lib/                  构建产物（不要手改）',
      '```',
      '',
      '## 三、package.json 最小必需',
      '',
      '```json',
      '{',
      '  "name": "dsh-my-plugin",',
      '  "version": "0.1.0",',
      '  "description": "One line in English for npm.",',
      '  "keywords": ["dsh", "deepseek-harness", "dsh-plugin", "中文关键词"],',
      '  "exports": {',
      '    ".": "./lib/index.js",',
      '    "./client": "./lib/client.js",',
      '    "./icon": "./icon.svg",',
      '    "./locale/*.json": "./locale/*.json"',
      '  },',
      '  "files": ["lib", "locale/*.json", "icon.svg", "cordis.patch.yml", "docs"],',
      '  "dsh": {',
      '    "bundle": { "patch": "./cordis.patch.yml" },',
      '    "client": {',
      '      "platform": "web",',
      '      "inject": ["@deepseek-ai/dsh-client-ui-sidebar-right", "@deepseek-ai/dsh-client-locale"]',
      '    }',
      '  }',
      '}',
      '```',
      '',
      '要点：',
      '',
      '- `exports["./icon"]` 必须声明，光有 `icon.svg` 文件不算',
      '- `files` 必须含 `locale/*.json` 和 `icon.svg`，否则别人装了看不到',
      '- `dsh.client.inject` 只列代码里真正用到的客户端服务',
      '- `keywords` 必须有一个中文词',
      '',
      '## 四、cordis.patch.yml',
      '',
      '```yaml',
      '- insert:',
      '    - id: dsh-my-plugin',
      '      name: dsh-my-plugin',
      '```',
      '',
      '`id` 和 `name` 都写包名。写相对路径会导致 locale 读不到。',
      '',
      '## 五、locale 三件套',
      '',
      '```json',
      '{ "meta": {',
      '    "title": "我的插件",',
      '    "description": "一句话说清它做什么。",',
      '    "detail": "docs/DETAIL.zh.md"',
      '} }',
      '',
      '```',
      '',
      '- `meta.detail` 相对**包根**解析，不是相对 `locale/`',
      '- 它指向的文件必须进 `files`',
      '- `en.json` 结构相同，填英文',
      '',
      '## 六、图标',
      '',
      '```svg',
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"',
      '     fill="none" stroke="currentColor" stroke-width="1.8"',
      '     stroke-linecap="round" stroke-linejoin="round">',
      '  <!-- 2-4 条 path，留白要够 -->',
      '</svg>',
      '```',
      '',
      '单色描边、`currentColor`、24×24。细节多了在 24px 下会糊。',
      '',
      '## 七、装上前自检',
      '',
      '```bash',
      'npm run build',
      'dsh插件开发经验/scripts/check-plugin-meta.sh   你的目录',
      'dsh插件开发经验/scripts/check-plugin-health.sh 你的目录',
      '```',
      '',
      '- [ ] 中文名 2–6 字，包名 kebab-case，两者能关联',
      '- [ ] `cordis.patch.yml` 的 `id`/`name` 都是包名',
      '- [ ] `exports["./icon"]` 已声明',
      '- [ ] `files` 含 `locale/*.json` 与 `icon.svg`',
      '- [ ] `locale/zh.json` 三件套齐全，`detail` 文件存在',
      '- [ ] `dsh.bundle.patch` 指向的文件存在',
      '- [ ] 两个自检脚本都通过',
    ].join('\n')

    const SPEC_VISUAL = [
      '# DSH 插件 · 视觉规范',
      '',
      '目标：和 DSH 自带界面**看不出接缝**，同时留一处自己的识别色。',
      '判据不是「好看」，而是「换主题时是否跟着变、放在官方界面旁是否露异样」。',
      '',
      '> 所有 token 名都对照 DSH 实际样式表核对过。**照抄名字，不要猜。**',
      '',
      '## 一、颜色：三档分工，不是只要黑白',
      '',
      '规范要求「颜色从主题变量来、各司其职」，**不是「全部用灰白」**。DSH 自己的界面也大量用彩色。',
      '',
      '### 中性：承担结构（占 80%–90%）',
      '',
      '| 用途 | 变量 |',
      '| --- | --- |',
      '| 主文字 | `--dsw-alias-label-primary` |',
      '| 次要文字 | `--dsw-alias-label-secondary` |',
      '| 卡片、块表面 | `--dsw-alias-bg-layer-1` |',
      '| 次级表面（按钮底、标签底） | `--dsw-alias-bg-layer-2` |',
      '| 常规分隔线 | `--dsw-alias-border-l1` |',
      '| 卡片、容器边框 | `--dsw-alias-border-l2` |',
      '',
      '### 交互：蓝色只有一种',
      '',
      '**最容易搞错的地方**：`--dsw-alias-brand-primary` **不是蓝色**。它的值是 `bluish-1000`（浅色主题近黑）或 `bluish-50`（深色主题近白），本质是「最强对比前景色」。拿它当强调色会得到一屏近黑块。',
      '',
      '| 用途 | 变量 | 实际值 |',
      '| --- | --- | --- |',
      '| 主按钮底、选中态 | `--dsw-alias-state-business-primary` | `#4176e6` |',
      '| 浅色强调底、未选中数据 | `--dsw-alias-state-business-tertiary` | `#e4edfd` |',
      '| 彩色填充上的文字 | `--dsw-alias-label-on-color` | `#fff` |',
      '',
      '彩色底上的文字**必须**用 `label-on-color`，用 `label-primary` 在深色主题下会看不清。',
      '',
      '### 品牌记忆点：用静态色',
      '',
      '- `--dsw-static-deepseek-450` = `#5686fe`',
      '- `--dsw-static-deepseek-500` = `#4176e6`',
      '',
      '它们不随主题翻转，正是「记忆点」需要的。不要自造色值。',
      '',
      '### 状态',
      '',
      '| 语义 | 变量 |',
      '| --- | --- |',
      '| 成功、健康 | `--dsw-alias-state-success-primary` |',
      '| 警告 | `--dsw-alias-state-warn-primary` |',
      '| 警告文字 | `--dsw-alias-state-warn-label` |',
      '| 错误 | `--dsw-alias-state-error-primary` |',
      '',
      '**已知陷阱**：`--dsw-alias-state-warning-label`、`--dsw-alias-state-danger-label`、`--dsw-alias-fill-l2` **都不存在**。写错不报错，颜色静默失效（SVG 里表现为默认黑）。',
      '',
      '## 二、焦点：用 outline，不是 box-shadow',
      '',
      '```css',
      ':focus-visible {',
      '  outline: var(--dsw-focus-ring-width) solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));',
      '  outline-offset: 2px;',
      '}',
      '```',
      '',
      '可聚焦元素必须有 `:focus-visible`。这是可用性要求——键盘用户靠它导航。',
      '',
      '## 三、边框：是结构，不是装饰',
      '',
      '面板底色和卡片底色都是 `bg-layer-1`，**只靠边框区分**。边框一淡，卡片就和背景糊在一起。',
      '',
      '| 场景 | 用什么 |',
      '| --- | --- |',
      '| 卡片、提示条、独立的块 | `1px solid var(--dsw-alias-border-l2)` |',
      '| 区域内分隔线 | `1px solid var(--dsw-alias-border-l1)` |',
      '| 按钮、表格、小控件 | `1px solid var(--dsw-alias-border-l1)` |',
      '',
      '1. 卡片边框必须用 `l2`，`l1` 在卡片上几乎看不见',
      '2. 固定 1px 实线，不用虚线，不用 `box-shadow` 假装边框',
      '3. 不要用透明度调淡边框，要弱化就换层级',
      '',
      '判断：卡片旁留一块纯背景，退后看——还能看出矩形轮廓就是对的。',
      '',
      '## 四、尺寸：变量 + 三个上限',
      '',
      '```',
      '字号  --pl-fs-xs 11 · sm 12 · md 13 · lg 14 · title 16',
      '间距  --pl-gap-1 4 · 2 8 · 3 12',
      '圆角  --pl-radius-card 16 · inner 12 · chip 10 · pill 7',
      '```',
      '',
      '- 一屏最多**三个字号**（11/12/13 只差 1px，用满等于没层级）',
      '- 圆角最多**三档**',
      '- 不写 `font-size: 13px` 这种硬编码',
      '',
      '**窄面板（< 420px）降一档**：卡片圆角 16→12，内边距 12→10。右侧栏就是窄面板。',
      '',
      '## 五、视觉重量的量化线',
      '',
      '一屏内：',
      '',
      '- 近黑实心块 **≤ 1 个**',
      '- 高饱和彩色块 **≤ 2 个**',
      '',
      '超出就会「发闷」。这不是审美偏好，是密度问题。',
      '',
      '## 六、图标：两套尺寸',
      '',
      '| 场景 | 尺寸 | stroke-width |',
      '| --- | --- | --- |',
      '| 卡片、列表 | 24×24 | 1.8 |',
      '| 与 11–13px 文字内联 | 16×16 | **1.2** |',
      '',
      '`fill="none"`、`stroke="currentColor"`、圆角线帽、只画 2–4 条线。小尺寸必须同步减细描边，否则比 24px 版本更粗。',
      '',
      '## 七、间距：水平统一 12px',
      '',
      '| 区域 | 规则 |',
      '| --- | --- |',
      '| 工具栏 | `padding: 12px 12px 10px` |',
      '| 列表容器 | `padding: 12px` |',
      '| 列表项 | `padding: 10px 12px` |',
      '',
      '## 八、提示：三类，生命周期不同',
      '',
      '| 类型 | 样式 | 消失 |',
      '| --- | --- | --- |',
      '| 确认 | 卡片同款 + 成功色圆点 | 3 秒 |',
      '| 错误 | 普通说明文字 | 常驻 |',
      '| 进行中 | 卡片同款 + 进度感 | 常驻，且带「去哪里看」的指引 |',
      '',
      '错误提示不能自动消失：3 秒足够错过一行错误。',
      '',
      '## 九、状态色：只点缀，不铺面积',
      '',
      '- 标签底色统一 `bg-layer-2`，只让**文字色**带状态色',
      '- 需要淡底用 `color-mix(in srgb, <状态色> 8%, transparent)`，别超 10%',
      '- 一屏同时出现红、黄、绿三块饱和底是典型「AI 感」',
      '',
      '## 十、图表：按需，不是每个插件都有',
      '',
      '只有时间序列、分布、可缩放区间才需要。自绘 SVG，不引图表库。',
      '',
      '| 元素 | 用什么 |',
      '| --- | --- |',
      '| 网格线 | `--dsw-alias-border-l1`，不透明度 0.5–0.9 |',
      '| 未选中数据柱 | `--dsw-alias-state-business-tertiary`（浅蓝） |',
      '| 选中数据柱 | `--dsw-alias-state-business-primary` |',
      '| 选区底色 | 品牌蓝 10% |',
      '| 刻度文字 | `--dsw-alias-label-secondary`，`--pl-fs-xs` |',
      '| 时间数字 | 等宽字体 |',
      '',
      '**未选中数据不要用 `fill-l2`——它不存在**，SVG 会 fallback 成黑。',
      '',
      '交互至少三样：悬停读数、拖拽选区（`onDraft` 实时 / `onCommit` 落库）、「现在」竖线。',
      '',
      '布局：内边距 `{ left: 36, right: 12, top: 30, bottom: 24 }`，高度 196。宽度用 `ResizeObserver` 自适应。',
      '',
      '**参考实现**：`dsh-meeting-minutes/src/client/timeline.tsx`（673 行自包含 SVG）。抄的时候把它失效的 `NEUTRAL_BAR` 换成 `state-business-tertiary`。',
      '',
      '## 十一、空态：要教下一步',
      '',
      '- 差：「还没有纪要」',
      '- 好：「还没有纪要。去『今日』选区间，再点时间轴下方的按钮」',
      '',
      '## 十二、自检',
      '',
      '- [ ] 没有硬编码字号、圆角、色值',
      '- [ ] 交互蓝用 `state-business-primary`，没把 `brand-primary` 当强调色',
      '- [ ] 彩色底上的文字是 `label-on-color`',
      '- [ ] 可聚焦元素都有 `:focus-visible` outline',
      '- [ ] 卡片边框是 `l2` 且未淡化',
      '- [ ] 一屏最多三个字号、三个圆角档',
      '- [ ] 近黑实心块 ≤ 1、高饱和彩色块 ≤ 2',
      '- [ ] 图标 24px 用 1.8，16px 内联用 1.2',
      '- [ ] 图表未选中数据是浅色，不是 `fill-l2`',
      '- [ ] 成功提示会消失，错误和进行中不会',
    ].join('\n')

    const SPEC_META = [
      '# DSH 插件 · 元信息修正',
      '',
      '给**已经做好的插件**用：按体检结果逐条对齐，让面板能正确显示它。',
      '',
      '## 先跑体检，看缺什么',
      '',
      '```bash',
      'dsh插件开发经验/scripts/check-plugin-meta.sh 你的插件目录',
      '```',
      '',
      '面板里每个插件卡片上也有健康度标签，点一下会复制该插件的完整报告。',
      '',
      '## 七项对照表',
      '',
      '| 要控制的 | 写在哪 | 缺了会怎样 |',
      '| --- | --- | --- |',
      '| 卡片名字 | `locale/zh.json` → `meta.title` | 显示包名 |',
      '| 一句话说明 | `meta.description` | 副标题空白 |',
      '| 详情长文 | `meta.detail` | 回落读 README |',
      '| 图标 | `package.json` → `exports["./icon"]` | 显示默认灰方块 |',
      '| 能否加载 | `dsh.bundle.patch` | 装了不出现 |',
      '| 客户端服务 | `dsh.client.inject` | 运行时报 undefined |',
      '| 打包完整 | `files` | 用户装了看不到图标和中文名 |',
      '',
      '## 四种常见修法',
      '',
      '### 1. 面板显示英文包名',
      '',
      '两个原因，都可能同时存在：',
      '',
      '**a) 缺 locale**',
      '',
      '```json',
      '// locale/zh.json',
      '{ "meta": { "title": "中文名", "description": "一句话" } }',
      '```',
      '',
      '**b) `cordis.patch.yml` 的 `name` 写了相对路径**',
      '',
      '```yaml',
      '# 错：宿主按相对路径找不到包根，读不到 locale',
      '      name: ./lib/index.js',
      '# 对：写包名',
      '      name: dsh-my-plugin',
      '```',
      '',
      '改完要重新构建并重启 DSH。',
      '',
      '### 2. 图标是灰方块',
      '',
      '```json',
      '"exports": { "./icon": "./icon.svg" },',
      '"files": ["icon.svg", "locale/*.json"]',
      '```',
      '',
      '光有 `icon.svg` 文件但不在 `exports` 里，等于没配。图标规格：24×24、`fill="none"`、`stroke="currentColor"`、`stroke-width="1.8"`。',
      '',
      '### 3. 详情页空白',
      '',
      '- `meta.detail` 指向的文件不存在 → 创建它',
      '- 或者干脆不写 `meta.detail`，回落读 README 也是允许的',
      '- 写了就要保证它进了 `files`',
      '',
      '### 4. 中文搜不到',
      '',
      '`keywords` 里加中文词，至少一个：',
      '',
      '```json',
      '"keywords": ["dsh", "deepseek-harness", "dsh-plugin", "插件管理"]',
      '```',
      '',
      '## 只对界面插件要求的部分',
      '',
      '纯 host 插件（没有 `dsh.client`）不显示图标、不渲染标题，**不要求** locale 和图标。系统内置的 host 插件大多没有这些，不是缺陷。',
      '',
      '## 改完核对',
      '',
      '- [ ] 面板卡片显示中文名，不是包名',
      '- [ ] 有图标，不是灰方块',
      '- [ ] 详情页有内容',
      '- [ ] 中文能搜到',
      '- [ ] `check-plugin-meta.sh` 通过',
      '- [ ] 重新构建 + 重启 DSH 后确认',
    ].join('\n')

    /** 目录的 7 个分类；`id` 是目录里的字段值，空串表示不过滤。 */
    const CATEGORIES = [
      { id: '', labelKey: 'list.categoryAll' },
      { id: 'tool', labelKey: 'list.categoryTool' },
      { id: 'ui', labelKey: 'list.categoryUi' },
      { id: 'integration', labelKey: 'list.categoryIntegration' },
      { id: 'workflow', labelKey: 'list.categoryWorkflow' },
      { id: 'provider', labelKey: 'list.categoryProvider' },
      { id: 'theme', labelKey: 'list.categoryTheme' },
      { id: 'other', labelKey: 'list.categoryOther' },
    ]

    /**
     * 主编精选：都是自己装过、用过的插件。
     *
     * 数量刻意少——精选的价值在「少而准」，不在「多而全」。
     * 加一条就改这里，`reason` 写清「为什么值得装」，不要复述插件自己的描述。
     */
    const CURATED = [
      {
        name: 'dsh-meeting-memo',
        title: '会议纪要',
        reason: '录音存在本机、转写也在本机，不上传任何云服务。会开完直接拿到要点、决策和待办，不用回头翻录像。',
      },
      {
        name: 'dsh-pocket-ios',
        title: 'DSH Pocket iOS（手机访问）',
        reason: '把 DSH 装进手机：扫码就连上桌面的会话，能看进度、批工具调用、发消息。走局域网或内网穿透，不需要密码，也不经过任何第三方中转。',
      },
    ]

    /** 三段场景规范；`id` 用于复制态的区分。 */
    const SPEC_SECTIONS = [
      { id: 'new', title: '新建插件', hint: '从零到能装：命名、骨架、清单、元信息、自检', text: SPEC_NEW },
      { id: 'visual', title: '视觉设计', hint: '颜色、焦点、边框、尺寸、图标、图表', text: SPEC_VISUAL },
      { id: 'meta', title: '元信息修正', hint: '给已做好的插件：逐条对齐，让面板正确显示', text: SPEC_META },
    ]

    const DESIGN_SPEC = SPEC_SECTIONS.map((s) => s.text).join('\n\n---\n\n')

    /** 把一份体检结果写成可直接交给 AI 的 Markdown。 */
    function diagnosisReport(plugin, title, diagnosis) {
      const items = (diagnosis && Array.isArray(diagnosis.items)) ? diagnosis.items : []
      const bad = items.filter((i) => i.level === 'bad')
      const warn = items.filter((i) => i.level === 'warn')
      const level = diagnosis && diagnosis.level ? diagnosis.level : 'unknown'
      const verdict = level === 'bad' ? `需要修复（${bad.length} 项问题${warn.length ? `、${warn.length} 项建议` : ''}）`
        : level === 'warn' ? `可用，有 ${warn.length} 项建议`
          : level === 'ok' ? '健康' : '无法判断'
      const lines = [
        `# 插件体检：${title}`,
        '',
        `- 包名：${(plugin && plugin.moduleName) || ''}`,
        `- 目录：${(diagnosis && diagnosis.root) || ''}`,
        `- 健康度：${verdict}`,
        '',
      ]
      if (bad.length) {
        lines.push('## 需要修复', '')
        bad.forEach((item, index) => {
          lines.push(`${index + 1}. **${item.label}** — ${item.message}`)
          if (item.fix) lines.push(`   - 修法：${item.fix}`)
        })
        lines.push('')
      }
      if (warn.length) {
        lines.push('## 建议改进', '')
        warn.forEach((item, index) => {
          lines.push(`${index + 1}. **${item.label}** — ${item.message}`)
          if (item.fix) lines.push(`   - 修法：${item.fix}`)
        })
        lines.push('')
      }
      const ok = items.filter((i) => i.level === 'ok')
      if (ok.length) {
        lines.push('## 已通过', '')
        ok.forEach((item) => lines.push(`- ${item.label}：${item.message}`))
        lines.push('')
      }
      lines.push('---', '以上为自动体检结果，请按「修法」逐项修改，改完重新构建并重启 DeepSeek Harness。')
      return lines.join('\n')
    }

    /** 健康度标签：绿=健康，黄=有建议，红=需修复。 */
    function healthChip(title, diagnosis, copied, onCopy) {
      const level = diagnosis && diagnosis.level
      if (!level || level === 'unknown') return null
      const items = (diagnosis.items || [])
      const bad = items.filter((i) => i.level === 'bad').length
      const warn = items.filter((i) => i.level === 'warn').length
      const text = level === 'bad' ? `健康度差 ${bad}` : level === 'warn' ? `建议 ${warn}` : '健康'
      return h('button', {
        type: 'button',
        className: `dsh-pl-health is-${level}${copied ? ' is-copied' : ''}`,
        title: level === 'ok' ? '元信息完整' : '点击复制体检结果，可直接发给 AI 修正',
        onClick: (event) => {
          event.stopPropagation()
          onCopy()
        },
      }, copied ? '已复制' : text)
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
      const [actionNote, setActionNote] = React.useState('')
      const [failedKey, setFailedKey] = React.useState('')
      const [removeConfirm, setRemoveConfirm] = React.useState('')
      const [listNote, setListNote] = React.useState('')
      const [diagnoses, setDiagnoses] = React.useState({})
      const [copiedKey, setCopiedKey] = React.useState('')
      const [toast, setToast] = React.useState('')
      const [specTab, setSpecTab] = React.useState('new')
      const [marketCategory, setMarketCategory] = React.useState('')
      const [searchPage, setSearchPage] = React.useState(0)
      const [searchMeta, setSearchMeta] = React.useState(null)
      const toastTimer = React.useRef(null)
      const [selectedMarket, setSelectedMarket] = React.useState(null)
      const [chartMode, setChartMode] = React.useState('cumulative')
      const [hotQuery, setHotQuery] = React.useState('')
      const [marketQuery, setMarketQuery] = React.useState('')
      const [searchResult, setSearchResult] = React.useState(null)
      const [searchStatus, setSearchStatus] = React.useState('')
      const [searchSort, setSearchSort] = React.useState('hot')
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
          if (typeof props.diagnosePlugins === 'function') {
            try {
              // 只体检用户安装的插件：系统内置（@deepseek-ai/*）与 cordis 内建行是随发行版
              // 一起发的，本身不会缺元信息，纳入只会制造噪音、拖慢体检。
              const targets = list.filter((item) => originOf(item) === 'installed')
              const report = await props.diagnosePlugins({
                plugins: targets.map((item) => ({ entryId: item.entryId, moduleName: item.moduleName, source: item.source || '' })),
              })
              const value = report && report.ok === true ? report.value : report
              if (report && report.ok === false) {
                setListNote(`${textOf(t, 'list.healthFailed')}：${(report.error && (report.error.message || report.error.code)) || 'unknown'}`)
                setDiagnoses({})
              } else if (value && typeof value === 'object' && Object.keys(value).length) {
                setDiagnoses(value)
                setListNote('')
              } else {
                setListNote(textOf(t, 'list.healthEmpty'))
                setDiagnoses({})
              }
            } catch (failure) {
              setListNote(`${textOf(t, 'list.healthFailed')}：${failure instanceof Error ? failure.message : 'unknown'}`)
            }
          }
        } catch (failure) {
          setError(failure instanceof Error ? failure.message : textOf(t, 'list.error'))
          setStatus((current) => (current === 'ready' ? 'ready' : 'error'))
        }
      }, [listPlugins, listBundles, props.diagnosePlugins, t])

      React.useEffect(() => () => {
        if (toastTimer.current) clearTimeout(toastTimer.current)
      }, [])

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
          { label: textOf(t, 'list.package'), value: (manifest && manifest.name) || (selectedBundle && selectedBundle.name) || shortModule(plugin.moduleName) },
          { label: textOf(t, 'list.version'), value: (manifest && manifest.version) || (selectedBundle && selectedBundle.version) },
          { label: textOf(t, 'list.place'), value: place },
          { label: textOf(t, 'list.source'), value: source },
          { label: textOf(t, 'list.flags'), value: flags },
          { label: textOf(t, 'list.components'), value: componentText },
          { label: textOf(t, 'list.license'), value: manifest && manifest.license },
          { label: textOf(t, 'list.repo'), value: repoLinkOf(manifest && manifest.repository) },
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

      /** 顶部提示条：3 秒后自动消失，新提示顶掉旧的。 */
      function showToast(message) {
        setToast(message)
        if (toastTimer.current) clearTimeout(toastTimer.current)
        toastTimer.current = setTimeout(() => setToast(''), 3000)
      }

      async function copyDiagnosis(plugin, title, diagnosis) {
        const text = diagnosisReport(plugin, title, diagnosis)
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text)
          } else {
            const area = document.createElement('textarea')
            area.value = text
            area.style.position = 'fixed'
            area.style.opacity = '0'
            document.body.appendChild(area)
            area.select()
            document.execCommand('copy')
            document.body.removeChild(area)
          }
          setCopiedKey(plugin.entryId)
          showToast(textOf(t, 'list.copiedHint'))
          setTimeout(() => setCopiedKey(''), 2200)
        } catch (failure) {
          setListNote(`${textOf(t, 'list.copyFailed')}：${failure instanceof Error ? failure.message : 'unknown'}`)
        }
      }

      async function removePlugin(plugin, bundle) {
        if (typeof props.removeBundle !== 'function' || !bundle) return
        setListNote('')
        try {
          const result = await props.removeBundle(bundle.name)
          if (result && result.ok === false) {
            const error = result.error || {}
            setListNote(`${textOf(t, 'list.removeFailed')}：${error.message || error.code || 'unknown'}`)
            return
          }
          const value = result && result.ok === true ? result.value : result
          if (value && value.application === 'failed') {
            const error = value.error || {}
            setListNote(`${textOf(t, 'list.removeFailed')}：${error.diagnostic || error.code || 'unknown'}`)
            return
          }
          if (value && value.application === 'cancelled') {
            setListNote(textOf(t, 'list.removeCancelled'))
            return
          }
          setRemoveConfirm('')
          await load()
        } catch (failure) {
          setListNote(`${textOf(t, 'list.removeFailed')}：${failure instanceof Error ? failure.message : 'unknown'}`)
        }
      }

      async function installFromMarket(name) {
        if (typeof props.installBundle !== 'function' || busyKey) return
        setBusyKey(name)
        try {
          const result = await props.installBundle(String(name), {})
          if (result && result.ok === false) {
            const error = result.error || {}
            setFailedKey(name)
            setActionNote(`${textOf(t, 'list.installFailed')}：${error.message || error.code || 'unknown'}`)
            return
          }
          const value = result && result.ok === true ? result.value : result
          if (value && value.application === 'failed') {
            const error = value.error || {}
            setFailedKey(name)
            setActionNote(`${textOf(t, 'list.installFailed')}：${error.diagnostic || error.code || 'unknown'}`)
            return
          }
          if (value && value.application === 'cancelled') {
            setActionNote(textOf(t, 'list.installCancelled'))
            return
          }
          if (value && Array.isArray(value.pendingBuilds) && value.pendingBuilds.length) {
            setActionNote(`${textOf(t, 'list.needBuilds')}：${value.pendingBuilds.join(', ')}`)
            return
          }
          setActionNote('')
          setFailedKey('')
          await load()
        } catch (failure) {
          setActionNote(`${textOf(t, 'list.installFailed')}：${failure instanceof Error ? failure.message : 'unknown'}`)
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
          if (result && result.ok === false) {
            const error = result.error || {}
            setActionNote(`${textOf(t, 'list.removeFailed')}：${error.message || error.code || 'unknown'}`)
            return
          }
          const value = result && result.ok === true ? result.value : result
          if (value && value.application === 'failed') {
            const error = value.error || {}
            setActionNote(`${textOf(t, 'list.removeFailed')}：${error.diagnostic || error.code || 'unknown'}`)
            return
          }
          setActionNote('')
          setFailedKey('')
          await load()
        } catch (failure) {
          setActionNote(`${textOf(t, 'list.removeFailed')}：${failure instanceof Error ? failure.message : 'unknown'}`)
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
        }, failedKey === name ? textOf(t, 'list.retry') : textOf(t, 'list.install'))
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

      const runMarketSearch = React.useCallback((query, sort, category, page) => {
        const call = props.searchCatalog
        if (typeof call !== 'function') return
        const cat = category === undefined ? marketCategory : category
        if (!query.trim() && !cat) {
          setSearchResult(null)
          setSearchStatus('')
          return
        }
        setSearchStatus('loading')
        const offset = Math.max(0, Number(page) || 0)
        Promise.resolve(call({ query, sort: sort || 'hot', category: cat, offset })).then((result) => {
          if (result && result.ok === false) {
            setSearchResult(null)
            setSearchStatus('error')
            return
          }
          const value = result && result.ok === true ? result.value : result
          setSearchResult(value && Array.isArray(value.items) ? value.items : [])
          setSearchMeta(value ? { total: value.total || 0, offset: value.offset || 0, limit: value.limit || 100, pageCount: value.pageCount || 1 } : null)
          setSearchStatus('ready')
        }).catch(() => {
          setSearchResult(null)
          setSearchStatus('error')
        })
      }, [props.searchCatalog, searchSort, marketCategory])

      function onMarketQuery(value) {
        setMarketQuery(value)
        if (searchTimer.current) clearTimeout(searchTimer.current)
        setSearchPage(0)
        searchTimer.current = setTimeout(() => runMarketSearch(value, searchSort, marketCategory, 0), 300)
      }

      /** 「关于」页：这个插件是什么、基本事实、怎么分享给别人。 */
      function aboutView() {
        const profileDir = '~/.dsh/profiles/<profile>/.plugin-panel'
        const facts = [
          [textOf(t, 'list.aboutPackage'), 'dsh-plugin-panel'],
          [textOf(t, 'list.aboutVersion'), VERSION],
          [textOf(t, 'list.aboutLicense'), 'MIT'],
          [textOf(t, 'list.aboutRepo'), 'github.com/jqlong17/dsh-plugin-panel'],
          [textOf(t, 'list.aboutData'), profileDir],
        ]
        return h('div', { className: 'dsh-pl-market' },
          h('section', { className: 'dsh-pl-about' },
            h('h3', { className: 'dsh-pl-about-h' }, textOf(t, 'list.aboutWhat')),
            h('p', { className: 'dsh-pl-about-p' }, textOf(t, 'list.aboutWhatBody1')),
            h('p', { className: 'dsh-pl-about-p' }, textOf(t, 'list.aboutWhatBody2'))),
          h('section', { className: 'dsh-pl-about' },
            h('h3', { className: 'dsh-pl-about-h' }, textOf(t, 'list.aboutFacts')),
            h('div', { className: 'dsh-pl-about-facts' },
              facts.map(([label, value]) => h('div', { className: 'dsh-pl-about-fact', key: label },
                h('span', { className: 'dsh-pl-about-label' }, label),
                h('span', { className: 'dsh-pl-about-value' }, value))))),
          h('section', { className: 'dsh-pl-about' },
            h('h3', { className: 'dsh-pl-about-h' }, textOf(t, 'list.aboutShare')),
            h('p', { className: 'dsh-pl-about-p' }, textOf(t, 'list.aboutShareHint')),
            h('pre', { className: 'dsh-pl-about-pre' }, shareText()),
            h('button', {
              type: 'button',
              className: 'dsh-pl-about-copy',
              onClick: () => { void copyShare() },
            }, copiedKey === 'about' ? textOf(t, 'list.copied') : textOf(t, 'list.aboutCopy'))))
      }

      function shareText() {
        return [
          `请帮我在 DeepSeek Harness 上安装插件 dsh-plugin-panel（中文名「插件管理」，版本 ${VERSION}）。`,
          '',
          '它是右侧栏的插件管理器：列出已安装插件并标出入口，带插件市场（增长趋势、7 天增长榜、中文搜索、一键装卸），以及每个插件的元信息体检。',
          '',
          '请按顺序做，每步做完告诉我结果：',
          '',
          '1. 确认当前 DSH 的 profile 名称（一般看 ~/.dsh/profiles/ 下哪个是你在用的）。',
          '2. 安装：dsh plugin --profile <你的 profile> add dsh-plugin-panel',
          '   如果 npm 上取不到这个包，说明还没发布，请直接告诉我，别自己改写依赖或去装同名的其它包。',
          '3. 装完提醒我重启 DeepSeek Harness，然后打开右侧栏确认「插件管理」出现。',
        ].join('\n')
      }

      async function copyShare() {
        const text = shareText()
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text)
          } else {
            const area = document.createElement('textarea')
            area.value = text
            area.style.position = 'fixed'
            area.style.opacity = '0'
            document.body.appendChild(area)
            area.select()
            document.execCommand('copy')
            document.body.removeChild(area)
          }
          setCopiedKey('about')
          showToast(textOf(t, 'list.aboutCopied'))
          setTimeout(() => setCopiedKey(''), 2200)
        } catch (failure) {
          setListNote(`${textOf(t, 'list.copyFailed')}：${failure instanceof Error ? failure.message : 'unknown'}`)
        }
      }

      function designView() {
        const section = SPEC_SECTIONS.find((s) => s.id === specTab) || SPEC_SECTIONS[0]
        return h('div', { className: 'dsh-pl-market' },
          h('section', { className: 'dsh-pl-spec' },
            h('div', { className: 'dsh-pl-spec-head' },
              h('div', { className: 'dsh-pl-spec-tabs', role: 'tablist', 'aria-label': 'spec section' },
                SPEC_SECTIONS.map((item) => h('button', {
                  key: item.id,
                  type: 'button',
                  className: `dsh-pl-spec-tab${item.id === specTab ? ' is-on' : ''}`,
                  'aria-selected': item.id === specTab,
                  onClick: () => setSpecTab(item.id),
                }, item.title))),
              h('button', {
                type: 'button',
                className: 'dsh-pl-copy-spec',
                onClick: () => { void copySpec(section) },
              }, copiedKey === `spec-${section.id}` ? textOf(t, 'list.copied') : textOf(t, 'list.designCopy'))),
            h('p', { className: 'dsh-pl-spec-hint' }, section.hint),
            h('div', { className: 'dsh-pl-spec-body' }, markdownView(section.text))))
      }

      async function copySpec(section) {
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(section.text)
          } else {
            const area = document.createElement('textarea')
            area.value = section.text
            area.style.position = 'fixed'
            area.style.opacity = '0'
            document.body.appendChild(area)
            area.select()
            document.execCommand('copy')
            document.body.removeChild(area)
          }
          setCopiedKey(`spec-${section.id}`)
          showToast(textOf(t, 'list.designCopied').replace('{name}', section.title))
          setTimeout(() => setCopiedKey(''), 2200)
        } catch (failure) {
          setListNote(`${textOf(t, 'list.copyFailed')}：${failure instanceof Error ? failure.message : 'unknown'}`)
        }
      }

      function featuredView() {
        return h('div', { className: 'dsh-pl-market' },
          h('div', { className: 'dsh-pl-curated-list' }, CURATED.map((item) => {
            const installed = isInstalled(item.name)
            const plugin = plugins.find((p) => p.moduleName === item.name || p.patchId === item.name)
            const icon = safeIcon(plugin && plugin.meta && plugin.meta.icon)
            return h(PluginCard, {
              key: item.name,
              icon: icon ? h('img', { src: icon, alt: '', draggable: false }) : h(DefaultPluginIcon),
              title: item.title,
              subtitle: item.reason,
              className: 'is-market is-curated',
              badge: h('span', { className: 'dsh-pl-curated-tag' }, textOf(t, 'list.featuredTag')),
              actions: [
                h('button', {
                  key: 'act',
                  type: 'button',
                  className: 'dsh-pl-card-btn',
                  onClick: (event) => {
                    event.stopPropagation()
                    if (installed) return
                    void installFromMarket(item.name)
                  },
                }, installed ? textOf(t, 'list.installedState') : textOf(t, 'list.install')),
              ],
            })
          })),
          h('p', { className: 'dsh-pl-note dsh-pl-featured-foot' }, textOf(t, 'list.featuredContact')))
      }

      /** 「关于」页：这个插件是什么、基本事实、怎么分享给别人。 */
      function aboutView() {
        const profileDir = '~/.dsh/profiles/<profile>/.plugin-panel'
        const facts = [
          [textOf(t, 'list.aboutPackage'), 'dsh-plugin-panel'],
          [textOf(t, 'list.aboutVersion'), VERSION],
          [textOf(t, 'list.aboutLicense'), 'MIT'],
          [textOf(t, 'list.aboutRepo'), 'github.com/jqlong17/dsh-plugin-panel'],
          [textOf(t, 'list.aboutData'), profileDir],
        ]
        return h('div', { className: 'dsh-pl-market' },
          h('section', { className: 'dsh-pl-about' },
            h('h3', { className: 'dsh-pl-about-h' }, textOf(t, 'list.aboutWhat')),
            h('p', { className: 'dsh-pl-about-p' }, textOf(t, 'list.aboutWhatBody1')),
            h('p', { className: 'dsh-pl-about-p' }, textOf(t, 'list.aboutWhatBody2'))),
          h('section', { className: 'dsh-pl-about' },
            h('h3', { className: 'dsh-pl-about-h' }, textOf(t, 'list.aboutFacts')),
            h('div', { className: 'dsh-pl-about-facts' },
              facts.map(([label, value]) => h('div', { className: 'dsh-pl-about-fact', key: label },
                h('span', { className: 'dsh-pl-about-label' }, label),
                h('span', { className: 'dsh-pl-about-value' }, value))))),
          h('section', { className: 'dsh-pl-about' },
            h('h3', { className: 'dsh-pl-about-h' }, textOf(t, 'list.aboutShare')),
            h('p', { className: 'dsh-pl-about-p' }, textOf(t, 'list.aboutShareHint')),
            h('pre', { className: 'dsh-pl-about-pre' }, shareText()),
            h('button', {
              type: 'button',
              className: 'dsh-pl-about-copy',
              onClick: () => { void copyShare() },
            }, copiedKey === 'about' ? textOf(t, 'list.copied') : textOf(t, 'list.aboutCopy'))))
      }

      function shareText() {
        return [
          `请帮我在 DeepSeek Harness 上安装插件 dsh-plugin-panel（中文名「插件管理」，版本 ${VERSION}）。`,
          '',
          '它是右侧栏的插件管理器：列出已安装插件并标出入口，带插件市场（增长趋势、7 天增长榜、中文搜索、一键装卸），以及每个插件的元信息体检。',
          '',
          '请按顺序做，每步做完告诉我结果：',
          '',
          '1. 确认当前 DSH 的 profile 名称（一般看 ~/.dsh/profiles/ 下哪个是你在用的）。',
          '2. 安装：dsh plugin --profile <你的 profile> add dsh-plugin-panel',
          '   如果 npm 上取不到这个包，说明还没发布，请直接告诉我，别自己改写依赖或去装同名的其它包。',
          '3. 装完提醒我重启 DeepSeek Harness，然后打开右侧栏确认「插件管理」出现。',
        ].join('\n')
      }

      async function copyShare() {
        const text = shareText()
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text)
          } else {
            const area = document.createElement('textarea')
            area.value = text
            area.style.position = 'fixed'
            area.style.opacity = '0'
            document.body.appendChild(area)
            area.select()
            document.execCommand('copy')
            document.body.removeChild(area)
          }
          setCopiedKey('about')
          showToast(textOf(t, 'list.aboutCopied'))
          setTimeout(() => setCopiedKey(''), 2200)
        } catch (failure) {
          setListNote(`${textOf(t, 'list.copyFailed')}：${failure instanceof Error ? failure.message : 'unknown'}`)
        }
      }

      async function copySpec(section) {
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(section.text)
          } else {
            const area = document.createElement('textarea')
            area.value = section.text
            area.style.position = 'fixed'
            area.style.opacity = '0'
            document.body.appendChild(area)
            area.select()
            document.execCommand('copy')
            document.body.removeChild(area)
          }
          setCopiedKey(`spec-${section.id}`)
          showToast(textOf(t, 'list.designCopied').replace('{name}', section.title))
          setTimeout(() => setCopiedKey(''), 2200)
        } catch (failure) {
          setListNote(`${textOf(t, 'list.copyFailed')}：${failure instanceof Error ? failure.message : 'unknown'}`)
        }
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
          row.repo ? { label: textOf(t, 'list.hotRepo'), value: repoLinkOf(row.repo) } : null,
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
          actions: [
            hotAction(row),
            actionNote ? h('span', { key: 'note', className: 'dsh-pl-note' }, actionNote) : null,
          ].filter(Boolean),
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
        const categoryBar = h('div', { className: 'dsh-pl-cats', role: 'group', 'aria-label': 'category' },
          CATEGORIES.map((item) => h('button', {
            key: item.id || 'all',
            type: 'button',
            className: `dsh-pl-cat${marketCategory === item.id ? ' is-on' : ''}`,
            'aria-pressed': marketCategory === item.id,
            onClick: () => {
              setMarketCategory(item.id)
              setSearchPage(0)
              runMarketSearch(marketQuery, searchSort, item.id, 0)
            },
          }, textOf(t, item.labelKey))))
        const searchBox = h('div', { className: 'dsh-pl-search-wrap' },
          h('div', { className: 'dsh-pl-block-head' }, h('strong', null, textOf(t, 'list.marketSearchTitle'))),
          h('input', {
            type: 'search',
            className: 'dsh-pl-search',
            placeholder: textOf(t, 'list.marketSearch'),
            value: marketQuery,
            onChange: (event) => onMarketQuery(event.target.value),
          }),
          categoryBar)
        if (query || marketCategory) {
          const items = Array.isArray(searchResult) ? searchResult : []
          const meta = searchMeta
          const currentPage = meta ? Math.floor((meta.offset || 0) / (meta.limit || 100)) + 1 : 1
          const pager = meta && meta.pageCount > 1
            ? h('div', { className: 'dsh-pl-pager' },
              h('button', {
                type: 'button',
                className: 'dsh-pl-pager-btn',
                disabled: currentPage <= 1,
                onClick: () => { const next = searchPage - 1; setSearchPage(next); runMarketSearch(marketQuery, searchSort, marketCategory, next) },
              }, textOf(t, 'list.pagePrev')),
              h('span', { className: 'dsh-pl-pager-info' },
                textOf(t, 'list.pageInfo').replace('{page}', String(currentPage)).replace('{pages}', String(meta.pageCount))),
              h('button', {
                type: 'button',
                className: 'dsh-pl-pager-btn',
                disabled: currentPage >= meta.pageCount,
                onClick: () => { const next = searchPage + 1; setSearchPage(next); runMarketSearch(marketQuery, searchSort, marketCategory, next) },
              }, textOf(t, 'list.pageNext')))
            : null
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
                      h('strong', null, textOf(t, 'list.marketHits').replace('{n}', String(searchMeta ? searchMeta.total : items.length).replace(/\B(?=(\d{3})+(?!\d))/g, ','))),
                      h('div', { className: 'dsh-pl-seg', role: 'group', 'aria-label': 'sort' },
                        chip('hot', textOf(t, 'list.sortHot'), searchSort, (id) => { setSearchSort(id); setSearchPage(0); runMarketSearch(marketQuery, id, marketCategory, 0) }),
                        chip('new', textOf(t, 'list.sortNew'), searchSort, (id) => { setSearchSort(id); setSearchPage(0); runMarketSearch(marketQuery, id, marketCategory, 0) }))),
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
                      })))),
                    pager)
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
              chip('installed', textOf(t, 'list.installed'), surface === 'market' || surface === 'featured' || surface === 'design' || surface === 'about' ? '' : filter, (id) => { setSurface('plugins'); setFilter(id); remember({ filter: id }) }),
              chip('builtin', textOf(t, 'list.builtin'), surface === 'market' || surface === 'featured' || surface === 'design' || surface === 'about' ? '' : filter, (id) => { setSurface('plugins'); setFilter(id); remember({ filter: id }) }),
              chip('market', textOf(t, 'list.market'), surface === 'market' ? 'market' : '', () => setSurface('market')),
              chip('featured', textOf(t, 'list.featured'), surface === 'featured' ? 'featured' : '', () => setSurface('featured')),
              chip('design', textOf(t, 'list.design'), surface === 'design' ? 'design' : '', () => setSurface('design')),
              chip('about', textOf(t, 'list.about'), surface === 'about' ? 'about' : '', () => setSurface('about'))),
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
        toast ? h('div', { className: 'dsh-pl-toast', role: 'status' },
          h('span', { className: 'dsh-pl-toast-dot' }),
          h('span', null, toast)) : null,
        listNote ? h('p', { className: 'dsh-pl-note dsh-pl-list-note' }, listNote) : null,
        surface === 'about'
          ? aboutView()
          : surface === 'design'
          ? designView()
          : surface === 'featured'
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
                          healthChip(title, diagnoses[plugin.entryId], copiedKey === plugin.entryId, () => {
                            void copyDiagnosis(plugin, title, diagnoses[plugin.entryId])
                          }),
                          (() => {
                            const bundle = matchBundle(plugin, bundles)
                            if (!bundle || !bundle.removable) return null
                            const confirming = removeConfirm === plugin.entryId
                            return h('button', {
                              key: 'remove',
                              type: 'button',
                              className: `dsh-pl-card-btn${confirming ? ' is-danger' : ''}`,
                              onClick: (event) => {
                                event.stopPropagation()
                                if (confirming) void removePlugin(plugin, bundle)
                                else setRemoveConfirm(plugin.entryId)
                              },
                            }, confirming ? textOf(t, 'list.confirmRemove') : textOf(t, 'list.remove'))
                          })(),
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
.dsh-pl :focus-visible { outline: var(--dsw-focus-ring-width) solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary)); outline-offset: 2px; }
.dsh-pl-item:focus-visible { outline-offset: 1px; }
.dsh-pl button { font: inherit; font-size: var(--pl-fs-sm); line-height: 1.2; color: var(--dsw-alias-label-primary); background: var(--dsw-alias-bg-base); border: 1px solid var(--dsw-alias-border-l1); border-radius: var(--pl-radius-chip); padding: 6px 12px; cursor: pointer; }
.dsh-pl-seg button { border: 0; border-radius: var(--pl-radius-pill); background: transparent; color: var(--dsw-alias-label-secondary); padding: 5px 12px; }
.dsh-pl-seg button.is-on { background: var(--dsw-alias-bg-base); color: var(--dsw-alias-label-primary); font-weight: 600; box-shadow: none; }
.dsh-pl-item.is-on { border-color: var(--dsw-alias-state-business-primary); background: var(--dsw-alias-bg-layer-2); box-shadow: inset 0 0 0 1px var(--dsw-alias-state-business-primary); }
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
.dsh-pl-health { flex: none; margin-left: 0; padding: 4px 9px; border: 0; border-radius: var(--pl-radius-chip); font-family: inherit; font-size: var(--pl-fs-xs); cursor: pointer; white-space: nowrap; }
.dsh-pl-health.is-ok { background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-secondary); cursor: default; }
.dsh-pl-health.is-warn { background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-state-warn-label); }
.dsh-pl-health.is-bad { background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-state-error-primary); }
.dsh-pl-health.is-copied { background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-secondary); }
.dsh-pl-card-btn.is-danger { color: var(--dsw-alias-state-error-primary); }
.dsh-pl-list-note { margin: 10px 12px 0; }
.dsh-pl-toast { display: flex; align-items: center; gap: 8px; margin: 10px 12px 0; padding: 10px 12px; border: 1px solid var(--dsw-alias-border-l2); border-radius: var(--pl-radius-inner); background: var(--dsw-alias-bg-layer-1); color: var(--dsw-alias-label-primary); font-size: var(--pl-fs-sm); line-height: 1.5; animation: dsh-pl-toast-in 160ms ease-out; }
.dsh-pl-toast-dot { flex: none; width: 7px; height: 7px; border-radius: 50%; background: var(--dsw-alias-state-success-primary); }
@keyframes dsh-pl-toast-in { from { opacity: 0; transform: translateY(-3px); } to { opacity: 1; transform: none; } }
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
.dsh-pl-link { color: var(--dsw-alias-state-business-primary); text-decoration: none; }
.dsh-pl-link:hover { text-decoration: underline; }
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
.dsh-pl-md a { color: var(--dsw-alias-state-business-primary); }
.dsh-pl-table-wrap { margin: 8px 0 14px; overflow-x: auto; border: 1px solid var(--dsw-alias-border-l1); border-radius: var(--pl-radius-chip); }
.dsh-pl-md pre { margin: 0 0 12px; padding: 10px 12px; border: 1px solid var(--dsw-alias-border-l1); border-radius: var(--pl-radius-chip); background: var(--dsw-alias-bg-layer-2); font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: var(--pl-fs-xs); line-height: 1.75; overflow-x: auto; }
.dsh-pl-md pre code { padding: 0; background: transparent; font-size: inherit; font-family: inherit; }
.dsh-pl-md blockquote { margin: 0 0 12px; padding: 8px 12px; border-left: 3px solid var(--dsw-alias-border-l2); background: var(--dsw-alias-bg-layer-2); border-radius: 0 var(--pl-radius-chip) var(--pl-radius-chip) 0; font-size: var(--pl-fs-sm); color: var(--dsw-alias-label-secondary); }
.dsh-pl-md table { width: 100%; border-collapse: collapse; font-size: var(--pl-fs-md); }
.dsh-pl-md th, .dsh-pl-md td { padding: 8px 10px; text-align: left; vertical-align: top; border-bottom: 1px solid var(--dsw-alias-border-l1); }
.dsh-pl-md th { color: var(--dsw-alias-label-secondary); font-weight: 650; background: var(--dsw-alias-bg-layer-1); white-space: nowrap; }
.dsh-pl-md td:first-child { white-space: nowrap; }
.dsh-pl-md tr:last-child td { border-bottom: 0; }
.dsh-pl-market { flex: 1 1 auto; min-height: 0; overflow: auto; padding: 12px; }
.dsh-pl-curated-tag { flex: none; padding: 2px 8px; border-radius: var(--pl-radius-pill); background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-secondary); font-size: var(--pl-fs-xs); }
.dsh-pl-item.is-curated { min-height: 78px; align-items: flex-start; }
.dsh-pl-item.is-curated .dsh-pl-copy strong { white-space: normal; overflow: visible; text-overflow: clip; line-height: 1.4; }
.dsh-pl-item.is-curated .dsh-pl-where { white-space: normal; overflow: visible; text-overflow: clip; line-height: 1.6; }
.dsh-pl-curated-list { display: flex; flex-direction: column; gap: 10px; }
.dsh-pl-featured-foot { margin: 14px 0 0; }
.dsh-pl-market > .dsh-pl-item.is-curated:first-child { margin-top: 2px; }
.dsh-pl-accent { color: var(--dsw-alias-state-business-primary); font-weight: 600; }
.dsh-pl-market-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px; margin-bottom: 12px; }
.dsh-pl-stat { display: flex; flex-direction: column; gap: 6px; padding: 12px 14px; border: 1px solid var(--dsw-alias-border-l2); border-radius: var(--pl-radius-card); background: var(--dsw-alias-bg-layer-1); }
.dsh-pl-stat span { font-size: var(--pl-fs-xs); color: var(--dsw-alias-label-secondary); }
.dsh-pl-stat strong { font-size: var(--pl-fs-num); font-weight: 600; line-height: 1.2; }
.dsh-pl-chart-wrap { padding: 10px 12px 4px; border: 1px solid var(--dsw-alias-border-l2); border-radius: var(--pl-radius-card); background: var(--dsw-alias-bg-layer-1); }
.dsh-pl-chart { display: block; width: 100%; height: auto; }
.dsh-pl-about { padding: 16px 18px; margin-bottom: 12px; border: 1px solid var(--dsw-alias-border-l2); border-radius: var(--pl-radius-inner); background: var(--dsw-alias-bg-layer-1); }
.dsh-pl-about-h { margin: 0 0 10px; font-size: var(--pl-fs-lg); font-weight: 600; color: var(--dsw-alias-label-primary); }
.dsh-pl-about-p { margin: 0 0 8px; font-size: var(--pl-fs-sm); line-height: 1.7; color: var(--dsw-alias-label-secondary); }
.dsh-pl-about-p:last-of-type { margin-bottom: 0; }
.dsh-pl-about-facts { display: flex; flex-direction: column; gap: 8px; }
.dsh-pl-about-fact { display: flex; gap: 12px; align-items: baseline; }
.dsh-pl-about-label { flex: none; width: 72px; font-size: var(--pl-fs-sm); color: var(--dsw-alias-label-secondary); }
.dsh-pl-about-value { min-width: 0; font-size: var(--pl-fs-sm); color: var(--dsw-alias-label-primary); word-break: break-all; }
.dsh-pl-about-pre { margin: 10px 0 12px; padding: 12px 14px; border: 1px solid var(--dsw-alias-border-l1); border-radius: var(--pl-radius-chip); background: var(--dsw-alias-bg-layer-2); font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: var(--pl-fs-xs); line-height: 1.7; color: var(--dsw-alias-label-secondary); white-space: pre-wrap; word-break: break-word; max-height: 220px; overflow: auto; }
.dsh-pl-about-copy { margin-left: auto; display: block; padding: 5px 12px; border: 0; border-radius: var(--pl-radius-chip); background: var(--dsw-alias-state-business-primary); color: var(--dsw-alias-label-on-color); font-family: inherit; font-size: var(--pl-fs-xs); cursor: pointer; }
.dsh-pl-about-copy:hover { opacity: 0.9; }
.dsh-pl-spec { border: 1px solid var(--dsw-alias-border-l2); border-radius: var(--pl-radius-card); background: var(--dsw-alias-bg-layer-1); overflow: hidden; }
.dsh-pl-spec-head { display: flex; align-items: center; gap: 10px; padding: 8px 12px; border-bottom: 1px solid var(--dsw-alias-border-l1); background: var(--dsw-alias-bg-layer-2); }
.dsh-pl-spec-tabs { display: flex; gap: 2px; min-width: 0; overflow: hidden; }
.dsh-pl-spec-tab { flex: none; padding: 5px 10px; border: 0; border-radius: var(--pl-radius-chip); background: transparent; color: var(--dsw-alias-label-secondary); font-family: inherit; font-size: var(--pl-fs-sm); cursor: pointer; white-space: nowrap; }
.dsh-pl-spec-tab:hover { color: var(--dsw-alias-label-primary); }
.dsh-pl-spec-tab.is-on { background: var(--dsw-alias-bg-layer-1); color: var(--dsw-alias-label-primary); font-weight: 600; }
.dsh-pl-spec-hint { margin: 0; padding: 10px 16px 0; font-size: var(--pl-fs-xs); color: var(--dsw-alias-label-secondary); line-height: 1.6; }
.dsh-pl-spec-body { padding: 4px 16px 16px; }
.dsh-pl-copy-spec { flex: none; margin-left: auto; padding: 4px 10px; border: 1px solid var(--dsw-alias-border-l2); border-radius: var(--pl-radius-chip); background: transparent; color: var(--dsw-alias-label-secondary); font-family: inherit; font-size: var(--pl-fs-xs); cursor: pointer; }
.dsh-pl-copy-spec:hover { background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-primary); }
.dsh-pl-block-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 10px; }
.dsh-pl-block-head strong { font-size: var(--pl-fs-lg); }
.dsh-pl-block-head span { font-size: var(--pl-fs-xs); color: var(--dsw-alias-label-secondary); }
.dsh-pl-block { margin-bottom: 22px; }
.dsh-pl-market .dsh-pl-note { margin: 10px 2px 0; }
.dsh-pl-hot { margin-top: 4px; }
.dsh-pl-search-wrap { display: flex; flex-direction: column; gap: 8px; margin-bottom: 10px; }
.dsh-pl-pager { display: flex; align-items: center; justify-content: center; gap: 12px; padding: 14px 0 4px; }
.dsh-pl-pager-btn { flex: none; padding: 6px 14px; border: 1px solid var(--dsw-alias-border-l2); border-radius: var(--pl-radius-chip); background: var(--dsw-alias-bg-layer-1); color: var(--dsw-alias-label-primary); font-family: inherit; font-size: var(--pl-fs-sm); cursor: pointer; }
.dsh-pl-pager-btn:hover:not(:disabled) { background: var(--dsw-alias-bg-layer-2); }
.dsh-pl-pager-btn:disabled { opacity: 0.45; cursor: default; }
.dsh-pl-pager-info { font-size: var(--pl-fs-sm); color: var(--dsw-alias-label-secondary); font-variant-numeric: tabular-nums; }
.dsh-pl-cats { display: flex; flex-wrap: wrap; gap: 6px; }
.dsh-pl-cat { flex: none; padding: 4px 10px; border: 1px solid var(--dsw-alias-border-l1); border-radius: var(--pl-radius-pill); background: transparent; color: var(--dsw-alias-label-secondary); font-family: inherit; font-size: var(--pl-fs-xs); cursor: pointer; white-space: nowrap; }
.dsh-pl-cat:hover { border-color: var(--dsw-alias-border-l2); color: var(--dsw-alias-label-primary); }
.dsh-pl-cat.is-on { border-color: transparent; background: var(--dsw-alias-state-business-primary); color: var(--dsw-alias-label-on-color); }
.dsh-pl-search { width: 100%; margin: 0; padding: 8px 12px; border: 1px solid var(--dsw-alias-border-l2); border-radius: var(--pl-radius-inner); background: var(--dsw-alias-bg-layer-1); color: var(--dsw-alias-label-primary); font-family: inherit; font-size: var(--pl-fs-sm); }
.dsh-pl-search::placeholder { color: var(--dsw-alias-label-secondary); }
.dsh-pl-search:focus-visible { outline: var(--dsw-focus-ring-width) solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary)); outline-offset: 1px; border-color: var(--dsw-alias-state-business-primary); }
.dsh-pl-metric { flex: none; margin-left: auto; padding-left: 8px; font-size: var(--pl-fs-xs); color: var(--dsw-alias-label-secondary); white-space: nowrap; font-variant-numeric: tabular-nums; }
.dsh-pl-delta { flex: none; margin-left: auto; font-size: var(--pl-fs-sm); font-weight: 600; color: var(--dsw-alias-state-business-primary); }
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
        const diagnosePlugins = (payload) => rpcCall('/dsh-plugins-ui-rpc', 'diagnose', payload || {})
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
          inject: () => ({ listPlugins, listBundles, readBundleDetail, setPluginEnabled, installBundle, removeBundle, loadFacts, revealPackage, loadMarketTrend, loadMarketHot, searchCatalog, diagnosePlugins, listGuide, subscribeGuide, listSeats, subscribeSeats, openPanel, t, readLocale, subscribeLocale }),
        }, ListView)), 'plugin-list: tab body')
      },
    }
  },
})
