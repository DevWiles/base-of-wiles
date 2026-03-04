export type SkillCategory = 'frontend' | 'backend' | 'tools'

export type Skill = {
  id: string
  name: string
  level: 'beginner' | 'intermediate' | 'advanced'
  category: SkillCategory
}

export const skills: Skill[] = [
  // Frontend (6)
  { id: 'react', name: 'React', level: 'advanced', category: 'frontend' },
  { id: 'ts', name: 'TypeScript', level: 'advanced', category: 'frontend' },
  { id: 'tailwind', name: 'Tailwind CSS', level: 'advanced', category: 'frontend' },
  { id: 'vue', name: 'Vue.js', level: 'intermediate', category: 'frontend' },
  { id: 'nextjs', name: 'Next.js', level: 'intermediate', category: 'frontend' },
  { id: 'html', name: 'HTML5/CSS3', level: 'advanced', category: 'frontend' },
  
  // Backend (6)
  { id: 'node', name: 'Node.js', level: 'intermediate', category: 'backend' },
  { id: 'express', name: 'Express', level: 'intermediate', category: 'backend' },
  { id: 'java', name: 'Java', level: 'advanced', category: 'backend' },
  { id: 'spring', name: 'Spring Boot', level: 'advanced', category: 'backend' },
  { id: 'python', name: 'Python', level: 'intermediate', category: 'backend' },
  { id: 'mysql', name: 'MySQL', level: 'intermediate', category: 'backend' },
  
  // Tools (4)
  { id: 'git', name: 'Git', level: 'advanced', category: 'tools' },
  { id: 'vite', name: 'Vite', level: 'advanced', category: 'tools' },
  { id: 'docker', name: 'Docker', level: 'beginner', category: 'tools' },
  { id: 'linux', name: 'Linux', level: 'intermediate', category: 'tools' },
]

