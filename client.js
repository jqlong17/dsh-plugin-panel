window.__ModuleLoader__.load({
  id: 'dsh-plugin-panel',
  factory(require) {
    const React = require('react')
    const h = React.createElement
    const PANEL_ID = 'dsh-plugin-panel'
    const TAB_KIND = 'plugin-canvas'
    const NS = 'dsh-plugin-panel'
    const VERSION = 'v0.1.18'
    const PREF_KEY = 'dsh.plugin-list.pref.v2'

    const COPY = {
      zh: {
        'tab.title': '插件管理',
        'guide.title': '插件管理',
        'guide.description': '查看并打开右侧栏插件。',
        'list.installed': '用户安装',
        'list.installedAll': '已安装插件',
        'list.builtin': '系统内置',
        'list.refresh': '刷新',
        'list.market': '插件市场',
        'list.featured': '精选推荐',
        'list.featuredTitle': '编辑精选',
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
        'list.aboutAuto': '更新',
        'list.aboutAutoBody': '插件每天自己查一次 npm，有新版本就直接装上，装完提示重启 DeepSeek Harness。从源码软链安装的开发环境不会自动更新（否则会覆盖正在改的代码）。',
        'list.aboutTabs': '每个页签做什么',
        'list.aboutTabPlugins': '已安装插件',
        'list.aboutTabPluginsBody': '所有装了的东西都在这里，包括 DSH 自带的系统插件。每行标出它的入口在哪（右侧栏、设置页、左侧菜单，或者没有界面），可以置顶、开关、移除；缺元信息的会标一个「建议 N」，点一下复制体检报告。',
        'list.aboutTabMarket': '插件市场',
        'list.aboutTabMarketBody': '整个插件目录：增长趋势图、最近 7 天增长榜、支持中文的全库搜索，还有按分类筛选和一键装卸。本地索引没收录的包，会去 npm 实时查一次——刚发布的插件通常就卡在这里。',
        'list.aboutTabFeatured': '精选推荐',
        'list.aboutTabFeaturedBody': '人工挑的，数量少是有意的。收录标准只有一条：自己装过、用过，确认它解决了真问题。每一条都写清「为什么值得装」，不复述插件自己的介绍。',
        'list.aboutTabDesign': '设计规范',
        'list.aboutTabDesignBody': '给插件开发者的规范文本，按场景分三段：骨架与元信息（命名、清单、locale、图标、关于页）、视觉设计（颜色、边框、图标尺寸、图表）、移动端接入。每段都能单独复制，粘给任意 AI 让它照着改。里面所有颜色变量名都对着 DSH 实际样式表核对过——这一点很关键，写错名字不会报错，只是颜色静默失效。',
        'list.aboutShare': '分享给别人',
        'list.aboutShareHint': '把下面这段整段复制，发给任意一个能操作电脑的 AI，它就能自己把插件装上。',
        'list.aboutCopy': '复制这段话',
        'list.aboutCopied': '安装说明已复制，粘给任意 AI 即可让它帮你装',
        'list.designTitle': '插件设计规范',
        'list.designHint': '按场景选一段复制，粘给任意 AI 即可。所有 token 名都对照 DSH 实际样式表核对过。',
        'list.designCopy': '复制规范',
        'list.designCopyAll': '复制全部',
        'list.designCopyAllHint': '把三个场景拼成一份 Markdown，直接粘贴给 AI',
        'list.designCopiedAll': '已复制全部设计规范（三段合并）',
        'list.designCopied': '{name}规范已复制，粘给任意 AI 智能体即可让它照做',
        'list.back': '返回',
        'list.marketTitle': '插件市场趋势',
        'list.marketHint': '来自 dsh-plugin-shop 目录的每日快照，不是 npm 全站统计。',
        'list.marketLoading': '正在取历史数据，第一次大约十几秒…',
        'list.marketError': '取不到目录数据。如果刚更新过插件，重启一次 DeepSeek Harness 再试。',
        'list.countNow': '当前收录',
        'list.countFiltered': '已过滤',
        'list.countFilteredHint': '目录自动抓到的候选里没通过筛查的数量：不是插件包、已废弃、缺入口、版本不兼容等 17 类原因。它统计的是扫描范围，不是收录数量，也不是 npm 全站统计。',
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
        'list.remoteSearching': '本地索引没有，正在查 npm…',
        'list.remoteHits': '本地索引没有收录，npm 上有 {n} 个',
        'list.remoteHint': '这些包比本地索引新，通常是刚发布不久。装完重启 DSH 生效。搜不到时可以粘贴完整包名，带 @ 作者名的那种最准。',
        'list.remoteEmpty': '本地索引和 npm 上都没有找到这个包',
        'list.remoteSaved': '已写入本地索引 {n} 条，下次搜索直接从本地命中',
        'list.remoteError': '查 npm 时出错了，可能是网络问题',
        'list.remoteSource': 'npm（本地索引还没收录）',
        'list.size': '体积',
        'list.sizeUnpacked': '体积（解压后）',
        'list.fileCount': '{n} 个文件',
        'list.marketHits': '找到 {n} 个',
        'list.sortHot': '最热',
        'list.sortNew': '最新',
        'list.pagePrev': '上一页',
        'list.pageNext': '下一页',
        'list.pageInfo': '第 {page} / {pages} 页',
        'list.hotSearch': '搜索插件名、说明或分类…',
        'list.hotNoMatch': '没有匹配的插件',
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
        'list.copied': '已复制',
        'list.copiedHint': '体检结果已复制，粘贴到左侧对话框或任意 AI 智能体即可按建议修正',
        'list.copyFailed': '复制失败',
        'list.healthFailed': '体检调用失败',
        'list.healthEmpty': '体检没有返回结果',
        'list.healthPending': '体检中',
        'list.remove': '卸载',
        'list.updateTo': '更新到',
        'list.updating': '更新中…',
        'list.updateDone': '{name} 已更新到 {v}，重启 DSH 后生效',
        'list.updateFailed': '更新失败',
        'list.updateUnavailable': '这个 DSH 版本不支持在面板里更新，请用 dsh plugin 命令升级',
        'list.updateRejected': '{v} 没有被接受，可能它不兼容当前 DSH，或者不是插件包',
        'list.suggest': '建议',
        'list.confirmRemove': '确认卸载',
        'list.removeCancelled': '卸载已取消',
        'list.retry': '重试',
        'list.unavailable': '这个配置档没有插件管理服务。',
        'list.running': '运行中',
        'list.stopped': '已停用',
        'list.failed': '失败',
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
        'list.path': '路径',
        'list.localPath': '本地路径',
        'list.installNpm': 'npm 安装',
        'list.installLink': '本地开发（软链）',
        'list.installFile': '本地文件',
        'list.installTarball': '本地压缩包',
        'list.installGit': 'Git 仓库',
        'list.localTagGit': 'Git',
        'list.localTagNpm': 'npm',
        'list.localTagTarball': '压缩包',
        'list.localTag': '本地',
        'list.tagEnabled': '已启用',
        'list.tagDisabled': '已停用',
        'list.tagFailed': '启动失败',
        'list.scanTab': '本地扫描',
        'list.scanButton': '扫描',
        'list.scanning': '扫描中…',
        'list.scanPlaceholder': '/Users/你/projects/dsh-plugins',
        'list.scanHint': '填一个目录，列出下面所有 DSH 插件（正在开发、或者 DSH 重置后掉出 profile 的都在这里）。装了的显示已安装，没装的可以直接安装。',
        'list.scanIdle': '填一个目录再点「扫描」',
        'list.scanEmpty': '这个目录下没有找到 DSH 插件',
        'list.scanNeedDir': '还没有填目录',
        'list.scanFailed': '扫描失败',
        'list.scanInstalled': '{name} 已安装，重启 DSH 后生效',
        'list.toggleUnavailable': '这个条目不能从这里启停，请用 dsh plugin 命令',
        'list.actions': '操作',
        'list.viewDetail': '查看详情',
        'list.healthCopy': '复制报告',
        'list.installFromLocal': '安装（本地路径）',
        'list.toggleFailed': '启停失败',
        'list.toggleOn': '{name} 已启动',
        'list.toggleOff': '{name} 已停用',
        'list.stateActive': '运行中',
        'list.stateDisabled': '已停用',
        'list.stateFailed': '启动失败',
        'list.stateInactive': '已安装',
        'list.scanStateHint': '「运行中」= 已装且已启用；「已停用」= 装了但关着；「启动失败」= 启用了但没起来；「未安装」= 不在 profile 里。',
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
        'list.installedAll': 'Plugins',
        'list.builtin': 'Built-in',
        'list.refresh': 'Refresh',
        'list.market': 'Plugin market',
        'list.featured': 'Featured',
        'list.featuredTitle': "Editor's picks",
        'list.featuredFoot': 'To suggest a plugin or have yours listed, contact us on WeChat: ruskacoffee',
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
        'list.aboutAuto': 'Updates',
        'list.aboutAutoBody': 'The plugin checks npm once a day and installs a newer version by itself, then asks for a restart. A source checkout installed by link is never auto-updated, so local work is not overwritten.',
        'list.aboutTabs': 'What each tab does',
        'list.aboutTabPlugins': 'Installed',
        'list.aboutTabPluginsBody': 'Everything installed, DSH built-ins included. Each row shows where it lives (right sidebar, settings, left menu, or no UI) and can be pinned, toggled or removed. Missing metadata shows a "suggestion N" badge you can tap to copy a report.',
        'list.aboutTabMarket': 'Market',
        'list.aboutTabMarketBody': 'The whole catalog: growth chart, 7-day ranking, Chinese-friendly full-text search, category filters, one-click install. Packages missing from the local index are looked up on npm on the fly — which is where freshly published plugins live.',
        'list.aboutTabFeatured': 'Featured',
        'list.aboutTabFeaturedBody': 'Hand-picked and deliberately few. One rule: installed and actually used before being listed. Each entry says why it is worth installing instead of repeating the plugin own description.',
        'list.aboutTabDesign': 'Design spec',
        'list.aboutTabDesignBody': 'Rules for plugin authors in three scenarios: skeleton and metadata (naming, manifest, locale, icon, About tab), visual design (colour, borders, icon sizes, charts), mobile. Each section can be copied on its own and handed to any AI. Every colour token name is verified against the real DSH stylesheet — a wrong name fails silently rather than erroring.',
        'list.aboutShare': 'Share it',
        'list.aboutShareHint': 'Copy the whole block below and hand it to any computer-operating AI; it can install the plugin by itself.',
        'list.aboutCopy': 'Copy this',
        'list.aboutCopied': 'Install instructions copied — paste them into any agent',
        'list.designTitle': 'Plugin design spec',
        'list.designHint': 'Copy the section that matches your situation and hand it to any AI. Token names are verified against the real DSH stylesheet.',
        'list.designCopy': 'Copy spec',
        'list.designCopyAll': 'Copy all',
        'list.designCopyAllHint': 'Join the three scenarios into one Markdown document for an AI',
        'list.designCopiedAll': 'Full spec copied (three sections merged)',
        'list.designCopied': '{name} spec copied — paste it into any agent',
        'list.back': 'Back',
        'list.marketTitle': 'Plugin market trend',
        'list.marketHint': 'Daily snapshots of the dsh-plugin-shop catalog, not a site-wide npm count.',
        'list.marketLoading': 'Fetching history, about ten seconds the first time…',
        'list.marketError': 'Could not read the catalog. Restart DeepSeek Harness once if you just updated.',
        'list.countNow': 'Listed',
        'list.countFiltered': 'Filtered',
        'list.countFilteredHint': 'Candidates the catalog scanned but rejected: not a plugin package, deprecated, missing entry, incompatible version, one of 17 reasons. It counts the scan, not the catalog, and is not npm-wide.',
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
        'list.remoteSearching': 'Not in the local index — asking npm…',
        'list.remoteHits': 'Not in the local index, but npm has {n}',
        'list.remoteHint': 'These were published after the local index snapshot. Restart DSH after installing. Paste the full package name (with its @scope) for an exact hit.',
        'list.remoteEmpty': 'Not found in the local index or on npm',
        'list.remoteSaved': 'Saved {n} to the local index — the next search hits it locally',
        'list.remoteError': 'npm lookup failed — probably a network problem',
        'list.remoteSource': 'npm (not in the local index yet)',
        'list.size': 'Size',
        'list.sizeUnpacked': 'Size (unpacked)',
        'list.fileCount': '{n} files',
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
        'list.copied': 'Copied',
        'list.copiedHint': 'Health report copied — paste it into the chat or any agent to fix it',
        'list.copyFailed': 'Copy failed',
        'list.healthFailed': 'Health check failed',
        'list.healthEmpty': 'Health check returned nothing',
        'list.healthPending': 'Checking',
        'list.remove': 'Remove',
        'list.updateTo': 'Update to',
        'list.suggest': 'Suggestion',
        'list.updating': 'Updating…',
        'list.updateDone': '{name} updated to {v}; restart DSH to apply',
        'list.updateFailed': 'Update failed',
        'list.updateUnavailable': 'This DSH version cannot update from the panel; use the dsh plugin command',
        'list.updateRejected': '{v} was rejected — it may not support this DSH version or is not a plugin package',
        'list.confirmRemove': 'Confirm',
        'list.removeCancelled': 'Remove cancelled',
        'list.retry': 'Retry',
        'list.unavailable': 'This profile has no plugin manager.',
        'list.running': 'Running',
        'list.stopped': 'Stopped',
        'list.failed': 'Failed',
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
        'list.path': 'Path',
        'list.localPath': 'Local path',
        'list.installNpm': 'npm',
        'list.installLink': 'Local dev (link)',
        'list.installFile': 'Local file',
        'list.installTarball': 'Local tarball',
        'list.installGit': 'Git repo',
        'list.localTagGit': 'Git',
        'list.localTagNpm': 'npm',
        'list.localTagTarball': 'tarball',
        'list.localTag': 'Local',
        'list.tagEnabled': 'Enabled',
        'list.tagDisabled': 'Disabled',
        'list.tagFailed': 'Failed',
        'list.scanTab': 'Scan',
        'list.scanButton': 'Scan',
        'list.scanning': 'Scanning…',
        'list.scanPlaceholder': '/Users/you/projects/dsh-plugins',
        'list.scanHint': 'Point at a directory to list every DSH plugin under it — work in progress, or plugins dropped from the profile by a reset. Installed ones show as installed; the rest can be installed right here.',
        'list.scanIdle': 'Enter a directory, then Scan',
        'list.scanEmpty': 'No DSH plugin found in this directory',
        'list.scanNeedDir': 'No directory yet',
        'list.scanFailed': 'Scan failed',
        'list.scanInstalled': '{name} installed — restart DSH to apply',
        'list.toggleUnavailable': 'This entry cannot be toggled from here; use the dsh plugin command',
        'list.actions': 'Actions',
        'list.viewDetail': 'View details',
        'list.healthCopy': 'copy report',
        'list.installFromLocal': 'Install (local path)',
        'list.toggleFailed': 'Toggle failed',
        'list.toggleOn': '{name} started',
        'list.toggleOff': '{name} stopped',
        'list.stateActive': 'Running',
        'list.stateDisabled': 'Disabled',
        'list.stateFailed': 'Failed to start',
        'list.stateInactive': 'Installed',
        'list.scanStateHint': 'Running = installed and enabled; Disabled = installed but off; Failed = enabled but it did not start; Not installed = absent from the profile.',
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
          filter: parsed.filter === 'builtin' || parsed.filter === 'scan' ? parsed.filter : 'installed',
          pins: Array.isArray(parsed.pins) ? parsed.pins.filter((id) => typeof id === 'string') : [],
          layout: parsed.layout === 'card' ? 'card' : 'list',
          // 本地扫描的目录要留着：重启电脑、插件重载之后还能直接扫
          scanDir: typeof parsed.scanDir === 'string' ? parsed.scanDir : '',
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

    /**
     * 判断插件是怎么装进来的。
     *
     * DSH 的 bundle.source 形如 `包名@版本`、`包名@link:/path`、`包名@file:/path`，
     * 取最后一个 @ 之后的部分就能分清：软链 = 本地开发，file = 本地文件，其余 = npm。
     */
    function installSourceOf(bundle) {
      const raw = String((bundle && bundle.source) || '')
      const at = raw.lastIndexOf('@')
      const tail = at >= 0 ? raw.slice(at + 1) : raw
      if (tail.startsWith('link:')) return { kind: 'link', path: tail.slice(5) }
      if (tail.startsWith('file:')) {
        // file: 后面是压缩包还是目录，决定算「本地文件」还是「本地压缩包」
        return /[.](tgz|tar[.]gz)$/i.test(tail) ? { kind: 'tarball', path: tail.slice(5) } : { kind: 'file', path: tail.slice(5) }
      }
      if (/^(git[+]|git:|github:)|^https?:\/\/.*[.]git(\b|$)|^git@/i.test(tail)) return { kind: 'git', path: tail }
      return { kind: 'npm', path: '' }
    }

    /** 一个已装插件的运行状态：启用 / 停用 / 启动失败。 */
    function pluginStateOf(plugin) {
      if (!plugin) return 'missing'
      if (plugin.fiberPhase === 'failed') return 'failed'
      if (plugin.enabled === false) return 'disabled'
      return 'active'
    }

    /** 安装方式的一行说明：npm 显示来源，本地显示路径。 */
    function installSourceText(bundle, t) {
      const info = installSourceOf(bundle)
      if (info.kind === 'link') return `${textOf(t, 'list.installLink')} · ${info.path}`
      if (info.kind === 'file') return `${textOf(t, 'list.installFile')} · ${info.path}`
      if (info.kind === 'tarball') return `${textOf(t, 'list.installTarball')} · ${info.path}`
      if (info.kind === 'git') return `${textOf(t, 'list.installGit')} · ${info.path}`
      const version = bundle && bundle.version ? ` · v${bundle.version}` : ''
      return `${textOf(t, 'list.installNpm')}${version}`
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
    /** 图的公共外壳：左边的刻度、底部的日期、图本身用百分比坐标，文字走 HTML。 */
    function chartFrame({ ticks, tickLabel, xLabels, lastLabel, plot, labels, overlay, tip }) {
      return h('div', { className: 'dsh-pl-chartbox' },
        // 纵轴从大到小：最大值在上，0 在下
        h('div', { className: 'dsh-pl-chart-y' }, [...ticks].reverse().map((tick, index) => h('span', { key: index }, tickLabel(tick)))),
        // 绘图区：图、悬浮提示、鼠标捕获层共用同一块坐标
        h('div', { className: 'dsh-pl-chart-plot' }, plot, labels, tip, overlay),
        lastLabel,
        h('div', { className: 'dsh-pl-chart-x' }, xLabels.map((label, index) => h('span', { key: index }, label))))
    }

    /** 鼠标在绘图区的位置 → 第几根柱子/第几个点。 */
    function hoverIndexAt(event, count) {
      const rect = event.currentTarget.getBoundingClientRect()
      if (!rect.width) return -1
      const ratio = (event.clientX - rect.left) / rect.width
      return Math.max(0, Math.min(count - 1, Math.round(ratio * Math.max(count - 1, 1))))
    }

    function barChart(days, hoverIndex, onHover) {
      const n = days.length
      const deltas = days.map((day, index) => (index === 0 ? 0 : Math.max(0, day.count - days[index - 1].count)))
      const peak = Math.max(...deltas, 1) * 1.15
      const slot = 100 / Math.max(n, 1)
      const barW = Math.min(slot * 0.6, 3.2)
      const yOf = (value) => 100 - (value / peak) * 100
      const ticks = [0, 0.25, 0.5, 0.75, 1].map((ratio) => peak * ratio)
      const labelIndexes = n <= 1 ? [0] : [0, Math.floor((n - 1) / 2), n - 1]
      const hovered = hoverIndex >= 0 && hoverIndex < n ? hoverIndex : -1

      const plot = h('svg', {
        className: 'dsh-pl-chart',
        viewBox: '0 0 100 100',
        preserveAspectRatio: 'none',
        role: 'img',
      },
      ticks.map((tick, index) => h('line', {
        key: `g${index}`, x1: 0, x2: 100, y1: yOf(tick), y2: yOf(tick),
        stroke: 'var(--dsw-alias-border-l1)', strokeWidth: 0.4, vectorEffect: 'non-scaling-stroke',
      })),
      deltas.map((value, index) => h('rect', {
        key: `b${index}`,
        x: index * slot + (slot - barW) / 2,
        y: yOf(value),
        width: barW,
        height: Math.max(100 - yOf(value), 0.4),
        rx: 0.6,
        fill: 'var(--dsw-alias-state-business-primary)',
        opacity: hovered === index ? 1 : 0.55,
      })))

      const overlay = h('div', {
        className: 'dsh-pl-chart-overlay',
        onMouseMove: (event) => onHover(hoverIndexAt(event, n)),
        onMouseLeave: () => onHover(-1),
      })

      // 柱子上方的数值：天多的时候按间隔抽稀，最后一天一定保留
      const labelStep = Math.max(1, Math.ceil(n / 14))
      const labels = h('div', { className: 'dsh-pl-chart-labels' },
        deltas.map((value, index) => {
          if (index === 0) return null
          if (index % labelStep !== 0 && index !== n - 1) return null
          return h('span', {
            key: `l${index}`,
            className: 'dsh-pl-chart-bar-label',
            style: {
              left: `${index * slot + slot / 2}%`,
              top: `${Math.max(yOf(value), 2)}%`,
            },
          }, `+${value.toLocaleString()}`)
        }))

      const tip = hovered >= 0
        ? h('div', {
          className: 'dsh-pl-chart-tip',
          style: {
            left: `${hovered * slot + slot / 2}%`,
            top: `${yOf(deltas[hovered])}%`,
          },
        }, `${days[hovered].day.slice(5)} · +${deltas[hovered].toLocaleString()}`)
        : null

      return chartFrame({
        ticks,
        tickLabel: (tick) => (tick >= 1000 ? `${Math.round(tick / 1000)}k` : String(Math.round(tick))),
        xLabels: labelIndexes.map((index) => days[index].day.slice(5)),
        lastLabel: h('div', { className: 'dsh-pl-chart-last' }, days[n - 1].count.toLocaleString()),
        plot,
        labels,
        overlay,
        tip,
      })
    }

    function trendChart(days, hoverIndex, onHover, firstNote) {
      const n = days.length
      const values = days.map((day) => day.count)
      const max = Math.max(...values, 1) * 1.12
      const xOf = (index) => (n <= 1 ? 50 : (index / (n - 1)) * 100)
      const yOf = (value) => 100 - (value / max) * 100
      const line = days.map((day, index) => `${index === 0 ? 'M' : 'L'} ${xOf(index).toFixed(2)} ${yOf(day.count).toFixed(2)}`).join(' ')
      const area = `${line} L 100 100 L 0 100 Z`
      const ticks = [0, 0.25, 0.5, 0.75, 1].map((ratio) => max * ratio)
      const labelIndexes = n <= 1 ? [0] : [0, Math.floor((n - 1) / 2), n - 1]
      const hovered = hoverIndex >= 0 && hoverIndex < n ? hoverIndex : -1

      const plot = h('svg', {
        className: 'dsh-pl-chart',
        viewBox: '0 0 100 100',
        preserveAspectRatio: 'none',
        role: 'img',
      },
      ticks.map((tick, index) => h('line', {
        key: `g${index}`, x1: 0, x2: 100, y1: yOf(tick), y2: yOf(tick),
        stroke: 'var(--dsw-alias-border-l1)', strokeWidth: 0.4, vectorEffect: 'non-scaling-stroke',
      })),
      h('path', { d: area, fill: 'var(--dsw-alias-state-business-primary)', opacity: 0.08 }),
      h('path', {
        d: line, fill: 'none', stroke: 'var(--dsw-alias-state-business-primary)',
        strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', vectorEffect: 'non-scaling-stroke',
      }),
      hovered >= 0 ? h('line', {
        x1: xOf(hovered), x2: xOf(hovered), y1: 0, y2: 100,
        stroke: 'var(--dsw-alias-label-secondary)', strokeWidth: 1,
        strokeDasharray: '4 4', opacity: 0.5, vectorEffect: 'non-scaling-stroke',
      }) : null)

      const overlay = h('div', {
        className: 'dsh-pl-chart-overlay',
        onMouseMove: (event) => onHover(hoverIndexAt(event, n)),
        onMouseLeave: () => onHover(-1),
      })

      const tip = hovered >= 0
        ? h('div', {
          className: 'dsh-pl-chart-tip',
          style: { left: `${xOf(hovered)}%`, top: `${yOf(values[hovered])}%` },
        },
        h('span', { className: 'dsh-pl-chart-tip-day' }, days[hovered].day),
        h('strong', null, `${values[hovered].toLocaleString()} 个`),
        hovered === 0 && firstNote ? h('span', { className: 'dsh-pl-chart-tip-note' }, firstNote) : null)
        : null

      return chartFrame({
        ticks,
        tickLabel: (tick) => `${Math.round(tick / 1000)}k`,
        xLabels: labelIndexes.map((index) => days[index].day.slice(5)),
        lastLabel: h('div', { className: 'dsh-pl-chart-last' }, String(values[n - 1])),
        plot,
        overlay,
        tip,
      })
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
      let ordered = null
      let paragraph = []
      let table = null
      let code = null
      let quote = null

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
      const flushOrdered = () => {
        if (!ordered) return
        blocks.push(h('ol', { key: `ol-${blocks.length}` }, ordered.map((item, index) => h('li', { key: index }, inlineMarkdown(item)))))
        ordered = null
      }
      const flushTable = () => {
        if (!table) return
        const node = renderTable(table)
        if (node) blocks.push(h('div', { key: `table-${blocks.length}` }, node))
        table = null
      }
      const flushCode = () => {
        if (!code) return
        blocks.push(h('pre', { key: `code-${blocks.length}`, className: 'dsh-pl-md-code' },
          h('code', null, code.lines.join('\n'))))
        code = null
      }
      const flushQuote = () => {
        if (!quote) return
        blocks.push(h('blockquote', { key: `q-${blocks.length}` }, inlineMarkdown(quote.join(' '))))
        quote = null
      }
      const flushAll = () => {
        flushParagraph()
        flushList()
        flushOrdered()
        flushTable()
      }

      lines.forEach((line) => {
        const trimmed = line.trim()

        // 代码块：``` 开头和结尾配对，中间原样保留（表格、列表、缩进都不动）
        const fence = /^```([a-zA-Z0-9+#-]*)\s*$/.exec(trimmed)
        if (fence) {
          if (code === null) {
            flushAll()
            code = { lang: fence[1] || '', lines: [] }
          } else {
            flushCode()
          }
          return
        }
        if (code !== null) {
          code.lines.push(line)
          return
        }

        if (isTableRow(trimmed)) {
          flushParagraph()
          flushList()
          flushOrdered()
          table = table || []
          table.push(trimmed)
          return
        }
        flushTable()
        if (!trimmed || trimmed.startsWith('![')) {
          flushAll()
          flushQuote()
          return
        }
        const quoted = /^>\s?(.*)$/.exec(trimmed)
        if (quoted) {
          flushParagraph()
          flushList()
          flushOrdered()
          flushTable()
          quote = quote || []
          quote.push(quoted[1])
          return
        }
        flushQuote()
        const heading = /^(#{1,4})\s+(.*)$/.exec(trimmed)
        if (heading) {
          flushAll()
          blocks.push(h(heading[1].length <= 2 ? 'h3' : 'h4', { key: `h-${blocks.length}`, className: 'dsh-pl-md-h' }, inlineMarkdown(heading[2])))
          return
        }
        // 复选框：- [ ] / - [x] 画成方框，比原样显示 "[ ]" 好读
        const checkbox = /^[-*]\s+\[([ xX])\]\s+(.*)$/.exec(trimmed)
        if (checkbox) {
          flushParagraph()
          flushOrdered()
          list = list || []
          list.push(`${checkbox[1].trim() ? '☑' : '☐'} ${checkbox[2]}`)
          return
        }
        const item = /^[-*]\s+(.*)$/.exec(trimmed)
        if (item) {
          flushParagraph()
          flushOrdered()
          list = list || []
          list.push(item[1])
          return
        }
        const numbered = /^(\d+)\.\s+(.*)$/.exec(trimmed)
        if (numbered) {
          flushParagraph()
          flushList()
          ordered = ordered || []
          ordered.push(numbered[2])
          return
        }
        flushList()
        flushOrdered()
        paragraph.push(trimmed.replace(/^>\s?/, ''))
      })
      flushAll()
      flushCode()
      flushQuote()
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
    /** 字节数转成人看的大小；0 或非法值返回空串。 */
    function formatBytes(bytes) {
      const n = Number(bytes) || 0
      if (n <= 0) return ''
      if (n >= 1048576) return `${(n / 1048576).toFixed(n >= 10485760 ? 0 : 1)} MB`
      if (n >= 1024) return `${Math.round(n / 1024)} KB`
      return `${n} B`
    }

    /** 「1.2 MB · 14 个文件」这样的组合文案。 */
    function formatSize(bytes, files, t) {
      const size = formatBytes(bytes)
      if (!size) return ''
      const count = Number(files) || 0
      return count > 0 ? `${size} · ${textOf(t, 'list.fileCount').replace('{n}', String(count))}` : size
    }

    /**
     * 仓库链接。接受字符串，也接受 package.json 的 repository 对象——
     * monorepo 里的 `directory` 会带到链接上，否则点进去只是仓库根。
     */
    function repoLinkOf(value) {
      let text = ''
      let directory = ''
      if (value && typeof value === 'object') {
        text = typeof value.url === 'string' ? value.url.trim() : ''
        directory = typeof value.directory === 'string' ? value.directory.replace(/^[./\s]+|[./\s]+$/g, '') : ''
      } else {
        text = String(value || '').trim()
      }
      if (!text) return text
      let url = ''
      if (/^git\+https?:\/\//i.test(text)) url = text.replace(/^git\+/, '')
      else if (/^https?:\/\//i.test(text)) url = text
      else if (/^git@github\.com:/i.test(text)) url = `https://github.com/${text.replace(/^git@github\.com:/i, '')}`
      else if (/^[\w.-]+\/[\w.-]+$/.test(text)) url = `https://github.com/${text}`
      if (!url) return text
      const href = url.replace(/\.git$/, '')
      // 有子目录就显示 owner/repo/dir，链接也指到那个目录；否则沿用原来的文本
      const label = directory ? `${href.replace(/^https?:\/\/github\.com\//i, '')}/${directory}` : text.replace(/^git\+/, '')
      return h('a', {
        className: 'dsh-pl-link',
        href: directory ? `${href}/tree/HEAD/${directory}` : href,
        target: '_blank',
        rel: 'noreferrer noopener',
        onClick: (event) => event.stopPropagation(),
      }, label)
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
    const SPEC_SKELETON = [
      "# 插件骨架与元信息",
      "",
      "给一个插件定名字、摆目录、配清单、写 locale、做图标、加关于页。",
      "**新建插件**按顺序走一遍；**已经有插件**的直接跳到第八节，按体检结果逐条对齐。",
      "两边用的是同一套字段，所以只写一遍。",
      "",
      "## 一、先定名字",
      "",
      "四个名字必须能互相对上：",
      "",
      "| 名字 | 写在哪 | 例子 |",
      "| --- | --- | --- |",
      "| 中文名 | `locale/zh.json` → `meta.title` | `插件管理` |",
      "| 英文名 | `locale/en.json` → `meta.title` | `Plugin manager` |",
      "| 包名 | `package.json` → `name` | `dsh-plugin-panel` |",
      "| 行标识 | `cordis.patch.yml` → `id` | `dsh-plugin-panel` |",
      "",
      "- 中文名 **2–6 字**，名词短语，说「做什么」。不要版本号、不要「测试」后缀",
      "- 包名全小写 + 连字符，`dsh-` 开头",
      "- **行标识写包名，不要写相对路径**（`./lib/index.js` 会让宿主读不到 locale，面板永远显示英文名）",
      "",
      "",
      "## 二、目录骨架",
      "",
      "```",
      "my-plugin/",
      "├── package.json          清单：入口、dsh 字段、files",
      "├── cordis.patch.yml      加载行",
      "├── icon.svg              图标，24×24 描边",
      "├── locale/",
      "│   ├── zh.json           meta.title / description / detail",
      "│   └── en.json",
      "├── docs/",
      "│   └── DETAIL.zh.md      详情长文（可被 meta.detail 指向）",
      "├── src/",
      "│   ├── index.ts          host 半片：工具、RPC",
      "│   └── client/           client 半片：面板界面",
      "└── lib/                  构建产物（不要手改）",
      "```",
      "",
      "",
      "## 三、package.json 最小必需",
      "",
      "```json",
      "{",
      "  \"name\": \"dsh-my-plugin\",",
      "  \"version\": \"0.1.0\",",
      "  \"description\": \"One line in English for npm.\",",
      "  \"keywords\": [\"dsh\", \"deepseek-harness\", \"dsh-plugin\", \"中文关键词\"],",
      "  \"exports\": {",
      "    \".\": \"./lib/index.js\",",
      "    \"./client\": \"./lib/client.js\",",
      "    \"./icon\": \"./icon.svg\",",
      "    \"./locale/*.json\": \"./locale/*.json\"",
      "  },",
      "  \"files\": [\"lib\", \"locale/*.json\", \"icon.svg\", \"cordis.patch.yml\", \"docs\"],",
      "  \"dsh\": {",
      "    \"bundle\": { \"patch\": \"./cordis.patch.yml\" },",
      "    \"client\": {",
      "      \"platform\": \"web\",",
      "      \"inject\": [\"@deepseek-ai/dsh-client-ui-sidebar-right\", \"@deepseek-ai/dsh-client-locale\"]",
      "    }",
      "  }",
      "}",
      "```",
      "",
      "要点：",
      "",
      "- `exports[\"./icon\"]` 必须声明，光有 `icon.svg` 文件不算",
      "- `files` 必须含 `locale/*.json` 和 `icon.svg`，否则别人装了看不到",
      "- `dsh.client.inject` 只列代码里真正用到的客户端服务",
      "- `keywords` 必须有一个中文词",
      "",
      "",
      "## 四、cordis.patch.yml",
      "",
      "```yaml",
      "- insert:",
      "    - id: dsh-my-plugin",
      "      name: dsh-my-plugin",
      "```",
      "",
      "`id` 和 `name` 都写包名。写相对路径会导致 locale 读不到。",
      "",
      "",
      "## 五、locale 三件套",
      "",
      "```json",
      "{ \"meta\": {",
      "    \"title\": \"我的插件\",",
      "    \"description\": \"一句话说清它做什么。\",",
      "    \"detail\": \"docs/DETAIL.zh.md\"",
      "} }",
      "",
      "```",
      "",
      "- `meta.detail` 相对**包根**解析，不是相对 `locale/`",
      "- 它指向的文件必须进 `files`",
      "- `en.json` 结构相同，填英文",
      "",
      "",
      "## 六、图标",
      "",
      "```svg",
      "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\"",
      "     fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\"",
      "     stroke-linecap=\"round\" stroke-linejoin=\"round\">",
      "  <!-- 2-4 条 path，留白要够 -->",
      "</svg>",
      "```",
      "",
      "单色描边、`currentColor`、24×24。细节多了在 24px 下会糊。",
      "",
      "",
      "## 七、关于页：每个插件都该有一个",
      "",
      "插件面板最右边放一个「关于」页，回答三个问题：**你是什么、装了会怎样、怎么分享给别人**。",
      "参照实现就是插件管理自己那个「关于」页，照抄结构即可。",
      "",
      "### 1. 这个插件做什么（两到三段）",
      "",
      "说清「解决什么问题」，不要罗列功能点。一段讲它替代了什么麻烦，一段讲它怎么工作，",
      "如果涉及隐私（本地录音、本地转写、不上传云端），单独一句点明——这是用户最关心的。",
      "",
      "### 2. 基本信息（一项一行）",
      "",
      "| 字段 | 内容 |",
      "| --- | --- |",
      "| 包名 | `dsh-my-plugin` |",
      "| 版本 | 从代码里的常量取，不要手写（发布时忘了改就会对不上） |",
      "| 许可 | `MIT` 之类 |",
      "| 仓库 | `github.com/owner/repo`，monorepo 要带子目录 |",
      "| 数据位置 | 插件在用户盘上写东西的地方，比如 `~/.dsh/profiles/<profile>/.plugin-panel` |",
      "",
      "### 3. 分享给别人",
      "",
      "一段可整段复制的文字，让任何 AI 能自己把插件装上。至少包含：",
      "",
      "- 包名、中文名、版本",
      "- 它是干什么的（一句话）",
      "- 按顺序的步骤：确认 profile → `dsh plugin --profile <p> add <包名>` → 重启 DSH",
      "- **兜底约束**：「如果 npm 上取不到这个包，说明还没发布，请直接告诉我，不要自己改写依赖或装同名的其它包」",
      "",
      "最后那条是重点。AI 拿不到包时最常见的两种跑偏：自己改版本号、去找相似名字的包。",
      "",
      "### 4. 两个细节",
      "",
      "- 复制按钮给一句确认提示（「安装说明已复制」），别复制完毫无反应",
      "- 版本号读代码里的常量，不要在两处各写一遍",
      "",
      "",
      "## 八、已有插件怎么对齐",
      "",
      "### 先跑体检，看缺什么",
      "",
      "```bash",
      "dsh插件开发经验/scripts/check-plugin-meta.sh 你的插件目录",
      "```",
      "",
      "面板里每个插件卡片上也有健康度标签，点一下会复制该插件的完整报告。",
      "",
      "",
      "### 七项对照表",
      "",
      "| 要控制的 | 写在哪 | 缺了会怎样 |",
      "| --- | --- | --- |",
      "| 卡片名字 | `locale/zh.json` → `meta.title` | 显示包名 |",
      "| 一句话说明 | `meta.description` | 副标题空白 |",
      "| 详情长文 | `meta.detail` | 回落读 README |",
      "| 图标 | `package.json` → `exports[\"./icon\"]` | 显示默认灰方块 |",
      "| 能否加载 | `dsh.bundle.patch` | 装了不出现 |",
      "| 客户端服务 | `dsh.client.inject` | 运行时报 undefined |",
      "| 打包完整 | `files` | 用户装了看不到图标和中文名 |",
      "",
      "",
      "### 四种常见修法",
      "",
      "#### 1. 面板显示英文包名",
      "",
      "两个原因，都可能同时存在：",
      "",
      "**a) 缺 locale**",
      "",
      "```json",
      "// locale/zh.json",
      "{ \"meta\": { \"title\": \"中文名\", \"description\": \"一句话\" } }",
      "```",
      "",
      "**b) `cordis.patch.yml` 的 `name` 写了相对路径**",
      "",
      "```yaml",
      "# 错：宿主按相对路径找不到包根，读不到 locale",
      "      name: ./lib/index.js",
      "# 对：写包名",
      "      name: dsh-my-plugin",
      "```",
      "",
      "改完要重新构建并重启 DSH。",
      "",
      "#### 2. 图标是灰方块",
      "",
      "```json",
      "\"exports\": { \"./icon\": \"./icon.svg\" },",
      "\"files\": [\"icon.svg\", \"locale/*.json\"]",
      "```",
      "",
      "光有 `icon.svg` 文件但不在 `exports` 里，等于没配。图标规格：24×24、`fill=\"none\"`、`stroke=\"currentColor\"`、`stroke-width=\"1.8\"`。",
      "",
      "#### 3. 详情页空白",
      "",
      "- `meta.detail` 指向的文件不存在 → 创建它",
      "- 或者干脆不写 `meta.detail`，回落读 README 也是允许的",
      "- 写了就要保证它进了 `files`",
      "",
      "#### 4. 中文搜不到",
      "",
      "`keywords` 里加中文词，至少一个：",
      "",
      "```json",
      "\"keywords\": [\"dsh\", \"deepseek-harness\", \"dsh-plugin\", \"插件管理\"]",
      "```",
      "",
      "",
      "### 只对界面插件要求的部分",
      "",
      "纯 host 插件（没有 `dsh.client`）不显示图标、不渲染标题，**不要求** locale 和图标。系统内置的 host 插件大多没有这些，不是缺陷。",
      "",
      "",
      "## 九、交付前自检",
      "",
      "- [ ] 中文名 2–6 字，包名 kebab-case，两者能关联",
      "- [ ] `cordis.patch.yml` 的 `id`/`name` 都是包名",
      "- [ ] `exports[\"./icon\"]` 已声明",
      "- [ ] `files` 含 `locale/*.json` 与 `icon.svg`",
      "- [ ] `locale/zh.json` 三件套齐全，`detail` 文件存在",
      "- [ ] `dsh.bundle.patch` 指向的文件存在",
      "- [ ] 有「关于」页：介绍、基本信息、可复制的分享说明",
      "- [ ] 两个自检脚本都通过",
      "- [ ] 面板卡片显示中文名，不是包名",
      "- [ ] 有图标，不是灰方块",
      "- [ ] 详情页有内容",
      "- [ ] 中文能搜到",
      "- [ ] `check-plugin-meta.sh` 通过",
      "- [ ] 重新构建 + 重启 DSH 后确认",
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
      '## 七、间距：水平方向永远只有一个 12px',
      '',
      '侧边栏面板的左右内边距是 **12px，而且只有一层**。',
      '最常见的错误是：外层容器给了 12px，里面的列表又加 12px，一叠就变成 24px，内容明显往中间缩。',
      '',
      '| 位置 | 建议值 |',
      '| --- | --- |',
      '| 面板左右内边距 | 12px |',
      '| 工具栏上 / 下 | 12px / 10px |',
      '| 列表项之间 | 10px |',
      '| 列表项内部 | 12px |',
      '| 正文行高 | 1.5 |',
      '',
      '**判断方法**：列表项左边缘到面板左边缘，量出来必须是 12px。如果是 24px，说明叠了两层，删掉里面那层的左右内边距。',
      '',
      '这一节只管「面板给你的空间怎么用」。你自己的插件页面内部怎么排，仍然按 4px 的倍数来。',
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
      '- [ ] 卡片左右边缘到面板边缘各 12px，没有叠加成 24px',
      '- [ ] 近黑实心块 ≤ 1、高饱和彩色块 ≤ 2',
      '- [ ] 图标 24px 用 1.8，16px 内联用 1.2',
      '- [ ] 图表未选中数据是浅色，不是 `fill-l2`',
      '- [ ] 成功提示会消失，错误和进行中不会',
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
      {
        name: 'dsh-parse-everything',
        title: '解析一切',
        reason: '给任何一个链接，拆成可复用的文件：抖音/小红书/YouTube/B 站的视频、音轨、封面、正文、字幕、关键帧，加一份节奏报告。每个任务一个独立文件夹，产出还能直接喂给模型。',
      },
    ]


    /**
     * 移动端接入规范。
     *
     * 单独成一段（而不是塞进「元信息修正」）：它讲的不是「清单字段怎么写」，
     * 而是「怎么让插件在 DSH Pocket iOS 里被打开」，涉及路由、认证、渲染三层。
     */
    const SPEC_MOBILE = [
      '# DSH 插件 · 移动端接入',
      '',
      '让插件在 **DSH Pocket iOS** 的「插件」面板里被打开：手机上点「打开」就能看到这个插件的页面。',
      '',
      '## 先跑诊断',
      '',
      '```bash',
      '# 静态检查',
      'node scripts/check-plugin-mobile.mjs 你的插件目录',
      '',
      '# 加运行时检查（需要 DSH 在跑）',
      'node scripts/check-plugin-mobile.mjs 你的插件目录 --base http://127.0.0.1:3091',
      '```',
      '',
      '**构建通过 ≠ 能运行，DOM 有元素 ≠ 用户看得见。** 诊断脚本查静态，视觉要截图。',
      '',
      '## 一、四件事',
      '',
      '### 1. package.json 声明',
      '',
      '```json',
      '"dsh": {',
      '  "mobile": {',
      '    "version": 1,',
      '    "kind": "web",',
      '    "title": "音频解析",',
      '    "path": "/dsh-audio-parse/mobile"',
      '  }',
      '}',
      '```',
      '',
      '| 字段 | 必填 | 说明 |',
      '| --- | --- | --- |',
      '| `version` | ✅ | 固定 `1` |',
      '| `kind` | ✅ | `web`（HTML）或 `native`（Schema，**渲染器尚未实现，别用**） |',
      '| `title` | ✅ | 手机上面板标题 |',
      '| `path` | `kind=web` 必填 | **必须以 `/` 开头**，统一用 `/<包名>/mobile` |',
      '',
      '**漏任何一个字段，移动端列表里那条会被静默过滤。**',
      '',
      '### 2. 移动路由模块',
      '',
      '```ts',
      'export function registerMobile(ctx: Context): () => void {',
      '  return ctx.webServer.register({',
      '    kind: \'prefix\',',
      '    path: \'/dsh-audio-parse/mobile\',',
      '    handler: async (req, res) => {',
      '      const url = new URL(req.url ?? \'/\', \'http://127.0.0.1\')',
      '',
      '      // ① 换 token：走 DSH 认证（App 带 cookie）',
      '      if (url.pathname === \'/dsh-audio-parse/mobile/token\') {',
      '        const rejection = (ctx as any).connection?.requestRejection?.(req)',
      '        if (rejection !== undefined) return send(rejection, \'unauthorized\')',
      '        return send(200, JSON.stringify({ token: mint(), expiresIn: 300 }))',
      '      }',
      '',
      '      // ② 页面：只认格式正确的 token',
      '      if (!/^[A-Za-z0-9_-]{32}$/.test(url.searchParams.get(\'mt\') ?? \'\')) {',
      '        return send(401, \'请从 DSH Pocket App 内打开\')',
      '      }',
      '      return send(200, renderPage(...), \'text/html; charset=utf-8\')',
      '    },',
      '  })',
      '}',
      '```',
      '',
      '### 3. 在 apply() 里接入',
      '',
      '```ts',
      "import { registerMobile } from './mobile.ts'    // ← 注意带 .ts",
      '',
      'ctx.inject([\'connection\', \'webServer\'], (scope: Context) => {',
      '  scope.effect(() => registerRpc(scope), \'xxx: rpc\')',
      '  scope.effect(() => registerMobile(scope), \'xxx: mobile page\')   // ← 加这行',
      '})',
      '```',
      '',
      '### 4. 媒体通道也要开 token',
      '',
      '页面要显示图片/视频/音频时，媒体路由**必须也接受 token**：',
      '',
      '```ts',
      'const token = url.searchParams.get(\'mt\')',
      'if (!/^[A-Za-z0-9_-]{32}$/.test(token ?? \'\')) {',
      '  const rejection = (ctx as any).connection?.requestRejection?.(req)',
      '  if (rejection !== undefined) { res.statusCode = rejection; res.end(); return }',
      '}',
      '```',
      '',
      '## 二、外壳：App 提供返回，插件不要自己画',
      '',
      '手机端打开插件后，页面是**嵌在插件列表页里**显示的（同源 iframe），',
      '顶部由 App 的导航栏负责：左边是「← 插件列表」，右边是「完成」。',
      '',
      '所以：',
      '',
      '- **不要在自己页面里做返回按钮**——会出现两个返回，而且位置还不一样',
      '- 不要依赖 `window.top` / `parent` 做跨层操作，页面按「自己就是一屏」来写',
      '- 页面宽度就是手机宽度，按 `100%` 布局，不要写死 px 宽度',
      '',
      '列表页本身的入口固定是 `dsh-plugin-panel` 的 `/dsh-plugin-panel/mobile`，',
      '它在 App 的插件列表里固定排第一位——**你的插件不需要关心自己被谁打开**。',
      '',
      '列表页会记住上次停在哪里（`localStorage`）：上次停在某个插件，下次打开面板直接回到它；',
      '按过「返回」的则保持在列表。插件侧不用做任何事。',
      '',
      '## 三、数据来源：照官方的顺序取，不要自己编',
      '',
      '**这一节是踩坑换来的。** 手机端列表一开始只拿了包名，结果桌面显示「会议纪要」、',
      '手机显示 `dsh-meeting-memo`——同一个插件两套名字。原因是桌面走的是 DSH 的 locale 机制，',
      '移动端自己从 `listBundles()` 里取了 `name`。',
      '',
      '### 官方怎么取',
      '',
      'DSH 启动时读插件元信息的规则（`dsh-app-boot` 里实现）：',
      '',
      '1. 入口固定是 `locale/en.json`，**它不存在就整套不加载**',
      '2. 扫描 `locale/` 下所有 `*.json`，文件名去掉后缀就是语言 id（`zh`、`ja`…）',
      '3. 每个文件读 `meta.title`、`meta.description`，`meta.detail` 指向长文档',
      '4. 某个语言缺字段时，用 `package.json` 的 `name` / `description` 兜底',
      '',
      '所以插件要展示名字，**只该读这一套**，不要另找字段。',
      '',
      '### 移动端也要照这个顺序',
      '',
      '| 字段 | 顺序 |',
      '| --- | --- |',
      '| 标题 | `locale[当前语言].meta.title` → `locale.en.meta.title` → `package.json` 的 `name` |',
      '| 简介 | `locale[当前语言].meta.description` → `locale.en.meta.description` → `package.json` 的 `description` |',
      '| 长文 | `meta.detail` 指向的文件 → `README.md` 第一段 |',
      '',
      '当前语言按请求的 `Accept-Language` 挑，精确匹配不上就退回主语言（`zh-CN` → `zh`），再不行用 `zh`。',
      '',
      '### 什么是「自己编」',
      '',
      '- 拿 `bundle.name` 当展示名（就是这次的问题：手机上全是包名）',
      '- 自己拼「中文名（包名）」这种标题——包名单独一行小字显示就够了',
      '- 只读 `locale/zh.json` 而不检查 `en.json` 是否存在（官方以 en 为入口）',
      '- `meta.detail` 指向的文件不存在却当成有内容',
      '',
      '## 四、认证：token 由 App 签发，插件只验格式',
      '',
      '```',
      'App 的「打开」→ 从 dsh-plugin-panel 换一次 token',
      '             → 用它打开所有插件的页面',
      '```',
      '',
      '**所以不要要求 token 在自己的 Map 里**——那样跨插件必然 401（已踩过）。',
      '',
      '校验就一行：`/^[A-Za-z0-9_-]{32}$/.test(value)`',
      '',
      '**代价**：任何拿到 32 位串的人都能看那个页面。',
      '**所以：不要把敏感内容（密钥、私人数据）放进 `kind=web` 的页面。**',
      '',
      '## 五、页面写法',
      '',
      '**数据必须服务端直出。** 页面里 `fetch` 自己的 RPC 会被 `requestRejection` 挡掉（WebView 没有 cookie）：',
      '',
      '```ts',
      '// 对',
      'return send(200, renderPage(listTasks(), token))',
      '',
      '// 错：页面里 fetch(\'/xxx-rpc\') —— 手机端 401',
      '```',
      '',
      '**模板放独立文件**（`mobile/page.html` + `mobile/style.css`），每次请求重读。',
      '这样改文案/样式/结构**不用重载插件**，只有改 `.ts` 逻辑才需要。',
      '',
      '**内容多的用 tab 分栏**：',
      '',
      '```',
      '[图片 12] 视频 3  音频 3  文字 12  任务 6     ← 横向可滑',
      '```',
      '',
      '- 默认选中**第一个有内容的分类**（不要选到空页面）',
      '- **切换时不要动滚动位置**（`scrollTo` 会让长页面「像被收起来」）',
      '- 空分类也显示（数量 0），让人知道是空的而不是坏了',
      '',
      '## 六、六个坑（都是实际踩过的）',
      '',
      '| # | 坑 | 症状 | 自查 |',
      '| --- | --- | --- | --- |',
      '| 1 | `import` 漏了 | 该插件**所有路由 405** | `node -e "import(\'./lib/index.js\')"` |',
      '| 2 | 相对 import 后缀不对（`./media` vs `./media.ts`） | 同上 | grep 看是否统一带 `.ts` |',
      '| 3 | `<details>` 收起时只渲染 `<summary>` | DOM 里有、肉眼看不见 | **截图**，别只数 DOM |',
      '| 4 | 占位符写进替换逻辑但没放进模板 | 页面静默少一块 UI | 断言**预期元素数量** |',
      '| 5 | CSS 优先级（`.detail a` 盖掉 `.open` 的 color） | 按钮文字和背景同色 | 截图 |',
      '| 6 | 用 `listBundles()` 拿 `enabled`/`entryId` | 拿不到（那是 `listPlugins()` 的） | 查 API 实际返回 |',
      '',
      '## 七、自测流程（别靠人拿手机点）',
      '',
      '```bash',
      'npm run build:host',
      '',
      '# 1. 产物能加载（抓 import 错误）',
      'node -e "import(\'./lib/index.js\').then(m => console.log(Object.keys(m)))"',
      '',
      '# 2. 重载插件（自己来，不用回 DSH 界面）',
      'MT=$(curl -sS -X POST "http://127.0.0.1:3091/dsh-plugin-panel/mobile/token" | python3 -c "import json,sys;print(json.load(sys.stdin)[\'token\'])")',
      'curl -sS -X POST "http://127.0.0.1:3091/dsh-plugin-panel/mobile/toggle?mt=$MT" \\',
      '  -H "content-type: application/json" -d \'{"name":"你的插件","enabled":false}\'',
      'sleep 2',
      'curl -sS -X POST ".../toggle?mt=$MT" -H "content-type: application/json" -d \'{"name":"你的插件","enabled":true}\'',
      '',
      '# 3. 验证页面（关键：查有没有「失败」文案）',
      'curl -sS "http://127.0.0.1:3091/<包名>/mobile?mt=$MT" | grep -o "读取[^<]*失败[^<]*" || echo "✓ 无错误"',
      '',
      '# 4. 截图（视口 393×852）',
      '```',
      '',
      '## 八、提交前检查清单',
      '',
      '- [ ] `dsh.mobile` 四个字段齐全，`path` 形如 `/<包名>/mobile`',
      '- [ ] 标题/简介读 `locale/*.json` 的 `meta.*`，不是拿包名顶替',
      '- [ ] `locale/en.json` 存在（官方入口），缺了整套 locale 不生效',
      '- [ ] `import { registerMobile } from \'./mobile.ts\'`（带 `.ts`）',
      '- [ ] `apply()` 里 `scope.effect(() => registerMobile(scope), \'...\')`',
      '- [ ] 媒体路由接受 `mt` token',
      '- [ ] 页面数据服务端直出，页面内无 `fetch` RPC',
      '- [ ] 模板/样式放独立文件',
      '- [ ] 跑过 `check-plugin-mobile.mjs`，0 错误',
      '- [ ] 截图看过',
      '',
      '## 九、起步模板',
      '',
      '插件自带一份最小可用的骨架，复制改名即可：',
      '',
      '```',
      'node_modules/dsh-plugin-panel/templates/mobile-plugin/',
      '```',
      '',
      '- `mobile.ts` — 路由 + token + 页面骨架（可直接跑起来）',
      '- `README.md` — 复制步骤、要改的三处名字、两条必须遵守的规则',
      '',
      '复制后用诊断脚本自查，0 错误再接真实数据。',
    ].join('\n')

    /** 三段场景规范；`id` 用于复制态的区分。 */
    const SPEC_SECTIONS = [
      { id: 'skeleton', title: '骨架与元信息', hint: '命名、目录、清单、locale、图标、关于页；已有插件按第八节对齐', text: SPEC_SKELETON },
      { id: 'visual', title: '视觉设计', hint: '颜色、焦点、边框、尺寸、图标、图表', text: SPEC_VISUAL },
      { id: 'mobile', title: '移动端接入', hint: '让插件在 DSH Pocket iOS 里能被打开：声明、路由、认证、渲染', text: SPEC_MOBILE },
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
    /** 语义化版本比较：返回 >0 表示 a 比 b 新。只处理 x.y.z 和预发布后缀。 */
    function compareVersion(a, b) {
      const norm = (v) => String(v || '').trim().replace(/^v/, '').split(/[.+-]/).slice(0, 3).map((n) => parseInt(n, 10) || 0)
      const x = norm(a)
      const y = norm(b)
      for (let i = 0; i < 3; i += 1) {
        if (x[i] !== y[i]) return x[i] - y[i]
      }
      return 0
    }

    function healthChip(title, diagnosis, copied, onCopy, t) {
      const level = diagnosis && diagnosis.level
      // 没问题就不显示任何标签——「健康」两个字本身是噪音
      if (!level || level === 'unknown' || level === 'ok') return null
      const items = (diagnosis.items || [])
      // 一律当建议看：数出所有待改项，不分「差」和「建议」两档
      const count = items.filter((i) => i.level === 'bad' || i.level === 'warn').length
      if (!count) return null
      return h('button', {
        type: 'button',
        className: `dsh-pl-health is-warn${copied ? ' is-copied' : ''}`,
        title: '点击复制体检结果，可直接发给 AI 修改',
        onClick: (event) => {
          event.stopPropagation()
          onCopy()
        },
      }, copied ? textOf(t, 'list.copied') : `${textOf(t, 'list.suggest')} ${count}`)
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



    /** One card shape, shared by the plugin list and the market ranking. */
    /** 置顶标记：一个图钉，和状态标并排，不再用左边线。 */
    function PinMark() {
      return h('svg', {
        className: 'dsh-pl-pin',
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 1.8,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        'aria-hidden': 'true',
      },
      h('path', { d: 'M9 4h6l-1.5 5.5L17 13H7l3.5-3.5L9 4z' }),
      h('path', { d: 'M12 13v7' }))
    }

    function PluginCard(options) {
      const { icon, title, subtitle, meta, actions, className, onClick, badge } = options
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
        subtitle ? h('span', { className: 'dsh-pl-where' }, subtitle) : null,
        meta && meta.length ? h('span', { className: 'dsh-pl-meta' }, meta.join(' · ')) : null),
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
      const [specTab, setSpecTab] = React.useState('skeleton')
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
      const [versionMap, setVersionMap] = React.useState({})
      const [scanDir, setScanDir] = React.useState(pref.current.scanDir || '')
      const [scanItems, setScanItems] = React.useState([])
      const [scanStatus, setScanStatus] = React.useState('')
      const [scanError, setScanError] = React.useState('')
      const [cardMenu, setCardMenu] = React.useState(null)
      const [selectedScan, setSelectedScan] = React.useState(null)
      const [remoteResult, setRemoteResult] = React.useState(null)
      const [remoteStatus, setRemoteStatus] = React.useState('')
      const [remoteAdded, setRemoteAdded] = React.useState(0)
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

      /** 自己有没有被自动更新过：有结果就在提示条上说一句，没有就安静。 */
      React.useEffect(() => {
        const call = props.loadSelfUpdate
        if (typeof call !== 'function') return
        let alive = true
        Promise.resolve(call({})).then((result) => {
          if (!alive) return
          const value = result && result.ok === true ? result.value : result
          if (!value || !value.note) return
          if (value.status === 'updated' || value.status === 'failed') setListNote(value.note)
        }).catch(() => {})
        return () => { alive = false }
      }, [props.loadSelfUpdate])

      /**
       * 查已装包有没有新版，只用官方接口：
       *
       * 1. `listBundles()` 的 `update` 字段已经告诉 DSH「这个包有可更新版本」，
       *    没有这个标记的包不查，省掉绝大多数请求。
       * 2. 对标记过的包调 `listVersions()`，它会校验 DSH 兼容性、bundle 声明和废弃标记。
       */
      React.useEffect(() => {
        const listOne = props.listVersions
        if (typeof listOne !== 'function') return
        const targets = bundles.filter((b) => b && b.installed !== false && b.update && typeof b.name === 'string' && b.name)
        if (!targets.length) {
          setVersionMap({})
          return
        }
        let alive = true
        Promise.all(targets.map((b) => Promise.resolve(listOne(b.name)).catch(() => null))).then((rows) => {
          if (!alive) return
          const map = {}
          rows.forEach((row, i) => {
            if (!row || row.status !== 'listed') return
            const bundle = targets[i]
            const current = row.installed || bundle.version || ''
            const newer = (row.versions || []).filter((v) => !v.incompatible && !v.deprecated && compareVersion(v.version, current) > 0)
            if (!newer.length) return
            map[bundle.name] = { version: newer[0].version, registry: row.registry || null }
          })
          setVersionMap(map)
        }).catch(() => {})
        return () => { alive = false }
      }, [bundles, props.listVersions])

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

      /**
       * 详情页内容的**唯一**来源：已装插件、市场行、扫描项都归一到这里。
       * 事实的顺序、动作按钮、文档位置由此决定，三个入口不会再长得不一样。
       */
      function detailEntry(input) {
        const { plugin = null, row = null, scan = null } = input || {}
        const installed = Boolean(plugin)
        const bundle = installed ? (selectedBundle || matchBundle(plugin, bundles)) : null
        const manifest = facts && facts.manifest
        const icon = installed
          ? safeIcon(plugin && plugin.meta && plugin.meta.icon)
          : safeIcon(row && row.icon)
        const title = installed
          ? pluginTitle(plugin, localeId)
          : scan ? (scan.title || scan.name) : (row && row.name) || ''

        const f = {}
        if (installed) {
          f.intro = resolveText(plugin.meta && plugin.meta.description, localeId)
            || (manifest && manifest.summary)
            || (bundle && bundle.description)
            || ''
          f.module = shortModule(plugin.moduleName)
          f.entry = plugin.entryId
          f.status = textOf(t, phaseKey(plugin))
          f.package = (manifest && manifest.name) || (bundle && bundle.name) || shortModule(plugin.moduleName)
          f.version = (manifest && manifest.version) || (bundle && bundle.version)
          f.place = bundle && bundle.availability === 'profile'
            ? textOf(t, 'list.placeProfile')
            : bundle && bundle.availability === 'installation' ? textOf(t, 'list.placeInstallation') : ''
          f.source = installSourceText(bundle, t)
          f.flags = [
            bundle && bundle.official ? textOf(t, 'list.official') : '',
            bundle && bundle.optional ? textOf(t, 'list.optional') : '',
            bundle ? (bundle.removable ? textOf(t, 'list.removable') : textOf(t, 'list.fixed')) : '',
          ].filter(Boolean).join(' · ')
          const bundleRows = bundle && Array.isArray(bundle.rows) ? bundle.rows : []
          const siblings = bundleRows
            .filter((item) => item && item.entryId !== plugin.entryId)
            .slice(0, 6)
            .map((item) => shortModule(item.moduleName) || item.rowId)
            .filter(Boolean)
          f.components = bundleRows.length
            ? `${bundleRows.length}${siblings.length ? ` · ${siblings.join('、')}${bundleRows.length > 7 ? '…' : ''}` : ''}`
            : ''
          f.license = manifest && manifest.license
          f.size = facts && facts.size ? formatSize(facts.size.bytes, facts.size.files, t) : ''
          f.repo = repoLinkOf(manifest && manifest.repository)
          f.engines = manifest && manifest.engines
          f.keywords = manifest && Array.isArray(manifest.keywords) ? manifest.keywords.join('、') : ''
          f.inject = manifest && Array.isArray(manifest.clientInject) ? manifest.clientInject.join('、') : ''
        } else if (scan) {
          f.intro = scan.description || ''
          f.status = textOf(t, scan.state === 'active' ? 'list.stateActive'
            : scan.state === 'disabled' ? 'list.stateDisabled'
            : scan.state === 'failed' ? 'list.stateFailed'
            : scan.installed ? 'list.stateInactive' : 'list.notInstalled')
          f.package = scan.name
          f.version = scan.version
          f.path = scan.folder
          f.source = bundle ? installSourceText(bundle, t) : textOf(t, 'list.localPath')
        } else if (row) {
          f.intro = row.summary || ''
          f.status = textOf(t, isInstalled(row.name) ? 'list.installedState' : 'list.notInstalled')
          f.package = row.name
          f.version = row.version
          f.stars = typeof row.stars === 'number' ? row.stars.toLocaleString() : ''
          f.delta = typeof row.delta === 'number' ? `+${row.delta.toLocaleString()}` : ''
          f.category = row.categoryZh || row.category || ''
          f.repo = row.repo ? repoLinkOf(row.repo) : ''
          f.license = row.license || ''
          f.size = row.unpackedSize ? formatSize(row.unpackedSize, row.fileCount, t) : ''
          f.source = row.remote ? textOf(t, 'list.remoteSource') : ''
        }

        const order = ['intro', 'module', 'entry', 'status', 'package', 'version', 'place', 'path',
          'source', 'flags', 'components', 'license', 'size', 'repo', 'engines', 'keywords', 'inject',
          'stars', 'delta', 'category']
        const labelKeys = {
          intro: 'list.intro', module: 'list.module', entry: 'list.entry', status: 'list.status',
          package: 'list.package', version: 'list.version', place: 'list.place', path: 'list.path',
          source: 'list.source', flags: 'list.flags', components: 'list.components',
          license: 'list.license', size: 'list.size', repo: 'list.repo', engines: 'list.engines',
          keywords: 'list.keywords', inject: 'list.inject', stars: 'list.hotStars',
          delta: 'list.hotDelta', category: 'list.hotCategory',
        }
        const detailFacts = order
          .map((key) => ({ label: textOf(t, labelKeys[key]), value: f[key] }))
          .filter((item) => item.value)

        const button = (key, label, onClick) => h('button', { key, type: 'button', onClick }, label)
        const actions = []
        const openKind = installed ? tabKindFor(plugin, guide, localeId) : null
        if (openKind && typeof openPanel === 'function') {
          actions.push(button('open', textOf(t, 'list.open'), () => openPanel(openKind)))
        }
        if (typeof props.revealPackage === 'function') {
          actions.push(button('reveal', textOf(t, 'list.reveal'), () => {
            setRevealNote('')
            const source = (bundle && bundle.source) || (scan ? `link:${scan.folder}` : '')
            Promise.resolve(props.revealPackage({ moduleName: plugin ? (plugin.moduleName || '') : (scan ? scan.name : ''), source }))
              .then((result) => {
                if (result && result.ok === false) setRevealNote(revealHint(result.error && result.error.message))
              })
              .catch((failure) => setRevealNote(revealHint(failure instanceof Error ? failure.message : '')))
          }))
        }
        if (installed && plugin.patchId && plugin.readOnlyReason == null && setPluginEnabled) {
          actions.push(button('toggle', textOf(t, plugin.enabled ? 'list.disable' : 'list.enable'), () => {
            void toggleInstalled(plugin, plugin.enabled !== true)
          }))
        }
        if (installed) {
          actions.push(button('pin', textOf(t, pins.includes(plugin.entryId) ? 'list.unpin' : 'list.pin'), () => togglePin(plugin.entryId)))
        }
        if (!installed && row) {
          actions.push(button('install', textOf(t, 'list.install'), () => { void installFromMarket(row.name) }))
        }
        if (!installed && scan) {
          actions.push(button('install', textOf(t, 'list.installFromLocal'), () => { void installFromPath(scan) }))
        }
        if (revealNote) actions.push(h('span', { key: 'note', className: 'dsh-pl-note' }, revealNote))
        if (installed && plugin.readOnlyReason) {
          actions.push(h('span', { key: 'locked', className: 'dsh-pl-note' }, String(plugin.readOnlyReason)))
        }

        const doc = installed
          ? h('section', { className: 'dsh-pl-doc-block' },
            h('div', { className: 'dsh-pl-fact-label' }, textOf(t, 'list.doc')),
            readmeStatus === 'loading'
              ? h('p', null, textOf(t, 'list.docLoading'))
              : (readme || (facts && facts.document))
                ? markdownView(readme || facts.document)
                : h('p', null, textOf(t, 'list.docEmpty')))
          : null

        return {
          icon,
          title,
          facts: detailFacts,
          tags: row && Array.isArray(row.keywords) ? row.keywords : null,
          note: row ? (row.summary || '') : '',
          actions,
          doc,
          onClose: () => {
            setSelectedId('')
            setSelectedMarket(null)
            setSelectedScan(null)
          },
        }
      }

      /** 详情：一个组件，三个入口共用。 */
      function pluginDetail(input) {
        const entry = detailEntry(input)
        return h(DetailPanel, {
          icon: entry.icon ? h('img', { src: entry.icon, alt: '' }) : null,
          title: entry.title,
          closeLabel: textOf(t, 'list.close'),
          onClose: entry.onClose,
          facts: entry.facts,
          tags: entry.tags,
          tagLabel: textOf(t, 'list.tags'),
          note: entry.note,
          actions: entry.actions,
          children: entry.doc,
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
            h('div', { className: 'dsh-pl-head-right' },
              hot && hot.fromDay
                ? h('span', null, rows.length === shown.length ? `${hot.fromDay} → ${hot.toDay}` : `${shown.length} / ${rows.length}`)
                : null,
              viewToggle())),
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
                  shown.map((row) => marketCard(row))))
      }

      const searchTimer = React.useRef(null)

      const remoteSeq = React.useRef(0)

      /** 本地索引没命中时，去 npm 实时查一次。 */
      const runRemoteSearch = React.useCallback((query) => {
        const call = props.searchRemote
        const needle = String(query || '').trim()
        if (typeof call !== 'function' || !needle) {
          setRemoteResult(null)
          setRemoteStatus('')
          return
        }
        const seq = ++remoteSeq.current
        setRemoteResult(null)
        setRemoteStatus('loading')
        Promise.resolve(call({ query: needle })).then((result) => {
          if (seq !== remoteSeq.current) return
          if (result && result.ok === false) {
            setRemoteStatus('error')
            return
          }
          const value = result && result.ok === true ? result.value : result
          setRemoteResult(value && Array.isArray(value.items) ? value.items : [])
          setRemoteAdded(Number(value && value.added) || 0)
          setRemoteStatus('ready')
        }).catch(() => {
          if (seq === remoteSeq.current) setRemoteStatus('error')
        })
      }, [props.searchRemote])

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
          const hits = value && Array.isArray(value.items) ? value.items : []
          if (hits.length === 0 && query.trim()) runRemoteSearch(query)
          else { setRemoteResult(null); setRemoteStatus('') }
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


      function shareText() {
        return [
          '请帮我在 DeepSeek Harness 上安装插件 dsh-plugin-panel（中文名「插件管理」）。',
          '',
          '它是右侧栏的插件管理器：列出已安装插件并标出入口，带插件市场（增长趋势、7 天增长榜、中文搜索、一键装卸）、精选推荐，以及给插件开发者的设计规范。',
          '',
          '请按顺序做，每步做完告诉我结果：',
          '',
          '1. 确认当前 DSH 的 profile 名称（一般看 ~/.dsh/profiles/ 下哪个是你在用的）。',
          '2. 安装：dsh plugin --profile <你的 profile> add dsh-plugin-panel',
          '   如果 npm 上取不到这个包，说明还没发布，请直接告诉我，别自己改写依赖或去装同名的其它包。',
          '3. 装完提醒我重启 DeepSeek Harness，然后打开右侧栏确认「插件管理」出现。',
          '',
          '如果已经装过、需要升级到最新版：',
          '',
          '- 用同一条命令再加一次即可：dsh plugin --profile <你的 profile> add dsh-plugin-panel',
          '  它会把已装的替换成 npm 上的最新版本，不需要先卸载。',
          '- 不要指定具体版本号，直接装最新版；想知道最新是多少可以 npm view dsh-plugin-panel version。',
          '- 升级完同样要重启 DeepSeek Harness 才会生效。',
          '',
          '版本以 npm 上发布的最新版为准，不需要我提供版本号。',
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

      /** 装新版本：走 DSH 的 updateBundle，成功后重新读列表。 */
      async function runUpdate(bundle, info) {
        const call = props.updateBundle
        if (typeof call !== 'function') {
          setActionNote(textOf(t, 'list.updateUnavailable'))
          return
        }
        if (busyKey) return
        setBusyKey(bundle.name)
        setActionNote('')
        try {
          const options = info && info.registry ? { registry: info.registry } : {}
          const answer = await call(bundle.name, info.version, options)
          // PluginUpdateResult: { step, result: ChangeResult, restore? }
          const change = answer && answer.result
          if (change && change.application === 'failed') {
            const error = change.error || {}
            setFailedKey(bundle.name)
            setActionNote(`${textOf(t, 'list.updateFailed')}：${error.code || error.diagnostic || 'unknown'}`)
            return
          }
          if (answer && answer.step === 'check') {
            // 停在检查步骤，说明版本没被接受
            setFailedKey(bundle.name)
            setActionNote(textOf(t, 'list.updateRejected').replace('{v}', info.version))
            return
          }
          showToast(textOf(t, 'list.updateDone').replace('{name}', bundle.name).replace('{v}', info.version))
          setTimeout(() => { void load() }, 600)
        } catch (failure) {
          setFailedKey(bundle.name)
          setActionNote(`${textOf(t, 'list.updateFailed')}：${failure instanceof Error ? failure.message : 'unknown'}`)
        } finally {
          setBusyKey('')
        }
      }

      /** 扫一个目录，列出现在装着和没装着的插件。 */
      const runScan = React.useCallback((dir) => {
        const call = props.scanPlugins
        if (typeof call !== 'function') return
        const target = String(dir || '').trim()
        if (!target) {
          setScanStatus('error')
          setScanError(textOf(t, 'list.scanNeedDir'))
          return
        }
        setScanStatus('loading')
        setScanError('')
        Promise.resolve(call({ dir: target })).then((result) => {
          if (result && result.ok === false) {
            setScanStatus('error')
            setScanError(textOf(t, 'list.scanFailed'))
            return
          }
          const value = result && result.ok === true ? result.value : result
          setScanItems(value && Array.isArray(value.items) ? value.items : [])
          setScanError((value && value.error) || '')
          setScanStatus('ready')
        }).catch((failure) => {
          setScanStatus('error')
          setScanError(failure instanceof Error ? failure.message : textOf(t, 'list.scanFailed'))
        })
      }, [props.scanPlugins])

      // 进到「本地扫描」时，如果记着目录就自动扫一次，不用每次手点
      React.useEffect(() => {
        if (filter !== 'scan') return
        const saved = String(pref.current.scanDir || '').trim()
        if (!saved) return
        if (scanStatus === 'ready' || scanStatus === 'loading') return
        void runScan(saved)
      }, [filter, scanStatus, runScan])

      /** 从本地路径装一个还没装的插件（spec 就是绝对路径）。 */
      async function installFromPath(item) {
        if (typeof props.installBundle !== 'function' || busyKey) return
        setBusyKey(item.folder)
        try {
          const result = await props.installBundle(String(item.folder), {})
          if (result && result.ok === false) {
            const error = result.error || {}
            setFailedKey(item.folder)
            setActionNote(`${textOf(t, 'list.installFailed')}：${error.message || error.code || 'unknown'}`)
            return
          }
          setActionNote('')
          showToast(textOf(t, 'list.scanInstalled').replace('{name}', item.name))
          setTimeout(() => { void runScan(scanDir) }, 600)
        } catch (failure) {
          setFailedKey(item.folder)
          setActionNote(`${textOf(t, 'list.installFailed')}：${failure instanceof Error ? failure.message : 'unknown'}`)
        } finally {
          setBusyKey('')
        }
      }

      /** 启停一个插件：优先用条目级接口，条目不可控时退回 bundle 级。 */
      async function toggleScanned(item, nextEnabled) {
        if (busyKey) return
        setBusyKey(item.folder)
        setActionNote('')
        try {
          let result = null
          if (item.canToggle && item.entryId && typeof props.setPluginEnabled === 'function') {
            result = await props.setPluginEnabled(item.entryId, nextEnabled)
          } else if (typeof props.setBundleEnabled === 'function') {
            // 只读条目（management-required / unaddressable）也能用 bundle 层开关，
            // 这是官方给的另一条路，不是自己改 profile
            result = await props.setBundleEnabled(item.name, nextEnabled)
          } else {
            setActionNote(textOf(t, 'list.toggleUnavailable'))
            return
          }
          if (result && result.ok === false) {
            const error = result.error || {}
            setActionNote(`${textOf(t, 'list.toggleFailed')}：${error.message || error.code || 'unknown'}`)
            return
          }
          const value = result && result.ok === true ? result.value : result
          if (value && value.application === 'failed') {
            const error = value.error || {}
            setActionNote(`${textOf(t, 'list.toggleFailed')}：${error.code || 'unknown'}`)
            return
          }
          showToast(textOf(t, nextEnabled ? 'list.toggleOn' : 'list.toggleOff').replace('{name}', item.title || item.name))
          setTimeout(() => { void runScan(scanDir) }, 800)
        } catch (failure) {
          setActionNote(`${textOf(t, 'list.toggleFailed')}：${failure instanceof Error ? failure.message : 'unknown'}`)
        } finally {
          setBusyKey('')
        }
      }

      /** 本地扫描：输入一个目录，列出下面所有插件，标出装没装。 */
      function scanView() {
        const items = Array.isArray(scanItems) ? scanItems : []
        return h('div', { className: 'dsh-pl-surface' },
          h('div', { className: 'dsh-pl-scan-bar' },
            h('input', {
              type: 'text',
              className: 'dsh-pl-search',
              value: scanDir,
              placeholder: textOf(t, 'list.scanPlaceholder'),
              onChange: (event) => {
                const value = event.target.value
                setScanDir(value)
                remember({ scanDir: value })
              },
              onKeyDown: (event) => {
                if (event.key === 'Enter') void runScan(scanDir)
              },
            }),
            h('button', {
              type: 'button',
              className: 'dsh-pl-card-btn',
              disabled: scanStatus === 'loading',
              onClick: () => { void runScan(scanDir) },
            }, scanStatus === 'loading' ? textOf(t, 'list.scanning') : textOf(t, 'list.scanButton'))),
          h('p', { className: 'dsh-pl-note' }, textOf(t, 'list.scanHint')),
          h('p', { className: 'dsh-pl-note' }, textOf(t, 'list.scanStateHint')),
          scanStatus === 'loading'
            ? h('p', { className: 'dsh-pl-state' }, textOf(t, 'list.scanning'))
            : scanError
              ? h('p', { className: 'dsh-pl-state' }, scanError)
              : scanStatus === 'ready' && items.length === 0
                ? h('p', { className: 'dsh-pl-state' }, textOf(t, 'list.scanEmpty'))
                : items.length === 0
                  ? h('p', { className: 'dsh-pl-state' }, textOf(t, 'list.scanIdle'))
                  : h('div', { className: `dsh-pl-grid${view === 'card' ? ' is-card' : ''}` },
                    items.map((item) => {
                      const plugin = plugins.find((p) => p.moduleName === item.name || p.patchId === item.name)
                      return unifiedCard(cardEntry({ scan: item, plugin }))
                    })))
      }

      /** 打开某张卡片的操作菜单；位置贴着触发按钮，超出视口就往上翻。 */
      function openCardMenu(event, title, items) {
        event.stopPropagation()
        const rect = event.currentTarget.getBoundingClientRect()
        const width = 210
        const height = Math.min(320, 44 + items.length * 34)
        const left = Math.max(8, Math.min(rect.right - width, window.innerWidth - width - 8))
        const below = rect.bottom + 6
        const top = below + height > window.innerHeight - 8 ? Math.max(8, rect.top - height - 6) : below
        setCardMenu({ title, items, left, top })
      }

      function closeCardMenu() {
        setCardMenu(null)
      }

      /**
       * 一张卡片的操作项。五个页面共用同一份，能力不会各处不一样：
       * 启用/停用、更新、置顶、卸载、打开、打开所在位置、安装、体检报告。
       */
      function buildCardMenu(entry) {
        const items = []
        const { plugin, bundle, scan, name, installed, state } = entry

        // 卡片封面点一下是「打开插件」，所以详情入口放在菜单里
        if (plugin) {
          items.push({
            key: 'detail',
            label: textOf(t, 'list.viewDetail'),
            onClick: () => {
              setSelectedMarket(null)
              setSelectedScan(null)
              setSelectedId(plugin.entryId)
            },
          })
        } else if (scan) {
          items.push({
            key: 'detail',
            label: textOf(t, 'list.viewDetail'),
            onClick: () => {
              setSelectedId('')
              setSelectedMarket(null)
              setSelectedScan(scan)
            },
          })
        }

        if (!installed) {
          items.push({
            key: 'install',
            label: scan ? textOf(t, 'list.installFromLocal') : textOf(t, 'list.install'),
            onClick: () => {
              if (scan) void installFromPath(scan)
              else void installFromMarket(name)
            },
          })
        } else {
          const running = state === 'active' || state === 'failed'
          items.push({
            key: 'toggle',
            label: textOf(t, running ? 'list.disable' : 'list.enable'),
            onClick: () => {
              if (scan) void toggleScanned(scan, !running)
              else void toggleInstalled(plugin, !running)
            },
          })

          const info = bundle ? versionMap[bundle.name] : null
          if (bundle && info && bundle.version && compareVersion(info.version, bundle.version) > 0) {
            items.push({
              key: 'update',
              label: `${textOf(t, 'list.updateTo')} ${info.version}`,
              onClick: () => { void runUpdate(bundle, info) },
            })
          }

          if (plugin) {
            const pinned = pins.includes(plugin.entryId)
            items.push({
              key: 'pin',
              label: textOf(t, pinned ? 'list.unpin' : 'list.pin'),
              onClick: () => togglePin(plugin.entryId),
            })
          }

          if (bundle && bundle.removable && plugin) {
            items.push({
              key: 'remove',
              label: textOf(t, 'list.remove'),
              danger: true,
              onClick: () => { void removePlugin(plugin, bundle) },
            })
          }

          const kind = plugin ? tabKindFor(plugin, guide, localeId) : null
          if (kind) {
            items.push({
              key: 'open',
              label: textOf(t, 'list.open'),
              onClick: () => { if (typeof openPanel === 'function') openPanel(kind) },
            })
          }
        }

        if (plugin) {
          items.push({
            key: 'reveal',
            label: textOf(t, 'list.reveal'),
            onClick: () => {
              if (typeof props.revealPackage !== 'function') return
              const source = bundle && bundle.source ? bundle.source : scan ? `link:${scan.folder}` : ''
              void props.revealPackage({ moduleName: plugin.moduleName || name || '', source })
            },
          })
        } else if (scan) {
          items.push({
            key: 'reveal',
            label: textOf(t, 'list.reveal'),
            onClick: () => {
              if (typeof props.revealPackage !== 'function') return
              void props.revealPackage({ moduleName: scan.name || '', source: `link:${scan.folder}` })
            },
          })
        }

        const diagnosis = plugin ? diagnoses[plugin.entryId] : null
        const issues = diagnosis && diagnosis.level && diagnosis.level !== 'ok' && diagnosis.level !== 'unknown'
          ? (diagnosis.items || []).filter((item) => item.level === 'bad' || item.level === 'warn').length
          : 0
        if (issues > 0) {
          items.push({
            key: 'health',
            label: `${textOf(t, 'list.suggest')} ${issues}（${textOf(t, 'list.healthCopy')}）`,
            onClick: () => { if (plugin) void copyDiagnosis(plugin, entry.title, diagnosis) },
          })
        }

        return items
      }

      /**
       * 卡片内容的**唯一**来源。
       *
       * 四个视图只负责把「这一行是什么」传进来：`{ plugin }`、`{ row }`、`{ scan }`、`{ curated }`。
       * 标题怎么写、副标题放什么、meta 有哪几段、状态标用哪个词，全部在这里决定。
       * 以后要改卡片显示，只改这个函数，视图不用动。
       */
      function cardEntry(input) {
        const { plugin = null, row = null, scan = null, curated = null } = input || {}
        const bundle = plugin ? matchBundle(plugin, bundles) : null
        const installed = Boolean(plugin)
        const state = installed ? pluginStateOf(plugin) : 'missing'

        const iconUrl = installed
          ? safeIcon(plugin.meta && plugin.meta.icon)
          : safeIcon(row && row.icon)
        const places = installed
          ? placesFor(plugin, guide, seats, localeId)
            .map((place) => textOf(t, place === 'right' ? 'list.placeRight' : place === 'settings' ? 'list.placeSettings' : 'list.placeLeft'))
            .join(' · ') || textOf(t, 'list.placeNone')
          : ''

        let name = ''
        let title = ''
        let subtitle = ''
        if (installed) {
          name = String(plugin.moduleName || '')
          title = pluginTitle(plugin, localeId)
          subtitle = resolveText(plugin.meta && plugin.meta.description, localeId)
        } else if (curated) {
          name = curated.name
          title = curated.title
          subtitle = curated.reason || ''
        } else if (scan) {
          name = scan.name
          title = scan.title || scan.name
          subtitle = scan.folder
        } else if (row) {
          name = row.name
          title = row.name
          subtitle = row.summary || row.categoryZh || row.category || ''
        }

        const meta = []
        if (scan) {
          if (scan.version) meta.push(`v${scan.version}`)
          if (places) meta.push(places)
          if (bundle) meta.push(installSourceText(bundle, t))
        } else if (installed) {
          if (bundle && bundle.version) meta.push(`v${bundle.version}`)
          if (places) meta.push(places)
        } else if (row) {
          if (row.version) meta.push(`v${row.version}`)
          if (typeof row.stars === 'number' && row.stars > 0) meta.push(`★ ${compactNumber(row.stars)}`)
          const ago = relativeDay(row.publishedAt || row.date || '')
          if (ago) meta.push(ago)
          if (typeof row.delta === 'number' && row.delta > 0) meta.push(`+${compactNumber(row.delta)}`)
        }

        const tag = installed
          ? textOf(t, state === 'failed' ? 'list.tagFailed' : state === 'disabled' ? 'list.tagDisabled' : 'list.tagEnabled')
          : (scan && state !== 'missing'
            ? textOf(t, state === 'active' ? 'list.stateActive'
              : state === 'disabled' ? 'list.stateDisabled'
              : state === 'failed' ? 'list.stateFailed'
              : 'list.stateInactive')
            : textOf(t, 'list.notInstalled'))
        const tagClass = state === 'failed' ? 'is-failed' : state === 'disabled' ? 'is-off' : ''

        let onClick
        if (installed) {
          onClick = () => {
            const kind = tabKindFor(plugin, guide, localeId)
            if (kind && typeof openPanel === 'function') openPanel(kind)
            else setSelectedId(plugin.entryId)
          }
        }
        else if (curated) onClick = () => setSelectedMarket({ name: curated.name, title: curated.title, summary: curated.reason, remote: true })
        else if (row) onClick = () => setSelectedMarket(row)
        else if (scan) onClick = () => setSelectedScan(scan)

        return {
          key: installed ? plugin.entryId : (scan ? scan.folder : name),
          iconUrl,
          title,
          subtitle,
          meta,
          tag,
          tagClass,
          className: installed && selectedId === plugin.entryId ? 'is-on' : '',
          pinned: Boolean(installed && pins.includes(plugin.entryId)),
          onClick,
          plugin,
          bundle,
          scan,
          name,
          installed,
          state,
        }
      }

      /** 统一卡片：面上只有图标、名字、副标题、状态和「操作」，其余都进菜单。 */
      function unifiedCard(entry) {
        const items = buildCardMenu(entry)
        return h(PluginCard, {
          key: entry.key,
          icon: entry.iconUrl ? h('img', { src: entry.iconUrl, alt: '', draggable: false }) : null,
          title: entry.title,
          subtitle: entry.subtitle || '',
          meta: entry.meta || null,
          className: entry.className || '',
          badge: h('span', { className: 'dsh-pl-badges' },
            entry.pinned ? h(PinMark, { key: 'pin' }) : null,
            entry.tag
              ? h('span', { className: `dsh-pl-local-tag${entry.tagClass ? ' ' + entry.tagClass : ''}` }, entry.tag)
              : null),
          onClick: entry.onClick,
          actions: [
            h('button', {
              key: 'menu',
              type: 'button',
              className: 'dsh-pl-card-btn',
              onClick: (event) => openCardMenu(event, entry.title, items),
            }, textOf(t, 'list.actions')),
          ],
        })
      }

      /** 已装插件的启停：条目级优先，只读时退回 bundle 级。 */
      async function toggleInstalled(plugin, nextEnabled) {
        if (!plugin || busyKey) return
        setBusyKey(plugin.entryId)
        try {
          let result = null
          if (plugin.patchId && plugin.readOnlyReason == null && typeof props.setPluginEnabled === 'function') {
            result = await props.setPluginEnabled(plugin.entryId, nextEnabled)
          } else {
            const bundle = matchBundle(plugin, bundles)
            if (bundle && typeof props.setBundleEnabled === 'function') {
              result = await props.setBundleEnabled(bundle.name, nextEnabled)
            }
          }
          if (!result) { setActionNote(textOf(t, 'list.toggleUnavailable')); return }
          if (result.ok === false || (result.value && result.value.application === 'failed')) {
            const error = (result.ok === false ? result.error : result.value.error) || {}
            setActionNote(`${textOf(t, 'list.toggleFailed')}：${error.message || error.code || 'unknown'}`)
            return
          }
          showToast(textOf(t, nextEnabled ? 'list.toggleOn' : 'list.toggleOff').replace('{name}', pluginTitle(plugin, localeId)))
          setTimeout(() => { void load() }, 600)
        } catch (failure) {
          setActionNote(`${textOf(t, 'list.toggleFailed')}：${failure instanceof Error ? failure.message : 'unknown'}`)
        } finally {
          setBusyKey('')
        }
      }

      /** 列表 / 卡片切换：放在各个 tab 内部，而不是顶部全局。 */
      function viewToggle() {
        return h('div', { className: 'dsh-pl-view', role: 'group', 'aria-label': 'view' },
          chip('list', textOf(t, 'list.viewList'), view, (id) => { setView(id); remember({ layout: id }) }),
          chip('card', textOf(t, 'list.viewCard'), view, (id) => { setView(id); remember({ layout: id }) }))
      }

      function designView() {
        const section = SPEC_SECTIONS.find((s) => s.id === specTab) || SPEC_SECTIONS[0]
        return h('div', { className: 'dsh-pl-surface' },
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
              h('div', { className: 'dsh-pl-spec-tools' },
                h('button', {
                  type: 'button',
                  className: 'dsh-pl-copy-spec',
                  onClick: () => { void copySpec(section) },
                }, copiedKey === `spec-${section.id}` ? textOf(t, 'list.copied') : textOf(t, 'list.designCopy')),
                h('button', {
                  type: 'button',
                  className: 'dsh-pl-copy-spec is-primary',
                  title: textOf(t, 'list.designCopyAllHint'),
                  onClick: () => { void copyAllSpec() },
                }, copiedKey === 'spec-all' ? textOf(t, 'list.copied') : textOf(t, 'list.designCopyAll')))),
            h('p', { className: 'dsh-pl-spec-hint' }, section.hint),
            h('div', { className: 'dsh-pl-spec-body' }, markdownView(section.text))))
      }

      /** 写剪贴板：优先异步 API，老 WebView 退回 textarea。 */
      async function writeClipboard(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text)
          return
        }
        const area = document.createElement('textarea')
        area.value = text
        area.style.position = 'fixed'
        area.style.opacity = '0'
        document.body.appendChild(area)
        area.select()
        document.execCommand('copy')
        document.body.removeChild(area)
      }

      async function copySpec(section) {
        try {
          await writeClipboard(section.text)
          setCopiedKey(`spec-${section.id}`)
          showToast(textOf(t, 'list.designCopied').replace('{name}', section.title))
          setTimeout(() => setCopiedKey(''), 2200)
        } catch (failure) {
          setListNote(`${textOf(t, 'list.copyFailed')}：${failure instanceof Error ? failure.message : 'unknown'}`)
        }
      }

      /** 复制整份设计规范：三部分拼成一份 Markdown，直接粘给 AI。 */
      async function copyAllSpec() {
        try {
          const text = [
            '# DSH 插件设计规范',
            '',
            '> 三个场景：骨架与元信息、视觉设计、移动端接入。按需取用，不用全读。',
            '',
            DESIGN_SPEC,
            '',
          ].join('\n')
          await writeClipboard(text)
          setCopiedKey('spec-all')
          showToast(textOf(t, 'list.designCopiedAll'))
          setTimeout(() => setCopiedKey(''), 2200)
        } catch (failure) {
          setListNote(`${textOf(t, 'list.copyFailed')}：${failure instanceof Error ? failure.message : 'unknown'}`)
        }
      }

      /**
       * 精选推荐：和「已安装插件」共用一套卡片、视图切换和详情。
       *
       * 不加任何「精选专用」样式——卡片就是普通插件卡；
       * 点卡片时，装了的进已安装那套详情，没装的进市场那套详情。
       * 推荐理由只在详情里出现，不塞进卡片副标题（否则卡片排版和已安装的不一致）。
       */
      /**
       * 市场 / 榜单里的一张卡。
       *
       * 规则和「已安装插件」一致：装了的显示中文名、图标、入口位置，点开进已安装详情；
       * 没装的显示包名和简介，点开进市场详情。这样四个地方（已安装、精选、榜单、搜索）
       * 的卡片长得一样、点起来也一样。
       */
      function marketCard(row) {
        return unifiedCard(cardEntry({ row }))
      }

      function featuredView() {
        // 用和「已安装插件」一样的外壳：页面本身不加内边距，只由网格和子标签各留 12px，
        // 否则两边合起来变成 24px，卡片会明显往中间缩
        return h('div', { className: 'dsh-pl-surface' },
          h('div', { className: 'dsh-pl-subtabs' },
            h('strong', { className: 'dsh-pl-section-title' }, textOf(t, 'list.featuredTitle')),
            viewToggle()),
          h('div', { className: `dsh-pl-grid${view === 'card' ? ' is-card' : ''}` },
            CURATED.map((item) => {
              const plugin = plugins.find((p) => p.moduleName === item.name || p.patchId === item.name)
              return unifiedCard(cardEntry(plugin ? { plugin } : { curated: item }))
            })),
          h('p', { className: 'dsh-pl-note dsh-pl-featured-foot' }, textOf(t, 'list.featuredContact')))
      }

      /** 「关于」页：这个插件是什么、每个页签干什么、怎么分享给别人。 */
      function aboutView() {
        const profileDir = '~/.dsh/profiles/<profile>/.plugin-panel'
        const facts = [
          [textOf(t, 'list.aboutPackage'), 'dsh-plugin-panel'],
          [textOf(t, 'list.aboutVersion'), VERSION],
          [textOf(t, 'list.aboutLicense'), 'MIT'],
          [textOf(t, 'list.aboutRepo'), 'github.com/jqlong17/dsh-plugin-panel'],
          [textOf(t, 'list.aboutData'), profileDir],
        ]
        const tabRows = [
          ['list.aboutTabPlugins', 'list.aboutTabPluginsBody'],
          ['list.aboutTabMarket', 'list.aboutTabMarketBody'],
          ['list.aboutTabFeatured', 'list.aboutTabFeaturedBody'],
          ['list.aboutTabDesign', 'list.aboutTabDesignBody'],
        ]
        return h('div', { className: 'dsh-pl-surface' },
          h('section', { className: 'dsh-pl-about' },
            h('h3', { className: 'dsh-pl-about-h' }, textOf(t, 'list.aboutWhat')),
            h('p', { className: 'dsh-pl-about-p' }, textOf(t, 'list.aboutWhatBody1')),
            h('p', { className: 'dsh-pl-about-p' }, textOf(t, 'list.aboutWhatBody2'))),
          h('section', { className: 'dsh-pl-about' },
            h('h3', { className: 'dsh-pl-about-h' }, textOf(t, 'list.aboutTabs')),
            h('div', { className: 'dsh-pl-about-tabs' },
              tabRows.map(([name, body]) => h('div', { className: 'dsh-pl-about-tab', key: name },
                h('span', { className: 'dsh-pl-about-tab-name' }, textOf(t, name)),
                h('span', { className: 'dsh-pl-about-tab-body' }, textOf(t, body)))))),
          h('section', { className: 'dsh-pl-about' },
            h('h3', { className: 'dsh-pl-about-h' }, textOf(t, 'list.aboutAuto')),
            h('p', { className: 'dsh-pl-about-p' }, textOf(t, 'list.aboutAutoBody'))),
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

      function marketDetail(row) {
        return pluginDetail({ row })
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
          return h('div', { className: 'dsh-pl-surface' },
            searchBox,
            searchStatus === 'loading'
              ? h('p', { className: 'dsh-pl-state' }, textOf(t, 'list.marketSearching'))
              : searchStatus === 'error'
                ? h('p', { className: 'dsh-pl-state' }, textOf(t, 'list.searchError'))
                : items.length === 0
                  ? h('div', null,
                    h('p', { className: 'dsh-pl-state' }, textOf(t, 'list.marketNoMatch')),
                    remoteStatus === 'loading'
                      ? h('p', { className: 'dsh-pl-state' }, textOf(t, 'list.remoteSearching'))
                      : remoteStatus === 'error'
                        ? h('p', { className: 'dsh-pl-state' }, textOf(t, 'list.remoteError'))
                        : remoteStatus === 'ready' && remoteResult && remoteResult.length
                          ? h('section', { className: 'dsh-pl-block' },
                            h('div', { className: 'dsh-pl-block-head' },
                              h('strong', null, textOf(t, 'list.remoteHits').replace('{n}', String(remoteResult.length)))),
                            h('p', { className: 'dsh-pl-note' }, textOf(t, 'list.remoteHint')),
                            remoteAdded > 0
                              ? h('p', { className: 'dsh-pl-note' }, textOf(t, 'list.remoteSaved').replace('{n}', String(remoteAdded)))
                              : null,
                            h('div', { className: `dsh-pl-grid${view === 'card' ? ' is-card' : ''}` },
                              remoteResult.map((row) => {
                                const card = marketCard(row)
                                // 远程结果点开时顺带补全元信息（体积、许可、仓库）
                                const original = card.p.onClick
                                card.p.onClick = () => {
                                  original()
                                  if (typeof props.remoteDetail !== 'function') return
                                  Promise.resolve(props.remoteDetail({ name: row.name })).then((result) => {
                                    const value = result && result.ok === true ? result.value : result
                                    if (!value || !value.name) return
                                    setSelectedMarket((prev) => (prev && prev.name === value.name ? { ...prev, ...value } : prev))
                                  }).catch(() => {})
                                }
                                return card
                              })))
                          : remoteStatus === 'ready'
                            ? h('p', { className: 'dsh-pl-state' }, textOf(t, 'list.remoteEmpty'))
                            : null)
                  : h('div', null,
                    h('div', { className: 'dsh-pl-block-head' },
                      h('strong', null, textOf(t, 'list.marketHits').replace('{n}', String(searchMeta ? searchMeta.total : items.length).replace(/\B(?=(\d{3})+(?!\d))/g, ','))),
                      h('div', { className: 'dsh-pl-seg', role: 'group', 'aria-label': 'sort' },
                        chip('hot', textOf(t, 'list.sortHot'), searchSort, (id) => { setSearchSort(id); setSearchPage(0); runMarketSearch(marketQuery, id, marketCategory, 0) }),
                        chip('new', textOf(t, 'list.sortNew'), searchSort, (id) => { setSearchSort(id); setSearchPage(0); runMarketSearch(marketQuery, id, marketCategory, 0) })),
                      viewToggle()),
                    h('div', { className: `dsh-pl-grid${view === 'card' ? ' is-card' : ''}` },
                      items.map((row) => marketCard(row)))),
                    pager)
        }
        return h('div', { className: 'dsh-pl-surface' },
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
                      stat(textOf(t, 'list.countFiltered'), (last.rejected || 0).toLocaleString(), textOf(t, 'list.countFilteredHint')),
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

      function stat(label, value, hint) {
        return h('div', { className: 'dsh-pl-stat', title: hint || undefined },
          h('span', null, label, hint ? h('span', { className: 'dsh-pl-stat-hint' }, 'ⓘ') : null),
          h('strong', null, value))
      }

      return h('div', { className: 'dsh-pl' },
        h('style', null, CSS),
        h('header', { className: 'dsh-pl-bar' },
          h('div', { className: 'dsh-pl-tools' },
            h('div', { className: 'dsh-pl-seg', role: 'group', 'aria-label': 'filter' },
              chip('plugins', textOf(t, 'list.installedAll'), surface === 'plugins' ? 'plugins' : '', () => { setSurface('plugins'); setSelectedId(''); setSelectedMarket(null) }),
              chip('market', textOf(t, 'list.market'), surface === 'market' ? 'market' : '', () => { setSurface('market'); setSelectedId(''); setSelectedMarket(null) }),
              chip('featured', textOf(t, 'list.featured'), surface === 'featured' ? 'featured' : '', () => { setSurface('featured'); setSelectedId(''); setSelectedMarket(null) }),
              chip('design', textOf(t, 'list.design'), surface === 'design' ? 'design' : '', () => { setSurface('design'); setSelectedId(''); setSelectedMarket(null) }),
              chip('about', textOf(t, 'list.about'), surface === 'about' ? 'about' : '', () => { setSurface('about'); setSelectedId(''); setSelectedMarket(null) })),
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
            )),
        toast ? h('div', { className: 'dsh-pl-toast', role: 'status' },
          h('span', { className: 'dsh-pl-toast-dot' }),
          h('span', null, toast)) : null,
        listNote ? h('p', { className: 'dsh-pl-note dsh-pl-list-note' }, listNote) : null,
        cardMenu ? h('div', { className: 'dsh-pl-menu-layer', onClick: closeCardMenu },
          h('div', {
            className: 'dsh-pl-menu',
            style: { left: `${cardMenu.left}px`, top: `${cardMenu.top}px` },
            onClick: (event) => event.stopPropagation(),
          },
          h('div', { className: 'dsh-pl-menu-title' }, cardMenu.title),
          cardMenu.items.map((item) => h('button', {
            key: item.key,
            type: 'button',
            className: `dsh-pl-menu-item${item.danger ? ' is-danger' : ''}`,
            onClick: () => { closeCardMenu(); item.onClick() },
          }, item.label)))) : null,
        surface === 'about'
          ? aboutView()
          : surface === 'design'
          ? designView()
          : surface === 'featured'
          ? selected ? pluginDetail({ plugin: selected }) : selectedMarket ? pluginDetail({ row: selectedMarket }) : selectedScan ? pluginDetail({ scan: selectedScan, plugin: plugins.find((p) => p.moduleName === selectedScan.name) }) : featuredView()
          : surface === 'market'
          ? selected ? pluginDetail({ plugin: selected }) : selectedMarket ? pluginDetail({ row: selectedMarket }) : selectedScan ? pluginDetail({ scan: selectedScan, plugin: plugins.find((p) => p.moduleName === selectedScan.name) }) : marketView()
          : status === 'loading' && plugins.length === 0
          ? h('p', { className: 'dsh-pl-state' }, textOf(t, 'list.loading'))
          : status === 'unavailable'
            ? h('p', { className: 'dsh-pl-state' }, textOf(t, 'list.unavailable'))
            : status === 'error' && plugins.length === 0
              ? h('div', { className: 'dsh-pl-state' },
                h('p', null, error || textOf(t, 'list.error')),
                h('button', { type: 'button', onClick: () => { void load() } }, textOf(t, 'list.retry')))
              : selected
                ? pluginDetail({ plugin: selected })
                : h('div', { className: 'dsh-pl-surface' },
                h('div', { className: 'dsh-pl-subtabs', role: 'tablist', 'aria-label': 'installed scope' },
                  [['installed', textOf(t, 'list.installed')], ['builtin', textOf(t, 'list.builtin')], ['scan', textOf(t, 'list.scanTab')]].map(([id, label]) => {
                    const n = id === 'scan' ? 0 : plugins.filter((item) => originOf(item) === id).length
                    return h('button', {
                      key: id,
                      type: 'button',
                      className: `dsh-pl-subtab${filter === id ? ' is-on' : ''}`,
                      'aria-selected': filter === id,
                      onClick: () => { setFilter(id); remember({ filter: id }) },
                    }, h('span', null, label), id === 'scan' ? null : h('span', { className: 'dsh-pl-subtab-n' }, String(n)))
                  }),
                  viewToggle()),
                filter === 'scan'
                  ? scanView()
                  : h('div', { className: `dsh-pl-grid${view === 'card' ? ' is-card' : ''}` },
                  visible.length === 0
                    ? h('p', { className: 'dsh-pl-state' }, textOf(t, 'list.empty'))
                    : visible.map((plugin) => {
                      return unifiedCard(cardEntry({ plugin }))
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
.dsh-pl-hint, .dsh-pl-item span { color: var(--dsw-alias-label-secondary); font-size: var(--pl-fs-xs); }
.dsh-pl-hint { margin: 0; }
.dsh-pl-tools { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; width: 100%; }
.dsh-pl-refresh { margin-left: auto; }
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
.dsh-pl-rows, .dsh-pl-grid { flex: 1 1 auto; min-width: 0; overflow: auto; padding: 8px; }
.dsh-pl-rows { display: flex; flex-direction: column; gap: 6px; }
.dsh-pl-grid { display: flex; flex-direction: column; gap: 10px; align-content: start; padding: 12px; }
/* 列表视图：行高固定 100，文字按自然高度排版后整体垂直居中
   —— 不预留空行，简介一行时就紧一些，两行时正好撑满 */
.dsh-pl-grid:not(.is-card) .dsh-pl-item { height: 100px; min-height: 0; align-items: center; }
.dsh-pl-grid:not(.is-card) .dsh-pl-copy { overflow: hidden; gap: 2px; justify-content: center; }
.dsh-pl-grid:not(.is-card) .dsh-pl-copy strong {
  line-height: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.dsh-pl-grid:not(.is-card) .dsh-pl-where {
  line-height: 18px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.dsh-pl-grid:not(.is-card) .dsh-pl-meta {
  line-height: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.dsh-pl-grid:not(.is-card) .dsh-pl-badges { flex: none; }
.dsh-pl-grid.is-card { display: grid; grid-template-columns: repeat(auto-fill, 168px); justify-content: start; gap: 10px; align-items: stretch; }
/* 卡片内部三行网格：图标 / 文字 / 底部（状态左、操作右） */
.dsh-pl-grid.is-card .dsh-pl-item {
  padding: 12px;
  aspect-ratio: 3 / 4;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto 1fr auto;
  grid-template-areas: 'icon icon' 'copy copy' 'badge acts';
  align-items: start;
  row-gap: 6px;
  column-gap: 8px;
  position: relative;
  overflow: hidden;
}
.dsh-pl-grid.is-card .dsh-pl-item > img,
.dsh-pl-grid.is-card .dsh-pl-item > svg.dsh-pl-fallback { grid-area: icon; width: 30px; height: 30px; border-radius: 8px; }
.dsh-pl-grid.is-card .dsh-pl-acts { grid-area: acts; align-self: end; margin: 0; padding: 0; background: transparent; opacity: 1; pointer-events: auto; }
.dsh-pl-acts { display: flex; gap: 6px; align-items: center; margin-left: auto; flex: none; }
.dsh-pl-item { position: relative; }
.dsh-pl-grid.is-card .dsh-pl-copy { grid-area: copy; min-height: 0; width: 100%; gap: 4px; overflow: hidden; }
.dsh-pl-grid.is-card .dsh-pl-copy strong {
  white-space: normal;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: var(--pl-fs-lg);
  line-height: 1.35;
}
.dsh-pl-grid.is-card .dsh-pl-where {
  white-space: normal;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-height: 1.5;
}
.dsh-pl-grid.is-card .dsh-pl-meta { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; }
.dsh-pl-grid.is-card .dsh-pl-badges { grid-area: badge; align-self: end; }
.dsh-pl-grid.is-card .dsh-pl-acts .dsh-pl-card-btn { width: auto; padding: 5px 12px; font-size: var(--pl-fs-xs); border: 0; background: var(--dsw-alias-bg-layer-2); justify-content: center; }
.dsh-pl-item { display: flex; gap: 10px; align-items: center; width: 100%; min-width: 0; min-height: 64px; padding: 12px; text-align: left; border: 1px solid var(--dsw-alias-border-l2); border-radius: var(--pl-radius-card); background: var(--dsw-alias-bg-layer-1); overflow: hidden; }
.dsh-pl-card-btn { margin-left: 0; flex: none; position: static; }
.dsh-pl-health { flex: none; margin-left: 0; padding: 4px 9px; border: 0; border-radius: var(--pl-radius-chip); font-family: inherit; font-size: var(--pl-fs-xs); cursor: pointer; white-space: nowrap; }
.dsh-pl-health.is-ok { background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-secondary); cursor: default; }
.dsh-pl-health.is-warn { background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-state-warn-label); }
.dsh-pl-health.is-copied { background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-secondary); }
.dsh-pl-card-btn.is-update { border-color: var(--dsw-alias-state-business-primary); color: var(--dsw-alias-state-business-primary); }
.dsh-pl-card-btn.is-update:disabled { opacity: 0.5; }
.dsh-pl-card-btn.is-danger { color: var(--dsw-alias-state-error-primary); }
.dsh-pl-list-note { margin: 10px 12px 0; }
.dsh-pl-toast { display: flex; align-items: center; gap: 8px; margin: 10px 12px 0; padding: 10px 12px; border: 1px solid var(--dsw-alias-border-l2); border-radius: var(--pl-radius-inner); background: var(--dsw-alias-bg-layer-1); color: var(--dsw-alias-label-primary); font-size: var(--pl-fs-sm); line-height: 1.5; animation: dsh-pl-toast-in 160ms ease-out; }
.dsh-pl-toast-dot { flex: none; width: 7px; height: 7px; border-radius: 50%; background: var(--dsw-alias-state-success-primary); }
@keyframes dsh-pl-toast-in { from { opacity: 0; transform: translateY(-3px); } to { opacity: 1; transform: none; } }
.dsh-pl-pin { width: 12px; height: 12px; flex: none; color: var(--dsw-alias-state-business-primary); }
.dsh-pl-item img, .dsh-pl-fallback { width: 22px; height: 22px; border-radius: var(--pl-radius-pill); object-fit: cover; flex: none; }
.dsh-pl-copy { min-width: 0; flex: 1 1 auto; display: flex; flex-direction: column; gap: 2px; }
.dsh-pl-copy strong { font-size: var(--pl-fs-lg); font-weight: 560; color: var(--dsw-alias-label-primary); white-space: normal; overflow-wrap: anywhere; }
.dsh-pl-where { color: var(--dsw-alias-label-secondary); font-size: var(--pl-fs-xs); }
.dsh-pl-item.is-failed { border-color: var(--dsw-alias-state-error-primary); }
.dsh-pl-state { margin: 16px; color: var(--dsw-alias-label-secondary); }
.dsh-pl-detail { flex: 1 1 auto; width: auto; max-width: none; min-width: 0; min-height: 0; overflow: auto; background: var(--dsw-alias-bg-base); padding: 12px 16px 20px; }
.dsh-pl-detail, .dsh-pl-detail * { box-sizing: border-box; }
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
.dsh-pl-md ol { margin: 0 0 10px; padding-left: 20px; }
.dsh-pl-md li { margin: 0 0 4px; }
.dsh-pl-md code { font-size: var(--pl-fs-sm); padding: 0 4px; border-radius: 4px; background: var(--dsw-alias-bg-layer-2); }
.dsh-pl-md a { color: var(--dsw-alias-state-business-primary); }
.dsh-pl-table-wrap { margin: 8px 0 14px; overflow-x: auto; border: 1px solid var(--dsw-alias-border-l1); border-radius: var(--pl-radius-chip); }
.dsh-pl-md pre { margin: 0 0 12px; padding: 10px 12px; border: 1px solid var(--dsw-alias-border-l1); border-radius: var(--pl-radius-chip); background: var(--dsw-alias-bg-base); font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: var(--pl-fs-xs); line-height: 1.75; overflow-x: auto; tab-size: 2; }
.dsh-pl-md pre code { padding: 0; background: transparent; font-size: inherit; font-family: inherit; }
.dsh-pl-md blockquote { margin: 0 0 12px; padding: 8px 12px; border-left: 3px solid var(--dsw-alias-border-l2); background: var(--dsw-alias-bg-layer-2); border-radius: 0 var(--pl-radius-chip) var(--pl-radius-chip) 0; font-size: var(--pl-fs-sm); color: var(--dsw-alias-label-secondary); }
.dsh-pl-md table { width: 100%; border-collapse: collapse; font-size: var(--pl-fs-md); }
.dsh-pl-md th, .dsh-pl-md td { padding: 8px 10px; text-align: left; vertical-align: top; border-bottom: 1px solid var(--dsw-alias-border-l1); }
.dsh-pl-md th { color: var(--dsw-alias-label-secondary); font-weight: 650; background: var(--dsw-alias-bg-layer-1); white-space: nowrap; }
.dsh-pl-md td:first-child { white-space: nowrap; }
.dsh-pl-md tr:last-child td { border-bottom: 0; }
.dsh-pl-featured-foot { margin: 12px 0 0; padding: 0 12px 12px; }
.dsh-pl-accent { color: var(--dsw-alias-state-business-primary); font-weight: 600; }
.dsh-pl-surface { display: flex; flex-direction: column; gap: 10px; flex: 1 1 auto; min-height: 0; min-width: 0; overflow: auto; padding: 12px; }
/* 子元素不许被压缩：里面有 overflow:hidden 的块会被裁掉，导致页面滚不动 */
.dsh-pl-surface > * { flex: 0 0 auto; min-width: 0; }
.dsh-pl-surface .dsh-pl-grid { padding: 0; overflow: visible; flex: none; }
.dsh-pl-surface .dsh-pl-subtabs { padding: 0; }
.dsh-pl-market-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px; margin-bottom: 12px; }
.dsh-pl-stat > span { display: inline-flex; align-items: center; }
.dsh-pl-stat { display: flex; flex-direction: column; gap: 6px; padding: 12px 14px; border: 1px solid var(--dsw-alias-border-l2); border-radius: var(--pl-radius-card); background: var(--dsw-alias-bg-layer-1); }
.dsh-pl-stat span { font-size: var(--pl-fs-xs); color: var(--dsw-alias-label-secondary); }
.dsh-pl-stat-hint { margin-left: 4px; font-size: var(--pl-fs-xs); color: var(--dsw-alias-label-secondary); opacity: 0.8; cursor: help; }
.dsh-pl-stat strong { font-size: var(--pl-fs-num); font-weight: 600; line-height: 1.2; }
.dsh-pl-chart-wrap { padding: 10px 14px 6px; border: 1px solid var(--dsw-alias-border-l2); border-radius: var(--pl-radius-card); background: var(--dsw-alias-bg-layer-1); }
/* 图表：图本身用百分比坐标铺满绘图区，文字是 HTML，字号不随面板宽度变 */
.dsh-pl-chartbox { position: relative; height: 200px; }
.dsh-pl-chart-plot { position: absolute; left: 44px; right: 0; top: 6px; bottom: 22px; }
.dsh-pl-chart { display: block; width: 100%; height: 100%; }
.dsh-pl-chart-y { position: absolute; left: 0; top: 6px; bottom: 22px; width: 38px; display: flex; flex-direction: column; justify-content: space-between; align-items: flex-end; font-size: var(--pl-fs-xs); color: var(--dsw-alias-label-secondary); font-variant-numeric: tabular-nums; }
.dsh-pl-chart-x { position: absolute; left: 44px; right: 0; bottom: 0; display: flex; justify-content: space-between; font-size: var(--pl-fs-xs); color: var(--dsw-alias-label-secondary); }
.dsh-pl-chart-overlay { position: absolute; inset: 0; cursor: crosshair; }
.dsh-pl-chart-labels { position: absolute; inset: 0; pointer-events: none; }
.dsh-pl-chart-bar-label { position: absolute; transform: translate(-50%, -110%); font-size: 10px; line-height: 1.2; color: var(--dsw-alias-label-secondary); font-variant-numeric: tabular-nums; white-space: nowrap; }
.dsh-pl-chart-last { position: absolute; right: 0; top: 0; font-size: var(--pl-fs-md); font-weight: 650; color: var(--dsw-alias-label-primary); font-variant-numeric: tabular-nums; }
.dsh-pl-chart-tip { position: absolute; transform: translate(-50%, calc(-100% - 8px)); display: flex; flex-direction: column; gap: 2px; padding: 6px 10px; border: 1px solid var(--dsw-alias-border-l2); border-radius: var(--pl-radius-inner); background: var(--dsw-alias-bg-layer-1); box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12); font-size: var(--pl-fs-xs); color: var(--dsw-alias-label-secondary); white-space: nowrap; pointer-events: none; z-index: 2; }
.dsh-pl-chart-tip strong { font-size: var(--pl-fs-md); font-weight: 650; color: var(--dsw-alias-label-primary); }
.dsh-pl-chart-tip-note { color: var(--dsw-alias-label-secondary); }
.dsh-pl-about { padding: 16px 18px; margin-bottom: 12px; border: 1px solid var(--dsw-alias-border-l2); border-radius: var(--pl-radius-inner); background: var(--dsw-alias-bg-layer-1); }
.dsh-pl-about-h { margin: 0 0 10px; font-size: var(--pl-fs-lg); font-weight: 600; color: var(--dsw-alias-label-primary); }
.dsh-pl-about-p { margin: 0 0 8px; font-size: var(--pl-fs-sm); line-height: 1.7; color: var(--dsw-alias-label-secondary); }
.dsh-pl-about-p:last-of-type { margin-bottom: 0; }
.dsh-pl-about-facts { display: flex; flex-direction: column; gap: 8px; }
.dsh-pl-about-tabs { display: flex; flex-direction: column; gap: 10px; }
.dsh-pl-about-tab { display: flex; flex-direction: column; gap: 2px; padding: 8px 10px; border-radius: var(--pl-radius-chip); background: var(--dsw-alias-bg-layer-2); }
.dsh-pl-about-tab-name { font-size: var(--pl-fs-sm); font-weight: 600; color: var(--dsw-alias-label-primary); }
.dsh-pl-about-tab-body { font-size: var(--pl-fs-xs); line-height: 1.6; color: var(--dsw-alias-label-secondary); }
.dsh-pl-about-fact { display: flex; gap: 12px; align-items: baseline; }
.dsh-pl-about-label { flex: none; width: 72px; font-size: var(--pl-fs-sm); color: var(--dsw-alias-label-secondary); }
.dsh-pl-about-value { min-width: 0; font-size: var(--pl-fs-sm); color: var(--dsw-alias-label-primary); word-break: break-all; }
.dsh-pl-about-pre { margin: 10px 0 12px; padding: 12px 14px; border: 1px solid var(--dsw-alias-border-l1); border-radius: var(--pl-radius-chip); background: var(--dsw-alias-bg-layer-2); font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: var(--pl-fs-xs); line-height: 1.7; color: var(--dsw-alias-label-secondary); white-space: pre-wrap; word-break: break-word; max-height: 220px; overflow: auto; }
.dsh-pl-about-copy { margin-left: auto; display: block; padding: 5px 12px; border: 0; border-radius: var(--pl-radius-chip); background: var(--dsw-alias-state-business-primary); color: var(--dsw-alias-label-on-color); font-family: inherit; font-size: var(--pl-fs-xs); cursor: pointer; }
.dsh-pl-about-copy:hover { opacity: 0.9; }
.dsh-pl-spec { border: 1px solid var(--dsw-alias-border-l2); border-radius: var(--pl-radius-card); background: var(--dsw-alias-bg-layer-1); overflow: hidden; }
.dsh-pl-spec-tools { display: flex; align-items: center; gap: 6px; margin-left: auto; flex: none; }
.dsh-pl-copy-spec.is-primary { border-color: var(--dsw-alias-state-business-primary); color: var(--dsw-alias-state-business-primary); }
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
.dsh-pl-block-head > .dsh-pl-view { flex: none; margin-left: 4px; }
.dsh-pl-head-right { display: flex; align-items: center; gap: 10px; flex: none; }
.dsh-pl-scan-bar { display: flex; align-items: center; gap: 8px; }
.dsh-pl-scan-bar .dsh-pl-search { flex: 1 1 auto; margin: 0; }
.dsh-pl-section-title { font-size: var(--pl-fs-md); font-weight: 600; color: var(--dsw-alias-label-primary); margin-right: auto; }
.dsh-pl-menu-layer { position: fixed; inset: 0; z-index: 40; }
.dsh-pl-menu { position: fixed; z-index: 41; min-width: 190px; max-width: 240px; padding: 6px; border: 1px solid var(--dsw-alias-border-l2); border-radius: var(--pl-radius-inner); background: var(--dsw-alias-bg-layer-1); box-shadow: 0 12px 32px rgba(0, 0, 0, 0.18); display: flex; flex-direction: column; gap: 2px; }
.dsh-pl-menu-title { padding: 6px 10px 8px; font-size: var(--pl-fs-xs); color: var(--dsw-alias-label-secondary); border-bottom: 1px solid var(--dsw-alias-border-l1); margin-bottom: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dsh-pl-menu-item { text-align: left; padding: 8px 10px; border: 0; border-radius: var(--pl-radius-chip); background: transparent; color: var(--dsw-alias-label-primary); font-family: inherit; font-size: var(--pl-fs-sm); cursor: pointer; }
.dsh-pl-menu-item:hover { background: var(--dsw-alias-bg-layer-2); }
.dsh-pl-menu-item.is-danger { color: var(--dsw-alias-state-error-primary); }
.dsh-pl-meta { font-size: var(--pl-fs-xs); color: var(--dsw-alias-label-secondary); font-variant-numeric: tabular-nums; }
.dsh-pl-badges { display: inline-flex; align-items: center; gap: 4px; }
.dsh-pl-local-tag { flex: none; padding: 2px 8px; border-radius: var(--pl-radius-pill); background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-secondary); font-size: var(--pl-fs-xs); }
.dsh-pl-local-tag.is-off { color: var(--dsw-alias-state-warn-label); }
.dsh-pl-local-tag.is-failed { color: var(--dsw-alias-state-error-primary); }
.dsh-pl-head-right > .dsh-pl-view { margin-left: 0; }
.dsh-pl-block-head strong { font-size: var(--pl-fs-lg); }
.dsh-pl-block-head span { font-size: var(--pl-fs-xs); color: var(--dsw-alias-label-secondary); }
.dsh-pl-block { margin-bottom: 22px; }
.dsh-pl-surface .dsh-pl-note { margin: 0; }
.dsh-pl-hot { margin-top: 4px; }
.dsh-pl-search-wrap { display: flex; flex-direction: column; gap: 8px; margin-bottom: 10px; }
.dsh-pl-subtabs { display: flex; flex: none; align-items: center; gap: 6px; padding: 10px 12px 0; }
.dsh-pl-subtabs > .dsh-pl-view { margin-left: auto; }
.dsh-pl-subtab { display: inline-flex; align-items: center; gap: 6px; padding: 5px 11px; border: 1px solid var(--dsw-alias-border-l1); border-radius: var(--pl-radius-pill); background: transparent; color: var(--dsw-alias-label-secondary); font-family: inherit; font-size: var(--pl-fs-xs); cursor: pointer; }
.dsh-pl-subtab:hover { border-color: var(--dsw-alias-border-l2); color: var(--dsw-alias-label-primary); }
.dsh-pl-subtab.is-on { border-color: transparent; background: var(--dsw-alias-state-business-primary); color: var(--dsw-alias-label-on-color); }
.dsh-pl-subtab-n { font-variant-numeric: tabular-nums; opacity: 0.75; }
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
        const searchRemote = (payload) => rpcCall('/dsh-plugins-ui-rpc', 'remote-search', payload || {})
        const remoteDetail = (payload) => rpcCall('/dsh-plugins-ui-rpc', 'remote-detail', payload || {})
        const setBundleEnabled = typeof pluginManager.setBundleEnabled === 'function'
          ? pluginManager.setBundleEnabled.bind(pluginManager)
          : null
        const loadSelfUpdate = (payload) => rpcCall('/dsh-plugins-ui-rpc', 'self-update', payload || {})
        const scanPlugins = (payload) => rpcCall('/dsh-plugins-ui-rpc', 'scan', payload || {})
        const updateBundle = typeof pluginManager.updateBundle === 'function'
          ? pluginManager.updateBundle.bind(pluginManager)
          : null
        const listVersions = typeof pluginManager.listVersions === 'function'
          ? pluginManager.listVersions.bind(pluginManager)
          : null
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
          inject: () => ({ listPlugins, listBundles, readBundleDetail, setPluginEnabled, installBundle, removeBundle, updateBundle, listVersions, loadFacts, revealPackage, loadMarketTrend, loadMarketHot, searchCatalog, searchRemote, remoteDetail, loadSelfUpdate, setBundleEnabled, scanPlugins, diagnosePlugins, listGuide, subscribeGuide, listSeats, subscribeSeats, openPanel, t, readLocale, subscribeLocale }),
        }, ListView)), 'plugin-list: tab body')
      },
    }
  },
})
