import { cx } from './utils'

/**
 * The state of a piece of work, always in the same small vocabulary:
 * lit (live), open (being made), plain (made, not live), draft (planned —
 * drawn in the support color, like a blueprint).
 */
export type StatusTone = 'lit' | 'open' | 'plain' | 'draft'

const DOT: Record<StatusTone, string> = {
  lit: 'bg-primary',
  open: 'border border-primary',
  plain: 'border border-foreground',
  draft: 'border border-dashed border-support',
}

export function StatusTag({ tone, children, className }: { tone: StatusTone; children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-2 whitespace-nowrap rounded-xs border border-border-strong px-2 py-1 font-mono text-xs leading-none',
        tone === 'draft' ? 'text-support' : 'text-foreground',
        className
      )}
    >
      <span aria-hidden className={cx('h-2 w-2 rounded-pill', DOT[tone])} />
      {children}
    </span>
  )
}
