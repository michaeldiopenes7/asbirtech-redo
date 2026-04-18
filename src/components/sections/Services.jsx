import { LuCode, LuCloud, LuTrendingUp, LuRocket, LuMonitor, LuSettings2, LuArrowUpRight } from 'react-icons/lu'
import { services } from '../../content/services'
import './Services.css'

const ICON_MAP = { LuCode, LuCloud, LuTrendingUp, LuRocket, LuMonitor, LuSettings2 }

export default function Services() {
  return (
    <section id="services" className="services" aria-labelledby="services-heading">
      <div className="container">
        <div className="services-header" data-reveal>
          <h2 id="services-heading" className="services-headline">
            Designed for businesses who<br />want to grow smarter.
          </h2>
          <p className="services-subheadline">
            Whether you're launching a product or scaling an existing one, our frameworks help you
            clarify your offer, streamline delivery, and build technology that works for you.
          </p>
        </div>

        <div className="services-grid">
          {services.map((s, i) => {
            const Icon = ICON_MAP[s.icon]
            return (
              <div key={s.id} className="service-card" data-reveal data-reveal-delay={i * 80}>
                <div className="service-card-icon" aria-hidden="true">
                  <Icon />
                </div>
                <h3 className="service-card-title">{s.title}</h3>
                <p className="service-card-desc">{s.description}</p>
              </div>
            )
          })}
        </div>

        <div className="services-cta" data-reveal>
          <a href="#contact" className="services-btn services-btn--primary">
            Book a call <span className="services-btn-arrow" aria-hidden="true"><LuArrowUpRight /></span>
          </a>
        </div>
      </div>
    </section>
  )
}
