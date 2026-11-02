import type { PostFormat, PostMeta, PostTheme } from '@my-world/types'
import type { IndexEntry } from '@/components/ui'
import { BLOG, blogPath } from '@/lib/blog-content'
import { formatDate, formatReadingTime } from '@/lib/utils'
import { FormatMark } from './format-mark'

export type PostEntry = IndexEntry & { theme: PostTheme; format: PostFormat; tags: string[] }

/** A post as an <EntryList> row. Built on the server (dates are formatted there, never in the browser). */
export function postEntry(s: PostMeta): PostEntry {
  return {
    href: blogPath(s.slug),
    title: s.title,
    summary: s.summary,
    kicker: BLOG.themes[s.theme].name,
    meta: [BLOG.formats[s.format].name, formatReadingTime(s.readingTime), formatDate(s.publishedAt)],
    mark: <FormatMark format={s.format} />,
    cover: { src: s.cover?.src },
    theme: s.theme,
    format: s.format,
    tags: s.tags,
  }
}
