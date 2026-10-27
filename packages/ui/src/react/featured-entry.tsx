import Link from 'next/link'
import type { Route } from 'next'
import { Eyebrow } from './eyebrow'
import { Heading } from './heading'
import { Text } from './text'
import { cx } from './utils'

interface FeaturedEntryProps {
  /** Heading id prefix. */
  id: string
  /** Small red label ("em destaque"). */
  label: string
  title: string
  href: string
  lead?: string
  /** Mono lines beside the label (theme, reading time, date…). */
  meta?: string[]
  /** A closing action under the lead (a link styled as a button). */
  action?: React.ReactNode
  /** `niche`: a low arch on top and a gold fillet that lights up on hover. */
  shape?: 'flat' | 'niche'
}

/** One entry set apart: a flat stone panel, the label and dates aside, the serif title and lead. */
export function FeaturedEntry({ id, label, title, href, lead, meta, action, shape = 'flat' }: FeaturedEntryProps) {
  const niche = shape === 'niche'
  return (
    <article
      aria-labelledby={`${id}-title`}
      className={cx(
        'group relative grid gap-x-10 gap-y-6 rounded-xs bg-surface-muted p-7 md:grid-cols-[var(--size-width-2xs)_minmax(0,1fr)] md:p-12',
        niche && 'rounded-t-[50%_var(--radius-arch)] pt-14 md:pt-20'
      )}
    >
      {niche && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-2 rounded-xs rounded-t-[50%_var(--radius-arch-inner)] border border-support opacity-faint transition-opacity duration-slow group-hover:opacity-100 group-focus-within:opacity-100"
        />
      )}
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2 md:flex-col md:pt-2">
        <Eyebrow as="span">{label}</Eyebrow>
        {meta?.map((m) => (
          <Text key={m} as="span" family="mono" size="xs" color="muted">
            {m}
          </Text>
        ))}
      </div>
      <div>
        <Heading as="h3" id={`${id}-title`} level="title-serif" className="max-w-xl">
          <Link
            href={href as Route}
            className="text-foreground no-underline transition-colors duration-fast hover:text-primary"
          >
            {title}
          </Link>
        </Heading>
        {lead && (
          <Text size="lg" color="foreground" leading="relaxed" className="mt-4 max-w-3xl">
            {lead}
          </Text>
        )}
        {action && <div className="mt-8">{action}</div>}
      </div>
    </article>
  )
}
