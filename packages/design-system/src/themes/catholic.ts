import type { ThemeContract } from '../types'

// Palette for the study environment: a warm near-black chapel chrome
// (kept from the Framer-inspired reskin) paired with the original aged-gold
// accent — evoking illuminated manuscripts and candlelit study rather than a
// cold tech palette. Content surfaces flip between a parchment-light and a
// dark-leather set; the gold accent and warm chrome stay constant.
export const catholicTheme: ThemeContract = {
  brand: {
    primary:        '#12100C',
    primaryLight:   '#1E1A14',
    primaryDark:    '#000000',
    accent:         '#B08D57',
    accentHover:    '#C8A96E',
    onPrimary:      '#F6F1E8',
    onPrimaryMuted: 'rgba(246, 241, 232, 0.62)',
    onAccent:       '#1F150A',
    support1:       '#4E6651',
  },
  light: {
    surface:        '#FFFFFF',
    surfaceAlt1:    '#F6F1E8',
    surfaceAlt2:    '#EDE4D3',
    foreground:     '#1A1A1A',
    muted:          '#5E5E5E',
    subtle:         '#8A8A8A',
    border:         'rgba(176, 141, 87, 0.18)',
    borderStrong:   'rgba(176, 141, 87, 0.40)',
    shadow:         'rgba(18, 16, 12, 0.10)',
    accentPale:     '#F3EBD8',
    accentBorder:   '#D9C594',
  },
  // Currently unused — this environment ships light mode only (see the
  // `modes: ['light']` entry for 'catholic' in generate-themes.ts), so this
  // block never reaches the generated CSS. Kept ready in case a dark toggle
  // is reintroduced later.
  dark: {
    surface:        '#161310',
    surfaceAlt1:    '#1E1912',
    surfaceAlt2:    '#120F0B',
    foreground:     '#F0E9DA',
    muted:          '#A69C89',
    subtle:         '#6E6656',
    border:         'rgba(246, 241, 232, 0.10)',
    borderStrong:   'rgba(246, 241, 232, 0.22)',
    shadow:         'rgba(0, 0, 0, 0.50)',
    accentPale:     '#2A2010',
    accentBorder:   '#4A3A1C',
  },
  typography: {
    fontSans:  "'Inter', 'Source Sans Pro', system-ui, sans-serif",
    fontSerif: "'Cormorant Garamond', Georgia, serif",
  },
}
