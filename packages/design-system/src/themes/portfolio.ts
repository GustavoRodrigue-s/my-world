import type { ThemeContract } from '../types'

// "Mundo do Gustavo" — the personal identity, worn by the portfolio.
// Paper, ink and one red: the rubric ink of liturgical manuscripts, which is
// also the ember of the workshop forge. Nothing else is chromatic except the
// blueprint blue, reserved for work that is still on the drawing board.
// Unlike the catholic theme, the accent is re-tuned per mode: a red that
// holds AA on paper is too dark on night, and vice versa.
export const portfolioTheme: ThemeContract = {
  brand: {
    primary:        '#17150F', // tinta — ink
    primaryLight:   '#24211A',
    primaryDark:    '#0C0B08',
    accent:         '#B5321C', // rubrica — rubric red
    accentHover:    '#93260F',
    onPrimary:      '#EEEAE0', // papel — paper
    onPrimaryMuted: 'rgba(238, 234, 224, 0.64)',
    onAccent:       '#FBF8F2',
    support1:       '#2E4A7D', // cianotipia — blueprint, "na prancheta" only
  },
  light: {
    surface:        '#EEEAE0',
    surfaceAlt1:    '#E6E1D4',
    surfaceAlt2:    '#F6F3EC',
    foreground:     '#17150F',
    muted:          '#57524A',
    subtle:         '#7E786C', // decoration only — below AA for small text
    border:         'rgba(23, 21, 15, 0.14)',
    borderStrong:   'rgba(23, 21, 15, 0.34)',
    shadow:         'rgba(23, 21, 15, 0.10)',
    accentPale:     '#EFD9CC',
    accentBorder:   '#D49A86',
  },
  dark: {
    surface:        '#14120E', // noite — warm night, the forge after hours
    surfaceAlt1:    '#1C1914',
    surfaceAlt2:    '#0E0D0A',
    foreground:     '#ECE6D9',
    muted:          '#A59E8F',
    subtle:         '#6E685C',
    border:         'rgba(236, 230, 217, 0.12)',
    borderStrong:   'rgba(236, 230, 217, 0.30)',
    shadow:         'rgba(0, 0, 0, 0.50)',
    accentPale:     '#2B1711',
    accentBorder:   '#6A2E1F',
    // brasa — ember: the rubric red lit up for night
    accent:         '#EE5C3F',
    accentHover:    '#FF7E62',
    onAccent:       '#14120E',
    support1:       '#8FA6D6',
  },
  typography: {
    // Real families come from next/font variables set on the portfolio
    // wrapper; these stacks are only the fallback.
    fontSans:  "'Bricolage Grotesque', system-ui, sans-serif",
    fontSerif: "'Cormorant Garamond', Georgia, serif",
    fontMono:  "'IBM Plex Mono', ui-monospace, monospace",
  },
}
