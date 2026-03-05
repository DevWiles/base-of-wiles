import gmailIcon from '../assets/gmail.svg'
import githubIcon from '../assets/github.svg'
import bilibiliIcon from '../assets/bilibili.svg'
import { useState } from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const Contact = () => {
  const { ref, isIntersecting } = useIntersectionObserver<HTMLElement>({ threshold: 0.1 })
  const [showToast, setShowToast] = useState(false)
  const [isFadingOut, setIsFadingOut] = useState(false)

  const handleEmailClick = async () => {
    const email = 'nathan.demon66@gmail.com'
    try {
      await navigator.clipboard.writeText(email)
      setShowToast(true)
      setIsFadingOut(false)
      // 1.8 秒后开始淡出动画
      setTimeout(() => {
        setIsFadingOut(true)
        // 等待淡出动画完成后隐藏
        setTimeout(() => setShowToast(false), 300)
      }, 1200)
    } catch (err) {
      console.error('复制失败:', err)
    }
  }

  return (
    <section
      id="contact"
      ref={ref}
      className={`bg-background px-4 py-20 relative transition-all duration-700 ease-out ${
        isIntersecting ? 'animate-slide-fade-in opacity-100 translate-y-0' : 'slide-fade-reset'
      }`}
    >
      <div className="mx-auto max-w-5xl">
        <h2 className="text-2xl font-semibold text-white md:text-3xl">联系方式</h2>
        <p className="mt-3 text-sm text-gray-300 md:text-base">
          如果你对我的项目或经历感兴趣，欢迎通过以下方式联系我。
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <a
            onClick={handleEmailClick}
            className="group relative flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-700 shadow-md shadow-black/10 transition-all duration-300 hover:scale-[1.02] hover:border-sky-400 hover:bg-gray-50 hover:shadow-xl hover:shadow-black/20 cursor-pointer"
          >
            <div>
              <p className="font-medium text-gray-900">Gmail</p>
              <p className="mt-2 break-all text-xs text-gray-600">
                nathan.demon66@gmail.com
              </p>
            </div>
            <img
              src={gmailIcon}
              alt="Gmail"
              className="h-8 w-8 flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
            />
          </a>
          <a
            href="https://github.com/DevWiles"
            target="_blank"
            rel="noreferrer"
            className="group relative flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-700 shadow-md shadow-black/10 transition-all duration-300 hover:scale-[1.02] hover:border-sky-400 hover:bg-gray-50 hover:shadow-xl hover:shadow-black/20"
          >
            <div>
              <p className="font-medium text-gray-900">GitHub</p>
              <p className="mt-2 text-xs text-gray-600">@DevWiles</p>
            </div>
            <img
              src={githubIcon}
              alt="GitHub"
              className="h-8 w-8 flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
            />
          </a>
          <a
            href="https://b23.tv/bi25Af4"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-700 shadow-md shadow-black/10 transition-all duration-300 hover:scale-[1.02] hover:border-sky-400 hover:bg-gray-50 hover:shadow-xl hover:shadow-black/20"
          >
            <div>
              <p className="font-medium text-gray-900">Bilibili</p>
              <p className="mt-2 text-xs text-gray-600">
                @Air_Chairman
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

      {/* Toast 提示 */}
      {showToast && (
        <div className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${isFadingOut ? 'animate-quick-fade-out opacity-0' : 'opacity-100'}`}>
          <div className="bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>邮箱地址已复制</span>
          </div>
        </div>
      )}
    </section>
  )
}

export default Contact

