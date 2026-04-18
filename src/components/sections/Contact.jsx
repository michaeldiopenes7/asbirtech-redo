import { useEffect, useRef } from 'react'
import { LuArrowUpRight, LuMail, LuPhone, LuMapPin } from 'react-icons/lu'
import fireFrag from '../../shaders/showcase-fire.glsl'
import './Contact.css'

const VERT = `attribute vec2 a_pos; void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }`

const contactItems = [
  { icon: LuMail,    value: 'hello@asbirtech.com',      href: 'mailto:hello@asbirtech.com' },
  { icon: LuPhone,   value: '+1 (555) 000-0000',        href: 'tel:+15550000000' },
  { icon: LuMapPin,  value: '123 Cloud Street, Tech City', href: null },
]

function ContactSlat() {
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

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && reveal < 0.999) {
        const tick = () => {
          if (!active) return
          reveal += (1.0 - reveal) * 0.022
          draw()
          if (reveal < 0.999) rafId = requestAnimationFrame(tick)
          else { reveal = 1.0; draw() }
        }
        rafId = requestAnimationFrame(tick)
      }
    }, { threshold: 0.1 })
    io.observe(container)

    const ro = new ResizeObserver(draw)
    ro.observe(container)
    draw()

    return () => {
      active = false
      cancelAnimationFrame(rafId)
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  return (
    <div className="contact-slat-wrap" ref={containerRef} aria-hidden="true">
      <canvas className="contact-slat-canvas" ref={canvasRef} />
    </div>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="contact" aria-labelledby="contact-heading">
      <div className="container">
        <div className="contact-card">
          <ContactSlat />
          <div className="contact-overlay" />
          <div className="contact-content" data-reveal>
            <h2 id="contact-heading" className="contact-headline">
              Talk to us today
            </h2>
            <p className="contact-desc">
              Our team delivers strategic support in building and managing your cloud
              and web infrastructure, driving operational excellence and reliability.
            </p>
            <a href="mailto:hello@asbirtech.com" className="contact-btn">
              Get in touch <LuArrowUpRight aria-hidden="true" />
            </a>
            <div className="contact-meta">
              {contactItems.map(({ icon: Icon, value, href }, i) => (
                <span key={value} className="contact-meta-item">
                  {i > 0 && <span className="contact-meta-divider" aria-hidden="true" />}
                  <Icon size={13} aria-hidden="true" />
                  {href
                    ? <a href={href}>{value}</a>
                    : <span>{value}</span>
                  }
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
