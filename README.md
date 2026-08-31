# Papagabs Travel and Tours — Website

Digital brochure site for Papagabs Travel and Tours (Odiongan, Romblon), built with
Next.js + Tailwind CSS v4 and exported as a static site for GitHub Pages.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

| Path | Purpose |
| --- | --- |
| [lib/tours.ts](lib/tours.ts) | Packages and published rates (the pricing source of truth) |
| [lib/site-config.ts](lib/site-config.ts) | Contact details, Facebook/Messenger and badge links |
| [lib/gallery.ts](lib/gallery.ts) | Gallery + experience carousel slides and captions |
| [lib/faqs.ts](lib/faqs.ts) | FAQ copy, also fed into FAQPage structured data |
| [lib/rate-cards.ts](lib/rate-cards.ts) | Downloadable rate card metadata |
| [components/Carousel.tsx](components/Carousel.tsx) | Scroll-snap carousel with lightbox |
| [components/Reveal.tsx](components/Reveal.tsx) | Scroll-reveal wrapper |
| [components/Img.tsx](components/Img.tsx) | basePath-aware `next/image` wrapper |
| [scripts/process-images.mjs](scripts/process-images.mjs) | Resizes source photos into `public/images/` |

## ⚠️ Linking to files in `public/`

The site now serves from the custom domain root, so `basePath` is `""` and
`assetUrl()` is a pass-through. Keep using it anyway: Next only applies a
basePath automatically to `next/link` — **not** to `next/image` when
`images.unoptimized` is set, and not to raw `<a href>`, `<img src>`, or metadata
icons. Routing `public/` links through [`assetUrl()`](lib/asset.ts) keeps the
site correct if a basePath is ever reintroduced:

```tsx
import { Img as Image } from "@/components/Img";   // instead of next/image
import { assetUrl } from "@/lib/asset";

<a href={assetUrl("/images/downloads/rates.jpg")} download>Download</a>
```

Importing `next/image` directly will build fine locally (basePath is empty) and
then 404 in production. To check before deploying, build the way CI does and
confirm every asset path is prefixed:

```bash
GITHUB_ACTIONS=true npm run build
```

## Images

Source photos live outside the app in `resources/images/` and are **not** committed.
`npm run images` regenerates the optimised, web-sized copies in `public/images/`:

```bash
npm run images
```

Destination photos are named by location (e.g. `Carabao Island 3.jpg`), and both the
processing script and `lib/gallery.ts` derive captions from those names — so the two
lists must be kept in sync. The script exits non-zero and prints `MISSING SOURCE` if a
referenced file is absent.

> **Outstanding:** no Sibuyan photos were supplied, so the Sibuyan package card uses a
> generic tour photo as a placeholder. Swap it in `PACKAGE_IMAGES` once real Sibuyan
> imagery is available.

## Motion & accessibility

Scroll reveals use `IntersectionObserver` and are fully disabled under
`prefers-reduced-motion`. Because content starts at `opacity: 0`, two fallbacks
guarantee it can never stay invisible:

- a `<noscript>` style, for when JS never runs, and
- an inline probe that sets `.reveal-fallback` when `requestAnimationFrame` doesn't
  fire — i.e. background tabs, crawlers and prerenderers that never paint.

## Deploying to GitHub Pages

Builds as a static export (`output: "export"` in `next.config.ts`).
[.github/workflows/deploy.yml](.github/workflows/deploy.yml) builds and deploys on
every push to `main`.

One-time repo setup: **Settings → Pages → Source → GitHub Actions**. The site then
publishes to:

```
https://papagabstravel.com/
```

### Custom domain

`papagabstravel.com` (Cloudflare Registrar) is the live domain. Three things hold
it together, and all three must stay in sync:

- [public/CNAME](public/CNAME) — copied to `out/` on every build; this is what
  re-registers the domain with GitHub Pages each deploy. Delete it and the custom
  domain silently reverts on the next push.
- [next.config.ts](next.config.ts) — `basePath`/`assetPrefix` are `""` because the
  site serves from `/` rather than a project page path.
- `siteUrl` in [lib/site-config.ts](lib/site-config.ts) — canonical, OG, and JSON-LD URLs.

DNS lives in Cloudflare: four apex `A` records to GitHub's `185.199.108-111.153`,
plus a `www` CNAME to `rjfabella.github.io`, all **DNS only** (unproxied) so
GitHub can issue and renew its Let's Encrypt certificate.

## Phase 2 note

The booking form, calendar sync and email/SMS notifications need a server and database,
which GitHub Pages cannot host. That phase will require separate hosting.
