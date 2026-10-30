# 0022 — One footer everywhere; the Capela is veiled until it opens

- **Status:** accepted
- **Date:** 2026-10-30
- **Supersedes:** the line "the portfolio still names the Capela where it states
  facts" in [0020](0020-home-speaks-of-the-capela-by-parable.md), and that ADR's line
  naming the Capela on its construction page

## Context

Each space built its own footer, with different columns, labels and notes, and the
same place had different names from page to page. The portfolio, `/identity` and the
Capela's construction page named the Capela while the home veiled it.

## Decision

- **One footer.** `components/world/world-footer.tsx` closes every space, construction
  pages included. Its labels live in `lib/world-footer-content.ts`, per language:
  columns "lugares", "este mundo", "contato". Hrefs may change with the language; a
  label does not change from page to page. It carries no location; it closes with
  "Ad maiorem Dei gloriam".
- **The veil.** Outside the Capela, and on its construction page, it is the **hidden
  treasure** ("Tesouro escondido", "Hidden treasure"): no "Capela", no description of
  the place, no cross in the construction drawing.
- **Inside the open Capela there is no veil.** Its pages say its name, the footer link
  included (the one exception to the single label), and speak openly of the faith, the
  Church and the spiritual life. The rule against biography (0018) still holds.
- The portfolio's Sobre keeps "Também sou católico" without naming the Capela.

## Why

A label that changes makes one place look like two, and the veil only works if the next
click doesn't lift it. It is lifted by finding the place finished, not by knocking on
its door.

## Alternatives considered

- **A footer per space, or a shared one plus a column per space** — the columns drift
  again, and they repeat each space's own navigation.
- **Naming the Capela outside the home** — breaks either the veil or the label.

## Consequences

The themes and sections of Estudos and the Capela live only in their own navigation.
The URL stays `/chapel`: routes are always in English.
