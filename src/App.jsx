import Hero from './components/layout/Hero'
import Services from './components/sections/Services'
import About from './components/sections/About'
import Showcase from './components/sections/Showcase'
import Process from './components/sections/Process'
import Insights from './components/sections/Insights'
import Contact from './components/sections/Contact'
import SiteFooter from './components/layout/SiteFooter'
import useGsapReveal from './hooks/useGsapReveal'
import './App.css'

export default function App() {
  useGsapReveal()
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <main id="main-content">
        <Hero />
        <Services />
        <About />
        <Showcase />
        <Process />
        <Insights />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
