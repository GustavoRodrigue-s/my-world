'use client'

import { useEffect, useRef } from 'react'
import { Text } from '@/components/ui'

/**
 * On phones the chart keeps its size and can be dragged sideways (like a real
 * map on a table); it opens centered on the harbor. Wider screens see it whole.
 */
export function MapViewport({ hint, children }: { hint: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (el && el.scrollWidth > el.clientWidth) el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2
  }, [])

  return (
    <div>
      <div ref={ref} className="-mx-[var(--spacing-section-x)] overflow-x-auto px-[var(--spacing-section-x)] md:mx-0 md:overflow-visible md:px-0">
        {children}
      </div>
      <Text family="mono" size="sm" color="muted" className="mt-3 md:hidden">
        ↔ {hint}
      </Text>
    </div>
  )
}
