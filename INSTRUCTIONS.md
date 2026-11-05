# ORBIT — Interactive Space Atlas

React (Vite) + Tailwind CSS v4 + Anime.js v4. Single-page, scroll-driven.

## Run it (PowerShell)

```powershell
cd orbit
npm install
npm run dev
```

Open the URL it prints (usually http://localhost:5173).

## Deploy to Vercel

1. Push the folder to a GitHub repo.
2. In Vercel: **Add New → Project →** import the repo.
3. Framework preset: **Vite** (auto-detected). Build command `npm run build`, output `dist`. Deploy.

Or with the CLI: `npm i -g vercel` then `vercel` in the project folder.

## What's inside

| File | What it does | Anime.js features |
|---|---|---|
| `src/components/Starfield.jsx` | Twinkling star background (70 stars on mobile, 150 on desktop) | `animate`, function-based values |
| `src/components/Hero.jsx` | Headline reveal, floating planet + orbiting moon, scroll parallax | `createTimeline`, `stagger`, `onScroll({ sync })` |
| `src/components/SolarSystem.jsx` | 8 planets orbiting, click to inspect, draggable probe | looping `animate`, `createDraggable`, `createSpring` |
| `src/components/Discover.jsx` | Count-up stats + scroll-reveal cards | `animate` on objects, `onUpdate` |
| `src/components/Missions.jsx` | Timeline whose line fills as you scroll | `onScroll({ sync, enter, leave })` |
| `src/motion.js` | `useReveal` scroll-reveal hook + reduced-motion check | `animate`, `stagger` |
| `src/data/planets.js` | Planet facts, sizes, colours, orbit speeds | — |

## Customising

- **Colours / fonts:** `src/index.css` (`@theme` block).
- **Planet facts or orbit speed:** `src/data/planets.js` (`period` = seconds per orbit; speeds are scaled for show).
- **Copy:** edit text directly in each component.
- **Real photography:** planets are CSS gradients so the page stays light. To use NASA images (public domain, images.nasa.gov), put files in `public/planets/` and replace the `background` in `planets.js` with `url(/planets/earth.webp) center/cover`. Compress to WebP first.

## Notes

- Respects `prefers-reduced-motion` (animations are skipped, content shows instantly).
- Anime.js reference: https://animejs.com/documentation
