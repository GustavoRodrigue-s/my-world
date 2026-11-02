import Image from 'next/image'
import { cx } from './utils'

// Running text written in Markdown/MDX (Blog): the elements a writer
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

/**
 * A fenced code block: ink on the muted page, no syntax colors (one chromatic
 * color). Long lines scroll inside the block, never the page.
 */
export function ProsePre({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  return (
    <pre
      className={cx(
        'max-w-measure overflow-x-auto rounded-xs border border-border bg-surface-muted p-4 font-mono text-sm leading-relaxed text-foreground',
        // The inline-code chip doesn't apply inside a block.
        '[&_code]:rounded-none [&_code]:bg-transparent [&_code]:p-0',
        className
      )}
      {...props}
    />
  )
}

/** A Markdown table: hairlines, a mono head; wide tables scroll inside their frame. */
export function ProseTable({ className, ...props }: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="max-w-measure overflow-x-auto">
      <table
        className={cx(
          'w-full border-collapse border-t border-border-strong text-left',
          '[&_th]:border-b [&_th]:border-border-strong [&_th]:px-3 [&_th]:py-2 [&_th]:align-bottom [&_th]:font-mono [&_th]:text-xs [&_th]:font-regular [&_th]:text-foreground-muted',
          '[&_td]:border-b [&_td]:border-border [&_td]:px-3 [&_td]:py-3 [&_td]:align-top [&_td]:text-base [&_td]:text-foreground',
          '[&_th:first-child]:pl-0 [&_td:first-child]:pl-0',
          className
        )}
        {...props}
      />
    </div>
  )
}

interface ProseFigureProps {
  /** A file in /public (or an allowed remote). Its own background: a figure is a plate, it doesn't follow day/night. */
  src: string
  alt: string
  /** Intrinsic size in pixels. Text is accepted: MDX (next-mdx-remote v6) drops `{…}` expressions, so posts write `width="1200"`. */
  width: number | string
  height: number | string
  caption?: React.ReactNode
  /** Source or license, after the caption. */
  credit?: string
  /** As wide as the text column, instead of the reading measure. */
  wide?: boolean
  className?: string
}

/** An image with its caption: a hairline frame, the caption in the annotation hand. */
export function ProseFigure({ src, alt, width, height, caption, credit, wide = false, className }: ProseFigureProps) {
  return (
    <figure className={cx('my-4 flex flex-col gap-3', wide ? 'max-w-none' : 'max-w-measure', className)}>
      <Image
        src={src}
        alt={alt}
        width={Number(width)}
        height={Number(height)}
        sizes={wide ? '(min-width: 1024px) 60vw, 100vw' : '(min-width: 1024px) 50vw, 100vw'}
        // SVG figures are served as they are (no raster optimization).
        unoptimized={src.endsWith('.svg')}
        className="h-auto w-full rounded-xs border border-border"
      />
      {(caption || credit) && (
        <figcaption className="font-mono text-xs leading-relaxed text-foreground-muted">
          {caption}
          {caption && credit && <span aria-hidden> · </span>}
          {credit && <span className="text-foreground-subtle">{credit}</span>}
        </figcaption>
      )}
    </figure>
  )
}
