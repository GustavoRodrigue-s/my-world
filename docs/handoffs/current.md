# Current handoff

Updated: 2026-10-30 · Branch: `feat/studies`

Only unfinished state. Decisions live in [ADRs](../architecture/adr/); the
product picture in [product/spaces.md](../product/spaces.md).

## Current state

- **Everything since `fd873e7` is uncommitted and unpushed** on `feat/studies`:
  the example study and Medium-like page, privacy rules (ADR 0018), the home's
  parable (0020), tokens (0021, 0025, 0028), the one footer and the Capela's veil
  (0022), the home's cartouche portrait and still logbook, the Strapi removal (0029).
- `feat/world-home` is pushed with a Vercel preview, not merged. `master` and
  production are behind: production still shows exact coordinates and an old e-mail.
- Estudos and the Capela are built and closed (`building` in `lib/world.ts`).
- Run `pnpm build` once with no dev server up: the last changes passed type-check
  and the browser, not a production build.

## Open questions

- Estudos: keep the note format, or only articles? Needs an ADR either way.
- Home: close with a short verse? A values/manifesto section later?
- The Capela script (scenes, music, letter) and when it resumes.
- When Projetos starts; when Estudos opens to the public.
- `REVIEW` drafts remain only in the Capela and Estudos (`chapel-content.ts`,
  `studies-content.ts`, the studies' MDX); Gustavo will review them later. The rest
  was confirmed on 2026-10-30.
- Vercel Deployment Protection: Gustavo confirms it is on for previews, which open
  the closed spaces (ADR 0018).
- Loja Composable is finished but not on GitHub. When Gustavo pushes it, add it to
  `prototypes` or `artifacts` with its link.

## Next action

Gustavo runs the build and asks for the commit. Opening Estudos = the
first published studies and `studies` set to `open` in `lib/world.ts`.

## Disposable context

—
