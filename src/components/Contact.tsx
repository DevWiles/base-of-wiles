import gmailIcon from '../assets/gmail.svg'
import githubIcon from '../assets/github.svg'
import bilibiliIcon from '../assets/bilibili.svg'

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
            className="group relative flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-700 shadow-md shadow-black/10 transition-all duration-300 hover:scale-[1.02] hover:border-sky-400 hover:bg-gray-50 hover:shadow-xl hover:shadow-black/20"
          >
            <div>
              <p className="font-medium text-gray-900">Gmail</p>
              <p className="mt-2 break-all text-xs text-gray-600">
                {/* TODO: 替换成你的真实邮箱 */}
                your@gmail.com
              </p>
            </div>
            <img
              src={gmailIcon}
              alt="Gmail"
              className="h-8 w-8 flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
            />
          </a>
          <a
            href="https://github.com/your-github"
            target="_blank"
            rel="noreferrer"
            className="group relative flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-700 shadow-md shadow-black/10 transition-all duration-300 hover:scale-[1.02] hover:border-sky-400 hover:bg-gray-50 hover:shadow-xl hover:shadow-black/20"
          >
            <div>
              <p className="font-medium text-gray-900">GitHub</p>
              <p className="mt-2 text-xs text-gray-600">github.com/your-github</p>
            </div>
            <img
              src={githubIcon}
              alt="GitHub"
              className="h-8 w-8 flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
            />
          </a>
          <a
            href="https://space.bilibili.com/your-id"
            target="_blank"
            rel="noreferrer"
            className="group relative flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-700 shadow-md shadow-black/10 transition-all duration-300 hover:scale-[1.02] hover:border-sky-400 hover:bg-gray-50 hover:shadow-xl hover:shadow-black/20"
          >
            <div>
              <p className="font-medium text-gray-900">Bilibili</p>
              <p className="mt-2 text-xs text-gray-600">
                {/* TODO: 替换成你的 B 站主页链接或昵称 */}
                哔哩哔哩个人主页
              </p>
            </div>
            <img
              src={bilibiliIcon}
              alt="Bilibili"
              className="h-8 w-8 flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
            />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contact

