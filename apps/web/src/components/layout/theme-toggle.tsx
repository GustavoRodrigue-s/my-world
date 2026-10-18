'use client'

import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { cx } from '@/components/ui'

type Theme = 'light' | 'dark'

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  // Starts undefined so the icon only renders once we know the real value —
  // the <html data-theme> attribute is already correct pre-hydration via the
  // inline script in app/layout.tsx, we just need to mirror it into state.
  const [theme, setTheme] = useState<Theme | undefined>(undefined)

  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme') as Theme | null
    setTheme(current === 'dark' ? 'dark' : 'light')
  }, [])

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    try {
      localStorage.setItem('theme', next)
    } catch {
      // localStorage unavailable — theme just won't persist across visits
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
      className={cx(
        'inline-flex items-center justify-center w-9 h-9 rounded-full border border-border text-on-primary/65 hover:text-accent-hover hover:border-accent-border transition-colors duration-[var(--transition-fast)] cursor-pointer bg-transparent',
        className
      )}
    >
      {theme === undefined ? (
        <span className="w-[15px] h-[15px]" aria-hidden />
      ) : theme === 'dark' ? (
        <Sun size={15} strokeWidth={1.5} />
      ) : (
        <Moon size={15} strokeWidth={1.5} />
      )}
    </button>
  )
}
