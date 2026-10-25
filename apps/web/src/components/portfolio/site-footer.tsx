import { SiteFooter as Footer } from '@/components/ui'
import { getContent, type Locale } from '@/lib/portfolio-content'
import { localePath } from '@/lib/portfolio-locale'
import { canEnter, isUnderConstruction } from '@/lib/world'

export function SiteFooter({ locale }: { locale: Locale }) {
  const { profile, shell } = getContent(locale)
  const t = shell.footer
  return (
    <Footer
      name={profile.name}
      text={profile.purpose}
      columns={[
        {
          title: t.world,
          links: [
            { label: t.portfolio, href: localePath(locale, '/portfolio') },
            { label: t.resume, href: localePath(locale, '/portfolio/resume') },
            { label: t.identity, href: localePath(locale, '/identity') },
          ],
        },
        {
          title: t.landscapes,
          // The Capela is Portuguese-only — and, while it is being built, listed but closed.
          links: [
            {
              label: 'Capela',
              href: '/chapel',
              hrefLang: 'pt-BR',
              mark: { variant: 'star' },
              tag: isUnderConstruction('chapel') ? { tone: 'open', label: t.building } : undefined,
              disabled: !canEnter('chapel'),
            },
          ],
        },
        {
          title: t.contact,
          links: [
            { label: t.email, href: `mailto:${profile.email}`, external: true },
            { label: 'LinkedIn', href: profile.linkedin, external: true, rel: 'me noopener' },
            { label: 'GitHub', href: profile.github, external: true, rel: 'me noopener' },
          ],
        },
      ]}
      notes={[`© ${new Date().getFullYear()} ${profile.name}`, `${profile.motto} ${t.inCity} · ${profile.coordinates}`]}
      verse={profile.duality}
    />
  )
}
