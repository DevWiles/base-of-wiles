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
    title: '个人作品集网站',
    description: '使用 React、TypeScript 和 Tailwind CSS 构建的单页个人作品集网站。',
    techStack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    imageUrl: 'https://via.placeholder.com/600x360?text=Portfolio',
    link: 'https://github.com/your-github/portfolio',
  },
  {
    id: 'blog-platform',
    title: '技术博客平台',
    description: '支持 Markdown 撰写与标签分类的个人技术博客平台。',
    techStack: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    imageUrl: 'https://via.placeholder.com/600x360?text=Blog',
    link: 'https://github.com/your-github/blog-platform',
  },
  {
    id: 'dashboard',
    title: '数据可视化后台面板',
    description: '整合多种图表组件的可视化数据看板，用于监控业务指标。',
    techStack: ['React', 'TypeScript', 'ECharts', 'Tailwind CSS'],
    imageUrl: 'https://via.placeholder.com/600x360?text=Dashboard',
    link: 'https://github.com/your-github/dashboard',
  },
  {
    id: 'todo-app',
    title: '跨端待办应用',
    description: '支持多设备同步与标签管理的待办事项应用。',
    techStack: ['React', 'TypeScript', 'PWA', 'Firebase'],
    imageUrl: 'https://via.placeholder.com/600x360?text=Todo+App',
    link: 'https://github.com/your-github/todo-app',
  },
  {
    id: 'design-system',
    title: '前端组件库 / Design System',
    description: '基于 Tailwind CSS 封装的可复用前端组件库，统一项目视觉规范。',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Storybook'],
    imageUrl: 'https://via.placeholder.com/600x360?text=Design+System',
    link: 'https://github.com/your-github/design-system',
  },
  {
    id: 'api-service',
    title: 'RESTful API 服务',
    description: '为前端应用提供统一数据接口的后端服务，包含认证与权限控制。',
    techStack: ['Java', 'Spring Boot', 'MySQL', 'Docker'],
    imageUrl: 'https://via.placeholder.com/600x360?text=API+Service',
    link: 'https://github.com/your-github/api-service',
  },
]

