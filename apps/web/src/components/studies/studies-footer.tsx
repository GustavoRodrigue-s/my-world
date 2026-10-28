import { SiteFooter } from '@/components/ui'
import { CHAPEL } from '@/lib/chapel-content'
import { STUDIES, STUDY_THEMES, studiesPath } from '@/lib/studies-content'
import { canEnter, isUnderConstruction } from '@/lib/world'

export function StudiesFooter() {
  const { shell } = STUDIES
  return (
    <SiteFooter
      name={STUDIES.name}
      mark={{ variant: 'seed', tone: 'accent' }}
      text={STUDIES.purpose}
      columns={[
        {
          title: shell.footer.themes,
          links: STUDY_THEMES.map((t) => ({ label: STUDIES.themes[t].name, href: `${studiesPath()}?theme=${t}` })),
        },
        {
          title: shell.footer.landscapes,
          links: [
            { label: shell.footer.world, href: '/', mark: { variant: 'satellite' } },
            { label: shell.footer.portfolio, href: '/portfolio' },
            {
              label: CHAPEL.name,
              href: '/chapel',
              mark: { variant: 'star' },
              tag: isUnderConstruction('chapel') ? { tone: 'open', label: CHAPEL.construction.status } : undefined,
              disabled: !canEnter('chapel'),
            },
          ],
        },
      ]}
      notes={[`© ${new Date().getFullYear()} ${STUDIES.author}`]}
    />
  )
}
