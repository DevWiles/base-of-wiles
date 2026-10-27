import type { CSSProperties } from 'react'
import { useRef, useState } from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

// 动画延迟，配合 index.css 里的 --d 变量实现错落进场
const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties

const EMAIL = 'nathan.demon66@gmail.com'

// 品牌图标（Simple Icons，CC0），用 currentColor 跟随文字颜色与黑夜模式
const BrandIcon = ({ d, className = 'h-3.5 w-3.5' }: { d: string; className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d={d} />
  </svg>
)

const ICONS = {
  gmail: 'M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z',
  github: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
  bilibili: 'M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373Z',
}

const ArrowUpRight = () => (
  <svg
    className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M9 7h8v8" />
  </svg>
)

// 复制邮箱：成功后原地显示「已复制」，1.6 秒后复原
const useCopyEmail = () => {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), 1600)
    } catch (err) {
      console.error('复制失败:', err)
    }
  }
  return { copied, copy }
}

type CopyProps = { copied: boolean; onCopy: () => void }

const Header = () => (
  <>
    <h2 className="reveal-mask text-2xl font-semibold md:text-3xl">
      <span style={delay(0)}>
        <span className="text-black dark:text-gray-100">Get in</span> <span className="text-blue-500">Touch</span>
      </span>
    </h2>
    <p className="fade-up mt-3 text-sm text-gray-600 dark:text-gray-400 md:text-base" style={delay(120)}>
      如果你对我的项目或经历感兴趣，欢迎联系我。
    </p>
  </>
)

// 三栏细线：上下两条横线、栏间竖线分隔，不用卡片
const ContactColumns = ({ copied, onCopy }: CopyProps) => {
  const columns = [
    { key: 'email', label: 'Email', icon: ICONS.gmail, value: EMAIL, hint: copied ? '已复制 ✓' : '点击复制' },
    { key: 'github', label: 'GitHub', icon: ICONS.github, value: '@DevWiles', href: 'https://github.com/DevWiles' },
    { key: 'bilibili', label: 'Bilibili', icon: ICONS.bilibili, value: '@Air_Chairman', href: 'https://b23.tv/bi25Af4' },
  ]

  return (
    <>
      <Header />
      <div className="relative mt-8">
        <span className="draw-line absolute inset-x-0 top-0 h-px bg-gray-200 dark:bg-white/10" style={delay(250)} aria-hidden="true" />
        <span className="draw-line absolute inset-x-0 bottom-0 h-px bg-gray-200 dark:bg-white/10" style={delay(350)} aria-hidden="true" />
        <div className="grid divide-y divide-gray-200 dark:divide-white/10 md:grid-cols-3 md:divide-x md:divide-y-0">
          {columns.map((col, i) => {
            const body = (
              <>
                <span className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-blue-500">
                  <BrandIcon d={col.icon} />
                  {col.label}
                </span>
                <span className="mt-3 flex items-start justify-between gap-3">
                  <span className="relative break-all text-lg font-semibold text-black transition-colors duration-300 group-hover:text-blue-500 dark:text-gray-100">
                    {col.value}
                    <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-blue-500 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                  </span>
                  {col.href && (
                    <span className="mt-1 shrink-0 text-gray-400 transition-colors group-hover:text-blue-500">
                      <ArrowUpRight />
                    </span>
                  )}
                </span>
                {col.hint && <span className={`mt-3 block text-xs transition-colors ${copied ? 'text-emerald-500' : 'text-gray-400'}`}>{col.hint}</span>}
              </>
            )
            const cls = 'group fade-up block py-6 text-left md:px-8 md:first:pl-0 md:last:pr-0'
            return col.href ? (
              <a key={col.key} href={col.href} target="_blank" rel="noreferrer" className={cls} style={delay(400 + i * 120)}>
                {body}
              </a>
            ) : (
              <button key={col.key} type="button" onClick={onCopy} className={cls} style={delay(400 + i * 120)}>
                {body}
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}

const Contact = () => {
  // 只播放一次：进场后不再随滚动反复消失重播
  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.2, downwardOnly: true, triggerOnce: true })
  const { copied, copy } = useCopyEmail()

  return (
    <section id="contact" className="px-4 py-20">
      <div ref={ref} data-revealed={isIntersecting} className="mx-auto max-w-5xl">
        <ContactColumns copied={copied} onCopy={copy} />
      </div>
    </section>
  )
}

export default Contact
