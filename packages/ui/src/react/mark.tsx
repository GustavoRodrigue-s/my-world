import { MARK_GEOMETRY, MARK_ORBIT_PATH, markPoint, markSatellitePath, type MarkVariant } from '@my-world/design-system'
import { cx } from './utils'

// The geometry lives in the design system (brand data); re-exported for the library's users.
export { MARK_GEOMETRY, MARK_ORBIT_PATH, markPoint, markSatellitePath, type MarkVariant }

const g = MARK_GEOMETRY

interface MarkProps extends Omit<React.SVGProps<SVGSVGElement>, 'children'> {
  variant?: MarkVariant
  size?: number
  /** Satellite in the accent color (default). Turn off for single-ink uses: stamps, embossing, favicons. */
  accent?: boolean
  /** Which color lights the satellite: the brand accent (default) or the environment's support color. */
  tone?: 'accent' | 'support'
  /** Accessible name. Omit when the mark sits next to the written name (it is then decorative). */
  title?: string
  /** Classes for the satellite alone; it pivots on the core, so a 360° rotation is one full orbit. */
  satelliteClassName?: string
}

export function Mark({
  variant = 'satellite',
  size = 32,
  accent = true,
  tone = 'accent',
  title,
  satelliteClassName,
  className,
  ...props
}: MarkProps) {
  return (
    <svg
      viewBox={`0 0 ${g.box} ${g.box}`}
      width={size}
      height={size}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      className={cx('shrink-0', className)}
      {...props}
    >
      {title && <title>{title}</title>}
      <path d={MARK_ORBIT_PATH} fill="none" stroke="currentColor" strokeWidth={g.stroke} />
      <circle cx={g.cx} cy={g.cy} r={g.core} fill="currentColor" />
      <path
        d={markSatellitePath(variant)}
        fill="currentColor"
        className={cx(
          accent && (tone === 'support' ? 'fill-support' : 'fill-primary'),
          satelliteClassName && '[transform-box:view-box] origin-center',
          satelliteClassName
        )}
      />
    </svg>
  )
}
