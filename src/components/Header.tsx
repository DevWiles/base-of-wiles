import { useTheme } from '../hooks/useTheme'

type HeaderProps = {
  onNavClick: (sectionId: string) => void
}

const navItems = [
  { id: 'hero', label: '首页' },
  { id: 'about', label: '关于我' },
  { id: 'skills', label: '我的技能' },
  { id: 'projects', label: '项目展示' },
  { id: 'contact', label: '联系方式' },
]

const Header = ({ onNavClick }: HeaderProps) => {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-200 bg-transparent backdrop-blur dark:border-white/10">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <span className="text-xl font-semibold">
          <span className="text-black dark:text-gray-100">Wiles </span>
          <span className="text-blue-500">Portfolio</span>
        </span>
        <div className="flex items-center gap-6">
          <nav className="hidden gap-6 text-sm text-gray-700 dark:text-gray-300 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavClick(item.id)}
                // 悬浮时下划线从左往右画出，移开时向右收回
                className="relative py-1 transition-colors duration-200 hover:text-blue-500 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-right after:scale-x-0 after:rounded-full after:bg-blue-500 after:transition-transform after:duration-300 after:ease-out hover:after:origin-left hover:after:scale-x-100 focus-visible:after:origin-left focus-visible:after:scale-x-100 motion-reduce:after:transition-none"
              >
                {item.label}
              </button>
            ))}
          </nav>
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-700 transition hover:bg-black/5 hover:text-blue-500 dark:text-gray-300 dark:hover:bg-white/10"
            aria-label={isDark ? '切换到白天模式' : '切换到黑夜模式'}
            title={isDark ? '切换到白天模式' : '切换到黑夜模式'}
          >
            {isDark ? (
              // 太阳
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              // 月亮
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
