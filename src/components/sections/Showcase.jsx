import { useRef } from 'react'
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu'
import ShowcaseCard from '../webgl/ShowcaseCard'
import { projects } from '../../content/projects'
import './Showcase.css'

export default function Showcase() {
  const trackRef = useRef(null)

  const scroll = (dir) => {
    const track = trackRef.current
    if (!track) return
    const cardW = track.querySelector('.sc-card')?.offsetWidth ?? 0
    const gap   = 16
    track.scrollBy({ left: dir === 'next' ? cardW + gap : -(cardW + gap), behavior: 'smooth' })
  }

  return (
    <section id="work" className="showcase" aria-labelledby="showcase-heading">
      <div className="container">

        <div className="showcase-top" data-reveal>
          <div className="showcase-header">
            <h2 id="showcase-heading" className="showcase-headline">Our Works</h2>
            <p className="showcase-subheadline">
              A selection of projects built with purpose — from platforms to full-stack applications.
            </p>
          </div>
          <div className="showcase-nav">
            <button className="showcase-nav-btn" onClick={() => scroll('prev')} aria-label="Previous project">
              <LuArrowLeft />
            </button>
            <button className="showcase-nav-btn" onClick={() => scroll('next')} aria-label="Next project">
              <LuArrowRight />
            </button>
          </div>
        </div>

        <div className="showcase-track" ref={trackRef} data-reveal data-reveal-delay="100">
          {projects.map((p, i) => (
            <ShowcaseCard
              key={p.id}
              id={p.id}
              index={i + 1}
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
