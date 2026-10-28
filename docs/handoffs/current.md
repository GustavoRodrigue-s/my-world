# Current handoff

Updated: 2026-10-27 · Branch: `feat/studies` (from `feat/world-home`)

Only unfinished state. Decisions live in [ADRs](../architecture/adr/); the
product picture in [product/spaces.md](../product/spaces.md).

## Goal

Build Estudos ([product/spaces.md](../product/spaces.md#estudos-building--on-featstudies)),
in phases: 1 MDX pipeline · 2 environment (palette, layout, gating,
construction page) · 3 index with filters · 4 study page with the closed
comments area · 5 new components (`SearchDialog`, format mark; the form and
comment pieces came with phase 4) · 6 integrations (search, sitemap,
atlas, footer, logbook) · 7 docs. Meanwhile, ship the world's home.

## Current state

- `feat/studies` (not committed, not pushed): **phase 1 done** — ADRs 0014–0017,
  `next-mdx-remote`, loader `lib/studies.ts`, `StudyMeta` types,
  `lib/studies-content.ts`, `components/studies/mdx-components.tsx`, the
  `Prose*` components in `@my-world/ui`, `content/studies/vida-interior.mdx`
  (draft, `REVIEW`). Checked in the browser through a temporary page (removed):
  front matter, drafts, every MDX element, a wrong theme failing with the file
  name. Build and type-check pass.
- **Phase 2 done, palette awaiting Gustavo:** `tokens/studies.json` (page of a
  book a shade cooler than the portfolio's paper; cool night; `support` =
  `color.graphite` / `graphite-night`; `hidden` = the Capela's gold),
  `mark-seed.svg`, `app/studies/layout.tsx` (`StudiesShell`: `WorldBar`,
  construction notice, header with the `seed` mark, footer with the themes),
  a plain `/studies` index (no filters yet; its links lead nowhere until phase 4),
  `/under-construction/studies` (the Biblioteca: colonnade in ink, pediment and
  scaffolding in pencil). `studies` is `building`; the home links to `/studies`.
  New copy in `studies-content.ts` marked `REVIEW`. Palette approved by Gustavo
  (2026-10-27).
- **Phase 3 done:** `components/studies/study-index.tsx` — format chips (Tudo ·
  Artigos · Anotações) and theme chips, synced to `?format=&theme=` with
  `router.replace` (no scroll jump); unknown values are ignored; an empty filter
  offers "Limpar filtros". The page stays static (`useSearchParams` under
  `Suspense`, fallback = every study). `EntryList` got `gild="hidden"`: the
  kicker turns the hidden gold in Estudos. `formatDate` no longer shows a bare
  `YYYY-MM-DD` as the day before.
- **Phase 4 done:** `app/studies/[slug]/page.tsx` — the opening (theme link ·
  format, dates, reading time), a margin column (the format's gloss: ink rule
  for articles, dashed graphite for notes; the subjects), the MDX text,
  references, byline, the note ↔ article links (`maturedInto`), and
  `<StudyComments>`: empty list and the form closed in pencil. The comment
  pieces were built now, since the area needs them: `TextField`, `TextArea`,
  `CommentList`, `CommentForm` in `@my-world/ui`; `Button` has a disabled look.
  `buildArticleMetadata` / `buildArticleJsonLd` take an `ArticleSeo` (the
  Capela maps its articles with `chapelArticleSeo`; its missing
  `og-default.png` fallback is gone). New copy (`study.byline`) marked `REVIEW`.
- **Phase 5 done:** `SearchDialog` in `@my-world/ui` (ADR 0017) replaces
  `ChapelSearch`; Estudos' header has it (`line`), the Capela keeps `stone`.
  `/api/search` takes `?space=studies|chapel` and returns `{ href, title,
  kicker }`. The format mark: `StrokeMark` (ink solid / pencil dashed graphite)
  via `components/studies/format-mark.tsx`, on the format chips, each index row
  (`IndexEntry.mark`) and the study page's margin.
- **Phase 6 done:** the sitemap lists `/studies` and published studies while
  Estudos is open; the atlas card links "Artigos" / "Anotações"; Estudos is
  among the "outras paisagens" of the portfolio and Capela footers (tagged and
  closed while building), and the Capela among Estudos'; a logbook line
  (2026-10-27, `REVIEW`).
- **Phase 7 done:** `design-system/studies.md` (new), the Estudos column and
  graphite's role in `identity.md`; `/identity` shows Folha, Lamparina and Lápis
  in the palette, `mark-seed.svg` in the files, "tinta e lápis" in the
  vocabulary (PT + EN).
- **Estudos is built, not open, not committed.** Nothing on `feat/studies` is
  committed yet.

- `feat/world-home` (pushed, preview on Vercel): the home map, owner portrait,
  identity link in the footer, Gmail contact, Estudos `seed` mark, `WorldBar` on
  every environment. Builds and type-checks pass. **Not merged into `master`** —
  waiting for Gustavo's validation of the preview.
- `docs/` created on this branch (committed, pushed).
- Design tokens in DTCG JSON + Style Dictionary ([ADR 0011](../architecture/adr/0011-dtcg-tokens-with-style-dictionary.md), committed).
- Token taxonomy ([ADR 0012](../architecture/adr/0012-agnostic-token-taxonomy.md), committed) and
  [ADR 0013](../architecture/adr/0013-tokens-match-production-built-at-build-time.md): token values
  on a 16px rem base, 4px spacing grid and the recommended type scale (body
  16px; the interface is a bit larger than production, accepted); every UI value
  is a token; hovers animate 150 ms; brand SVGs built by
  the design system, `generated/` no longer committed. **Not committed yet.**
- `master` is at the "Capela" rename; the Capela is closed in production.

## Decisions already persisted

ADRs 0005 (spaces under construction), 0006 (home is a map), 0007 (MDX),
0008 (Capela → contemplation), 0009 (Projetos / Estudos), 0010 (docs in repo),
0011 (DTCG + Style Dictionary), 0012 (token taxonomy), 0013 (values = production, built at build time),
0014 (Estudos MDX and content model), 0015 (ink and pencil), 0016 (comments shown closed), 0017 (one search dialog).

## Open questions

- Home: close with a short verse? A values/manifesto section later?
- The Capela script (scenes, music, letter) and when it resumes.
- When Projetos starts; when Estudos opens to the public.
- `REVIEW` drafts in `portfolio-content*.ts`, `chapel-content.ts`, `studies-content.ts`, `logbook.ts`,
  `content/studies/vida-interior.mdx` still need Gustavo's confirmation.
- Vercel Deployment Protection: is it on for previews? Previews open the closed
  spaces ([ADR 0018](../architecture/adr/0018-personal-exposure-rules.md)) —
  Gustavo checks in the Vercel dashboard.
- The Capela's author and about copy, rewritten without biography (ADR 0018),
  is `REVIEW` — Gustavo confirms the new wording.
- `apps/web/.env.example` still has `NEXT_PUBLIC_SITE_NAME=Capela` — should it
  be the world's name?

## Next action

Gustavo reviews Estudos in the browser and the `REVIEW` copy
(`studies-content.ts`, the logbook line, `vida-interior.mdx`), then asks for the
commit. Opening Estudos to the public = writing the first published studies and
setting `studies` to `open` in `lib/world.ts`. Separately: Gustavo validates the
`feat/world-home` preview → merge to `master`.

## Disposable context

—
