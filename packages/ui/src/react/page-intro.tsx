import { cva, type VariantProps } from 'class-variance-authority'
import { Eyebrow } from './eyebrow'
import { cx } from './utils'

const pageIntroVariants = cva('section-inner flex flex-col', {
  variants: {
    align: {
      // The axis of a nave: everything on the center line, lines evened out (no orphans).
      center: 'items-center text-center text-balance',
      start: 'items-start',
    },
  },
  defaultVariants: { align: 'center' },
})

interface PageIntroProps extends VariantProps<typeof pageIntroVariants> {
  /** Id of the heading inside `children` that names the page. */
  labelledBy: string
  /** A small ornament over the label (a <CrossPattee>, a <RoseWindow>…). */
  ornament?: React.ReactNode
  /** Small red label over the statement (the environment, a theme…). */
  label?: React.ReactNode
  /** The statement (h1) and its lead. Size them with max-w on each. */
  children: React.ReactNode
  /** Links styled as buttons. */
  actions?: React.ReactNode
  /** Under the actions: a <Byline>, a meta line… */
  footer?: React.ReactNode
  className?: string
}

/**
 * A page's flat opening (the Capela's plate): label, statement, lead, actions.
 * No rules, no figure, no title block — whitespace does the framing.
 * First-frame content: the h1 stays the page's largest paint.
 */
export function PageIntro({ labelledBy, ornament, label, children, actions, footer, align, className }: PageIntroProps) {
  const centered = align !== 'start'
  return (
    <section aria-labelledby={labelledBy} className={cx('px-gutter md:px-gutter-wide pt-16 pb-16 md:pt-24 md:pb-24', className)}>
      <div className={pageIntroVariants({ align })}>
        {ornament && <div className="mb-5">{ornament}</div>}
        {label && (
          <Eyebrow as="div" className="mb-6">
            {label}
          </Eyebrow>
        )}
        {children}
        {actions && (
          <div className={cx('mt-10 flex flex-wrap items-center gap-x-7 gap-y-4', centered && 'justify-center')}>{actions}</div>
        )}
        {footer && <div className="mt-12">{footer}</div>}
      </div>
    </section>
  )
}
