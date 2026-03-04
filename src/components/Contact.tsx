const Contact = () => {
  return (
    <section
      id="contact"
      className="bg-background px-4 py-20"
    >
      <div className="mx-auto max-w-5xl">
        <h2 className="text-2xl font-semibold text-white md:text-3xl">联系方式</h2>
        <p className="mt-3 text-sm text-gray-300 md:text-base">
          如果你对我的项目或经历感兴趣，欢迎通过以下方式联系我。
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <a
            href="mailto:your@email"
            className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-gray-200 transition hover:border-sky-400 hover:bg-white/10"
          >
            <p className="font-medium text-white">邮箱</p>
            <p className="mt-2 break-all text-xs text-gray-300">your@email</p>
          </a>
          <a
            href="https://github.com/your-github"
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-gray-200 transition hover:border-sky-400 hover:bg-white/10"
          >
            <p className="font-medium text-white">GitHub</p>
            <p className="mt-2 text-xs text-gray-300">github.com/your-github</p>
          </a>
          <a
            href="#"
            className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-gray-200 transition hover:border-sky-400 hover:bg-white/10"
          >
            <p className="font-medium text-white">其他社交媒体</p>
            <p className="mt-2 text-xs text-gray-300">例如 LinkedIn、微博等</p>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contact

