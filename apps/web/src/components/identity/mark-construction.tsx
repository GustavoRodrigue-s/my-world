import { MARK_GEOMETRY, MARK_ORBIT_PATH, markPoint, markSatellitePath } from '@/components/ui'

const g = MARK_GEOMETRY

/** The mark drawn over its own construction lines — every number here is read from MARK_GEOMETRY. */
export function MarkConstruction({ labels }: { labels: { title: string; core: string; grid: string } }) {
  const gapStart = markPoint(g.gapStart, g.r + 9)
  const gapEnd = markPoint(g.gapEnd, g.r + 9)
  const sat = markPoint(g.satelliteAngle, g.r + 9)
  const radiusEnd = markPoint(140)
  const radiusLabel = markPoint(140, g.r + 3.2)
  const grid = Array.from({ length: 17 }, (_, i) => -8 + i * 4)

  return (
    <svg viewBox="-8 -8 64 64" role="img" aria-labelledby="construction-title" className="block h-auto w-full text-foreground">
      <title id="construction-title">{labels.title}</title>

      <g className="stroke-foreground" strokeWidth="0.06" opacity="0.35">
        {grid.map((v) => (
          <path key={`v${v}`} d={`M${v} -8V56`} />
        ))}
        {grid.map((v) => (
          <path key={`h${v}`} d={`M-8 ${v}H56`} />
        ))}
      </g>

      <circle cx={g.cx} cy={g.cy} r={g.r} fill="none" className="stroke-foreground" strokeWidth="0.12" strokeDasharray="0.6 0.8" />
      <path d={`M${g.cx - 3} ${g.cy}H${g.cx + 3}M${g.cx} ${g.cy - 3}V${g.cy + 3}`} className="stroke-foreground" strokeWidth="0.12" />

      <g className="stroke-primary" strokeWidth="0.14" strokeDasharray="0.5 0.6">
        <path d={`M${g.cx} ${g.cy}L${gapStart.x} ${gapStart.y}`} />
        <path d={`M${g.cx} ${g.cy}L${gapEnd.x} ${gapEnd.y}`} />
        <path d={`M${g.cx} ${g.cy}L${sat.x} ${sat.y}`} />
      </g>
      <path d={`M${g.cx} ${g.cy}L${radiusEnd.x} ${radiusEnd.y}`} className="stroke-foreground" strokeWidth="0.14" />

      <path d={MARK_ORBIT_PATH} fill="none" className="stroke-foreground" strokeWidth={g.stroke} opacity="0.92" />
      <circle cx={g.cx} cy={g.cy} r={g.core} className="fill-foreground" />
      <path d={markSatellitePath('satellite')} className="fill-primary" />

      <g className="fill-foreground font-mono text-[1.7px]">
        <text x={gapStart.x + 0.8} y={gapStart.y}>−40°</text>
        <text x={sat.x + 0.8} y={sat.y + 0.6}>−20°</text>
        <text x={gapEnd.x + 0.8} y={gapEnd.y + 0.6}>0°</text>
        <text x={radiusLabel.x} y={radiusLabel.y + 1.6} textAnchor="end">r 17</text>
        <text x={g.cx + 1} y={g.cy + 7.8}>{labels.core}</text>
        <text x="-7" y="-5.4" className="fill-foreground-muted">{labels.grid}</text>
      </g>
    </svg>
  )
}
