import { DayNightToggle, PageNav, SiteHeader } from '@/components/ui'
import { CHAPEL, chapelPath } from '@/lib/chapel-content'
import { ChapelSearch } from './chapel-search'

export function ChapelHeader() {
  const { shell } = CHAPEL
  return (
    <SiteHeader
      homeHref={chapelPath('')}
      name={CHAPEL.name}
      sub={shell.brandSub}
      // The Capela's mark: the satellite is a star, in the rubric red — it turns to gold as it orbits on hover.
      mark={{ variant: 'star', tone: 'accent', reveal: true }}
      surface="solid"
      nav={
        <PageNav
          variant="stone"
          label={shell.navLabel}
          menuLabel={shell.menu}
          items={shell.nav.map((n) => ({ label: n.label, href: chapelPath(n.path), exact: n.exact }))}
        />
      }
      actions={
        <>
          <ChapelSearch labels={shell.search} studyHref={chapelPath('/articles')} />
          <DayNightToggle labels={shell.dayNight} variant="stone" />
        </>
      }
    />
  )
}
