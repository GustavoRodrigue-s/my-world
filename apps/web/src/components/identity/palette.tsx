import { tokens } from '@my-world/design-system'
import { Text } from '@/components/ui'
import type { PortfolioContent } from '@/lib/portfolio-content'

const day = tokens.portfolio.light.color
const night = tokens.portfolio.dark.color
const chapel = tokens.chapel.light.color

// WCAG relative luminance / contrast, so every swatch states its own legibility.
function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrast(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

type SwatchKey = keyof PortfolioContent['identity']['color']['swatches']

interface Swatch {
  key: SwatchKey
  color: string
  /** Surface it is meant to be read on, for the contrast note. */
  on?: string
}

const SWATCHES: Swatch[] = [
  { key: 'paper', color: day.surface },
  { key: 'ink', color: day.foreground, on: day.surface },
  { key: 'rubric', color: day.accent, on: day.surface },
  { key: 'graphite', color: day.muted, on: day.surface },
  { key: 'night', color: night.surface },
  { key: 'parchment', color: night.foreground, on: night.surface },
  { key: 'ember', color: night.accent, on: night.surface },
  { key: 'cyanotype', color: day['support-1'], on: day.surface },
  { key: 'gold', color: chapel['support-1'], on: chapel.surface },
]

interface PaletteProps {
  /** Name and role of each swatch, in the page's language. */
  swatches: Record<SwatchKey, [name: string, role: string]>
  /** Label for the 3:1 "large text" pass. */
  large: string
}

export function Palette({ swatches, large }: PaletteProps) {
  return (
    <ul className="grid list-none gap-px border border-border-strong bg-border-strong sm:grid-cols-2 lg:grid-cols-3">
      {SWATCHES.map((s) => {
        const ratio = s.on ? contrast(s.color, s.on) : null
        const [name, role] = swatches[s.key]
        return (
          <li key={s.key} className="bg-surface">
            {/* Swatch color is read from the design tokens, not retyped. */}
            <div className="h-24 border-b border-border-strong" style={{ backgroundColor: s.color }} />
            <div className="flex items-start justify-between gap-3 p-4">
              <div>
                <Text size="base" weight="semibold" color="foreground">
                  {name}
                </Text>
                <Text size="md" color="muted" className="mt-0.5">
                  {role}
                </Text>
              </div>
              <div className="text-right">
                <Text family="mono" size="sm" color="foreground">
                  {s.color.toUpperCase()}
                </Text>
                {ratio && (
                  <Text family="mono" size="sm" color="muted" className="mt-0.5">
                    {ratio.toFixed(1)}:1 {ratio >= 4.5 ? 'AA' : ratio >= 3 ? large : ''}
                  </Text>
                )}
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
