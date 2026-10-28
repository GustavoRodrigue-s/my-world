import { cx } from './utils'

// Running text written in Markdown/MDX (Estudos): the elements a writer
// reaches for that the primitives (Heading, Text, Quote) don't already cover.

/** A link inside running text: rubric ink, the hairline drawn on hover. External links open apart. */
export function ProseLink({ href = '', className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const external = /^https?:\/\//.test(href)
  return (
    <a
      href={href}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      className={cx('ink-link text-primary no-underline', className)}
      {...props}
    />
  )
}

/** A bulleted or numbered list; its items are `<Text as="li">`. */
export function ProseList({ ordered = false, className, ...props }: React.HTMLAttributes<HTMLElement> & { ordered?: boolean }) {
  const Tag = ordered ? 'ol' : 'ul'
  return (
    <Tag
      className={cx(
        'flex max-w-measure flex-col gap-2 marker:text-foreground-subtle',
        ordered ? 'list-decimal pl-8 marker:font-mono' : 'list-disc pl-6',
        className
      )}
      {...props}
    />
  )
}

/** A quotation written with `>`: the rubric rule, its paragraphs in the voice face. */
export function ProseQuote({ className, ...props }: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote
      className={cx(
        'flex max-w-measure flex-col gap-3 border-l-2 border-primary py-1 pl-6',
        '[&_p]:font-serif [&_p]:text-quote-sm [&_p]:text-foreground [&_p]:italic',
        className
      )}
      {...props}
    />
  )
}

/** Inline code, in the annotation hand. */
export function ProseCode({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <code className={cx('rounded-xs bg-surface-muted px-1 font-mono text-sm text-foreground', className)} {...props} />
}

/** A thematic break: one hairline. */
export function ProseRule({ className }: { className?: string }) {
  return <hr className={cx('my-4 max-w-measure border-border-strong', className)} />
}
