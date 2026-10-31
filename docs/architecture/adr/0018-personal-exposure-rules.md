# 0018 — Identity yes, biography no: rules for personal exposure

- **Status:** accepted
- **Date:** 2026-10-27
- **Supersedes:** the privacy rule's "faith and the person appear only in an
  implied, discreet way" in [product/content.md](../../product/content.md)

## Context

The privacy rule was prose with no check, and drafts written "in Gustavo's
voice" went in anyway: the Capela's about page told his faith story (childhood,
"era fome", his reading list, "católico praticante", his city); the portfolio
showed coordinates down to the minute in every footer and the city in the
JSON-LD; city, current employer, current school and photo together said where
he is on any given day. Gustavo reviewed each point on 2026-10-27.

## Decision

- **Identity yes, biography no.** The site may state facts (work, education,
  career dates, his faith) but never tells his life (family, feelings, routines,
  where he is, his faith story).
- **Faith:** declared in the portfolio's Sobre (confirmed by Gustavo); the
  Capela and Estudos are about faith, not about him — the author is a name and
  "um estudante, não um mestre", without biography or city. The Capela's future
  letter is an invitation to the reader, not a testimony.
- **Location:** never on the home; the portfolio keeps the city and the school's
  name; coordinates are rounded to whole degrees (`23°S 51°W`); the JSON-LD
  address has region and country only; the root metadata description has no city.
- **Visitors' data** (comments, the Capela's candles): anonymous by default,
  nothing required, an LGPD notice before sending, deleted when no longer needed.
- **A publishing checklist** in [content.md](../../product/content.md) runs for
  every text, image, metadata and JSON-LD change, closed spaces included.
- Kept as they are, by Gustavo's choice: the personal contact e-mail, the
  descriptions of work at Big4Tech, professional study habits.

## Why

What is published under a full name is indexed and copied for good; a
checklist catches what a rule in prose did not. Stating a fact is a choice made
once; telling a life is an open door. Rounded coordinates keep the drawing's
effect (an old chart's title block) without pointing anywhere.

## Alternatives considered

- **Faith only implied everywhere** (the old rule) — Gustavo chose to declare it
  in the portfolio.
- **Removing the coordinates** — they are part of the title-block drawing; whole
  degrees say only "north of Paraná".
- **A dedicated contact e-mail** — declined for now.

## Consequences

- `lib/chapel-content.ts` rewritten without biography (marked `REVIEW`);
  `IDENTITY.coordinates`, `buildPersonJsonLd`, the root `layout.tsx` description
  changed; EWZ Capital's end date corrected to dez 2023 while reviewing.
- Vercel previews show closed spaces: Deployment Protection must be on before
  anything sensitive sits in a closed space (open question in the handoff).
- Commits in this repo are authored with Gustavo's personal e-mail from now on
  (repo-local `git config`); earlier commits carry his work e-mail — rewrite the
  history before the repository ever goes public.
