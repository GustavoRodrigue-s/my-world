# Design tokens

Source: `packages/design-system/tokens/*.json` (DTCG). Values live there only;
this page says how the tokens are organized and how to use them. Decisions:
[ADR 0011](../architecture/adr/0011-dtcg-tokens-with-style-dictionary.md) (format, build),
[ADR 0012](../architecture/adr/0012-agnostic-token-taxonomy.md) (names),
[ADR 0013](../architecture/adr/0013-tokens-match-production-built-at-build-time.md) (values = production, units, built at build time).

## Files

| File | Holds |
|---|---|
| `base.json` | everything shared, which the themes extend: the brand's chromatic colors (`color.rubric`, `ember`, `blueprint`, `gold`, `graphite`…), type scales and roles, space, sizes, breakpoints, radius, border, opacity, motion, layers |
| `<theme>.json` | one environment: its semantic colors (pointing at base colors, e.g. `primary` → `{color.rubric}`, plus its own neutrals) and shadow, `light` and `dark` |

The base colors are not emitted as CSS: components use the themes' roles
(`text-primary`, never the raw red).

## Naming

- `category.role.variant` — the role, never a product or platform word
  (no `article`, `nav`, `card`, `section`, `page`).
- Written in **px / ms**, with the values the interface actually uses. Each
  platform's build converts: the web uses rem (1rem = 16px)
  for type, space, sizes and breakpoints, `clamp(min, viewport·vw, max)` for
  fluid roles, px for hairlines, corners and shadows.
- Everything in `generated/` (CSS, `tokens.json`, brand SVGs) is built at build
  time and not committed.
- A token exists only if it is used or belongs to a scale. Adding one: put it in
  the JSON (every theme and mode, for colors), `pnpm tokens`, and register it in
  `packages/ui/src/css/base.css` if it should be a Tailwind utility.

## Categories → Tailwind utilities

| Tokens | Utilities |
|---|---|
| `color.*` (semantic, per theme) | `bg-surface`, `bg-surface-muted`, `text-foreground-muted`, `border-border-strong`, `text-primary`, `fill-support`, `fill-hidden`… |
| `font.family.*` | `font-sans` · `font-serif` · `font-mono` |
| `font.size.*` (xs 12px → 8xl 96px; base 16px) | `text-xs` … `text-8xl` |
| `typography.*` (roles) | `text-display`, `text-headline`, `text-title`, `text-title-sm`, `text-*-serif`, `text-quote`, `text-quote-sm`, `text-lead`, `text-callout`, `text-monogram` (size + line height + tracking + weight; add the family with `font-*`) |
| `font.scale.*` (relative to the surrounding text → em) | `text-emphasis` · `text-initial` (drop cap) · `mt-initial-offset` |
| `font.weight.*` | `font-light` · `font-regular` · `font-medium` · `font-semibold` · `font-bold` |
| `font.line-height.*` | `leading-flush` · `none` · `tight` · `snug` · `normal` · `relaxed` (body) · `loose` |
| `font.letter-spacing.*` (fraction of the font size → em) | `tracking-tighter` · `tight` · `normal` · `wide` · `wider` · `widest` |
| `space.N` | Tailwind's numeric spacing (`p-4` = `space.4` = 16px; steps of 4px) |
| `space.gutter` / `gutter-wide`, `space.block` / `block-wide` | `px-gutter md:px-gutter-wide`, `py-block md:py-block-wide` |
| `size.width.*` (4xs 120px → 7xl 1080px, steps of 8px) | `max-w-xs` … `max-w-7xl`, `min-w-*`; in grid templates `var(--size-width-xs)` |
| `size.container` · `size.measure` · `size.bar` | `.section-inner` · `max-w-measure` / `.article-inner` · `h-bar`, `scroll-mt-bar` |
| `breakpoint.*` | `sm:` `md:` `lg:` `xl:` |
| `radius.*` | `rounded-xs` · `rounded-pill` · arches: `rounded-t-[50%_var(--radius-arch)]` |
| `opacity.*` | `opacity-faint` · `opacity-dim` · `opacity-half` |
| `duration.*` · `easing.*` | `duration-fast` · `normal` · `slow` · `slower` · `gesture` · `slowest` (`arrive`, `pulse`, `draw` and `ease` `draw` drive the map in identity.css) · `ease-standard` · `ease-out` · `ease-in-out` · `animate-quote-in` |
| `border.width.*` | hairline (Tailwind's `border`) · `strong` (focus ring) |
| `layer.*` | `z-raised` · `z-sticky` · `z-overlay` · `z-top` |
| `shadow.floating` (per theme) | `shadow-floating` |

Don't write `text-[14px]`, `max-w-[460px]`, `tracking-[…]` or `leading-[…]` in
components — use the scale; a missing value becomes a token first.
