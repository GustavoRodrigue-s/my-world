import Link from 'next/link'
import type { Route } from 'next'
import { ArrowUpRight } from 'lucide-react'
import { Heading } from './heading'
import { Text } from './text'

export interface IndexEntry {
  href: string
  title: string
  /** Mono label in the right column (category…). */
  kicker?: string
  summary?: string
  /** Mono lines under the kicker (reading time, date…). */
  meta?: string[]
}

/**
 * Índice — a numbered register of entries, like the table of contents of a
 * bound volume. Each row is one link; the number is the rubric.
 */
export function IndexList({ items, start = 1 }: { items: IndexEntry[]; start?: number }) {
  return (
    <ol className="list-none border-t border-border-strong">
      {items.map((item, i) => (
        <li key={item.href} className="plot-rise border-b border-border">
          <Link
            href={item.href as Route}
            className="group grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 gap-y-3 py-6 text-foreground no-underline transition-colors duration-200 hover:bg-surface-alt-1 md:grid-cols-[3.5rem_minmax(0,1fr)_200px] md:gap-x-8 md:px-3"
          >
            <Text as="span" family="mono" size="md" color="accent" className="pt-1">
              {String(start + i).padStart(2, '0')}
            </Text>
            <span className="min-w-0">
              <Heading as="span" level="item" className="flex items-start gap-2">
                <span className="ink-link pb-0.5">{item.title}</span>
                <ArrowUpRight
                  size={16}
                  strokeWidth={1.5}
                  aria-hidden
                  className="mt-1 shrink-0 text-muted transition-transform duration-200 group-hover:text-accent motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                />
              </Heading>
              {item.summary && (
                <Text as="span" size="md" color="muted" leading="relaxed" className="mt-2 block max-w-[62ch]">
                  {item.summary}
                </Text>
              )}
            </span>
            {(item.kicker || item.meta) && (
              <span className="col-start-2 flex flex-wrap gap-x-3 gap-y-1 md:col-start-auto md:flex-col md:pt-1">
                {item.kicker && (
                  <Text as="span" family="mono" size="sm" color="accent">
                    {item.kicker}
                  </Text>
                )}
                {item.meta?.map((m) => (
                  <Text key={m} as="span" family="mono" size="sm" color="muted">
                    {m}
                  </Text>
                ))}
              </span>
            )}
          </Link>
        </li>
      ))}
    </ol>
  )
}
