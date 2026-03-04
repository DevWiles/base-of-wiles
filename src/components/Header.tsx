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
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <span className="bg-gradient-to-r from-sky-400 to-purple-500 bg-clip-text text-lg font-semibold text-transparent">
          Wiles Portfolio
        </span>
        <nav className="hidden gap-6 text-sm text-gray-300 md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavClick(item.id)}
              className="transition-colors hover:text-white"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header

