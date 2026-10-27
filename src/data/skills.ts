export type SkillCategory = 'ai' | 'aicoding' | 'backend' | 'frontend' | 'devops'

export type Skill = {
  id: string
  name: string
  level: 'beginner' | 'intermediate' | 'advanced'
  category: SkillCategory
}

// advanced = 熟练使用（不标注）；intermediate = 日常；beginner = 学习中
export const skills: Skill[] = [
  // AI 应用
  { id: 'llm', name: 'LLM API', level: 'advanced', category: 'ai' },
  { id: 'prompt', name: 'Prompt 工程', level: 'advanced', category: 'ai' },
  { id: 'mcp', name: 'Agent / MCP', level: 'intermediate', category: 'ai' },

  // AI 编码
  { id: 'claudecode', name: 'Claude Code', level: 'advanced', category: 'aicoding' },
  { id: 'cursor', name: 'Cursor', level: 'advanced', category: 'aicoding' },

  // 后端
  { id: 'java', name: 'Java', level: 'advanced', category: 'backend' },
  { id: 'spring', name: 'Spring Boot / Cloud', level: 'advanced', category: 'backend' },
  { id: 'mysql', name: 'MySQL', level: 'intermediate', category: 'backend' },
  { id: 'redis', name: 'Redis', level: 'advanced', category: 'backend' },
  { id: 'kafka', name: 'Kafka', level: 'intermediate', category: 'backend' },
  { id: 'python', name: 'Python', level: 'intermediate', category: 'backend' },
  { id: 'node', name: 'Node.js', level: 'intermediate', category: 'backend' },

  // 前端
  { id: 'react', name: 'React', level: 'advanced', category: 'frontend' },
  { id: 'ts', name: 'TypeScript', level: 'advanced', category: 'frontend' },
  { id: 'vue', name: 'Vue 3', level: 'intermediate', category: 'frontend' },
  { id: 'tailwind', name: 'Tailwind CSS', level: 'advanced', category: 'frontend' },

  // 部署
  { id: 'docker', name: 'Docker', level: 'beginner', category: 'devops' },
  { id: 'linux', name: 'Linux', level: 'advanced', category: 'devops' },
  { id: 'ghactions', name: 'GitHub Actions', level: 'intermediate', category: 'devops' },
]
