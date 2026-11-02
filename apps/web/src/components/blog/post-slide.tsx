import Link from 'next/link'
import type { PostMeta } from '@my-world/types'
import { Cover, Eyebrow, Heading, Text, buttonClasses } from '@/components/ui'
import { BLOG, blogPath } from '@/lib/blog-content'

/**
 * One slide of the index's carousel: the post's picture with its title on a
 * paper label, so the words stay legible over any image, in both modes.
 */
export function PostSlide({ post, first = false }: { post: PostMeta; first?: boolean }) {
  return (
    <Link href={blogPath(post.slug)} className="group relative block text-foreground no-underline">
      <Cover src={post.cover?.src} ratio="wide" sizes="(min-width: 1180px) 1180px, 100vw" priority={first} />
      <span className="mt-4 flex flex-col items-start lg:absolute lg:bottom-8 lg:left-8 lg:mt-0 lg:max-w-lg lg:rounded-xs lg:border lg:border-border lg:bg-surface lg:p-8">
        <Eyebrow as="span" className="mb-3">
          {BLOG.themes[post.theme].name}
        </Eyebrow>
        <Heading as="span" level="title" className="block transition-colors duration-fast group-hover:text-primary">
          {post.title}
        </Heading>
        <Text as="span" size="base" color="muted" leading="relaxed" className="mt-3 line-clamp-3">
          {post.summary}
        </Text>
        <span className={`${buttonClasses({ variant: 'ink' })} mt-6`}>{BLOG.index.carousel.read}</span>
      </span>
    </Link>
  )
}
