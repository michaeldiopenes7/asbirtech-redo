/* global IntersectionObserver */
import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LuArrowUpRight } from 'react-icons/lu'
import './InsightCard.css'

export default function InsightCard({ post, showMeta = false, showArrow = false }) {
  const cardRef = useRef(null)
  const [inView, setInView] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el || inView) return
    if (typeof IntersectionObserver === 'undefined') { setInView(true); return }

    const io = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) { setInView(true); io.disconnect() } }) },
      { rootMargin: '200px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [inView])

  const imgReady = !post.image || imgLoaded
  const isExternal = !post.body?.length

  const inner = (
    <>
      <div className="ic-image" ref={cardRef}>
        {!imgReady && <div className="ic-img-skel skel" aria-hidden="true" />}
        {inView && post.image && (
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            decoding="async"
            className={imgLoaded ? 'is-loaded' : ''}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgLoaded(true)}
          />
        )}
      </div>
      <div className="ic-body">
        {showMeta && <div className="ic-meta"><span className="ic-category">{post.category}</span><span className="ic-date">{post.date}</span></div>}
        {!showMeta && <span className="ic-category">{post.category}</span>}
        <h3 className="ic-title">{post.title}</h3>
        <div className="ic-footer">
          <div className="ic-author">
            <div className="ic-author-avatar">
              {post.author.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div className="ic-author-info">
              <span className="ic-author-name">{post.author.name}</span>
              <span className="ic-author-role">{post.author.role}</span>
            </div>
          </div>
          {showArrow && <LuArrowUpRight className="ic-arrow" aria-hidden="true" />}
        </div>
      </div>
    </>
  )

  const cls = 'ic-card'
  return isExternal
    ? <a href={post.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
    : <Link to={`/articles/${post.id}`} className={cls}>{inner}</Link>
}
