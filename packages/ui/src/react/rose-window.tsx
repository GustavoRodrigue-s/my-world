import { cx } from './utils'

// Geometry precomputed for a 64×64 box: 12 spokes and 12 lobes (one per apostle).
const SPOKES = 'M32.00 23.00L32.00 12.00M36.50 24.21L42.00 14.68M39.79 27.50L49.32 22.00M41.00 32.00L52.00 32.00M39.79 36.50L49.32 42.00M36.50 39.79L42.00 49.32M32.00 41.00L32.00 52.00M27.50 39.79L22.00 49.32M24.21 36.50L14.68 42.00M23.00 32.00L12.00 32.00M24.21 27.50L14.68 22.00M27.50 24.21L22.00 14.68'
const LOBES: Array<[number, number]> = [
  [38.47, 7.85],
  [49.68, 14.32],
  [56.15, 25.53],
  [56.15, 38.47],
  [49.68, 49.68],
  [38.47, 56.15],
  [25.53, 56.15],
  [14.32, 49.68],
  [7.85, 38.47],
  [7.85, 25.53],
  [14.32, 14.32],
  [25.53, 7.85],
]

interface RoseWindowProps {
  size?: number
  className?: string
}

/**
 * Rosácea — the round window over an old church's door, in hairline. Its heart
 * is a dot of the hidden gold; inside a `group` (a link, a figure) the whole
 * tracery gilds when the reader's hand comes near. Decorative.
 */
export function RoseWindow({ size = 64, className }: RoseWindowProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      aria-hidden
      className={cx(
        'shrink-0 text-subtle transition-colors duration-500 ease-out group-hover:text-support-1 group-hover/niche:text-support-1',
        className
      )}
    >
      <g fill="none" stroke="currentColor" strokeWidth="0.8">
        <circle cx="32" cy="32" r="30.5" />
        <circle cx="32" cy="32" r="20" />
        <circle cx="32" cy="32" r="9" />
        <path d={SPOKES} />
        {LOBES.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="4.4" />
        ))}
      </g>
      <circle cx="32" cy="32" r="3.2" className="fill-support-1" />
    </svg>
  )
}
