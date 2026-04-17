import { LuUsers, LuLayers } from 'react-icons/lu'
import GradientBlinds from './GradientBlinds'
import testImage from '../assets/images/testimage.jpg'
import './About.css'

const highlights = [
  {
    icon: <LuUsers />,
    label: 'Built by experts',
    title: 'The Dream Team',
  },
  {
    icon: <LuLayers />,
    label: 'End-to-end service',
    title: 'Full-Stack Delivery',
  },
]

export default function About() {
  return (
    <section id="about" className="about">
      <div className="about-inner">

        {/* Left — visual panel */}
        <div className="about-visual">
          <div className="about-visual-canvas">
            <GradientBlinds blindCount={30} disableHover />
          </div>
          <div className="about-visual-top-fade" />
          <div className="about-visual-glow" />
          <div className="about-visual-photo">
            <img src={testImage} alt="Team at work" className="about-visual-img" />
          </div>
        </div>

        {/* Right — content */}
        <div className="about-content">
          <h2 className="about-headline">
            Delivering technology services that fit the way your business works
          </h2>
          <p className="about-desc">
            Asbir Tech is a web development and IT consulting company established in 2016 in the Philippines. In 2022, it expanded to Australia when one of its partners emigrated. Since inception, we've served IT and non-IT organisations — helping each achieve their goals with digital solutions and emerging technologies.
          </p>

          <div className="about-cards">
            {highlights.map(h => (
              <div key={h.title} className="about-card">
                <span className="about-card-icon">{h.icon}</span>
                <div className="about-card-text">
                  <p className="about-card-label">{h.label}</p>
                  <p className="about-card-title">{h.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
