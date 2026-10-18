import { cva, type VariantProps } from 'class-variance-authority'
import { cx } from './utils'

const sectionVariants = cva('px-[var(--spacing-section-x)] py-[var(--spacing-section-y)]', {
  variants: {
    bg: {
      surface:  'bg-surface',
      'alt-1':  'bg-surface-alt-1',
      'alt-2':  'bg-surface-alt-2',
      brand:    'bg-primary',
      // Legacy aliases kept for backward compatibility
      white:    'bg-surface',
      cream:    'bg-surface-alt-1',
      tan:      'bg-surface-alt-2',
      navy:     'bg-primary',
      alt:      'bg-surface-alt-1',
    },
  },
  defaultVariants: { bg: 'surface' },
})

interface SectionProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof sectionVariants> {}

export function Section({ bg, className, children, ...props }: SectionProps) {
  return (
    <section className={cx(sectionVariants({ bg }), className)} {...props}>
      <div className="section-inner">{children}</div>
    </section>
  )
}

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  action?: React.ReactNode
}

export function SectionHeader({ action, className, children, ...props }: SectionHeaderProps) {
  return (
    <div
      className={cx(
        'flex items-baseline justify-between border-b border-border pb-4 mb-8',
        className
      )}
      {...props}
    >
      {children}
      {action && <div>{action}</div>}
    </div>
  )
}
