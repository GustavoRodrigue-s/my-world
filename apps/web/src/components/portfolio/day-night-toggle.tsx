'use client'

import { useEffect, useState } from 'react'
import { cx } from '@/components/ui'

type Mode = 'light' | 'dark'

const STORAGE_KEY = 'gustavo:theme'

/**
 * Dia / noite. The <html data-theme> attribute is already right before paint
 * (inline script in app/layout.tsx); with nothing stored, the OS decides and
 * the attribute stays absent. Here we only mirror that into state and flip it.
 */
export function DayNightToggle({ labels, className }: { labels: { toDay: string; toNight: string }; className?: string }) {
  const [mode, setMode] = useState<Mode | null>(null)

  useEffect(() => {
    const attr = document.documentElement.getAttribute('data-theme')
    if (attr === 'light' || attr === 'dark') setMode(attr)
    else setMode(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  }, [])

  function toggle() {
    const next: Mode = mode === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Storage unavailable — the choice just won't persist.
    }
    setMode(next)
  }

  const label = mode === 'dark' ? labels.toDay : labels.toNight

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={cx(
        'inline-flex items-center justify-center w-9 h-9 rounded-xs border border-border-strong',
        'bg-transparent text-foreground cursor-pointer',
        'transition-colors duration-[var(--transition-fast)] hover:border-foreground',
        className
      )}
    >
      {/* A small planet: the hatched half is night. It turns half a revolution per switch. */}
      <svg
        viewBox="0 0 20 20"
        width="18"
        height="18"
        aria-hidden
        className={cx(
          'transition-transform duration-500 ease-out',
          mode === 'dark' ? 'rotate-180' : 'rotate-0',
          mode === null && 'opacity-0'
        )}
      >
        <circle cx="10" cy="10" r="7.25" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <path d="M10 2.75a7.25 7.25 0 0 0 0 14.5Z" fill="currentColor" />
      </svg>
    </button>
  )
}
