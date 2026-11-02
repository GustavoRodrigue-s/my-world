import Image from 'next/image'
import { cva, type VariantProps } from 'class-variance-authority'
import { cx } from './utils'

const coverVariants = cva('relative block w-full overflow-hidden rounded-xs border border-border bg-surface-muted', {
  variants: {
    ratio: {
      wide: 'aspect-cover lg:aspect-wide',
      cover: 'aspect-cover',
      thumb: 'aspect-cover md:aspect-square',
    },
  },
  defaultVariants: { ratio: 'cover' },
})

interface CoverProps extends VariantProps<typeof coverVariants> {
  /** A file in /public. Without one the frame stays an empty gray plate, until the picture exists. */
  src?: string
  /** Empty when the title beside it already says what the link is. */
  alt?: string
  /** The `sizes` of the responsive image. */
  sizes?: string
  /** The page's largest paint: load it first. */
  priority?: boolean
  className?: string
}

/** A piece of writing's picture, cropped to its frame. A plate: it doesn't follow day/night. */
export function Cover({ src, alt = '', ratio, sizes, priority = false, className }: CoverProps) {
  return (
    <span aria-hidden={src ? undefined : true} className={cx(coverVariants({ ratio }), className)}>
      {src && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          unoptimized={src.endsWith('.svg')}
          className="object-cover"
        />
      )}
    </span>
  )
}
