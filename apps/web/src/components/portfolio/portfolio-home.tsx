import { buildPersonJsonLd } from '@/lib/generate-metadata'
import type { Locale } from '@/lib/portfolio-locale'
import { SectionAbout } from './section-about'
import { SectionArtifacts } from './section-artifacts'
import { SectionContact } from './section-contact'
import { SectionCredentials } from './section-credentials'
import { SectionHero } from './section-hero'
import { SectionJourney } from './section-journey'
import { SectionServices } from './section-services'
import { SectionTools } from './section-tools'

/** /portfolio and /en/portfolio. */
export function PortfolioHome({ locale }: { locale: Locale }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildPersonJsonLd(locale)) }} />
      <SectionHero locale={locale} />
      <SectionAbout locale={locale} />
      <SectionJourney locale={locale} />
      <SectionArtifacts locale={locale} />
      <SectionTools locale={locale} />
      <SectionCredentials locale={locale} />
      <SectionServices locale={locale} />
      <SectionContact locale={locale} />
    </>
  )
}
