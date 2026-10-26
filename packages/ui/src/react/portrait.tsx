import Image from 'next/image'
import { MARK_GEOMETRY, markPoint } from './mark'
import { cx } from './utils'

const g = MARK_GEOMETRY
const start = markPoint(g.gapStart)
const end = markPoint(g.gapEnd)
const sat = markPoint(g.satelliteAngle)
// Same orbit as the mark, but the core grows into the portrait and the crossbar shortens to meet it.
const RING = `M${start.x} ${start.y}A${g.r} ${g.r} 0 1 0 ${end.x} ${end.y}H38.6`

interface PortraitProps {
  src?: string | null
  alt: string
  /** Letters shown (hatched) while there is no photo. */
  monogram?: string
  /** Rendered width of the photo circle (54% of the box), for next/image. */
  sizes?: string
  /** Above the fold: load it right away. */
  priority?: boolean
  /** The mark's orbit around the photo (default). Off: just the photo filling the box (Capela). */
  ring?: boolean
  /** Without the ring: a round photo, or one in a round-arched niche (3:4, Capela). */
  shape?: 'circle' | 'arch'
  className?: string
}

/**
 * The portrait sits where the mark's core is: you at the center of your own world.
 * Fills its container's width (size it with a wrapper). Hover: the satellite
 * makes one full orbit (as on the header mark) and the photo leans in.
 */
export function Portrait({
  src,
  alt,
  monogram = 'GR',
  sizes = '(min-width: 1024px) 200px, 40vw',
  priority,
  ring = true,
  shape = 'circle',
  className,
}: PortraitProps) {
  const arch = !ring && shape === 'arch'
  return (
    <div className={cx('group/portrait relative w-full', arch ? 'aspect-[3/4]' : 'aspect-square', className)}>
      <div
        className={cx(
          'absolute overflow-hidden bg-surface-muted',
          ring ? 'inset-[23%] rounded-full' : 'inset-0',
          !ring && (arch ? 'rounded-t-full rounded-b-xs' : 'rounded-full')
        )}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover grayscale-[15%] transition-transform duration-slower ease-out motion-safe:group-hover/portrait:scale-[1.06]"
          />
        ) : (
          <div role="img" aria-label={alt} className="flex h-full w-full items-center justify-center text-foreground">
            <span aria-hidden className="hatch absolute inset-0 opacity-[0.18]" />
            <span aria-hidden className="relative font-serif text-6xl italic leading-none sm:text-7xl">
              {monogram}
            </span>
          </div>
        )}
      </div>
      {ring && (
        <svg viewBox="0 0 48 48" aria-hidden className="absolute inset-0 h-full w-full text-foreground">
          <path d={RING} fill="none" stroke="currentColor" strokeWidth="0.55" />
          <circle
            cx={sat.x}
            cy={sat.y}
            r="1.5"
            className="origin-[24px_24px] fill-primary transition-transform duration-gesture ease-in-out [transform-box:view-box] motion-safe:group-hover/portrait:-rotate-[360deg]"
          />
        </svg>
      )}
    </div>
  )
}
