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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-200 bg-transparent backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <span className="text-xl font-semibold">
          <span className="text-black">Wiles </span>
          <span className="text-blue-500">Portfolio</span>
        </span>
        <nav className="hidden gap-6 text-sm text-gray-700 md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavClick(item.id)}
              className="transition-colors hover:text-sky-400"
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

