import Link from 'next/link'
import type { Route } from 'next'
import { Heading } from './heading'
import { Seal } from './seal'
import { Text } from './text'
import { cx } from './utils'

function Label({ children }: { children: React.ReactNode }) {
  return (
    <Text family="mono" size="xs" color="muted" className="mb-2.5">
      {children}
    </Text>
  )
}

export interface SpecSheetProps {
  /** Anchor and heading id prefix; also seeds the seal unless `seal` is given. */
  id: string
  seal?: string
  /** Light the seal's satellite (live work). */
  lit?: boolean
  code: string
  tag?: React.ReactNode
  /** Mono lines under the code: org, period, kind… */
  meta: string[]
  title: string
  /** Makes the title a link (e.g. to the study it files). */
  href?: string
  lead: string
  /** Labeled paragraphs; `marked` ones get the rubric rule (a decision, a note). */
  details?: Array<{ label: string; text: string; marked?: boolean }>
  /** Small mono note at the end of the text column. */
  footnote?: string
  /** A closing action under the text (a link styled as a button…). */
  action?: React.ReactNode
  features?: { label: string; items: string[] }
  stack?: { label: string; items: string[] }
}

/**
 * Ficha técnica — every piece of work is filed the same way: what it is, what
 * it does, what was done, what it's made of. Hover: the seal turns a few
 * degrees, like a stamp being set.
 */
export function SpecSheet({ id, seal, lit, code, tag, meta, title, href, lead, details, footnote, action, features, stack }: SpecSheetProps) {
  const side = features || stack
  return (
    <article
      aria-labelledby={`${id}-title`}
      className={cx(
        'group plot-rise grid gap-x-10 gap-y-7 border-t border-border-strong py-10 transition-colors duration-normal hover:border-foreground md:grid-cols-[var(--size-width-xs)_minmax(0,1fr)]',
        side && 'xl:grid-cols-[var(--size-width-xs)_minmax(0,1.15fr)_minmax(0,1fr)]'
      )}
    >
      <div className="flex items-start gap-4 md:flex-col">
        <Seal
          seed={seal ?? id}
          size={56}
          lit={lit}
          className="transition-transform duration-slow ease-out motion-safe:group-hover:rotate-[24deg]"
        />
        <div className="flex flex-col gap-2.5">
          <Text family="mono" size="sm" color="primary">
            {code}
          </Text>
          {tag && <div className="self-start">{tag}</div>}
          <Text family="mono" size="xs" color="muted" leading="relaxed">
            {meta.map((line, i) => (
              <span key={line} className="block">
                {line}
                {i < meta.length - 1 && <span className="sr-only">, </span>}
              </span>
            ))}
          </Text>
        </div>
      </div>

      <div>
        <Heading as="h3" id={`${id}-title`} level="title">
          {href ? (
            <Link href={href as Route} className="ink-link text-foreground no-underline hover:text-primary">
              {title}
            </Link>
          ) : (
            title
          )}
        </Heading>
        <Text size="lg" color="foreground" leading="relaxed" className="mt-3 max-w-2xl">
          {lead}
        </Text>
        {details?.map((d) => (
          <div key={d.label} className={cx('mt-6', d.marked && 'border-l-2 border-primary pl-4')}>
            <Label>{d.label}</Label>
            <Text size="base" color="muted" leading="relaxed" className="max-w-lg">
              {d.text}
            </Text>
          </div>
        ))}
        {footnote && (
          <Text family="mono" size="xs" color="muted" className="mt-6">
            {footnote}
          </Text>
        )}
        {action && <div className="mt-8">{action}</div>}
      </div>

      {side && (
        <div className="md:col-start-2 xl:col-start-auto">
          {features && (
            <>
              <Label>{features.label}</Label>
              <ul className="list-none border-t border-border">
                {features.items.map((item) => (
                  <li key={item} className="flex gap-3 border-b border-border py-2.5">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 bg-foreground" />
                    <Text as="span" size="base" color="foreground" leading="snug">
                      {item}
                    </Text>
                  </li>
                ))}
              </ul>
            </>
          )}
          {stack && (
            <div className={cx(features && 'mt-6')}>
              <Label>{stack.label}</Label>
              <Text family="mono" size="sm" color="foreground" leading="relaxed">
                {stack.items.join(' / ')}
              </Text>
            </div>
          )}
        </div>
      )}
    </article>
  )
}
