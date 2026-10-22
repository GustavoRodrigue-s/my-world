import type { Route } from 'next'
import type { Language } from '@my-world/ui'

// The portfolio environment ships in two languages. Portuguese lives at the
// bare routes (/portfolio, /portfolio/resume, /identity); English mirrors
// them under /en. Kept free of copy so client components can import it
// without pulling the content into the bundle.

export type Locale = 'pt' | 'en'

export const LOCALES: readonly Locale[] = ['pt', 'en']

interface LocaleMeta {
  htmlLang: string
  ogLocale: string
  short: string
  name: string
  /** Path prefix of the edition. */
  prefix: '' | '/en'
  /** Accessible name of the link to this edition, in its own language. */
  switchTo: string
}

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  pt: { htmlLang: 'pt-BR', ogLocale: 'pt_BR', short: 'PT', name: 'Português', prefix: '', switchTo: 'Ler em português' },
  en: { htmlLang: 'en', ogLocale: 'en_US', short: 'EN', name: 'English', prefix: '/en', switchTo: 'Read in English' },
}

/** The editions, as the shared <LanguageSwitch> takes them. */
export const PORTFOLIO_LANGUAGES: Language[] = LOCALES.map((code) => ({ code, ...LOCALE_META[code] }))

export type PortfolioPath = '/portfolio' | '/portfolio/resume' | '/identity'

/** `/portfolio` → `/en/portfolio` for English; unchanged for Portuguese. Accepts a `#hash` suffix. */
export function localePath(locale: Locale, path: `${PortfolioPath}${'' | `#${string}`}`): Route {
  return `${LOCALE_META[locale].prefix}${path}` as Route
}
