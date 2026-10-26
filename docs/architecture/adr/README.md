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
| [0007](0007-content-in-mdx.md) | Content in MDX in the repo instead of Strapi | accepted (not implemented) |
| [0008](0008-chapel-becomes-contemplation.md) | The Capela becomes a place of contemplation | accepted (not implemented) |
| [0009](0009-projects-and-studies.md) | Projetos owns projects; Estudos keeps articles and notes together | accepted (not implemented) |
| [0010](0010-docs-in-the-repo.md) | Documentation lives in the repo | accepted |
| [0011](0011-dtcg-tokens-with-style-dictionary.md) | Design tokens in DTCG JSON, built with Style Dictionary | accepted |
