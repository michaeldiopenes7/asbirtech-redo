import './Mission.css'

const stats = [
  { label: 'Performance Snapshot', value: '$5M+' },
  { label: 'Digital Reach', value: '250+' },
  { label: 'Client Trust', value: '98%' },
]

export default function Mission() {
  return (
    <section className="mission">
      <div className="container">
        <div className="mission-content">
          <div className="mission-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="white"/>
            </svg>
          </div>

          <p className="mission-text">
            Our team of data scientists, engineers, and
            creatives craft tailored AI solutions that solve real-
            world challenges across industries.
          </p>

          <a href="#about" className="mission-btn">
            <span>Learn More</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        <div className="mission-stats">
          {stats.map((stat, i) => (
            <div key={i} className="stat">
              <span className="stat-label">{stat.label}</span>
              <span className="stat-value">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
