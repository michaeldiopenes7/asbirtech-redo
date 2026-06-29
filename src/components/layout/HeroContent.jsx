import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { LuArrowRight, LuArrowUpRight } from 'react-icons/lu'
import useHeroIntro from '../../hooks/useHeroIntro'
import './HeroContent.css'

export default function HeroContent() {
  const rootRef = useRef(null)
  useHeroIntro(rootRef)

  return (
    <div className="hero-content" ref={rootRef}>
      <div className="hero-main">
        <span className="hero-pill">
          <span className="hero-pill-label">Web Development &amp; IT Consulting</span>
          <span className="hero-pill-sep" aria-hidden="true" />
          <span className="hero-pill-badge">Building Since 2008</span>
        </span>
        <h1 className="hero-headline">
          <span className="line-1">Modern Problems Require</span>
          <span className="line-2">Modern Solutions</span>
        </h1>

        <p className="hero-description">
          From streaming platforms to booking marketplaces — we design, build, and ship
          software that scales with the businesses behind it. We embed with your team, move
          fast, and stay accountable long after launch.
        </p>

        <div className="hero-actions">
          <a href="#work" className="hero-btn hero-btn--primary">
            See our work
            <span className="hero-btn-arrow" aria-hidden="true"><LuArrowRight /></span>
          </a>
          <Link to="/contact" className="hero-btn hero-btn--secondary">
            Get in touch
            <span className="hero-btn-arrow" aria-hidden="true"><LuArrowUpRight /></span>
          </Link>
        </div>
      </div>
    </div>
  )
}
