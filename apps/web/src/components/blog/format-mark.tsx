import type { PostFormat } from '@my-world/types'
import { StrokeMark } from '@/components/ui'

/** A post's format as its finish (ADR 0015): an article is ink, a note is pencil. */
export function FormatMark({ format, className }: { format: PostFormat; className?: string }) {
  return <StrokeMark finish={format === 'article' ? 'ink' : 'pencil'} className={className} />
}
