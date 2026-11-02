import { DayNightToggle, SearchDialog, SiteHeader } from '@/components/ui'
import { BLOG, blogPath } from '@/lib/blog-content'

export function BlogHeader() {
  const { shell } = BLOG
  return (
    <SiteHeader
      homeHref={blogPath()}
      name={BLOG.name}
      sub={shell.brandSub}
      // The Blog's mark: the satellite is a seed, in the rubric red.
      mark={{ variant: 'seed', tone: 'accent' }}
      actions={
        <>
          <SearchDialog labels={shell.search} endpoint="/api/search?space=posts" />
          <DayNightToggle labels={shell.dayNight} />
        </>
      }
    />
  )
}
