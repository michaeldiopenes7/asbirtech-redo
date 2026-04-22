import './HeroContent.css'

export default function HeroContent() {
  return (
    <div className="hero-content">
      <h1 className="hero-headline">
        <span className="line-1">We build digital</span>
        <span className="line-2">products that work.</span>
      </h1>
      <p className="hero-description">
        From streaming platforms to booking marketplaces — we design, build, and ship
        software that scales with the businesses behind it.
      </p>
      <div className="hero-actions">
        <a href="#work" className="btn-primary">See Our Work</a>
        <a href="#contact" className="btn-ghost">Get in Touch</a>
      </div>
    </div>
  )
}
