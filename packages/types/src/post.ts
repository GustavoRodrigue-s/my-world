// A post of the Blog: an MDX file in apps/web/content/blog (ADR 0014).

/** Ink (finished) or pencil (a note in the margin) — the finish, not the subject. */
export type PostFormat = 'article' | 'note'

export type PostTheme = 'tecnologia' | 'economia' | 'vida-espiritual' | 'filosofia'

export type PostStatus = 'draft' | 'published'

/** A post's picture: a file in public/blog/<slug>/. */
export interface PostCover {
  src: string
  alt: string
  /** Source or license. */
  credit?: string
}

/** One of a post's `##` sections. */
export interface PostHeading {
  id: string
  text: string
}

/** What the index needs: the front matter plus what the loader derives. */
export interface PostMeta {
  slug: string
  title: string
  summary: string
  format: PostFormat
  theme: PostTheme
  status: PostStatus
  /** ISO date (YYYY-MM-DD). */
  publishedAt: string
  updatedAt?: string
  tags: string[]
  references: string[]
  /** The article this note grew into. */
  maturedInto?: string
  /** Until it has one, a gray plate holds its place. */
  cover?: PostCover
  /** false hides the comments area for this post. */
  comments: boolean
  /** Minutes, computed from the text. */
  readingTime: number
}
