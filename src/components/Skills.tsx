import type { CSSProperties } from 'react'
import type { Skill, SkillCategory } from '../data/skills'
import { skills } from '../data/skills'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

// 技能图标映射（*-simpleicons.svg 来自 Simple Icons，CC0 协议；*-lobehub.svg 来自 LobeHub Icons，MIT 协议）
import LlmIcon from '../assets/icons/skills/deepseek-simpleicons.svg'
import PromptIcon from '../assets/icons/skills/prompt-custom.svg'
import McpIcon from '../assets/icons/skills/modelcontextprotocol-simpleicons.svg'
import ClaudeIcon from '../assets/icons/skills/claude-simpleicons.svg'
import CursorIcon from '../assets/icons/skills/cursor-simpleicons.svg'
import CodexIcon from '../assets/icons/skills/codex-lobehub.svg'
import JavaIcon from '../assets/icons/skills/java-svgrepo-com.svg'
import SpringIcon from '../assets/icons/skills/spring-svgrepo-com.svg'
import MysqlIcon from '../assets/icons/skills/mysql-svgrepo-com.svg'
import RedisIcon from '../assets/icons/skills/redis-simpleicons.svg'
import KafkaIcon from '../assets/icons/skills/apachekafka-simpleicons.svg'
import PythonIcon from '../assets/icons/skills/python-svgrepo-com.svg'
import NodejsIcon from '../assets/icons/skills/nodejs-svgrepo-com.svg'
import ReactIcon from '../assets/icons/skills/react-svgrepo-com.svg'
import TsIcon from '../assets/icons/skills/typescript-svgrepo-com.svg'
import VueIcon from '../assets/icons/skills/vuedotjs-simpleicons.svg'
import TailwindIcon from '../assets/icons/skills/tailwindcss-icon-svgrepo-com.svg'
import DockerIcon from '../assets/icons/skills/docker-svgrepo-com.svg'
import LinuxIcon from '../assets/icons/skills/linux-simpleicons.svg'
import GhActionsIcon from '../assets/icons/skills/githubactions-simpleicons.svg'

const skillIcons: Record<string, string> = {
  llm: LlmIcon,
  prompt: PromptIcon,
  mcp: McpIcon,
  claudecode: ClaudeIcon,
  cursor: CursorIcon,
  codex: CodexIcon,
  java: JavaIcon,
  spring: SpringIcon,
  mysql: MysqlIcon,
  redis: RedisIcon,
  kafka: KafkaIcon,
  python: PythonIcon,
  node: NodejsIcon,
  react: ReactIcon,
  ts: TsIcon,
  vue: VueIcon,
  tailwind: TailwindIcon,
  docker: DockerIcon,
  linux: LinuxIcon,
  ghactions: GhActionsIcon,
}

// 个别图标需要单独调整：spring 是横向 logo，放大并只露出左侧叶子；原色偏深的在黑夜模式下提亮
const iconTweaks: Record<string, string> = {
  spring: 'origin-left scale-[3.6]',
  mysql: 'dark:brightness-200',
  node: 'dark:brightness-200',
  // Simple Icons 是实心单色图形，比彩色 logo 显得更重，缩小一些让视觉重量一致；纯黑的在黑夜模式下反白
  llm: 'scale-[0.82]',
  mcp: 'scale-[0.78] dark:invert',
  claudecode: 'scale-[0.82]',
  cursor: 'scale-[0.78] dark:invert',
  codex: 'scale-[1.15]', // 去掉白底后图形偏小，放大一点
  redis: 'scale-[0.82]',
  kafka: 'scale-[0.78] dark:invert',
  vue: 'scale-[0.82]',
  linux: 'scale-[0.85]',
  ghactions: 'scale-[0.78]',
}

const groups: { id: SkillCategory; no: string; title: string; label: string }[] = [
  { id: 'ai', no: '01', title: 'AI 应用', label: 'AI Apps' },
  { id: 'aicoding', no: '02', title: 'AI 编码', label: 'AI Coding' },
  { id: 'backend', no: '03', title: '后端', label: 'Backend' },
  { id: 'frontend', no: '04', title: '前端', label: 'Frontend' },
  { id: 'devops', no: '05', title: '部署', label: 'DevOps' },
]

// 熟练使用不标注，其余在名字下方用小字区分
const levelTag: Record<Skill['level'], string | null> = {
  advanced: null,
  intermediate: '日常',
  beginner: '学习中',
}

// 技能排序列表：按照 ID 顺序排列，排在前面的优先显示
// 你可以在这里调整技能的显示顺序
const skillOrder: string[] = [
  'llm', 'prompt', 'mcp',
  'claudecode', 'codex', 'cursor',
  'java', 'spring', 'redis', 'mysql', 'kafka', 'python', 'node',
  'react', 'ts', 'vue', 'tailwind',
  'linux', 'docker', 'ghactions',
]

const sortSkills = (list: Skill[]): Skill[] => {
  return [...list].sort((a, b) => {
    const aIndex = skillOrder.indexOf(a.id)
    const bIndex = skillOrder.indexOf(b.id)
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex
    if (aIndex !== -1) return -1
    if (bIndex !== -1) return 1
    return a.name.localeCompare(b.name)
  })
}

// 动画延迟，配合 index.css 里的 --d 变量实现错落进场
const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties

const Skills = () => {
  // 只播放一次：进场后不再随滚动反复消失重播
  const { ref, isIntersecting } = useIntersectionObserver<HTMLElement>({ threshold: 0.2, downwardOnly: true, triggerOnce: true })

  return (
    <section id="skills" ref={ref} data-revealed={isIntersecting} className="bg-background px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="reveal-mask text-2xl font-semibold md:text-3xl">
          <span style={delay(0)}>
            <span className="text-black dark:text-gray-100">My</span> <span className="text-blue-500">Skills</span>
          </span>
        </h2>
        <p className="fade-up mt-3 text-sm text-gray-600 dark:text-gray-400 md:text-base" style={delay(120)}>
          日常工作里依赖的技术栈。
        </p>

        <ul className="mt-8">
          {groups.map((group, gi) => {
            const items = sortSkills(skills.filter((skill) => skill.category === group.id))
            const base = 300 + gi * 180
            return (
              <li key={group.id} className="group relative">
                <span
                  className="draw-line absolute inset-x-0 top-0 h-px bg-gray-200 dark:bg-white/10"
                  style={delay(base)}
                  aria-hidden="true"
                />
                <div className="flex flex-col gap-4 pb-8 pt-6 md:flex-row md:gap-4">
                  <div className="fade-up flex shrink-0 items-baseline gap-5 whitespace-nowrap md:w-56 md:gap-8 md:pt-2" style={delay(base + 60)}>
                    <span className="w-8 shrink-0 text-lg font-semibold tabular-nums text-gray-300 transition-colors duration-300 group-hover:text-blue-500 dark:text-gray-600">
                      {group.no}
                    </span>
                    <p className="flex items-baseline gap-3">
                      <span className="text-base font-semibold text-black dark:text-gray-100">{group.title}</span>
                      <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-blue-500">{group.label}</span>
                    </p>
                  </div>

                  <div className="grid flex-1 grid-cols-3 gap-y-7 pl-[3.25rem] sm:grid-cols-4 md:grid-cols-7 md:pl-0">
                    {items.map((skill, i) => {
                      const tag = levelTag[skill.level]
                      return (
                        // 外层负责进场动画，内层负责悬浮上浮，避免两个 transform 互相覆盖
                        <div key={skill.id} className="fade-up" style={delay(base + 120 + i * 45)}>
                          <div className="group/skill flex flex-col items-center gap-2 text-center">
                            <span className="flex h-11 w-11 items-center justify-center overflow-hidden transition-transform duration-300 ease-out group-hover/skill:-translate-y-1 group-hover/skill:scale-110">
                              <img src={skillIcons[skill.id]} alt="" className={`h-full w-full object-contain ${iconTweaks[skill.id] ?? ''}`} />
                            </span>
                            <span className="relative text-xs font-medium text-gray-700 transition-colors group-hover/skill:text-blue-500 dark:text-gray-300">
                              {skill.name}
                              {/* 角标绝对定位在名字下方、落进行间距里，不撑高这一项，保证每排图标对齐 */}
                              {tag && (
                                <span className="absolute left-1/2 top-full mt-0.5 -translate-x-1/2 whitespace-nowrap text-[10px] font-normal text-gray-400">
                                  {tag}
                                </span>
                              )}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default Skills
