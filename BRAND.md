# BRAND.md

Brand reference for Asbir Tech — use this when writing copy, choosing colors, adding UI elements, or designing new sections.

---

## Identity

**Company:** Asbir Tech (legal: AsbirTech, Inc.)
**Location:** Dumaguete, Philippines
**Markets:** Southeast Asia, Australia
**Tagline / Hero headline:** "Modern Problems Require Modern Solutions"

**One-line pitch:**
> From streaming platforms to booking marketplaces — we design, build, and ship software that scales with the businesses behind it.

**Who we are (About copy):**
> A web development and IT consulting team based in the Philippines, working with businesses across Southeast Asia and Australia. We embed with your team, move fast, and build things built to last.

**Team size:** 40+ people

---

## Voice & Tone

- **Direct and confident.** Lead with the outcome, not the process. "Full-stack websites and web apps — fast, scalable, and built to your spec." Not "We provide comprehensive web development services."
- **No fluff.** Every sentence earns its place. Avoid filler phrases like "world-class", "cutting-edge", or "innovative solutions."
- **Grounded in production reality.** "Cloud architecture advice grounded in what actually works in production." Trust is built through specificity, not superlatives.
- **Accountable after launch.** The brand promise includes post-ship ownership — reference this when writing about process or services.
- **Lowercase section labels** (e.g. "what we do", "our work") unless it's a proper noun or page title.

---

## Color Palette

| Token | Value | Usage |
|---|---|---|
| `--orange` | `#f97316` | Primary accent — CTAs, highlights, active states |
| `--orange-light` | `#fb923c` | Hover states, secondary accent |
| `--orange-dim` | `rgba(249, 115, 22, 0.15)` | Subtle backgrounds, glows |
| `--white` | `#ffffff` | Primary text |
| `--off-white` | `rgba(255,255,255,0.85)` | Body text, descriptions |
| `--muted` | `rgba(255,255,255,0.45)` | Labels, meta, secondary text |
| `--border` | `rgba(255,255,255,0.08)` | Dividers, card borders |
| Background | `#000000` | Site-wide black background |

The aesthetic is **dark, high-contrast, ember-toned** — black base with orange/amber fire accents. There is no light mode.

---

## Typography

**Primary font:** `DM Sans` (fallback: `Helvetica Neue`, `Helvetica`, `Arial`, sans-serif)
**OpenType features:** `ss01`, `cv01` enabled for cleaner rendering
**Anti-aliasing:** `-webkit-font-smoothing: antialiased`

Headings are set in DM Sans at large weights. No serif or monospace fonts are used in the brand UI.

---

## Shader Variants

Three named visual variants are used throughout the site to categorize and differentiate cards, sections, and content items:

| Variant | Mood | Used for |
|---|---|---|
| `fire` | Intense orange flame | Primary/featured items |
| `ember` | Warm amber glow | Secondary items |
| `gold` | Rich golden shimmer | Tertiary/accent items |

These variants map to GLSL shaders in `src/shaders/` and drive the visual identity of project cards, article cards, and process steps. When adding new content items (projects, insights, process steps), assign a variant in this rotation: `fire → ember → gold → fire…`

---

## Services

1. **Web Development** — Full-stack websites and web apps — fast, scalable, and built to your spec.
2. **Web & Cloud Consulting** — Cloud architecture advice grounded in what actually works in production.
3. **Cost Reduction & Optimisation** — Expert teams, lower overhead. Turnkey delivery without the agency markup.
4. **Digital Transformation** — We help organisations move from legacy workflows to systems that scale.
5. **UX / UI Design** — Interfaces your users enjoy — and your brand can be proud of.
6. **Process Automation** — Cut manual work. We build automations that eliminate the bottlenecks slowing your team down.

---

## Process (3-Step Methodology)

**01 — Discover & strategize**
We start by learning your business — your goals, your users, and your constraints. From that foundation we map out a clear technical roadmap so every decision has a reason.

**02 — Design & develop**
Design and engineering run in parallel. You get working prototypes fast, with a codebase built to scale — not just to demo.

**03 — Launch & optimize**
Going live is not the finish line. We monitor, measure, and iterate — making sure your product keeps performing as your audience grows.

---

## Spelling & Style Notes

- **"Optimisation"** not "Optimization" (British/AU English preferred for this brand)
- **"organisations"** not "organizations"
- Company name: **Asbir Tech** (two words, capital A and T); legal entity: **AsbirTech, Inc.**
- Footer copyright: `© {year} AsbirTech, Inc.`
- Location flag: 🇵🇭 Dumaguete, PH

---

## Clients / Portfolio

| Client | Industry |
|---|---|
| BeetzeePLAY | Streaming (mobile miniseries, SEA) |
| PlanOut | Event ticketing |
| Korte | (see projects.js) |

---

## UI Patterns

- **Primary CTA:** `btn-primary` — solid orange button
- **Ghost CTA:** `btn-ghost` — outlined/transparent button
- **Container max-width:** 1200px, padded 48px → 36px → 24px → 16px at breakpoints
- **Scroll animations:** Elements with `data-reveal` attribute animate in on scroll via `useScrollReveal`; directional variants: `data-reveal="left"`, `data-reveal="right"`, with optional `data-reveal-delay` (ms)
