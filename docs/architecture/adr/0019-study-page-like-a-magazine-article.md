# 0019 — A study page is laid out like a magazine article (Medium)

- **Status:** accepted
- **Date:** 2026-10-28
- **Supersedes:** the study page in [design-system/studies.md](../../design-system/studies.md) (subjects in the margin, no signature at the top)

## Context

Gustavo wants a study's page to follow the structure readers know from Medium:
the article, its conclusion, the subjects, likes, comments, who wrote it and
what to read next, plus a floating button back to the top. Estudos has no
backend: comments are already shown closed ([0016](0016-studies-comments-shown-closed.md)).

## Decision

- **Opening:** label (theme · format), title, summary, then the signature —
  portrait, name, and the line of dates and reading time (`StudyByline`).
- **Text:** the MDX with the format's gloss in the margin (subjects leave the
  margin). An article ends with a section `## Conclusão`: a writing
  convention, not a component; the build does not check it.
- **The end, in this order:** references and the note ↔ article links;
  **who wrote it** — the signature that closes the text (`StudyByline`: face,
  name, "escreve aqui o que estuda"; work only, no biography,
  [0018](0018-personal-exposure-rules.md)); the **subjects** as chips, each
  one a link to the index filtered by it (`/studies?tag=…`, a new filter in
  `StudyIndex`); **likes** (`StudyActions`: "Curtir" and "Comentar", the
  latter a jump to `#comments`); **comments** (0016); **read next** ("Leia
  também": up to three other visible studies, same theme first, then shared
  subjects, then the newest — `getRelatedStudies`); the way back.
- **Likes are shown closed**, as comments are: the button drawn in pencil
  (disabled, dashed `support`), a note "as curtidas abrem junto com os
  comentários", no count, no handler. One switch, `likes: 'closed'` in
  `lib/studies-content.ts`.
- **Back to top:** `BackToTop` in `@my-world/ui` — a small near-square button,
  bottom right at the gutter, hairline, no shadow; it appears after one
  screen of scrolling (by the reader's hand), scrolls smoothly (instantly
  with reduced motion), hides in print and moves the focus to `<main>`.

## Why

Readers already know where each thing is on an article page; following that
order makes a study easy to finish, share by subject and continue. Showing
likes now, closed, settles the design with the rest of the page, as was done
for comments.

## Alternatives considered

- **An author section after the comments** ("Quem escreveu", with a link to
  the portfolio) — tried; Gustavo preferred the plain signature closing the
  text, as the page had it before.
- **Likes counted in the browser** (`localStorage`) — a count only the reader
  sees is not a like.
- **A centered single column, as on Medium** — loses the margin gloss that
  carries ink and pencil ([0015](0015-studies-ink-and-pencil.md)).

## Consequences

Opening likes needs the same backend decision as comments (storage, abuse,
LGPD); it should be one ADR for both. New pieces: `BackToTop`,
`chipClasses()` (link chips), `StudyActions`, `StudyByline`,
`getRelatedStudies`; `SiteShell`'s `<main>` is focusable from script
(`tabIndex={-1}`).
