import type { ArticleCard } from '@my-world/types'
import type { IndexEntry } from '@/components/ui'
import { chapelPath } from '@/lib/chapel-content'
import { formatDate, formatReadingTime } from '@/lib/utils'

export type StudyEntry = IndexEntry & { category?: string }

/** A study as an <EntryList> row. Built on the server (dates are formatted there, never in the browser). */
export function studyEntry(a: ArticleCard): StudyEntry {
  return {
    href: chapelPath('/articles', a.slug),
    title: a.title,
    summary: a.summary,
    kicker: a.category?.name,
    meta: [formatReadingTime(a.readingTime), ...(a.publishedAt ? [formatDate(a.publishedAt)] : [])],
    category: a.category?.slug,
  }
}
