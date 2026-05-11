# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start Vite dev server
npm run build        # Production build
npm run preview      # Preview production build locally
npm run lint         # ESLint with zero-warnings policy
npm run format       # Prettier format (writes)
npm run format:check # Prettier format (check only)
```

Node >= 20.0.0 required.

## Architecture

**Stack:** React 19 + React Router 7 + Vite. No global state management — all content is static data imported from files.

**Routing** (defined in [src/main.jsx](src/main.jsx)):
- `/` → Homepage ([src/App.jsx](src/App.jsx)) — a single-page layout with stacked sections
- `/articles` + `/articles/:id` → Article list and detail pages
- `/projects/:id` → Project case study
- `/team` → Team roster
- `/contact` → Contact form

**Content** lives in [src/content/](src/content/) as plain JS files (`insights.js`, `projects.js`, `team.js`, `services.js`, `process.js`, `partners.js`). Detail pages (Article, Project) receive an `:id` param and look up the matching record from these files — no API calls.

**WebGL / Shaders:** GLSL shaders in [src/shaders/](src/shaders/) are imported as raw strings via a custom Vite plugin (`vite.config.js`). The [src/components/webgl/](src/components/webgl/) components use the **OGL** library to run these shaders (fire, ember, gold effects on Showcase, Process, and Articles pages).

**Scroll animations:** [src/hooks/useScrollReveal.js](src/hooks/useScrollReveal.js) uses `IntersectionObserver` on elements with a `[data-reveal]` attribute, adding `.is-revealed` at 12% visibility.

**Path alias:** `@` maps to `src/` — use `@/components/...` etc. in imports.

**Deployment:** Vercel (`vercel.json`) rewrites all paths to `index.html` for SPA routing.

## Conventions

- **Prettier:** no semicolons, single quotes (double in JSX), trailing commas (ES5), 100-char line width, 2-space indent.
- **ESLint:** zero warnings allowed; unused vars prefixed with `_` are exempt.
- **No source maps** in production builds (configured in `vite.config.js`).
- Environment variables use the `VITE_` prefix and are documented in `.env.example`.
