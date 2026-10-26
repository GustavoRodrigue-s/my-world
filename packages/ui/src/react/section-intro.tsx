import { Heading } from './heading'
import { Text } from './text'
import { cx } from './utils'

interface SectionIntroProps {
  /** The section's id; the heading gets `${id}-title` (for aria-labelledby). */
  id: string
  /** Literal title. */
  title: React.ReactNode
  /** A short gloss under the title, in the voice face. The metaphor lives here. */
  note?: React.ReactNode
  /** A link at the far end (e.g. "see all"). */
  action?: React.ReactNode
  align?: 'start' | 'center'
  className?: string
}

/**
 * A section's heading in the flat dialect: a serif title, its gloss and an
 * optional action — no rubric number, no margin column.
 */
export function SectionIntro({ id, title, note, action, align = 'start', className }: SectionIntroProps) {
  const centered = align === 'center'
  return (
    <div
      className={cx(
        'mb-10 flex flex-col gap-5 md:mb-14',
        centered ? 'items-center text-center' : 'sm:flex-row sm:items-end sm:justify-between sm:gap-10',
        className
      )}
    >
      <div>
        <Heading as="h2" id={`${id}-title`} level="headline-serif" className="max-w-[20ch]">
          {title}
        </Heading>
        {note && (
          <Text family="serif" size="lead" color="muted" leading="normal" className="mt-2 italic">
            {note}
          </Text>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
