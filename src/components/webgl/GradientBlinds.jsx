import { useEffect, useRef, useState } from 'react';
import './GradientBlinds.css';

const getResponsiveBlindCount = (base) => {
  const w = window.innerWidth;
  if (w <= 480) return Math.max(8, Math.round(base * 0.40));
  if (w <= 768) return Math.max(12, Math.round(base * 0.55));
  return base;
};

const GradientBlinds = ({
  className = '',
  blindCount = 28,
  mouseDampening = 0.1,
  disableHover = false,
}) => {
  const [activeBlindCount, setActiveBlindCount] = useState(() => getResponsiveBlindCount(blindCount));
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const mouseTargetRef = useRef({ x: -1, y: -1 }); // -1 = no hover
  const mouseCurrentRef = useRef({ x: -1, y: -1 });
  const lastTimeRef = useRef(null);

  useEffect(() => {
    const onResize = () => setActiveBlindCount(getResponsiveBlindCount(blindCount));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [blindCount]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const gl = canvas.getContext('webgl', { antialias: false, alpha: false });
    if (!gl) return;

    const vert = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

    const frag = `
precision highp float;
uniform vec2  u_res;
uniform float u_blinds;
uniform float u_reveal;
uniform vec2  u_mouse;   // -1,-1 means no hover

vec3 ramp(float t) {
  vec3 c0 = vec3(0.00, 0.000, 0.000);
  vec3 c1 = vec3(0.18, 0.018, 0.000);
  vec3 c2 = vec3(0.60, 0.080, 0.000);
  vec3 c3 = vec3(0.886, 0.235, 0.000);
  vec3 c4 = vec3(0.97, 0.520, 0.060);

  if (t < 0.20) return mix(c0, c1, t / 0.20);
  if (t < 0.45) return mix(c1, c2, (t - 0.20) / 0.25);
  if (t < 0.72) return mix(c2, c3, (t - 0.45) / 0.27);
               return mix(c3, c4, (t - 0.72) / 0.28);
}

float lightFalloff(vec2 uv, vec2 src, float aspect, float radius, float squeeze) {
  vec2 d = vec2((uv.x - src.x) * aspect, uv.y - src.y);
  float ang = -0.58;
  float ca = cos(ang), sa = sin(ang);
  vec2 dr = vec2(d.x*ca - d.y*sa, d.x*sa + d.y*ca);
  dr.y *= squeeze;
  float dist = length(dr);
  float l = 1.0 - smoothstep(0.0, radius, dist);
  return pow(l, 2.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / u_res.y;

  float lightR = lightFalloff(uv, vec2(1.0, 1.0), aspect, 1.85, 0.28);
  float lightL = lightFalloff(uv, vec2(0.0, 0.0), aspect, 1.20, 0.28);
  float lightAmt = max(lightR, lightL);

  float slatT   = fract(uv.x * u_blinds);
  float gapMask = smoothstep(0.0, 0.035, slatT);  // 0 in gap, 1 on face

  float hoverAmt = 0.0;
  if (u_mouse.x >= 0.0) {
    vec2 d = vec2((uv.x - u_mouse.x) * aspect, uv.y - u_mouse.y);
    float ang = -0.58;
    float ca = cos(ang), sa = sin(ang);
    vec2 dr = vec2(d.x*ca - d.y*sa, d.x*sa + d.y*ca);
    dr.y *= 0.45;
    float dist = length(dr);
    float raw = 1.0 - smoothstep(0.0, 0.35, dist);
    raw = pow(raw, 2.0) * 0.75;
    hoverAmt = raw * gapMask * max(lightAmt, 0.15);
  }

  float totalLight = clamp(lightAmt + hoverAmt, 0.0, 1.0);

  float rimGlow = (1.0 - smoothstep(0.88, 1.0, slatT)) * totalLight * 0.7;
  float face    = slatT * 0.72 * totalLight;

  float gapLight = 0.0;
  if (u_mouse.x >= 0.0) {
    vec2 d2 = vec2((uv.x - u_mouse.x) * aspect, uv.y - u_mouse.y);
    float ang2 = -0.58;
    float ca2 = cos(ang2), sa2 = sin(ang2);
    vec2 dr2 = vec2(d2.x*ca2 - d2.y*sa2, d2.x*sa2 + d2.y*ca2);
    dr2.y *= 0.45;
    float gapHover = pow(1.0 - smoothstep(0.0, 0.30, length(dr2)), 2.5);
    gapLight = gapHover * 0.55 * (1.0 - gapMask); // only in gap region
  }

  float gapFloor   = mix(0.0, 0.07, totalLight);
  float brightness = (face + rimGlow) * mix(gapFloor, 1.0, gapMask) + gapLight;

  brightness *= 1.15 * u_reveal;

  vec3 col = ramp(clamp(brightness, 0.0, 1.0));

  float centerDark = exp(-pow((uv.x - 0.5) * 2.2, 2.0) * 1.8);
  col *= (1.0 - centerDark * 0.72);

  float vigY = uv.y * (1.0 - uv.y) * 4.0;
  col *= pow(clamp(vigY, 0.0, 1.0), 0.25);

  gl_FragColor = vec4(col, 1.0);
}
`;

    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vert));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes    = gl.getUniformLocation(prog, 'u_res');
    const uBlinds = gl.getUniformLocation(prog, 'u_blinds');
    const uReveal = gl.getUniformLocation(prog, 'u_reveal');
    const uMouse  = gl.getUniformLocation(prog, 'u_mouse');

    gl.uniform1f(uBlinds, activeBlindCount);
    gl.uniform1f(uReveal, 0);
    gl.uniform2f(uMouse, -1, -1);

    const resize = () => {
      const r = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width  = Math.round(r.width  * dpr);
      canvas.height = Math.round(r.height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();

    let reveal = 0
    let revealRaf = null
    let active = true

    const render = () => {
      gl.uniform1f(uReveal, reveal)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
    render();

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && reveal < 0.999) {
        const tick = () => {
          if (!active) return
          reveal += (1.0 - reveal) * 0.028
          render()
          if (reveal < 0.999) {
            revealRaf = requestAnimationFrame(tick)
          } else {
            reveal = 1.0
            render()
          }
        }
        revealRaf = requestAnimationFrame(tick)
      }
    }, { threshold: 0.15 })
    io.observe(container)

    const ro = new ResizeObserver(() => { resize(); render(); });
    ro.observe(container);

    const onMove = e => {
      const r = container.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width;
      const ny = 1.0 - (e.clientY - r.top) / r.height;
      if (nx >= 0 && nx <= 1 && ny >= 0 && ny <= 1) {
        mouseTargetRef.current = { x: nx, y: ny };
      } else {
        mouseTargetRef.current = { x: -1, y: -1 };
      }
    };
    const onLeave = () => { mouseTargetRef.current = { x: -1, y: -1 }; };

    if (!disableHover) {
      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerleave', onLeave);
    }

    const loop = ts => {
      rafRef.current = requestAnimationFrame(loop);
      const dt = lastTimeRef.current ? Math.min((ts - lastTimeRef.current) / 1000, 0.1) : 0.016;
      lastTimeRef.current = ts;

      const tau    = Math.max(1e-4, mouseDampening);
      const factor = 1 - Math.exp(-dt / tau);
      const cur = mouseCurrentRef.current;
      const tgt = mouseTargetRef.current;

      cur.x += (tgt.x - cur.x) * factor;
      cur.y += (tgt.y - cur.y) * factor;

      gl.uniform2f(uMouse, cur.x, cur.y);
      render();
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      active = false
      cancelAnimationFrame(rafRef.current);
      cancelAnimationFrame(revealRaf)
      if (!disableHover) {
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerleave', onLeave);
      }
      ro.disconnect();
      io.disconnect()
    };
  }, [activeBlindCount, mouseDampening]);

  return (
    <div ref={containerRef} className={`gradient-blinds-container ${className}`}>
      <canvas ref={canvasRef} className="gradient-blinds-canvas" />
    </div>
  );
};

export default GradientBlinds;
