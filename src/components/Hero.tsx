const Hero = () => {
  return (
    <section
      id="hero"
      className="flex min-h-screen items-center justify-center bg-gradient-to-b from-black via-background to-black px-4 pt-24"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-sky-400/80">
          Full Stack Developer
        </p>
        <h1 className="mt-4 text-4xl font-bold sm:text-5xl md:text-6xl">
          <span className="bg-gradient-to-r from-sky-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
            你好，我是
          </span>
          <span className="text-white"> Wiles</span>
        </h1>
        <p className="mt-6 text-base text-gray-300 sm:text-lg">
          我的主业是 JAVA 后端开发者，随着AI技术的发展，我得以开发不同语言、技术栈和需求的项目。我想通过博客把我的技能和经验分享给别人。
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="#projects"
            className="rounded-full bg-gradient-to-r from-sky-500 to-purple-500 px-6 py-2 text-sm font-medium text-white shadow-lg shadow-sky-500/30 transition hover:brightness-110"
          >
            查看项目
          </a>
          <a
            href="#contact"
            className="rounded-full border border-white/20 px-6 py-2 text-sm font-medium text-gray-200 transition hover:border-sky-400 hover:text-white"
          >
            联系我
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero

