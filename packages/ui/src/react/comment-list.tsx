import { Text } from './text'
import { cx } from './utils'

export interface CommentEntry {
  id: string
  author: string
  /** Already formatted for the reader. */
  date: string
  /** Plain text; blank lines separate paragraphs. */
  body: string
}

interface CommentListProps {
  comments: CommentEntry[]
  /** Shown when there are no comments. */
  empty: string
  className?: string
}

/** Readers' comments, oldest first: name and date in the margin of each, hairlines between them. */
export function CommentList({ comments, empty, className }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <Text color="muted" className={className}>
        {empty}
      </Text>
    )
  }
  return (
    <ol className={cx('list-none border-t border-border', className)}>
      {comments.map((c) => (
        <li key={c.id} className="flex flex-col gap-3 border-b border-border py-6">
          <div className="flex flex-wrap items-baseline gap-x-3">
            <Text as="span" weight="semibold" color="foreground" leading="snug">
              {c.author}
            </Text>
            <Text as="span" family="mono" size="xs" color="muted">
              {c.date}
            </Text>
          </div>
          {c.body.split(/\n\s*\n/).map((p, i) => (
            <Text key={i} color="foreground" leading="relaxed" className="max-w-measure">
              {p}
            </Text>
          ))}
        </li>
      ))}
    </ol>
  )
}
