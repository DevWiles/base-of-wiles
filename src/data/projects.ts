import { projectImages } from '../assets/images/projects'

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
    id: 'interview',
    title: '面试题复习系统',
    description:
      '从零独立开发并上线的面试备考工具。复习按艾宾浩斯遗忘曲线自动排期;模拟面试由 LLM 对照参考答案打分并指出漏答要点;另有选择题专项训练与错题本。右下角可进入演示站。',
    techStack: ['Full Stack', 'Java', 'Spring Boot', 'MySQL', 'Vue 3', 'LLM'],
    imageUrl: projectImages.interview,
    websiteUrl: 'https://demo.interview.devwiles.online/',
  },
  {
    id: 'portfolio',
    title: "Wiles's base",
    description:
      '开源的单页个人作品集，涵盖关于我、技能展示、项目卡片与联系方式，支持首屏动效与滚动渐显，已部署上线。',
    techStack: ['Frontend', 'React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    imageUrl: projectImages.portfolio,
    link: 'https://github.com/DevWiles/base-of-wiles',
    websiteUrl: 'https://portfolio.devwiles.online/',
  },
  {
    id: 'taoligo',
    title: '套利狗 · TaoliGo',
    description:
      '自托管的加密货币 USDT 永续合约套利数据看板，实时聚合 Binance、OKX、Bybit 等多交易所资金费率与跨所价差，并提供资产看板与飞书报警。项目已上线，如需体验，请联系我。',
    techStack: ['Backend', 'Node.js', 'Express', 'WebSocket', 'Crypto'],
    imageUrl: projectImages.taoligo,
    websiteUrl: 'https://taoligo.top/',
  },
  {
    id: 'lingchat-server',
    title: '灵雀轻聊-LingChat-后端',
    description: '一个分布式的即时通讯系统，基于 Spring Cloud、Spring Boot、Kafka、Redis、MySQL、React等技术实现。',
    techStack: ['Backend', 'Java', 'Kafka', 'Redis', 'MySQL', 'Spring Cloud', 'SpringBoot', 'React'],
    imageUrl: projectImages.lingchatLogo,
    link: 'https://github.com/DevWiles/LingChat',
  },
  {
    id: 'lingchat-client',
    title: '灵雀轻聊-LingChat-前端',
    description: '一个分布式的即时通讯系统的网页端，基于React框架实现。',
    techStack: ['Frontend', 'React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    imageUrl: projectImages.lingchatWeb,
    link: 'https://github.com/DevWiles/lingchat-web',
  },
]
