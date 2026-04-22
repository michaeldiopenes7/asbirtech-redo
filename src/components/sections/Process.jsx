import { useEffect, useRef } from 'react'
import ProcessSlat from '../webgl/ProcessSlat'
import { steps } from '../../content/process'
import './Process.css'

export default function Process() {
  const bodyRef = useRef(null)
  const fillRef = useRef(null)

  useEffect(() => {
    const body = bodyRef.current
    const fill = fillRef.current
    if (!body || !fill) return

    const onScroll = () => {
      const { top, height } = body.getBoundingClientRect()
      const vh = window.innerHeight
      const start = vh * 0.8
      const end   = vh * 0.2
      const progress = Math.min(1, Math.max(0, (start - top) / (start - end + height)))
      fill.style.transform = `scaleY(${progress})`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="process" className="process" aria-labelledby="process-heading">
      <div className="container">

        <div className="process-header" data-reveal>
          <h2 id="process-heading" className="process-headline">
            How we work
          </h2>
          <p className="process-subheadline">
            A clear, repeatable process that keeps projects on track — from the first conversation to long after launch.
          </p>
        </div>

        <div className="process-body" ref={bodyRef}>
          <div className="process-spine" aria-hidden="true">
            <div className="process-spine-track" />
            <div className="process-spine-fill" ref={fillRef} />
            {steps.map((step, i) => (
              <div
                key={step.id}
                className="process-spine-num"
                style={{ '--step-index': i }}
              >
                {step.number}
              </div>
            ))}
          </div>

          <div className="process-steps">
            {steps.map((step, i) => (
              <div
                key={step.id}
                className={`process-step ${i % 2 === 0 ? 'is-flipped' : ''}`}
                ref={el => {
                  if (!el) return
                  const io = new IntersectionObserver(([entry]) => {
                    if (entry.isIntersecting) { el.classList.add('is-visible'); io.disconnect() }
                  }, { threshold: 0.15 })
                  io.observe(el)
                }}
              >
                <div className="process-visual">
                  <ProcessSlat variant={step.variant} image={step.image} />
                </div>
                <div className="process-content">
                  <h3 className="process-step-title">{step.title}</h3>
                  <p className="process-step-desc">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
