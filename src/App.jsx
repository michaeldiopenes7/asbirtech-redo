import logo from './assets/images/asbirtechlogo.png'
import Hero from './components/layout/Hero'
import Services from './components/sections/Services'
import About from './components/sections/About'
import Showcase from './components/sections/Showcase'
import Process from './components/sections/Process'
import Insights from './components/sections/Insights'
import Contact from './components/sections/Contact'
import useScrollReveal from './hooks/useScrollReveal'
import './App.css'

export default function App() {
  useScrollReveal()
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
      <footer className="site-footer" aria-label="Site footer">
        <div className="footer-bar">
          <div className="footer-bar-left">
            <img src={logo} alt="Asbir Tech" className="footer-bar-logo" />
            <span className="footer-bar-copy">&copy; {new Date().getFullYear()} AsbirTech, Inc.</span>
          </div>
          <span className="footer-bar-location">🇵🇭&nbsp; Dumaguete, PH</span>
        </div>
      </footer>
    </>
  )
}
