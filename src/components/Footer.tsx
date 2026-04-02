const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <footer className="border-t border-gray-300 bg-background px-4 py-3">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 text-xs text-black md:flex-row">
        <p>© {new Date().getFullYear()} Wiles Portfolio. All rights reserved.</p>
        <p className="text-[11px] text-black">
            Guangdong University of Technology, Guangzhou, Guangdong, China
        </p>
        <button
          onClick={scrollToTop}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-500 transition hover:bg-blue-100 hover:text-blue-600"
          aria-label="返回顶部"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      </div>
    </footer>
  )
}

export default Footer

