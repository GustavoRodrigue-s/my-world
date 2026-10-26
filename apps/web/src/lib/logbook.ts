// Diário de bordo — what changed in the world, newest first. Add a line here
// with every change worth telling (a space opening, a new edition, a new
// drawing). The home shows the latest few.
// REVIEW: dates before 2026-10-18 come from memory of the work, not from git.

import type { SpaceId } from './world'

export interface LogEntry {
  /** ISO date: 2026-10-25. */
  date: string
  /** The place it happened in; omitted for the world as a whole. */
  space?: SpaceId
  text: string
}

export const LOGBOOK: LogEntry[] = [
  { date: '2026-10-25', text: 'Todos os lugares ganham um caminho de volta ao mapa.' },
  { date: '2026-10-25', text: 'Nasce a carta do mundo: esta página, com o mapa de todos os lugares.' },
  { date: '2026-10-25', space: 'chapel', text: '“Capela de Estudos” passa a se chamar só Capela.' },
  { date: '2026-10-25', space: 'chapel', text: 'A Capela entra em obra. Fica fechada até a hora certa.' },
  { date: '2026-10-25', space: 'projects', text: 'Projetos e Estudos entram na prancheta.' },
  { date: '2026-10-19', space: 'chapel', text: 'A Capela ganha pedra, arcos e um ouro escondido.' },
  { date: '2026-10-18', space: 'portfolio', text: 'O portfólio ganha uma edição em inglês.' },
  { date: '2026-10-18', text: 'A identidade visual passa a vestir todo o mundo.' },
  { date: '2026-10-16', space: 'portfolio', text: 'Nasce o Mundo do Gustavo: a identidade, o portfólio e o currículo.' },
]

const MONTHS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

/** "25 out 2026" — the logbook's own short date, independent of the runtime locale. */
export function logDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  return `${d} ${MONTHS[m - 1]} ${y}`
}
