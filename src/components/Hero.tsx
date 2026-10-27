import type { CSSProperties, PointerEvent } from 'react'
import HeroDecor from './HeroDecor'

// 鼠标位置写进 CSS 变量，柔光与亮起的点阵跟着走
const trackPointer = (e: PointerEvent<HTMLElement>) => {
  const rect = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
}

// 进场延迟，配合 index.css 里的 .hero-rise
const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties

const Hero = () => {
  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden px-4 pt-24 pb-0" onPointerMove={trackPointer}>
      <HeroDecor />

      <div className="relative mx-auto w-full max-w-5xl">
        <p className="hero-rise flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.25em] text-blue-500" style={delay(100)}>
          <span className="h-px w-8 bg-blue-500" />
          Full Stack · AI Engineer · Trader
        </p>
        <h1
          className="hero-rise mt-6 text-5xl font-bold leading-[1.1] tracking-tight text-black dark:text-gray-100 sm:text-6xl md:text-7xl"
          style={delay(250)}
        >
          你好，我是 <span className="text-blue-500">Wiles</span>
        </h1>
        <p className="hero-rise mt-6 max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-400 md:text-lg" style={delay(450)}>
          专注后端开发，熟悉 Java、Python 等主流语言；钻研金融交易策略，活跃在加密市场。在 AI 赋能下，努力成长为优秀的软件工程师和金融交易员。
        </p>
        <div className="hero-rise mt-8 flex flex-wrap gap-4" style={delay(650)}>
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:brightness-110"
          >
            查看项目
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-6-6l6 6-6 6" />
            </svg>
          </a>
          <a
            href="#contact"
            className="rounded-full border border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-800 transition hover:border-blue-500 hover:text-blue-500 dark:border-white/20 dark:text-gray-200"
          >
            联系我
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 mx-auto flex w-fit animate-bounce flex-col items-center gap-1">
        <span className="text-sm text-black dark:text-gray-100">Scroll</span>
        <svg
          className="h-6 w-6 text-blue-500"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  )
}

export default Hero
