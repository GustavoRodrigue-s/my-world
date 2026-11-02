// The world's footer — one set of labels for every page of every space (ADR 0022).
// The links may change with the language; a label never
// changes from page to page. The Capela is the hidden treasure, except inside it once open (ADR 0022).

import type { Locale } from './portfolio-locale'
import type { SpaceId, SpaceStatus } from './world'

interface WorldFooterCopy {
  name: string
  text: string
  columns: { places: string; world: string; contact: string }
  places: Record<SpaceId, string>
  states: Record<Exclude<SpaceStatus, 'open'>, string>
  links: { home: string; resume: string; identity: string; email: string }
  /** The closing line, in Latin in every language: for the greater glory of God. */
  verse: string
}

export const WORLD_FOOTER: Record<Locale, WorldFooterCopy> = {
  pt: {
    name: 'Mundo do Gustavo',
    text: 'Um mundo só, com lugares para o trabalho, os projetos, o blog e o silêncio.',
    columns: { places: 'lugares', world: 'este mundo', contact: 'contato' },
    places: { portfolio: 'Portfólio', projects: 'Projetos', blog: 'Blog', chapel: 'Tesouro escondido' },
    states: { building: 'em construção', planned: 'na prancheta' },
    links: { home: 'Carta do mundo', resume: 'Currículo', identity: 'Identidade visual', email: 'E-mail' },
    verse: 'Ad maiorem Dei gloriam',
  },
  en: {
    name: 'Mundo do Gustavo',
    text: 'One world, with places for work, projects, the blog and silence.',
    columns: { places: 'places', world: 'this world', contact: 'contact' },
    places: { portfolio: 'Portfolio', projects: 'Projects', blog: 'Blog', chapel: 'Hidden treasure' },
    states: { building: 'under construction', planned: 'on the drawing board' },
    links: { home: 'Map of the world', resume: 'Résumé', identity: 'Visual identity', email: 'Email' },
    verse: 'Ad maiorem Dei gloriam',
  },
}
