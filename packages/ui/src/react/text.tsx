import { cva, type VariantProps } from 'class-variance-authority'
import { cx } from './utils'

const textVariants = cva('', {
  variants: {
    family: {
      sans:  'font-sans',
      mono:  'font-mono',
      serif: 'font-serif',
    },
    size: {
      xs:   'text-[10px]',
      sm:   'text-[11px]',
      md:   'text-[13px]',
      base: 'text-[15px]',
      lg:   'text-[17px]',
      xl:   'text-[clamp(18px,1.6vw,21px)]',
    },
    weight: {
      light:    'font-light',
      normal:   'font-normal',
      medium:   'font-medium',
      semibold: 'font-semibold',
      bold:     'font-bold',
    },
    color: {
      base:              'text-foreground',
      foreground:        'text-foreground',
      muted:             'text-muted',
      subtle:            'text-subtle',
      'on-dark':         'text-on-primary',
      'on-dark-muted':   'text-on-primary-muted',
      accent:            'text-accent',
      'accent-hover':    'text-accent-hover',
      support:           'text-support-1',
      // Legacy aliases
      gold:              'text-accent',
      'gold-hover':      'text-accent-hover',
      stone:             'text-muted',
      'stone-light':     'text-subtle',
      'text-base':       'text-foreground',
      'text-muted':      'text-muted',
      'text-on-dark':    'text-on-primary',
      'text-on-dark-muted': 'text-on-primary-muted',
    },
    leading: {
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
    weight: 'normal',
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
