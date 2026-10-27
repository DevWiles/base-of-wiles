import { projectImages } from '../assets/images/projects'

export type Project = {
  id: string
  title: string
  label: string // 标题旁的英文小标签
  summary: string
  highlights: string[]
  techStack: string[]
  imageUrl: string
  imageAlt: string
  // 截图外框：浏览器窗口（默认）或终端窗口
  frame?: 'browser' | 'terminal'
  // 窗口标题栏里显示的地址或标题
  displayUrl: string
  websiteUrl?: string
  websiteLabel?: string
  link?: string
  linkLabel?: string
  note?: string // 卡片底部的小字说明，如二次开发声明
}

export const projects: Project[] = [
  {
    id: 'myagent',
    title: 'myagent 编程智能体',
    label: 'AI Agent · From Scratch',
    summary: '从零手写的命令行 coding agent，不依赖任何 agent 框架，把 agent 到底怎么转起来的彻底搞清楚。',
    highlights: [
      'ReAct 循环、工具调用、流式渲染、权限审批与审计落盘全部自己实现',
      '多 agent 流水线：scout 拆方案、worker 并行施工、reviewer 验收不过可打回重做',
      '前后端经 WebSocket 协议解耦，手机端通过端到端加密的中继远程审批',
    ],
    techStack: ['Java 17', 'OpenTUI / SolidJS', 'Kotlin', 'WebSocket', 'LLM'],
    imageUrl: projectImages.myagent,
    imageAlt: 'myagent 终端界面的启动画面',
    frame: 'terminal',
    displayUrl: '~/shopcart — myagent',
    link: 'https://github.com/DevWiles/myagent',
    linkLabel: 'GitHub',
  },
  {
    id: 'interview',
    title: 'ReTalk 面试题复习系统',
    label: 'AI · Full Stack',
    summary: '从零独立开发并上线的面试备考工具，把「背题」变成有节奏的复习。',
    highlights: [
      '按艾宾浩斯遗忘曲线自动排期，每天只复习该复习的题',
      '模拟面试由 LLM 对照参考答案打分，并指出漏答要点',
      '选择题专项训练与错题本，掌握度分布一目了然',
    ],
    techStack: ['Java', 'Spring Boot', 'MySQL', 'Vue 3', 'LLM'],
    imageUrl: projectImages.interview,
    imageAlt: 'ReTalk 面试题复习系统的概览页截图',
    displayUrl: 'demo.interview.devwiles.online',
    websiteUrl: 'https://demo.interview.devwiles.online/',
    websiteLabel: '体验演示站',
  },
  {
    id: 'recode',
    title: 'ReCode 算法刷题复习',
    label: 'Full Stack · SRS',
    summary: '基于开源项目 ReCode 二次开发，把单机的刷题间隔复习工具改造成多用户在线版。',
    highlights: [
      '新增登录鉴权、登录审计与多用户数据隔离，管理员可为朋友开号',
      '多解法挑战模式：随机抽题，逐个回忆每种解法并自评',
      'GitHub Actions 自动部署，数据库迁移前自动备份',
    ],
    techStack: ['Next.js', 'Prisma', 'SQLite', 'Tailwind CSS'],
    imageUrl: projectImages.recode,
    imageAlt: 'ReCode 演示站的首页截图',
    displayUrl: 'demo.recode.devwiles.online',
    websiteUrl: 'https://demo.recode.devwiles.online/',
    websiteLabel: '一键体验演示站',
    link: 'https://github.com/CoisiniIce/ReCode',
    linkLabel: '原项目 GitHub',
    note: '原项目作者 CoisiniIce，仅作个人学习展示，无商业用途；如有侵权请联系下架。',
  },
  {
    id: 'taoligo',
    title: '套利狗 TaoliGo',
    label: 'Crypto · Realtime',
    summary: '自托管的加密货币 USDT 永续合约套利数据看板。',
    highlights: [
      '实时聚合 Binance、OKX、Bybit 等多家交易所的资金费率与跨所价差',
      '行情走 WebSocket 实时推送，价差触发阈值时飞书报警',
      '附带资产看板，已上线自用；如需体验，请联系我',
    ],
    techStack: ['Node.js', 'Express', 'WebSocket'],
    imageUrl: projectImages.taoligo,
    imageAlt: '套利狗 TaoliGo 的价差套利监控页截图',
    displayUrl: 'taoligo.top',
    websiteUrl: 'https://taoligo.top/',
    websiteLabel: '访问网站',
  },
]
