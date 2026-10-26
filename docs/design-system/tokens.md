# Design tokens

Source: `packages/design-system/tokens/*.json` (DTCG). Values live there only;
this page says how the tokens are organized and how to use them. Decisions:
[ADR 0011](../architecture/adr/0011-dtcg-tokens-with-style-dictionary.md) (format, build),
[ADR 0012](../architecture/adr/0012-agnostic-token-taxonomy.md) (names, units).

## Files

| File | Holds |
|---|---|
| `base.json` | everything shared: type scales and roles, space, sizes, breakpoints, radius, border, opacity, motion, layers |
| `palette.json` | the brand's chromatic colors (rubric, ember, blueprint, gold) — primitives, never used directly |
| `<theme>.json` | one environment's semantic colors and shadow, `light` and `dark` |

## Naming

- `category.role.variant` — the role, never a product or platform word
  (no `article`, `nav`, `card`, `section`, `page`).
- Written in **px / ms**. Each platform's build converts: the web uses rem for
  type, space, sizes and breakpoints, `clamp()` for fluid roles, px for
  hairlines, corners and shadows.
- A token exists only if it is used or belongs to a scale. Adding one: put it in
  the JSON (every theme and mode, for colors), `pnpm tokens`, and register it in
  `packages/ui/src/css/base.css` if it should be a Tailwind utility.

## Categories → Tailwind utilities

| Tokens | Utilities |
|---|---|
| `color.*` (semantic, per theme) | `bg-surface`, `bg-surface-muted`, `text-foreground-muted`, `border-border-strong`, `text-primary`, `fill-support`, `fill-hidden`… |
| `font.family.*` | `font-sans` · `font-serif` · `font-mono` |
| `font.size.*` (2xs → 9xl) | `text-2xs` … `text-9xl` |
| `typography.*` (roles) | `text-display`, `text-headline`, `text-title`, `text-title-sm`, `text-*-serif`, `text-quote`, `text-quote-sm`, `text-lead` (size + line height + tracking + weight; add the family with `font-*`) |
| `font.weight.*` | `font-light` · `font-regular` · `font-medium` · `font-semibold` · `font-bold` |
| `font.line-height.*` | `leading-compact` · `none` · `tight` · `snug` · `normal` · `relaxed` · `loose` |
| `font.letter-spacing.*` | `tracking-tightest` … `tracking-widest` |
| `space.N` | Tailwind's numeric spacing (`p-4` = `space.4` = 16px) |
| `space.gutter` / `gutter-wide`, `space.block` / `block-wide` | `px-gutter md:px-gutter-wide`, `py-block md:py-block-wide` |
| `size.container` · `size.measure` · `size.bar` | `.section-inner` · `max-w-measure` / `.article-inner` · `h-bar`, `scroll-mt-bar` |
| `breakpoint.*` | `sm:` `md:` `lg:` `xl:` |
| `radius.*` | `rounded-xs` · `rounded-pill` |
| `opacity.*` | `opacity-faint` · `opacity-half` |
| `duration.*` · `easing.*` | `duration-fast` … `duration-gesture` · `ease-standard` · `ease-out` · `ease-in-out` |
| `layer.*` | `z-sticky` · `z-overlay` · `z-top` |
| `shadow.floating` (per theme) | `shadow-floating` |

Don't write `text-[14px]`, `tracking-[…]` or `leading-[…]` in components — use
the scale. SVG drawings (the world map) keep their own label sizes.
