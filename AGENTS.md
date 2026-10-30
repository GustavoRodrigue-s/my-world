# My World — agent instructions

Gustavo Rodrigues Fabiano's personal platform, "Mundo do Gustavo": one world with
spaces — the home map (`/`), Portfólio (`/portfolio`, `/identity`, PT + EN),
Estudos and the Capela (`/studies`, `/chapel`, closed in production), Projetos (planned).
Next.js 15 + TypeScript strict + Tailwind v4, Turborepo + pnpm monorepo, Vercel.

This file is the entry point. The project's memory is **`docs/`** — read the
relevant doc before changing that area. Never rebuild a rule from old chat
transcripts or AI memory when a doc exists.

## Where to look

| Need | Read |
|---|---|
| Where the last session stopped | `docs/handoffs/current.md` |
| What each space is for, what's planned | `docs/product/spaces.md` |
| Copy, language, privacy, photos | `docs/product/content.md` |
| Routes, structure, gating, theming, data, SEO | `docs/architecture/overview.md` |
| Why things are the way they are | `docs/architecture/adr/` |
| Visual identity and its rules | `docs/design-system/identity.md` |
| Which UI component to use | `docs/design-system/components.md` |
| Portfolio · Capela · Estudos · home map specifics | `docs/design-system/{portfolio,chapel,studies,home-map}.md` |
| Run, deploy | `docs/guides/` |

Sources that are code: design tokens `packages/design-system/tokens/*.json` (DTCG); space
status `apps/web/src/lib/world.ts`; copy `apps/web/src/lib/*-content*.ts`;
diário de bordo `apps/web/src/lib/logbook.ts`; living brand guide `/identity`.

## Repo map

- `apps/web/src/app/` — `(world)/` home · `(portfolio)/(pt)` + `en/` · `chapel/` ·
  `under-construction/` · `api/`
- `apps/web/src/components/` — `ui/` (re-exports `@my-world/ui`), `world/`,
  `portfolio/`, `identity/`, `chapel/`, `studies/`
- `apps/web/src/lib/` — `world.ts`, content modules, `studies.ts` (MDX loader), `mock-data.ts`, metadata
- `apps/web/content/studies/` — Estudos' MDX, one file per study
- `packages/ui` (components + CSS), `packages/design-system` (tokens, themes),
  `packages/types`

## Commands

```bash
pnpm install
pnpm dev                                      # http://localhost:3000
pnpm build && pnpm type-check                 # must pass before calling work done
pnpm tokens                                   # rebuild design-system/generated/ (CSS, tokens.json, brand SVGs); dev/build do it too
```

## Rules

**Naming.** Files `kebab-case`; routes always English; code, comments and docs in
English; everything a reader sees in Portuguese (plus the portfolio's English
edition), and it lives in the content modules, never in components.

**Design tokens — always.** Every interface, in every project of the world,
takes its values from the design system's tokens (`packages/design-system/tokens`):
colors, type, spacing, sizes, radius, borders, shadows, opacity, motion,
layers, breakpoints — through the Tailwind utilities that `@my-world/ui`
registers from them. No hex, no `text-[14px]`, `mt-[9px]`, `max-w-[460px]`,
`z-[1]`, `scale-[1.06]`, no icon `size={15}` (icons: `size-icon-*`). Only a
drawing's own geometry inside its viewBox is not a token (ADR 0021). A value that has no token gets a token first (in the JSON), then is
used. Map: `docs/design-system/tokens.md`.

**UI.** Build from `@my-world/ui` (import from `@/components/ui`); extend the
library instead of styling raw HTML. Tailwind first: no inline `style` except
computed values, `hover:` variants, responsive prefixes, no `<style>` tags,
**never a hex** (tokens only). Server Components by default. Full list:
`docs/design-system/styling.md`.

**Identity** (details in `docs/design-system/identity.md`):
1. One chromatic color, the rubric red (`primary`); `support` only in its narrow role
   (portfolio: blueprint blue for "na prancheta"; Capela: hidden gold).
2. One `<Emphasis>` word per statement; titles literal, metaphor in the margins.
3. One protagonist animation per page, pausable; everything else moves only by
   the reader's hand (scroll plotting, 150–200 ms hovers); snappy, only the protagonist may loop;
   reduced motion and print get a still, fully drawn page. The Capela is still.
4. Near-square corners, hairlines, no shadows except a floating panel (none in
   the Capela).

**Spaces.** Never remove an unfinished space: set its status in `lib/world.ts`;
links into it ask `canEnter()` / `isUnderConstruction()`.

**Data.** Never call `fetch()` in a page or component (except the search
dialog → `/api/search`). New content goes to MDX (ADR 0007).

**SEO.** Every page has `metadata` / `generateMetadata` with a canonical.

**Privacy.** Identity yes, biography no: the site may state facts (work; that
he is Catholic, briefly) but never tells Gustavo's life (family, feelings,
routines, his faith story). No location on the home, nothing finer than the city
anywhere, no biography or city in the Capela and Estudos. Run the publishing
checklist in `docs/product/content.md` for every text, image, metadata and
JSON-LD change — closed spaces too (previews open them). Photos of him: crop,
scale, tone only — never reshape the face. Don't remove `REVIEW` markers without
his confirmation.

**Git.** Commit, push or merge only when Gustavo asks.

## Definition of done

- Build and type-check pass; every value in the code you touched comes from the tokens; the change was seen in the browser when it's visual.
- A decision was made → new ADR (or one superseding an old one).
- A rule or how something works changed → its doc in `docs/` updated in the same change.
- A component was added → `docs/design-system/components.md`.
- A change visitors should know about → a line in `lib/logbook.ts`.

## Ending a session

Promote what was learned (see `docs/README.md`): decisions → ADR, rules → this
file or the matching doc, unfinished state and open questions →
`docs/handoffs/current.md` only. Don't persist debug output or discarded ideas.
Don't save project facts to AI memory — they belong in `docs/`.
