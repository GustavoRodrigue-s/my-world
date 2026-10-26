import { cva, type VariantProps } from 'class-variance-authority'
import { cx } from './utils'

// Each level carries its own family and tracking. `tracking-tight` used to sit
// in the base; it now lives in the catholic levels (where it already won over
// any arbitrary tracking), so the portfolio levels can set their own.
// Each level is a typography role from the design tokens (text-<role> sets
// size, line height, tracking and weight together); the family comes with it.
const headingVariants = cva('', {
  variants: {
    level: {
      display:          'font-sans text-display',
      headline:         'font-sans text-headline',
      title:            'font-sans text-title',
      'title-sm':       'font-sans text-title-sm',
      // The serif twins: same roles, set in the voice face (upright).
      'display-serif':  'font-serif text-display-serif',
      'headline-serif': 'font-serif text-headline-serif',
      'title-serif':    'font-serif text-title-serif',
      'title-sm-serif': 'font-serif text-title-sm-serif',
    },
    color: {
      default: 'text-foreground',
      muted:   'text-foreground-muted',
      primary: 'text-primary',
    },
  },
  defaultVariants: {
    level: 'title',
    color: 'default',
  },
})

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'

interface HeadingProps
  extends Omit<React.HTMLAttributes<HTMLHeadingElement>, 'color'>,
    VariantProps<typeof headingVariants> {
  as?: HeadingTag
}

export function Heading({ as: Tag = 'h2', level, color, className, ...props }: HeadingProps) {
  return (
    <Tag
      className={cx(headingVariants({ level, color }), className)}
      {...props}
    />
  )
}
