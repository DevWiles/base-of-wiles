export type Project = {
  id: string
  title: string
  description: string
  techStack: string[]
  imageUrl: string
  link: string
}

export const projects: Project[] = [
  {
    id: 'portfolio',
    title: "Wiles's base",
    description: '利用Vibe Coding技术，使用 React、TypeScript 和 Tailwind CSS 构建的单页个人作品集网站。',
    techStack: ['Frontend', 'React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    imageUrl: '/projects/portfolio.png',
    link: 'https://github.com/DevWiles/developer-blog/tree/main/portfolio',
  },
  {
    id: 'lingchat-server',
    title: '灵雀轻聊-LingChat-后端',
    description: '一个分布式的即时通讯系统，基于 Spring Cloud、Spring Boot、Kafka、Redis、MySQL、React等技术实现。',
    techStack: ['Backend', 'Java', 'Kafka', 'Redis', 'MySQL', 'Spring Cloud', 'SpringBoot', 'React'],
    imageUrl: 'projects/lingchat-logo.png',
    link: 'https://github.com/DevWiles/LingChat',
  },
  {
  id: 'lingchat-client',
  title: '灵雀轻聊-LingChat-前端',
  description: '一个分布式的即时通讯系统的网页端，基于React框架实现。',
  techStack: ['Frontend', 'React', 'TypeScript', 'Vite', 'Tailwind CSS'],
  imageUrl: 'projects/lingchat-web.png',
  link: 'https://github.com/DevWiles/lingchat-web',
  }
]

