# Styling rules

1. **Tailwind first, no inline `style`** — except truly computed values (orbit
   positions, swatch colors read from the theme source).
2. **Hover with `hover:` / `group-hover:`**, never `onMouseEnter` for styling.
3. **Responsive with `sm:` / `md:` / `lg:` / `xl:`**, never `<style>` tags.
4. **Always the design tokens — in every project.** Never hardcode a color or a size — tokens only (`bg-surface`,
   `text-primary`, `border-border-strong`, `text-support`, `text-md`,
   `leading-snug`, `tracking-wider`, `duration-fast`…; see [tokens.md](tokens.md)).
   No `text-[14px]`, `tracking-[…]`, `leading-[…]`, `mt-[9px]`, `max-w-[460px]`,
   `z-[1]`, `bg-[rgb(…)]`. Missing a value? Add the token to the JSON first.
   A grid template uses the token vars: `grid-cols-[var(--size-width-2xs)_minmax(0,1fr)]`.
   Only a drawing's own geometry (SVG coordinates in its viewBox, the map's
   arrival sequence) is not a token.
5. **Server Components by default**; `'use client'` only for state, effects,
   browser APIs (search, quote plate, filters, nav, toggles).
6. **Page width with `<Section>` / `.section-inner`** (or `Plate` / `Folio`).
7. Tailwind sorts arbitrary values alphabetically, so a `className` that
   conflicts with a primitive's own size/tracking does not reliably win — add
   a variant/level to the primitive instead.
8. `<Portrait>` is `w-full`: size it with a wrapper.
9. In keyframe-driven CSS, set animation **longhands** (`animation-delay`…) — a
   later shorthand resets them.
