import { cx } from './utils'

interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Selected state (a filter that is on). */
  pressed?: boolean
  /** `line` (default): hairline outline. `stone`: a flat stone fill (Capela). Both turn solid ink when on. */
  variant?: 'line' | 'stone'
}

/** A small toggle for filters: near-square, mono, ink when on. */
export function Chip({ pressed = false, variant = 'line', className, children, ...props }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      className={cx(
        'inline-flex h-8 cursor-pointer items-center whitespace-nowrap rounded-xs border px-3 font-mono text-sm transition-colors duration-fast',
        pressed
          ? 'border-foreground bg-foreground text-surface'
          : variant === 'stone'
            ? 'border-transparent bg-surface-muted text-foreground hover:border-foreground'
            : 'border-border-strong bg-transparent text-foreground hover:border-foreground',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
