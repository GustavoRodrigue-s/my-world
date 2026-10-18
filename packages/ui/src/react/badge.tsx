import { cx } from './utils'

interface BadgeProps {
  children: React.ReactNode
  className?: string
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1',
        'text-[10px] font-bold tracking-[0.1em] uppercase',
        'px-3 py-[3px] rounded-pill',
        'bg-surface-alt-1 text-muted border border-border',
        'hover:bg-accent-pale hover:border-accent-border hover:text-foreground',
        className
      )}
    >
      {children}
    </span>
  )
}
