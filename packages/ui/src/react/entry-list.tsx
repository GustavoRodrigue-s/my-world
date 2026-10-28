import Link from 'next/link'
import type { Route } from 'next'
import { Eyebrow } from './eyebrow'
import { Heading } from './heading'
import type { IndexEntry } from './index-list'
import { Text } from './text'
import { cx } from './utils'

// The gold the kicker turns under the reader's hand: the Capela's is its
// `support`; elsewhere the gold is `hidden` (support has another role there).
const gildClasses = { support: 'group-hover:text-support', hidden: 'group-hover:text-hidden' } as const

/**
 * A flat list of entries (studies, notes): the kicker and dates in a narrow
 * column, the serif title and summary beside them. Hairlines only between
 * rows; no numbers, no arrows. Hover: the title takes the rubric, the kicker gilds.
 */
export function EntryList({ items, gild = 'support' }: { items: IndexEntry[]; gild?: keyof typeof gildClasses }) {
  return (
    <ul className="list-none divide-y divide-border">
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href as Route}
            className="group grid gap-x-10 gap-y-3 py-8 text-foreground no-underline md:grid-cols-[var(--size-width-2xs)_minmax(0,1fr)]"
          >
            {(item.kicker || item.meta) && (
              <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1 md:flex-col md:gap-y-2 md:pt-2">
                {item.kicker && (
                  // The rubric gilds under the reader's hand.
                  <Eyebrow as="span" className={`transition-colors duration-fast ${gildClasses[gild]}`}>
                    {item.kicker}
                  </Eyebrow>
                )}
                {item.meta?.map((m, i) => (
                  <Text key={m} as="span" family="mono" size="xs" color="muted" className={cx(i === 0 && item.mark != null && 'inline-flex items-center gap-2')}>
                    {i === 0 && item.mark}
                    {m}
                  </Text>
                ))}
              </span>
            )}
            <span className="min-w-0 md:col-start-2">
              <Heading
                as="span"
                level="title-sm-serif"
                className="block max-w-xl transition-colors duration-fast group-hover:text-primary"
              >
                {item.title}
              </Heading>
              {item.summary && (
                <Text as="span" size="base" color="muted" leading="relaxed" className="mt-2 block max-w-2xl">
                  {item.summary}
                </Text>
              )}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
