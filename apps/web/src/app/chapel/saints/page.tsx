import type { Metadata } from 'next'
import { CrossPattee, EntryList, Heading, PageIntro, Text } from '@/components/ui'
import { PageBody, studyEntry } from '@/components/chapel'
import { CHAPEL, chapelPath } from '@/lib/chapel-content'
import { MOCK_ARTICLES } from '@/lib/mock-data'

export const metadata: Metadata = {
  title: 'Santos',
  description: CHAPEL.saints.intro,
  alternates: { canonical: chapelPath('/saints') },
}

export default function SaintsPage() {
  const t = CHAPEL.saints
  const studies = MOCK_ARTICLES.filter((a) => a.category?.slug === 'santos')
  return (
    <>
      <PageIntro labelledBy="saints-title"
        ornament={<CrossPattee size="md" />} label={`${t.label} · ${CHAPEL.studyCount(studies.length)}`}>
        <Heading as="h1" id="saints-title" level="display-serif" className="max-w-2xl">
          {t.title}
        </Heading>
        <Text size="lead" color="muted" leading="relaxed" className="mt-6 max-w-3xl">
          {t.intro}
        </Text>
      </PageIntro>
      <PageBody>
        {studies.length > 0 ? (
          <EntryList items={studies.map(studyEntry)} />
        ) : (
          <Text size="lg" color="muted" className="py-10 text-center">
            {t.empty}
          </Text>
        )}
      </PageBody>
    </>
  )
}
