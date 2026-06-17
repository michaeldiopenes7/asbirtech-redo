import { useRef } from 'react'
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
      </div>

      <div className="hero-aside">
        <p className="hero-description">
          From streaming platforms to booking marketplaces — we design, build, and ship
          software that scales with the businesses behind it.
        </p>
        <p className="hero-description">
          We embed with your team, move fast, and build things made to last — across
          Southeast Asia and Australia.
        </p>
        <p className="hero-description">
          From first call to long after launch, we stay accountable — treating your
          product like it&rsquo;s our own.
        </p>
      </div>
    </div>
  )
}
