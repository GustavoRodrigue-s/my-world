import { Folio, Text } from '@/components/ui'
import { LOGBOOK, logDate } from '@/lib/logbook'
import { WORLD } from '@/lib/world-content'

const SHOWN = 6

/** Diário de bordo: the latest changes in the world, newest first. */
export function WorldLogbook() {
  const { logbook, places } = WORLD
  const entries = [...LOGBOOK].sort((a, b) => b.date.localeCompare(a.date)).slice(0, SHOWN)
  return (
    <Folio id="logbook" index="02" label={logbook.label} note={logbook.note} title={logbook.title} bg="alt-1">
      <ol className="list-none border-t border-border-strong">
        {entries.map((entry) => (
          <li
            key={`${entry.date}-${entry.text}`}
            className="plot-rise grid gap-x-8 gap-y-1 border-b border-border py-4 sm:grid-cols-[120px_minmax(0,1fr)_auto] sm:items-baseline"
          >
            <Text as="span" family="mono" size="md" color="accent">
              <time dateTime={entry.date}>{logDate(entry.date)}</time>
            </Text>
            <Text as="span" size="base" color="foreground" leading="snug">
              {entry.text}
            </Text>
            <Text as="span" family="mono" size="sm" color="muted">
              {entry.space ? places[entry.space].name.toLowerCase() : logbook.world}
            </Text>
          </li>
        ))}
      </ol>
    </Folio>
  )
}
