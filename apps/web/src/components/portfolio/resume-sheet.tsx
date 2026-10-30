import { Heading, Mark, Text } from '@/components/ui'
import { getContent, type Locale } from '@/lib/portfolio-content'
import { localePath } from '@/lib/portfolio-locale'

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <Text as="div" family="mono" size="xs" color="primary" className="mb-3 break-after-avoid border-b border-border-strong pb-2 print:mb-3">
        ¶ <span className="text-foreground-muted">{title}</span>
      </Text>
      {children}
    </section>
  )
}

/** The résumé as a single A4 sheet. Same data as the portfolio, recruiter order. */
export function ResumeSheet({ locale }: { locale: Locale }) {
  const { profile, resume, education, languages, certifications } = getContent(locale)
  const site = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/^https?:\/\//, '')

  return (
    <article className="registration mx-auto w-full max-w-6xl border border-border bg-surface-raised p-7 shadow-floating sm:p-10 md:p-14 print:max-w-none print:border-0 print:bg-transparent print:p-0 print:shadow-none print:zoom-print">
      <header className="border-b border-foreground pb-7">
        <div className="flex items-start justify-between gap-6">
          <div>
            <Heading as="h1" level="headline">
              {profile.name}
            </Heading>
            <Text size="base" color="foreground" className="mt-2">
              {profile.role}
            </Text>
          </div>
          {/* The mark as the letterhead seal */}
          <Mark size="3xl" className="mt-1 text-foreground" />
        </div>
        <Text as="div" family="mono" size="xs" color="muted" className="mt-6 flex flex-wrap gap-x-5 gap-y-2 print:gap-x-4">
          <span>
            {profile.city} · {profile.timezone}
          </span>
          <a href={`mailto:${profile.email}`} className="text-foreground no-underline">
            {profile.email}
          </a>
          <a href={profile.linkedin} className="text-foreground no-underline">
            linkedin.com/in/gustavo-rodrigues-fabiano
          </a>
          <a href={profile.github} className="text-foreground no-underline">
            github.com/GustavoRodrigue-s
          </a>
        </Text>
      </header>

      <Text size="base" color="foreground" leading="relaxed" className="mt-8 max-w-4xl">
        {resume.summary}
      </Text>

      <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,1fr)_var(--size-width-xs)] print:mt-8 print:grid-cols-[minmax(0,1fr)_var(--size-width-2xs)]">
        <div className="flex flex-col gap-10">
          <Block title={resume.blocks.experience}>
            <ol className="flex list-none flex-col gap-7">
              {resume.experience.map((job) => (
                <li key={job.company} className="break-inside-avoid">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4">
                    <Heading as="h2" level="title-sm">
                      {job.company}
                      <span className="font-regular text-foreground-muted"> — {job.role}</span>
                    </Heading>
                    <Text as="span" family="mono" size="xs" color="muted">
                      {job.period}
                    </Text>
                  </div>
                  <Text family="mono" size="xs" color="muted" className="mt-1">
                    {job.place}
                  </Text>
                  <Text size="sm" color="foreground" leading="relaxed" className="mt-3">
                    {job.text}
                  </Text>
                  {job.highlights.length > 0 && (
                    <ul className="mt-3 flex list-none flex-col gap-2">
                      {job.highlights.map((h) => (
                        <li key={h} className="flex gap-3">
                          <span aria-hidden className="mt-2 h-1 w-1 shrink-0 bg-primary" />
                          <Text as="span" size="sm" color="muted" leading="snug">
                            {h}
                          </Text>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ol>
          </Block>

        </div>

        <aside className="flex flex-col gap-9 print:gap-6">
          <Block title={resume.blocks.education}>
            {education.map((e) => (
              <div key={e.title}>
                <Text size="sm" weight="semibold" color="foreground" leading="snug">
                  {e.title}
                </Text>
                <Text size="sm" color="muted" leading="snug" className="mt-1">
                  {e.org}, {e.period}
                </Text>
              </div>
            ))}
          </Block>
          <Block title={resume.blocks.skills}>
            <dl className="flex flex-col gap-4 print:gap-3">
              {resume.skills.map((s) => (
                <div key={s.group}>
                  <Text as="dt" size="sm" weight="semibold" color="foreground">
                    {s.group}
                  </Text>
                  <Text as="dd" size="sm" color="muted" leading="snug" className="mt-1">
                    {s.items.join(', ')}
                  </Text>
                </div>
              ))}
            </dl>
          </Block>

          <Block title={resume.blocks.languages}>
            <ul className="flex list-none flex-col gap-2">
              {languages.map((l) => (
                <li key={l.name}>
                  <Text as="span" size="sm" weight="semibold" color="foreground">
                    {l.name}
                  </Text>
                  <Text size="sm" color="muted" leading="snug">
                    {l.level}
                  </Text>
                </li>
              ))}
            </ul>
          </Block>

          <Block title={resume.blocks.certifications}>
            <ul className="flex list-none flex-col gap-2">
              {certifications.map((c) => (
                <li key={c}>
                  <Text size="sm" color="muted" leading="snug">
                    {c}
                  </Text>
                </li>
              ))}
            </ul>
          </Block>
        </aside>
      </div>

      <footer className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-border-strong pt-4 print:mt-6">
        <Text family="mono" size="xs" color="muted">
          {site}{localePath(locale, '/portfolio')}
        </Text>
        <Text family="mono" size="xs" color="muted">
          {profile.motto} · rev. {profile.revision}
        </Text>
      </footer>
    </article>
  )
}
