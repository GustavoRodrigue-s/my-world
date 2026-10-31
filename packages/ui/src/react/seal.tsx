import { cx, prng, ICON_SIZE, type IconSize } from './utils'

const r2 = (n: number) => Math.round(n * 100) / 100

interface SealProps extends Omit<React.SVGProps<SVGSVGElement>, 'children'> {
  /** Anything stable — usually the artifact slug. Same seed, same seal, forever. */
  seed: string
  size?: IconSize
  /** Light the satellite in the accent color (e.g. artifacts in production). */
  lit?: boolean
}

/**
 * Selo do artefato — every artifact gets its own small orbital signature,
 * generated from its name: tick pattern, orbit tilt and satellite position.
 */
export function Seal({ seed, size = '3xl', lit = false, className, ...props }: SealProps) {
  const rand = prng(seed)
  const c = 22
  const ticks: string[] = []
  for (let i = 0; i < 28; i++) {
    if (rand() < 0.42) continue
    const a = (i / 28) * Math.PI * 2
    const long = rand() > 0.8
    const r1 = 20.5
    const r0 = long ? 16.5 : 18.5
    ticks.push(
      `M${r2(c + r0 * Math.cos(a))} ${r2(c + r0 * Math.sin(a))}L${r2(c + r1 * Math.cos(a))} ${r2(c + r1 * Math.sin(a))}`
    )
  }
  const tilt = r2(rand() * 180)
  const ry = r2(3.5 + rand() * 5.5)
  const t = rand() * Math.PI * 2
  const tiltRad = (tilt * Math.PI) / 180
  const lx = 12 * Math.cos(t)
  const ly = ry * Math.sin(t)
  const sx = r2(c + lx * Math.cos(tiltRad) - ly * Math.sin(tiltRad))
  const sy = r2(c + lx * Math.sin(tiltRad) + ly * Math.cos(tiltRad))

  return (
    <svg
      viewBox="0 0 44 44"
      aria-hidden
      className={cx('shrink-0 text-foreground', ICON_SIZE[size], className)}
      {...props}
    >
      <circle cx={c} cy={c} r={20.5} fill="none" stroke="currentColor" strokeWidth={0.75} opacity={0.55} />
      <path d={ticks.join('')} stroke="currentColor" strokeWidth={0.75} opacity={0.55} />
      <ellipse
        cx={c}
        cy={c}
        rx={12}
        ry={ry}
        fill="none"
        stroke="currentColor"
        strokeWidth={0.9}
        transform={`rotate(${tilt} ${c} ${c})`}
      />
      <circle cx={c} cy={c} r={3.2} fill="currentColor" />
      <circle cx={sx} cy={sy} r={2.3} fill="currentColor" className={lit ? 'fill-primary' : undefined} />
    </svg>
  )
}
