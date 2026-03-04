import type { Skill, SkillCategory } from '../data/skills'
import { skills } from '../data/skills'

const categories: { id: SkillCategory | 'all'; label: string }[] = [
  { id: 'all', label: '全部' },
  { id: 'frontend', label: '前端' },
  { id: 'backend', label: '后端' },
  { id: 'tools', label: '工具' },
]

type SkillsProps = {
  activeCategory?: SkillCategory | 'all'
}

const filterSkills = (category: SkillCategory | 'all'): Skill[] => {
  if (category === 'all') return skills
  return skills.filter((skill) => skill.category === category)
}

const Skills = ({ activeCategory = 'all' }: SkillsProps) => {
  const filtered = filterSkills(activeCategory)

  return (
    <section
      id="skills"
      className="bg-background px-4 py-20"
    >
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-semibold text-white md:text-3xl">我的技能</h2>
            <p className="mt-3 text-sm text-gray-300 md:text-base">
              覆盖前端、后端与工程工具，搭建完整的 Web
              开发流程。所有技能以卡片形式展示，便于快速浏览。
            </p>
          </div>
          <div className="inline-flex flex-wrap gap-2 rounded-full bg-white/5 p-1">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-sky-500 to-purple-500 text-white'
                    : 'text-gray-300 hover:bg-white/10'
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
              className="rounded-2xl border border-white/5 bg-white/5 p-4 shadow-sm shadow-black/40"
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
        </div>
      </div>
    </section>
  )
}

export default Skills

