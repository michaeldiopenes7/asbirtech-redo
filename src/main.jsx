import React, { lazy, Suspense, useEffect, useLayoutEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import App from './App'
import BackToTop from './components/ui/BackToTop'
import './index.css'

const ArticlePage = lazy(() => import('./pages/Article'))
const ArticlesPage = lazy(() => import('./pages/Articles'))
const ContactPage = lazy(() => import('./pages/Contact'))
const ProjectPage = lazy(() => import('./pages/Project'))
const TeamPage = lazy(() => import('./pages/Team'))
const NotFoundPage = lazy(() => import('./pages/NotFound'))

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  // No hash → reset scroll to the top *before* paint, so a fresh page never
  // flashes at the previous page's scroll offset (which made entrance
  // animations appear to start mid-page / "from the bottom").
  useLayoutEffect(() => {
    if (hash) return
    // Temporarily kill the global `scroll-behavior: smooth` so the jump to the
    // top of a brand-new page is instant — not a visible scroll up from the
    // previous page's offset ("bottom to top").
    const root = document.documentElement
    const prev = root.style.scrollBehavior
    root.style.scrollBehavior = 'auto'
    window.scrollTo(0, 0)
    // Restore on the next frame, after the browser has settled at the top.
    requestAnimationFrame(() => { root.style.scrollBehavior = prev })
  }, [pathname, hash])

  // Hash present → smooth-scroll to the target section after it has rendered.
  useEffect(() => {
    if (!hash) return
    const id = hash.slice(1)
    requestAnimationFrame(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      // Strip the hash from the URL so a refresh lands at the top of the page
      // (not back on the section) — replaceState avoids a new history entry.
      window.history.replaceState(null, '', pathname + window.location.search)
    })
  }, [pathname, hash])

  return null
}

function RouteFallback() {
  return (
    <div style={{ minHeight: '100vh', background: '#000', overflow: 'hidden' }} aria-hidden="true">
      {/* Nav bar skeleton */}
      <div style={{ height: 64, borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', padding: '0 48px', gap: 24 }}>
        <div className="skel" style={{ width: 100, height: 18, borderRadius: 4 }} />
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 16 }}>
          <div className="skel" style={{ width: 56, height: 14, borderRadius: 4 }} />
          <div className="skel" style={{ width: 56, height: 14, borderRadius: 4 }} />
          <div className="skel" style={{ width: 56, height: 14, borderRadius: 4 }} />
        </div>
      </div>
      {/* Hero skeleton */}
      <div style={{ height: '45vh', minHeight: 280 }} className="skel" />
      {/* Content block skeletons */}
      <div style={{ maxWidth: 1200, margin: '56px auto', padding: '0 48px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="skel" style={{ width: '38%', height: 32, borderRadius: 6 }} />
        <div className="skel" style={{ width: '62%', height: 18, borderRadius: 4 }} />
        <div className="skel" style={{ width: '54%', height: 18, borderRadius: 4 }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginTop: 32 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="skel" style={{ width: '100%', aspectRatio: '16/10' }} />
              <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div className="skel" style={{ width: '30%', height: 10, borderRadius: 3 }} />
                <div className="skel" style={{ width: '85%', height: 18, borderRadius: 4 }} />
                <div className="skel" style={{ width: '65%', height: 18, borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:id" element={<ArticlePage />} />
          <Route path="/projects/:id" element={<ProjectPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <BackToTop />
    </BrowserRouter>
  </React.StrictMode>,
)
