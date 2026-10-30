import { Byline } from '@/components/ui'
import { PORTRAIT_SRC } from '@/lib/portfolio-content'
import { STUDIES } from '@/lib/studies-content'

const portrait = PORTRAIT_SRC ? { src: PORTRAIT_SRC, alt: `Retrato de ${STUDIES.author}` } : undefined

/**
 * The author's signature on a study: face and name, with the dates under the
 * title, or the byline line at the end of the text (ADR 0019).
 */
export function StudyByline({ role }: { role: string }) {
  return <Byline plain name={STUDIES.author} role={role} portrait={portrait} />
}
