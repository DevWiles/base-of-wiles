import profileImage from '../assets/about/profile.jpg'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const About = () => {
  const { ref, isIntersecting, isExiting } = useIntersectionObserver<HTMLElement>({ threshold: 0.25, downwardOnly: true })
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
            <span className="bg-gradient-to-r from-sky-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-gray-300 md:text-base">
            🎓 毕业于广东工业大学自动化专业，在校期间系统学习了数据结构、算法设计、操作系统、计算机网络等核心课程，奠定了扎实的理论基础。获得过校级奖学金，并参与大学生创新创业训练计划项目，做过深度学习相关科研，具备良好的学习能力和实践精神。
          </p>
          <p className="mt-4 text-sm leading-relaxed text-gray-300 md:text-base">
            💻 专注于 Java 后端开发领域，拥有 2 年以上的实际项目开发经验。熟练掌握 Spring Boot、Spring Web、MyBatis、JPA 等主流框架，能够独立设计和搭建微服务架构。深入理解 JVM 内存模型、类加载机制、垃圾回收算法以及性能调优方法，能够在实际项目中运用多线程、并发编程技术解决复杂问题。
          </p>
          <p className="mt-4 text-sm leading-relaxed text-gray-300 md:text-base">
            🗄️ 在数据库方面，熟练使用 MySQL、PostgreSQL 等关系型数据库，掌握索引优化、查询优化、事务隔离级别等核心技术。同时熟悉 Redis、MongoDB 等 NoSQL 数据库，能够根据业务场景选择合适的存储方案。具备分布式系统设计经验，了解 CAP 理论、BASE 理论，实践过分布式锁、分布式事务、消息队列等技术方案。
          </p>
          <p className="mt-4 text-sm leading-relaxed text-gray-300 md:text-base">
            🚀 关注软件工程质量和系统架构设计，擅长将复杂的业务需求转化为清晰、可扩展、易维护的技术方案。熟悉 DDD（领域驱动设计）思想，能够运用分层架构、六边形架构等设计模式构建高质量的企业级应用。注重代码规范，习惯编写单元测试和集成测试，确保系统的稳定性和可靠性。
          </p>
          <p className="mt-4 text-sm leading-relaxed text-gray-300 md:text-base">
            🌐 具备一定的全栈开发能力，熟悉 Vue.js、React 等前端框架，了解 HTML5、CSS3、JavaScript/TypeScript 等前端技术。能够独立完成从需求分析、系统设计、编码实现到部署运维的完整开发流程。对 DevOps 文化有深入理解，熟练使用 Git、Maven、Docker、Kubernetes 等工具，具备 CI/CD 流水线搭建和维护经验。
          </p>
          <p className="mt-4 text-sm leading-relaxed text-gray-300 md:text-base">
            💡 热爱技术，保持持续学习的态度，关注行业最新技术动态。平时喜欢在 GitHub 上参与开源项目，在技术博客上分享学习心得。具备良好的团队协作精神和沟通能力，能够快速融入团队并为项目贡献力量。期待与有志之士一起，用技术创造价值，打造优秀的产品。
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

