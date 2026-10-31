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

/**
 * What a study's Markdown turns into: every element is a piece of
 * @my-world/ui, so the text never carries styling of its own (ADR 0014).
 * Components a study may write by name:
 * - `<Quote text="…" source="…" />` — a citation with its source;
 * - `<Figure src="/studies/<slug>/…" alt="…" width="…" height="…" caption="…" credit="…" wide />`
 *   — an image with its caption (files live in `public/studies/<slug>/`).
 * Props are plain text: next-mdx-remote v6 strips `{…}` JavaScript expressions.
 */
export const mdxComponents: MDXRemoteProps['components'] = {
  h2: (props) => <Heading as="h2" level="title" className="mt-6" {...props} />,
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
