import { useEffect, useRef, useState } from 'react'

export default function MemberCard({ member, photo, hoverPhoto }) {
  const cardRef = useRef(null)
  const revertTimer = useRef(null)
  const [inView, setInView] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
  const [hovered, setHovered] = useState(false)

  // On touch devices there's no hover-out, so a tap reveals the wacky photo
  // then auto-reverts to the formal one after a short timeout.
  const handleTap = () => {
    if (!hoverPhoto) return
    setHovered(true)
    clearTimeout(revertTimer.current)
    revertTimer.current = setTimeout(() => setHovered(false), 1500)
  }

  useEffect(() => () => clearTimeout(revertTimer.current), [])

  // Preload the wacky hover image so the swap is instant
  useEffect(() => {
    if (!inView || !hoverPhoto) return
    const img = new Image()
    img.src = hoverPhoto
  }, [inView, hoverPhoto])

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
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={handleTap}
      onContextMenu={(e) => e.preventDefault()}
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
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          className={`tp-member-avatar${imgLoaded ? ' is-loaded' : ''}`}
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgLoaded(true)}
        />
      )}

      {inView && photo && hoverPhoto && (
        <img
          src={hoverPhoto}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          className={`tp-member-avatar tp-member-avatar--hover${hovered ? ' is-shown' : ''}`}
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
