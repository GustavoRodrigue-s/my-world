import type { ThemeContract } from '../types'

// Capela de Estudos — "Cal e pedra": an old whitewashed chapel, flat.
// Lime-washed walls for the page, stone for the solid blocks that separate its
// parts, near-black ink and the rubric red, which stays the brand accent (the
// ink of liturgical books: say the black, do the red). Support-1 is the hidden
// gold — "ouro escondido": small fixed details (the illuminated initial, the
// heart of the rose window, the cross) and fillets that light up under the
// reader's hand. Never a fill, never a large area.
// Like the portfolio, the accents are re-tuned at night (gold catches the candle).
export const chapelTheme: ThemeContract = {
  brand: {
    primary:        '#1C1A17', // tinta — ink
    primaryLight:   '#2A2723',
    primaryDark:    '#100F0D',
    accent:         '#B5321C', // rubrica — rubric red (the brand)
    accentHover:    '#93260F',
    onPrimary:      '#F4F1EA', // cal — limewash
    onPrimaryMuted: 'rgba(244, 241, 234, 0.64)',
    onAccent:       '#FBF9F5',
    support1:       '#7E5F28', // ouro velho — old gold, AA on limewash
  },
  light: {
    surface:        '#F4F1EA', // cal — limewash
    surfaceAlt1:    '#E7E2D8', // pedra — stone, the flat blocks
    surfaceAlt2:    '#FAF8F4', // panels: search, menu
    foreground:     '#1C1A17',
    muted:          '#5E5950',
    subtle:         '#8E887D', // decoration only — below AA for small text
    border:         'rgba(28, 26, 23, 0.12)',
    borderStrong:   'rgba(28, 26, 23, 0.28)',
    shadow:         'rgba(28, 26, 23, 0.10)',
    accentPale:     '#F1DDD3',
    accentBorder:   '#D9A491',
  },
  dark: {
    surface:        '#141311', // completas — night prayer
    surfaceAlt1:    '#1F1D19',
    surfaceAlt2:    '#0E0D0B',
    foreground:     '#ECE7DE',
    muted:          '#A39D92',
    subtle:         '#6E695F',
    border:         'rgba(236, 231, 222, 0.11)',
    borderStrong:   'rgba(236, 231, 222, 0.26)',
    shadow:         'rgba(0, 0, 0, 0.50)',
    accentPale:     '#2A1712',
    accentBorder:   '#6A2E1F',
    // brasa — the rubric lit up for night
    accent:         '#EE5C3F',
    accentHover:    '#FF7E62',
    onAccent:       '#141311',
    support1:       '#D4AF6A', // gold by candlelight
  },
  typography: {
    fontSans:  "'Bricolage Grotesque', system-ui, sans-serif",
    fontSerif: "'Cormorant Garamond', Georgia, serif",
    fontMono:  "'IBM Plex Mono', ui-monospace, monospace",
  },
}
