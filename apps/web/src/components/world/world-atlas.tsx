import Link from 'next/link'
import type { Route } from 'next'
import { ArrowRight } from 'lucide-react'
import { Folio, Heading, StatusTag, Text, buttonClasses, cx, type StatusTone } from '@/components/ui'
import { SPACES, canEnter, type SpaceStatus } from '@/lib/world'
import { PLACE_ORDER, WORLD } from '@/lib/world-content'
import { PlaceGlyph } from './place-glyph'

const TONE: Record<SpaceStatus, StatusTone> = { open: 'lit', building: 'open', planned: 'draft' }

/** The atlas: one entry per place — the map's legend and the page's real navigation. */
export function WorldAtlas() {
  const { atlas, places } = WORLD
  return (
    <Folio id="atlas" index="01" label={atlas.label} note={atlas.note} title={atlas.title}>
      <ul className="plot-rise grid list-none gap-px border border-border-strong bg-border-strong sm:grid-cols-2 lg:grid-cols-4">
        {PLACE_ORDER.map((id) => {
          const copy = places[id]
          const status = SPACES[id].status
          const href = 'href' in copy ? copy.href : undefined
          const enter = canEnter(id) && href
          return (
            <li key={id} className="flex flex-col bg-surface p-6">
              <svg viewBox="-40 -80 80 86" width="64" height="69" aria-hidden className="mb-5">
                <PlaceGlyph space={id} status={status} strokeWidth={1.5} />
              </svg>
              <Text family="mono" size="sm" color={status === 'planned' ? 'support' : 'accent'}>
                {copy.verb}
              </Text>
              <Heading as="h3" level="subtitle" className="mt-1.5">
                {copy.name}
              </Heading>
              <Text size="md" color="muted" leading="relaxed" className="mt-3">
                {copy.text}
              </Text>
              {'moons' in copy && copy.moons && enter && (
                <ul className="mt-4 flex list-none flex-wrap gap-x-4 gap-y-1">
                  {copy.moons.map((m) => (
                    <li key={m.href}>
                      <Link href={m.href as Route} className="ink-link font-sans text-[14px] text-foreground no-underline hover:text-accent">
                        {m.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
                <StatusTag tone={TONE[status]}>{atlas.states[status]}</StatusTag>
                {enter && (
                  <Link href={href as Route} className={cx(buttonClasses({ variant: 'quiet', size: 'none' }), 'text-[15px]')}>
                    {atlas.enter}
                    <ArrowRight size={15} strokeWidth={1.6} aria-hidden />
                    <span className="sr-only"> — {copy.name}</span>
                  </Link>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </Folio>
  )
}
