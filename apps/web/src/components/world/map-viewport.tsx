'use client'

import { useEffect, useRef, useState } from 'react'
import { MotionToggle, Text } from '@/components/ui'

/**
 * On phones the chart keeps its size and can be dragged sideways (like a real
 * map on a table); it opens centered on the harbor. Wider screens see it whole.
 * It also holds the pause of the chart's story (identity.css .chart-*).
 */
export function MapViewport({
  hint,
  motion,
  children,
}: {
  hint: string
  motion: { pause: string; play: string }
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [running, setRunning] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (el && el.scrollWidth > el.clientWidth) el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2
  }, [])

  return (
    <div data-chart-paused={running ? undefined : ''}>
      <div ref={ref} className="-mx-gutter overflow-x-auto px-gutter md:mx-0 md:overflow-visible md:px-0">
        {children}
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <Text family="mono" size="xs" color="muted" className="md:hidden">
          ↔ {hint}
        </Text>
        <MotionToggle
          running={running}
          onToggle={() => setRunning(!running)}
          labels={motion}
          className="ml-auto motion-reduce:hidden"
        />
      </div>
    </div>
  )
}
