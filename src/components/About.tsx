import type { CSSProperties, ReactNode } from 'react'
import profileImage from '../assets/images/about/profile.jpg'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

// 动画延迟，配合 index.css 里的 --d 变量实现错落进场
const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties

const Marker = ({ children, at }: { children: ReactNode; at: number }) => (
  <span className="marker" style={delay(at)}>
    {children}
  </span>
)

// 宣言逐行升起，每行包在遮罩里
const manifesto: ReactNode[] = [
  <>在工程、链上世界与市场之间建立<Marker at={750}>连接</Marker>，</>,
  <>用技术构建<Marker at={850}>系统</Marker>，用认知参与<Marker at={950}>周期</Marker>，</>,
  <>持续迭代自己的边界与能力。</>,
]

const identities = [
  {
    no: '01',
    label: 'Engineer',
    title: '软件工程师',
    desc: '专注后端系统与工程架构，在 AI 加持下成为全栈，具备从设计到落地的完整开发能力。',
  },
  {
    no: '02',
    label: 'Web3 Builder',
    title: '链上建设者',
    desc: '长期关注区块链与去中心化技术，探索可落地的链上产品，活跃于一级、二级市场。',
  },
  {
    no: '03',
    label: 'Trader',
    title: '金融交易员',
    desc: '理解市场运行逻辑与交易本质，在波动与不确定中锤炼对风险、节奏与执行的判断。',
  },
]

const About = () => {
  // 只播放一次：进场后不再随滚动反复消失重播
  const { ref, isIntersecting } = useIntersectionObserver<HTMLElement>({ threshold: 0.2, downwardOnly: true, triggerOnce: true })

  return (
    <section id="about" ref={ref} data-revealed={isIntersecting} className="bg-background px-4 py-20">
      <div className="mx-auto flex max-w-5xl flex-col-reverse items-center gap-12 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full flex-col md:w-2/3">
          <h2 className="reveal-mask text-2xl font-semibold md:text-3xl">
            <span style={delay(0)}>
              <span className="text-black dark:text-gray-100">About</span> <span className="text-blue-500">Me</span>
            </span>
          </h2>

          <p className="mt-6 text-xl font-semibold leading-snug text-black dark:text-gray-100 md:text-2xl">
            {manifesto.map((line, i) => (
              <span key={i} className="reveal-mask">
                <span style={delay(120 + i * 110)}>{line}</span>
              </span>
            ))}
          </p>

          <ul className="mt-8">
            {identities.map((item, i) => (
              <li key={item.no} className="group relative">
                <span
                  className="draw-line absolute inset-x-0 top-0 h-px bg-gray-200 dark:bg-white/10"
                  style={delay(500 + i * 120)}
                  aria-hidden="true"
                />
                <div className="fade-up flex gap-5 py-4 md:gap-8" style={delay(560 + i * 120)}>
                  <span className="w-8 shrink-0 pt-0.5 text-lg font-semibold tabular-nums text-gray-300 transition-colors duration-300 group-hover:text-blue-500 dark:text-gray-600">
                    {item.no}
                  </span>
                  <div className="min-w-0">
                    <p className="flex flex-wrap items-baseline gap-x-3">
                      <span className="text-base font-semibold text-black dark:text-gray-100">{item.title}</span>
                      <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-blue-500 transition-transform duration-300 ease-out group-hover:translate-x-1">
                        {item.label}
                      </span>
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{item.desc}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="fade-up mt-8 flex flex-wrap gap-4" style={delay(950)}>
            <a
              href="#contact"
              className="rounded-full bg-blue-500 px-6 py-2 text-sm font-medium text-white shadow-lg shadow-blue-500/30 transition hover:brightness-110"
            >
              联系我
            </a>
            <a
              href="/resume.pdf"
              download
              className="rounded-full border border-white/20 bg-black px-6 py-2 text-sm font-medium text-gray-200 transition hover:bg-gray-800 dark:bg-slate-800 dark:hover:bg-slate-700"
            >
              下载 PDF 简介
            </a>
          </div>
        </div>

        <div className="fade-up flex w-full items-center justify-center md:w-1/3" style={delay(200)}>
          <div className="aspect-square w-2/3 max-w-xs overflow-hidden rounded-full border border-white/20 bg-black/40 shadow-lg shadow-purple-500/30 md:w-full">
            <img src={profileImage} alt="个人头像" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
