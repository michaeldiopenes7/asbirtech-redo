import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useParams, Link, Navigate, useLocation } from 'react-router-dom'
import { LuArrowUpRight } from 'react-icons/lu'
import { insights } from '../../content/insights'
import Nav from '../../components/layout/Nav'
import SiteFooter from '../../components/layout/SiteFooter'
import './ArticlePage.css'

function RelatedCard({ p }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || inView) return
    if (typeof IntersectionObserver === 'undefined') { setInView(true); return }
    const io = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) { setInView(true); io.disconnect() } }) },
      { rootMargin: '200px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [inView])

  const imgReady = !p.image || imgLoaded
  const inner = (
    <>
      <div className="article-related-card-image" ref={ref}>
        {!imgReady && <div className="skel" style={{ position: 'absolute', inset: 0 }} aria-hidden="true" />}
        {inView && p.image && (
          <img
            src={p.image}
            alt={p.title}
            loading="lazy"
            decoding="async"
            style={{ opacity: imgLoaded ? 1 : 0, transition: 'opacity 0.35s ease' }}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgLoaded(true)}
          />
        )}
      </div>
      <span className="article-related-card-category">{p.category}</span>
      <h3 className="article-related-card-title">{p.title}</h3>
    </>
  )

  return p.body?.length
    ? <Link to={`/articles/${p.id}`} className="article-related-card">{inner}</Link>
    : <a href={p.href} target="_blank" rel="noopener noreferrer" className="article-related-card">{inner}</a>
}

function ScrollToTop() {
  const { pathname } = useLocation()
  // Reset scroll before paint so the page never flashes at the previous
  // scroll offset / appears to animate in from the bottom.
  useLayoutEffect(() => {
    const root = document.documentElement
    const prev = root.style.scrollBehavior
    root.style.scrollBehavior = 'auto'
    window.scrollTo(0, 0)
    requestAnimationFrame(() => { root.style.scrollBehavior = prev })
  }, [pathname])
  return null
}

function renderBlock(block, i) {
  switch (block.type) {
    case 'heading':
      return <h2 key={i} className="article-section-heading">{block.text}</h2>

    case 'paragraph':
      return (
        <p key={i} className="article-paragraph">
          {block.bold && <strong>{block.bold}</strong>}
          {block.text}
        </p>
      )

    case 'list':
      return (
        <ul key={i} className="article-list">
          {block.items.map((item, j) => (
            <li key={j} className="article-list-item">
              {item.bold && <strong>{item.bold}</strong>}
              {item.text}
            </li>
          ))}
        </ul>
      )

    case 'image':
      return (
        <figure key={i} className="article-figure">
          <img src={block.src} alt={block.alt || ''} className="article-figure-img" loading="lazy" decoding="async" />
          {block.caption && <figcaption className="article-figure-caption">{block.caption}</figcaption>}
        </figure>
      )

    case 'video':
      return (
        <div key={i} className="article-video">
          <iframe
            src={`https://www.youtube.com/embed/${block.youtubeId}`}
            title={block.title || 'Video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )

    default:
      return null
  }
}

export default function ArticlePage() {
  const { id } = useParams()
  const post = insights.find(p => p.id === id)

  if (!post || !post.body?.length) return <Navigate to="/" replace />

  const related = insights.filter(p => p.id !== id).slice(0, 3)

  return (
    <>
      <ScrollToTop />
      <div className="article-nav-wrap container">
        <Nav />
      </div>

      <main className="article-main">

        {/* Hero — title only */}
        <div className="article-hero">
          <h1 className="article-title">{post.title}</h1>
        </div>

        {/* Cover image */}
        {post.image && (
          <div className="article-cover">
            <img src={post.image} alt={post.title} />
          </div>
        )}

        {/* Meta bar */}
        <div className="article-meta-wrap">
          <div className="article-meta-bar">
            <div className="article-meta-cell">
              <span className="article-meta-label">Written By</span>
              <span className="article-meta-value">{post.author.name}</span>
            </div>
            <div className="article-meta-cell">
              <span className="article-meta-label">Last Update</span>
              <span className="article-meta-value">{post.date}</span>
            </div>
            <div className="article-meta-cell">
              <span className="article-meta-label">Category</span>
              <span className="article-meta-value">{post.category}</span>
            </div>
            <div className="article-meta-cell">
              <span className="article-meta-label">Tags</span>
              <span className="article-meta-value">{post.tags?.join(', ')}</span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="article-body">
          {post.body.map((block, i) => renderBlock(block, i))}
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="article-related">
            <div className="article-related-header">
              <h2 className="article-related-heading">Related Content</h2>
              <Link to="/#articles" className="article-related-view-all">
                View all Articles <LuArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
            <div className="article-related-grid">
              {related.map(p => <RelatedCard key={p.id} p={p} />)}
            </div>
          </div>
        )}

      </main>

      <SiteFooter />
    </>
  )
}
