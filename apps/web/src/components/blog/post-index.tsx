'use client'

import { Suspense } from 'react'
import { X } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { Route } from 'next'
import type { PostFormat, PostTheme } from '@my-world/types'
import { Chip, EntryList, Text, buttonClasses } from '@/components/ui'
import { BLOG, POST_FORMATS, POST_THEMES } from '@/lib/blog-content'
import { FormatMark } from './format-mark'
import type { PostEntry } from './post-entry'

interface Filters {
  theme: PostTheme | null
  format: PostFormat | null
  /** A subject, from a post's page (its chips link to `?tag=`). */
  tag: string | null
}

const NO_FILTER: Filters = { theme: null, format: null, tag: null }

interface PostIndexProps {
  entries: PostEntry[]
}

/**
 * Every post, filtered by format and theme, or by a subject coming from a
 * post's page. The filters live in the URL (`?theme=economia&format=note`,
 * `?tag=CSS`, ADR 0014), so a filtered list can be linked to. The page stays static: before the URL is read, every post is shown.
 */
export function PostIndex({ entries }: PostIndexProps) {
  return (
    <Suspense fallback={<PostIndexView entries={entries} filters={NO_FILTER} />}>
      <FromUrl entries={entries} />
    </Suspense>
  )
}

function FromUrl({ entries }: PostIndexProps) {
  const params = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  // Unknown values are ignored, as if the filter were off.
  const pick = <T extends string>(value: string | null, allowed: readonly T[]) =>
    allowed.includes(value as T) ? (value as T) : null
  const filters: Filters = {
    theme: pick(params.get('theme'), POST_THEMES),
    format: pick(params.get('format'), POST_FORMATS),
    tag: pick(params.get('tag'), [...new Set(entries.flatMap((e) => e.tags))]),
  }

  const select = (next: Filters) => {
    const query = new URLSearchParams()
    if (next.theme) query.set('theme', next.theme)
    if (next.format) query.set('format', next.format)
    if (next.tag) query.set('tag', next.tag)
    const qs = query.toString()
    router.replace((qs ? `${pathname}?${qs}` : pathname) as Route, { scroll: false })
  }

  return <PostIndexView entries={entries} filters={filters} onSelect={select} />
}

function PostIndexView({
  entries,
  filters,
  onSelect = () => {},
}: PostIndexProps & { filters: Filters; onSelect?: (next: Filters) => void }) {
  const t = BLOG.index.filters
  const shown = entries.filter(
    (e) =>
      (!filters.theme || e.theme === filters.theme) &&
      (!filters.format || e.format === filters.format) &&
      (!filters.tag || e.tags.includes(filters.tag))
  )

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <div role="group" aria-label={t.formatLabel} className="flex flex-wrap gap-2">
          <Chip pressed={!filters.format} onClick={() => onSelect({ ...filters, format: null })}>
            {t.allFormats}
          </Chip>
          {POST_FORMATS.map((f) => (
            <Chip key={f} pressed={filters.format === f} onClick={() => onSelect({ ...filters, format: f })} className="gap-2">
              <FormatMark format={f} className={filters.format === f ? '[&_path]:stroke-surface' : undefined} />
              {BLOG.formats[f].plural}
            </Chip>
          ))}
        </div>
        <div role="group" aria-label={t.themeLabel} className="flex flex-wrap gap-2 md:border-l md:border-border md:pl-6">
          <Chip pressed={!filters.theme} onClick={() => onSelect({ ...filters, theme: null })}>
            {t.allThemes}
          </Chip>
          {POST_THEMES.map((theme) => (
            <Chip key={theme} pressed={filters.theme === theme} onClick={() => onSelect({ ...filters, theme })}>
              {BLOG.themes[theme].name}
            </Chip>
          ))}
        </div>
        {filters.tag && (
          // A row of its own: it comes from a post's page, not from these chips.
          <div role="group" aria-label={t.tagLabel} className="w-full">
            <Chip pressed onClick={() => onSelect({ ...filters, tag: null })} title={t.clearTag} className="gap-2">
              {t.tag(filters.tag)}
              <X className="size-icon-xs" aria-hidden />
            </Chip>
          </div>
        )}
      </div>
      {shown.length > 0 ? (
        // The Blog's gold is `hidden`: its `support` is graphite (ADR 0015).
        <EntryList items={shown} gild="hidden" />
      ) : (
        <div className="flex flex-col items-start gap-4 border-t border-border py-10">
          <Text size="lg" color="muted">
            {t.empty}
          </Text>
          <button type="button" className={buttonClasses({ variant: 'quiet', size: 'none' })} onClick={() => onSelect(NO_FILTER)}>
            {t.clear}
          </button>
        </div>
      )}
    </>
  )
}
