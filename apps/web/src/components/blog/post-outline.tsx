import type { PostHeading } from '@my-world/types'
import { Text } from '@/components/ui'
import { BLOG } from '@/lib/blog-content'

/** What a post covers: its `##` sections, as links in the margin. Wide screens only; on a phone the text comes first. */
export function PostOutline({ headings }: { headings: PostHeading[] }) {
  if (headings.length < 2) return null
  return (
    <nav aria-label={BLOG.post.outline} className="mt-8 hidden lg:block">
      <Text family="mono" size="xs" color="muted" className="mb-3">
        {BLOG.post.outline}
      </Text>
      <ul className="list-none border-t border-border-strong">
        {headings.map((heading) => (
          <li key={heading.id} className="border-b border-border">
            <a
              href={`#${heading.id}`}
              className="block py-2 text-sm leading-snug text-foreground-muted no-underline transition-colors duration-fast hover:text-primary"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
