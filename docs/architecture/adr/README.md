# Architecture & design decisions (ADRs)

One file per decision: `NNNN-short-title.md`, from [template.md](template.md).
Technical and design decisions share this folder — the project is small enough
for one numbering.

An accepted ADR is not edited to change its decision: write a new one that
**supersedes** it and mark the old one `superseded by NNNN`. Fixing typos or
adding links is fine.

ADRs 0001–0009 were recorded retroactively on 2026-10-26 from earlier sessions.

| # | Decision | Status |
|---|---|---|
| [0001](0001-monorepo-next-turborepo.md) | Monorepo: Next.js app + shared packages with Turborepo and pnpm | accepted |
| [0002](0002-one-identity-palette-per-environment.md) | One personal identity for the whole world, a palette per environment | accepted |
| [0003](0003-themes-as-typed-sources.md) | Themes are typed sources that generate scoped CSS | superseded by 0011 |
| [0004](0004-chapel-flat-dialect.md) | The Capela speaks a flat dialect with hidden gold | accepted |
| [0005](0005-spaces-under-construction.md) | Unfinished spaces are badged and closed, never removed | accepted |
| [0006](0006-home-is-a-map-of-spaces.md) | One world with spaces; the home is a map | accepted |
| [0007](0007-content-in-mdx.md) | Content in MDX in the repo instead of Strapi | accepted (Estudos implements it; the Capela still reads mock data) |
| [0008](0008-chapel-becomes-contemplation.md) | The Capela becomes a place of contemplation | accepted (not implemented) |
| [0009](0009-projects-and-studies.md) | Projetos owns projects; Estudos keeps articles and notes together | accepted (Estudos built; Projetos not started) |
| [0010](0010-docs-in-the-repo.md) | Documentation lives in the repo | accepted |
| [0011](0011-dtcg-tokens-with-style-dictionary.md) | Design tokens in DTCG JSON, built with Style Dictionary | accepted (output no longer committed: 0013) |
| [0012](0012-agnostic-token-taxonomy.md) | Agnostic token taxonomy; the web converts to responsive units | accepted (values and rem base superseded by 0013) |
| [0013](0013-tokens-match-production-built-at-build-time.md) | Recommended token values on a 16px base; everything generated is built at build time | accepted |
| [0014](0014-studies-mdx-setup-and-content-model.md) | Estudos: MDX with next-mdx-remote, one collection, four themes | accepted |
| [0015](0015-studies-ink-and-pencil.md) | Estudos wears its own palette: ink and pencil | accepted |
| [0016](0016-studies-comments-shown-closed.md) | Estudos will have comments; the area is shown now, closed | accepted |
| [0017](0017-one-search-dialog.md) | One search dialog for the world, scoped per space | accepted |
| [0018](0018-personal-exposure-rules.md) | Identity yes, biography no: rules for personal exposure | accepted |
| [0019](0019-study-page-like-a-magazine-article.md) | A study page is laid out like a magazine article (Medium) | accepted |
| [0020](0020-home-speaks-of-the-capela-by-parable.md) | The home speaks of the Capela only by parable (the treasure hidden in a field) | accepted (extended by 0022) |
| [0021](0021-every-interface-value-is-a-token.md) | Every interface value is a token; drawings keep their own geometry | accepted |
| [0022](0022-one-world-footer-and-treasure-everywhere.md) | One footer everywhere; the Capela is veiled until it opens | accepted |
| [0025](0025-type-in-whole-steps.md) | Type changes in whole steps at breakpoints, one step below production | accepted |
| [0028](0028-strict-token-audit.md) | Half steps, loose opacities and stray radii are gone from the interface | accepted |
| [0029](0029-strapi-removed.md) | Strapi is removed from the repository | accepted |
