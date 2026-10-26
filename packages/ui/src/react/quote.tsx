import { cva, type VariantProps } from 'class-variance-authority'
import { Text } from './text'
import { cx } from './utils'

const quoteVariants = cva('', {
  variants: {
    size: {
      // On its own band: large, centered.
      display: 'text-center',
      // Inside running text: the rubric rule at the left — the manuscript's way to cite.
      body: 'border-l-2 border-primary py-1 pl-6',
    },
  },
  defaultVariants: { size: 'body' },
})

const TEXT = {
  display: 'text-quote text-balance',
  body: 'text-quote-sm',
} as const

interface QuoteProps extends VariantProps<typeof quoteVariants> {
  /** The words, with their quotation marks if wanted. */
  text: string
  source?: string
  className?: string
}

/** A quotation in the voice face (Cormorant italic), its source in the annotation hand. */
export function Quote({ text, source, size, className }: QuoteProps) {
  const s = size ?? 'body'
  return (
    <blockquote className={cx(quoteVariants({ size }), className)}>
      <p className={cx('font-serif text-foreground italic', TEXT[s])}>{text}</p>
      {source && (
        <Text as="footer" family="mono" size="xs" color="muted" className={s === 'display' ? 'mt-6' : 'mt-3'}>
          — {source}
        </Text>
      )}
    </blockquote>
  )
}
