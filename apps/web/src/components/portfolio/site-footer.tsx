import Link from 'next/link'
import { Mark, Text } from '@/components/ui'
import { getContent, type Locale } from '@/lib/portfolio-content'
import { localePath } from '@/lib/portfolio-locale'

const linkClass =
  'font-sans text-[14px] text-foreground no-underline transition-colors duration-[var(--transition-fast)] hover:text-accent'

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <Text family="mono" size="sm" color="muted" className="mb-4">
        {title}
      </Text>
      <ul className="flex list-none flex-col gap-2.5">{children}</ul>
    </div>
  )
}

export function SiteFooter({ locale }: { locale: Locale }) {
  const { profile, shell } = getContent(locale)
  const t = shell.footer
  return (
    <footer className="border-t border-border bg-surface print:hidden">
      <div className="section-inner grid gap-12 px-[var(--spacing-section-x)] py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div className="max-w-[340px]">
          <div className="flex items-center gap-3 text-foreground">
            <Mark size={34} />
            <span className="font-sans text-[17px] font-semibold tracking-[-0.02em]">{profile.name}</span>
          </div>
          <Text size="md" color="muted" leading="relaxed" className="mt-5">
            {profile.purpose}
          </Text>
        </div>

        <Column title={t.world}>
          <li><Link href={localePath(locale, '/portfolio')} className={linkClass}>{t.portfolio}</Link></li>
          <li><Link href={localePath(locale, '/portfolio/resume')} className={linkClass}>{t.resume}</Link></li>
          <li><Link href={localePath(locale, '/identity')} className={linkClass}>{t.identity}</Link></li>
        </Column>

        <Column title={t.landscapes}>
          <li>
            {/* The Capela is Portuguese-only. */}
            <Link href="/" hrefLang="pt-BR" lang="pt-BR" className={`${linkClass} inline-flex items-center gap-2`}>
              <Mark variant="star" size={18} />
              Capela de Estudos
            </Link>
          </li>
        </Column>

        <Column title={t.contact}>
          <li><a href={`mailto:${profile.email}`} className={linkClass}>{t.email}</a></li>
          <li><a href={profile.linkedin} className={linkClass} rel="me noopener" target="_blank">LinkedIn</a></li>
          <li><a href={profile.github} className={linkClass} rel="me noopener" target="_blank">GitHub</a></li>
        </Column>
      </div>

      <div className="border-t border-border">
        <div className="section-inner flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 px-[var(--spacing-section-x)] py-5">
          <Text family="mono" size="sm" color="muted">
            © {new Date().getFullYear()} {profile.name}
          </Text>
          <Text family="mono" size="sm" color="muted">
            {profile.motto} {t.inCity} · {profile.coordinates}
          </Text>
          <Text as="span" family="serif" size="lg" color="muted" className="italic">
            {profile.duality}
          </Text>
        </div>
      </div>
    </footer>
  )
}
