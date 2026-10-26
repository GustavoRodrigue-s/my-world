# Current handoff

Updated: 2026-10-26 · Branch: `feat/world-home`

Only unfinished state. Decisions live in [ADRs](../architecture/adr/); the
product picture in [product/spaces.md](../product/spaces.md).

## Goal

Ship the world's home (the map) and, alongside it, move the project's memory
into `docs/` ([ADR 0010](../architecture/adr/0010-docs-in-the-repo.md)).

## Current state

- `feat/world-home` (pushed, preview on Vercel): the home map, owner portrait,
  identity link in the footer, Gmail contact, Estudos `seed` mark, `WorldBar` on
  every environment. Builds and type-checks pass. **Not merged into `master`** —
  waiting for Gustavo's validation of the preview.
- `docs/` created on this branch (not committed yet at the time of writing).
- `master` is at the "Capela" rename; the Capela is closed in production.

## Decisions already persisted

ADRs 0005 (spaces under construction), 0006 (home is a map), 0007 (MDX),
0008 (Capela → contemplation), 0009 (Projetos / Estudos), 0010 (docs in repo).

## Open questions

- Home: close with a short verse? A values/manifesto section later?
- The Capela script (scenes, music, letter) and when it resumes.
- When Projetos and Estudos start; MDX setup to use.
- `REVIEW` drafts in `portfolio-content*.ts`, `chapel-content.ts`, `logbook.ts`
  still need Gustavo's confirmation.
- `apps/web/.env.example` still has `NEXT_PUBLIC_SITE_NAME=Capela` — should it
  be the world's name?

## Next action

Gustavo validates the `feat/world-home` preview → merge to `master`.

## Disposable context

—
