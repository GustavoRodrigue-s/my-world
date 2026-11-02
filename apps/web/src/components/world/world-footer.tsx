import { SiteFooter, type FooterLink } from '@/components/ui'
import { CHAPEL } from '@/lib/chapel-content'
import { IDENTITY, type Locale } from '@/lib/portfolio-content'
import { localePath } from '@/lib/portfolio-locale'
import { SPACES, canEnter, type SpaceId } from '@/lib/world'
import { PLACE_ORDER } from '@/lib/world-content'
import { WORLD_FOOTER } from '@/lib/world-footer-content'

const MARK = { portfolio: 'satellite', projects: 'artifact', blog: 'seed', chapel: 'star' } as const

/** The one footer of every space (ADR 0022). Inside the open Capela the veil is lifted: it goes by its name (ADR 0022). */
export function WorldFooter({ locale, insideChapel = false }: { locale: Locale; insideChapel?: boolean }) {
  const t = WORLD_FOOTER[locale]
  // What exists only in Portuguese says so to the browser when linked from another edition.
  const portugueseOnly = locale === 'pt' ? undefined : 'pt-BR'

  const href: Record<SpaceId, string> = {
    portfolio: localePath(locale, '/portfolio'),
    projects: '/',
    blog: '/blog',
    chapel: '/chapel',
  }

  const places: FooterLink[] = PLACE_ORDER.map((id) => {
    const status = SPACES[id].status
    return {
      label: id === 'chapel' && insideChapel ? CHAPEL.name : t.places[id],
      href: href[id],
      hrefLang: id === 'portfolio' ? undefined : portugueseOnly,
      mark: { variant: MARK[id] },
      tag: status === 'open' ? undefined : { tone: status === 'building' ? 'open' : 'draft', label: t.states[status] },
      disabled: !canEnter(id),
    }
  })

  return (
    <SiteFooter
      name={t.name}
      text={t.text}
      columns={[
        { title: t.columns.places, links: places },
        {
          title: t.columns.world,
          links: [
            { label: t.links.home, href: '/', hrefLang: portugueseOnly },
            { label: t.links.resume, href: localePath(locale, '/portfolio/resume') },
            { label: t.links.identity, href: localePath(locale, '/identity') },
          ],
        },
        {
          title: t.columns.contact,
          links: [
            { label: t.links.email, href: `mailto:${IDENTITY.email}`, external: true },
            { label: 'LinkedIn', href: IDENTITY.linkedin, external: true, rel: 'me noopener' },
            { label: 'GitHub', href: IDENTITY.github, external: true, rel: 'me noopener' },
          ],
        },
      ]}
      notes={[`© ${new Date().getFullYear()} ${IDENTITY.name}`]}
      verse={t.verse}
    />
  )
}
