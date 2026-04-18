import { LuArrowUpRight } from 'react-icons/lu'
import './TeamTeaser.css'

const stats = [
  { value: '40+', label: 'Team members' },
  { value: '9',   label: 'Years in business' },
  { value: '2',   label: 'Countries' },
  { value: '60+', label: 'Projects delivered' },
]

const avatars = [
  { initials: 'AJ', color: '#c94b0c' },
  { initials: 'MR', color: '#7c3aed' },
  { initials: 'SK', color: '#0e7490' },
  { initials: 'LD', color: '#b45309' },
  { initials: 'FP', color: '#065f46' },
  { initials: 'NB', color: '#9f1239' },
  { initials: 'TW', color: '#1d4ed8' },
]

export default function TeamTeaser() {
  return (
    <section id="team" className="team-teaser" aria-labelledby="team-heading">
      <div className="container">

        <div className="team-teaser-inner">

          {/* Left — copy */}
          <div className="team-teaser-copy">
            <p className="team-teaser-eyebrow">The people behind the work</p>
            <h2 id="team-heading" className="team-teaser-headline">
              A team built to<br />move fast and last.
            </h2>
            <p className="team-teaser-desc">
              Designers, engineers, and strategists — spread across the Philippines
              and Australia — united by one goal: building software that actually works for your business.
            </p>
            <a href="/team" className="team-teaser-cta">
              Meet the team <LuArrowUpRight aria-hidden="true" />
            </a>
          </div>

          {/* Right — stats + avatars */}
          <div className="team-teaser-right">

            <div className="team-teaser-stats">
              {stats.map(s => (
                <div key={s.label} className="team-stat">
                  <span className="team-stat-value">{s.value}</span>
                  <span className="team-stat-label">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="team-teaser-avatars">
              {avatars.map((a, i) => (
                <div
                  key={a.initials}
                  className="team-avatar"
                  style={{ '--avatar-color': a.color, '--avatar-index': i }}
                >
                  {a.initials}
                </div>
              ))}
              <div className="team-avatar team-avatar--more">+33</div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
