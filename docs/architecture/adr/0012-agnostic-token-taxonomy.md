# 0012 — Agnostic token taxonomy; the web converts to responsive units

- **Status:** accepted — scale values and the 16px rem base superseded by [0013](0013-tokens-match-production-built-at-build-time.md)
- **Date:** 2026-10-26

## Context

After [0011](0011-dtcg-tokens-with-style-dictionary.md) the tokens were portable
in format but not in content: there were no tokens for type sizes, weights, line
height, letter spacing, a spacing scale, borders, opacity or breakpoints (about
20 font sizes, 13 trackings and 10 line heights were written by hand in the
components), and some names came from one product or platform (`article-max`,
`nav-h`, `section-x`, `radius.card`, `z.nav`). Color names were misleading
(`primary` was ink, `on-primary` was paper, `support-1`/`support-2`), and several
tokens were never used (`primary-light`, `primary-dark`, `radius.md`…`2xl`).
Gustavo wants one design system for the whole brand (site, app, post, ad,
print), so names can't assume a product or a platform.

## Decision

- **Names say the role, never a product or platform:**
  `category.role.variant`. No `article`, `nav`, `card`, `section`, `page`.
- **Two tiers for color:** `palette.json` holds the brand's chromatic colors
  (rubric, ember, blueprint, gold), shared by every theme; each theme maps
  semantic roles to them. Neutrals (paper, limewash, ink, night) stay in each
  theme, because they are its material.
- **One primary color.** The brand red is `primary` (`primary-hover`,
  `on-primary`); there are no other primaries. Semantic colors:
  `surface` · `surface-muted` · `surface-raised` · `foreground` ·
  `foreground-muted` · `foreground-subtle` · `border` · `border-strong` ·
  `primary` · `primary-hover` · `on-primary` · `support` · `hidden` · `shadow`.
- **Scales and roles in `base.json`:** `font.family|weight|size|line-height|letter-spacing`,
  `typography.*` roles (display, headline, title, title-sm, their `-serif`
  twins, quote, quote-sm, lead), `space` (4px steps + `gutter`, `block`),
  `size` (container, measure, bar), `breakpoint`, `radius`, `border.width`,
  `opacity`, `duration`, `easing`, `layer`. Only what is used or part of a
  scale is a token.
- **Tokens are written in px and ms**, the units a designer and every platform
  understand. **Converting to responsive units is the build's job, not the
  design system's:** the web build (Style Dictionary) turns type, space, sizes
  and breakpoints into **rem** (relative to the reader's browser font size; the
  site no longer fixes `html { font-size }`) and turns roles with a
  `world.fluid` extension (`min` → `fontSize`) into `clamp()` between 360px and
  1280px. Hairlines, corners and shadows stay in px.
- `packages/ui/src/css/base.css` is the Tailwind adapter: it resets Tailwind's
  default namespaces and registers only the brand's tokens (`text-display`,
  `text-md`, `leading-snug`, `tracking-wider`, `px-gutter`, `max-w-measure`,
  `duration-fast`, `z-sticky`…). Breakpoints come as literals
  (`generated/css/tailwind-breakpoints.css`) because media queries can't read vars.

## Why

Role names survive any product; a scale in px can be handed to Figma, a post
template or a native app as-is, while each platform picks its own responsive
unit. rem rather than em: em compounds with the parent's size, rem always
refers to the root, so a token means the same everywhere on the page and still
follows the reader's font-size setting.

## Alternatives considered

- **Primitives for every color** (neutral scales 50–950): more names, no reuse —
  each theme's neutrals are its own.
- **Tokens written in rem/em** — ties the source to the web.
- **Keep the old names and only add the missing scales** — leaves product and
  platform words in a brand-wide system.

## Consequences

- The site's rem base moved from a fixed 15px to the browser's 16px, so
  Tailwind's spacing scale is now 4px steps (it was 3.75px): spacing grew about
  6%. Body text stays 15px (`font.size.base`).
- Hand-written sizes were consolidated onto the scales; some texts moved 1–2px,
  fluid titles have new min/max steps. The world map's SVG labels keep their
  own sizes (they are drawing units).
- Component APIs follow the tokens: `Heading level` = typography role,
  `Text size` = scale step (`lead` for the role), `color="primary"`,
  `Section bg="surface" | "muted" | "raised"`.
- Removed as unused: `shadcn.css`, the legacy utilities in `globals.css`,
  `Badge`, `Card`, `Button` variants `primary`/`outline`, `Heading` levels
  `display`/`h1`–`h4` (old Capela), legacy color aliases.
- `duration-[var(--transition-fast)]` (an invalid duration, so those hovers had
  no transition) became `duration-fast`.
