import Link from 'next/link'
import type { Route } from 'next'
import { Mark } from './mark'
import type { FooterLink } from './site-footer'

const linkClass = 'ink-link font-sans text-sm text-foreground no-underline hover:text-primary'

export function FooterAnchor({ link }: { link: FooterLink }) {
  const content = (
    <>
      {link.mark && <Mark variant={link.mark.variant} tone={link.mark.tone} size="lg" />}
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
