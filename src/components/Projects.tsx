import { projects } from '../data/projects'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import githubIcon from '../assets/contact/github.svg'

const Projects = () => {
  const { ref, isIntersecting, isExiting } = useIntersectionObserver<HTMLElement>({ threshold: 0.18, downwardOnly: true })
  return (
    <section
      id="projects"
      ref={ref}
      className={`bg-background px-4 py-20 transition-all duration-700 ease-out ${
        isExiting 
          ? 'animate-slide-fade-out' 
          : isIntersecting 
            ? 'animate-slide-fade-in opacity-100 translate-y-0' 
            : 'slide-fade-reset'
      }`}
    >
      <div className="mx-auto max-w-4xl">
        <header className="flex flex-col items-center text-center">
          <div>
            <h2 className="text-2xl font-semibold md:text-5xl">
              <span className="text-black">
                项
              </span>
              <span className="text-blue-500">
                目
              </span>
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-black md:text-base">
            这些项目体现了我日常依靠编程提高生产力和生活质量的经历，说不定也能帮到你。
            </p>
          </div>
        </header>

        <div className="mt-8 grid gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.id}
              className="group relative flex aspect-[30/52] w-[92%] flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-md shadow-black/40 transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/70"
            >
              <div className="relative flex-[0_0_33%] w-full overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0,transparent_40%,rgba(0,0,0,0.9)_100%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>

              <div className="relative flex flex-1 flex-col">
                <div className="flex-1 flex-col gap-2 p-4">
                  <h3 className="text-lg font-semibold text-black">{project.title}</h3>
                  <p className="text-sm text-gray-600">{project.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-gray-300 bg-white/10 px-2 py-0.5 text-xs text-black"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {project.link && project.link !== '#' && (
                  <div className="flex justify-end p-4 pt-0">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
                      aria-label="在 GitHub 查看项目"
                    >
                      <img
                        src={githubIcon}
                        alt="GitHub"
                        className="h-6 w-6 flex-shrink-0"
                      />
                    </a>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects

