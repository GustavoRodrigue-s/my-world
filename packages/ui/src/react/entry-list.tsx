import Link from 'next/link'
import type { Route } from 'next'
import { Cover } from './cover'
import { Eyebrow } from './eyebrow'
import { Heading } from './heading'
import { Text } from './text'
import { cx } from './utils'

export interface IndexEntry {
  href: string
  title: string
  /** Mono label in the right column (category…). */
  kicker?: string
  summary?: string
  /** Mono lines under the kicker (reading time, date…). */
  meta?: string[]
  /** A small glyph before the first meta line (the Blog's <StrokeMark>). EntryList only. */
  mark?: React.ReactNode
  /** Gives the entry a picture; with no `src`, its gray plate. Decorative here: the title names the link. */
  cover?: { src?: string }
}

// The gold the kicker turns under the reader's hand: the Capela's is its
// `support`; elsewhere the gold is `hidden` (support has another role there).
const gildClasses = { support: 'group-hover:text-support', hidden: 'group-hover:text-hidden' } as const

type Gild = keyof typeof gildClasses

/**
 * A flat list of entries (posts, notes): the kicker and dates in a narrow
 * column, the serif title and summary beside them; an entry with a cover has
 * the picture in that column and the kicker and dates over the title.
 * Hairlines only between rows; no numbers, no arrows. Hover: the title takes
 * the rubric, the kicker gilds.
 */
export function EntryList({ items, gild = 'support' }: { items: IndexEntry[]; gild?: Gild }) {
  return (
    <ul className="list-none divide-y divide-border">
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href as Route}
            className={cx(
              'group grid gap-x-10 gap-y-3 py-8 text-foreground no-underline',
              item.cover
                ? 'md:grid-cols-[var(--size-width-xs)_minmax(0,1fr)] md:content-start'
                : 'md:grid-cols-[var(--size-width-2xs)_minmax(0,1fr)]'
            )}
          >
            {item.cover && (
              <Cover src={item.cover.src} ratio="thumb" sizes="(min-width: 768px) 224px, 100vw" className="md:row-span-2" />
            )}
            {(item.kicker || item.meta) && (
              <span
                className={cx(
                  'flex flex-wrap items-baseline gap-x-3 gap-y-1',
                  item.cover ? 'md:col-start-2' : 'md:flex-col md:gap-y-2 md:pt-2'
                )}
              >
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

/** The same entries as a row of cards, each led by its picture (the Blog's highlights, what to read next). */
export function EntryCards({ items, gild = 'support' }: { items: IndexEntry[]; gild?: Gild }) {
  return (
    <ul className="grid list-none gap-x-8 gap-y-10 md:grid-cols-3">
      {items.map((item) => (
        <li key={item.href}>
          <Link href={item.href as Route} className="group flex flex-col text-foreground no-underline">
            <Cover src={item.cover?.src} sizes="(min-width: 768px) 33vw, 100vw" className="mb-4" />
            {item.kicker && (
              <Eyebrow as="span" className={`mb-2 transition-colors duration-fast ${gildClasses[gild]}`}>
                {item.kicker}
              </Eyebrow>
            )}
            <Heading as="span" level="title-sm-serif" className="block transition-colors duration-fast group-hover:text-primary">
              {item.title}
            </Heading>
            {item.meta && item.meta.length > 0 && (
              <Text as="span" family="mono" size="xs" color="muted" className="mt-3 block">
                {item.meta.join(' · ')}
              </Text>
            )}
          </Link>
        </li>
      ))}
    </ul>
  )
}
