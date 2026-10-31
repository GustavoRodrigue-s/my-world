import type { Category } from './category'
import type { Tag } from './tag'

export type ArticleStatus = 'draft' | 'published' | 'archived'

export interface Article {
  id: number
  documentId: string
  title: string
  slug: string
  summary: string
  content: string
  readingTime: number
  publishedAt: string | null
  status: ArticleStatus
  category: Category | null
  tags: Tag[]
  references: string[]
  createdAt: string
  updatedAt: string
}

export interface ArticleCard
  extends Pick<Article, 'id' | 'documentId' | 'title' | 'slug' | 'summary' | 'readingTime' | 'publishedAt' | 'category'> {}
