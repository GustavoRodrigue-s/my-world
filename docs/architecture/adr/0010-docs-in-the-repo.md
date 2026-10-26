# 0010 — Documentation lives in the repo

- **Status:** accepted
- **Date:** 2026-10-26
- **Supersedes:** Notion ("Propósito", "Portfólio") and AI-session memory as project memory

## Context

Decisions were spread across a 490-line `CLAUDE.md` duplicated as `AGENTS.md`,
Claude's per-machine memory, Notion pages and chat transcripts. They had already
diverged (the spec still described Strapi after MDX was chosen). Several AI
sessions need to continue each other's work.

## Decision

- `docs/` in the repo is the only project memory: product, architecture, ADRs,
  design system, guides, and a session handoff.
- `AGENTS.md` is a short entry point (rules + map); `CLAUDE.md` only imports it.
- Every session ends with a promotion step ([docs/README.md](../../README.md)):
  decisions → ADR, rules → AGENTS.md/docs, unfinished state → `handoffs/current.md`.
- Notion is no longer updated; AI memory keeps only private, personal context.

## Why

Versioned, reviewed with the code, readable by any agent without extra access;
one source per fact. Follows the "repo-first" model for small teams (Markdown +
ADRs + AGENTS.md + handoff), without portals, Storybook or docs CI — the
project doesn't need them yet.

## Alternatives considered

- **Keep Notion as the source** — drifts from the code; agents need extra access.
- **Docusaurus/Storybook** — the `/identity` page already is the living guide.

## Consequences

Docs are part of done: a change that alters a decision, rule or behavior updates
its doc in the same commit.
