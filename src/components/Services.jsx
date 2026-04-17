import { LuCode, LuCloud, LuTrendingUp, LuRocket, LuMonitor, LuSettings2, LuArrowUpRight } from 'react-icons/lu'
import './Services.css'

const services = [
  {
    id: 'web-dev',
    title: 'Web Development',
    description: 'We build performant, scalable websites and web applications tailored to your business goals — from front-end to full-stack delivery.',
    icon: <LuCode />,
  },
  {
    id: 'consulting',
    title: 'Web & Cloud Consulting',
    description: 'We guide you through cloud infrastructure, whether fully cloud-native or hybrid, and advise on the impact across technology, culture, and people.',
    icon: <LuCloud />,
  },
  {
    id: 'cost',
    title: 'Cost Reduction & Optimisation',
    description: 'Our outsourcing services help clients optimise software development costs with expert teams ready to carry out turnkey projects end-to-end.',
    icon: <LuTrendingUp />,
  },
  {
    id: 'transform',
    title: 'Digital Transformation',
    description: 'From planning to implementation, we help clients fully leverage digital technologies for enterprise optimisation and long-term success.',
    icon: <LuRocket />,
  },
  {
    id: 'design',
    title: 'UX / UI Design',
    description: 'We craft intuitive, conversion-focused interfaces that reflect your brand and deliver experiences your users actually enjoy.',
    icon: <LuMonitor />,
  },
  {
    id: 'automation',
    title: 'Process Automation',
    description: 'We identify bottlenecks and build custom automations that remove manual effort, reduce errors, and free your team to focus on what matters.',
    icon: <LuSettings2 />,
  },
]

export default function Services() {
  return (
    <section id="services" className="services">
      <div className="container">
        <div className="services-header">
          <h2 className="services-headline">Designed for businesses who<br />want to grow smarter.</h2>
          <p className="services-subheadline">Whether you're launching a product or scaling an existing one, our frameworks help you clarify your offer, streamline delivery, and build technology that works for you.</p>
        </div>

        <div className="services-grid">
          {services.map(s => (
            <div key={s.id} className="service-card">
              <div className="service-card-icon">{s.icon}</div>
              <h3 className="service-card-title">{s.title}</h3>
              <p className="service-card-desc">{s.description}</p>
            </div>
          ))}
        </div>

        <div className="services-cta">
          <a href="#contact" className="services-btn services-btn--primary">
            BOOK A CALL <span className="services-btn-arrow"><LuArrowUpRight /></span>
          </a>
        </div>
      </div>
    </section>
  )
}
