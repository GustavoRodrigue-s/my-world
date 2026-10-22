import { SiteShell } from '@/components/ui'
import { identityFonts } from '@/lib/fonts'
import { getContent } from '@/lib/portfolio-content'
import { LOCALE_META, type Locale } from '@/lib/portfolio-locale'
import { SiteFooter } from './site-footer'
import { SiteHeader } from './site-header'

/** The "Mundo do Gustavo" environment, in one language. */
export function PortfolioShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const { shell } = getContent(locale)
  return (
    <SiteShell
      env="portfolio"
      lang={LOCALE_META[locale].htmlLang}
      className={identityFonts}
      skipLabel={shell.skipLink}
      header={<SiteHeader locale={locale} />}
      footer={<SiteFooter locale={locale} />}
    >
      {children}
    </SiteShell>
  )
}
