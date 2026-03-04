const About = () => {
  return (
    <section
      id="about"
      className="bg-background px-4 py-20"
    >
      <div className="mx-auto flex max-w-5xl flex-col-reverse items-center gap-10 md:flex-row md:items-center md:justify-between">
        <div className="w-full md:w-2/3">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">关于我</h2>
          <p className="mt-4 text-sm leading-relaxed text-gray-300 md:text-base">
            我是一名前端开发工程师，专注于使用 React、TypeScript 和现代前端工程化工具构建高质量 Web
            应用。关注用户体验、性能与可维护性，希望通过代码创造有温度的产品。
          </p>
          <p className="mt-3 text-sm leading-relaxed text-gray-400 md:text-base">
            在项目中，我喜欢通过组件化设计、良好的状态管理和合理的动画效果，让页面既简洁克制，又不失细节打磨。
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="rounded-full bg-gradient-to-r from-sky-500 to-purple-500 px-6 py-2 text-sm font-medium text-white shadow-lg shadow-sky-500/30 transition hover:brightness-110"
            >
              联系我
            </a>
            <a
              href="/resume.pdf"
              download
              className="rounded-full border border-white/20 px-6 py-2 text-sm font-medium text-gray-200 transition hover:border-sky-400 hover:text-white"
            >
              下载 PDF 简介
            </a>
          </div>
        </div>
        <div className="flex w-40 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-sky-500/40 via-purple-500/40 to-pink-500/40 shadow-lg shadow-purple-500/30 md:w-1/3">
          <div className="aspect-square w-32 rounded-full border border-white/40 bg-black/60 md:w-40" />
        </div>
      </div>
    </section>
  )
}

export default About

