import type { Locale } from '@/lib/portfolio-locale'
import {
  IdentityColor,
  IdentityConcept,
  IdentityElements,
  IdentityHero,
  IdentityMark,
  IdentityType,
  IdentityVoice,
} from './identity-sections'

/** /identity and /en/identity. */
export function IdentityView({ locale }: { locale: Locale }) {
  return (
    <>
      <IdentityHero locale={locale} />
      <IdentityConcept locale={locale} />
      <IdentityMark locale={locale} />
      <IdentityColor locale={locale} />
      <IdentityType locale={locale} />
      <IdentityElements locale={locale} />
      <IdentityVoice locale={locale} />
    </>
  )
}
