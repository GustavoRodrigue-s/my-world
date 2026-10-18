import { Download } from 'lucide-react'
import {
  Emphasis,
  Heading,
  Mark,
  Rubric,
  Seal,
  Text,
  TitleBlock,
  type MarkVariant,
} from '@/components/ui'
import { Folio } from '@/components/portfolio/folio'
import { StatusTag } from '@/components/portfolio'
import { getContent, type Locale } from '@/lib/portfolio-content'
import { MarkConstruction } from './mark-construction'
import { Palette } from './palette'

export function IdentityHero({ locale }: { locale: Locale }) {
  const { identity: t, profile } = getContent(locale)
  return (
    <section aria-labelledby="identity-title" className="px-[var(--spacing-section-x)] pt-10 pb-20 md:pt-14 md:pb-28">
      <div className="section-inner">
        <div className="flex items-baseline justify-between gap-6 border-b border-border pb-4">
          <Rubric index="00">{t.rubric}</Rubric>
          <Text family="mono" size="sm" color="muted" className="hidden sm:block">
            rev. {profile.revision}
          </Text>
        </div>
        <div className="grid items-center gap-12 pt-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div>
            <Heading as="h1" id="identity-title" level="statement" className="max-w-[12ch]">
              {t.title.before} <Emphasis>{t.title.emphasis}</Emphasis>
              {t.title.after}
            </Heading>
            <Text size="xl" color="muted" leading="relaxed" className="mt-8 max-w-[48ch]">
              {t.lead}
            </Text>
          </div>
          <figure className="mx-auto w-full max-w-[460px]">
            <MarkConstruction labels={t.construction} />
            <figcaption className="mt-3">
              <Text family="mono" size="sm" color="muted">
                {t.caption}
              </Text>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}

export function IdentityConcept({ locale }: { locale: Locale }) {
  const t = getContent(locale).identity.concept
  return (
    <Folio id="concept" index="01" label={t.label} note={t.note} title={t.title} intro={t.intro}>
      <ol className="grid list-none gap-x-10 gap-y-10 md:grid-cols-2">
        {t.story.map((s, i) => (
          <li key={s.title} className="border-t border-border-strong pt-5">
            <Text family="mono" size="sm" color="accent">
              {String(i + 1).padStart(2, '0')}
            </Text>
            <Heading as="h3" level="subtitle" className="mt-2">
              {s.title}
            </Heading>
            <Text size="base" color="muted" leading="relaxed" className="mt-3 max-w-[48ch]">
              {s.text}
            </Text>
          </li>
        ))}
      </ol>
    </Folio>
  )
}

const VARIANTS: MarkVariant[] = ['satellite', 'star', 'artifact']

const FILES = [
  { file: 'mark.svg', key: 'mark' },
  { file: 'mark-paper.svg', key: 'paper' },
  { file: 'mark-mono.svg', key: 'mono' },
  { file: 'mark-star.svg', key: 'star' },
  { file: 'favicon.svg', key: 'favicon' },
] as const

export function IdentityMark({ locale }: { locale: Locale }) {
  const t = getContent(locale).identity.mark
  return (
    <Folio id="mark" index="02" label={t.label} note={t.note} title={t.title} intro={t.intro} bg="alt-2">
      <ul className="grid list-none gap-px border border-border-strong bg-border-strong md:grid-cols-3">
        {VARIANTS.map((variant) => (
          <li key={variant} className="flex flex-col items-center bg-surface-alt-2 px-6 py-10 text-center">
            <Mark variant={variant} size={88} className="text-foreground" />
            <Heading as="h3" level="item" className="mt-6">
              {t.variants[variant][0]}
            </Heading>
            <Text size="md" color="muted" className="mt-1 max-w-[26ch]">
              {t.variants[variant][1]}
            </Text>
          </li>
        ))}
      </ul>

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        <div>
          <Text family="mono" size="sm" color="muted" className="mb-3">
            {t.rulesLabel}
          </Text>
          <ul className="list-none border-t border-border">
            {t.rules.map((rule) => (
              <li key={rule} className="border-b border-border py-3">
                <Text size="base" color="foreground" leading="snug">
                  {rule}
                </Text>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Text family="mono" size="sm" color="muted" className="mb-3">
            {t.filesLabel}
          </Text>
          <ul className="list-none border-t border-border">
            {FILES.map((d) => (
              <li key={d.file} className="border-b border-border">
                <a
                  href={`/brand/${d.file}`}
                  download
                  className="flex items-center justify-between gap-4 py-3 text-foreground no-underline transition-colors hover:text-accent"
                >
                  <span className="font-mono text-[13px]">{d.file}</span>
                  <span className="flex items-center gap-2 font-sans text-[14px] text-muted">
                    {t.files[d.key]}
                    <Download size={14} strokeWidth={1.5} aria-hidden />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Folio>
  )
}

export function IdentityColor({ locale }: { locale: Locale }) {
  const t = getContent(locale).identity.color
  return (
    <Folio id="color" index="03" label={t.label} note={t.note} title={t.title} intro={t.intro}>
      <Palette swatches={t.swatches} large={t.large} />
    </Folio>
  )
}

export function IdentityType({ locale }: { locale: Locale }) {
  const { identity, profile } = getContent(locale)
  const t = identity.type
  return (
    <Folio id="type" index="04" label={t.label} note={t.note} title={t.title} bg="alt-2">
      <div className="flex flex-col">
        <div className="grid gap-6 border-t border-border-strong py-10 md:grid-cols-[220px_minmax(0,1fr)]">
          <div>
            <Text size="base" weight="semibold" color="foreground">
              {t.sans[0]}
            </Text>
            <Text size="md" color="muted" className="mt-1">
              {t.sans[1]}
            </Text>
          </div>
          <Heading as="p" level="statement">
            {t.sansSample}
          </Heading>
        </div>
        <div className="grid gap-6 border-t border-border-strong py-10 md:grid-cols-[220px_minmax(0,1fr)]">
          <div>
            <Text size="base" weight="semibold" color="foreground">
              {t.serif[0]}
            </Text>
            <Text size="md" color="muted" className="mt-1">
              {t.serif[1]}
            </Text>
          </div>
          <Heading as="p" level="statement">
            <Emphasis>{t.serifSample}</Emphasis>
          </Heading>
        </div>
        <div className="grid gap-6 border-t border-b border-border-strong py-10 md:grid-cols-[220px_minmax(0,1fr)]">
          <div>
            <Text size="base" weight="semibold" color="foreground">
              {t.mono[0]}
            </Text>
            <Text size="md" color="muted" className="mt-1">
              {t.mono[1]}
            </Text>
          </div>
          <div className="flex flex-col gap-3">
            <Rubric index="02">{t.monoRubric}</Rubric>
            <Text family="mono" size="md" color="foreground">
              {t.monoSample} · {profile.coordinates}
            </Text>
          </div>
        </div>
      </div>
    </Folio>
  )
}

export function IdentityElements({ locale }: { locale: Locale }) {
  const { identity, profile } = getContent(locale)
  const t = identity.elements
  return (
    <Folio id="elements" index="05" label={t.label} note={t.note} title={t.title} intro={t.intro}>
      <ul className="grid list-none gap-px border border-border-strong bg-border-strong sm:grid-cols-2 lg:grid-cols-3">
        <Element item={t.items.rubric}>
          <Rubric index="03">{t.rubricSample}</Rubric>
        </Element>
        <Element item={t.items.hatch}>
          <span aria-hidden className="hatch block h-16 w-28 text-foreground opacity-50" />
        </Element>
        <Element item={t.items.registration}>
          <span aria-hidden className="registration block h-16 w-28 border border-border" />
        </Element>
        <Element item={t.items.seal}>
          <span className="flex gap-3">
            <Seal seed="onboarding-digital" size={48} lit />
            <Seal seed="painel-do-cliente" size={48} lit />
            <Seal seed="mundo-do-gustavo" size={48} />
          </span>
        </Element>
        <Element item={t.items.status}>
          <span className="flex flex-wrap justify-center gap-2">
            <StatusTag status="production" locale={locale} />
            <StatusTag status="building" locale={locale} />
            <StatusTag status="drawing-board" locale={locale} />
          </span>
        </Element>
        <Element item={t.items.stamp}>
          <TitleBlock
            className="w-full max-w-[260px]"
            items={[
              { label: t.stamp.author, value: 'G. R. Fabiano' },
              { label: t.stamp.revision, value: profile.revision },
            ]}
          />
        </Element>
      </ul>
    </Folio>
  )
}

function Element({ item: [name, text], children }: { item: [name: string, text: string]; children: React.ReactNode }) {
  return (
    <li className="flex flex-col bg-surface">
      <div className="flex h-36 items-center justify-center border-b border-border px-6">{children}</div>
      <div className="p-5">
        <Heading as="h3" level="item">
          {name}
        </Heading>
        <Text size="md" color="muted" leading="relaxed" className="mt-1.5">
          {text}
        </Text>
      </div>
    </li>
  )
}

export function IdentityVoice({ locale }: { locale: Locale }) {
  const t = getContent(locale).identity.voice
  return (
    <Folio id="voice" index="06" label={t.label} note={t.note} title={t.title} intro={t.intro} bg="alt-1">
      <div className="grid gap-14 lg:grid-cols-2">
        <div>
          <Text family="mono" size="sm" color="muted" className="mb-3">
            {t.motionLabel}
          </Text>
          <ol className="list-none border-t border-border-strong">
            {t.motion.map((m, i) => (
              <li key={m.name} className="flex gap-4 border-b border-border py-4">
                <Text as="span" family="mono" size="md" color="accent">
                  {String(i + 1).padStart(2, '0')}
                </Text>
                <div>
                  <Text size="base" weight="semibold" color="foreground">
                    {m.name}
                  </Text>
                  <Text size="md" color="muted" className="mt-0.5">
                    {m.text}
                  </Text>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <Text family="mono" size="sm" color="muted" className="mb-3">
            {t.vocabularyLabel}
          </Text>
          <dl className="border-t border-border-strong">
            {t.vocabulary.map(([word, meaning]) => (
              <div key={word} className="flex items-baseline gap-3 border-b border-border py-3.5">
                <Text as="dt" size="base" weight="semibold" color="foreground" className="shrink-0">
                  {word}
                </Text>
                <span aria-hidden className="leader" />
                <Text as="dd" size="md" color="muted" className="text-right">
                  {meaning}
                </Text>
              </div>
            ))}
          </dl>
          <Text size="md" color="muted" leading="relaxed" className="mt-6">
            {t.languageNote}
          </Text>
        </div>
      </div>
    </Folio>
  )
}
