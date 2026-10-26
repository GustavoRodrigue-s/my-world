# Architecture overview

How the system works today. Why it is this way: [adr/](adr/).

## Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15 (App Router, `typedRoutes`) + TypeScript strict |
| Styling | Tailwind CSS v4 (config-less) + CSS custom properties (design tokens) |
| UI | `@my-world/ui` — the shared identity library (React; peer deps `next`, `react`, `lucide-react`) |
| Content | content modules + `lib/mock-data.ts` today; MDX in the repo decided ([ADR 0007](adr/0007-content-in-mdx.md)) |
| CMS | Strapi 5 in `apps/cms` — legacy, **not wired** ([guides/strapi.md](../guides/strapi.md)) |
| Monorepo | Turborepo + pnpm workspaces |
| Hosting | Vercel (production + preview deployments) |

## Repository

```
my-world/
├── AGENTS.md · CLAUDE.md          ← entry point for agents (CLAUDE.md imports AGENTS.md)
├── docs/                          ← this documentation
├── apps/web/                      ← Next.js app (every space)
│   └── src/
│       ├── app/
│       │   ├── layout.tsx         ← root: identity fonts, theme-init script, base metadata
│       │   ├── not-found.tsx      ← branded 404 (portfolio theme)
│       │   ├── (world)/           ← the home "/" (the map), its own <WorldShell>
│       │   ├── (portfolio)/       ← layout = theme + identity CSS; (pt)/… bare routes, en/… under /en
│       │   ├── chapel/            ← layout = chapel theme + identity CSS + <ChapelShell>
│       │   ├── under-construction/← one "em construção" page per closed space (chapel/)
│       │   ├── api/search · api/revalidate
│       │   └── sitemap.ts · robots.ts
│       ├── components/
│       │   ├── ui/index.ts        ← re-exports @my-world/ui (import UI from '@/components/ui')
│       │   ├── world/ · portfolio/ · identity/ · chapel/
│       ├── middleware.ts          ← sends closed spaces to their construction page
│       └── lib/                   ← world.ts, content modules, fonts, metadata, strapi-client, utils
├── apps/cms/                      ← Strapi 5 (legacy)
└── packages/
    ├── design-system/             ← tokens/*.json (DTCG) → Style Dictionary → generated/ (CSS + JSON)
    ├── ui/                        ← @my-world/ui: react/* components, css/* (base, identity, generated themes)
    └── types/                     ← @my-world/types
```

## Routes

Routes are always English.

| Route | Theme | File |
|---|---|---|
| `/` | portfolio | `app/(world)/page.tsx` → `<WorldHome>`: statement, `<WorldMap>`, atlas, diário de bordo |
| `/portfolio` · `/en/portfolio` | portfolio | `app/(portfolio)/(pt)/portfolio/page.tsx` · `app/(portfolio)/en/portfolio/page.tsx` → `<PortfolioHome>` |
| `/portfolio/resume` · `/en/portfolio/resume` | portfolio | `…/portfolio/resume/page.tsx` → `<ResumeView>` (one A4 page, ink on white, no photo) |
| `/identity` · `/en/identity` | portfolio | `…/identity/page.tsx` → `<IdentityView>` (living brand guide) |
| `/chapel` | chapel | `app/chapel/page.tsx` |
| `/chapel/articles` · `/chapel/articles/[slug]` | chapel | study index (theme chips) · study page |
| `/chapel/categories` · `/chapel/categories/[slug]` | chapel | theme grid · one theme's studies |
| `/chapel/saints` · `/chapel/about` | chapel | saints' studies · about |
| `/under-construction/chapel` | chapel | served by the middleware at every `/chapel` URL while it is closed |
| `/api/search` | — | search proxy (empty while the Capela is closed; falls back to mock data) |
| `/api/revalidate` | — | ISR webhook (revalidates `/chapel/...`) |

The Capela lived at the root until 2026-10-18; `/articles/*`, `/categories/*`,
`/saints`, `/about` redirect (307) to their `/chapel` paths.

Page files of the portfolio are one-liners passing `locale` to a shared view.

## Spaces under construction

Decision: [ADR 0005](adr/0005-spaces-under-construction.md).

- `lib/world.ts` (`SPACES`) is the single switch: each space's paths and status.
- `src/middleware.ts` rewrites every page of a closed space to
  `/under-construction/<space>` (same URL, `X-Robots-Tag: noindex`).
- Who can enter anyway: `next dev` and Vercel **preview** deployments, never
  production. `SHOW_UNDER_CONSTRUCTION=true|false` overrides that; it is declared
  in `turbo.json` so builds of different kinds never share a cache. Static pages
  read it at build time, the middleware at request time.
- Everything pointing into a closed space asks `canEnter()` /
  `isUnderConstruction()`: footer links (`FooterLink.tag` + `disabled` — listed,
  tagged, not followable), the 404, `/api/search` (empty), `app/sitemap.ts`
  (omitted). Inside the space, `ConstructionNotice` reminds the builder that the
  public can't see it.
- The badge is `<StatusTag tone="open">` with "em construção" / "under
  construction" (`CHAPEL.construction.status`, portfolio `shell.footer.building`).

## Theming pipeline

Decision: [ADR 0011](adr/0011-dtcg-tokens-with-style-dictionary.md). Visual rules: [design-system/](../design-system/).

- **Source:** DTCG 2025.10 JSON in `packages/design-system/tokens/` —
  `base.json` (radius, spacing, fonts, motion, z) and one file per theme
  (`portfolio.json`, `chapel.json`) with full `light` / `dark` color sets.
- **Build:** `packages/design-system/build.mjs` (Style Dictionary 5) writes
  `generated/css/tokens.css` (shared, on `:root`), `generated/css/<theme>.css`,
  `generated/css/tailwind-breakpoints.css` and `generated/tokens.json`. Tokens
  are px/ms in the JSON; the web build turns type, space, sizes and breakpoints
  into rem and fluid roles into `clamp()` ([ADR 0012](adr/0012-agnostic-token-taxonomy.md));
  `<html>` has no fixed font size, so rem follows the reader's browser. **Generated, never hand-edit**: `pnpm tokens`.
  `turbo build` runs it before the web app; the output is committed.
- **Scoping:** each theme applies on `:root:has([data-env="<env>"])`, so both
  files can be loaded after a client-side navigation without clashing.
- **Day/night:** `<html data-theme>`, set before paint by the inline script in
  `app/layout.tsx` (key `gustavo:theme`, shared by every environment); absent =
  follow the OS. Print always uses the day palette.
- **Consumers:** `apps/web/src/styles/globals.css` imports `tokens.css`; each
  route group layout imports its theme CSS (`@my-world/design-system/css/<env>.css`).
  `packages/ui/src/css/base.css` registers the vars as Tailwind utilities via
  `@theme inline` (`bg-surface`, `text-primary`, `text-display`, `px-gutter`…;
  Tailwind's default scales are reset) and holds no values. Map: [design-system/tokens.md](../design-system/tokens.md).
  Code that needs a literal (the `/identity` palette, `generate:brand`) imports
  `tokens` from `@my-world/design-system`.
- `packages/ui/src/css/identity.css` (hand-written, scoped to `[data-env]`):
  `.hatch`, `.registration`, `.leader`, `.ink-link`, the scroll "plotting"
  motion (`.plot-*`), the map's `.chart-*` motion, print rules.
- Brand SVGs: `cd packages/ui && npm run generate:brand` → `apps/web/public/brand/*.svg`.

Adding an environment: `tokens/<name>.json` (copy a theme), add it to `THEMES`
in `build.mjs`, `pnpm tokens`, and a route group layout with `data-env="<name>"`
that imports `@my-world/design-system/css/<name>.css`. Adding a token: put it in
every theme (both modes), and register it in `base.css` `@theme inline` if it
should become a Tailwind utility.

## Data

**Never call `fetch()` directly in a page or component** (the search dialog's
call to our own `/api/search` is the one client-side exception). Today the
Capela reads `@/lib/mock-data`; the Strapi client (`@/lib/strapi-client`) exists
but is not wired. Its functions (`getLatestArticles`, `getArticleBySlug`,
`getAllCategories`…) set `next: { revalidate: 3600, tags: [...] }` internally.
New content goes to MDX ([ADR 0007](adr/0007-content-in-mdx.md)).

## SEO

Every page has `metadata` or `generateMetadata` (canonical included).

- Portfolio: `buildPortfolioLayoutMetadata` / `buildPortfolioPageMetadata` in
  `lib/generate-metadata.ts` (canonical + hreflang `pt-BR` / `en` / `x-default`);
  the portfolio home emits `buildPersonJsonLd(locale)`.
- Studies: `buildArticleMetadata` / `buildArticleJsonLd` (URLs under `/chapel/articles`).
- `app/sitemap.ts` lists every open space. Closed spaces are omitted and served
  with `noindex`.
- The root `<html>` stays `pt-BR`; `<SiteShell>` carries `lang`.
- Locale helpers: `lib/portfolio-locale.ts` (`Locale`, `LOCALE_META`,
  `PORTFOLIO_LANGUAGES`, `localePath()`; client-safe, no copy).
