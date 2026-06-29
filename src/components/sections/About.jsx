import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LuArrowUpRight } from 'react-icons/lu'
import GradientBlinds from '../webgl/GradientBlinds'
import teamPhoto from '../../assets/images/asbirtech-team.jpg'
import './About.css'

export default function About() {
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <section id="about" className="about">
      <div className="about-inner">

        <div className="about-visual" data-anim="left">
          <div className="about-visual-canvas">
            <GradientBlinds blindCount={30} disableHover />
          </div>
          <div className="about-visual-top-fade" />
          <div className="about-visual-glow" />
          <div className="about-visual-photo">
            {!imgLoaded && <div className="about-visual-skel skel" aria-hidden="true" />}
            <img
              src={teamPhoto}
              alt="The ASBIRTECH team"
              className={`about-visual-img${imgLoaded ? ' is-loaded' : ''}`}
              loading="lazy"
              decoding="async"
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgLoaded(true)}
            />
          </div>
        </div>

        <div className="about-content" data-anim="right" data-anim-delay="0.12">
          <h2 className="about-headline">
            A team that ships — and stays accountable after launch.
          </h2>
          <p className="about-desc">
            We're a web development and IT consulting team based in the Philippines, working with businesses across Southeast Asia and Australia. We embed with your team, move fast, and build things built to last.
          </p>
          <div className="about-cta">
            <Link to="/team" className="about-btn about-btn--primary">
              Meet the Team
              <span className="about-btn-arrow" aria-hidden="true"><LuArrowUpRight /></span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
