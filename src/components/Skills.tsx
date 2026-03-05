import { useState } from 'react'
import type { Skill, SkillCategory } from '../data/skills'
import { skills } from '../data/skills'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

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

const Skills = () => {
  const { ref, isIntersecting } = useIntersectionObserver<HTMLElement>({ threshold: 0.1 })
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'all'>('all')
  const filtered = filterSkills(activeCategory)
  
  // 计算需要多少个占位卡片来保持高度一致（基于 3 列 × 6 行 = 18 个位置）
  const maxCards = 18
  const placeholderCount = maxCards - filtered.length

  return (
    <section
      id="skills"
      ref={ref}
      className={`bg-background px-4 py-20 transition-all duration-700 ease-out ${
        isIntersecting ? 'animate-slide-fade-in opacity-100 translate-y-0' : 'slide-fade-reset'
      }`}
    >
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-semibold md:text-3xl">
            <span className="bg-gradient-to-r from-red-500 to-red-500 bg-clip-text text-transparent">
              技
            </span>
            <span className="text-white">能</span>
          </h2>
          <div className="mt-5 inline-flex flex-wrap justify-center gap-2 rounded-full bg-background p-1">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 active:scale-95 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-blue-500 to-blue-500 text-white shadow-lg shadow-blue-500/30'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {filtered.map((skill) => (
            <div
              key={skill.id}
              className="group relative rounded-2xl border border-white/5 bg-white/5 p-4 shadow-sm shadow-black/40 transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/70"
            >
              <p className="text-sm font-medium text-white">{skill.name}</p>
              <p className="mt-1 text-xs text-gray-400">
                {skill.category === 'frontend' && '前端'}
                {skill.category === 'backend' && '后端'}
                {skill.category === 'tools' && '工具'}
              </p>
              <p className="mt-2 inline-flex rounded-full bg-white/10 px-2 py-0.5 text-xs text-gray-200">
                {skill.level === 'advanced' && '熟练使用'}
                {skill.level === 'intermediate' && '日常开发'}
                {skill.level === 'beginner' && '正在学习'}
              </p>
            </div>
          ))}
          {/* 占位卡片，保持高度一致 */}
          {Array.from({ length: placeholderCount }).map((_, index) => (
            <div
              key={`placeholder-${index}`}
              className="invisible rounded-2xl border border-white/5 bg-white/5 p-4 shadow-sm shadow-black/40"
              aria-hidden="true"
            >
              <p className="text-sm font-medium text-white">&nbsp;</p>
              <p className="mt-1 text-xs text-gray-400">&nbsp;</p>
              <p className="mt-2 inline-flex rounded-full bg-white/10 px-2 py-0.5 text-xs text-gray-200">
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

