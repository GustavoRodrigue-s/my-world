import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Emphasis, Heading, Plate, Portrait, Text, buttonClasses, cx } from '@/components/ui'
import { IDENTITY, PORTRAIT_SRC } from '@/lib/portfolio-content'
import { WORLD } from '@/lib/world-content'
import { MapViewport } from './map-viewport'
import { WorldAtlas } from './world-atlas'
import { WorldLogbook } from './world-logbook'
import { WorldMap } from './world-map'

/** The home: the world's plate (statement + the map), the atlas of places, the logbook. */
export function WorldHome() {
  const { opening, map } = WORLD
  return (
    <>
      <Plate
        labelledBy="world-title"
        rubric={opening.rubric}
        corner={opening.corner}
        figureSize="narrow"
        figure={
          // Whose world this is: the owner's portrait at the core of the mark, like the
          // cartographer's medallion on an atlas frontispiece. Small: the H1 stays the largest paint.
          <figure className="mx-auto flex w-full max-w-[280px] flex-col items-center text-center lg:mr-0">
            <div className="w-full">
              <Portrait
                src={PORTRAIT_SRC}
                alt={opening.owner.alt}
                priority
                sizes="(min-width: 1024px) 152px, 150px"
              />
            </div>
            <figcaption className="-mt-2">
              <Text size="lg" weight="semibold" color="foreground" leading="normal">
                {IDENTITY.name}
              </Text>
              <Text family="mono" size="sm" color="muted" className="mt-1">
                {opening.owner.role}
              </Text>
              <Link href="/portfolio" className={cx(buttonClasses({ variant: 'quiet', size: 'none' }), 'mt-4 text-base')}>
                {opening.owner.more}
                <ArrowRight size={15} strokeWidth={1.6} aria-hidden />
              </Link>
            </figcaption>
          </figure>
        }
        footer={
          <figure>
            <MapViewport hint={map.hint}>
              <WorldMap />
            </MapViewport>
            <figcaption className="sr-only">{map.label}</figcaption>
          </figure>
        }
      >
        <Heading as="h1" id="world-title" level="display" className="max-w-[20ch]">
          {opening.statement.before} <Emphasis>{opening.statement.emphasis}</Emphasis>
          {opening.statement.after}
        </Heading>
        <Text size="lead" color="muted" leading="relaxed" className="mt-6 max-w-[46ch]">
          {opening.lead}
        </Text>
      </Plate>
      <WorldAtlas />
      <WorldLogbook />
    </>
  )
}
