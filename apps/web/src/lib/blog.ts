// The Blog's content: MDX files in content/blog, read at build time
// (ADR 0014). The file name is the slug. The front matter is checked here: a
// post with a missing or wrong field fails the build instead of rendering
// half a page. Server only (reads the file system).
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { cache } from 'react'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import type { PostCover, PostHeading, PostMeta, PostStatus } from '@my-world/types'
import { mdxComponents } from '@/components/blog/mdx-components'
import { BLOG, POLICY_SLUG, POST_FORMATS, POST_THEMES } from '@/lib/blog-content'
import { headingId } from '@/lib/utils'
import { canSeeUnderConstruction } from '@/lib/world'

const DIR = path.join(process.cwd(), 'content/blog')
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const DATE = /^\d{4}-\d{2}-\d{2}$/
const STATUSES: PostStatus[] = ['draft', 'published']
/** Reading speed for the time estimate, in words per minute. */
const WORDS_PER_MINUTE = 200

export interface Post extends PostMeta {
  content: React.ReactElement
  /** The text's `##` sections, for the margin. */
  headings: PostHeading[]
}

function fail(slug: string, message: string): never {
  throw new Error(`content/blog/${slug}.mdx: ${message}`)
}

function oneOf<T extends string>(slug: string, field: string, value: unknown, allowed: readonly T[]): T {
  if (typeof value === 'string' && (allowed as readonly string[]).includes(value)) return value as T
  return fail(slug, `"${field}" must be one of ${allowed.join(', ')} (got ${JSON.stringify(value)})`)
}

function text(slug: string, field: string, value: unknown): string {
  if (typeof value === 'string' && value.trim()) return value.trim()
  return fail(slug, `"${field}" is required`)
}

/** YAML may hand a date over as a Date; keep it as YYYY-MM-DD. */
function date(slug: string, field: string, value: unknown): string {
  const s = value instanceof Date ? value.toISOString().slice(0, 10) : value
  if (typeof s === 'string' && DATE.test(s)) return s
  return fail(slug, `"${field}" must be a date (YYYY-MM-DD)`)
}

function list(slug: string, field: string, value: unknown): string[] {
  if (value === undefined) return []
  if (Array.isArray(value) && value.every((v) => typeof v === 'string')) return value
  return fail(slug, `"${field}" must be a list of text`)
}

function cover(slug: string, data: Record<string, unknown>): PostCover | undefined {
  if (data.cover === undefined) return undefined
  return {
    src: text(slug, 'cover', data.cover),
    alt: text(slug, 'coverAlt', data.coverAlt),
    credit: data.coverCredit === undefined ? undefined : text(slug, 'coverCredit', data.coverCredit),
  }
}

/** The `##` headings of the text, outside code blocks, with Markdown marks taken off. */
function outline(body: string): PostHeading[] {
  return [...body.replace(/^```[\s\S]*?^```/gm, '').matchAll(/^## +(.+)$/gm)].map(([, heading]) => {
    const plain = heading.replace(/[*_`]/g, '').trim()
    return { id: headingId(plain), text: plain }
  })
}

function readMeta(slug: string, data: Record<string, unknown>, body: string): PostMeta {
  const words = body.split(/\s+/).filter(Boolean).length
  return {
    slug,
    title: text(slug, 'title', data.title),
    summary: text(slug, 'summary', data.summary),
    format: oneOf(slug, 'format', data.format, POST_FORMATS),
    theme: oneOf(slug, 'theme', data.theme, POST_THEMES),
    status: oneOf(slug, 'status', data.status, STATUSES),
    publishedAt: date(slug, 'publishedAt', data.publishedAt),
    updatedAt: data.updatedAt === undefined ? undefined : date(slug, 'updatedAt', data.updatedAt),
    tags: list(slug, 'tags', data.tags),
    references: list(slug, 'references', data.references),
    maturedInto: data.maturedInto === undefined ? undefined : text(slug, 'maturedInto', data.maturedInto),
    cover: cover(slug, data),
    comments: data.comments !== false,
    readingTime: Math.max(1, Math.ceil(words / WORDS_PER_MINUTE)),
  }
}

/** Drafts are seen where unfinished work is (dev, previews), never in production. */
function isVisible(post: PostMeta) {
  return post.status === 'published' || canSeeUnderConstruction()
}

const slugs = cache(async () => {
  const files = await readdir(DIR)
  return files
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => {
      const slug = f.slice(0, -'.mdx'.length)
      if (!SLUG.test(slug)) fail(slug, 'the file name must be kebab-case (it is the URL)')
      if (slug === POLICY_SLUG) fail(slug, 'this URL is the writing policy\'s page')
      return slug
    })
})

const load = cache(async (slug: string): Promise<Post> => {
  const source = await readFile(path.join(DIR, `${slug}.mdx`), 'utf8')
  const { content, frontmatter } = await compileMDX<Record<string, unknown>>({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      // GitHub Markdown: tables, footnotes, strikethrough, bare links.
      mdxOptions: { remarkPlugins: [remarkGfm], remarkRehypeOptions: BLOG.mdx },
    },
  })
  const body = source.replace(/^---[\s\S]*?\n---/, '')
  return { ...readMeta(slug, frontmatter, body), content, headings: outline(body) }
})

/** Every visible post, newest first. */
export const getPosts = cache(async (): Promise<PostMeta[]> => {
  const all = await Promise.all((await slugs()).map(load))
  const known = new Set(all.map((s) => s.slug))
  for (const s of all) {
    if (s.maturedInto && !known.has(s.maturedInto)) fail(s.slug, `"maturedInto" names no post (${s.maturedInto})`)
  }
  return all
    .filter(isVisible)
    .map(({ content: _content, headings: _headings, ...meta }) => meta)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
})

/** One visible post with its compiled text, or null. */
export async function getPost(slug: string): Promise<Post | null> {
  if (!(await slugs()).includes(slug)) return null
  const post = await load(slug)
  return isVisible(post) ? post : null
}

/**
 * What to read next under a post (ADR 0019): up to `n` other visible posts,
 * the same theme first, then the most shared subjects, then the newest.
 */
export async function getRelatedPosts(post: PostMeta, n = 3): Promise<PostMeta[]> {
  const score = (s: PostMeta) => (s.theme === post.theme ? 2 : 0) + s.tags.filter((tag) => post.tags.includes(tag)).length
  return (await getPosts())
    .filter((s) => s.slug !== post.slug)
    .sort((a, b) => score(b) - score(a) || b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, n)
}
