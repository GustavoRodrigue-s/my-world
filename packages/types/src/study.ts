// A study of Estudos: an MDX file in apps/web/content/studies (ADR 0014).

/** Ink (finished) or pencil (a note in the margin) — the finish, not the subject. */
export type StudyFormat = 'article' | 'note'

export type StudyTheme = 'tecnologia' | 'economia' | 'vida-espiritual' | 'filosofia'

export type StudyStatus = 'draft' | 'published'

/** What the index needs: the front matter plus what the loader derives. */
export interface StudyMeta {
  slug: string
  title: string
  summary: string
  format: StudyFormat
  theme: StudyTheme
  status: StudyStatus
  /** ISO date (YYYY-MM-DD). */
  publishedAt: string
  updatedAt?: string
  tags: string[]
  references: string[]
  /** The article this note grew into. */
  maturedInto?: string
  /** false hides the comments area for this study. */
  comments: boolean
  /** Minutes, computed from the text. */
  readingTime: number
}
