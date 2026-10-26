import { cx } from '@/components/ui'
import type { SpaceId, SpaceStatus } from '@/lib/world'

/*
 * The buildings of the world, in the engraving hand of Fig. 1. Each one stands
 * on (0,0) and grows upward (negative y), about 60 units tall, so the map can
 * set it on the land and the atlas can frame it in its own small sheet.
 *
 *   portfolio → a Antena     (the signal the world sends out)
 *   projects  → a Oficina    (sawtooth workshop and chimney)
 *   studies   → a Biblioteca (columns and pediment)
 *   chapel    → a Capela     (red cross, rose window with a gold heart)
 *
 * The state is drawn, not written: open in ink, building with scaffolding
 * beside it, planned as a dashed blueprint in the support color.
 */

const DRAWING: Record<SpaceId, { width: number; ink: string; extra?: (planned: boolean) => React.ReactNode }> = {
  portfolio: {
    width: 12,
    ink:
      'M-12 0L0 -54L12 0M-9.6 -11H9.6M-7.1 -22.5H7.1M-4.6 -34H4.6M-2.3 -45H2.3' +
      'M-9.6 -11L7.1 -22.5M9.6 -11L-7.1 -22.5M-7.1 -22.5L4.6 -34M7.1 -22.5L-4.6 -34M-17 0H17',
    extra: (planned) => (
      <>
        {/* Signal: three arcs each side of the beacon */}
        <path
          d={
            'M7.66 -64.43A10 10 0 0 1 7.66 -51.57M13.02 -68.93A17 17 0 0 1 13.02 -47.07M18.39 -73.43A24 24 0 0 1 18.39 -42.57' +
            'M-7.66 -64.43A10 10 0 0 0 -7.66 -51.57M-13.02 -68.93A17 17 0 0 0 -13.02 -47.07M-18.39 -73.43A24 24 0 0 0 -18.39 -42.57'
          }
          fill="none"
          opacity="0.7"
        />
        <circle cy="-58" r="3" className={planned ? 'fill-none' : 'fill-primary stroke-none'} />
      </>
    ),
  },
  projects: {
    width: 24,
    ink:
      'M-24 0V-22H24V0M-24 -22V-34L-12 -22V-34L0 -22V-34L12 -22V-34L24 -22M16 -26V-48H22V-30' +
      'M-5 0V-11H5V0M-19 -8H-13V-14H-19ZM13 -8H19V-14H13ZM-29 0H29',
  },
  studies: {
    width: 27,
    ink:
      'M-28 0H28M-25 -3H25M-18 -3V-24M-9 -3V-24M0 -3V-24M9 -3V-24M18 -3V-24' +
      'M-24 -24H24V-28H-24ZM-27 -28L0 -42L27 -28Z',
    extra: () => <circle cy="-33" r="2.6" fill="none" />,
  },
  chapel: {
    width: 14,
    ink: 'M-14 0V-26H14V0M-17 -24L0 -40L17 -24M-5 0V-9A5 5 0 0 1 5 -9V0M-22 0H22',
    extra: (planned) => (
      <>
        <circle cy="-30" r="4.2" fill="none" />
        {!planned && <circle cy="-30" r="1.5" className="fill-hidden stroke-none" />}
        <path d="M0 -40V-55M-5 -49.5H5" className={planned ? undefined : 'stroke-primary'} strokeWidth="1.5" />
      </>
    ),
  },
}

// Scaffolding beside a building that is going up.
function Scaffold({ x }: { x: number }) {
  return (
    <path
      d={`M${x} 0V-40M${x + 11} 0V-40M${x - 3} -11H${x + 14}M${x - 3} -24H${x + 14}M${x - 3} -37H${x + 14}M${x} -11L${x + 11} -24M${x} -24L${x + 11} -37`}
      strokeWidth="0.9"
      fill="none"
    />
  )
}

interface PlaceGlyphProps {
  space: SpaceId
  status: SpaceStatus
  strokeWidth?: number
  className?: string
}

export function PlaceGlyph({ space, status, strokeWidth = 1.3, className }: PlaceGlyphProps) {
  const d = DRAWING[space]
  const planned = status === 'planned'
  return (
    <g
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeDasharray={planned ? '4.5 2.5' : undefined}
      className={cx(planned ? 'stroke-support' : 'stroke-foreground', className)}
    >
      <path d={d.ink} fill="none" />
      {d.extra?.(planned)}
      {status === 'building' && <Scaffold x={d.width + 7} />}
    </g>
  )
}
