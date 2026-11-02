import { Children, isValidElement, type ReactNode } from 'react'
import type { MDXRemoteProps } from 'next-mdx-remote/rsc'
import {
  Heading,
  ProseCode,
  ProseFigure,
  ProseLink,
  ProseList,
  ProsePre,
  ProseQuote,
  ProseRule,
  ProseTable,
  Quote,
  Text,
} from '@/components/ui'
import { headingId } from '@/lib/utils'

/** A heading's words, through whatever marks it carries. */
function plainText(node: ReactNode): string {
  return Children.toArray(node)
    .map((child) => (isValidElement<{ children?: ReactNode }>(child) ? plainText(child.props.children) : String(child)))
    .join('')
}

/**
 * What a post's Markdown turns into: every element is a piece of
 * @my-world/ui, so the text never carries styling of its own (ADR 0014).
 * Components a post may write by name:
 * - `<Quote text="…" source="…" />` — a citation with its source;
 * - `<Figure src="/blog/<slug>/…" alt="…" width="…" height="…" caption="…" credit="…" wide />`
 *   — an image with its caption (files live in `public/blog/<slug>/`).
 * Props are plain text: next-mdx-remote v6 strips `{…}` JavaScript expressions.
 */
export const mdxComponents: MDXRemoteProps['components'] = {
  h2: (props) => <Heading as="h2" id={headingId(plainText(props.children))} level="title" className="mt-6 scroll-mt-bar" {...props} />,
  h3: (props) => <Heading as="h3" level="title-sm" className="mt-4" {...props} />,
  p: (props) => <Text size="lg" color="foreground" leading="relaxed" className="max-w-measure" {...props} />,
  ul: (props) => <ProseList {...props} />,
  ol: (props) => <ProseList ordered {...props} />,
  li: (props) => <Text as="li" size="lg" color="foreground" leading="relaxed" {...props} />,
  a: (props) => <ProseLink {...props} />,
  blockquote: (props) => <ProseQuote {...props} />,
  code: (props) => <ProseCode {...props} />,
  pre: (props) => <ProsePre {...props} />,
  table: (props) => <ProseTable {...props} />,
  hr: () => <ProseRule />,
  Quote,
  Figure: ProseFigure,
}
