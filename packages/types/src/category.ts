export interface Category {
  id: number
  documentId: string
  name: string
  slug: string
  description: string | null
  icon: string | null
  articleCount?: number
  createdAt: string
  updatedAt: string
}
