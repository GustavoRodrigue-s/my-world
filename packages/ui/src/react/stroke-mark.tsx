import { cx } from './utils'

interface StrokeMarkProps {
  /** `ink`: solid, in ink — finished. `pencil`: dashed, in the support color (graphite in Estudos) — still in progress. */
  finish: 'ink' | 'pencil'
  className?: string
}

/**
 * The finish of a piece of writing, drawn as one short stroke of the hand
 * (Estudos' format mark, ADR 0015). Decorative: the format's name always sits
 * beside it.
 */
export function StrokeMark({ finish, className }: StrokeMarkProps) {
  const ink = finish === 'ink'
  return (
    <svg aria-hidden viewBox="0 0 20 8" fill="none" className={cx('h-2 w-5 shrink-0 overflow-visible', className)}>
      <path
        d="M1 5.5C6 2 11 2.2 19 3.6"
        strokeLinecap="round"
        strokeWidth={ink ? 2 : 1.5}
        strokeDasharray={ink ? undefined : '2.5 2.5'}
        className={ink ? 'stroke-foreground' : 'stroke-support'}
      />
    </svg>
  )
}
