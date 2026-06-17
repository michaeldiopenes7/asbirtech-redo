import GradientBlinds from '../webgl/GradientBlinds'
import teamPhoto from '../../assets/images/asbirtech-team.jpg'
import './About.css'

export default function About() {
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
            <img src={teamPhoto} alt="The ASBIRTECH team" className="about-visual-img" loading="lazy" decoding="async" />
          </div>
        </div>

        <div className="about-content" data-anim="right" data-anim-delay="0.12">
          <h2 className="about-headline">
            A team that ships — and stays accountable after launch.
          </h2>
          <p className="about-desc">
            We're a web development and IT consulting team based in the Philippines, working with businesses across Southeast Asia and Australia. We embed with your team, move fast, and build things built to last.
          </p>
        </div>
      </div>
    </section>
  )
}
