import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LuArrowUpRight } from 'react-icons/lu'
import fireFrag from '../../shaders/showcase-fire.glsl'
import Nav from '../../components/layout/Nav'
import { insights } from '../../content/insights'
import logo from '../../assets/images/asbirtechlogo.png'
import './ArticlesPage.css'

const VERT = `attribute vec2 a_pos; void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }`

function FireBackground() {
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
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fireFrag))
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
    gl.uniform1f(uBlinds, 52)

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
  }, [])

  return (
    <div className="ap-fire-bg" ref={containerRef} aria-hidden="true">
      <canvas className="ap-fire-canvas" ref={canvasRef} />
    </div>
  )
}

export default function ArticlesPage() {
  return (
    <div className="ap-page">

      <div className="ap-hero-section">
        <FireBackground />
        <div className="ap-hero-vignette" />
        <div className="ap-nav-wrap container"><Nav /></div>
        <div className="ap-hero-content">
          <h1 className="ap-hero-title">Articles</h1>
        </div>
      </div>

      <main className="ap-main">
        <div className="container">

          <header className="ap-intro">
            <h2 className="ap-headline">
              Insights, updates &<br />industry thinking
            </h2>
            <p className="ap-subheadline">
              Perspectives from the Asbir Tech team and the wider tech industry — on software,
              design, AI, and what's shaping the work we do.
            </p>
          </header>

          <div className="ap-grid">
            {insights.map(post => {
              const isExternal = !post.body?.length
              const cardProps = isExternal
                ? { as: 'a', href: post.href, target: '_blank', rel: 'noopener noreferrer' }
                : { as: Link, to: `/articles/${post.id}` }

              const El = cardProps.as
              const props = isExternal
                ? { href: cardProps.href, target: cardProps.target, rel: cardProps.rel }
                : { to: cardProps.to }

              return (
                <El key={post.id} {...props} className="ap-card">
                  <div className="ap-card-image">
                    {post.image && <img src={post.image} alt={post.title} />}
                  </div>
                  <div className="ap-card-body">
                    <div className="ap-card-meta">
                      <span className="ap-card-category">{post.category}</span>
                      <span className="ap-card-date">{post.date}</span>
                    </div>
                    <h3 className="ap-card-title">{post.title}</h3>
                    <div className="ap-card-footer">
                      <div className="ap-card-author">
                        <div className="ap-card-author-avatar">
                          {post.author.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div className="ap-card-author-info">
                          <span className="ap-card-author-name">{post.author.name}</span>
                          <span className="ap-card-author-role">{post.author.role}</span>
                        </div>
                      </div>
                      <LuArrowUpRight className="ap-card-arrow" aria-hidden="true" />
                    </div>
                  </div>
                </El>
              )
            })}
          </div>

        </div>
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

    </div>
  )
}
