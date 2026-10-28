# 0016 — Estudos will have comments; the area is shown now, closed

- **Status:** accepted
- **Date:** 2026-10-26
- **Supersedes:** "comments" in the out-of-scope list of [product/vision.md](../../product/vision.md)

## Context

The vision listed comments as out of scope. Gustavo wants readers to comment on
studies in the future and wants the area visually ready now, without enabling it.

## Decision

- Every study (article and note) ends with a **comments area**, visible and
  **closed**: an empty list with a notice ("os comentários abrem em breve") and
  the form inside a `<fieldset disabled>` whose reason is linked for screen
  readers. No submit handler, no `fetch`, no backend.
- One switch in `lib/studies-content.ts` (`comments: 'closed'`) opens or closes
  the area; `comments: false` in a study's front matter hides it for that study.
- New library pieces: `TextField`, `TextArea` (the first form fields of
  `@my-world/ui`), `CommentList`, `CommentForm` (with a `disabled` state).
- Comments are for Estudos only; the rest of the out-of-scope list stands.

## Why

Showing the area now settles its design with the rest of the page and tells
readers it is coming, at no cost and no risk while nothing is stored.

## Alternatives considered

- **Leave comments out until they work** — the page would be redesigned later.
- **A third-party widget** (Giscus, Disqus) — foreign look, tracking, and for
  Giscus a GitHub account for readers.

## Consequences

Before the switch is turned on, a new ADR must decide: storage (Next.js API
routes plus a small database, as the Capela's candles), moderation before
publishing, spam protection, sign-in or not (auth is still out of scope), and
LGPD (names and e-mails are personal data).
