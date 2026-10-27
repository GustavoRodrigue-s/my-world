import Link from 'next/link'
import type { Route } from 'next'
import { Mark, type MarkVariant } from './mark'
import { StatusTag, type StatusTone } from './status-tag'
import { Text } from './text'

const linkClass = 'ink-link font-sans text-sm text-foreground no-underline hover:text-primary'

export interface FooterLink {
  label: string
  href: string
  /** Opens in a new tab (profiles, other sites). `mailto:` links never do. */
  external?: boolean
  rel?: string
  /** For a link into an edition in another language. */
  hrefLang?: string
  /** A small mark before the label (e.g. another environment's). */
  mark?: { variant: MarkVariant; tone?: 'accent' | 'support' }
  /** A status tag after the label (e.g. a space that is still being built). */
  tag?: { tone: StatusTone; label: string }
  /** Listed but not followable: the place exists, the door is closed. */
  disabled?: boolean
}

interface SiteFooterProps {
  name: string
  mark?: { variant?: MarkVariant; tone?: 'accent' | 'support' }
  text: string
  columns: Array<{ title: string; links: FooterLink[] }>
  /** Mono notes on the bottom line (©, motto…). */
  notes: string[]
  /** The closing line, in the voice face. */
  verse?: string
}

function FooterAnchor({ link }: { link: FooterLink }) {
  const content = (
    <>
      {link.mark && <Mark variant={link.mark.variant} tone={link.mark.tone} size={18} />}
      {link.label}
    </>
  )
  const className = link.mark ? `${linkClass} inline-flex items-center gap-2` : linkClass
  if (link.disabled) {
    return (
      <span className="inline-flex items-center gap-2 font-sans text-sm text-foreground-muted">
        {content}
      </span>
    )
  }
  if (link.href.startsWith('mailto:')) {
    return (
      <a href={link.href} className={className}>
        {content}
      </a>
    )
  }
  if (link.external) {
    return (
      <a href={link.href} className={className} rel={link.rel ?? 'noopener'} target="_blank">
        {content}
      </a>
    )
  }
  return (
    <Link href={link.href as Route} hrefLang={link.hrefLang} lang={link.hrefLang} className={className}>
      {content}
    </Link>
  )
}

export function SiteFooter({ name, mark, text, columns, notes, verse }: SiteFooterProps) {
  return (
    <footer className="border-t border-border bg-surface print:hidden">
      <div className="section-inner grid gap-12 px-gutter md:px-gutter-wide py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div className="max-w-md">
          <div className="flex items-center gap-3 text-foreground">
            <Mark size={34} variant={mark?.variant} tone={mark?.tone} />
            <span className="font-sans text-lg font-semibold tracking-tight">{name}</span>
          </div>
          <Text size="sm" color="muted" leading="relaxed" className="mt-5">
            {text}
          </Text>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <Text family="mono" size="xs" color="muted" className="mb-4">
              {column.title}
            </Text>
            <ul className="flex list-none flex-col gap-2.5">
              {column.links.map((link) => (
                <li key={link.href + link.label} className={link.tag ? 'flex flex-wrap items-center gap-x-2.5 gap-y-1.5' : undefined}>
                  <FooterAnchor link={link} />
                  {link.tag && <StatusTag tone={link.tag.tone}>{link.tag.label}</StatusTag>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="section-inner flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 px-gutter md:px-gutter-wide py-5">
          {notes.map((note) => (
            <Text key={note} family="mono" size="xs" color="muted">
              {note}
            </Text>
          ))}
          {verse && (
            <Text as="span" family="serif" size="lg" color="muted" className="italic">
              {verse}
            </Text>
          )}
        </div>
      </div>
    </footer>
  )
}
