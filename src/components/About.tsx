import profileImage from '../assets/about/profile.jpg'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const About = () => {
  const { ref, isIntersecting, isExiting } = useIntersectionObserver<HTMLElement>({ threshold: 0.10, downwardOnly: true })
  return (
    <section
      id="about"
      ref={ref}
      className={`bg-background px-4 py-20 transition-all duration-700 ease-out ${
        isExiting 
          ? 'animate-slide-fade-out' 
          : isIntersecting 
            ? 'animate-slide-fade-in opacity-100 translate-y-0' 
            : 'slide-fade-reset'
      }`}
    >
      <div className="mx-auto flex max-w-5xl flex-col-reverse items-center gap-10 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full flex-col justify-center md:w-2/3">
          <h2 className="text-center text-2xl font-semibold md:text-3xl">
            <span className="text-black">About</span> <span className="text-blue-500">Me</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-black md:text-base">
            👩‍💻 软件工程师出身，专注后端系统与工程架构，并在 AI 加持下成为全栈工程师。具备从设计到落地的完整开发能力，习惯用工程思维解决复杂问题。
          </p>
          <p className="mt-4 text-sm leading-relaxed text-black md:text-base">
            🔥 Web3 Builder，长期关注区块链与去中心化技术，理解链上机制与生态演进，倾向于从实际应用出发探索可落地的产品形态，活跃于一级、二级市场。
          </p>
          <p className="mt-4 text-sm leading-relaxed text-black md:text-base">
            💵 保持学习的金融交易员，理解市场运行逻辑与交易本质，在波动与不确定中形成对风险、节奏与执行的判断能力。
          </p>
          <p className="mt-4 text-sm leading-relaxed text-black md:text-base">
            在工程、链上世界与市场之间建立连接，用技术构建系统，用认知参与周期，持续迭代自己的边界与能力。
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href="#contact"
              className="rounded-full bg-blue-500 px-6 py-2 text-sm font-medium text-white shadow-lg shadow-blue-500/30 transition hover:brightness-110"
            >
              联系我
            </a>
            <a
              href="/resume.pdf"
              download
              className="rounded-full border border-white/20 bg-black px-6 py-2 text-sm font-medium text-gray-200 transition hover:bg-gray-800"
            >
              下载 PDF 简介
            </a>
          </div>
        </div>
        <div className="flex w-full items-center justify-center md:w-1/3">
          <div className="aspect-square w-2/3 max-w-xs overflow-hidden rounded-full border border-white/20 bg-black/40 shadow-lg shadow-purple-500/30 md:w-full">
            <img
              src={profileImage}
              alt="个人头像"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

