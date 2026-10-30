import { Folio, Text } from '@/components/ui'
import { LOGBOOK, logDate, type LogEntry } from '@/lib/logbook'
import { WORLD } from '@/lib/world-content'

const SHOWN = 6

/** The latest entries, newest first, gathered by day. */
function latestDays(): Array<{ date: string; entries: LogEntry[] }> {
  const days: Array<{ date: string; entries: LogEntry[] }> = []
  const latest = [...LOGBOOK].sort((a, b) => b.date.localeCompare(a.date)).slice(0, SHOWN)
  for (const entry of latest) {
    const day = days.at(-1)
    if (day?.date === entry.date) day.entries.push(entry)
    else days.push({ date: entry.date, entries: [entry] })
  }
  return days
}

/** Diário de bordo: a written record, still on the page — the date in the margin, then what happened and where. */
export function WorldLogbook() {
  const { logbook, places } = WORLD
  return (
    <Folio id="logbook" index="02" label={logbook.label} note={logbook.note} title={logbook.title} bg="muted" still>
      <ol className="list-none border-y border-border-strong">
        {latestDays().map((day) => (
          <li
            key={day.date}
            className="grid gap-y-3 border-b border-border py-5 last:border-b-0 sm:grid-cols-[var(--size-width-4xs)_minmax(0,1fr)]"
          >
            <Text as="span" family="mono" size="sm" color="muted">
              <time dateTime={day.date}>{logDate(day.date)}</time>
            </Text>
            <ol className="grid list-none gap-y-4 sm:border-l sm:border-border sm:pl-8">
              {day.entries.map((entry) => (
                <li key={entry.text}>
                  <Text as="span" size="base" color="foreground" leading="snug" className="block">
                    {entry.text}
                  </Text>
                  <Text as="span" family="mono" size="xs" color="muted" className="mt-1 block">
                    {entry.space ? places[entry.space].place.toLowerCase() : logbook.world}
                  </Text>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </Folio>
  )
}
