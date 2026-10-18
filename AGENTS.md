# My World — Codex Context

This file is read automatically by Codex at every session start.
It contains everything needed to implement this project correctly and completely.

**This is the APPROVED final design.** As of 2026-07-26 the layout adopted a
Framer-inspired structure (near-black chrome, full radius scale, light/dark mode)
while the *color* identity was steered back toward the project's original chapel
aesthetic: a warm near-black chrome (`--color-primary`, `#12100C`) paired with the
original aged-gold accent (`--color-accent`, `#B08D57`) instead of Framer's blue.
Layout, typography, spacing, and component structure are unchanged — only the color
tokens changed, twice: once to a cool blue-on-black palette, then re-harmonized to
gold-on-warm-black for the study environment's contemplative/illuminated-manuscript
feel. Everywhere this document says "navy" below, read it as `--color-primary`
(warm near-black chrome); "gold" already matches the current accent. See the
palette block below for exact current values, including the light/dark content sets.

---

## What this project is

A personal platform for publishing and sharing studies on Catholic spirituality,
theology and philosophy. Built by Gustavo Rodrigues Fabiano — a software developer
and Catholic who wants to document what he is learning and invite others to join.

**Tone:** personal study space, not a course platform. Not selling. Not teaching.
Just sharing a journey and inviting others along.

**Feel:** a classical library, a chapel of study, illuminated manuscripts.
Contemplative, ordered, traditional but not dated. Serif headings + clean sans body.

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15 (App Router) + TypeScript strict |
| Styling | TailwindCSS + CSS Custom Properties (design tokens) |
| CMS | Strapi 5 (self-hosted, REST API) |
| Monorepo | Turborepo + npm workspaces |

**MVP scope — nothing beyond this:**
- Home page (all sections assembled, exactly as in the reference screenshot)
- Articles list `/articles`
- Article detail `/articles/[slug]`
- Categories `/categories`
- Saints `/saints`
- About `/about`
- Search via `/api/search` Route Handler → Strapi
- ISR revalidation via `/api/revalidate` webhook

**Not in MVP:** auth, payments, comments, favorites, video, courses, memberships.

The `(portfolio)` route group is a separate environment with its own identity —
see "Portfolio environment — Mundo do Gustavo" below.

---

## Project structure

```
my-world/
├── apps/
│   ├── web/                        ← Next.js 15 (main app)
│   └── cms/                        ← Strapi 5
├── packages/
│   ├── types/                      ← @my-world/types
│   ├── design-system/              ← @my-world/design-system (CSS tokens)
│   └── ui/                         ← @my-world/ui (Button, Badge, cx)
├── docker-compose.yml
├── turbo.json
└── AGENTS.md
```

### `apps/web/src/` structure

```
app/
  (catholic)/
    layout.tsx              ← sets data-env="catholic"
    page.tsx                ← Home — assembles all sections
    articles/
      page.tsx              ← Article list with category filters
      [slug]/
        page.tsx            ← Article detail with full SEO
        loading.tsx         ← Skeleton
    categories/page.tsx
    saints/page.tsx
    about/page.tsx
  (portfolio)/
    layout.tsx              ← theme + identity CSS (shared by both editions)
    (pt)/layout.tsx         ← <PortfolioShell locale="pt">: data-env, fonts, header/footer
    (pt)/portfolio/page.tsx ← Portfolio home (Fig. 1 + sections)
    (pt)/portfolio/resume/page.tsx ← One-page printable résumé
    (pt)/identity/page.tsx  ← Living brand guide
    en/…                    ← Same three pages, English edition (/en/…)
  api/
    search/route.ts         ← Proxy to Strapi search
    revalidate/route.ts     ← ISR webhook handler
  layout.tsx                ← Root layout (fonts, base metadata)
  not-found.tsx
  sitemap.ts
  robots.ts

components/
  ui/
    index.ts                ← re-exports from @my-world/ui
  layout/
    nav.tsx                 ← Navigation bar
    footer.tsx               ← Footer
    index.ts
  catholic/
    section-hero.tsx
    section-citations.tsx
    section-featured.tsx
    section-articles.tsx
    section-themes.tsx
    article-card.tsx
    theme-card.tsx
    article-body.tsx
    search-modal.tsx
    index.ts

lib/
  strapi-client.ts          ← All data fetching functions (never call fetch() directly)
  generate-metadata.ts      ← buildArticleMetadata + buildArticleJsonLd
  utils.ts                  ← formatDate, formatReadingTime, truncate, resolveMediaUrl, cx

styles/
  globals.css               ← Tailwind + base resets + utility classes
```

---

## Naming conventions — strictly enforced

### Files: always `kebab-case`

```
✓  section-hero.tsx / article-card.tsx / strapi-client.ts
✗  SectionHero.tsx / ArticleCard.tsx / strapiClient.ts
```

### Routes: always English

```
✓  /articles  /categories  /about  /saints
✗  /estudos   /categorias  /sobre  /santos
```

### Language split

| What | Language |
|---|---|
| File names, routes, functions, variables, types, CSS tokens, comments | English |
| All text visible to the user (headings, labels, buttons, content) | Portuguese |

---

## Design system — APPROVED palette (warm near-black chrome / aged-gold accent)

### How theming works (actual implementation)

The theme source of truth is a plain TS object, not a hand-written CSS file:

```ts
// packages/design-system/src/themes/catholic.ts
export const catholicTheme: ThemeContract = { colors: { ... }, typography: { ... } }
```

`packages/ui/src/generate-themes.ts` reads it and writes CSS custom properties into
`packages/ui/src/css/themes/catholic.css` (a generated file — do not hand-edit it,
run `cd packages/ui && npm run generate:themes` after changing `catholic.ts`). That
file is imported once, in `app/(catholic)/layout.tsx`. `packages/ui/src/css/base.css`
exposes both the theme vars and the invariant base tokens (radius, spacing, etc.) to
Tailwind v4 via `@theme inline`, which is what makes `bg-primary`, `text-accent`,
`rounded-card`, etc. work as utility classes. There is no `tailwind.config.ts` in the
current implementation (Tailwind v4 is config-less).

**Never hardcode colors in components — always use token variables / Tailwind utilities.**

### Light/dark mode — study environment is light-only (updated 2026-07-26)

`ThemeContract` still splits colors into `brand` (mode-invariant) and `light` / `dark`
(mode-dependent) — see `packages/design-system/src/types.ts` — but **the catholic
study environment intentionally ships light mode only**. There is no toggle, no
`data-theme` attribute, and no `prefers-color-scheme` fallback for this environment;
`packages/ui/src/css/themes/catholic.css` emits a single `:root { ... }` block built
from `brand` + `light`. The `dark` block in `catholic.ts` is kept defined (so the type
stays satisfied and the palette is ready if a toggle is reintroduced) but is dead code
— it never reaches generated CSS.

This is controlled per-theme in `packages/ui/src/generate-themes.ts` via a `modes`
array: `{ name: 'catholic', theme: catholicTheme, modes: ['light'] }` vs.
`{ name: 'portfolio', theme: portfolioTheme, modes: ['light', 'dark'], scope: '[data-env="portfolio"]' }`
— the portfolio environment ships day/night; only `catholic` is light-only.

If a light/dark toggle is ever wanted again for this environment: add `'dark'` back
to `catholic`'s `modes` in `generate-themes.ts`, regenerate `catholic.css`, and add a
toggle to `Nav` (a prior implementation lived at `components/layout/theme-toggle.tsx`;
the portfolio's `components/portfolio/day-night-toggle.tsx` is the current pattern).
The inline theme-init `<script>` in `app/layout.tsx` (key `gustavo:theme`,
`suppressHydrationWarning` on `<html>`) already exists — it serves the portfolio.

- **`brand` tokens never change between modes** — `primary`/`accent` (the
  warm near-black + aged-gold chrome used by nav, hero, footer, and the
  featured card) stay identical in light and dark mode; only the
  `light`/`dark` content tokens (`surface`, `foreground`, `border`, `shadow`,
  `accentPale`, `accentBorder`) swap. This keeps the brand's dark-chrome
  identity constant while article/theme/citation sections properly invert.
- **Never use `text-primary` / `bg-primary` for body/heading ink on a content
  surface** — `--color-primary` is brand-locked (always near-black), so text
  using it would go invisible against a dark `surface` background in dark
  mode. Use `text-foreground` (or the `Heading`/`Text` `default` color,
  which now maps to it) for ink on `surface`/`surface-alt-*` backgrounds.
  `bg-primary` + `text-on-primary` is reserved for the chrome elements
  (nav, hero, footer, featured card) where both sides of the pair are
  mode-invariant together.

### Core palette tokens (`packages/design-system/src/themes/catholic.ts`)

```ts
brand: {
  // Chrome — warm near-black, identical in both light and dark mode
  primary:        '#12100C',  // nav, hero, featured card, footer background
  primaryLight:   '#1E1A14',
  primaryDark:    '#000000',

  // Accent — the original aged-gold, identical in both modes
  accent:         '#B08D57',  // eyebrows, icons, borders, links
  accentHover:    '#C8A96E',  // hover states, italic emphasis in hero

  // Text on brand chrome
  onPrimary:      '#F6F1E8',  // warm parchment-white, not pure white
  onPrimaryMuted: 'rgba(246, 241, 232, 0.62)',
  onAccent:       '#1F150A',  // text on an accent-filled surface (e.g. CTA hover)

  support1:       '#4E6651',  // muted monastic green, sparingly-used secondary accent
},

// Content surfaces — these are the tokens that actually swap per mode
light: {
  surface:        '#FFFFFF',
  surfaceAlt1:    '#F6F1E8',  // parchment cream
  surfaceAlt2:    '#EDE4D3',  // tan
  foreground:     '#1A1A1A',
  muted:          '#5E5E5E',
  subtle:         '#8A8A8A',
  border:         'rgba(176, 141, 87, 0.18)',  // gold-tinted
  borderStrong:   'rgba(176, 141, 87, 0.40)',
  shadow:         'rgba(18, 16, 12, 0.10)',
  accentPale:     '#F3EBD8',
  accentBorder:   '#D9C594',
},
dark: {
  surface:        '#161310',  // dark leather/parchment, not neutral gray
  surfaceAlt1:    '#1E1912',
  surfaceAlt2:    '#120F0B',
  foreground:     '#F0E9DA',  // warm candlelit parchment ink, not pure white
  muted:          '#A69C89',
  subtle:         '#6E6656',
  border:         'rgba(246, 241, 232, 0.10)',  // warm cream-tinted
  borderStrong:   'rgba(246, 241, 232, 0.22)',
  shadow:         'rgba(0, 0, 0, 0.50)',
  accentPale:     '#2A2010',  // dark gold-tinted hover
  accentBorder:   '#4A3A1C',
},
```

Every hue is warm-tinted on purpose — no neutral grays or cool blacks — to keep the
"chapel of study, illuminated manuscript" feel from the original brief even with a
true dark mode. The two per-category decorative gradients in `article-card.tsx` and
the hero's decorative grid overlay in `section-hero.tsx` are hardcoded (not
token-driven, since they're per-category/computed) — keep them gold/warm-tinted to
match if the palette changes again.

### Base tokens (shared, never change)

```css
--radius-xs:     4px
--radius-sm:     6px
--radius-md:     10px
--radius-lg:     15px
--radius-xl:     20px
--radius-2xl:    30px
--radius-pill:   9999px   /* ALL buttons, filters, tags */
--radius-card:   20px     /* alias of xl — default card radius */

--section-py:    72px
--section-px:    2rem
--content-max-w: 1100px
--article-max-w: 720px
--nav-h:         64px
```

**Radius scale (updated 2026-07-26)** — matches Framer's marketing-site scale via
`npx getdesign@latest add framer`. `rounded-card` (20px / `xl`) is the default for
ArticleCard, ThemeCard, Badge, and the search modal. The featured-article showcase
card uses the bigger `rounded-2xl` (30px), matching Framer's oversized
gradient-spotlight-card treatment — it's meant to read as the page's signature
showcase surface, distinct from the smaller content cards. Buttons and filter pills
stay fully rounded (`rounded-pill`). This supersedes the earlier "subtle 8px only"
rule from a previous design phase.

### Typography — two-font system

```css
--font-serif: 'Cormorant Garamond', Georgia, serif;   /* headings */
--font-sans:  'Inter', 'Source Sans Pro', system-ui, sans-serif;  /* body, UI, nav */
```

- **Headings (h1, h2, h3, brand name, article titles):** `font-family: var(--font-serif)`, weight 400–600
- **Body text, nav links, buttons, labels, metadata:** `font-family: var(--font-sans)`, weight 300–600
- The hero h1's emphasized word ("inteligência") is **italic serif, gold color**
- Eyebrow labels are sans-serif, uppercase, letter-spaced, small (11px)

---

## Portfolio environment — "Mundo do Gustavo" (personal identity, added 2026-10-16)

The `(portfolio)` route group is no longer a stub: it carries Gustavo's **personal
identity**, the master brand meant to be reused everywhere (portfolio, résumé,
slides, avatars, future environments). The Capela de Estudos stays its own
"landscape" of the same world. The living brand guide is the `/identity` page —
check it before inventing anything visual.

**Concept.** A small world drawn as a technical plate ("Fig. 1"): ideas fall from
the **Cruzeiro do Sul** (Londrina's sky — faith), become code in the **workshop**
(reason), and are launched into **orbit** as artifacts (the work). The planet also
has a **chapel** (the link to Capela de Estudos). Motto: *feito com capricho*.

### Routes and files

| Route | File |
|---|---|
| `/portfolio` · `/en/portfolio` | `app/(portfolio)/(pt)/portfolio/page.tsx` · `app/(portfolio)/en/portfolio/page.tsx` → `<PortfolioHome>` — hero (Fig. 1), about, journey, artifacts, tools (orbit chart), credentials, services, contact |
| `/portfolio/resume` · `/en/portfolio/resume` | `…/portfolio/resume/page.tsx` → `<ResumeView>` — one A4 page, prints ink-on-white even in night mode; no photo |
| `/identity` · `/en/identity` | `…/identity/page.tsx` → `<IdentityView>` — the living brand guide |

- **Two editions, Portuguese first.** Portuguese lives at the bare routes; English
  mirrors them under `/en` (added 2026-10-17 for international recruiters). Page
  files are one-liners that pass `locale` to a shared view; `lib/portfolio-locale.ts`
  has `Locale`, `localePath()` and `switchLocalePath()` (no copy, safe for client
  components). Metadata comes from `buildPortfolioLayoutMetadata` /
  `buildPortfolioPageMetadata` in `lib/generate-metadata.ts` (canonical + hreflang
  `pt-BR` / `en` / `x-default` → PT, OG locale). The root `<html>` stays `pt-BR`;
  the portfolio wrapper carries `lang`. The PT/EN switch is
  `components/portfolio/language-switch.tsx`, in the header.
- **All visible portfolio copy and facts** live in `lib/portfolio-content-pt.ts`
  and `lib/portfolio-content-en.ts` (both typed `PortfolioCopy`, so they can't
  drift in shape), composed by `lib/portfolio-content.ts` (`getContent(locale)`,
  plus language-independent facts in `IDENTITY`). Single source for portfolio,
  résumé, identity page and JSON-LD — never hardcode copy in a component. A fact
  added in one file must be added in the other. Lines marked `REVIEW` are drafts
  still to be confirmed by Gustavo (mirrored in both files). In English,
  "capricho" is **care**. A blog / `/dev` notes area is **not** planned for now.
- **Portrait:** `public/portfolio/portrait.jpg` (`PORTRAIT_SRC`), drawn at the core
  of the mark (`<Portrait>`): small in the hero byline next to name + role (first
  frame, `priority`; kept small so the H1 stays the LCP) and larger in About. Size
  it with a wrapper — `<Portrait>` is `w-full`. Square crop toned ink-on-paper;
  edits to Gustavo's photo are crop / uniform scale / tone only — never reshape the face.
- Section components: `components/portfolio/*` (`folio.tsx` is the section shell:
  rubric + gloss in a sticky margin column, content on the right).
  Identity-page sections: `components/identity/*`.
- `components/portfolio/world-figure.tsx` — Fig. 1, inline SVG animated with
  **SMIL** (no JS frame loop, no WebGL). Pausable (`svg.pauseAnimations()`), pauses
  off-screen, and under `prefers-reduced-motion` freezes on a still frame that
  shows the whole story. The H1 text — not the figure — must stay the LCP element.

### Theme (`packages/design-system/src/themes/portfolio.ts`)

Paper, ink and **one red**: the rubric ink of liturgical manuscripts, which is also
the forge's ember. Unlike catholic, the accent is **re-tuned per mode** for contrast
(`ModeTokens` = `ContentTokens & Partial<BrandTokens>`; per-mode overrides win).

| Token | Day | Night |
|---|---|---|
| surface (papel / noite) | `#EEEAE0` | `#14120E` |
| foreground (tinta / pergaminho) | `#17150F` | `#ECE6D9` |
| accent (rubrica / brasa) | `#B5321C` | `#EE5C3F` |
| support-1 (cianotipia) — only "na prancheta" | `#2E4A7D` | `#8FA6D6` |

- `generate-themes.ts` emits this theme **scoped**: vars apply on
  `:root:has([data-env="portfolio"])`, so catholic.css and portfolio.css can both be
  loaded after client navigation without clashing. Day/night: `<html data-theme>`
  (set before paint by the inline script in `app/layout.tsx`, key
  `gustavo:theme`); absent = follow the OS. Print always uses the day palette.
  The catholic environment ignores `data-theme` (still light-only).
- `packages/ui/src/css/identity.css` (hand-written, scoped to the env): spacing and
  radius overrides (near-square corners, 1180px content), `.hatch`,
  `.registration`, `.leader`, print rules.

### Typography (loaded in `app/(portfolio)/layout.tsx`)

- **Bricolage Grotesque** (`--font-sans`, variable + `opsz`) — headings and text.
- **Cormorant Garamond italic** (`--font-serif`, shared with the Capela) — *the one
  word that matters* per statement, in the accent color, via `<Emphasis>`.
- **IBM Plex Mono** (`--font-mono`) — annotations: rubrics, captions, specs.
- `Heading` levels for this env: `statement` (hero), `title` (section), `subtitle`,
  `item`. `Text` has `family="sans" | "mono" | "serif"`.

### Identity primitives (`packages/ui`, re-exported from `@/components/ui`)

`Mark` (G-orbit monogram; `variant`: `satellite` = workshop, `star` = chapel,
`artifact` = lab; geometry in `MARK_GEOMETRY`), `Rubric` (red ¶ section marker),
`Seal` (deterministic per-artifact seal from a seed), `TitleBlock` (technical-drawing
title block), `Emphasis`, and `Button` variants `ink` / `line` / `quiet` plus
`buttonClasses()` for links styled as buttons.

Brand files: `cd packages/ui && npm run generate:brand` writes `apps/web/public/brand/*.svg`
(mark, paper, mono, star, artifact, adaptive favicon) from the same geometry and
theme colors — never edit those SVGs by hand.

### Rules specific to this environment

1. One chromatic color (rubric/ember). Blueprint blue only for "na prancheta"; gold
   belongs to the Capela.
2. One `<Emphasis>` word per statement. Titles and content stay **literal** — the
   metaphor (órbita, oficina, artefato, prancheta) lives in margins, captions, labels.
3. One protagonist animation per page, always pausable, reduced-motion = still frame.
4. Tailwind sorts arbitrary values alphabetically, so a `className` that conflicts
   with a primitive's own arbitrary size/tracking does not reliably win — add a
   variant/level instead of overriding.

---

## The MVP — exact screen to implement

This is the approved, final design. Implement it exactly as described below.
Reference: navy hero → cream citation band → white featured section with navy
card → tan articles section → white themes section → navy footer.

### Full page structure (top to bottom)

```
┌─────────────────────────────────────────────────────────────┐
│  NAV — bg: var(--color-nav-bg) [navy], height: 64px         │
│  border-bottom: 1px solid var(--color-nav-border)            │
│                                                                │
│  Left (stacked, serif):                                      │
│    "Capela de" (line 1, small, off-white/cream)              │
│    "Estudos" (line 2, larger, gold, font-weight 600)         │
│    "GUSTAVO RODRIGUES" (tiny caps, muted gold, line 3)        │
│    "FABIANO" (tiny caps, muted gold, line 4)                  │
│                                                                │
│  Center nav links (sans-serif, uppercase, letter-spaced):     │
│    INÍCIO · ESTUDOS · CATEGORIAS · SANTOS · SOBRE             │
│    Active (INÍCIO): gold underline (2px solid, gold)          │
│    Inactive: rgba(246,241,232,0.65)                           │
│                                                                │
│  Right: search pill                                           │
│    [ 🔍  Buscar... ]                                          │
│    bg: rgba(255,255,255,0.07), border: gold/25% opacity       │
│    border-radius: var(--radius-pill)                          │
└─────────────────────────────────────────────────────────────┘
│  HERO — bg: var(--color-primary) [navy], flows from nav      │
│  padding: 80px 2rem 72px, text-align: center                 │
│                                                                │
│  Eyebrow: "── ESTUDOS ESPIRITUAIS ──"                         │
│    sans-serif, 13px, letter-spacing 0.2em, uppercase, gold    │
│    Decorative lines (──) on each side using ::before/::after  │
│                                                                │
│  H1 (serif, two lines, centered, max-width ~640px):           │
│    "Conhecimento para ordenar a" (weight 300, cream)          │
│    "inteligência" (italic, gold-hover) " a Deus." (weight 300)│
│    font-size: clamp(32px, 5vw, 52px)                          │
│                                                                │
│  Subtitle (sans-serif, weight 300, muted cream, max-w 480px): │
│    "Uma biblioteca de estudos sobre espiritualidade católica, │
│     teologia e filosofia. Para quem busca profundidade,       │
│     não superfície."                                          │
│                                                                │
│  CTA button (outlined pill, centered):                        │
│    [ □  EXPLORAR ESTUDOS ]                                    │
│    border: 1px solid gold, color: gold-hover, bg: transparent │
│    padding: 14px 32px, font-size 12px, uppercase,             │
│    letter-spacing 0.14em, border-radius: pill                 │
│    Small square icon (□) before text                          │
│    Hover: bg → gold, text → navy                               │
└─────────────────────────────────────────────────────────────┘
│  CITATION BAND — bg: var(--color-surface-cream)               │
│  border-top + border-bottom: 1px solid var(--color-gold-border)│
│  padding: 40px 2rem, text-align: center                       │
│                                                                │
│  Quote (serif, italic, 22px, weight 400, navy color):         │
│    "Nosso coração está inquieto até repousar em Ti."           │
│    (closing quotation mark NOT italic — matches reference)     │
│                                                                │
│  Author (sans-serif, 11px, uppercase, letter-spaced, gold):    │
│    "— SANTO AGOSTINHO, CONFISSÕES"                             │
│                                                                │
│  'use client' — rotates through 5 quotes every 6000ms          │
│  with a fade transition                                        │
└─────────────────────────────────────────────────────────────┘
│  FEATURED SECTION — bg: var(--color-surface) [white]          │
│  padding: 64px 2rem, max-width: var(--content-max-w)           │
│                                                                │
│  Section heading (left-aligned, serif, NO eyebrow above it):   │
│    "Estudo em" (line 1)                                        │
│    "Destaque" (line 2)                                         │
│    font-size: 32px, weight 500, color: navy                    │
│    A thin horizontal rule extends to the right of the heading  │
│    (border-bottom or an inline <hr> styled subtle gold/10%)    │
│                                                                │
│  Dark navy card below (full width of content area):            │
│    bg: var(--color-primary), border-radius: var(--radius-card)│
│       (subtle ~8px, not heavily rounded)                       │
│    padding: 44px 48px                                          │
│    Grid: text content (left, ~70%) + decoration (right, ~30%)  │
│                                                                │
│    Eyebrow: "ESPIRITUALIDADE · 12 MIN DE LEITURA"               │
│      sans-serif, 11px, uppercase, letter-spaced, gold           │
│                                                                │
│    Title (serif, weight 500, cream, ~24px, 2 lines):            │
│      "Por que a vida interior é o fundamento de tudo o          │
│       que fazemos"                                              │
│                                                                │
│    Summary (sans-serif, weight 300, muted cream, ~14px):        │
│      "Há uma tentação moderna de buscar a transformação de      │
│       fora para dentro. Mas a tradição católica, de Agostinho   │
│       a João da Cruz, ensina o caminho inverso."                │
│                                                                │
│    Link (sans-serif, gold-hover, 2 lines, underlined):          │
│      "LER O" / "ESTUDO" with small arrow icon (□ or →)          │
│      font-size: 11px, uppercase, letter-spaced, weight 600      │
│                                                                │
│    Right side: faint cross/dagger decoration (†)                │
│      color: rgba(176,141,87,0.15), large size (~80px)           │
└─────────────────────────────────────────────────────────────┘
│  LATEST ARTICLES SECTION — bg: var(--color-surface-tan)        │
│  padding: 64px 2rem                                             │
│                                                                  │
│  Header row (space-between, align: flex-end):                  │
│    Left: "Últimos" / "Estudos" (serif, 2 lines, ~32px, navy)    │
│    Right: "VER" / "TODOS □" (sans-serif, gold, 11px, uppercase, │
│            2 lines, small icon, small underline rule above)     │
│                                                                  │
│  Grid — IMPORTANT, matches reference exactly:                   │
│    Row 1: 2 cards side by side (Espiritualidade blue-toned img, │
│            Filosofia/Santos green-toned img)                    │
│    Row 2: 1 card, same width as a single column (Liturgia       │
│            brown-toned img) — NOT full width, sits left-aligned │
│            under the first card's column                        │
│    grid-template-columns: repeat(2, 1fr) on desktop              │
│    Mobile: 1 column, all stacked                                 │
│                                                                  │
│  Each ArticleCard:                                               │
│    bg: white, border: 1px solid var(--color-border)              │
│    border-radius: var(--radius-card) [subtle, ~8px]              │
│    Image area top (~140px height):                                │
│      Espiritualidade → navy bg (#1F3557) + faint "+" cross icon   │
│      Filosofia/Santos → dark green bg (#3A4E3C) + faint book icon │
│      Liturgia → dark brown bg (#5C3A1A) + faint cross icon        │
│    Body padding: 20px:                                            │
│      Category eyebrow (gold, 10px, uppercase, letter-spaced)      │
│      Title (serif, weight 500, navy, ~17px, 2 lines max)          │
│      Summary (sans-serif, weight 300, stone gray, ~13px)          │
│      Meta row (border-top, padding-top 12px):                     │
│        "□ 8 min  ·  3 jun. 2025" (small icon + text, stone-light) │
└─────────────────────────────────────────────────────────────┘
│  THEMES SECTION — bg: var(--color-surface) [white]              │
│  padding: 64px 2rem                                              │
│                                                                   │
│  Heading (left-aligned, serif, 2 lines, NO eyebrow):              │
│    "Navegar por" / "Tema"                                        │
│    font-size: 32px, weight 500, navy                             │
│    Thin horizontal rule extends right of heading                 │
│                                                                   │
│  Grid — matches reference: 4 columns row 1, 2 columns row 2       │
│    Row 1: Espiritualidade · Santos · Liturgia · Teologia          │
│    Row 2: Filosofia · Vida Moral                                  │
│    grid-template-columns: repeat(4, 1fr) desktop                  │
│    Tablet: repeat(2, 1fr) — Mobile: 1fr                           │
│                                                                   │
│  Each ThemeCard:                                                  │
│    bg: white, border: 1px solid var(--color-border)               │
│    border-radius: var(--radius-card) [subtle]                     │
│    padding: 28px 16px, text-align: center                         │
│    Icon: small outlined square (□) in gold, centered, ~28px box   │
│    Name (serif, weight 500, navy, 15px) below icon                │
│    Count (sans-serif, weight 300, stone-light, 12px):              │
│      "12 estudos"                                                  │
│    Hover: border-color → gold-border                               │
└─────────────────────────────────────────────────────────────┘
│  FOOTER — bg: var(--color-primary) [navy]                        │
│  padding: 56px 2rem 28px                                          │
│                                                                    │
│  3-column grid:                                                   │
│    Col 1 (brand): "Capela de Estudos" (serif, cream, ~18px)       │
│      Description below (sans-serif, weight 300, muted cream):     │
│      "Uma biblioteca digital pessoal de estudos sobre             │
│       espiritualidade católica, teologia e filosofia."            │
│    Col 2: "NAVEGAR" label (gold, uppercase, small, tracked)        │
│      Início / Estudos / Categorias / Santos / Sobre                │
│    Col 3: "TEMAS" label (gold, uppercase, small, tracked)          │
│      Espiritualidade / Filosofia / Teologia / Liturgia / Vida Moral│
│    Links: sans-serif, 13px, weight 300, muted cream                │
│                                                                     │
│  Bottom bar (border-top: gold/15% opacity):                        │
│    Left: "© 2025 Gustavo Rodrigues Fabiano" (sans-serif, small)    │
│    Right: "Fides quaerens intellectum" (serif italic, muted, small)│
└─────────────────────────────────────────────────────────────┘
```

---

## Component implementation guide

### `components/layout/nav.tsx`

```
- Sticky, height: var(--nav-h) = 64px
- bg: var(--color-nav-bg) [navy]
- border-bottom: 1px solid var(--color-nav-border)
- Left block (stacked, top-left, serif for line 2):
    "Capela de" — font-family: var(--font-serif), 14px, color: var(--color-text-on-dark)
    "Estudos" — font-family: var(--font-serif), 17px, weight 600, color: var(--color-gold-hover)
    "GUSTAVO RODRIGUES" — sans-serif, 9px, uppercase, letter-spaced, var(--color-nav-brand-sub)
    "FABIANO" — same style, line below
- Center: nav links (sans-serif, uppercase, letter-spacing 0.06em, 13px)
    Active link (Início on home): border-bottom 2px solid var(--color-gold)
    Inactive: var(--color-nav-text), hover → var(--color-nav-text-hover)
- Right: search trigger pill
    bg: var(--color-nav-search-bg), border: 1px solid var(--color-nav-search-border)
    border-radius: var(--radius-pill), padding: 8px 16px
    🔍 icon + "Buscar..." placeholder text, color: var(--color-nav-search-text)
    onClick: opens SearchModal
- Mobile: hamburger menu, links collapse into a dropdown
```

### `components/catholic/section-hero.tsx`

```
- bg: var(--color-hero-bg), padding: 80px 2rem 72px, text-align: center
- Eyebrow: "ESTUDOS ESPIRITUAIS" wrapped with decorative lines
    <span className="eyebrow-line" /> ESTUDOS ESPIRITUAIS <span className="eyebrow-line" />
    Lines: 40px width, 1px height, background: var(--color-gold), opacity 0.5
    Text: sans-serif, 13px, letter-spacing 0.22em, uppercase, color: var(--color-hero-eyebrow)
    margin-bottom: 28px
- H1: font-family: var(--font-serif)
    Line 1: "Conhecimento para ordenar a" — weight 300, color: var(--color-hero-heading)
    Inline: "inteligência" — <em>, italic, color: var(--color-hero-emphasis)
    Continues: " a Deus." — weight 300, color: var(--color-hero-heading)
    font-size: clamp(32px, 5vw, 52px), line-height: 1.25, max-width: 640px
    margin: 0 auto 24px
- Subtitle: font-family: var(--font-sans), weight 300, color: var(--color-hero-text)
    max-width: 480px, margin: 0 auto 40px, line-height: 1.7, font-size: 15px
- Button: pill, outlined
    border: 1px solid var(--color-hero-btn-border)
    color: var(--color-hero-btn-text), bg: transparent
    padding: 14px 32px, border-radius: var(--radius-pill)
    font-size: 12px, letter-spacing: 0.14em, uppercase, font-family: sans
    Small square icon (□) before "EXPLORAR ESTUDOS"
    Hover: bg → var(--color-hero-btn-hover-bg), color → var(--color-hero-btn-hover-text)
```

### `components/catholic/section-citations.tsx`

```
'use client' — needs useState + useEffect for rotation

- bg: var(--color-citation-bg)
- border-top + border-bottom: 1px solid var(--color-citation-border)
- padding: 40px 2rem, text-align: center
- Quote: font-family: var(--font-serif), font-size: 22px, font-style: italic
    font-weight: 400, color: var(--color-citation-text)
    max-width: 580px, margin: 0 auto 12px
- Author: font-family: var(--font-sans), font-size: 11px, font-weight: 600
    letter-spacing: 0.12em, uppercase, color: var(--color-citation-author)
- Rotates every 6000ms, fade transition (opacity 0→1, ~400ms)

Quotes array (rotate through these 5):
  { text: 'A verdade é a adequação da inteligência à realidade.', author: 'São Tomás de Aquino, Suma Teológica' },
  { text: 'Nosso coração está inquieto até repousar em Ti.', author: 'Santo Agostinho, Confissões' },
  { text: 'A fé procura entender.', author: 'Santo Anselmo de Cantuária' },
  { text: 'A santidade não é luxo de poucos, mas dever de todos.', author: 'Santa Teresa de Calcutá' },
  { text: 'Amar é querer o bem do outro.', author: 'São Tomás de Aquino' },

Render as: `"{text}"` then `— {author.toUpperCase()}`
```

### `components/catholic/section-featured.tsx`

```
- Server Component — fetches getFeaturedArticle()
- bg: var(--color-surface), padding: 64px 2rem
- Section heading (left-aligned):
    font-family: var(--font-serif), font-size: 32px, font-weight: 500
    color: var(--color-text-base)
    "Estudo em" (line 1) / "Destaque" (line 2)
    A thin <hr> or border-bottom extends to the right at text baseline,
    color: rgba(176,141,87,0.15) — creates the horizontal rule effect seen
    in the reference (heading + line, like a section divider)
    margin-bottom: 32px

- Navy card (full width of content area):
    bg: var(--color-featured-bg), border-radius: var(--radius-card) [~8px]
    padding: 44px 48px
    display: grid, grid-template-columns: 1fr auto, gap: 40px, align-items: center

    Left column:
      Eyebrow: "{CATEGORY} · {N} MIN DE LEITURA" — sans-serif, 11px, uppercase,
        letter-spaced, color: var(--color-featured-eyebrow), margin-bottom: 16px
      Title: font-family: var(--font-serif), font-size: clamp(22px,2.8vw,28px),
        font-weight: 500, color: var(--color-featured-heading), line-height: 1.3,
        margin-bottom: 16px
      Summary: font-family: sans, font-size: 14px, weight 300,
        color: var(--color-featured-text), line-height: 1.7, margin-bottom: 24px
      Link: "LER O" / "ESTUDO" stacked, with small arrow icon,
        font-size: 11px, uppercase, letter-spaced, weight 600,
        color: var(--color-featured-link), border-bottom: 1px solid currentColor

    Right column (decoration):
      A large faint cross/dagger character (†), font-size: ~80px,
      color: var(--color-featured-decoration)

- Entire card wrapped in <Link href={`/articles/${article.slug}`}>
- On hover: subtle opacity or border highlight
```

### `components/catholic/article-card.tsx`

```
Props: { article: ArticleCard }

- bg: var(--color-card-bg), border: 1px solid var(--color-card-border)
- border-radius: var(--radius-card) [~8px, SUBTLE not heavy pill]
- overflow: hidden
- On hover: border-color → var(--color-card-border-hover)

Structure:
  1. Image area (height: ~140px):
     - If article.coverImage exists: <Image fill className="object-cover" />
     - Else: solid color background based on category, using these tokens:
         Espiritualidade → var(--color-card-img-spirituality)
         Filosofia / Santos → var(--color-card-img-philosophy)
         Liturgia → var(--color-card-img-liturgy)
         Teologia → var(--color-card-img-theology)
         Vida Moral → var(--color-card-img-moral-life)
         default → var(--color-card-img-bg)
     - Centered faint icon (SVG, opacity ~0.25, gold or white):
         Espiritualidade: cross/plus icon
         Filosofia: open book icon
         Liturgia: cross/dagger icon
         (use simple line-style SVGs, ~32px)

  2. Body (padding: 20px):
     - Category: font-sans, 10px, weight 700, letter-spacing 0.1em, uppercase,
       color: var(--color-gold), margin-bottom: 8px
     - Title: font-family: var(--font-serif), font-size: 17px, weight 500,
       color: var(--color-text-base), line-height: 1.35, margin-bottom: 8px
     - Summary: font-sans, 13px, weight 300, color: var(--color-text-muted),
       line-height: 1.6, margin-bottom: 14px
     - Meta row: border-top: 1px solid var(--color-border), padding-top: 12px,
       display: flex, gap: 8px, align-items: center
       "□ {readingTime} min  ·  {formatDate(publishedAt)}"
       font-size: 11.5px, color: var(--color-stone-light)

- Wrap entire card in <Link href={`/articles/${article.slug}`}>
```

### `components/catholic/section-articles.tsx`

```
- Server Component — fetches getLatestArticles(3)
- bg: var(--color-surface-tan), padding: 64px 2rem
- Header (flex, justify-content: space-between, align-items: flex-end):
    Left: heading "Últimos" / "Estudos" — serif, 32px, weight 500, navy, 2 lines
    Right: "VER" / "TODOS □" link
      sans-serif, 11px, uppercase, letter-spaced, weight 600, color: var(--color-gold)
      2 lines stacked, small arrow/square icon after "TODOS"
      Small thin line above the link text (decorative, like a label rule)
  margin-bottom: 32px

- Grid (IMPORTANT — exact layout from reference):
    grid-template-columns: repeat(2, 1fr), gap: 24px
    Cards 1 and 2: normal grid placement (row 1, col 1 and col 2)
    Card 3: also in the grid, occupies row 2 col 1 (NOT full width — sits
      in a single column, same width as cards 1/2, left-aligned)
    On mobile: grid-template-columns: 1fr (all stack)
```

### `components/catholic/theme-card.tsx`

```
Props: { category: Category }

- bg: var(--color-card-bg), border: 1px solid var(--color-card-border)
- border-radius: var(--radius-card) [subtle]
- padding: 28px 16px, text-align: center, cursor: pointer
- On hover: border-color → var(--color-card-border-hover)

Structure (vertical, centered):
  1. Icon box: ~28px square, centered, margin-bottom: 14px
     Simple outlined square icon (□) in var(--color-gold)
     Category can map to a specific icon via category.icon field;
     fallback: plain outlined square
  2. Name: font-family: var(--font-serif), font-size: 15px, weight 500,
     color: var(--color-text-base), margin-bottom: 4px
  3. Count: font-sans, font-size: 12px, weight 300,
     color: var(--color-stone-light)
     "{count} estudos"

- Wrap in <Link href={`/categories#${category.slug}`}>
```

### `components/catholic/section-themes.tsx`

```
- Server Component — fetches getAllCategories()
- bg: var(--color-surface), padding: 64px 2rem
- Heading (left-aligned, serif, 2 lines, NO eyebrow above):
    "Navegar por" / "Tema" — 32px, weight 500, navy
    Thin horizontal rule extending right (same pattern as section-featured)
    margin-bottom: 32px
- Grid: repeat(4, 1fr) desktop, repeat(2, 1fr) tablet, 1fr mobile
    gap: 16px
- Renders <ThemeCard /> for each category from getAllCategories()
```

### `components/layout/footer.tsx`

```
- bg: var(--color-footer-bg) [navy]
- padding: 56px 2rem 28px
- 3-column grid (1.5fr 1fr 1fr), gap: 40px, margin-bottom: 40px
    Col 1: Brand
      "Capela de Estudos" — font-family: var(--font-serif), 18px,
      color: var(--color-footer-brand)
      Description — sans-serif, 13px, weight 300, color: var(--color-footer-text),
      line-height: 1.7
    Col 2: "NAVEGAR" label (sans-serif, 10px, uppercase, letter-spaced, gold)
      Links: Início / Estudos / Categorias / Santos / Sobre
    Col 3: "TEMAS" label (same style)
      Links: Espiritualidade / Filosofia / Teologia / Liturgia / Vida Moral
    All links: sans-serif, 13px, weight 300, color: var(--color-footer-text),
      hover → var(--color-footer-text-hover)
- Bottom bar:
    border-top: 1px solid var(--color-footer-border), padding-top: 20px
    display: flex, justify-content: space-between
    Left: "© {year} Gustavo Rodrigues Fabiano" — sans-serif, 12px
    Right: "Fides quaerens intellectum" — font-family: var(--font-serif),
      italic, 12px, color: var(--color-footer-latin)
```

### `components/catholic/search-modal.tsx`

```
'use client'

- Overlay: fixed inset-0, bg: var(--color-search-overlay), z-index: var(--z-modal)
- Modal box: bg: var(--color-search-bg), border-radius: var(--radius-card)
    max-width: 560px, centered horizontally, margin-top: 80px
    border: 1px solid var(--color-search-border)
- Input row: padding: 16px 20px, border-bottom: 1px solid var(--color-border)
    🔍 icon + text input, font-family: var(--font-serif), font-size: 18px
    placeholder: "Buscar estudos..."
    "Fechar" pill button on the right (small, outlined)
- Results list:
    Each result: padding 14px 20px, border-bottom: 1px solid var(--color-border)
    Category (gold, uppercase, 10px) above title
    Title (serif, 16px, weight 500, navy)
    Hover: bg → var(--color-gold-pale)
- Debounce input: 300ms before calling /api/search?q={query}
- Close on: Escape key, click outside overlay, "Fechar" button
```

### `components/catholic/article-body.tsx`

```
- Renders article.content (rich text from Strapi)
- Use @tailwindcss/typography `prose` class, customized via tailwind.config.ts
  CSS vars already mapped: --tw-prose-headings, --tw-prose-quotes, etc.
- Headings inside content: font-family: var(--font-serif)
- Blockquotes:
    bg: var(--color-article-blockquote-bg), border-radius: var(--radius-md)
    border-left: 3px solid var(--color-article-blockquote-border)
    padding: 20px 24px, font-style: italic, font-family: var(--font-serif)
    Citation/attribution: sans-serif, 11px, uppercase, gold, weight 600
- Links: color var(--color-gold), underline on hover
- Body paragraph text: font-family: var(--font-sans), line-height: 1.85
```

---

## Pages implementation

### `app/(catholic)/page.tsx` — Home

```tsx
import { Nav, Footer } from '@/components/layout'
import {
  SectionHero,
  SectionCitations,
  SectionFeatured,
  SectionArticles,
  SectionThemes,
} from '@/components/catholic'

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <SectionHero />
        <SectionCitations />
        <SectionFeatured />
        <SectionArticles />
        <SectionThemes />
      </main>
      <Footer />
    </>
  )
}
```

### `app/(catholic)/articles/page.tsx` — Article list

```
- Header: navy bg (same as hero), title "Estudos" (serif, large, cream)
- Subtitle: "Reflexões e aprofundamentos sobre a fé católica." (sans, muted)
- Filter pills row (horizontal scroll on mobile):
    [ Todos ] [ Espiritualidade ] [ Santos ] [ Filosofia ] [ Teologia ] [ Liturgia ]
    Active: bg var(--color-filter-active-bg), text var(--color-filter-active-text)
    Inactive: outlined border var(--color-filter-border), text var(--color-filter-text)
    All pills: border-radius var(--radius-pill)
    'use client' state for active filter
- Article list (NOT card grid — numbered list format):
    Container: border-radius var(--radius-card), overflow hidden,
      border: 1px solid var(--color-border)
    Each row: grid [number | title+summary | category+time]
      Number: serif, large, muted gold/gray, e.g. "01"
      Title: serif, 17px, weight 500, navy
      Summary: sans, 13px, weight 300, muted
      Category: gold eyebrow style
      Time: sans, 12px, stone-light
    Divider: 1px border-bottom between rows
    Hover: bg → var(--color-gold-pale)
- generateStaticParams via getAllArticleSlugs()
```

### `app/(catholic)/articles/[slug]/page.tsx` — Article detail

```
- generateStaticParams: getAllArticleSlugs()
- generateMetadata: buildArticleMetadata(article)
- JSON-LD: buildArticleJsonLd(article) in <script type="application/ld+json">
- notFound() if article missing

Layout:
  <Nav />
  <main>
    Article hero (navy bg, centered, same pattern as section hero):
      Category eyebrow (gold)
      H1 (serif, large, cream)
      Meta row: avatar circle "GR" + name + date + reading time (sans, muted cream)
    Article body (white bg):
      max-width: var(--article-max-w), margin: 0 auto
      padding: 56px var(--section-px) 80px
      <ArticleBody content={article.content} />
      Tags section below (outlined pills, hover gold)
  </main>
  <Footer />
```

### `app/(catholic)/categories/page.tsx`

```
- Server Component — getAllCategories()
- Same navy header pattern as articles page: "Categorias" title
- Grid of ThemeCard components below (4 cols desktop)
```

### `app/(catholic)/about/page.tsx` and `app/(catholic)/saints/page.tsx`

```
- Simple pages for MVP: navy header + white content section
- About: personal text about Gustavo and the purpose of the platform
- Saints: filtered article list (articles where category = "Santos")
```

---

## Data fetching rules

**Never call fetch() directly in a page or component.**
Always use the typed functions from `@/lib/strapi-client`.

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

Every page must have `metadata` or `generateMetadata`.

```tsx
export const metadata: Metadata = {
  title: 'Estudos',
  description: 'Reflexões e aprofundamentos sobre espiritualidade católica.',
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return { title: 'Não encontrado' }
  return buildArticleMetadata(article)
}
```

---

## UI component layer — STRICTLY ENFORCED

All visible UI must be built from `@my-world/ui` primitives (imported in the app
via `@/components/ui`). **Never build a new raw HTML element with styling when a
UI primitive exists.**

### Available primitives in `@my-world/ui`

| Component | When to use |
|---|---|
| `<Heading>` | Every heading (h1–h4). Props: `as`, `level` (display/h1/h2/h3/h4), `color` |
| `<Text>` | Every body paragraph/span. Props: `as`, `size`, `weight`, `color`, `leading` |
| `<Eyebrow>` | Every category label / section eyebrow |
| `<Button>` | Every button. Props: `variant` (primary/outline), `size` (sm/md/lg) |
| `<Badge>` | Tags and category pills |
| `<Card>` + `<CardBody>` | Every card surface with hover effect |
| `<Section>` + `<SectionHeader>` | Every `<section>` wrapper with inner max-width centering |
| `cx()` | Class name merging utility |

For interactive UI beyond the above (Dialog, Tabs, Select, etc.) use **Shadcn UI**
components added to `packages/ui`. Consult the Shadcn UI MCP to fetch components.
Add them to `packages/ui/src/` and re-export from `packages/ui/src/index.ts`.

### Adding a new component to `packages/ui`

1. Create `packages/ui/src/<component>.tsx` using `cva()` for variants
2. Export from `packages/ui/src/index.ts`
3. Re-export from `apps/web/src/components/ui/index.ts`

---

## Styling rules — STRICTLY ENFORCED

### 1. Tailwind CSS first — no inline `style` props

Use Tailwind utility classes for ALL styling. The `tailwind.config.ts` already maps
every design token to a Tailwind utility:

| Token | Tailwind class |
|---|---|
| `var(--color-gold)` | `text-gold` / `bg-gold` / `border-gold` |
| `var(--color-primary)` | `text-primary` / `bg-primary` / `border-primary` |
| `var(--color-text-on-dark)` | `text-text-on-dark` |
| `var(--color-gold-hover)` | `text-gold-hover` / `bg-gold-hover` |
| `var(--color-surface-cream)` | `bg-surface-cream` |
| `var(--color-surface-tan)` | `bg-surface-tan` |
| `var(--color-border)` | `border-border` |
| `var(--color-stone-light)` | `text-stone-light` |
| `var(--font-serif)` | `font-serif` |
| `var(--font-sans)` | `font-sans` |
| `var(--radius-card)` | `rounded-card` |
| `var(--radius-pill)` | `rounded-pill` |

**Allowed exceptions — only these justify `style={{}}`:**
- Truly dynamic/computed values not expressible in Tailwind (e.g. per-category
  gradient backgrounds like `linear-gradient(135deg, #1F3557 0%, #2C4A78 100%)`)
- Opacity transitions on a specific state variable (`style={{ opacity: visible ? 1 : 0 }}`)
- Arbitrary repeating patterns (CSS `repeating-linear-gradient(...)` decorations)

For everything else, use Tailwind arbitrary values: `text-[clamp(32px,5vw,52px)]`,
`border-[rgba(176,141,87,0.2)]`, `h-[var(--nav-h)]`, etc.

### 2. Never use `onMouseEnter`/`onMouseLeave` for hover styling

Use Tailwind `hover:` variants instead. If the design token color is not in the
config, use `hover:text-[var(--color-...)]`.

### 3. Never use `<style>{...}</style>` JSX tags for responsive breakpoints

Use Tailwind responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`.

### 4. Never hardcode raw color hex values in className or style

All colors must come from design tokens (CSS variables), accessed via Tailwind
utilities or `var(--color-...)` in the allowed `style` exceptions above.

---

## Key rules — must never be broken

1. **Palette is warm near-black chrome + a single aged-gold accent** (structure
   updated 2026-07-26 via `npx getdesign@latest add framer`; colors re-harmonized
   back to gold the same day for the study environment's chapel/manuscript feel).
   `var(--color-primary)` (`#12100C`) is the dark chrome color used for
   nav/hero/footer/featured-card. This environment is **light mode only** (see
   "Light/dark mode" above) — no toggle, no `data-theme` attribute.
2. **Two-font system**: `font-serif` for ALL headings and article titles,
   `font-sans` for body, nav, buttons, labels, metadata. Use `<Heading>` and `<Text>`
   primitives instead of raw `<h*>` and `<p>` elements wherever possible.
3. **Framer-scale border-radius** (updated 2026-07-26): `rounded-card` is 20px
   (`--radius-xl`) for standard cards (articles, themes, badges, search modal);
   the featured showcase card uses 30px (`rounded-2xl`). Buttons and filter pills
   use `rounded-pill` (fully rounded).
4. **Aged gold (`var(--color-accent)`, `#B08D57`) is the only chromatic accent** —
   eyebrows, icons, hover states, the italic word in the hero heading, link text.
   Never use it as a large fill/background, only for text, borders, icons, and rings.
5. **`var(--color-primary)` (near-black) bg in**: nav, hero, footer, and the featured
   article card. Other sections use the lighter `surface` / `surface-alt-1` /
   `surface-alt-2` lift tokens — still dark, but one or two steps lighter than
   `primary`, to preserve the original alternating-section rhythm.
6. **Sections alternate by lift, not by light/dark**: `surface` → `surface-alt-1`
   (citation) → `surface` (featured) → `surface-alt-2` (latest articles) →
   `surface-alt-1` (themes) → `primary` (footer). Use `<Section bg="...">`.
7. **Server Components by default** — `use client` only for: useState, event
   handlers, browser APIs (search-modal, section-citations).
8. **No fetch() in components** — always use strapi-client functions.
9. **Use `<Section>` and `.section-inner`** — never manually write
   `max-width: var(--content-max-w)` or padding inline.
10. **Kebab-case file names** — always, no exceptions.
11. **Fonts must be loaded via `next/font/google`** in the root layout:
    Cormorant Garamond (weights 300,400,500,600, italic 300,400) + Inter
    (weights 300,400,500,600,700).
12. **All new interactive components** (dialogs, accordions, dropdowns, tooltips) must
    use Shadcn UI via `packages/ui`, never built from scratch with raw HTML.

---

## Implementation order

1. Update `app/layout.tsx` to load both fonts (Cormorant Garamond + Inter)
   via `next/font/google`, expose as `--font-serif` and `--font-sans` CSS variables
2. `components/layout/nav.tsx`
3. `components/layout/footer.tsx`
4. `components/catholic/article-card.tsx`
5. `components/catholic/theme-card.tsx`
6. `components/catholic/section-hero.tsx`
7. `components/catholic/section-citations.tsx`
8. `components/catholic/section-featured.tsx`
9. `components/catholic/section-articles.tsx`
10. `components/catholic/section-themes.tsx`
11. `components/catholic/search-modal.tsx`
12. `app/(catholic)/page.tsx` — assemble home, verify against reference screenshot
13. `components/catholic/article-body.tsx`
14. `app/(catholic)/articles/page.tsx`
15. `app/(catholic)/articles/[slug]/page.tsx`
16. `app/(catholic)/categories/page.tsx`
17. `app/(catholic)/about/page.tsx`
18. `app/(catholic)/saints/page.tsx`

After each component: `npx tsc --noEmit` to verify types.
After step 12 (home assembled): `npm run dev` and visually compare against the
reference screenshot section by section — colors, fonts, spacing, radius.

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

