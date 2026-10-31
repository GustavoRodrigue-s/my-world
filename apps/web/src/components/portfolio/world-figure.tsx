'use client'

import { useEffect, useRef, useState } from 'react'
import { MotionToggle, cx } from '@/components/ui'

/*
 * Fig. 1 — O mundo do Gustavo, em vista orbital.
 *
 * One story, on a loop: a spark leaves the Southern Cross (faith — ideas come
 * from above), falls into the workshop chimney, the forge glows, and a new
 * artifact is launched into orbit (reason — the work). A chapel and a cypress
 * share the planet with the workshop.
 *
 * Drawn as an engraving: hairlines, hatching on the night side, one red.
 * Animated with SMIL so the browser runs it declaratively (no JS frame loop)
 * and the whole timeline can be paused with svg.pauseAnimations().
 */

const CX = 300
const CY = 330
const R = 128
const TILT = -14

const r2 = (n: number) => Math.round(n * 100) / 100
const rad = (d: number) => (d * Math.PI) / 180

/** Global point of a local-orbit point, after the orbital plane tilt. */
function tilted(x: number, y: number) {
  const dx = x - CX
  const dy = y - CY
  const c = Math.cos(rad(TILT))
  const s = Math.sin(rad(TILT))
  return { x: r2(CX + dx * c - dy * s), y: r2(CY + dx * s + dy * c) }
}

function orbitPaths(rx: number, ry: number) {
  return {
    back: `M${CX + rx} ${CY}A${rx} ${ry} 0 0 0 ${CX - rx} ${CY}`,
    front: `M${CX - rx} ${CY}A${rx} ${ry} 0 0 0 ${CX + rx} ${CY}`,
    motion: `M${CX + rx} ${CY}A${rx} ${ry} 0 1 1 ${CX - rx} ${CY}A${rx} ${ry} 0 1 1 ${CX + rx} ${CY}`,
  }
}

const ORBIT_I = orbitPaths(214, 52)
const ORBIT_II = orbitPaths(270, 72)

/** Place an object standing on the planet surface, `angle` degrees from the top. */
const onSurface = (angle: number) => `rotate(${angle} ${CX} ${CY}) translate(${CX} ${CY - R})`

function star(x: number, y: number, o: number) {
  const i = o * 0.26
  return `M${x} ${y - o}L${r2(x + i)} ${r2(y - i)}L${x + o} ${y}L${r2(x + i)} ${r2(y + i)}L${x} ${y + o}L${r2(x - i)} ${r2(y + i)}L${x - o} ${y}L${r2(x - i)} ${r2(y - i)}Z`
}

function gearPath(teeth: number, outer: number, inner: number) {
  const pts: string[] = []
  const step = (Math.PI * 2) / teeth
  for (let t = 0; t < teeth; t++) {
    const a = t * step
    const corners = [a - step * 0.22, a - step * 0.12, a + step * 0.12, a + step * 0.22]
    const radii = [inner, outer, outer, inner]
    corners.forEach((c, k) => pts.push(`${r2(radii[k] * Math.cos(c))} ${r2(radii[k] * Math.sin(c))}`))
  }
  return `M${pts.join('L')}Z`
}

// Crux, roughly as it hangs over Londrina: Gacrux on top, Acrux at the foot.
const CRUX = {
  gacrux: { x: 112, y: 64, o: 5.5 },
  mimosa: { x: 82, y: 102, o: 6 },
  delta: { x: 142, y: 92, o: 4.2 },
  epsilon: { x: 130, y: 126, o: 2.8 },
  acrux: { x: 116, y: 148, o: 7 },
}

const SKY = [
  [42, 40], [262, 34], [376, 72], [520, 46], [574, 150], [470, 112], [24, 210],
  [574, 468], [40, 506], [214, 532], [398, 540], [532, 520], [330, 18], [200, 30],
] as const

const CHIMNEY = { x: CX + 10.5, y: CY - R - 40 }
const LAUNCH_TARGET = tilted(CX + 214 * Math.cos(rad(25)), CY + 52 * Math.sin(rad(25)))

const SPARK_PATH = `M${CRUX.acrux.x} ${CRUX.acrux.y + 4}C168 132 262 96 ${CHIMNEY.x} ${CHIMNEY.y - 4}`
const LAUNCH_PATH = `M${CX + 6} ${CY - R - 16}C340 120 450 150 ${LAUNCH_TARGET.x} ${LAUNCH_TARGET.y}`

const SATELLITES = [
  { orbit: ORBIT_I.motion, dur: 44, begin: 0, kind: 'solid' },
  { orbit: ORBIT_I.motion, dur: 44, begin: -14.7, kind: 'solid' },
  { orbit: ORBIT_I.motion, dur: 44, begin: -29.3, kind: 'solid' },
  { orbit: ORBIT_II.motion, dur: 70, begin: -10, kind: 'hollow' },
  { orbit: ORBIT_II.motion, dur: 70, begin: -45, kind: 'lit' },
] as const

// Freeze frame for reduced motion: the spark has landed, the forge glows,
// the new artifact is halfway to orbit — the whole story in one still.
const STILL_FRAME = 4.6

function SatelliteShape({ kind }: { kind: (typeof SATELLITES)[number]['kind'] }) {
  return (
    <>
      <path d="M-10 0H-4.5M4.5 0H10" className="stroke-foreground" strokeWidth="1" />
      <rect
        x="-3.5"
        y="-3.5"
        width="7"
        height="7"
        className={cx(
          kind === 'solid' && 'fill-foreground',
          kind === 'hollow' && 'fill-surface stroke-foreground',
          kind === 'lit' && 'fill-primary'
        )}
        strokeWidth="1"
      />
    </>
  )
}

function Callout({ n, x, y }: { n: string; x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="9" className="fill-surface stroke-foreground" strokeWidth="0.9" />
      <text x={x} y={y + 3.4} textAnchor="middle" className="fill-foreground font-mono text-xs">
        {n}
      </text>
    </g>
  )
}

export interface WorldFigureLabels {
  title: string
  desc: string
  scale: string
  pause: string
  play: string
}

export function WorldFigure({ labels, className }: { labels: WorldFigureLabels; className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [reduced, setReduced] = useState(false)
  const [choice, setChoice] = useState<'run' | 'pause' | null>(null)
  const [onScreen, setOnScreen] = useState(true)

  const running = choice ? choice === 'run' : !reduced

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(mq.matches)
    sync()
    if (mq.matches) svgRef.current?.setCurrentTime(STILL_FRAME)
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting))
    io.observe(svg)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    if (running && onScreen) svg.unpauseAnimations()
    else svg.pauseAnimations()
  }, [running, onScreen])

  return (
    <div className={cx('relative', className)}>
      <svg
        ref={svgRef}
        viewBox="0 0 600 560"
        role="img"
        aria-labelledby="world-title world-desc"
        className="block h-auto w-full text-foreground"
      >
        <title id="world-title">{labels.title}</title>
        <desc id="world-desc">{labels.desc}</desc>

        <defs>
          <pattern id="gw-hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
            <line x1="0" y1="0" x2="0" y2="5" className="stroke-foreground" strokeWidth="0.9" />
          </pattern>
          <mask id="gw-night">
            <circle cx={CX} cy={CY} r={R} fill="white" />
            <circle cx={CX + 52} cy={CY - 44} r={R * 1.04} fill="black" />
          </mask>
          <clipPath id="gw-planet">
            <circle cx={CX} cy={CY} r={R} />
          </clipPath>
          {/* Lower half of the orbital plane = the near side, drawn over the planet. */}
          <clipPath id="gw-near">
            <rect x="-100" y={CY} width="800" height="400" />
          </clipPath>
        </defs>

        {/* Registration marks */}
        <path
          d="M6 20V6H20M580 6H594V20M594 540V554H580M20 554H6V540"
          fill="none"
          className="stroke-foreground"
          strokeWidth="1"
          opacity="0.5"
        />

        {/* Sky */}
        <g className="stroke-foreground" strokeWidth="0.9" opacity="0.45">
          {SKY.map(([x, y]) => (
            <path key={`${x}-${y}`} d={`M${x - 3} ${y}H${x + 3}M${x} ${y - 3}V${y + 3}`} />
          ))}
        </g>

        {/* 1 — Cruzeiro do Sul */}
        <g>
          <path
            d={`M${CRUX.gacrux.x} ${CRUX.gacrux.y}L${CRUX.acrux.x} ${CRUX.acrux.y}M${CRUX.mimosa.x} ${CRUX.mimosa.y}L${CRUX.delta.x} ${CRUX.delta.y}`}
            className="stroke-foreground"
            strokeWidth="0.75"
            strokeDasharray="2 4"
            opacity="0.5"
          />
          {Object.entries(CRUX).map(([name, s]) => (
            <path key={name} d={star(s.x, s.y, s.o)} className="fill-foreground">
              {name === 'acrux' && (
                <animate attributeName="opacity" values="1;0.5;1" dur="5s" repeatCount="indefinite" />
              )}
            </path>
          ))}
        </g>

        {/* Far side of the orbits, and the satellites while they are behind */}
        <g transform={`rotate(${TILT} ${CX} ${CY})`}>
          <path d={ORBIT_II.back} fill="none" className="stroke-foreground" strokeWidth="0.9" strokeDasharray="2 5" opacity="0.6" />
          <path d={ORBIT_I.back} fill="none" className="stroke-foreground" strokeWidth="0.9" strokeDasharray="2 5" opacity="0.6" />
          {SATELLITES.map((s, i) => (
            <g key={i}>
              <animateMotion dur={`${s.dur}s`} begin={`${s.begin}s`} repeatCount="indefinite" path={s.orbit} />
              <SatelliteShape kind={s.kind} />
            </g>
          ))}
        </g>

        {/* Planet */}
        <circle cx={CX} cy={CY} r={R} className="fill-surface" />
        <rect x={CX - R} y={CY - R} width={R * 2} height={R * 2} fill="url(#gw-hatch)" mask="url(#gw-night)" opacity="0.55" />
        <g clipPath="url(#gw-planet)" transform={`rotate(${TILT} ${CX} ${CY})`} fill="none" className="stroke-foreground" strokeWidth="0.8" opacity="0.32">
          <path d={`M${CX - R} ${CY}A${R} ${R * 0.24} 0 0 0 ${CX + R} ${CY}`} />
          <path d={`M${r2(CX - R * 0.83)} ${r2(CY - R * 0.56)}A${r2(R * 0.83)} ${r2(R * 0.2)} 0 0 0 ${r2(CX + R * 0.83)} ${r2(CY - R * 0.56)}`} />
          <path d={`M${r2(CX - R * 0.83)} ${r2(CY + R * 0.56)}A${r2(R * 0.83)} ${r2(R * 0.2)} 0 0 0 ${r2(CX + R * 0.83)} ${r2(CY + R * 0.56)}`} />
          <path d={`M${CX} ${CY - R}V${CY + R}`} />
          <path d={`M${CX} ${CY - R}A${r2(R * 0.7)} ${R} 0 0 1 ${CX} ${CY + R}`} />
          <path d={`M${CX} ${CY - R}A${r2(R * 0.7)} ${R} 0 0 0 ${CX} ${CY + R}`} />
        </g>
        <circle cx={CX} cy={CY} r={R} fill="none" className="stroke-foreground" strokeWidth="1.4" />

        {/* 3 — Capela */}
        <g transform={`${onSurface(-34)} scale(1.25)`} strokeWidth="0.9" strokeLinejoin="round">
          <path d="M-8 3V-14H8V3Z" className="fill-surface" />
          <path d="M-8 3V-14H8V3M-10.5 -13L0 -24L10.5 -13M0 -24V-33M-3.5 -29.5H3.5M-2.5 0V-5.5A2.5 2.5 0 0 1 2.5 -5.5V0" fill="none" className="stroke-foreground" />
        </g>

        {/* Antenna */}
        <g transform={onSurface(-62)} strokeWidth="1.1" strokeLinejoin="round">
          <path d="M-6 3L0 -28L6 3M-4.4 -6H4.4M-2.7 -15H2.7M-1.2 -22H1.2" fill="none" className="stroke-foreground" />
          <circle cx="0" cy="-31" r="2.3" className="fill-primary">
            <animate attributeName="opacity" values="1;0.15;1" dur="2.6s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* 2 — Oficina (forge) */}
        <g transform={onSurface(0)} strokeWidth="1.15" strokeLinejoin="round">
          <path d="M8 -27V-40H13V-23M-18 3V-22H18V3Z" className="fill-surface" />
          <path d="M8 -27V-40H13V-24M-18 3V-22H18V3M-21 -21L0 -37L21 -21" fill="none" className="stroke-foreground" />
          <circle cx="-9.5" cy="-12.5" r="3.4" fill="none" className="stroke-foreground" />
          <path d="M-1 3V-9A5 5 0 0 1 9 -9V3" fill="none" className="stroke-foreground" />
          {/* Forge glow — lights up when the spark lands */}
          <path d="M-1 3V-9A5 5 0 0 1 9 -9V3Z" className="fill-primary" opacity="0">
            <animate attributeName="opacity" begin="gwFall.end" dur="2.2s" values="0;1;0.75;0" keyTimes="0;0.12;0.6;1" />
          </path>
          {/* Smoke */}
          {[0, 1.4, 2.8].map((delay) => (
            <circle key={delay} cx="10.5" cy="-44" r="2" fill="none" className="stroke-foreground" strokeWidth="0.9" opacity="0">
              <animate attributeName="cy" values="-44;-92" dur="4.2s" begin={`${delay}s`} repeatCount="indefinite" />
              <animate attributeName="r" values="2;7" dur="4.2s" begin={`${delay}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;0.55;0" keyTimes="0;0.2;1" dur="4.2s" begin={`${delay}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </g>

        {/* Gear */}
        <g transform={onSurface(32)}>
          <path d="M0 3V-11" className="stroke-foreground" strokeWidth="1.1" />
          <g transform="translate(0 -23)">
            <g>
              <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="16s" repeatCount="indefinite" />
              <path d={gearPath(9, 12.5, 9.6)} className="fill-surface stroke-foreground" strokeWidth="1.1" strokeLinejoin="round" />
              <circle r="3" fill="none" className="stroke-foreground" strokeWidth="1.1" />
            </g>
          </g>
        </g>

        {/* Pine */}
        <g transform={onSurface(56)} strokeWidth="1.1" strokeLinejoin="round">
          <path d="M0 3V-5" className="stroke-foreground" />
          <path d="M-8 -4L0 -17L8 -4ZM-6 -13L0 -26L6 -13Z" className="fill-surface stroke-foreground" />
        </g>

        {/* Near side of the orbits */}
        <g transform={`rotate(${TILT} ${CX} ${CY})`}>
          <path d={ORBIT_II.front} fill="none" className="stroke-foreground" strokeWidth="1" />
          <path d={ORBIT_I.front} fill="none" className="stroke-foreground" strokeWidth="1" />
          <g clipPath="url(#gw-near)">
            {SATELLITES.map((s, i) => (
              <g key={i}>
                <animateMotion dur={`${s.dur}s`} begin={`${s.begin}s`} repeatCount="indefinite" path={s.orbit} />
                <SatelliteShape kind={s.kind} />
              </g>
            ))}
          </g>
        </g>

        {/* The spark — an idea falling from the Southern Cross */}
        <g opacity="0">
          <animateMotion
            id="gwFall"
            path={SPARK_PATH}
            begin="1.2s;gwLaunch.end+5s"
            dur="2.2s"
            rotate="auto"
            calcMode="spline"
            keyTimes="0;1"
            keyPoints="0;1"
            keySplines="0.45 0 0.85 0.55"
          />
          <animate attributeName="opacity" begin="gwFall.begin" dur="2.2s" values="0;1;1;0" keyTimes="0;0.08;0.9;1" />
          <path d="M-26 0L-3 -2.2L-3 2.2Z" className="fill-primary" opacity="0.4" />
          <circle r="3.8" className="fill-primary" />
        </g>
        <circle cx={CHIMNEY.x} cy={CHIMNEY.y} r="0" fill="none" className="stroke-primary" strokeWidth="1.2">
          <animate attributeName="r" begin="gwFall.end" dur="0.7s" values="1;10" />
          <animate attributeName="opacity" begin="gwFall.end" dur="0.7s" values="1;0" />
        </circle>

        {/* The launch — a new artifact heading for orbit I */}
        <g opacity="0">
          <animateMotion
            id="gwLaunch"
            path={LAUNCH_PATH}
            begin="gwFall.end+0.7s"
            dur="2.8s"
            calcMode="spline"
            keyTimes="0;1"
            keyPoints="0;1"
            keySplines="0.3 0 0.4 1"
          />
          <animate attributeName="opacity" begin="gwLaunch.begin" dur="2.8s" values="0;1;1;0" keyTimes="0;0.06;0.9;1" />
          <rect x="-3.5" y="-3.5" width="7" height="7" className="fill-primary" />
        </g>
        <circle cx={LAUNCH_TARGET.x} cy={LAUNCH_TARGET.y} r="0" fill="none" className="stroke-primary" strokeWidth="1.2">
          <animate attributeName="r" begin="gwLaunch.end" dur="1.3s" values="3;18" />
          <animate attributeName="opacity" begin="gwLaunch.end" dur="1.3s" values="0.9;0" />
        </circle>

        <text x="588" y="540" textAnchor="end" className="fill-foreground-muted font-mono text-xs">
          {labels.scale}
        </text>

        {/* Callouts — keyed to the legend under the figure */}
        <Callout n="1" x={168} y={64} />
        <Callout n="2" x={352} y={146} />
        <Callout n="3" x={186} y={170} />
        <Callout n="4" x={540} y={240} />
      </svg>

      <MotionToggle
        running={running}
        onToggle={() => setChoice(running ? 'pause' : 'run')}
        labels={labels}
        className="absolute bottom-1 left-1"
      />
    </div>
  )
}
