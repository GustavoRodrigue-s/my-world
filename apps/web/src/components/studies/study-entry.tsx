import type { StudyFormat, StudyMeta, StudyTheme } from '@my-world/types'
import type { IndexEntry } from '@/components/ui'
import { STUDIES, studiesPath } from '@/lib/studies-content'
import { formatDate, formatReadingTime } from '@/lib/utils'
import { FormatMark } from './format-mark'

export type StudyEntry = IndexEntry & { theme: StudyTheme; format: StudyFormat }

/** A study as an <EntryList> row. Built on the server (dates are formatted there, never in the browser). */
export function studyEntry(s: StudyMeta): StudyEntry {
  return {
    href: studiesPath(s.slug),
    title: s.title,
    summary: s.summary,
    kicker: STUDIES.themes[s.theme].name,
    meta: [STUDIES.formats[s.format].name, formatReadingTime(s.readingTime), formatDate(s.publishedAt)],
    mark: <FormatMark format={s.format} />,
    theme: s.theme,
    format: s.format,
  }
}
