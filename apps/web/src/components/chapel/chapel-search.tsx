'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import { Search } from 'lucide-react'
import { Eyebrow, Heading, Text, buttonClasses, cx } from '@/components/ui'

interface Result {
  slug: string
  title: string
  summary?: string
  category?: { name: string } | null
}

interface ChapelSearchProps {
  labels: { open: string; dialogLabel: string; placeholder: string; close: string; empty: string; hint: string; loading: string }
  /** Base of a study's URL; the slug is appended. */
  studyHref: string
}

/**
 * The header's search: a button and a native <dialog> (focus trap, Escape and
 * the top layer for free). ⌘K / Ctrl+K opens it from anywhere in the Capela.
 * Queries /api/search after a short pause in typing.
 */
export function ChapelSearch({ labels, studyHref }: ChapelSearchProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Result[]>([])
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
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`, { signal: controller.signal })
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
  }, [query])

  const status = query.trim().length < 2 ? labels.hint : loading ? labels.loading : results.length === 0 ? labels.empty : null

  return (
    <>
      <button type="button" onClick={open} className={cx(buttonClasses({ variant: 'stone', size: 'none' }), 'group h-9 px-3 text-sm')}>
        <Search size={14} strokeWidth={1.6} aria-hidden />
        <span className="hidden sm:inline">{labels.open}</span>
        <kbd className="hidden font-mono text-xs text-foreground-muted group-hover:text-surface lg:inline">⌘K</kbd>
      </button>

      <dialog
        ref={dialogRef}
        aria-label={labels.dialogLabel}
        onClick={(e) => e.target === dialogRef.current && close()}
        className="mx-4 mt-24 w-auto max-w-4xl sm:mx-auto rounded-xs border border-border bg-surface-raised p-0 text-foreground backdrop:bg-overlay"
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
          <button type="button" onClick={close} className={cx(buttonClasses({ variant: 'stone', size: 'none' }), 'h-8 px-3 text-xs')}>
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
                <li key={r.slug} className="border-b border-border last:border-b-0">
                  <Link
                    href={`${studyHref}/${r.slug}` as Route}
                    onClick={close}
                    className="group block px-5 py-4 text-foreground no-underline transition-colors duration-normal hover:bg-surface-muted"
                  >
                    {r.category && (
                      <Eyebrow as="span" className="block">
                        {r.category.name}
                      </Eyebrow>
                    )}
                    <Heading as="span" level="title-sm-serif" className="mt-1.5 block transition-colors duration-fast group-hover:text-primary">
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
