# Design system

One identity — **paper, ink and one red** — worn by every environment, a palette
per environment ([ADR 0002](../architecture/adr/0002-one-identity-palette-per-environment.md)).
The living guide is the `/identity` page: check it before inventing anything visual.

| Doc | Covers |
|---|---|
| [identity.md](identity.md) | the concept, palettes, typography and the rules that must never be broken |
| [tokens.md](tokens.md) | how the design tokens are organized, named and used as utilities |
| [components.md](components.md) | `@my-world/ui`: which component for what, how to add one |
| [styling.md](styling.md) | Tailwind and code rules for UI |
| [portfolio.md](portfolio.md) | the portfolio: Fig. 1, editions, portrait |
| [chapel.md](chapel.md) | the Capela's flat dialect |
| [studies.md](studies.md) | Estudos: ink and pencil |
| [home-map.md](home-map.md) | the home's sea chart and its hidden details |

Token **values** are not repeated here beyond the overview table in
identity.md: the source is `packages/design-system/tokens/*.json` (DTCG,
built by Style Dictionary — [ADR 0011](../architecture/adr/0011-dtcg-tokens-with-style-dictionary.md)).
