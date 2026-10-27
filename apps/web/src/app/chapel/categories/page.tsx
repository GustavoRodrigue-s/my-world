import type { Metadata } from 'next'
import { CrossPattee, Heading, PageIntro, Text, TileGrid } from '@/components/ui'
import { PageBody } from '@/components/chapel'
import { CHAPEL, chapelPath } from '@/lib/chapel-content'
import { MOCK_CATEGORIES } from '@/lib/mock-data'

export const metadata: Metadata = {
  title: 'Categorias',
  description: CHAPEL.categories.intro,
  alternates: { canonical: chapelPath('/categories') },
}

export default function CategoriesPage() {
  const t = CHAPEL.categories
  return (
    <>
      <PageIntro labelledBy="categories-title"
        ornament={<CrossPattee size={16} />} label={`${t.label} · ${CHAPEL.themeCount(MOCK_CATEGORIES.length)}`}>
        <Heading as="h1" id="categories-title" level="display-serif" className="max-w-2xl">
          {t.title}
        </Heading>
        <Text size="lead" color="muted" leading="relaxed" className="mt-6 max-w-3xl">
          {t.intro}
        </Text>
      </PageIntro>
      <PageBody>
        <TileGrid
          gilded
          topics={MOCK_CATEGORIES.map((c) => ({
            href: chapelPath('/categories', c.slug),
            name: c.name,
            description: c.description ?? undefined,
            count: c.articleCount ? CHAPEL.studyCount(c.articleCount) : undefined,
          }))}
        />
      </PageBody>
    </>
  )
}
