import Link from 'next/link'
import type { Route } from 'next'
import { Mark, type MarkVariant } from './mark'
import { Text } from './text'

const linkClass = 'ink-link font-sans text-[14px] text-foreground no-underline hover:text-accent'

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
      <div className="section-inner grid gap-12 px-[var(--spacing-section-x)] py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div className="max-w-[340px]">
          <div className="flex items-center gap-3 text-foreground">
            <Mark size={34} variant={mark?.variant} tone={mark?.tone} />
            <span className="font-sans text-[17px] font-semibold tracking-[-0.02em]">{name}</span>
          </div>
          <Text size="md" color="muted" leading="relaxed" className="mt-5">
            {text}
          </Text>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <Text family="mono" size="sm" color="muted" className="mb-4">
              {column.title}
            </Text>
            <ul className="flex list-none flex-col gap-2.5">
              {column.links.map((link) => (
                <li key={link.href + link.label}>
                  <FooterAnchor link={link} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="section-inner flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 px-[var(--spacing-section-x)] py-5">
          {notes.map((note) => (
            <Text key={note} family="mono" size="sm" color="muted">
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
