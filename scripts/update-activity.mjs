// 统计 DevWiles 名下所有自有仓库（含私有）里我本人的提交，按周汇总写进 src/data/activity.json，
// 供首屏背景的「累计提交曲线」使用。只输出每周提交数，不含仓库名与提交内容。
//
// 依赖本机已登录的 gh CLI（能看到私有仓库）：npm run update-activity
import { execFileSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'

const OWNER = 'DevWiles'
// 我用过的 GitHub 账号；原项目作者等其他人的提交不算
const MY_LOGINS = new Set(['DevWiles', 'StephenDeng01', 'Nathan33907'])
// 有些提交的邮箱没关联到任何 GitHub 账号（GitCode 的 noreply、Mac 本地邮箱），按邮箱和署名认领
const MY_EMAILS = [/stephendeng01/i, /^nathan\.demon66@gmail\.com$/i, /^wiles@/i]
const MY_NAMES = new Set(['Wiles', 'Wiles Deng', 'nathandeng', 'StephenDeng01'])

const isMine = (commit) => {
  const login = commit.author?.login
  if (login) return MY_LOGINS.has(login)
  const { email = '', name = '' } = commit.commit.author ?? {}
  return MY_EMAILS.some((pattern) => pattern.test(email)) || MY_NAMES.has(name)
}

const gh = (...args) => JSON.parse(execFileSync('gh', args, { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 }))

const repos = gh('repo', 'list', OWNER, '--limit', '200', '--json', 'name,isFork').filter((repo) => !repo.isFork)

const perWeek = new Map()
let total = 0

// 一周从周一算起，键为该周周一的日期
const weekKey = (iso) => {
  const d = new Date(iso)
  const day = (d.getUTCDay() + 6) % 7
  d.setUTCDate(d.getUTCDate() - day)
  return d.toISOString().slice(0, 10)
}

for (const { name } of repos) {
  let pages
  try {
    pages = gh('api', '--paginate', '--slurp', `repos/${OWNER}/${name}/commits?per_page=100`)
  } catch {
    continue // 空仓库会返回 409
  }
  let mine = 0
  for (const commit of pages.flat()) {
    if (!isMine(commit)) continue
    const key = weekKey(commit.commit.author.date)
    perWeek.set(key, (perWeek.get(key) ?? 0) + 1)
    mine++
  }
  total += mine
  console.log(`${name}: ${mine}`)
}

const weeks = [...perWeek.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([week, count]) => ({ week, count }))

writeFileSync(
  new URL('../src/data/activity.json', import.meta.url),
  JSON.stringify({ generatedAt: new Date().toISOString().slice(0, 10), total, weeks }, null, 2) + '\n',
)
console.log(`total ${total} commits in ${weeks.length} active weeks`)
