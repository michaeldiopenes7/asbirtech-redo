precision highp float;
uniform vec2  u_res;
uniform float u_blinds;
uniform float u_reveal;

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
    falloff(uv, vec2(0.80, 0.08), aspect, 1.10, 0.30),
    falloff(uv, vec2(0.12, 0.95), aspect, 0.80, 0.38) * 0.45
  ) * u_reveal;

  float slatT    = fract(uv.x * u_blinds);
  float gap      = smoothstep(0.0, 0.04, slatT);
  float rim      = (1.0 - smoothstep(0.88, 1.0, slatT)) * light * 0.7;
  float face     = slatT * 0.65 * light;
  float gapFloor = mix(0.0, 0.04, light);
  float b        = ((face + rim) * mix(gapFloor, 1.0, gap)) * 1.05;

  float cx  = exp(-pow((uv.x - 0.45) * 2.2, 2.0) * 2.0);
  vec3  col = ramp(clamp(b, 0.0, 1.0)) * (1.0 - cx * 0.70);

  float vig = uv.y * (1.0 - uv.y) * 4.0;
  col *= pow(clamp(vig, 0.0, 1.0), 0.30);

  gl_FragColor = vec4(col, 1.0);
}
