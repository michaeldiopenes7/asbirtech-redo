import { LuCode, LuCloud, LuTrendingUp, LuRocket, LuMonitor, LuSettings2, LuArrowUpRight } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import { services } from '../../content/services'
import './Services.css'

const ICON_MAP = { LuCode, LuCloud, LuTrendingUp, LuRocket, LuMonitor, LuSettings2 }

export default function Services() {
  return (
    <section id="services" className="services" aria-labelledby="services-heading">
      <div className="container">
        <div className="services-header" data-reveal>
          <h2 id="services-heading" className="services-headline">
            What we do
          </h2>
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
          <Link to="/book-a-call" className="services-btn services-btn--primary">
            Book a call <span className="services-btn-arrow" aria-hidden="true"><LuArrowUpRight /></span>
          </Link>
        </div>
      </div>
    </section>
  )
}
