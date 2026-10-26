import { cva, type VariantProps } from 'class-variance-authority'
import { cx } from './utils'

const emphasisVariants = cva('font-serif italic font-regular text-primary leading-[0] tracking-snug', {
  variants: {
    fit: {
      // Cormorant's x-height is small next to a grotesk; 1.08em evens the optical size.
      grotesk: 'text-[1.08em]',
      // Inside a serif heading the faces already match.
      serif: '',
    },
  },
  defaultVariants: { fit: 'grotesk' },
})

/**
 * "A palavra que importa" — the one word per statement set in the voice face
 * (serif italic) and the accent. Shared by every landscape: the workshop's
 * "capricho", the chapel's "inteligência" (fit="serif" in its serif headings).
 */
export function Emphasis({ fit, className, ...props }: React.HTMLAttributes<HTMLElement> & VariantProps<typeof emphasisVariants>) {
  return <em className={cx(emphasisVariants({ fit }), className)} {...props} />
}
