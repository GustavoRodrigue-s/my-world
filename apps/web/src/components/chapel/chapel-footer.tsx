import { SiteFooter } from '@/components/ui'
import { CHAPEL, chapelPath } from '@/lib/chapel-content'
import { MOCK_CATEGORIES } from '@/lib/mock-data'
import { STUDIES, studiesPath } from '@/lib/studies-content'
import { canEnter, isUnderConstruction } from '@/lib/world'

export function ChapelFooter() {
  const { shell } = CHAPEL
  return (
    <SiteFooter
      name={CHAPEL.name}
      mark={{ variant: 'star', tone: 'accent' }}
      text={CHAPEL.purpose}
      columns={[
        { title: shell.footer.chapel, links: shell.nav.map((n) => ({ label: n.label, href: chapelPath(n.path) })) },
        { title: shell.footer.themes, links: MOCK_CATEGORIES.map((c) => ({ label: c.name, href: chapelPath('/categories', c.slug) })) },
        {
          title: shell.footer.landscapes,
          links: [
            { label: shell.footer.world, href: '/', mark: { variant: 'satellite' } },
            { label: shell.footer.portfolio, href: '/portfolio' },
            {
              label: STUDIES.name,
              href: studiesPath(),
              mark: { variant: 'seed' },
              tag: isUnderConstruction('studies') ? { tone: 'open', label: STUDIES.construction.status } : undefined,
              disabled: !canEnter('studies'),
            },
          ],
        },
      ]}
      notes={[`© ${new Date().getFullYear()} ${CHAPEL.author}`, ...shell.footer.notes]}
      verse={CHAPEL.motto}
    />
  )
}
