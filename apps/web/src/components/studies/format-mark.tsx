import type { StudyFormat } from '@my-world/types'
import { StrokeMark } from '@/components/ui'

/** A study's format as its finish (ADR 0015): an article is ink, a note is pencil. */
export function FormatMark({ format, className }: { format: StudyFormat; className?: string }) {
  return <StrokeMark finish={format === 'article' ? 'ink' : 'pencil'} className={className} />
}
