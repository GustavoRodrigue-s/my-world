import { DayNightToggle, SearchDialog, SiteHeader } from '@/components/ui'
import { STUDIES, studiesPath } from '@/lib/studies-content'

export function StudiesHeader() {
  const { shell } = STUDIES
  return (
    <SiteHeader
      homeHref={studiesPath()}
      name={STUDIES.name}
      sub={shell.brandSub}
      // Estudos' mark: the satellite is a seed, in the rubric red.
      mark={{ variant: 'seed', tone: 'accent' }}
      actions={
        <>
          <SearchDialog labels={shell.search} endpoint="/api/search?space=studies" />
          <DayNightToggle labels={shell.dayNight} />
        </>
      }
    />
  )
}
