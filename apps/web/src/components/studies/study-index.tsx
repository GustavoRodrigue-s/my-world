'use client'

import { Suspense } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { Route } from 'next'
import type { StudyFormat, StudyTheme } from '@my-world/types'
import { Chip, EntryList, Text, buttonClasses } from '@/components/ui'
import { STUDIES, STUDY_FORMATS, STUDY_THEMES } from '@/lib/studies-content'
import { FormatMark } from './format-mark'
import type { StudyEntry } from './study-entry'

interface Filters {
  theme: StudyTheme | null
  format: StudyFormat | null
}

interface StudyIndexProps {
  entries: StudyEntry[]
}

/**
 * Every study, filtered by format and theme. The filters live in the URL
 * (`?theme=economia&format=note`, ADR 0014), so a filtered list can be linked
 * to. The page stays static: before the URL is read, every study is shown.
 */
export function StudyIndex({ entries }: StudyIndexProps) {
  return (
    <Suspense fallback={<StudyIndexView entries={entries} filters={{ theme: null, format: null }} />}>
      <FromUrl entries={entries} />
    </Suspense>
  )
}

function FromUrl({ entries }: StudyIndexProps) {
  const params = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  // Unknown values are ignored, as if the filter were off.
  const pick = <T extends string>(value: string | null, allowed: readonly T[]) =>
    allowed.includes(value as T) ? (value as T) : null
  const filters: Filters = {
    theme: pick(params.get('theme'), STUDY_THEMES),
    format: pick(params.get('format'), STUDY_FORMATS),
  }

  const select = (next: Filters) => {
    const query = new URLSearchParams()
    if (next.theme) query.set('theme', next.theme)
    if (next.format) query.set('format', next.format)
    const qs = query.toString()
    router.replace((qs ? `${pathname}?${qs}` : pathname) as Route, { scroll: false })
  }

  return <StudyIndexView entries={entries} filters={filters} onSelect={select} />
}

function StudyIndexView({
  entries,
  filters,
  onSelect = () => {},
}: StudyIndexProps & { filters: Filters; onSelect?: (next: Filters) => void }) {
  const t = STUDIES.index.filters
  const shown = entries.filter(
    (e) => (!filters.theme || e.theme === filters.theme) && (!filters.format || e.format === filters.format)
  )

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <div role="group" aria-label={t.formatLabel} className="flex flex-wrap gap-2">
          <Chip pressed={!filters.format} onClick={() => onSelect({ ...filters, format: null })}>
            {t.allFormats}
          </Chip>
          {STUDY_FORMATS.map((f) => (
            <Chip key={f} pressed={filters.format === f} onClick={() => onSelect({ ...filters, format: f })} className="gap-2">
              <FormatMark format={f} className={filters.format === f ? '[&_path]:stroke-surface' : undefined} />
              {STUDIES.formats[f].plural}
            </Chip>
          ))}
        </div>
        <div role="group" aria-label={t.themeLabel} className="flex flex-wrap gap-2 md:border-l md:border-border md:pl-6">
          <Chip pressed={!filters.theme} onClick={() => onSelect({ ...filters, theme: null })}>
            {t.allThemes}
          </Chip>
          {STUDY_THEMES.map((theme) => (
            <Chip key={theme} pressed={filters.theme === theme} onClick={() => onSelect({ ...filters, theme })}>
              {STUDIES.themes[theme].name}
            </Chip>
          ))}
        </div>
      </div>
      {shown.length > 0 ? (
        // Estudos' gold is `hidden`: its `support` is graphite (ADR 0015).
        <EntryList items={shown} gild="hidden" />
      ) : (
        <div className="flex flex-col items-start gap-4 border-t border-border py-10">
          <Text size="lg" color="muted">
            {t.empty}
          </Text>
          <button type="button" className={buttonClasses({ variant: 'quiet', size: 'none' })} onClick={() => onSelect({ theme: null, format: null })}>
            {t.clear}
          </button>
        </div>
      )}
    </>
  )
}
