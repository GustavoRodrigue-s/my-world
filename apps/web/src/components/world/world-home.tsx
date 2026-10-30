import { Emphasis, Heading, Plate, Text } from '@/components/ui'
import { IDENTITY } from '@/lib/portfolio-content'
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
        footer={
          <figure>
            <MapViewport hint={map.hint}>
              <WorldMap />
            </MapViewport>
            <figcaption className="sr-only">
              {map.label}. {IDENTITY.name}, {opening.owner.role}.
            </figcaption>
          </figure>
        }
      >
        <Heading as="h1" id="world-title" level="display" className="max-w-7xl">
          {opening.statement.before} <Emphasis>{opening.statement.emphasis}</Emphasis>
          {opening.statement.after}
        </Heading>
        <Text size="lead" color="muted" leading="relaxed" className="mt-6 max-w-3xl">
          {opening.lead}
        </Text>
      </Plate>
      <WorldAtlas />
      <WorldLogbook />
    </>
  )
}
