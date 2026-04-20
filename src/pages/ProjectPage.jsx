import { useEffect, useRef } from 'react'
import { useParams, Link, Navigate, useLocation } from 'react-router-dom'
import { LuArrowUpRight } from 'react-icons/lu'
import { projects } from '../content/projects'
import Nav from '../components/layout/Nav'
import logo from '../assets/images/asbirtechlogo.png'
import fireFrag  from '../shaders/showcase-fire.glsl'
import emberFrag from '../shaders/showcase-ember.glsl'
import goldFrag  from '../shaders/showcase-gold.glsl'
import './ProjectPage.css'

const VERT   = `attribute vec2 a_pos; void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }`
const FRAGS  = { fire: fireFrag, ember: emberFrag, gold: goldFrag }
const BLINDS = { fire: 38, ember: 42, gold: 38 }

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function ProjectVisual({ variant = 'fire' }) {
  const containerRef = useRef(null)
  const canvasRef    = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas    = canvasRef.current
    if (!container || !canvas) return

    const gl = canvas.getContext('webgl', { antialias: false, alpha: false })
    if (!gl) return

    const compile = (type, src) => {
      const s = gl.createShader(type)
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }
    const prog = gl.createProgram()
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAGS[variant]))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(prog, 'a_pos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uRes    = gl.getUniformLocation(prog, 'u_res')
    const uBlinds = gl.getUniformLocation(prog, 'u_blinds')
    const uReveal = gl.getUniformLocation(prog, 'u_reveal')
    gl.uniform1f(uBlinds, BLINDS[variant])

    let reveal = 0, rafId = null, active = true

    const draw = () => {
      const r = container.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width  = Math.round(r.width  * dpr)
      canvas.height = Math.round(r.height * dpr)
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uReveal, reveal)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    const tick = () => {
      if (!active) return
      reveal += (1.0 - reveal) * 0.022
      draw()
      if (reveal < 0.999) rafId = requestAnimationFrame(tick)
      else { reveal = 1.0; draw() }
    }
    rafId = requestAnimationFrame(tick)

    const ro = new ResizeObserver(draw)
    ro.observe(container)
    draw()

    return () => { active = false; cancelAnimationFrame(rafId); ro.disconnect() }
  }, [variant])

  return (
    <div className="pp-visual-wrap" ref={containerRef} aria-hidden="true">
      <canvas className="pp-visual-canvas" ref={canvasRef} />
    </div>
  )
}

export default function ProjectPage() {
  const { id } = useParams()
  const project = projects.find(p => p.id === id)

  if (!project) return <Navigate to="/" replace />

  const related = projects.filter(p => p.id !== id)

  return (
    <>
      <ScrollToTop />

      <div className="pp-nav-wrap container">
        <Nav />
      </div>

      <main className="pp-main">

        {/* ── Title ── */}
        <div className="pp-hero">
          <h1 className="pp-title">{project.title}</h1>
        </div>

        {/* ── Meta row: avatar + client info + divider + services + optional link ── */}
        <div className="pp-meta-wrap">
          <div className="pp-meta-row">
            <div className="pp-meta-item">
              <div className="pp-meta-avatar">
                {project.client.split(' ').map(w => w[0]).join('').slice(0, 2)}
              </div>
              <div className="pp-meta-info">
                <span className="pp-meta-name">{project.client}</span>
                <span className="pp-meta-sub">{project.tags[0]}</span>
              </div>
            </div>

            <div className="pp-meta-sep" />

            <div className="pp-meta-item">
              <div className="pp-meta-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
              <div className="pp-meta-info">
                <span className="pp-meta-sub">Services</span>
                <span className="pp-meta-name">{project.tags.join(', ')}</span>
              </div>
            </div>

            {project.href && (
              <a href={project.href} target="_blank" rel="noopener noreferrer" className="pp-meta-link">
                Visit Site <LuArrowUpRight size={13} />
              </a>
            )}
          </div>
        </div>

        {/* ── WebGL cover ── */}
        <div className="pp-cover">
          <ProjectVisual variant={project.variant} />
        </div>

        {/* ── Body ── */}
        <div className="pp-body">
          <p className="pp-description">{project.description}</p>

          {project.body?.map((block, i) => {
            if (block.type === 'heading')
              return <h2 key={i} className="pp-section-heading">{block.text}</h2>
            if (block.type === 'paragraph')
              return (
                <p key={i} className="pp-paragraph">
                  {block.bold && <strong>{block.bold}</strong>}
                  {block.text}
                </p>
              )
            if (block.type === 'list')
              return (
                <ul key={i} className="pp-list">
                  {block.items.map((item, j) => (
                    <li key={j} className="pp-list-item">
                      {item.bold && <strong>{item.bold}</strong>}
                      {item.text}
                    </li>
                  ))}
                </ul>
              )
            if (block.type === 'image')
              return (
                <figure key={i} className="pp-figure">
                  <img src={block.src} alt={block.alt || ''} className="pp-figure-img" />
                  {block.caption && <figcaption className="pp-figure-caption">{block.caption}</figcaption>}
                </figure>
              )
            return null
          })}
        </div>

        {/* ── Related projects ── */}
        {related.length > 0 && (
          <div className="pp-related">
            <div className="pp-related-inner">
              <div className="pp-related-header">
                <h2 className="pp-related-heading">More Projects</h2>
                <Link to="/#work" className="pp-related-view-all">
                  View all <LuArrowUpRight size={14} />
                </Link>
              </div>
              <div className="pp-related-grid">
                {related.map(p => (
                  <Link key={p.id} to={`/projects/${p.id}`} className="pp-related-card">
                    <div className="pp-related-visual">
                      <ProjectVisual variant={p.variant} />
                      <div className="pp-related-overlay">
                        <span className="pp-related-client">{p.client}</span>
                        <h3 className="pp-related-title">{p.title}</h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
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
