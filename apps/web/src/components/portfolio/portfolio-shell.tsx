import { Bricolage_Grotesque, IBM_Plex_Mono } from 'next/font/google'
import { cx } from '@/components/ui'
import { cormorant } from '@/lib/fonts'
import { getContent } from '@/lib/portfolio-content'
import { LOCALE_META, type Locale } from '@/lib/portfolio-locale'
import { SiteFooter } from './site-footer'
import { SiteHeader } from './site-header'

// "Bricolage" is French for tinkering at the workbench — the workshop's voice.
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  axes: ['opsz'],
})

// The annotation hand: captions, rubrics, specs.
const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500'],
})

/**
 * The "Mundo do Gustavo" environment, in one language. Theme vars apply through
 * `:root:has([data-env="portfolio"])` (see packages/ui/src/css/themes/portfolio.css);
 * the font variables are re-declared on this wrapper so they win over any
 * inherited value from another environment. The root <html> is shared with the
 * Capela (pt-BR), so the wrapper carries the edition's language.
 */
export function PortfolioShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const { shell } = getContent(locale)
  return (
    <div
      data-env="portfolio"
      lang={LOCALE_META[locale].htmlLang}
      className={cx(
        bricolage.variable,
        plexMono.variable,
        cormorant.variable,
        'flex min-h-dvh flex-col bg-surface font-sans text-foreground'
      )}
    >
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[var(--z-toast)] focus:bg-foreground focus:px-4 focus:py-2 focus:text-surface"
      >
        {shell.skipLink}
      </a>
      <SiteHeader locale={locale} />
      <main id="content" className="flex-1">
        {children}
      </main>
      <SiteFooter locale={locale} />
    </div>
  )
}
