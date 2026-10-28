'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import { Search } from 'lucide-react'
import { buttonClasses } from './button'
import { Eyebrow } from './eyebrow'
import { Heading } from './heading'
import { Text } from './text'
import { cx } from './utils'

/** One hit, as the search endpoint answers it. */
export interface SearchResult {
  href: string
  title: string
  /** Small label over the title (a theme, a category). */
  kicker?: string
}

interface SearchDialogProps {
  labels: { open: string; dialogLabel: string; placeholder: string; close: string; empty: string; hint: string; loading: string }
  /** Where to ask, its scope included (`/api/search?space=studies`); `q` is added. Answers `{ results: SearchResult[] }`. */
  endpoint: string
  /** `line` (default): hairline buttons, sans titles. `stone`: the Capela's flat stone, serif titles. */
  variant?: 'line' | 'stone'
}

/**
 * The world's one search (ADR 0017): a header button and a native <dialog>
 * (focus trap, Escape and the top layer for free). ⌘K / Ctrl+K opens it from
 * anywhere in the space. Asks the endpoint after a short pause in typing —
 * the one client-side fetch the rules allow.
 */
export function SearchDialog({ labels, endpoint, variant = 'line' }: SearchDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)

  const open = () => {
    dialogRef.current?.showModal()
    inputRef.current?.focus()
  }
  const close = () => dialogRef.current?.close()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        open()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const q = query.trim()
    if (q.length < 2) {
      setResults([])
      return
    }
    setLoading(true)
    const controller = new AbortController()
    const timer = setTimeout(async () => {
      try {
        const url = new URL(endpoint, window.location.origin)
        url.searchParams.set('q', q)
        const res = await fetch(url, { signal: controller.signal })
        const json = await res.json()
        setResults(json.results ?? [])
      } catch {
        // Aborted or offline — keep the previous results.
      } finally {
        setLoading(false)
      }
    }, 250)
    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [query, endpoint])

  const status = query.trim().length < 2 ? labels.hint : loading ? labels.loading : results.length === 0 ? labels.empty : null

  return (
    <>
      <button type="button" onClick={open} className={cx(buttonClasses({ variant, size: 'none' }), 'group h-9 px-3 text-sm')}>
        <Search size={14} strokeWidth={1.6} aria-hidden />
        <span className="hidden sm:inline">{labels.open}</span>
        <kbd className={cx('hidden font-mono text-xs text-foreground-muted lg:inline', variant === 'stone' && 'group-hover:text-surface')}>
          ⌘K
        </kbd>
      </button>

      <dialog
        ref={dialogRef}
        aria-label={labels.dialogLabel}
        onClick={(e) => e.target === dialogRef.current && close()}
        className={cx(
          'mx-4 mt-24 w-auto max-w-4xl rounded-xs border border-border bg-surface-raised p-0 text-foreground backdrop:bg-overlay sm:mx-auto',
          // A floating panel: the one place a shadow is allowed (the Capela stays flat).
          variant === 'line' && 'shadow-floating'
        )}
      >
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <Search size={18} strokeWidth={1.5} aria-hidden className="shrink-0 text-foreground-muted" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={labels.placeholder}
            aria-label={labels.dialogLabel}
            className="min-w-0 flex-1 border-0 bg-transparent font-sans text-lg text-foreground outline-none placeholder:text-foreground-subtle"
          />
          <button type="button" onClick={close} className={cx(buttonClasses({ variant, size: 'none' }), 'h-8 px-3 text-xs')}>
            {labels.close}
          </button>
        </div>

        <div aria-live="polite">
          {status ? (
            <Text family="mono" size="xs" color="muted" className="px-5 py-5">
              {status}
            </Text>
          ) : (
            <ul className="max-h-96 list-none overflow-y-auto">
              {results.map((r) => (
                <li key={r.href} className="border-b border-border last:border-b-0">
                  <Link
                    href={r.href as Route}
                    onClick={close}
                    className="group block px-5 py-4 text-foreground no-underline transition-colors duration-normal hover:bg-surface-muted"
                  >
                    {r.kicker && (
                      <Eyebrow as="span" className="block">
                        {r.kicker}
                      </Eyebrow>
                    )}
                    <Heading
                      as="span"
                      level={variant === 'stone' ? 'title-sm-serif' : 'title-sm'}
                      className="mt-1.5 block transition-colors duration-fast group-hover:text-primary"
                    >
                      {r.title}
                    </Heading>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </dialog>
    </>
  )
}
