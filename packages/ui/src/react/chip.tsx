import { cx } from './utils'

type ChipVariant = 'line' | 'stone'

interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Selected state (a filter that is on). */
  pressed?: boolean
  /** `line` (default): hairline outline. `stone`: a flat stone fill (Capela). Both turn solid ink when on. */
  variant?: ChipVariant
}

/** Chip styling for elements that must be links (a study's subjects), so they match `<Chip>`. */
export function chipClasses({ pressed = false, variant = 'line' }: { pressed?: boolean; variant?: ChipVariant } = {}) {
  return cx(
    'inline-flex h-8 cursor-pointer items-center whitespace-nowrap rounded-xs border px-3 font-mono text-xs no-underline transition-colors duration-fast',
    pressed
      ? 'border-foreground bg-foreground text-surface'
      : variant === 'stone'
        ? 'border-transparent bg-surface-muted text-foreground hover:border-foreground'
        : 'border-border-strong bg-transparent text-foreground hover:border-foreground'
  )
}

/** A small toggle for filters: near-square, mono, ink when on. */
export function Chip({ pressed = false, variant = 'line', className, children, ...props }: ChipProps) {
  return (
    <button type="button" aria-pressed={pressed} className={cx(chipClasses({ pressed, variant }), className)} {...props}>
      {children}
    </button>
  )
}
