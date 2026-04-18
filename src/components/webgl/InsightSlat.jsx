import { useEffect, useRef } from 'react'
import fireFrag  from '../../shaders/showcase-fire.glsl'
import emberFrag from '../../shaders/showcase-ember.glsl'
import goldFrag  from '../../shaders/showcase-gold.glsl'

const VERT = `attribute vec2 a_pos; void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }`

const VARIANTS = {
  fire:  { frag: fireFrag,  blindCount: 32 },
  ember: { frag: emberFrag, blindCount: 36 },
  gold:  { frag: goldFrag,  blindCount: 30 },
}

export default function InsightSlat({ variant = 'fire' }) {
  const containerRef = useRef(null)
  const canvasRef    = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas    = canvasRef.current
    if (!container || !canvas) return

    const gl = canvas.getContext('webgl', { antialias: false, alpha: false })
    if (!gl) return

    const { frag, blindCount } = VARIANTS[variant] ?? VARIANTS.fire

    const compile = (type, src) => {
      const s = gl.createShader(type)
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }
    const prog = gl.createProgram()
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(prog, 'a_pos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uRes    = gl.getUniformLocation(prog, 'u_res')
    const uBlinds = gl.getUniformLocation(prog, 'u_blinds')
    const uReveal = gl.getUniformLocation(prog, 'u_reveal')

    gl.uniform1f(uBlinds, blindCount)

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
          reveal += (1.0 - reveal) * 0.028
          draw()
          if (reveal < 0.999) {
            rafId = requestAnimationFrame(tick)
          } else {
            reveal = 1.0
            draw()
          }
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
  }, [variant])

  return (
    <div className="insight-slat-wrap" ref={containerRef} aria-hidden="true">
      <canvas className="insight-slat-canvas" ref={canvasRef} />
    </div>
  )
}
