# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Vite dev server with HMR at localhost:5173
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
npm start         # Run Express server (serves dist/ — requires npm run build first)
npm run gcp-build # Same as build — used by App Engine on deploy
```

No test or lint commands are configured.

## Architecture

A static React SPA served by a minimal Express server on Google Cloud App Engine.

**Build:** Vite with `@tailwindcss/vite` and `@vitejs/plugin-react`. Outputs to `dist/`. No config needed beyond `vite.config.js`.

**Routing:** React Router v6 client-side routing. Three pages: `/info`, `/work`, `/music` (root redirects to `/info`). `server.js` catches all routes with `app.get('*', ...)` and serves `index.html` so SPA navigation works after a hard refresh.

**Styling:** Tailwind CSS v4 (CSS-first config — no `tailwind.config.js`). Custom theme tokens are defined in `src/index.css` using `@theme {}`: `--color-pink`, `--color-gray`, `--font-serif`, `--font-baskerville`. Global base styles (body width, font, link color) are also in `src/index.css` under `@layer base`.

**Static assets:** Everything in `public/` is served as-is by Vite (dev) and copied to `dist/` (build). Images, videos, and audio are all in `public/`.

**Fonts:** Adobe Fonts (Typekit kit `huw2ant`) loaded via script in `index.html`. Provides *livory* and *buena-park*.

**Analytics:** GA4 measurement ID `G-HD06LX3PMG` configured in `index.html`.

## Deployment

App Engine (Node 20). On deploy, App Engine runs `gcp-build` (builds the static site), then starts with `npm start` (Express serves `dist/`). HTTPS enforced via `app.yaml` handlers.
