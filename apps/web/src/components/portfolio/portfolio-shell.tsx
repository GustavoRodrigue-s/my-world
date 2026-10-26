import { SiteShell, WorldBar } from '@/components/ui'
import { identityFonts } from '@/lib/fonts'
import { getContent } from '@/lib/portfolio-content'
import { LOCALE_META, localePath, type Locale } from '@/lib/portfolio-locale'
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
      header={
        <>
          {/* The way back to the world's home (Portuguese only for now). */}
          <WorldBar
            label={shell.worldBar.label}
            home={{ label: shell.worldBar.home, href: '/', hrefLang: locale === 'pt' ? undefined : 'pt-BR' }}
            crumbs={[
              { label: shell.footer.portfolio, href: localePath(locale, '/portfolio') },
              { label: shell.footer.resume, href: localePath(locale, '/portfolio/resume') },
              { label: shell.footer.identity, href: localePath(locale, '/identity') },
            ]}
          />
          <SiteHeader locale={locale} />
        </>
      }
      footer={<SiteFooter locale={locale} />}
    >
      {children}
    </SiteShell>
  )
}
