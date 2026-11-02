import { Byline } from '@/components/ui'
import { PORTRAIT_SRC } from '@/lib/portfolio-content'
import { BLOG } from '@/lib/blog-content'

const portrait = PORTRAIT_SRC ? { src: PORTRAIT_SRC, alt: `Retrato de ${BLOG.author}` } : undefined

/**
 * The author's signature on a post: face and name, with the dates under the
 * title, or the byline line at the end of the text (ADR 0019).
 */
export function PostByline({ role }: { role: string }) {
  return <Byline plain name={BLOG.author} role={role} portrait={portrait} />
}
