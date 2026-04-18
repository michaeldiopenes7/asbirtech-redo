import './HeroContent.css'

export default function HeroContent() {
  return (
    <div className="hero-content">
      <h1 className="hero-headline">
        <span className="line-1">Modern Problems Require</span>
        <span className="line-2">Modern Solutions</span>
      </h1>
      <p className="hero-description">
        We take the time to understand the IT needs of businesses and provide a modern
        approach to solving them. Our services help businesses scale, transform, and
        gain a competitive advantage.
      </p>
      <div className="hero-actions">
        <a href="#contact" className="btn-primary">Let's Build Together</a>
        <a href="#work" className="btn-ghost">View Our Work</a>
      </div>
    </div>
  )
}
