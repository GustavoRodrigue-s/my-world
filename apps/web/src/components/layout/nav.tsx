'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Search, Menu, X } from 'lucide-react'
import { cx } from '@/components/ui'

const NAV_LINKS = [
  { label: 'INÍCIO', href: '/' },
  { label: 'ESTUDOS', href: '/articles' },
  { label: 'CATEGORIAS', href: '/categories' },
  { label: 'SANTOS', href: '/saints' },
  { label: 'SOBRE', href: '/about' },
] as const

interface NavProps {
  onSearchOpen?: () => void
}

export function Nav({ onSearchOpen }: NavProps) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-[var(--z-nav)] bg-primary border-b border-border h-[var(--spacing-nav-h)]">
      <div className="section-inner flex items-center justify-between h-full px-[var(--spacing-section-x)]">

        {/* Brand */}
        <Link href="/" className="group flex items-center gap-[10px] no-underline leading-[1.25]">
          {/* Mark — a thin illuminated cross inside a gold-bordered circle */}
          <span className="flex items-center justify-center w-9 h-9 shrink-0 rounded-full border border-accent-border bg-[#F6F1E8]/[0.04] transition-all duration-[var(--transition-normal)] ease-out group-hover:border-accent group-hover:bg-[#F6F1E8]/[0.08] group-hover:scale-105">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M8 1.75V14.25M3 6.25H13"
                stroke="var(--color-accent)"
                strokeWidth="1.1"
                strokeLinecap="round"
                className="transition-[stroke] duration-[var(--transition-normal)] ease-out group-hover:stroke-[var(--color-accent-hover)]"
              />
            </svg>
          </span>

          <span className="font-serif text-[16px] whitespace-nowrap">
            <span className="font-light tracking-[0.04em] text-on-primary/85 transition-colors duration-[var(--transition-normal)] ease-out group-hover:text-on-primary">
              Capela de{' '}
            </span>
            <span className="font-semibold tracking-[0.02em] text-accent transition-colors duration-[var(--transition-normal)] ease-out group-hover:text-accent-hover">
              Estudos
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center list-none gap-0">
          {NAV_LINKS.map((link) => {
            const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cx(
                    'font-sans text-[13px] tracking-[0.06em] uppercase no-underline block px-[14px] py-[6px] rounded-sm border-b-2 transition-all duration-[var(--transition-normal)] ease-out',
                    isActive
                      ? 'text-accent border-accent'
                      : 'text-on-primary/65 border-transparent hover:text-accent-hover hover:border-accent/35 hover:bg-[#F6F1E8]/[0.05]'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Right cluster: search, theme toggle, mobile menu */}
        <div className="flex items-center gap-3">
          {/* Search pill */}
          <button
            onClick={onSearchOpen}
            className="hidden md:flex items-center gap-2 bg-[#F6F1E8]/[0.07] border border-border rounded-pill px-4 py-2 text-on-primary/50 font-sans text-[13px] cursor-pointer"
            aria-label="Buscar"
          >
            <Search size={13} strokeWidth={1.5} />
            <span>Buscar...</span>
          </button>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-on-primary/65 bg-transparent border-0 cursor-pointer flex items-center"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-primary flex flex-col px-[var(--spacing-section-x)] py-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-sans text-[13px] tracking-[0.06em] uppercase text-on-primary no-underline py-3 px-2 -mx-2 rounded-sm border-b border-border transition-colors duration-[var(--transition-fast)] hover:text-accent-hover hover:bg-[#F6F1E8]/[0.05]"
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => { setMenuOpen(false); onSearchOpen?.() }}
            className="mt-4 py-[10px] bg-transparent border border-accent rounded-pill text-accent-hover font-sans text-[12px] tracking-[0.14em] uppercase cursor-pointer flex items-center justify-center gap-2"
          >
            <Search size={13} strokeWidth={1.5} />
            Buscar
          </button>
        </div>
      )}
    </nav>
  )
}
