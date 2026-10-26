import { SiteFooter } from '@/components/ui'
import { CHAPEL, chapelPath } from '@/lib/chapel-content'
import { MOCK_CATEGORIES } from '@/lib/mock-data'

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
          ],
        },
      ]}
      notes={[`© ${new Date().getFullYear()} ${CHAPEL.author}`, ...shell.footer.notes]}
      verse={CHAPEL.motto}
    />
  )
}
