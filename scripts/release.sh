#!/usr/bin/env bash
#
# 一键发布 dsh-plugin-panel：bump → 自检 → 推送 → 发布 → 更新市场索引 → 验证
#
# 用法：
#   scripts/release.sh patch        # 0.1.11 → 0.1.12
#   scripts/release.sh minor        # 0.1.11 → 0.2.0
#   scripts/release.sh 0.2.3        # 指定版本
#   scripts/release.sh patch --dry-run   # 只走前半段，不真正发布
#
# 凭证：从 macOS 钥匙串读取，服务名 npm-dsh-plugin-panel。
#   首次配置：security add-generic-password -a "$USER" -s npm-dsh-plugin-panel -w 'npm_xxx' -U
#   这样 token 不落在任何明文文件里，脚本用完即删临时 .npmrc。

set -euo pipefail
cd "$(dirname "$0")/.."

KEYCHAIN_SERVICE="npm-dsh-plugin-panel"
REGISTRY="https://registry.npmjs.org"
INDEX_FILE="index.json"
DRY_RUN=0
BUMP=""

for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=1 ;;
    patch|minor|major|[0-9]*) BUMP="$arg" ;;
    *) echo "未知参数: $arg"; exit 2 ;;
  esac
done

if [ -z "$BUMP" ]; then
  echo "用法: scripts/release.sh <patch|minor|major|版本号> [--dry-run]"
  exit 2
fi

say() { printf '\n\033[1m▸ %s\033[0m\n' "$1"; }
fail() { printf '\033[31m✗ %s\033[0m\n' "$1"; exit 1; }

# ---------- 0. 前置检查 ----------
say "前置检查"
command -v node >/dev/null || fail "没有 node"
command -v git >/dev/null || fail "没有 git"
command -v security >/dev/null || fail "没有 security（需要 macOS）"

if [ -n "$(git status --porcelain)" ]; then
  fail "工作区有未提交改动，先提交或 stash 再发布"
fi

TOKEN=$(security find-generic-password -s "$KEYCHAIN_SERVICE" -w 2>/dev/null || true)
if [ -z "$TOKEN" ]; then
  fail "钥匙串里没有 $KEYCHAIN_SERVICE，先执行：
  security add-generic-password -a \"\$USER\" -s $KEYCHAIN_SERVICE -w 'npm_xxx' -U"
fi

WHO=$(npm whoami --registry="$REGISTRY" --//registry.npmjs.org/:_authToken="$TOKEN" 2>/dev/null || true)
[ "$WHO" = "longjiaqiuu" ] || fail "token 身份是 '${WHO:-空}'，预期 longjiaqiuu"

# ---------- 1. bump 版本 ----------
say "升版本：$BUMP"
OLD=$(node -p "require('./package.json').version")
if [[ "$BUMP" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  NEW="$BUMP"
else
  NEW=$(node -e "
const [maj,min,pat] = require('./package.json').version.split('.').map(Number)
const k = process.argv[1]
console.log(k === 'major' ? \`\${maj+1}.0.0\` : k === 'minor' ? \`\${maj}.\${min+1}.0\` : \`\${maj}.\${min}.\${pat+1}\`)
" "$BUMP")
fi
[ "$NEW" != "$OLD" ] || fail "新版本与当前版本相同（$OLD）"

node -e "
const fs = require('fs')
const p = JSON.parse(fs.readFileSync('package.json', 'utf8'))
p.version = '$NEW'
fs.writeFileSync('package.json', JSON.stringify(p, null, 2) + '\n')
const c = fs.readFileSync('client.js', 'utf8').replace(/const VERSION = 'v[0-9.]+'/, \"const VERSION = 'v$NEW'\")
fs.writeFileSync('client.js', c)
"
echo "  $OLD → $NEW"

# ---------- 2. 自检 ----------
say "语法检查"
for f in index.js trend.js client.js; do node --check "$f" || fail "$f 语法错误"; done
echo "  通过"

say "元信息自检"
if [ -x "../dsh插件开发经验/scripts/check-plugin-meta.sh" ]; then
  (cd .. && ./dsh插件开发经验/scripts/check-plugin-meta.sh dsh-plugin-canvas) || fail "元信息自检未通过"
else
  echo "  跳过（找不到脚本）"
fi

say "健康度自检"
if [ -x "../dsh插件开发经验/scripts/check-plugin-health.sh" ]; then
  (cd .. && ./dsh插件开发经验/scripts/check-plugin-health.sh dsh-plugin-canvas) || fail "健康度自检未通过"
else
  echo "  跳过（找不到脚本）"
fi

# ---------- 3. 提交并推送 ----------
say "提交并推送"
git add -A
git -c user.name='jqlong17' -c user.email='jqlong17@users.noreply.github.com' \
  commit -q -m "chore: release $NEW"
git pull --rebase -q origin main
git push -q origin main
echo "  $(git log --oneline -1)"

if [ "$DRY_RUN" = "1" ]; then
  say "dry-run：停在发布之前"
  echo "  已提交 $NEW，但未发布到 npm。撤销：git reset --hard HEAD~1"
  exit 0
fi

# ---------- 4. 发布到 npm ----------
say "发布到 npm"
NPMRC=".npmrc"
restore() { rm -f "$NPMRC"; }
trap restore EXIT

printf '//registry.npmjs.org/:_authToken=%s\n' "$TOKEN" > "$NPMRC"
chmod 600 "$NPMRC"
npm publish --registry="$REGISTRY" --access public 2>&1 | tail -3

say "等待 npm 生效"
for i in $(seq 1 12); do
  sleep 20
  LIVE=$(curl -sS -m 10 "$REGISTRY/dsh-plugin-panel" 2>/dev/null \
    | node -e "let s='';process.stdin.on('data',d=>s+=d).on('end',()=>{try{console.log(JSON.parse(s)['dist-tags'].latest)}catch{console.log('')}})" || true)
  echo "  第 $i 次：$LIVE"
  [ "$LIVE" = "$NEW" ] && break
done
[ "$LIVE" = "$NEW" ] || fail "npm 上 latest 仍是 $LIVE，发布可能还在队列里，稍后手动确认"

# ---------- 5. 更新市场索引 ----------
say "更新市场索引"
node -e "
const fs = require('fs')
const https = require('https')
https.get('$REGISTRY/dsh-plugin-panel', (res) => {
  let s = ''
  res.on('data', (d) => { s += d })
  res.on('end', () => {
    const meta = JSON.parse(s)
    const published = meta.time['$NEW']
    const ts = Math.floor(new Date(published).getTime() / 1000)
    const idx = JSON.parse(fs.readFileSync('$INDEX_FILE', 'utf8'))
    for (const p of idx.plugins) {
      if (p.name === 'dsh-plugin-panel') {
        p.versions[0].version = '$NEW'
        p.versions[0].publishTimestamp = ts
      }
    }
    fs.writeFileSync('$INDEX_FILE', JSON.stringify(idx, null, 2) + '\n')
    console.log('  index → $NEW @ ' + published)
  })
})
" 2>/dev/null || fail "索引更新失败"

git add -A
git -c user.name='jqlong17' -c user.email='jqlong17@users.noreply.github.com' \
  commit -q -m "chore: point the market index at $NEW"
git pull --rebase -q origin main
git push -q origin main
echo "  $(git log --oneline -1)"

# ---------- 6. 验证 ----------
say "验证"
echo "  npm:   $(npm view dsh-plugin-panel version --registry="$REGISTRY" 2>/dev/null)"
echo "  index: $(curl -sS -m 10 "https://raw.githubusercontent.com/jqlong17/dsh-plugin-panel/main/$INDEX_FILE?t=$(date +%s)" | node -e "let s='';process.stdin.on('data',d=>s+=d).on('end',()=>{const p=JSON.parse(s).plugins.find(x=>x.name==='dsh-plugin-panel');console.log(p.versions[0].version)})" 2>/dev/null)"

printf '\n\033[32m✓ %s 发布完成\033[0m\n' "$NEW"
printf '  记得让 DSH 重启后才会用上新版 host 代码\n'
