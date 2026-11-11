# Radhakrishna Digital — website

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4.
Every page is prerendered to static HTML (`output: 'export'`) and hosted on Cloudflare Pages.

> Why no Vite? Vite and Next.js are both build tools — a project uses one. Next.js
> (with Turbopack) replaces Vite here and adds prerendered HTML for SEO and speed.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in ./out
npm start          # preview ./out locally
npm run deploy     # build + wrangler pages deploy (project: radhakrishna-digital)
```

**Cloudflare Pages (Git integration):** build command `npm run build`, output directory `out`,
Node 20+. Add the variables from `.env.example` under Settings → Environment variables.

## Where things live

| What | File |
| --- | --- |
| Contact details, socials, founder, safe-payment line | `src/content/site.ts` |
| Services (8) | `src/content/services.ts` |
| Case studies | `src/content/projects.ts` |
| Packages and process | `src/content/packages.ts` |
| Testimonials, latest social posts | `src/content/social-proof.ts` |
| Pages | `src/app/**/page.tsx` |
| Hero v3 "idea to launch" pipeline | `src/components/hero/HeroPipeline.tsx` (v2 project showcase kept in `HeroShowcase.tsx`) |

## Design system

Each page sets `data-page="…"` on its root; `globals.css` swaps the palette and background tint
with `:has()` — home (cyan/violet), services (emerald), work (pink/orange), hostlify (teal/lime),
about (amber/rose), start (violet/fuchsia), contact (sky/indigo), legal (blue), in dark and light.

Motion lives in `src/components/fx/` and `globals.css` (CSS-first, no animation library):

| Use | How |
| --- | --- |
| Scroll reveal | `data-reveal` (`left`, `right`, `zoom`, `blur`), stagger with `style={d(i)}` |
| Word-by-word headline | `<AnimatedHeading parts={['Text', { text: 'gradient', grad: true }]} />` |
| Cursor spotlight / 3D tilt / magnetic button | `.spot`, `data-tilt`, `data-magnetic` |
| Count-up number | `data-count="24" data-suffix="h"` |
| Animated icons | `<AnimatedIcon name="booking" />`, `<IconTile name="ai" />` |
| Backgrounds | `AuroraBg`, `GridBeamsBg`, `MeshBg`, `WarmBg`, `RadarBg`, `BedGridBg`, `Starfield` |

Everything respects `prefers-reduced-motion`, and content is visible without JavaScript.

Add or replace an image as WebP: `npm run images -- photo.jpg public/images/founder.webp 800`.

## Fill these in before launch (`TODO(before launch)` in the code)

Unverified values are hidden on the site until you set them — nothing is guessed.

- [ ] `NEXT_PUBLIC_WHATSAPP_NUMBER` — WhatsApp Business number
- [ ] `NEXT_PUBLIC_WEB3FORMS_KEY` — then send a test enquiry and confirm it arrives
- [ ] `NEXT_PUBLIC_CONTACT_EMAIL` — domain email once set up
- [ ] `NEXT_PUBLIC_SITE_URL` — the custom domain you buy
- [ ] `site.socials.facebook.url` — copy the exact Page URL from Facebook
- [ ] `site.profiles.upwork.url` — Upwork profile
- [ ] `site.founder.photo` + `site.founder.linkedin` — real photo, personal LinkedIn
- [ ] Hostlify `stack` in `projects.ts` — confirm from the product
- [ ] Package `includes` in `packages.ts` — copy exactly from the Fiverr gig
- [ ] Confirm `https://www.instagram.com/charank.tech/` opens the right account (logged out)

## Pre-launch checklist (from the upgrade plan)

- [ ] Custom domain live with HTTPS; old pages.dev address redirected (Cloudflare → Bulk Redirects)
- [ ] Domain email working and shown
- [ ] Form tested — enquiry received; auto-reply set up (template below)
- [ ] WhatsApp button opens the right number
- [ ] LinkedIn / Instagram / Facebook links correct
- [ ] Site checked on a phone, logged out, in a private window
- [ ] PageSpeed Insights run on mobile; major issues fixed
- [ ] Sitemap (`/sitemap.xml`) submitted in Google Search Console
- [ ] Website link added to Instagram bio, LinkedIn and Facebook website fields, Fiverr, Upwork
- [ ] No invented claims anywhere on the site

**Auto-reply template** (Web3Forms Pro autoresponder, or a Gmail canned response):

> Thank you for contacting Radhakrishna Digital. I am Charan, the founder. I have received your
> enquiry about [project type] and will reply personally within 24 hours on working days. If it is
> urgent, reply to this message with your timeline. — Charan Kuramana, Radhakrishna Digital, Vijayawada

## Analytics

With `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` set, four events are tracked: Form Submitted, WhatsApp Clicked,
Start Project Clicked, Live Project Clicked. Add `data-track="…"` to any link to track it.
