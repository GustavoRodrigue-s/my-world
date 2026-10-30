import { cx } from './utils'

interface MotionToggleProps {
  running: boolean
  onToggle: () => void
  labels: { pause: string; play: string }
  className?: string
}

/** The pause of a page's protagonist animation: a small mono button with its state drawn. */
export function MotionToggle({ running, onToggle, labels, className }: MotionToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={!running}
      className={cx(
        'inline-flex cursor-pointer items-center gap-2 rounded-xs border border-border-strong bg-surface-glass px-3 py-2 font-mono text-xs text-foreground transition-colors duration-fast hover:border-foreground',
        className
      )}
    >
      <svg viewBox="0 0 10 10" aria-hidden className="size-icon-2xs fill-current">
        {running ? <path d="M1.5 1h2.4v8H1.5zM6.1 1h2.4v8H6.1z" /> : <path d="M2 1l7 4-7 4z" />}
      </svg>
      {running ? labels.pause : labels.play}
    </button>
  )
}
