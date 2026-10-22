import Link from 'next/link'
import type { Route } from 'next'
import { Heading } from './heading'
import type { Topic } from './topic-grid'
import { Text } from './text'
import { cx } from './utils'

interface TileGridProps {
  topics: Topic[]
  /** The band the grid sits on: tiles take the other flat tone (stone on the page, page on stone). */
  on?: 'surface' | 'stone'
  /** A gold fillet lights up inside the tile under the reader's hand (the Capela's hidden gold). */
  gilded?: boolean
}

/**
 * Flat tiles of topics: solid blocks with a little air between them — no
 * rules, no numbers. Hover: the name takes the rubric.
 */
export function TileGrid({ topics, on = 'surface', gilded }: TileGridProps) {
  return (
    <ul className="grid list-none gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {topics.map((t) => (
        <li key={t.href}>
          <Link
            href={t.href as Route}
            className={cx(
              'group relative flex h-full flex-col gap-3 rounded-xs p-7 text-foreground no-underline md:p-8',
              on === 'stone' ? 'bg-surface' : 'bg-surface-alt-1'
            )}
          >
            {gilded && (
              <span
                aria-hidden
                className="pointer-events-none absolute inset-1.5 rounded-xs border border-support-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
              />
            )}
            <Heading
              as="span"
              level="serif-subtitle"
              className="transition-colors duration-[var(--transition-fast)] group-hover:text-accent"
            >
              {t.name}
            </Heading>
            {t.description && (
              <Text as="span" size="base" color="muted" leading="relaxed">
                {t.description}
              </Text>
            )}
            {t.count && (
              <Text as="span" family="mono" size="sm" color="muted" className="mt-auto pt-4">
                {t.count}
              </Text>
            )}
          </Link>
        </li>
      ))}
    </ul>
  )
}
