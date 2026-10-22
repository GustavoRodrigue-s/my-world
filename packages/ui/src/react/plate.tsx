import { Rubric } from './rubric'
import { Text } from './text'
import { cx } from './utils'

interface PlateProps {
  /** Id of the heading inside `children` that names the plate. */
  labelledBy: string
  /** Rubric line, e.g. "prancha i · o mundo do gustavo". */
  rubric: React.ReactNode
  /** Small mono note at the top right (coordinates, revision…). */
  corner?: React.ReactNode
  /** The text column: byline, statement (h1), lead, actions. */
  children: React.ReactNode
  /** The plate's figure (right column on wide screens). */
  figure?: React.ReactNode
  /** Under the plate: usually a <TitleBlock>. */
  footer?: React.ReactNode
  className?: string
}

/**
 * A page's opening plate, like the first plate of a technical drawing set:
 * rubric bar, the statement on the left, a figure on the right, a title block
 * at the foot. First-frame content — nothing here is plotted on scroll.
 */
export function Plate({ labelledBy, rubric, corner, children, figure, footer, className }: PlateProps) {
  return (
    <section aria-labelledby={labelledBy} className={cx('px-[var(--spacing-section-x)] pt-10 pb-16 md:pt-14 md:pb-20', className)}>
      <div className="section-inner">
        <div className="flex items-baseline justify-between gap-6 border-b border-border pb-4">
          <Rubric index="00">{rubric}</Rubric>
          {corner && (
            <Text family="mono" size="sm" color="muted" className="hidden sm:block">
              {corner}
            </Text>
          )}
        </div>

        <div
          className={cx(
            'grid items-center gap-x-12 gap-y-10 pt-10 md:pt-12',
            figure ? 'lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]' : undefined
          )}
        >
          {/* Text is the page's largest paint; the figure is decoration on top of it. */}
          <div>{children}</div>
          {figure}
        </div>

        {footer && <div className="mt-14 md:mt-20">{footer}</div>}
      </div>
    </section>
  )
}
