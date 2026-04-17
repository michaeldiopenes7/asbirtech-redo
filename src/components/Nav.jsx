import { useState } from 'react'
import logo from '../assets/images/asbirtechlogo.png'
import './Nav.css'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const handleMenuToggle = () => {
    if (menuOpen) {
      setIsClosing(true)
      setTimeout(() => {
        setMenuOpen(false)
        setIsClosing(false)
      }, 250)
    } else {
      setMenuOpen(true)
    }
  }

  const handleMenuClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setMenuOpen(false)
      setIsClosing(false)
    }, 250)
  }

  return (
    <nav className="hero-nav">
      <div className="nav-logo">
        <img src={logo} alt="ASBIR" className="nav-logo-image" />
      </div>

      <ul className="nav-links">
        <li><a href="#services">Services</a></li>
        <li><a href="#solutions">About Us</a></li>
        <li><a href="#about">Team</a></li>
        <li><a href="#cases">Showcase</a></li>
      </ul>

      <div className="nav-cta">
        <a href="#contact" className="btn-contact">Contact Us</a>
        <button
          className="nav-menu-btn"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={handleMenuToggle}
        >
          <span className={`nav-menu-icon ${menuOpen ? 'is-open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      {menuOpen && (
        <div className={`nav-mobile-menu ${isClosing ? 'closing' : ''}`}>
          <a href="#services" onClick={handleMenuClose}>Services</a>
          <a href="#solutions" onClick={handleMenuClose}>About Us</a>
          <a href="#about" onClick={handleMenuClose}>Team</a>
          <a href="#cases" onClick={handleMenuClose}>Showcase</a>
          <a href="#contact" className="nav-mobile-cta" onClick={handleMenuClose}>Contact Us</a>
        </div>
      )}
    </nav>
  )
}
