import Nav from './Nav'
import HeroContent from './HeroContent'
import GradientBlinds from './GradientBlinds'
import Partners from './Partners'
import './Hero.css'

export default function Hero() {
  return (
    <div className="hero">
      <div className="hero-backdrop">
        <GradientBlinds blindCount={48} />
      </div>
      <div className="container"><Nav /></div>
      <HeroContent />
      <Partners />
    </div>
  )
}
