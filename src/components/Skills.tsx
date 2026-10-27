import type { CSSProperties } from 'react'
import type { Skill, SkillCategory } from '../data/skills'
import { skills } from '../data/skills'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

// 技能图标映射
import ReactIcon from '../assets/icons/skills/react-svgrepo-com.svg'
import TailwindIcon from '../assets/icons/skills/tailwindcss-icon-svgrepo-com.svg'
import ViteIcon from '../assets/icons/skills/vite-svgrepo-com.svg'
import NodejsIcon from '../assets/icons/skills/nodejs-svgrepo-com.svg'
import JavaIcon from '../assets/icons/skills/java-svgrepo-com.svg'
import SpringIcon from '../assets/icons/skills/spring-svgrepo-com.svg'
import PythonIcon from '../assets/icons/skills/python-svgrepo-com.svg'
import MysqlIcon from '../assets/icons/skills/mysql-svgrepo-com.svg'
import GitIcon from '../assets/icons/skills/git-svgrepo-com.svg'
import DockerIcon from '../assets/icons/skills/docker-svgrepo-com.svg'
import HtmlIcon from '../assets/icons/skills/html-5-svgrepo-com.svg'
import TsIcon from '../assets/icons/skills/typescript-svgrepo-com.svg'
import IdeaIcon from '../assets/icons/skills/intellij-idea-svgrepo-com.svg'
import VscodeIcon from '../assets/icons/skills/vscode-svgrepo-com.svg'
import PycharmIcon from '../assets/icons/skills/pycharm-svgrepo-com.svg'

const skillIcons: Record<string, string> = {
  'react': ReactIcon,
  'tailwind': TailwindIcon,
  'vite': ViteIcon,
  'node': NodejsIcon,
  'java': JavaIcon,
  'spring': SpringIcon,
  'python': PythonIcon,
  'mysql': MysqlIcon,
  'git': GitIcon,
  'docker': DockerIcon,
  'html': HtmlIcon,
  'ts': TsIcon,
  'idea': IdeaIcon,
  'vscode': VscodeIcon,
  'pycharm': PycharmIcon,
}

// 个别图标需要单独调整：spring 是横向 logo，放大并只露出左侧叶子；原色偏深的在黑夜模式下提亮
const iconTweaks: Record<string, string> = {
  spring: 'origin-left scale-[3.6]',
  mysql: 'dark:brightness-200',
  node: 'dark:brightness-200',
}

const groups: { id: SkillCategory; no: string; title: string; label: string }[] = [
  { id: 'backend', no: '01', title: '后端', label: 'Backend' },
  { id: 'frontend', no: '02', title: '前端', label: 'Frontend' },
  { id: 'tools', no: '03', title: '工具', label: 'Tools' },
]

// 熟练使用不标注，其余用小角标区分
const levelTag: Record<Skill['level'], string | null> = {
  advanced: null,
  intermediate: '日常',
  beginner: '学习中',
}

// 技能排序列表：按照 ID 顺序排列，排在前面的优先显示
// 你可以在这里调整技能的显示顺序
const skillOrder: string[] = [
  // 熟练度最高的技能排在前面
  'java', 'spring', 'mysql',
  'node', 'python', 'react',
  'vite', 'ts', 'tailwind',
  'html', 'git', 'idea',
  'pycharm', 'vscode', 'docker',
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
          日常工作里依赖的技术栈，未标注的均为熟练使用。
        </p>

        <ul className="mt-8">
          {groups.map((group, gi) => {
            const items = sortSkills(skills.filter((skill) => skill.category === group.id))
            const base = 300 + gi * 220
            return (
              <li key={group.id} className="group relative">
                <span
                  className="draw-line absolute inset-x-0 top-0 h-px bg-gray-200 dark:bg-white/10"
                  style={delay(base)}
                  aria-hidden="true"
                />
                <div className="flex flex-col gap-4 py-6 md:flex-row md:gap-8">
                  <div className="fade-up flex shrink-0 items-baseline gap-5 md:w-48 md:gap-8 md:pt-2" style={delay(base + 60)}>
                    <span className="w-8 shrink-0 text-lg font-semibold tabular-nums text-gray-300 transition-colors duration-300 group-hover:text-blue-500 dark:text-gray-600">
                      {group.no}
                    </span>
                    <p className="flex items-baseline gap-3">
                      <span className="text-base font-semibold text-black dark:text-gray-100">{group.title}</span>
                      <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-blue-500">{group.label}</span>
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2.5 pl-[3.25rem] md:pl-0">
                    {items.map((skill, i) => {
                      const tag = levelTag[skill.level]
                      return (
                        // 外层负责进场动画，内层负责悬浮上浮，避免两个 transform 互相覆盖
                        <div key={skill.id} className="fade-up" style={delay(base + 120 + i * 45)}>
                          <div
                            className={`flex items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-3.5 text-sm transition duration-300 ease-out hover:-translate-y-0.5 hover:border-blue-500/60 hover:shadow-md hover:shadow-blue-500/10 ${
                              skill.level === 'beginner'
                                ? 'border-dashed border-gray-300 bg-transparent dark:border-white/20'
                                : 'border-gray-200 bg-white dark:border-white/10 dark:bg-slate-900'
                            }`}
                          >
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-50 p-1 dark:bg-white/5">
                              <img
                                src={skillIcons[skill.id]}
                                alt=""
                                className={`h-full w-full object-contain ${iconTweaks[skill.id] ?? ''}`}
                              />
                            </span>
                            <span className="font-medium text-black dark:text-gray-100">{skill.name}</span>
                            {tag && (
                              <span className="rounded-full bg-gray-100 px-1.5 py-px text-[10px] text-gray-500 dark:bg-white/10 dark:text-gray-400">
                                {tag}
                              </span>
                            )}
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
