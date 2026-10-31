import { SiteShell, WorldBar } from '@/components/ui'
import { identityFonts } from '@/lib/fonts'
import { getContent } from '@/lib/portfolio-content'
import { LOCALE_META, localePath, type Locale } from '@/lib/portfolio-locale'
import { SiteHeader } from './site-header'
import { WorldFooter } from '@/components/world/world-footer'
import { WORLD_FOOTER } from '@/lib/world-footer-content'

/** The "Mundo do Gustavo" environment, in one language. */
export function PortfolioShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const { shell } = getContent(locale)
  const footer = WORLD_FOOTER[locale]
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
              { label: footer.places.portfolio, href: localePath(locale, '/portfolio') },
              { label: footer.links.resume, href: localePath(locale, '/portfolio/resume') },
              { label: footer.links.identity, href: localePath(locale, '/identity') },
            ]}
          />
          <SiteHeader locale={locale} />
        </>
      }
      footer={<WorldFooter locale={locale} />}
    >
      {children}
    </SiteShell>
  )
}
