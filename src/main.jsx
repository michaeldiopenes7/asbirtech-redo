import React, { lazy, Suspense, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import App from './App'
import './index.css'

const ArticlePage = lazy(() => import('./pages/Article'))
const ArticlesPage = lazy(() => import('./pages/Articles'))
const ContactPage = lazy(() => import('./pages/Contact'))
const ProjectPage = lazy(() => import('./pages/Project'))
const TeamPage = lazy(() => import('./pages/Team'))
const NotFoundPage = lazy(() => import('./pages/NotFound'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function RouteFallback() {
  return <div style={{ minHeight: '100vh', background: '#000' }} aria-hidden="true" />
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
    </BrowserRouter>
  </React.StrictMode>,
)
