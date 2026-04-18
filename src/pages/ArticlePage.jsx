import { useEffect } from 'react'
import { useParams, Link, Navigate, useLocation } from 'react-router-dom'
import { LuArrowUpRight } from 'react-icons/lu'
import { insights } from '../content/insights'
import Nav from '../components/layout/Nav'
import logo from '../assets/images/asbirtechlogo.png'
import './ArticlePage.css'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
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
          <img src={block.src} alt={block.alt || ''} className="article-figure-img" />
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
              {related.map(p => (
                p.body?.length
                  ? <Link key={p.id} to={`/articles/${p.id}`} className="article-related-card">
                      <div className="article-related-card-image">
                        {p.image && <img src={p.image} alt={p.title} />}
                      </div>
                      <span className="article-related-card-category">{p.category}</span>
                      <h3 className="article-related-card-title">{p.title}</h3>
                    </Link>
                  : <a key={p.id} href={p.href} target="_blank" rel="noopener noreferrer" className="article-related-card">
                      <div className="article-related-card-image">
                        {p.image && <img src={p.image} alt={p.title} />}
                      </div>
                      <span className="article-related-card-category">{p.category}</span>
                      <h3 className="article-related-card-title">{p.title}</h3>
                    </a>
              ))}
            </div>
          </div>
        )}

      </main>

      <footer className="site-footer" aria-label="Site footer">
        <div className="footer-bar">
          <div className="footer-bar-left">
            <img src={logo} alt="Asbir Tech" className="footer-bar-logo" />
            <span className="footer-bar-copy">&copy; {new Date().getFullYear()} AsbirTech, Inc.</span>
          </div>
          <span className="footer-bar-location">🇵🇭&nbsp; Dumaguete, PH</span>
        </div>
      </footer>
    </>
  )
}
