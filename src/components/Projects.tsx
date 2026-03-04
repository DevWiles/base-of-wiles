import { projects } from '../data/projects'

const Projects = () => {
  return (
    <section
      id="projects"
      className="bg-background px-4 py-20"
    >
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-col items-center text-center">
          <div>
            <h2 className="text-2xl font-semibold md:text-3xl">
              <span className="bg-gradient-to-r from-sky-400 to-purple-500 bg-clip-text text-transparent">
                有意思的项目
              </span>
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-gray-300 md:text-base">
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

              <div className="relative flex flex-1 flex-col gap-2 p-4 pr-10">
                <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                <p className="text-sm text-gray-300">{project.description}</p>
                <div className="mt-2 flex flex-wrap gap-3">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-gray-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {project.link && project.link !== '#' && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute bottom-3 right-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-gray-200 transition hover:bg-white/20 hover:text-white"
                    aria-label="在 GitHub 查看项目"
                  >
                    <svg
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                      className="h-4 w-4"
                    >
                      <path
                        fill="currentColor"
                        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
                        0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52
                        0-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
                        0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09
                        2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15
                        0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19
                        0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
                      />
                    </svg>
                  </a>
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

