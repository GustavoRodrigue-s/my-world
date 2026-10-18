import type { Route } from 'next'

// The portfolio environment ships in two languages. Portuguese lives at the
// bare routes (/portfolio, /portfolio/resume, /identity); English mirrors
// them under /en. Kept free of copy so client components can import it
// without pulling the content into the bundle.

export type Locale = 'pt' | 'en'

export const LOCALES: readonly Locale[] = ['pt', 'en']

export const LOCALE_META: Record<Locale, { htmlLang: string; ogLocale: string; short: string; name: string }> = {
  pt: { htmlLang: 'pt-BR', ogLocale: 'pt_BR', short: 'PT', name: 'Português' },
  en: { htmlLang: 'en', ogLocale: 'en_US', short: 'EN', name: 'English' },
}

export type PortfolioPath = '/portfolio' | '/portfolio/resume' | '/identity'

const EN_PREFIX = '/en'

/** `/portfolio` → `/en/portfolio` for English; unchanged for Portuguese. Accepts a `#hash` suffix. */
export function localePath(locale: Locale, path: `${PortfolioPath}${'' | `#${string}`}`): Route {
  return (locale === 'en' ? `${EN_PREFIX}${path}` : path) as Route
}

/** The same page in the other language, from the current pathname. */
export function switchLocalePath(pathname: string, to: Locale): Route {
  const bare = pathname === EN_PREFIX || pathname.startsWith(`${EN_PREFIX}/`) ? pathname.slice(EN_PREFIX.length) || '/portfolio' : pathname
  return (to === 'en' ? `${EN_PREFIX}${bare}` : bare) as Route
}
