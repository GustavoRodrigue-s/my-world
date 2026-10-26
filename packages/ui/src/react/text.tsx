import { cva, type VariantProps } from 'class-variance-authority'
import { cx } from './utils'

// size is a step of the type scale (or the `lead` role); leading and weight
// are the tokens' names.
const textVariants = cva('', {
  variants: {
    family: {
      sans:  'font-sans',
      mono:  'font-mono',
      serif: 'font-serif',
    },
    size: {
      '2xs': 'text-2xs',
      xs:    'text-xs',
      sm:    'text-sm',
      md:    'text-md',
      base:  'text-base',
      lg:    'text-lg',
      xl:    'text-xl',
      lead:  'text-lead',
    },
    weight: {
      light:    'font-light',
      regular:  'font-regular',
      medium:   'font-medium',
      semibold: 'font-semibold',
      bold:     'font-bold',
    },
    color: {
      foreground:      'text-foreground',
      muted:           'text-foreground-muted',
      subtle:          'text-foreground-subtle',
      primary:         'text-primary',
      'primary-hover': 'text-primary-hover',
      support:         'text-support',
    },
    leading: {
      none:    'leading-none',
      tight:   'leading-tight',
      snug:    'leading-snug',
      normal:  'leading-normal',
      relaxed: 'leading-relaxed',
      loose:   'leading-loose',
    },
  },
  defaultVariants: {
    family: 'sans',
    size: 'base',
    color: 'muted',
    leading: 'relaxed',
  },
})

type TextTag = 'p' | 'span' | 'div' | 'li' | 'label' | 'dd' | 'dt' | 'small' | 'footer' | 'cite' | 'figcaption'

interface TextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof textVariants> {
  as?: TextTag
}

export function Text({ as: Tag = 'p', family, size, weight, color, leading, className, ...props }: TextProps) {
  return (
    <Tag
      className={cx(textVariants({ family, size, weight, color, leading }), className)}
      {...props}
    />
  )
}
