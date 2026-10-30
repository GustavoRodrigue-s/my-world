import { cva, type VariantProps } from 'class-variance-authority'
import { cx } from './utils'

const sectionVariants = cva('px-gutter md:px-gutter-wide py-block md:py-block-wide', {
  variants: {
    bg: {
      surface: 'bg-surface',
      muted:   'bg-surface-muted',
      raised:  'bg-surface-raised',
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
