import type { CSSProperties } from 'react'
import type { Project } from '../data/projects'
import { projects } from '../data/projects'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

// 动画延迟，配合 index.css 里的 --d 变量实现错落进场
const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties

const Arrow = () => (
  <svg
    className="h-4 w-4 transition-transform duration-300 ease-out group-hover/link:translate-x-1"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-6-6l6 6-6 6" />
  </svg>
)

// GitHub 图标（Simple Icons，CC0），用 currentColor 跟随文字颜色与黑夜模式
const GitHubIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
)

// 截图统一放进「浏览器窗口」或「终端窗口」里；悬浮时长截图在窗口内缓慢向下滚动
const BrowserFrame = ({ project, fromRight }: { project: Project; fromRight: boolean }) => {
  const terminal = project.frame === 'terminal'
  return (
    <div
      className={`browser-frame group/frame overflow-hidden rounded-xl border shadow-2xl shadow-slate-900/10 dark:shadow-black/40 ${
        terminal ? 'border-slate-700 bg-[#1b1f27]' : 'border-gray-200 bg-white dark:border-white/10 dark:bg-slate-900'
      } ${fromRight ? 'wipe-from-right' : ''}`}
      style={delay(200)}
    >
      <div
        className={`flex h-9 items-center gap-1.5 border-b px-4 ${terminal ? 'border-white/5 bg-[#252a33]' : 'border-gray-100 dark:border-white/5'}`}
      >
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span
          className={`mx-auto truncate rounded-md px-3 py-0.5 text-[11px] ${
            terminal ? 'font-mono text-gray-400' : 'bg-gray-100 text-gray-500 dark:bg-white/5 dark:text-gray-400'
          }`}
        >
          {project.displayUrl}
        </span>
        <span className="w-[46px]" aria-hidden="true" />
      </div>
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={project.imageUrl}
          alt={project.imageAlt}
          loading="lazy"
          className="h-full w-full object-cover object-left-top transition-[object-position] duration-[4000ms] ease-in-out group-hover/frame:object-left-bottom motion-reduce:transition-none"
        />
      </div>
    </div>
  )
}

const Projects = () => {
  // 只播放一次：进场后不再随滚动反复消失重播
  // 标题和每个项目各自观察进场：data-revealed 不能挂在整个 section 上，否则还没滚到的项目也会提前播完
  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.5,
    downwardOnly: true,
    triggerOnce: true,
  })

  return (
    <section id="projects" className="px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <div ref={ref} data-revealed={isIntersecting}>
          <h2 className="reveal-mask text-2xl font-semibold md:text-3xl">
            <span style={delay(0)}>
              <span className="text-black dark:text-gray-100">Selected</span> <span className="text-blue-500">Work</span>
            </span>
          </h2>
          <p className="fade-up mt-3 text-sm text-gray-600 dark:text-gray-400 md:text-base" style={delay(120)}>
            这些项目来自我日常用编程提高生产力的经历，说不定也能帮到你。
          </p>
        </div>

        <ol className="mt-8">
          {projects.map((project, i) => {
            const flipped = i % 2 === 1
            return (
              <li key={project.id} className="group">
                <ProjectRow project={project} index={i} flipped={flipped} />
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

// 每个项目单独观察进场，长列表里滚到哪播到哪
const ProjectRow = ({ project, index, flipped }: { project: Project; index: number; flipped: boolean }) => {
  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.25,
    downwardOnly: true,
    triggerOnce: true,
  })

  return (
    <div ref={ref} data-revealed={isIntersecting} className="relative grid items-center gap-8 py-12 md:grid-cols-12 md:gap-12">
      <span className="draw-line absolute inset-x-0 top-0 h-px bg-gray-200 dark:bg-white/10" aria-hidden="true" />
      <div className={`md:col-span-7 ${flipped ? 'md:order-last' : ''}`}>
        <BrowserFrame project={project} fromRight={flipped} />
      </div>

      <div className="md:col-span-5">
        <div className="fade-up flex items-baseline gap-4" style={delay(300)}>
          <span className="text-lg font-semibold tabular-nums text-gray-300 transition-colors duration-300 group-hover:text-blue-500 dark:text-gray-600">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-blue-500">{project.label}</span>
        </div>
        <h3 className="reveal-mask mt-2 text-2xl font-semibold text-black dark:text-gray-100">
          <span style={delay(380)}>{project.title}</span>
        </h3>
        <p className="fade-up mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400 md:text-base" style={delay(460)}>
          {project.summary}
        </p>
        <ul className="mt-4 space-y-2">
          {project.highlights.map((item, hi) => (
            <li
              key={item}
              className="fade-up flex gap-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300"
              style={delay(540 + hi * 80)}
            >
              <span className="mt-[0.6em] h-px w-3 shrink-0 bg-blue-500" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
        <p className="fade-up mt-5 text-xs font-medium tracking-wide text-gray-500 dark:text-gray-400" style={delay(800)}>
          {project.techStack.join(' · ')}
        </p>
        <div className="fade-up mt-6 flex flex-wrap gap-x-6 gap-y-2" style={delay(880)}>
          {project.websiteUrl && (
            <a
              href={project.websiteUrl}
              target="_blank"
              rel="noreferrer"
              className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-blue-500 hover:text-blue-600"
            >
              {project.websiteLabel ?? '访问网站'}
              <Arrow />
            </a>
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-black hover:text-blue-500 dark:text-gray-100"
              aria-label={project.linkLabel ? `${project.linkLabel}（GitHub）` : '在 GitHub 查看'}
              title={project.linkLabel ? `${project.linkLabel}（GitHub）` : '在 GitHub 查看'}
            >
              <GitHubIcon />
              {project.linkLabel}
              <Arrow />
            </a>
          )}
        </div>
        {project.note && (
          <p className="fade-up mt-4 text-[11px] leading-relaxed text-gray-400 dark:text-gray-500" style={delay(940)}>
            {project.note}
          </p>
        )}
      </div>
    </div>
  )
}

export default Projects
