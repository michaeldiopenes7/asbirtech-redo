import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/asbirtechlogo.png'
import './Nav.css'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll-spy: highlight the nav link for whichever homepage section is in view
  useEffect(() => {
    if (pathname !== '/') return
    const ids = ['services', 'about', 'work', 'articles']
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    const onScroll = () => {
      // Near the top → Home is active
      if (window.scrollY < window.innerHeight * 0.5) {
        setActiveSection('home')
        return
      }
      // Otherwise the last section whose top has passed the viewport midpoint
      const mid = window.scrollY + window.innerHeight * 0.35
      let current = 'home'
      for (const el of sections) {
        if (el.offsetTop <= mid) current = el.id
      }
      setActiveSection(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  // Resolve which nav item is active for the current route + scroll position
  const activeKey =
    pathname === '/team' ? 'team' : pathname === '/' ? activeSection : ''
  const linkClass = (key) => (activeKey === key ? 'is-active' : '')

  const openMenu = () => setMenuOpen(true)

  const closeMenu = () => {
    setIsClosing(true)
    setTimeout(() => {
      setMenuOpen(false)
      setIsClosing(false)
    }, 250)
  }

  const toggleMenu = () => (menuOpen ? closeMenu() : openMenu())

  const handleHashLink = (hash) => (e) => {
    e.preventDefault()
    if (menuOpen) closeMenu()
    if (pathname === '/') {
      const el = document.querySelector(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      navigate('/' + hash)
    }
  }

  return (
    <nav className={`hero-nav ${scrolled ? 'is-scrolled' : ''}`}>
      <Link to="/" className="nav-logo">
        <img src={logo} alt="Asbir Tech" className="nav-logo-image" />
      </Link>

      <div className="nav-right">
        <ul className="nav-links">
          <li><Link to="/" className={linkClass('home')}>Home</Link></li>
          <li><a href="/#services" className={linkClass('services')} onClick={handleHashLink('#services')}>Services</a></li>
          <li><a href="/#about" className={linkClass('about')} onClick={handleHashLink('#about')}>About Us</a></li>
          <li><a href="/#work" className={linkClass('work')} onClick={handleHashLink('#work')}>Showcase</a></li>
          <li><a href="/#articles" className={linkClass('articles')} onClick={handleHashLink('#articles')}>Articles</a></li>
          <li><Link to="/team" className={linkClass('team')}>Team</Link></li>
        </ul>

        <div className="nav-cta">
          <button
            className="nav-menu-btn"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={toggleMenu}
          >
          <span className={`nav-menu-icon ${menuOpen ? 'is-open' : ''}`}>
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

        {menuOpen && (
          <div className={`nav-mobile-menu ${isClosing ? 'closing' : ''}`}>
            <Link to="/" className={`nav-mobile-link ${linkClass('home')}`} onClick={closeMenu}>Home</Link>
            <a href="/#services" className={`nav-mobile-link ${linkClass('services')}`} onClick={handleHashLink('#services')}>Services</a>
            <a href="/#about" className={`nav-mobile-link ${linkClass('about')}`} onClick={handleHashLink('#about')}>About Us</a>
            <a href="/#work" className={`nav-mobile-link ${linkClass('work')}`} onClick={handleHashLink('#work')}>Showcase</a>
            <a href="/#articles" className={`nav-mobile-link ${linkClass('articles')}`} onClick={handleHashLink('#articles')}>Articles</a>
            <Link to="/team" className={`nav-mobile-link ${linkClass('team')}`} onClick={closeMenu}>Team</Link>
          </div>
        )}
      </div>
    </nav>
  )
}
