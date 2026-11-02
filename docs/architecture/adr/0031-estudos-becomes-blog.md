# 0031 — Estudos becomes the Blog

- **Status:** accepted
- **Date:** 2026-11-02
- **Supersedes:** the name in [0009](0009-projects-and-studies.md) ("Never called 'blog'")

## Context

The writing space was named "Estudos" at `/studies`, and ADR 0009 ruled out the
word "blog". A visitor has to work out what "Estudos" holds; everyone already
knows what a blog is. The space has not opened to the public yet, so nothing
indexed or linked depends on the old name.

## Decision

The space is **Blog**, at `/blog`. Readers see "Blog"; one piece of writing is
"um texto" (articles and notes are still its two formats). In code the space id,
folders, theme and tokens are `blog`, and one piece of writing is a `post`
(`PostMeta`, `getPosts`). `/studies` redirects to `/blog`, temporarily, like the
Capela's old paths.

## Why

A common, intuitive name beats a distinctive one for the door to a space; the
identity (ink and pencil, the Biblioteca on the map) lives in the margins, where
the metaphor belongs anyway. The rename goes all the way through the code so a
space never has two names.

## Alternatives considered

- **Rename only the route and the visible name** — smaller, but leaves `studies`
  in the code behind a `/blog` URL, one more thing to explain.
- **"post" as the reader's word** — "texto" reads better in Portuguese and fits
  both articles and notes.

## Consequences

The Capela keeps its own "estudos" (`CHAPEL.studies`, `StudyBody`): its studies
are another thing and only their move here (ADR 0008) would change them. The map's
building is still a Biblioteca. Older ADRs keep their names and text as history;
read "Estudos" there as the Blog. To visitors it was always the Blog: the logbook
speaks of it by that name in every line and does not mention the rename.
