# 0014 — Estudos: MDX with next-mdx-remote, one collection, four themes

- **Status:** accepted
- **Date:** 2026-10-26
- **Supersedes:** — (implements the "choose the MDX setup" step of [0007](0007-content-in-mdx.md) for Estudos)

## Context

[0007](0007-content-in-mdx.md) put content in MDX in the repo but left the setup
open. [0009](0009-projects-and-studies.md) made Estudos one index of articles
and notes, filtered by theme and format. The Capela's mock studies are all
about faith; Estudos covers technology, economy, spiritual life and more.

## Decision

- **Files:** `apps/web/content/studies/<slug>.mdx` — the file name is the slug.
- **Compiler:** `next-mdx-remote` (`/rsc`, `compileMDX` with front matter),
  called from a server-only loader `apps/web/src/lib/studies.ts` at build time.
  Pages stay statically generated. No Next config plugin.
- **MDX elements map to `@my-world/ui`** (`components/studies/mdx-components.tsx`):
  the text never gets raw styling.
- **Front matter**, validated by the loader (a missing or wrong field fails the
  build): `title`, `summary`, `format` (`article` | `note`), `theme`, `publishedAt`,
  `status` (`draft` | `published`), optional `updatedAt`, `tags`, `references`,
  `maturedInto` (the article a note grew into), `comments` (`false` turns them
  off for one study). Reading time is computed from the text.
- **Themes, few and broad:** `tecnologia` · `economia` · `vida-espiritual` ·
  `filosofia`. Narrower subjects (santos, liturgia, teologia…) are tags.
  Theme names live in `lib/studies-content.ts`.
- **Drafts** are listed and served only where `canSeeUnderConstruction()` is
  true (dev, Vercel previews) — never in production.
- **Filters in the URL:** `/studies?theme=economia&format=note`; one index, no
  page per theme for now.
- **The Capela's mock studies** stay in `lib/mock-data.ts` for the closed
  Capela; only the one written out ("vida interior") is copied to Estudos, as a
  `draft`, to build and test the screens.

## Why

`next-mdx-remote` keeps content as a collection read by our own loader (the
index needs every study's front matter), works in Server Components and adds
no build plugin; it is the route the Next.js docs point to for content outside
`app/`. Validating in the loader keeps the content honest without a schema
library. Few broad themes keep the index chips short and stop it leaning to faith.

## Alternatives considered

- **`@next/mdx`** — great for one page per file, awkward for listing a
  collection with typed front matter.
- **Velite / Content Collections** — typed schemas, but another build step and
  dependency for a handful of files.
- **`next-mdx-remote-client`** (fork) — fine, but `next-mdx-remote` is
  maintained again (v6, 2026) and is the one the docs name.
- **Keep the Capela's six categories** — too many chips, all about faith.

## Consequences

`next-mdx-remote` is a dependency of `apps/web`. Projetos can reuse the loader
pattern. The Strapi article types stay for the closed Capela until it is rebuilt.
