import Link from 'next/link'

const NAV_COL: { label: string; href: '/' | '/articles' | '/categories' | '/saints' | '/about' }[] = [
  { label: 'Início', href: '/' },
  { label: 'Estudos', href: '/articles' },
  { label: 'Categorias', href: '/categories' },
  { label: 'Santos', href: '/saints' },
  { label: 'Sobre', href: '/about' },
]

const THEMES_COL: { label: string; href: '/categories' }[] = [
  { label: 'Espiritualidade', href: '/categories' },
  { label: 'Filosofia', href: '/categories' },
  { label: 'Teologia', href: '/categories' },
  { label: 'Liturgia', href: '/categories' },
  { label: 'Vida Moral', href: '/categories' },
]

export function Footer() {
  return (
    <footer className="bg-primary pt-14 pb-7 px-[var(--spacing-section-x)]">
      <div className="section-inner">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-10 mb-10">

          {/* Brand */}
          <div>
            <Link href="/" className="group inline-flex items-center gap-[14px] no-underline mb-4">
              {/* Mark — same illuminated cross as the header, scaled up */}
              <span className="flex items-center justify-center w-12 h-12 shrink-0 rounded-full border border-accent-border bg-[#F6F1E8]/[0.04] transition-all duration-[var(--transition-normal)] ease-out group-hover:border-accent group-hover:bg-[#F6F1E8]/[0.08] group-hover:scale-105">
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M8 1.75V14.25M3 6.25H13"
                    stroke="var(--color-accent)"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    className="transition-[stroke] duration-[var(--transition-normal)] ease-out group-hover:stroke-[var(--color-accent-hover)]"
                  />
                </svg>
              </span>

              <span className="font-serif text-[22px] whitespace-nowrap">
                <span className="font-light tracking-[0.04em] text-on-primary/85 transition-colors duration-[var(--transition-normal)] ease-out group-hover:text-on-primary">
                  Capela de{' '}
                </span>
                <span className="font-semibold tracking-[0.02em] text-accent transition-colors duration-[var(--transition-normal)] ease-out group-hover:text-accent-hover">
                  Estudos
                </span>
              </span>
            </Link>
            <p className="font-sans text-[13px] font-light text-on-primary/55 leading-[1.75] max-w-[320px]">
              Uma biblioteca digital pessoal de estudos sobre espiritualidade católica, teologia e filosofia.
            </p>
          </div>

          {/* Navegar */}
          <div>
            <p className="font-sans text-[10px] font-bold tracking-[0.16em] uppercase text-accent/70 mb-4">
              NAVEGAR
            </p>
            <ul className="list-none flex flex-col gap-1">
              {NAV_COL.map((item) => (
                <li key={item.href + item.label}>
                  <Link
                    href={item.href}
                    className="font-sans text-[13px] font-light text-on-primary/55 no-underline block py-1 hover:text-accent-hover transition-colors duration-[var(--transition-fast)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Temas */}
          <div>
            <p className="font-sans text-[10px] font-bold tracking-[0.16em] uppercase text-accent/70 mb-4">
              TEMAS
            </p>
            <ul className="list-none flex flex-col gap-1">
              {THEMES_COL.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="font-sans text-[13px] font-light text-on-primary/55 no-underline block py-1 hover:text-accent-hover transition-colors duration-[var(--transition-fast)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between pt-5 border-t border-accent/15">
          <span className="font-sans text-[12px] text-on-primary/55">
            © {new Date().getFullYear()} Gustavo Rodrigues Fabiano
          </span>
          <span className="font-serif italic text-[12px] text-on-primary/35">
            Fides quaerens intellectum
          </span>
        </div>
      </div>
    </footer>
  )
}
