// Every word a reader sees in Estudos. Studies themselves are MDX files in
// content/studies (ADR 0014); this module holds the space's own copy.
import type { Route } from 'next'
import type { StudyFormat, StudyTheme } from '@my-world/types'

export const STUDIES_BASE = '/studies'

/** `/studies` or one study's page. */
export function studiesPath(slug?: string): Route {
  return `${STUDIES_BASE}${slug ? `/${slug}` : ''}` as Route
}

export const STUDIES = {
  name: 'Estudos',
  author: 'Gustavo Rodrigues Fabiano',
  // REVIEW
  purpose: 'Artigos e anotações sobre tecnologia, economia, vida espiritual e filosofia: o que eu aprendo, escrito para não esquecer.',

  meta: {
    title: 'Estudos',
    description: 'Artigos e anotações sobre tecnologia, economia, vida espiritual e filosofia.',
  },

  shell: {
    skipLink: 'Pular para o conteúdo',
    brandSub: 'artigos e anotações',
    dayNight: { toDay: 'Mudar para o modo dia', toNight: 'Mudar para o modo noite' },
    search: {
      open: 'Buscar',
      dialogLabel: 'Buscar nos Estudos',
      placeholder: 'Buscar artigos e anotações…',
      close: 'Fechar',
      empty: 'Nenhum estudo encontrado.',
      hint: 'Digite ao menos duas letras.',
      loading: 'Buscando…',
    },
    worldBar: { label: 'Você está em', home: 'Mundo do Gustavo' },
    footer: {
      themes: 'temas',
      landscapes: 'outras paisagens',
      world: 'Mundo do Gustavo',
      portfolio: 'Portfólio',
    },
  },

  index: {
    statement: { before: 'Artigos e anotações sobre o que eu', emphasis: 'aprendo', after: '.' },
    // REVIEW
    lead: 'Os artigos são estudos acabados, passados a tinta. As anotações ainda estão a lápis: ideias em andamento, que podem virar artigo um dia.',
    count: (n: number) => (n === 1 ? '1 estudo' : `${n} estudos`),
    empty: 'Nenhum estudo publicado ainda.',
    filters: {
      formatLabel: 'Filtrar por formato',
      themeLabel: 'Filtrar por tema',
      allFormats: 'Tudo',
      allThemes: 'Todos os temas',
      empty: 'Nenhum estudo com esse filtro.',
      clear: 'Limpar filtros',
    },
  },

  // One study's page (/studies/[slug]).
  study: {
    notFound: 'Estudo não encontrado',
    updated: (date: string) => `atualizado em ${date}`,
    tags: 'assuntos',
    references: 'referências',
    // The note that grew into an article, and the way back (ADR 0015: "passed to ink").
    maturedInto: 'Esta anotação foi passada a tinta e virou o artigo',
    grewFrom: 'Começou a lápis, na anotação',
    // REVIEW
    byline: 'escreve aqui o que estuda',
    back: 'Voltar aos Estudos',
  },

  // The comments area under every study (ADR 0016).
  commentsArea: {
    title: 'Comentários',
    closed: 'Os comentários abrem em breve. Por enquanto, o espaço está só desenhado.',
    empty: 'Nenhum comentário ainda.',
    form: {
      legend: 'Deixe um comentário',
      name: 'Nome',
      email: 'E-mail',
      emailHint: 'não será publicado',
      body: 'Comentário',
      submit: 'Enviar comentário',
    },
  },

  // What visitors see while Estudos is closed (lib/world.ts → status 'building').
  construction: {
    status: 'em construção',
    meta: {
      title: 'Estudos — em construção',
      description: 'Artigos e anotações sobre tecnologia, economia, vida espiritual e filosofia. Em construção.',
    },
    statement: { before: 'Os Estudos ainda estão sendo', emphasis: 'escritos', after: '.' },
    // REVIEW
    lead: 'Aqui vai abrir a Biblioteca: artigos e anotações sobre tecnologia, economia, vida espiritual e filosofia. As primeiras páginas ainda estão a lápis.',
    back: 'Voltar ao Mundo do Gustavo',
    drawing: 'Desenho de uma pequena biblioteca: as colunas a tinta, o frontão ainda a lápis e andaimes ao lado: uma obra em andamento.',
    // Strip over Estudos when it is opened in development or on a preview deployment.
    preview: 'só você vê os Estudos — no ar, o público vê o aviso de obra',
  },

  /** The four broad themes; narrower subjects are tags. */
  themes: {
    tecnologia: { name: 'Tecnologia' },
    economia: { name: 'Economia' },
    'vida-espiritual': { name: 'Vida espiritual' },
    filosofia: { name: 'Filosofia' },
  } satisfies Record<StudyTheme, { name: string }>,
  formats: {
    // gloss: the margin note on a study's page (ink and pencil, ADR 0015).
    article: { name: 'Artigo', plural: 'Artigos', gloss: 'passado a tinta: um estudo acabado' },
    note: { name: 'Anotação', plural: 'Anotações', gloss: 'ainda a lápis: uma ideia em andamento' },
  } satisfies Record<StudyFormat, { name: string; plural: string; gloss: string }>,
  /** The comments area (ADR 0016): shown on every study, closed until it has a backend. */
  comments: 'closed' as 'closed' | 'open',
} as const

export const STUDY_THEMES = Object.keys(STUDIES.themes) as StudyTheme[]
export const STUDY_FORMATS = Object.keys(STUDIES.formats) as StudyFormat[]
