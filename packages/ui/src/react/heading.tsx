import { cva, type VariantProps } from 'class-variance-authority'
import { cx } from './utils'

// Each level carries its own family and tracking. `tracking-tight` used to sit
// in the base; it now lives in the catholic levels (where it already won over
// any arbitrary tracking), so the portfolio levels can set their own.
const headingVariants = cva('', {
  variants: {
    level: {
      // Capela de Estudos — serif, light, calm
      display: 'tracking-tight font-serif text-[clamp(32px,5vw,52px)] font-light leading-[1.2]',
      h1:      'tracking-tight font-serif text-[clamp(28px,4vw,44px)] font-light leading-[1.25]',
      h2:      'tracking-tight font-serif text-[28px] font-normal leading-snug tracking-[0.01em]',
      h3:      'tracking-tight font-serif text-[22px] font-medium leading-snug',
      h4:      'tracking-tight font-serif text-[18px] font-medium leading-snug',
      // Mundo do Gustavo — grotesk, dense, tight
      statement: 'font-sans text-[clamp(42px,6.6vw,88px)] font-semibold leading-[0.96] tracking-[-0.042em]',
      title:     'font-sans text-[clamp(32px,4.2vw,54px)] font-semibold leading-[1.02] tracking-[-0.034em]',
      subtitle:  'font-sans text-[clamp(22px,2.2vw,28px)] font-semibold leading-[1.12] tracking-[-0.022em]',
      item:      'font-sans text-[19px] font-semibold leading-[1.25] tracking-[-0.014em]',
    },
    color: {
      // "primary" historically meant "the main ink color" — it must stay
      // mode-aware (text-foreground), NOT the brand-locked chrome color
      // (text-primary), which never changes between light/dark mode.
      default:   'text-foreground',
      primary:   'text-foreground',
      'on-dark': 'text-on-primary',
      accent:    'text-accent',
      muted:     'text-muted',
      // Legacy aliases
      gold:      'text-accent',
      'text-base': 'text-foreground',
    },
  },
  defaultVariants: {
    level: 'h2',
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
