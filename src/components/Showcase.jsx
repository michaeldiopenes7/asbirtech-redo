import ShowcaseCard from './ShowcaseCard'
import './Showcase.css'

const projects = [
  {
    id: 'bzp',
    variant: 'fire',
    client: 'BeetzeePLAY',
    title: 'A revolutionary streaming platform delivering miniseries straight to your mobile.',
  },
  {
    id: 'planout',
    variant: 'ember',
    client: 'PlanOut',
    title: 'A smarter way to sell tickets — built for event organizers who want full control.',
  },
  {
    id: 'korte',
    variant: 'gold',
    client: 'Korte Philippines',
    title: 'A platform for discovering and booking sports courts across the Philippines.',
  },
]

export default function Showcase() {
  return (
    <section id="work" className="showcase">
      <div className="container">
        <div className="showcase-header">
          <h2 className="showcase-headline">Our Works</h2>
          <p className="showcase-subheadline">A selection of projects we've crafted — from platforms to applications, built with purpose.</p>
        </div>
        <div className="showcase-grid">
          {projects.map(p => (
            <ShowcaseCard
              key={p.id}
              variant={p.variant}
              client={p.client}
              title={p.title}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
