# My World — Claude Code Context

This file is read automatically by Claude Code at every session start.
It describes the project as it is **now** (rewritten 2026-10-18; Capela made
flat 2026-10-19): one personal identity ("Mundo do Gustavo") worn by every
environment, a palette per environment, and a shared UI library. The Capela wears
it in a **flat dialect** (same fonts, radius, spacing and red; stone, arches and a
hidden gold instead of the technical plate). The older Capela designs (navy/gold chrome, Inter, rounded cards; then
the vellum-and-gold technical plate) are retired — don't reintroduce them.

---

## What this project is

Gustavo Rodrigues Fabiano's personal platform — a software developer and Catholic
from Londrina, PR. Two environments, one world:

- **Mundo do Gustavo** (`/portfolio`, `/identity`) — the master brand: portfolio,
  résumé and the living brand guide, in Portuguese and English.
- **Capela de Estudos** (`/chapel`) — a personal study space on Catholic
  spirituality, theology and philosophy. Personal, not a course platform. Not
  selling, not teaching: sharing a journey. Portuguese only.

`/` redirects to `/portfolio` — the site opens on the master brand.

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15 (App Router, `typedRoutes`) + TypeScript strict |
| Styling | Tailwind CSS v4 (config-less) + CSS custom properties (design tokens) |
| UI | `@my-world/ui` — the shared identity library (React; peer deps: `next`, `react`, `lucide-react`) |
| CMS | Strapi 5 (self-hosted, REST) — **not wired yet**: pages read `lib/mock-data.ts` |
| Monorepo | Turborepo + pnpm workspaces |

**Not in scope:** auth, payments, comments, favorites, video, courses,
memberships, a blog / `/dev` notes area.

---

## Routes

| Route | Environment | File |
|---|---|---|
| `/` | — | `next.config.ts` → 307 to `/portfolio` |
| `/portfolio` · `/en/portfolio` | portfolio | `app/(portfolio)/(pt)/portfolio/page.tsx` · `app/(portfolio)/en/portfolio/page.tsx` → `<PortfolioHome>` |
| `/portfolio/resume` · `/en/portfolio/resume` | portfolio | `…/portfolio/resume/page.tsx` → `<ResumeView>` (one A4 page, ink on white, no photo) |
| `/identity` · `/en/identity` | portfolio | `…/identity/page.tsx` → `<IdentityView>` (living brand guide) |
| `/chapel` | chapel | `app/chapel/page.tsx` — centered opening, the Last Supper in a niche, quote band, studies (featured + latest), themes, author |
| `/chapel/articles` · `/chapel/articles/[slug]` | chapel | study index (theme chips) · study page |
| `/chapel/categories` · `/chapel/categories/[slug]` | chapel | theme grid · one theme's studies |
| `/chapel/saints` · `/chapel/about` | chapel | saints' studies · about |
| `/api/search` · `/api/revalidate` | — | search proxy (falls back to mock data) · ISR webhook (revalidates `/chapel/...`) |

The Capela lived at the root until 2026-10-18; `/articles/*`, `/categories/*`,
`/saints`, `/about` redirect (307) to their `/chapel` paths. Routes are always
English.

---

## Project structure

```
my-world/
├── apps/web/                       ← Next.js app (both environments)
│   └── src/
│       ├── app/
│       │   ├── layout.tsx          ← root: identity fonts, theme-init script, base metadata
│       │   ├── not-found.tsx       ← branded 404 (wears the portfolio theme)
│       │   ├── (portfolio)/        ← layout.tsx = theme + identity CSS
│       │   │   ├── (pt)/…          ← Portuguese edition (bare routes)
│       │   │   └── en/…            ← English edition (/en/…)
│       │   ├── chapel/             ← Capela: layout.tsx = theme + identity CSS + <ChapelShell>
│       │   ├── api/search · api/revalidate
│       │   └── sitemap.ts · robots.ts
│       ├── components/
│       │   ├── ui/index.ts         ← re-exports @my-world/ui (import UI from '@/components/ui')
│       │   ├── portfolio/          ← portfolio sections, shell/header/footer wiring, Fig. 1, résumé
│       │   ├── identity/           ← /identity sections (palette, mark construction…)
│       │   └── chapel/             ← Capela shell/header/footer wiring, search, quote plate, study body/index
│       └── lib/
│           ├── portfolio-content(.ts|-pt.ts|-en.ts) · portfolio-locale.ts
│           ├── chapel-content.ts   ← every visible word of the Capela + chapelPath()
│           ├── mock-data.ts        ← studies, categories, quotes (until Strapi)
│           ├── fonts.ts            ← the three identity fonts (identityFonts)
│           ├── generate-metadata.ts · strapi-client.ts · utils.ts
├── apps/cms/                       ← Strapi 5
└── packages/
    ├── design-system/              ← ThemeContract + themes/portfolio.ts, themes/chapel.ts
    ├── ui/                         ← @my-world/ui: react/* components, css/* (base, identity, generated themes)
    └── types/                      ← @my-world/types
```

---

## Naming conventions — strictly enforced

- **Files:** always `kebab-case` (`spec-sheet.tsx`, `chapel-content.ts`).
- **Routes:** always English (`/chapel/articles`, never `/capela/estudos`).
- **Language split:** file names, routes, functions, variables, types, CSS tokens
  and comments in English; everything a reader sees in Portuguese (plus the
  portfolio's English edition). Visible copy lives in the content modules, never
  hardcoded in components.

---

## Design system — one identity, a palette per environment

The identity is **paper, ink and one red**: a small world drawn as a technical
plate, with the devices of an illuminated manuscript (¶ rubrics, hatching,
registration marks, title blocks, seals). Every environment wears it; the palette
changes per environment, and the Capela speaks its **flat dialect** (see
"Capela de Estudos" below). The living guide is `/identity` — check it before
inventing anything visual.

### How theming works

- Theme sources are TS objects (`ThemeContract`) in
  `packages/design-system/src/themes/{portfolio,chapel}.ts`: `brand` tokens plus
  `light` / `dark` mode tokens; a mode may re-tune brand tokens (the accent is
  brighter at night).
- `packages/ui/src/generate-themes.ts` writes `packages/ui/src/css/themes/<env>.css`
  — **generated, never hand-edit**; run `cd packages/ui && npm run generate:themes`.
  Each theme is **scoped**: vars apply on `:root:has([data-env="<env>"])`, so both
  files can be loaded after a client-side navigation without clashing.
- Day/night: `<html data-theme>`, set before paint by the inline script in
  `app/layout.tsx` (key `gustavo:theme`, shared by both environments); absent =
  follow the OS. Print always uses the day palette.
- `packages/ui/src/css/base.css` exposes the tokens to Tailwind via `@theme inline`
  (`bg-surface`, `text-accent`, `border-border-strong`, `bg-support-1`…).
- `packages/ui/src/css/identity.css` (hand-written, scoped to `[data-env]`):
  spacing/radius overrides (near-square corners, 1180px content), `.hatch`,
  `.registration`, `.leader`, `.ink-link` (traced underline), the scroll
  "plotting" motion (`.plot-*`, off under `<SiteShell motion="still">`), print rules.

### Palettes

| Token | Portfolio day | Portfolio night | Capela day (cal) | Capela night (completas) |
|---|---|---|---|---|
| surface | `#EEEAE0` papel | `#14120E` | `#F4F1EA` cal | `#141311` |
| surface-alt-1 | — | — | `#E7E2D8` pedra (the flat blocks) | `#1F1D19` |
| foreground | `#17150F` tinta | `#ECE6D9` | `#1C1A17` tinta | `#ECE7DE` |
| accent (brand) | `#B5321C` rubrica | `#EE5C3F` brasa | `#B5321C` rubrica | `#EE5C3F` brasa |
| support-1 | `#2E4A7D` cianotipia | `#8FA6D6` | `#7E5F28` ouro velho | `#D4AF6A` |

- The **rubric red is the brand accent everywhere** (rubrics, links, the emphasized
  word, the satellite, the Capela's star). Never a large fill — a button is fine.
- `support-1` is the environment's second voice, used sparingly: in the portfolio,
  blueprint blue **only** for work "na prancheta"; in the Capela, the **hidden
  gold** ("ouro escondido"): fixed only in small details (the illuminated initial,
  the heart of the rose window, the cross pattée) and otherwise revealed by the
  reader's hand — fillets that light up on hover/focus, the star turning gold as
  it orbits, the Last Supper showing its gold halos. Never a fill or a large area.
- Never hardcode a hex in a component; brand SVGs come from
  `npm run generate:brand` (`apps/web/public/brand/*.svg`, incl. `mark-star.svg`
  in ink + rubric for the Capela).

### Typography (`lib/fonts.ts`, applied by `<SiteShell>`)

- **Bricolage Grotesque** (`--font-sans`) — headings and text.
- **Cormorant Garamond italic** (`--font-serif`) — the voice: *the one word that
  matters* per statement via `<Emphasis>`, quotes and citations, closing verses.
- **IBM Plex Mono** (`--font-mono`) — annotations: rubrics, captions, specs, dates.
- `Heading` levels: `statement` (page H1), `title` (section), `subtitle`, `item`;
  the Capela uses their serif twins `serif-statement`, `serif-title`,
  `serif-subtitle`, `serif-item` (Cormorant upright) with `<Emphasis fit="serif">`.
  `Text`: `family="sans" | "mono" | "serif"`, `size`, `color`, `leading`.

### The library — `@my-world/ui` (import via `@/components/ui`)

Build every screen from these; add to the library rather than styling raw HTML.

| Component | Use |
|---|---|
| `SiteShell` | An environment's frame: `data-env`, `lang`, fonts, skip link, header, footer; `motion="still"` turns plotting off |
| `SiteHeader` | Mark + name (home link), `nav` slot, `actions` slot, reading-progress line; `surface="glass" \| "solid"`; `mark.reveal` = satellite turns support-colored as it orbits |
| `SectionNav` / `PageNav` | Header links to sections of one page (scroll-spy) / between pages (current page marked, phone menu via `<details>`; `variant="stone"` = flat) |
| `LanguageSwitch` · `DayNightToggle` | PT/EN by path prefix · day/night (client; `variant="line" \| "stone"`) |
| `SiteFooter` | Brand column, link columns (internal/external/marked), notes, closing verse |
| `Plate` | A page's opening plate: rubric bar, statement column, figure, title block |
| `Folio` | A section: rubric + gloss in the margin, literal title, intro |
| `Byline` · `Portrait` | Face + name + role (`plain`, `frame="circle" \| "arch"`, `centered`) · the photo at the core of the mark (`ring={false}`: just the photo, `shape="circle" \| "arch"`) |
| `Timeline` | Chronology with past/current/next stations and the ink-on-scroll |
| `SpecSheet` | Ficha técnica: seal, code, tag, meta, title (optional link), details, features, stack |
| `OrbitChart` | Up to three rings of items around the mark |
| `IndexList` | Numbered register of linked entries (title, summary, kicker, meta) |
| `TopicGrid` | Ruled grid of linked topics (name, description, count) |
| `Register` | Mono-titled ruled list |
| `StatusTag` · `Chip` | State tag (`lit`/`open`/`plain`/`draft`) · filter toggle (`variant="line" \| "stone"`) |
| `Mark` (`variant`, `tone`) · `Rubric` · `Seal` · `TitleBlock` · `Emphasis` (`fit`) · `Eyebrow` | Identity devices (`Eyebrow`: small red tracked label, the flat dialect's rubric) |
| `Heading` · `Text` · `Button` / `buttonClasses()` (`ink`/`line`/`quiet`; flat: `rubric` solid red, `stone` solid stone) · `Section` · `cx()` | Primitives |
| `PrintButton` | Print / save as PDF |
| **Flat dialect** | |
| `Niche` | Romanesque round-arched frame for a picture: gold fillet, ornament in the tympanum, caption; `veiled` = sepia at rest, true colors on hover (always in color on touch) |
| `RoseWindow` · `CrossPattee` · `OrnamentRule` | Hairline rose window (12 lobes, gold heart, gilds inside a hovered group) · small gold cross · divider with the cross |
| `PageIntro` | Flat page opening: ornament, label, H1 + lead (children), actions, footer; `align="center" \| "start"` |
| `SectionIntro` | Serif section title, gloss (`note`), optional `action`; goes inside `<Section>` |
| `EntryList` | Flat list of `IndexEntry` (kicker + dates aside, serif title, summary; hairlines between rows) |
| `FeaturedEntry` | One entry on a stone panel: label, meta, serif title link, lead, action; `shape="niche"` = low arch + gold fillet |
| `TileGrid` | Flat stone tiles of `Topic`s (`on="stone"` when the band is already stone); `gilded` = a gold fillet lights up on hover |
| `Quote` | Quotation in the voice face: `size="display"` (centered, on a band) or `"body"` (rubric rule) |

Adding a component: `packages/ui/src/react/<name>.tsx` (kebab-case, `cva()` for
variants, `'use client'` only if it needs state/effects), export it from
`packages/ui/src/react/index.ts`. Links take `href: string` and are cast to `Route`
inside the library. Interactive pieces use accessible native elements
(`<dialog>`, `<details>`, `<button aria-pressed>`) — no extra UI dependency.

### Identity rules — must never be broken

1. **One chromatic color** (rubric/ember). `support-1` only in its environment's
   narrow role (above): blueprint blue in the portfolio, hidden gold in the Capela.
2. **One `<Emphasis>` word per statement.** Titles and content stay **literal**;
   the metaphor (órbita, oficina, artefato, prancheta, lição) lives in margins,
   captions, labels.
3. **One protagonist animation per page**, always pausable, reduced motion = still
   frame (portfolio: Fig. 1; Capela home: the quote plate). Everything else moves
   only by the reader's hand: scroll "plotting" (CSS scroll timelines in
   `identity.css` — `.plot-rise`, `.plot-draw-x`, `.plot-orbit`, the timeline's
   `.plot-station`/`.plot-ink`/`.plot-inked`/`.plot-ripple`/`.plot-ink-text`/
   `.plot-arrive`, `.plot-progress` under the header; no JS frame loop, nothing
   loops, ranges short — Gustavo asked for snappy motion) and hovers (150–200 ms;
   `.ink-link`). Brand objects may make one longer gesture (satellite orbit, seal
   turn). Unsupported browsers, reduced motion and print get the page fully drawn.
   Don't put `.plot-*` on first-frame content (the H1 is the LCP) or on single
   cells of a `gap-px` grid (animate the grid). **The Capela is still**
   (`motion="still"`): no plotting, no progress line — only hovers, its quote
   plate, and the Last Supper's one longer gesture (veil → color, 700 ms).
4. **Near-square corners** (`rounded-xs`), hairline rules, no shadows except a
   floating panel (`shadow-card`). In the Capela, not even that: solid fills
   separate the parts and floating panels are flat (`surface-alt-2` + a hairline).
5. Tailwind sorts arbitrary values alphabetically, so a `className` that conflicts
   with a primitive's own arbitrary size/tracking does not reliably win — add a
   variant/level instead. `<Portrait>` is `w-full`: size it with a wrapper.

---

## Portfolio — "Mundo do Gustavo"

**Concept.** Fig. 1: ideas fall from the **Cruzeiro do Sul** (Londrina's sky —
faith), become code in the **workshop** (reason) and are launched into **orbit** as
artifacts (the work); the planet also has a **chapel** (the Capela). Motto: *feito
com capricho* (EN: *made with **care***).

- **Two editions, Portuguese first.** English mirrors the routes under `/en`.
  Page files are one-liners passing `locale` to a shared view.
  `lib/portfolio-locale.ts`: `Locale`, `LOCALE_META` (prefix, switch label),
  `PORTFOLIO_LANGUAGES`, `localePath()` (no copy; client-safe). Metadata:
  `buildPortfolioLayoutMetadata` / `buildPortfolioPageMetadata` in
  `lib/generate-metadata.ts` (canonical + hreflang `pt-BR`/`en`/`x-default`).
  The root `<html>` stays `pt-BR`; `<SiteShell>` carries `lang`.
- **All portfolio copy and facts** live in `lib/portfolio-content-pt.ts` and
  `lib/portfolio-content-en.ts` (both `PortfolioCopy`), composed by
  `lib/portfolio-content.ts` (`getContent(locale)`, invariant facts in
  `IDENTITY`). A fact added in one file must be added in the other. `REVIEW`
  marks drafts still to be confirmed by Gustavo.
- **Portrait:** `public/portfolio/portrait.jpg` (`PORTRAIT_SRC`) — in the hero
  byline (first frame, `priority`, small so the H1 stays the LCP), in About, and
  in the Capela's author byline. Edits to Gustavo's photo: crop / uniform scale /
  tone only — never reshape the face.
- `components/portfolio/world-figure.tsx` — Fig. 1, inline SVG animated with SMIL
  (no JS loop), pausable, pauses off-screen, still frame under reduced motion.
- Statuses map to `StatusTag` tones in `components/portfolio/artifact-status-tag.tsx`.

---

## Capela de Estudos

**Flat dialect — an old chapel with hidden gold.** Same fonts, radius, spacing
and rubric red as the portfolio; everything else is quieter — "cal e pedra":
limewash page, solid stone bands (plain `bg="alt-1"` fills — no wall drawing:
bricks, a bevelled fortress wall and hairline joints were all tried and
rejected), ink and the red (say the black, do the red), and an **ouro
escondido** (`support-1`, see Palettes) that shows only up close. Old-church
details: Romanesque arches (`Niche`, the `shape="niche"` featured panel, arched
portraits — not on the theme cards, Gustavo didn't like them there), a rose
window, gold crosses pattée, the illuminated initial.
Openings sit on a central axis (the nave) ending at the altar — Duccio's *Last
Supper* (Maestà, 1308–11, public domain, `public/chapel/last-supper.jpg`); study
text reads left-aligned. Titles in Cormorant upright, text and UI in Bricolage,
Plex Mono only for dates, reading times and counts. Labels are `Eyebrow`s.
**Not in the Capela:** ¶ numbered rubrics, `Plate`/`Folio`, `TitleBlock`,
`SpecSheet`/`Seal`, numbered `IndexList`/`TopicGrid`, registration marks,
hatching, the portrait's orbit ring, header blur, scroll plotting.

- **Wiring:** `app/chapel/layout.tsx` loads `themes/chapel.css` + `identity.css`
  and renders `<ChapelShell>` (`components/chapel/*`, `motion="still"`): solid
  header with the red-star mark (gilds as it orbits on hover), `PageNav variant="stone"`, search
  (`chapel-search.tsx`: native `<dialog>`, ⌘K, debounced `/api/search`, flat
  panel) and day/night; footer with the themes and a link back to the Mundo do
  Gustavo.
- **Copy:** every visible word in `lib/chapel-content.ts` (`CHAPEL`), with
  `chapelPath()` for links. Studies, categories and quotes: `lib/mock-data.ts`
  (`getMockArticle(slug)`), until the Strapi client is wired back in.
- **Home:** centered `PageIntro` (gold cross, label *Fides quaerens intellectum*,
  the statement "Conhecimento para ordenar a *inteligência* a Deus.", a `rubric`
  button); the Last Supper in a veiled `Niche` with a `RoseWindow` and the verse
  "Fazei isto em memória de mim" (Lc 22,19); a full-width plain stone `Section`
  with `CitationPlate` (the page's protagonist animation: rotates every
  7 s, pausable, holds on hover/focus/off-screen, still under reduced motion);
  studies (`SectionIntro` + `FeaturedEntry shape="niche"` + `EntryList`, whose
  kickers gild on hover); an `OrnamentRule`; themes (`TileGrid gilded`); author
  on a plain stone band (`Byline plain frame="arch" centered`).
- **Pages:** server components, statically generated (`generateStaticParams` for
  studies and themes), each opened by a centered `PageIntro`. A study renders its
  light markdown with `StudyBody` (`## ` serif subheads, `> "quote" — source` as
  `<Quote>`, `*emphasis*`, an illuminated initial — red Cormorant on gold leaf —
  on the first paragraph), then an `OrnamentRule`, tags, numbered references
  (`Register`), the author byline (arched portrait) on a stone panel.

---

## Data fetching rules

**Never call fetch() directly in a page or component** (the search dialog's call to
our own `/api/search` is the one client-side exception). Server data comes from
`@/lib/strapi-client` once Strapi is wired; today the Capela reads
`@/lib/mock-data`.

```ts
getLatestArticles(limit?: number): Promise<ArticleCard[]>
getAllArticles(page?, pageSize?): Promise<StrapiListResponse<ArticleCard>>
getArticleBySlug(slug: string): Promise<Article | null>
getArticlesByCategory(categorySlug: string, limit?): Promise<ArticleCard[]>
getFeaturedArticle(): Promise<ArticleCard | null>
getAllArticleSlugs(): Promise<string[]>
getAllCategories(): Promise<Category[]>
getCategoryBySlug(slug: string): Promise<Category | null>
```

All functions already set `next: { revalidate: 3600, tags: [...] }` internally.

---

## SEO rules

Every page has `metadata` or `generateMetadata` (canonical included). Studies use
`buildArticleMetadata` / `buildArticleJsonLd` (URLs under `/chapel/articles`); the
portfolio home emits `buildPersonJsonLd(locale)`. `app/sitemap.ts` lists both
environments.

---

## Styling rules — strictly enforced

1. **Tailwind first, no inline `style`** — except truly computed values (orbit
   positions, swatch colors read from the theme source).
2. **Hover with `hover:` / `group-hover:` variants**, never `onMouseEnter` for styling.
3. **Responsive with `sm:`/`md:`/`lg:`/`xl:`**, never `<style>` tags.
4. **Never hardcode a color** — tokens only (`bg-surface`, `text-accent`,
   `border-border-strong`, `text-support-1`…).
5. **Server Components by default**; `'use client'` only for state, effects,
   browser APIs (search, quote plate, filters, nav, toggles).
6. **Use `<Section>` / `.section-inner`** (or `Plate`/`Folio`) for page width.

---

## Local development

```bash
npm install
docker compose up -d   # PostgreSQL + Strapi
cp apps/web/.env.example apps/web/.env.local
# Fill STRAPI_API_TOKEN from Strapi admin → Settings → API Tokens
npm run dev
# Frontend: http://localhost:3000
# Strapi:   http://localhost:1337/admin
```

### `.env.local` required vars

```
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=<from strapi admin>
REVALIDATE_SECRET=any-random-string
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=My World
```

---

## Strapi content types to configure

### Article
| Field | Type | Notes |
|---|---|---|
| title | Text (required) | |
| slug | UID (from title) | unique |
| summary | Text (long) | |
| content | Rich Text (Blocks) | |
| coverImage | Media (single) | optional — falls back to category color |
| readingTime | Number (integer) | minutes |
| status | Enumeration | draft, published, archived |
| category | Relation → Category | many-to-one |
| tags | Relation → Tag | many-to-many |
| references | JSON | array of strings |

### Category
| Field | Type |
|---|---|
| name | Text (required) |
| slug | UID (from name) |
| description | Text (long) |
| icon | Text |

### Tag
| Field | Type |
|---|---|
| name | Text (required) |
| slug | UID (from name) |

**Permissions:** Strapi admin → Settings → Roles → Public:
enable `find` and `findOne` for Article, Category, Tag.

