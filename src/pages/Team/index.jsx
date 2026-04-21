import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import fireFrag from '../../shaders/showcase-fire.glsl'
import Nav from '../../components/layout/Nav'
import { departments } from '../../content/team'
import logo from '../../assets/images/asbirtechlogo.png'
import placeholderPhoto from '../../assets/images/Mike.png'
import './TeamPage.css'

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
    <div className="tp-fire-bg" ref={containerRef} aria-hidden="true">
      <canvas className="tp-fire-canvas" ref={canvasRef} />
    </div>
  )
}

const totalMembers = departments.reduce((sum, d) => sum + d.members.length, 0)
const ALL = 'All'
const filterLabels = [ALL, ...departments.map(d => d.name)]

export default function TeamPage() {
  const [active, setActive] = useState(ALL)

  const visible = active === ALL
    ? departments
    : departments.filter(d => d.name === active)

  return (
    <div className="tp-page">

      {/* ── Fire hero ── */}
      <div className="tp-hero-section">
        <FireBackground />
        <div className="tp-hero-vignette" />
        <div className="tp-nav-wrap container"><Nav /></div>
        <div className="tp-hero-content">
          <h1 className="tp-hero-title">Our Team</h1>
        </div>
      </div>

      <main className="tp-main">
        <div className="container">

          {/* ── Intro ── */}
          <header className="tp-intro">
            <h2 className="tp-headline">
              The people behind<br />every solution
            </h2>
            <p className="tp-subheadline">
              We're a team of {totalMembers}+ engineers, designers, product managers, and strategists
              spread across multiple disciplines — all working toward the same goal of delivering
              technology that makes a real difference.
            </p>
          </header>

          {/* ── Filter bar ── */}
          <div className="tp-filter-bar" role="tablist" aria-label="Filter by department">
            {filterLabels.map(label => (
              <button
                key={label}
                role="tab"
                aria-selected={active === label}
                className={`tp-filter-btn${active === label ? ' tp-filter-btn--active' : ''}`}
                onClick={() => setActive(label)}
              >
                {label}
              </button>
            ))}
          </div>

          {/* ── Department sections ── */}
          {visible.map(dept => (
            <section key={dept.id} className="tp-dept">
              <div className="tp-dept-header">
                <h3 className="tp-dept-name">{dept.name}</h3>
                <span className="tp-dept-count">{dept.members.length}</span>
              </div>
              <div className="tp-members-grid">
                {dept.members.map(member => (
                  <div key={member.name} className="tp-member-card">
                    <img className="tp-member-avatar" src={placeholderPhoto} alt="" aria-hidden="true" />
                    <div className="tp-member-overlay" aria-hidden="true" />
                    <div className="tp-member-info">
                      <span className="tp-member-name">{member.name}</span>
                      <span className="tp-member-role">{member.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}

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
