# cv-site

Personal portfolio / CV site, built with the Next.js App Router. Multilingual (EN/DE/RU/UK), dark by default, and fully server-rendered — no client-side JS beyond what's actually interactive.

## Stack

- **Next.js 16** (App Router, Server Components)
- **TypeScript**, **Tailwind CSS v4**
- **i18next** / **react-i18next** + `next-i18n-router` for locale routing
- **motion** for the interactive bits (tilt cards, scroll progress, reveal-on-scroll)
- **next-themes** for dark/light mode

## Features

- 4 languages (English, German, Russian, Ukrainian), German as the default
- Dark theme by default, no flash on load
- Live GitHub contribution graph, fetched server-side
- Contact form wired to [Web3Forms](https://web3forms.com) (falls back to a `mailto:` link if no API key is set)
- Fully static — every locale is pre-rendered at build time

## Getting started

```bash
npm install
cp .env.local.example .env.local   # optional: add a Web3Forms key for the contact form
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — start the dev server (Turbopack)
- `npm run build` — production build
- `npm run start` — run the production build locally
- `npm run lint` — lint the codebase

## Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | No | Access key from [web3forms.com](https://web3forms.com) for the contact form. Without it, the form opens the visitor's email client instead. |

## Deployment

Built to run as a standard Next.js app (not a static export) — locale routing depends on the Next.js Proxy layer. Deploys cleanly to [Vercel](https://vercel.com).
