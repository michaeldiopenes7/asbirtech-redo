import { useRef, useState, useEffect } from 'react'
import { LuArrowUpRight, LuMail, LuPhone, LuCalendar, LuMapPin } from 'react-icons/lu'
import fireFrag from '../shaders/showcase-fire.glsl'
import Nav from '../components/layout/Nav'
import logo from '../assets/images/asbirtechlogo.png'
import 'leaflet/dist/leaflet.css'
import './ContactPage.css'

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
    <div className="cp-fire-bg" ref={containerRef} aria-hidden="true">
      <canvas className="cp-fire-canvas" ref={canvasRef} />
    </div>
  )
}

const LAT = 9.292907058717976
const LNG = 123.3015111121681

const ctaCards = [
  {
    icon: LuMail,
    label: 'Email us',
    value: 'hello@asbirtech.com',
    desc: null,
    href: 'mailto:hello@asbirtech.com',
  },
  {
    icon: LuPhone,
    label: 'Call us',
    value: '+63 (35) 422-0000',
    desc: 'Mon–Fri, 9 am – 6 pm PHT',
    href: 'tel:+6335422000',
  },
  {
    icon: LuCalendar,
    label: 'Book a discovery call',
    value: 'Schedule 30 min',
    desc: null,
    href: 'mailto:hello@asbirtech.com?subject=Discovery%20Call%20Request',
  },
]

function LeafletMap() {
  const mapRef = useRef(null)

  useEffect(() => {
    let map = null

    import('leaflet').then(Lmod => {
      const L = Lmod.default ?? Lmod
      if (mapRef.current._leaflet_id) return

      map = L.map(mapRef.current, {
        center: [LAT, LNG],
        zoom: 15,
        zoomControl: false,
        scrollWheelZoom: false,
        dragging: false,
        attributionControl: false,
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

      const icon = L.divIcon({
        className: '',
        html: `<div class="cp-marker"><div class="cp-marker-ring"></div><div class="cp-marker-dot"></div></div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      })
      L.marker([LAT, LNG], { icon }).addTo(map)
    })

    return () => { if (map) map.remove() }
  }, [])

  return <div ref={mapRef} className="cp-map-leaflet" />
}

export default function ContactPage() {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef(null)

  const copyAddress = () => {
    navigator.clipboard.writeText(
      'Señor Sto. Niño Drive, Mangnao, Dumaguete City, 6200 Negros Oriental'
    )
    setCopied(true)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="cp-page">

      <div className="cp-hero-section">
        <FireBackground />
        <div className="cp-hero-vignette" />
        <div className="cp-nav-wrap container"><Nav /></div>
        <div className="cp-hero-content">
          <h1 className="cp-hero-title">Contact us</h1>
        </div>
      </div>

      <main className="cp-main">
        <div className="container">

          <header className="cp-hero">
            <h2 className="cp-headline">Let's build something<br />together</h2>
            <p className="cp-subheadline">
              Whether you have a project in mind or just want to explore what's possible,
              our team in Dumaguete is ready to help.
            </p>
          </header>

          <div className="cp-grid">

            <div className="cp-map-col">
              <div className="cp-map-wrap">
                <LeafletMap />
                <div className="cp-map-vignette" aria-hidden="true" />
              </div>

              <button
                className="cp-address"
                onClick={copyAddress}
                type="button"
                title="Click to copy full address"
              >
                <LuMapPin size={14} className="cp-address-icon" aria-hidden="true" />
                <span className="cp-address-text">
                  Señor Sto. Niño Drive, Mangnao, Dumaguete City, 6200 Negros Oriental
                </span>
                <span className="cp-address-copy">{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            <div className="cp-cta-col">

              <div className="cp-cards">
                {ctaCards.map(({ icon: Icon, label, value, desc, href }) => (
                  <a key={href} href={href} className="cp-card">
                    <span className="cp-card-icon">
                      <Icon size={18} aria-hidden="true" />
                    </span>
                    <span className="cp-card-body">
                      <span className="cp-card-label">{label}</span>
                      <span className="cp-card-value">{value}</span>
                      {desc && <span className="cp-card-desc">{desc}</span>}
                    </span>
                    <LuArrowUpRight className="cp-card-arrow" size={16} aria-hidden="true" />
                  </a>
                ))}
              </div>

              <a href="mailto:hello@asbirtech.com" className="cp-primary-btn">
                Start a project <LuArrowUpRight size={16} aria-hidden="true" />
              </a>

              <p className="cp-footnote">
                No commitments — we'll get back to you within one business day.
              </p>

            </div>
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
