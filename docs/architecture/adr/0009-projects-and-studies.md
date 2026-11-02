# 0009 — Projetos owns projects; Estudos keeps articles and notes together

- **Status:** accepted (not implemented; the name superseded by [0031](0031-estudos-becomes-blog.md))
- **Date:** 2026-10-25
- **Supersedes:** the 2025 `/dev` area; "no blog / notes environment for now" (2026-10-16)

## Context

Projects appear in the portfolio today; deeper project pages and a place for
writing are planned. Gustavo writes both finished articles and quick notes.

## Decision

- **Projetos is the source of truth** for projects. The Portfólio shows only
  highlights, linking to each project's page.
- **Estudos** holds articles and notes **together**, on any subject (technology,
  economy, spiritual life…). Format is a filter (Tudo · Artigos · Anotações)
  next to the themes; a note can mature into an article. Never called "blog".
  Portuguese only for now.

## Why

One place per fact avoids two versions of a project. Separating notes from
articles by finish, not subject, keeps one index and lets writing grow.

## Consequences

The portfolio's project facts move to Projetos when it is built. The Capela's
studies move to Estudos ([0008](0008-chapel-becomes-contemplation.md)).
