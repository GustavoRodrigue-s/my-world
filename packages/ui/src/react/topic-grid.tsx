import Link from 'next/link'
import type { Route } from 'next'
import { Heading } from './heading'
import { Text } from './text'

export interface Topic {
  href: string
  name: string
  description?: string
  /** Mono count line, e.g. "12 estudos". */
  count?: string
}

/**
 * A ruled grid of topics (each cell is a link). The grid is drawn with 1px
 * gaps over the border color, so it rises as one piece — never cell by cell.
 */
export function TopicGrid({ topics }: { topics: Topic[] }) {
  return (
    <ul className="plot-rise grid list-none gap-px border border-border-strong bg-border-strong sm:grid-cols-2 lg:grid-cols-3">
      {topics.map((t, i) => (
        <li key={t.href} className="bg-surface">
          <Link
            href={t.href as Route}
            className="group flex h-full flex-col gap-2 p-6 text-foreground no-underline transition-colors duration-200 hover:bg-surface-alt-1"
          >
            <span className="flex items-baseline justify-between gap-4">
              <Text as="span" family="mono" size="sm" color="accent">
                {String(i + 1).padStart(2, '0')}
              </Text>
              {t.count && (
                <Text as="span" family="mono" size="sm" color="muted">
                  {t.count}
                </Text>
              )}
            </span>
            <Heading as="span" level="item">
              <span className="ink-link pb-0.5">{t.name}</span>
            </Heading>
            {t.description && (
              <Text as="span" size="md" color="muted" leading="relaxed">
                {t.description}
              </Text>
            )}
          </Link>
        </li>
      ))}
    </ul>
  )
}
