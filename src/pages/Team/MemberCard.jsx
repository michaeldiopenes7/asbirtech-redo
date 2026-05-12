import { useEffect, useRef, useState } from 'react'

export default function MemberCard({ member, photo }) {
  const cardRef = useRef(null)
  const [inView, setInView] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el || inView) return

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setInView(true)
            io.disconnect()
          }
        })
      },
      { rootMargin: '200px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [inView])

  const ready = inView && (!photo || imgLoaded)

  return (
    <div
      ref={cardRef}
      className={`tp-member-card${ready ? ' is-ready' : ' is-loading'}`}
    >
      {!ready && (
        <div className="tp-member-skeleton" aria-hidden="true">
          <div className="tp-skel-bar tp-skel-bar--name" />
          <div className="tp-skel-bar tp-skel-bar--role" />
        </div>
      )}

      {inView && photo && (
        <img
          src={photo}
          alt={member.name}
          loading="lazy"
          decoding="async"
          className={`tp-member-avatar${imgLoaded ? ' is-loaded' : ''}`}
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgLoaded(true)}
        />
      )}

      {inView && !photo && <div className="tp-member-avatar tp-member-avatar--blank" />}

      <div className="tp-member-overlay" aria-hidden="true" />
      <div className="tp-member-info">
        <span className="tp-member-name">{member.name}</span>
        <span className="tp-member-role">{member.role}</span>
      </div>
    </div>
  )
}
