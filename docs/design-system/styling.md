# Styling rules

1. **Tailwind first, no inline `style`** — except truly computed values (orbit
   positions, swatch colors read from the theme source).
2. **Hover with `hover:` / `group-hover:`**, never `onMouseEnter` for styling.
3. **Responsive with `sm:` / `md:` / `lg:` / `xl:`**, never `<style>` tags.
4. **Always the design tokens — in every project.** Never hardcode a color or a size — tokens only (`bg-surface`,
   `text-primary`, `border-border-strong`, `text-support`, `text-md`,
   `leading-snug`, `tracking-wider`, `duration-fast`…; see [tokens.md](tokens.md)).
   No half steps (`gap-2.5`), no `/85` on a color, no `rounded-full` (`rounded-pill`).
   No `text-[14px]`, `tracking-[…]`, `leading-[…]`, `mt-[9px]`, `max-w-[460px]`,
   `z-[1]`, `bg-[rgb(…)]`. Missing a value? Add the token to the JSON first.
   A grid template uses the token vars: `grid-cols-[var(--size-width-2xs)_minmax(0,1fr)]`.
   A token without a Tailwind namespace is used through the var:
   `group-hover:scale-(--transform-scale-zoom)`, `rotate-(--transform-rotate-tilt)`,
   `grayscale-(--filter-grayscale-subtle)`.
   - **Icons** are sized from `size.icon.*`: lucide with `className="size-icon-md"`
     (never `size={…}`, never `strokeWidth={…}` — every `.lucide` draws with
     `stroke.icon`); `<Mark>`, `<Seal>`, `<CrossPattee>`, `<RoseWindow>` take
     `size="xs" … "6xl"`; a hand-drawn `<svg>` sets no `width`/`height`, only a
     class (`size-icon-2xs`, `w-icon-5xl h-auto`).
   - **Sequences** (things arriving one after another) are steps of
     `duration.stagger`: `style={{ animationDelay: 'calc(N * var(--duration-stagger))' }}`.
   - **Not tokens** ([ADR 0021](../architecture/adr/0021-every-interface-value-is-a-token.md)):
     a drawing's own geometry inside its viewBox (coordinates, stroke widths,
     `fontSize`, `opacity` of its parts — written as SVG attributes, not
     classes); proportions (`fr` ratios, `%` inside a drawn frame, aspect ratios
     of a picture); identities (`0`, `1`, `100%`, a full turn `rotate-360`, a
     half turn); keyword properties (`[transform-box:view-box]`); and the
     printed page's `@page` margins, in mm.
5. **Server Components by default**; `'use client'` only for state, effects,
   browser APIs (search, quote plate, filters, nav, toggles).
6. **Page width with `<Section>` / `.section-inner`** (or `Plate` / `Folio`).
7. Tailwind sorts arbitrary values alphabetically, so a `className` that
   conflicts with a primitive's own size/tracking does not reliably win — add
   a variant/level to the primitive instead.
8. `<Portrait>` is `w-full`: size it with a wrapper.
9. In keyframe-driven CSS, set animation **longhands** (`animation-delay`…) — a
   later shorthand resets them.
