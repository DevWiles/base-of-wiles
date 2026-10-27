import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Backdrop from './components/Backdrop'

const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const App = () => {
  return (
    // 背景色由 body 提供，各板块保持透明，让固定的点阵底纹透出来
    <div className="min-h-screen text-foreground">
      <Backdrop />
      <Header onNavClick={scrollToSection} />
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <div className="relative">
        <Footer />
      </div>
    </div>
  )
}

export default App
