# 0032 — The Blog is led by pictures

- **Status:** accepted
- **Date:** 2026-11-02
- **Supersedes:** the index and the opening of a post in [0019](0019-study-page-like-a-magazine-article.md) (the structure of the post's end stays)

## Context

Gustavo wants the Blog to carry more images, each piece of writing with its own,
and a carousel at the start. His reference for the layout is the blog of Minha
Biblioteca Católica: a large image with a title, three highlighted cards, a list
with thumbnails; on an article, a wide image at the top and an outline beside the
text. Inspiration for the layout only: the design system stays as it is. There
are no pictures yet, so a post without one must still look finished enough to judge.

## Decision

- **Every post may have a cover** (`cover`, `coverAlt`, `coverCredit` in the front
  matter; the file in `public/blog/<slug>/`). Without one, `Cover` keeps its place
  with an empty gray plate.
- **Index:** carousel (the three newest articles) → the statement, smaller →
  "Destaques" (the next three, as cards) → "Todos os textos" (every post, with the
  filters and a thumbnail per row). Only articles are put forward; a note is still
  in pencil. "Todos os textos" repeats them on purpose: filters must see every post.
- **Carousel:** the index's protagonist. It turns by itself every `duration.turn`,
  with a pause button, and waits under the pointer and the keyboard's focus; a swipe
  or the two buttons move it too, on the browser's own snap scrolling. With reduced
  motion it doesn't turn.
- **The title sits on a paper label** over the picture, with a hairline; below it
  on smaller screens.
- **Post:** cover at the top, then the opening; the margin gets the outline ("Neste
  texto": the `##` sections, wide screens only) under the gloss; "Leia também"
  becomes cards.
- Filtered links land on the list (`#textos`), past the carousel.

## Why

Pictures make a list of writing easy to scan, which is what Gustavo liked in the
reference, and he wants the carousel to turn on its own. As the page's protagonist
it keeps identity rule 3: the one thing that loops, always pausable. The
label replaces a dark gradient with white text: no new colors, legible over any
picture, in both modes.

## Alternatives considered

- **A carousel moved only by hand** — the first version; Gustavo preferred that it
  turn with time.
- **Right-hand outline, as in the reference** — the left margin already exists and
  carries the gloss (ADR 0015); a second side column would narrow the text.
- **A `featured` field to choose the carousel** — not needed yet; newest first
  needs no upkeep.

## Consequences

Every article should get a cover before it is published: the gray plate is for
building, and nothing checks it. New tokens `ratio.wide`, `ratio.cover` and `duration.turn`. New
pieces: `Cover`, `Carousel`, `EntryCards`, `IndexEntry.cover`,
`PageIntro spacing="compact"`, `PostSlide`, `PostOutline`. Five `exemplo-*.mdx`
drafts exist only so the layout can be seen; delete them when real posts exist.
