import type { MDXRemoteProps } from 'next-mdx-remote/rsc'
import { Heading, ProseCode, ProseLink, ProseList, ProseQuote, ProseRule, Quote, Text } from '@/components/ui'

/**
 * What a study's Markdown turns into: every element is a piece of
 * @my-world/ui, so the text never carries styling of its own (ADR 0014).
 * `<Quote text="…" source="…" />` is available for a citation with its source.
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
  hr: () => <ProseRule />,
  Quote,
}
