import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { LuArrowUpRight } from 'react-icons/lu'
import fireFrag from '../shaders/showcase-fire.glsl'
import Nav from '../components/layout/Nav'
import logo from '../assets/images/asbirtechlogo.png'
import './NotFoundPage.css'

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

    let reveal = 0
    let rafId  = null
    let active = true

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

    return () => {
      active = false
      cancelAnimationFrame(rafId)
      ro.disconnect()
    }
  }, [])

  return (
    <div className="nf-fire-bg" ref={containerRef} aria-hidden="true">
      <canvas className="nf-fire-canvas" ref={canvasRef} />
    </div>
  )
}

export default function NotFoundPage() {
  return (
    <div className="nf-page">

      <FireBackground />
      <div className="nf-vignette" />

      <div className="container"><Nav /></div>

      <main className="nf-content">
        <span className="nf-code">404</span>
        <h1 className="nf-heading">Page not found.</h1>
        <p className="nf-desc">
          The page you're looking for doesn't exist or may have been moved.
          Head back and keep exploring.
        </p>
        <Link to="/" className="nf-btn">
          Go back home <LuArrowUpRight aria-hidden="true" />
        </Link>
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
