import { useEffect, useState } from 'react'

const Hero = () => {
  const [titleAnimated, setTitleAnimated] = useState(false)
  const [contentVisible, setContentVisible] = useState(false)

  useEffect(() => {
    // 页面加载时触发标题动画
    setTitleAnimated(true)
    
    // 在标题动画结束后（约 2.3 秒），显示简介和按钮
    const timer = setTimeout(() => {
      setContentVisible(true)
    }, 1600)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-between bg-background px-4 pt-24 pb-0"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p 
          className={`text-sm uppercase tracking-[0.3em] text-black transition-all duration-1000 ease-out transform ${
            contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        >
          Full Stack Developer
        </p>
        <h1 className="mt-4 text-4xl font-bold sm:text-5xl md:text-6xl">
          <span
            className={`text-blue-500 transition-all duration-1000 ease-out ${
              titleAnimated ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: titleAnimated ? '600ms' : '100ms' }}
          >
            你好，
          </span>
          <span
            className={`text-blue-500 transition-all duration-700 ease-out ${
              titleAnimated ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: titleAnimated ? '900ms' : '100ms' }}
          >
            我
          </span>
          <span
            className={`text-blue-500 transition-all duration-700 ease-out ${
              titleAnimated ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: titleAnimated ? '1000ms' : '100ms' }}
          >
            是
          </span>
          <span
            className={`text-black transition-all duration-1500 ease-out ${
              titleAnimated ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: titleAnimated ? '1300ms' : '100ms' }}
          >
            Wiles
          </span>
        </h1>
        <p 
          className={`mt-6 text-lg font-medium text-black sm:text-xl transition-all duration-1000 ease-out transform ${
            contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          “专注于后端开发，熟悉 Java、Python等主流语言，在 AI Agent 的赋能下，努力成长为一个全栈开发者，享受创造的美好”
        </p>
        <div 
          className={`mt-4 flex flex-wrap justify-center gap-4 transition-all duration-1000 ease-out delay-300 transform ${
            contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <a
            href="#projects"
            className="rounded-full bg-blue-500 px-6 py-2 text-sm font-medium text-white shadow-lg shadow-blue-500/30 transition hover:brightness-110"
          >
            查看项目
          </a>
          <a
            href="#contact"
            className="rounded-full border border-white/20 bg-black px-6 py-2 text-sm font-medium text-gray-200 transition hover:bg-gray-800"
          >
            联系我
          </a>
        </div>
      </div>
      <div className="absolute bottom-8 left-0 right-0 mx-auto flex w-fit flex-col items-center gap-1 animate-bounce">
        <span className="text-sm text-black">Scroll</span>
        <svg
            className="h-6 w-6 text-blue-500"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  )
}

export default Hero

