import type { Metadata } from 'next'
import { Emphasis, Heading, PageIntro, Text } from '@/components/ui'
import { StudyIndex, studyEntry } from '@/components/studies'
import { getStudies } from '@/lib/studies'
import { STUDIES, studiesPath } from '@/lib/studies-content'

export const metadata: Metadata = {
  description: STUDIES.meta.description,
  alternates: { canonical: studiesPath() },
}

export default async function StudiesPage() {
  const { index } = STUDIES
  const studies = await getStudies()
  return (
    <>
      <PageIntro labelledBy="studies-title" align="start" label={`${STUDIES.name} · ${index.count(studies.length)}`}>
        <Heading as="h1" id="studies-title" level="display" className="max-w-4xl">
          {index.statement.before} <Emphasis>{index.statement.emphasis}</Emphasis>
          {index.statement.after}
        </Heading>
        <Text size="lead" color="muted" leading="relaxed" className="mt-7 max-w-3xl">
          {index.lead}
        </Text>
      </PageIntro>
      <div className="px-gutter md:px-gutter-wide pb-block md:pb-block-wide">
        <div className="section-inner">
          {studies.length > 0 ? (
            <StudyIndex entries={studies.map(studyEntry)} />
          ) : (
            <Text size="lg" color="muted" className="py-10">
              {index.empty}
            </Text>
          )}
        </div>
      </div>
    </>
  )
}
