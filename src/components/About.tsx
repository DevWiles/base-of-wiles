import profileImage from '../assets/profile.jpg'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const About = () => {
  const { ref, isIntersecting } = useIntersectionObserver<HTMLElement>({ threshold: 0.1 })
  return (
    <section
      id="about"
      ref={ref}
      className={`bg-background px-4 py-20 transition-all duration-700 ease-out ${
        isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="mx-auto flex max-w-5xl flex-col-reverse items-center gap-10 md:flex-row md:items-start md:justify-between">
        <div className="flex w-full flex-col justify-center md:w-2/3">
          <h2 className="text-center text-2xl font-semibold md:text-3xl">
            <span className="bg-gradient-to-r from-sky-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-gray-300 md:text-base">
          🎓 毕业于广东工业大学，具备扎实的计算机基础与工程实践能力，专注于 Java 后端开发方向，熟悉面向对象设计思想与常见设计模式。
          </p>
          <p className="mt-4 text-sm leading-relaxed text-gray-300 md:text-base">
          💻 熟练使用 Spring Boot、MyBatis、MySQL 等技术构建稳定、高可维护的后端服务，理解 JVM 运行机制、垃圾回收与并发编程模型，具备良好的系统性能与稳定性意识。同时具备一定的前端与全栈开发经验，能够从业务需求出发，独立完成系统功能设计与落地实现。
          </p>
          <p className="mt-4 text-sm leading-relaxed text-gray-300 md:text-base">
          🚀 关注系统架构与工程质量，擅长将复杂业务需求转化为清晰、可扩展的技术方案，致力于打造稳定、高性能、易维护的企业级应用系统。
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href="#contact"
              className="rounded-full bg-gradient-to-r from-sky-500 to-purple-500 px-6 py-2.5 text-sm font-medium text-white shadow-md shadow-sky-500/30 transition hover:brightness-110"
            >
              联系我
            </a>
            <a
              href="/resume.pdf"
              download
              className="rounded-full border border-white/30 px-6 py-2.5 text-sm font-medium text-gray-200 transition hover:border-sky-400 hover:text-white"
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

