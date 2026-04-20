import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/images/asbirtechlogo.png'
import './Nav.css'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const { pathname } = useLocation()
  const isContact = pathname === '/contact'

  const openMenu = () => setMenuOpen(true)

  const closeMenu = () => {
    setIsClosing(true)
    setTimeout(() => {
      setMenuOpen(false)
      setIsClosing(false)
    }, 250)
  }

  const toggleMenu = () => (menuOpen ? closeMenu() : openMenu())

  return (
    <nav className="hero-nav">
      <Link to="/" className="nav-logo">
        <img src={logo} alt="Asbir Tech" className="nav-logo-image" />
      </Link>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><a href="/#services">Services</a></li>
        <li><a href="/#about">About Us</a></li>
        <li><a href="/#work">Showcase</a></li>
        <li><a href="/#articles">Articles</a></li>
      </ul>

      <div className="nav-cta">
        {!isContact && (
          <Link to="/contact" className="btn-contact">Contact Us</Link>
        )}
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
          <Link to="/" className="nav-mobile-link" onClick={closeMenu}>Home</Link>
          <a href="/#services" className="nav-mobile-link" onClick={closeMenu}>Services</a>
          <a href="/#about" className="nav-mobile-link" onClick={closeMenu}>About Us</a>
          <a href="/#work" className="nav-mobile-link" onClick={closeMenu}>Showcase</a>
          <a href="/#articles" className="nav-mobile-link" onClick={closeMenu}>Articles</a>
          <div className="nav-mobile-divider" />
          <Link to="/contact" className="nav-mobile-cta" onClick={closeMenu}>Contact Us</Link>
        </div>
      )}
    </nav>
  )
}
