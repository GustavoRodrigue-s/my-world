import type { Metadata } from 'next'
import { CrossPattee, Heading, PageIntro, Text } from '@/components/ui'
import { PageBody, StudyIndex, studyEntry } from '@/components/chapel'
import { CHAPEL, chapelPath } from '@/lib/chapel-content'
import { MOCK_ARTICLES, MOCK_CATEGORIES } from '@/lib/mock-data'

export const metadata: Metadata = {
  title: 'Estudos',
  description: CHAPEL.studies.intro,
  alternates: { canonical: chapelPath('/articles') },
}

export default function StudiesPage() {
  const t = CHAPEL.studies
  return (
    <>
      <PageIntro labelledBy="studies-title"
        ornament={<CrossPattee size={16} />} label={`${t.label} · ${CHAPEL.studyCount(MOCK_ARTICLES.length)}`}>
        <Heading as="h1" id="studies-title" level="display-serif" className="max-w-2xl">
          {t.title}
        </Heading>
        <Text size="lead" color="muted" leading="relaxed" className="mt-6 max-w-3xl">
          {t.intro}
        </Text>
      </PageIntro>
      <PageBody>
        <StudyIndex
          entries={MOCK_ARTICLES.map(studyEntry)}
          categories={MOCK_CATEGORIES.map(({ slug, name }) => ({ slug, name }))}
          labels={t}
        />
      </PageBody>
    </>
  )
}
