import { useEffect, useRef } from 'react'

const VARIANTS = {
  // deep navy → purple → hot pink (BeetzeePLAY)
  fire: {
    blindCount: 22,
    frag: `
precision highp float;
uniform vec2 u_res;
uniform float u_blinds;

vec3 ramp(float t) {
  vec3 c0 = vec3(0.00, 0.00, 0.00);
  vec3 c1 = vec3(0.18, 0.03, 0.00);
  vec3 c2 = vec3(0.45, 0.08, 0.00);
  vec3 c3 = vec3(0.72, 0.18, 0.02);
  vec3 c4 = vec3(0.95, 0.38, 0.05);
  if (t < 0.20) return mix(c0, c1, t / 0.20);
  if (t < 0.45) return mix(c1, c2, (t - 0.20) / 0.25);
  if (t < 0.72) return mix(c2, c3, (t - 0.45) / 0.27);
               return mix(c3, c4, (t - 0.72) / 0.28);
}

float falloff(vec2 uv, vec2 src, float aspect, float r, float sq) {
  vec2 d = vec2((uv.x - src.x) * aspect, uv.y - src.y);
  float ang = 0.40; float ca = cos(ang), sa = sin(ang);
  vec2 dr = vec2(d.x*ca - d.y*sa, d.x*sa + d.y*ca);
  dr.y *= sq;
  return pow(1.0 - smoothstep(0.0, r, length(dr)), 2.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / u_res.y;
  float light = max(
    falloff(uv, vec2(0.85, 0.05), aspect, 1.65, 0.35),
    falloff(uv, vec2(0.10, 1.0),  aspect, 1.20, 0.42) * 0.55
  );
  float slatT = fract(uv.x * u_blinds);
  float gap = smoothstep(0.0, 0.04, slatT);
  float rim = (1.0 - smoothstep(0.86, 1.0, slatT)) * light * 0.8;
  float face = slatT * 0.75 * light;
  float gapFloor = mix(0.0, 0.06, light);
  float b = ((face + rim) * mix(gapFloor, 1.0, gap)) * 1.2;
  float cx = exp(-pow((uv.x - 0.45) * 2.0, 2.0) * 1.5);
  vec3 col = ramp(clamp(b, 0.0, 1.0)) * (1.0 - cx * 0.60);
  float vig = uv.y * (1.0 - uv.y) * 4.0;
  col *= pow(clamp(vig, 0.0, 1.0), 0.20);
  gl_FragColor = vec4(col, 1.0);
}`,
  },

  // forest green → #3aa22c green (PlanOut)
  ember: {
    blindCount: 30,
    frag: `
precision highp float;
uniform vec2 u_res;
uniform float u_blinds;

vec3 ramp(float t) {
  vec3 c0 = vec3(0.00, 0.00, 0.00);
  vec3 c1 = vec3(0.20, 0.04, 0.00);
  vec3 c2 = vec3(0.48, 0.10, 0.00);
  vec3 c3 = vec3(0.75, 0.20, 0.02);
  vec3 c4 = vec3(0.98, 0.42, 0.06);
  if (t < 0.20) return mix(c0, c1, t / 0.20);
  if (t < 0.45) return mix(c1, c2, (t - 0.20) / 0.25);
  if (t < 0.72) return mix(c2, c3, (t - 0.45) / 0.27);
               return mix(c3, c4, (t - 0.72) / 0.28);
}

float falloff(vec2 uv, vec2 src, float aspect, float r, float sq) {
  vec2 d = vec2((uv.x - src.x) * aspect, uv.y - src.y);
  float ang = 0.60; float ca = cos(ang), sa = sin(ang);
  vec2 dr = vec2(d.x*ca - d.y*sa, d.x*sa + d.y*ca);
  dr.y *= sq;
  return pow(1.0 - smoothstep(0.0, r, length(dr)), 2.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / u_res.y;
  // PlanOut: light rakes in from bottom-right corner, secondary top-left
  float light = max(
    falloff(uv, vec2(1.10, 0.00), aspect, 1.45, 0.38),
    falloff(uv, vec2(0.00, 1.10), aspect, 1.00, 0.55) * 0.40
  );
  float slatT = fract(uv.x * u_blinds);
  float gap = smoothstep(0.0, 0.04, slatT);
  float rim = (1.0 - smoothstep(0.86, 1.0, slatT)) * light * 0.8;
  float face = slatT * 0.75 * light;
  float gapFloor = mix(0.0, 0.06, light);
  float b = ((face + rim) * mix(gapFloor, 1.0, gap)) * 1.2;
  float cx = exp(-pow((uv.x - 0.35) * 2.0, 2.0) * 1.3);
  vec3 col = ramp(clamp(b, 0.0, 1.0)) * (1.0 - cx * 0.60);
  float vig = uv.y * (1.0 - uv.y) * 4.0;
  col *= pow(clamp(vig, 0.0, 1.0), 0.20);
  gl_FragColor = vec4(col, 1.0);
}`,
  },

  // dark blue → neon lime green (Korte)
  gold: {
    blindCount: 22,
    frag: `
precision highp float;
uniform vec2 u_res;
uniform float u_blinds;

vec3 ramp(float t) {
  vec3 c0 = vec3(0.00, 0.00, 0.00);
  vec3 c1 = vec3(0.15, 0.03, 0.00);
  vec3 c2 = vec3(0.38, 0.08, 0.00);
  vec3 c3 = vec3(0.65, 0.16, 0.01);
  vec3 c4 = vec3(0.90, 0.35, 0.04);
  if (t < 0.20) return mix(c0, c1, t / 0.20);
  if (t < 0.45) return mix(c1, c2, (t - 0.20) / 0.25);
  if (t < 0.72) return mix(c2, c3, (t - 0.45) / 0.27);
               return mix(c3, c4, (t - 0.72) / 0.28);
}

float falloff(vec2 uv, vec2 src, float aspect, float r, float sq) {
  vec2 d = vec2((uv.x - src.x) * aspect, uv.y - src.y);
  float ang = -0.30; float ca = cos(ang), sa = sin(ang);
  vec2 dr = vec2(d.x*ca - d.y*sa, d.x*sa + d.y*ca);
  dr.y *= sq;
  return pow(1.0 - smoothstep(0.0, r, length(dr)), 2.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / u_res.y;
  // Korte: light blooms from left-center, faint secondary top-right
  float light = max(
    falloff(uv, vec2(-0.10, 0.55), aspect, 1.40, 0.38),
    falloff(uv, vec2(1.00, 1.10), aspect, 1.10, 0.42) * 0.50
  );
  float slatT = fract(uv.x * u_blinds);
  float gap = smoothstep(0.0, 0.03, slatT);
  float rim = (1.0 - smoothstep(0.90, 1.0, slatT)) * light * 0.6;
  float face = slatT * 0.70 * light;
  float gapFloor = mix(0.0, 0.08, light);
  float b = ((face + rim) * mix(gapFloor, 1.0, gap)) * 1.10;
  float cx = exp(-pow((uv.x - 0.55) * 2.0, 2.0) * 1.4);
  vec3 col = ramp(clamp(b, 0.0, 1.0)) * (1.0 - cx * 0.55);
  float vig = uv.y * (1.0 - uv.y) * 4.0;
  col *= pow(clamp(vig, 0.0, 1.0), 0.30);
  gl_FragColor = vec4(col, 1.0);
}`,
  },
}

const vert = `attribute vec2 a_pos; void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }`

function WebGLCard({ variant, client, title }) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const gl = canvas.getContext('webgl', { antialias: false, alpha: false })
    if (!gl) return

    const { blindCount, frag } = VARIANTS[variant]

    const compile = (type, src) => {
      const s = gl.createShader(type)
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }
    const prog = gl.createProgram()
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vert))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag))
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
    gl.uniform1f(uBlinds, blindCount)

    const resize = () => {
      const r = container.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width  = Math.round(r.width  * dpr)
      canvas.height = Math.round(r.height * dpr)
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(container)
    return () => ro.disconnect()
  }, [variant])

  return (
    <div className="showcase-card" ref={containerRef}>
      <canvas className="showcase-card-canvas" ref={canvasRef} />
      <div className="showcase-card-overlay" />
      <div className="showcase-card-content">
        <span className="showcase-card-client">{client}</span>
        <h3 className="showcase-card-title">{title}</h3>
      </div>
    </div>
  )
}

export default function ShowcaseCard({ variant = 'fire', client, title }) {
  return <WebGLCard variant={variant} client={client} title={title} />
}
