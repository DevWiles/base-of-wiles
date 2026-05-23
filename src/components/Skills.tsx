import { useState } from 'react'
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

const categories: { id: SkillCategory | 'all'; label: string }[] = [
  { id: 'all', label: '全部' },
  { id: 'frontend', label: '前端' },
  { id: 'backend', label: '后端' },
  { id: 'tools', label: '工具' },
]

const filterSkills = (category: SkillCategory | 'all'): Skill[] => {
  if (category === 'all') return skills
  return skills.filter((skill) => skill.category === category)
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

const sortSkillsByLevel = (skillsToSort: Skill[]): Skill[] => {
  return [...skillsToSort].sort((a, b) => {
    // 根据 skillOrder 中的索引排序，索引小的排在前面
    const aIndex = skillOrder.indexOf(a.id)
    const bIndex = skillOrder.indexOf(b.id)
    
    // 如果在 skillOrder 中找到了，按索引排序
    if (aIndex !== -1 && bIndex !== -1) {
      return aIndex - bIndex
    }
    
    // 如果只有一个在 skillOrder 中，找到的排在前面
    if (aIndex !== -1) return -1
    if (bIndex !== -1) return 1
    
    // 如果都不在 skillOrder 中，按名称字母顺序排序
    return a.name.localeCompare(b.name)
  })
}

const Skills = () => {
  const { ref, isIntersecting, isExiting } = useIntersectionObserver<HTMLElement>({ threshold: 0.15, downwardOnly: true })
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'all'>('all')
  const filtered = sortSkillsByLevel(filterSkills(activeCategory))
  
  // 计算需要多少个占位卡片来保持高度一致（基于 3 列 × 4 行 = 12 个位置）
  const maxCards = 12
  const placeholderCount = maxCards - filtered.length

  return (
    <section
      id="skills"
      ref={ref}
      className={`bg-background px-4 py-20 transition-all duration-700 ease-out ${
        isExiting 
          ? 'animate-slide-fade-out' 
          : isIntersecting 
            ? 'animate-slide-fade-in opacity-100 translate-y-0' 
            : 'slide-fade-reset'
      }`}
    >
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold md:text-5xl">
            <span className="text-black">技</span>
            <span className="text-blue-500">能</span>
          </h2>
          <div className="mt-5 inline-flex flex-wrap justify-center gap-2 rounded-full bg-background p-1">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={`rounded-full px-5 py-2 text-base font-bold transition-all duration-300 active:scale-95 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-blue-500 to-blue-500 text-white shadow-lg shadow-blue-500/30'
                    : 'text-black hover:bg-white/5 hover:text-black'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {filtered.map((skill) => {
            const IconComponent = skillIcons[skill.id]
            return (
              <div
                key={skill.id}
                className="group relative rounded-2xl border border-white/5 bg-white/5 p-4 shadow-sm shadow-black/40 transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/70"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-black">{skill.name}</p>
                    <p className="mt-1 text-xs text-gray-600">
                      {skill.category === 'frontend' && '前端'}
                      {skill.category === 'backend' && '后端'}
                      {skill.category === 'tools' && '工具'}
                    </p>
                    <p className="mt-2 inline-flex rounded-full bg-white/10 px-2 py-0.5 text-xs text-black">
                      {skill.level === 'advanced' && '熟练使用'}
                      {skill.level === 'intermediate' && '日常开发'}
                      {skill.level === 'beginner' && '正在学习'}
                    </p>
                  </div>
                  <div className="shrink-0 opacity-80 transition-opacity group-hover:opacity-100">
                    <img 
                      src={IconComponent} 
                      alt={skill.name} 
                      className="h-16 w-16 object-contain"
                    />
                  </div>
                </div>
              </div>
            )
          })}
          {/* 占位卡片，保持高度一致 */}
          {Array.from({ length: placeholderCount }).map((_, index) => (
            <div
              key={`placeholder-${index}`}
              className="invisible rounded-2xl border border-white/5 bg-white/5 p-4 shadow-sm shadow-black/40"
              aria-hidden="true"
            >
              <p className="text-sm font-bold text-black">&nbsp;</p>
              <p className="mt-1 text-xs text-gray-600">&nbsp;</p>
              <p className="mt-2 inline-flex rounded-full bg-white/10 px-2 py-0.5 text-xs text-black">
                &nbsp;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills

