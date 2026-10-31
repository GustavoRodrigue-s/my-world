// Estudos' content: MDX files in content/studies, read at build time
// (ADR 0014). The file name is the slug. The front matter is checked here: a
// study with a missing or wrong field fails the build instead of rendering
// half a page. Server only (reads the file system).
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { cache } from 'react'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import type { StudyMeta, StudyStatus } from '@my-world/types'
import { mdxComponents } from '@/components/studies/mdx-components'
import { STUDIES, STUDY_FORMATS, STUDY_THEMES } from '@/lib/studies-content'
import { canSeeUnderConstruction } from '@/lib/world'

const DIR = path.join(process.cwd(), 'content/studies')
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const DATE = /^\d{4}-\d{2}-\d{2}$/
const STATUSES: StudyStatus[] = ['draft', 'published']
/** Reading speed for the time estimate, in words per minute. */
const WORDS_PER_MINUTE = 200

export interface Study extends StudyMeta {
  content: React.ReactElement
}

function fail(slug: string, message: string): never {
  throw new Error(`content/studies/${slug}.mdx: ${message}`)
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

function readMeta(slug: string, data: Record<string, unknown>, body: string): StudyMeta {
  const words = body.split(/\s+/).filter(Boolean).length
  return {
    slug,
    title: text(slug, 'title', data.title),
    summary: text(slug, 'summary', data.summary),
    format: oneOf(slug, 'format', data.format, STUDY_FORMATS),
    theme: oneOf(slug, 'theme', data.theme, STUDY_THEMES),
    status: oneOf(slug, 'status', data.status, STATUSES),
    publishedAt: date(slug, 'publishedAt', data.publishedAt),
    updatedAt: data.updatedAt === undefined ? undefined : date(slug, 'updatedAt', data.updatedAt),
    tags: list(slug, 'tags', data.tags),
    references: list(slug, 'references', data.references),
    maturedInto: data.maturedInto === undefined ? undefined : text(slug, 'maturedInto', data.maturedInto),
    comments: data.comments !== false,
    readingTime: Math.max(1, Math.ceil(words / WORDS_PER_MINUTE)),
  }
}

/** Drafts are seen where unfinished work is (dev, previews), never in production. */
function isVisible(study: StudyMeta) {
  return study.status === 'published' || canSeeUnderConstruction()
}

const slugs = cache(async () => {
  const files = await readdir(DIR)
  return files
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => {
      const slug = f.slice(0, -'.mdx'.length)
      if (!SLUG.test(slug)) fail(slug, 'the file name must be kebab-case (it is the URL)')
      return slug
    })
})

const load = cache(async (slug: string): Promise<Study> => {
  const source = await readFile(path.join(DIR, `${slug}.mdx`), 'utf8')
  const { content, frontmatter } = await compileMDX<Record<string, unknown>>({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      // GitHub Markdown: tables, footnotes, strikethrough, bare links.
      mdxOptions: { remarkPlugins: [remarkGfm], remarkRehypeOptions: STUDIES.mdx },
    },
  })
  const body = source.replace(/^---[\s\S]*?\n---/, '')
  return { ...readMeta(slug, frontmatter, body), content }
})

/** Every visible study, newest first. */
export const getStudies = cache(async (): Promise<StudyMeta[]> => {
  const all = await Promise.all((await slugs()).map(load))
  const known = new Set(all.map((s) => s.slug))
  for (const s of all) {
    if (s.maturedInto && !known.has(s.maturedInto)) fail(s.slug, `"maturedInto" names no study (${s.maturedInto})`)
  }
  return all
    .filter(isVisible)
    .map(({ content: _content, ...meta }) => meta)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
})

/** One visible study with its compiled text, or null. */
export async function getStudy(slug: string): Promise<Study | null> {
  if (!(await slugs()).includes(slug)) return null
  const study = await load(slug)
  return isVisible(study) ? study : null
}

/**
 * What to read next under a study (ADR 0019): up to `n` other visible studies,
 * the same theme first, then the most shared subjects, then the newest.
 */
export async function getRelatedStudies(study: StudyMeta, n = 3): Promise<StudyMeta[]> {
  const score = (s: StudyMeta) => (s.theme === study.theme ? 2 : 0) + s.tags.filter((tag) => study.tags.includes(tag)).length
  return (await getStudies())
    .filter((s) => s.slug !== study.slug)
    .sort((a, b) => score(b) - score(a) || b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, n)
}
