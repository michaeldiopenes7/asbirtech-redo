import { LuArrowUpRight } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import GradientBlinds from '../webgl/GradientBlinds'
import testImage from '../../assets/images/tech.jpg'
import './About.css'

const avatars = [
  { initials: 'AJ' },
  { initials: 'MR' },
  { initials: 'SK' },
  { initials: 'LD' },
  { initials: 'FP' },
]

export default function About() {
  return (
    <section id="about" className="about">
      <div className="about-inner">

        <div className="about-visual" data-reveal="left">
          <div className="about-visual-canvas">
            <GradientBlinds blindCount={30} disableHover />
          </div>
          <div className="about-visual-top-fade" />
          <div className="about-visual-glow" />
          <div className="about-visual-photo">
            <img src={testImage} alt="Team at work" className="about-visual-img" />
          </div>
        </div>

        <div className="about-content" data-reveal="right" data-reveal-delay="120">
          <h2 className="about-headline">
            Delivering technology services that fit the way your business works
          </h2>
          <p className="about-desc">
            Asbir Tech is a web development and IT consulting company established in 2016 in the Philippines. In 2022, it expanded to Australia when one of its partners emigrated. Since inception, we've served IT and non-IT organisations — helping each achieve their goals with digital solutions and emerging technologies.
          </p>

          <div className="about-team-strip">
            <div className="about-team-avatars">
              {avatars.map((a, i) => (
                <div key={a.initials} className="about-team-avatar" style={{ '--av-i': i }}>
                  {a.initials}
                </div>
              ))}
              <div className="about-team-avatar about-team-avatar--more" style={{ '--av-i': avatars.length }}>
                +35
              </div>
            </div>
            <div className="about-team-meta">
              <span className="about-team-count">40+ people</span>
            </div>
            <Link to="/team" className="about-team-link">
              Meet the team <LuArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
