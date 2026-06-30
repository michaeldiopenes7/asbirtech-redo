import { Link, useNavigate, useLocation } from 'react-router-dom'
import { LuFacebook, LuMail, LuPhone } from 'react-icons/lu'
import logo from '../../assets/images/asbirtechlogo.png'
import './SiteFooter.css'

export default function SiteFooter() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const year = new Date().getFullYear()

  // Smooth-scroll to a homepage section, navigating home first if needed.
  const goToSection = (hash) => (e) => {
    e.preventDefault()
    if (pathname === '/') {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      navigate('/' + hash)
    }
  }

  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="footer-main">
        <div className="footer-brand">
          <img src={logo} alt="Asbir Tech" className="footer-logo" />
          <p className="footer-tagline">
            Web development &amp; IT consulting — building since 2008.
          </p>
        </div>

        <nav className="footer-col" aria-label="Explore">
          <h2 className="footer-col-title">Explore</h2>
          <a href="/#services" onClick={goToSection('#services')}>Services</a>
          <a href="/#about" onClick={goToSection('#about')}>About Us</a>
          <a href="/#work" onClick={goToSection('#work')}>Showcase</a>
          <a href="/#articles" onClick={goToSection('#articles')}>Articles</a>
          <Link to="/team">Team</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="footer-col" aria-label="Contact">
          <h2 className="footer-col-title">Get in touch</h2>
          <a href="mailto:hello@asbir.tech"><LuMail size={14} aria-hidden="true" /> hello@asbir.tech</a>
          <a href="tel:+63354021881"><LuPhone size={14} aria-hidden="true" /> (+63) (035) 402 1881</a>
          <a href="https://www.facebook.com/asbirtech" target="_blank" rel="noopener noreferrer"><LuFacebook size={14} aria-hidden="true" /> facebook.com/asbirtech</a>
          <span className="footer-hours">9 AM – 6 PM (Mon – Fri)</span>
        </div>
      </div>

      <div className="footer-bar">
        <span className="footer-bar-copy">&copy; {year} AsbirTech, Inc.</span>
        <span className="footer-bar-location">🇵🇭&nbsp; Dumaguete, PH</span>
      </div>
    </footer>
  )
}
