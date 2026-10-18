'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import type { ArticleCard } from '@my-world/types'
import { Eyebrow, Heading, Text } from '@/components/ui'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export function SearchModal({ isOpen, onClose }: Props) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<ArticleCard[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setResults([])
      setTimeout(() => inputRef.current?.focus(), 60)
    }
  }, [isOpen])

  useEffect(() => {
    if (!query.trim()) { setResults([]); return }
    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        setResults(data.results ?? [])
      } catch {
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [query])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 flex items-start justify-center pt-20 px-4 z-[var(--z-modal)] bg-primary/75"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-[560px] bg-surface border border-border rounded-card overflow-hidden shadow-card">

        {/* Input row */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
          <span className="text-[18px] text-subtle">🔍</span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Buscar estudos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 outline-none bg-transparent border-0 font-serif text-[18px] text-foreground placeholder:text-subtle"
          />
          <button
            onClick={onClose}
            className="font-sans text-[11px] tracking-[0.1em] uppercase text-subtle bg-transparent border border-border rounded-pill px-[10px] py-1 cursor-pointer"
          >
            Fechar
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[400px] overflow-y-auto">
          {loading && (
            <Text className="p-4 px-5" color="subtle" size="md">Buscando...</Text>
          )}

          {!loading && query.trim() && results.length === 0 && (
            <Text className="p-4 px-5" color="subtle" size="md">
              Nenhum resultado para "{query}".
            </Text>
          )}

          {!loading && !query.trim() && (
            <Text className="p-6 px-5 text-center" color="subtle" size="md">
              Digite para buscar entre os estudos.
            </Text>
          )}

          {results.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              onClick={onClose}
              className="no-underline block border-b border-border hover:bg-accent-pale transition-colors duration-150"
            >
              <div className="p-[14px_20px]">
                {article.category && (
                  <Eyebrow className="mb-1">{article.category.name}</Eyebrow>
                )}
                <Heading as="p" level="h3" className="text-[16px] mb-0.5">
                  {article.title}
                </Heading>
                <Text size="sm" weight="light" color="muted" className="text-[12px]">
                  {article.summary}
                </Text>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
