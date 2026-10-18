/**
 * Brand tokens are mode-invariant — the "chrome" identity (nav, hero, footer,
 * featured card) and the accent stay the same in both light and dark mode.
 */
export interface BrandTokens {
  primary: string
  primaryLight: string
  primaryDark: string
  accent: string
  accentHover: string
  onPrimary: string
  onPrimaryMuted: string
  onAccent: string
  support1: string
}

/**
 * Content tokens are mode-dependent — surfaces, text, and borders for the
 * alternating content sections. A theme supplies one set for light mode and
 * one for dark mode.
 */
export interface ContentTokens {
  surface: string
  surfaceAlt1: string
  surfaceAlt2: string
  foreground: string
  muted: string
  subtle: string
  border: string
  borderStrong: string
  shadow: string
  accentPale: string
  accentBorder: string
}

/**
 * A mode may re-tune individual brand tokens when one value can't hold
 * contrast on both surfaces (e.g. a red that reads on paper is too dark on
 * night). Overrides are emitted after the brand block, so they win.
 */
export type ModeTokens = ContentTokens & Partial<BrandTokens>

export interface ThemeContract {
  brand: BrandTokens
  light: ModeTokens
  dark: ModeTokens
  typography: {
    fontSans: string
    fontSerif: string
    fontMono?: string
  }
}
