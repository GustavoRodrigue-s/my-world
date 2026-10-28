import { DayNightToggle, PageNav, SearchDialog, SiteHeader } from '@/components/ui'
import { CHAPEL, chapelPath } from '@/lib/chapel-content'

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
          <SearchDialog labels={shell.search} endpoint="/api/search?space=chapel" variant="stone" />
          <DayNightToggle labels={shell.dayNight} variant="stone" />
        </>
      }
    />
  )
}
