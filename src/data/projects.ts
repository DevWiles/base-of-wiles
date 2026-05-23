export type Project = {
  id: string
  title: string
  description: string
  techStack: string[]
  imageUrl: string
  link?: string
  websiteUrl?: string
}

export const projects: Project[] = [
  {
    id: 'portfolio',
    title: "Wiles's base",
    description: '利用Vibe Coding技术，使用 React、TypeScript 和 Tailwind CSS 构建的单页个人作品集网站。',
    techStack: ['Frontend', 'React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    imageUrl: '/projects/portfolio.png',
    link: 'https://github.com/DevWiles/base-of-wiles',
  },
  {
    id: 'taoligo',
    title: '套利狗 · TaoliGo',
    description:
      '自托管的加密货币 USDT 永续合约套利数据看板，实时聚合 Binance、OKX、Bybit 等多交易所资金费率与跨所价差，并提供资产看板与飞书报警。项目已上线，采用 Google 登录与白名单访问，不开源。如需体验，请联系我。',
    techStack: ['Backend', 'Node.js', 'Express', 'WebSocket', 'Crypto'],
    imageUrl: '/projects/taoligo.png',
    websiteUrl: 'https://taoligo.top/',
  },
  {
    id: 'lingchat-server',
    title: '灵雀轻聊-LingChat-后端',
    description: '一个分布式的即时通讯系统，基于 Spring Cloud、Spring Boot、Kafka、Redis、MySQL、React等技术实现。',
    techStack: ['Backend', 'Java', 'Kafka', 'Redis', 'MySQL', 'Spring Cloud', 'SpringBoot', 'React'],
    imageUrl: '/projects/lingchat-logo.png',
    link: 'https://github.com/DevWiles/LingChat',
  },
  {
    id: 'lingchat-client',
    title: '灵雀轻聊-LingChat-前端',
    description: '一个分布式的即时通讯系统的网页端，基于React框架实现。',
    techStack: ['Frontend', 'React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    imageUrl: '/projects/lingchat-web.png',
    link: 'https://github.com/DevWiles/lingchat-web',
  },
]

