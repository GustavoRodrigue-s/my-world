# 0033 — The Blog's texts are written without AI

- **Status:** accepted
- **Date:** 2026-11-02
- **Supersedes:** —

## Context

The Blog is where Gustavo writes articles and notes. AI could draft or polish
them, and that would defeat what the space is for.

## Decision

Every article and note on the Blog is written by Gustavo, without the use of AI:
original and authentic. The rule is stated to readers on its own page
(`/blog/policy`), and a line links to it from the index and at the end of every
post.

Agents build the space (layout, code, interface words) and never write, rewrite
or polish a post's text. A draft with text from any other source cannot be
published until Gustavo has written it himself.

## Why

The texts are meant to show how he thinks and writes: the logic, the way of
writing, the narrative and the structure of each one. They also let him see his
own writing evolve from text to text, which only works if the writing is his.

## Consequences

`content/blog/design-tokens.mdx` and `vida-interior.mdx` were not written under
this rule, and the `exemplo-*` drafts are placeholders: none of them can be
published as they are. The words of the policy page are a draft for Gustavo to
replace with his own (`REVIEW` in `lib/blog-content.ts`). What the rule covers
beyond articles and notes, such as help with spelling, is not decided yet.
