// Single source of truth for the portfolio, the résumé and the identity page,
// in both languages. Facts come from the LinkedIn export (Profile.pdf) and the
// Notion pages "Portfólio", "Propósito" and "Road to Frontend Pleno".
//
// - Language-independent facts (name, links, coordinates…) live here, in IDENTITY.
// - Everything visible lives in ./portfolio-content-pt.ts and ./portfolio-content-en.ts,
//   both typed as PortfolioCopy so the two can't drift apart in shape.
// - Lines marked REVIEW are drafts written in Gustavo's voice — confirm or rewrite
//   them (in both files: the English one mirrors the Portuguese markers).

import { en } from './portfolio-content-en'
import { pt } from './portfolio-content-pt'
import type { Locale } from './portfolio-locale'

export type { Locale } from './portfolio-locale'

export type ArtifactStatus = 'production' | 'building' | 'prototype' | 'drawing-board'

export const IDENTITY = {
  name: 'Gustavo Rodrigues Fabiano',
  shortName: 'Gustavo Rodrigues',
  company: 'Big4Tech',
  coordinates: '23°18′S 51°09′W',
  timezone: 'UTC−3',
  // REVIEW: personal e-mail from the LinkedIn export — swap for the address you want public.
  email: 'gustavo.fabiano.2010@hotmail.com',
  linkedin: 'https://www.linkedin.com/in/gustavo-rodrigues-fabiano-768589208',
  github: 'https://github.com/GustavoRodrigue-s',
  revision: '2026.10',
} as const

// Square crop, toned ink-on-paper (crop + uniform scale only — the face is never reshaped).
// Set to null to fall back to the hatched monogram. Screen only — the résumé never shows a photo.
export const PORTRAIT_SRC: string | null = '/portfolio/portrait.jpg'

/** A statement with its one emphasized word (rendered with <Emphasis>). */
export interface Statement {
  before: string
  emphasis: string
  after?: string
}

export interface Era {
  period: string
  title: string
  place?: string
  role?: string
  text: string
  kind: 'study' | 'work' | 'education' | 'now'
  current?: boolean
}

export interface Artifact {
  slug: string
  code: string
  title: string
  org: string
  period: string
  kind: string
  status: ArtifactStatus
  what: string
  does: string[]
  role: string
  note?: string
  stack: string[]
  confidential?: boolean
}

export interface Prototype {
  title: string
  text: string
  year: string
  links: Array<{ label: string; href: string }>
}

export interface Job {
  company: string
  role: string
  period: string
  place: string
  text: string
  highlights: string[]
}

interface Folio {
  /** The rubric in the margin. */
  label: string
  /** The gloss under it — the metaphor lives here. */
  note: string
  title: string
  intro?: string
}

interface PageMeta {
  title: string
  description: string
}

/** Everything a reader sees, in one language. */
export interface PortfolioCopy {
  profile: {
    role: string
    city: string
    region: string
    motto: string
    purpose: string
    duality: string
  }
  meta: {
    defaultTitle: string
    description: string
    portfolio: PageMeta
    resume: PageMeta
    identity: PageMeta
  }
  statusLabel: Record<ArtifactStatus, string>
  shell: {
    skipLink: string
    brandSub: string
    navLabel: string
    nav: Array<{ label: string; id: string }>
    resume: string
    language: { label: string }
    dayNight: { toDay: string; toNight: string }
    footer: {
      world: string
      landscapes: string
      contact: string
      portfolio: string
      resume: string
      identity: string
      email: string
      inCity: string
    }
  }
  copy: {
    about: Pick<Folio, 'label' | 'note'>
    journey: Folio
    artifacts: Folio & {
      prototypesTitle: string
      prototypes: string
      drawingBoardTitle: string
      drawingBoard: string
      labels: { role: string; decision: string; does: string; stack: string; confidential: string; onGithub: string }
    }
    tools: Folio & { core: string; aiLabel: string; aiTitle: string; aiText: string }
    credentials: Folio & { education: string; certifications: string; languages: string }
    services: Folio & { line: string; companies: string }
    contact: { label: string; resume: string }
  }
  hero: {
    rubric: string
    kicker: string
    statement: Statement
    lead: string
    ctaResume: string
    ctaArtifacts: string
    caption: string
    legend: Array<{ n: string; name: string; text: string }>
    titleBlock: { work: string; author: string; place: string; coordinates: string; timezone: string; revision: string }
    figure: { title: string; desc: string; scale: string; pause: string; play: string }
  }
  about: {
    title: Statement
    paragraphs: string[]
    facts: Array<{ label: string; value: string }>
    principlesLabel: string
    principles: Array<{ title: string; text: string }>
    portraitAlt: string
  }
  journey: Era[]
  artifacts: Artifact[]
  prototypes: Prototype[]
  drawingBoard: Array<{ title: string; text: string }>
  toolOrbits: Array<{ name: string; caption: string; tools: string[] }>
  /** AI tools and practices in daily use — listed under the orbit chart. */
  aiTools: string[]
  process: Array<{ name: string; text: string }>
  services: Array<{ title: string; text: string }>
  companies: string[]
  education: Array<{ title: string; org: string; period: string }>
  certifications: string[]
  languages: Array<{ name: string; level: string }>
  contact: { title: Statement; text: string }
  resume: {
    back: string
    printNote: string
    print: string
    blocks: { experience: string; education: string; skills: string; languages: string; certifications: string }
    summary: string
    experience: Job[]
    skills: Array<{ group: string; items: string[] }>
  }
  identity: {
    rubric: string
    title: Statement
    lead: string
    caption: string
    construction: { title: string; core: string; grid: string }
    concept: Folio & { story: Array<{ title: string; text: string }> }
    mark: Folio & {
      variants: { satellite: [string, string]; star: [string, string]; artifact: [string, string] }
      rulesLabel: string
      rules: string[]
      filesLabel: string
      files: Record<'mark' | 'paper' | 'mono' | 'star' | 'favicon', string>
    }
    color: Folio & {
      large: string
      swatches: Record<
        'paper' | 'ink' | 'rubric' | 'graphite' | 'night' | 'parchment' | 'ember' | 'cyanotype' | 'gold',
        [name: string, role: string]
      >
    }
    type: Folio & {
      sans: [name: string, text: string]
      sansSample: string
      serif: [name: string, text: string]
      serifSample: string
      mono: [name: string, text: string]
      monoRubric: string
      monoSample: string
    }
    elements: Folio & {
      rubricSample: string
      items: Record<'rubric' | 'hatch' | 'registration' | 'seal' | 'status' | 'stamp', [name: string, text: string]>
      stamp: { author: string; revision: string }
    }
    voice: Folio & {
      motionLabel: string
      motion: Array<{ name: string; text: string }>
      vocabularyLabel: string
      vocabulary: Array<[word: string, meaning: string]>
      languageNote: string
    }
  }
}

export type PortfolioContent = Omit<PortfolioCopy, 'profile'> & {
  profile: typeof IDENTITY & PortfolioCopy['profile']
}

const compose = (copy: PortfolioCopy): PortfolioContent => ({ ...copy, profile: { ...IDENTITY, ...copy.profile } })

const CONTENT: Record<Locale, PortfolioContent> = { pt: compose(pt), en: compose(en) }

export function getContent(locale: Locale): PortfolioContent {
  return CONTENT[locale]
}
