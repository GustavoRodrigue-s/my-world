import { writeFileSync, mkdirSync } from 'fs'
import { chapelTheme, portfolioTheme } from '@my-world/design-system'
import type { ThemeContract, BrandTokens, ModeTokens } from '@my-world/design-system'

function toKebab(str: string): string {
  return str
    .replace(/([A-Z])/g, (m) => `-${m.toLowerCase()}`)
    .replace(/([a-z])([0-9])/g, '$1-$2')
}

function colorLines(tokens: BrandTokens | ModeTokens, indent = '  '): string[] {
  return Object.entries(tokens).map(([k, v]) => `${indent}--color-${toKebab(k)}: ${v};`)
}

interface ThemeTarget {
  name: string
  theme: ThemeContract
  /** Modes the environment offers. Both ship a day/night toggle today. */
  modes: Array<'light' | 'dark'>
  /**
   * The environment's wrapper. Vars are written on `:root` only while it is
   * mounted (`:root:has(scope)`), so two environments' CSS can both be loaded
   * after a client-side navigation without clashing — and `body`/overscroll
   * still pick up the scoped surface color.
   */
  scope: string
}

/**
 * Scoped variant. The theme choice lives on <html data-theme> (set before
 * paint by the init script in app/layout.tsx); an absent attribute means
 * "follow the OS". Every selector below has specificity (0,2,0) or (0,3,0),
 * so it beats an unscoped `:root` theme left over from another environment.
 */
function scopedThemeToCSS(theme: ThemeContract, modes: Array<'light' | 'dark'>, scope: string): string {
  // Merge so a per-mode override replaces the brand value instead of repeating it.
  const light = colorLines({ ...theme.brand, ...theme.light })
  const dark = colorLines({ ...theme.brand, ...theme.dark })
  const typography = Object.entries(theme.typography).map(([k, v]) => `  --${toKebab(k)}: ${v};`)
  const indent = (l: string) => `  ${l}`

  const lines = [
    '/* GERADO — não editar. Fonte: packages/design-system/src/themes/*.ts */',
    '/* Para atualizar: cd packages/ui && npm run generate:themes */',
    '',
    `/* Applies only while ${scope} is mounted. */`,
    `:root:has(${scope}) {`,
    '  color-scheme: light;',
    ...light,
    ...typography,
    '}',
    '',
  ]

  if (modes.includes('dark')) {
    lines.push(
      `:root[data-theme="dark"]:has(${scope}) {`,
      '  color-scheme: dark;',
      ...dark,
      '}',
      '',
      '/* No explicit choice stored → follow the OS. */',
      '@media (prefers-color-scheme: dark) {',
      `  :root:not([data-theme="light"]):has(${scope}) {`,
      '    color-scheme: dark;',
      ...dark.map(indent),
      '  }',
      '}',
      '',
      '/* Paper is the only mode that prints. Same specificity as the dark rules, declared later. */',
      '@media print {',
      `  :root:root:has(${scope}) {`,
      '    color-scheme: light;',
      ...light.map(indent),
      '  }',
      '}',
      ''
    )
  }

  return lines.join('\n')
}

const outDir = 'src/css/themes'
mkdirSync(outDir, { recursive: true })

const themes: ThemeTarget[] = [
  { name: 'portfolio', theme: portfolioTheme, modes: ['light', 'dark'], scope: '[data-env="portfolio"]' },
  { name: 'chapel',    theme: chapelTheme,    modes: ['light', 'dark'], scope: '[data-env="chapel"]' },
]

for (const { name, theme, modes, scope } of themes) {
  const css = scopedThemeToCSS(theme, modes, scope)
  writeFileSync(`${outDir}/${name}.css`, css)
  console.log(`✓ Gerado: ${outDir}/${name}.css`)
}
