import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import ArticlePage from './pages/ArticlePage'
import ContactPage from './pages/ContactPage'
import ProjectPage from './pages/ProjectPage'
import NotFoundPage from './pages/NotFoundPage'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/articles/:id" element={<ArticlePage />} />
        <Route path="/projects/:id" element={<ProjectPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
