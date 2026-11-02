// Every word a reader sees in the Blog. Posts themselves are MDX files in
// content/blog (ADR 0014); this module holds the space's own copy.
import type { Route } from 'next'
import type { PostFormat, PostTheme } from '@my-world/types'

export const BLOG_BASE = '/blog'

/** The index's list, where filtered links land (the carousel comes first). */
export const ALL_POSTS_ANCHOR = 'textos'

/** A page of its own, so no post may take this slug. */
export const POLICY_SLUG = 'policy'

export function policyPath(): Route {
  return `${BLOG_BASE}/${POLICY_SLUG}` as Route
}

/** `/blog` or one post's page. */
export function blogPath(slug?: string): Route {
  return `${BLOG_BASE}${slug ? `/${slug}` : ''}` as Route
}

export const BLOG = {
  name: 'Blog',
  author: 'Gustavo Rodrigues Fabiano',

  meta: {
    title: 'Blog',
    description: 'Artigos e anotações sobre tecnologia, economia, vida espiritual e filosofia.',
  },

  shell: {
    skipLink: 'Pular para o conteúdo',
    brandSub: 'artigos e anotações',
    dayNight: { toDay: 'Mudar para o modo dia', toNight: 'Mudar para o modo noite' },
    search: {
      open: 'Buscar',
      dialogLabel: 'Buscar no Blog',
      placeholder: 'Buscar artigos e anotações…',
      close: 'Fechar',
      empty: 'Nenhum texto encontrado.',
      hint: 'Digite ao menos duas letras.',
      loading: 'Buscando…',
    },
    worldBar: { label: 'Você está em', home: 'Mundo do Gustavo' },
  },

  index: {
    statement: { before: 'Artigos e anotações sobre o que eu', emphasis: 'aprendo', after: '.' },
    // REVIEW
    lead: 'Os artigos são textos acabados, passados a tinta. As anotações ainda estão a lápis: ideias em andamento, que podem virar artigo um dia.',
    carousel: {
      label: 'Textos em destaque',
      role: 'carrossel',
      previous: 'Texto anterior',
      next: 'Próximo texto',
      of: 'de',
      read: 'Ler o texto',
      motion: { pause: 'pausar', play: 'continuar' },
    },
    highlights: 'Destaques',
    all: 'Todos os textos',
    allAnchor: ALL_POSTS_ANCHOR,
    count: (n: number) => (n === 1 ? '1 texto' : `${n} textos`),
    empty: 'Nenhum texto publicado ainda.',
    filters: {
      formatLabel: 'Filtrar por formato',
      themeLabel: 'Filtrar por tema',
      allFormats: 'Tudo',
      allThemes: 'Todos os temas',
      tagLabel: 'Filtrar por assunto',
      // A post's subject chips link here (?tag=); pressed, it takes the filter off.
      tag: (tag: string) => `assunto: ${tag}`,
      clearTag: 'tirar o filtro',
      empty: 'Nenhum texto com esse filtro.',
      clear: 'Limpar filtros',
    },
  },

  // One post's page (/blog/[slug]).
  post: {
    notFound: 'Texto não encontrado',
    updated: (date: string) => `atualizado em ${date}`,
    tags: 'assuntos',
    outline: 'Neste texto',
    references: 'referências',
    // The note that grew into an article, and the way back (ADR 0015: "passed to ink").
    maturedInto: 'Esta anotação foi passada a tinta e virou o artigo',
    grewFrom: 'Começou a lápis, na anotação',
    // REVIEW
    byline: 'escreve aqui o que estuda',
    // The end of a post, in order (ADR 0019): byline, subjects, likes, comments, what to read next.
    actions: {
      like: 'Curtir',
      likesClosed: 'as curtidas abrem junto com os comentários',
      toComments: 'Comentar',
    },
    related: 'Leia também',
    back: 'Voltar ao Blog',
    backToTop: 'Voltar ao topo',
  },

  // The writing policy (/blog/policy, ADR 0033).
  // REVIEW: a draft from Gustavo's own words; the page is his to rewrite.
  policy: {
    title: 'Política dos textos',
    statement: { before: 'Todo texto aqui é escrito por', emphasis: 'mim', after: ', sem IA.' },
    lead: 'Os artigos e as anotações deste blog são escritos sem o uso de inteligência artificial. Todo texto é original e autêntico, de quem escreve.',
    why: {
      title: 'Por que escrevo assim',
      text: [
        'Escrever aqui não é só criar um texto. É mostrar como eu penso: a lógica, a forma de escrever, a narrativa e a estrutura de cada um.',
        'É também a forma de ver a minha evolução. Cada texto fica como registro de como eu escrevia naquele momento, e a diferença de um para o outro só diz alguma coisa se todos forem meus.',
      ],
    },
    notice: 'Todo texto aqui é escrito sem IA.',
    read: 'Ler a política dos textos',
  },

  // Words the Markdown compiler writes into a post (footnotes).
  mdx: {
    footnoteLabel: 'Notas',
    footnoteBackLabel: 'Voltar ao texto',
  },

  // The comments area under every post (ADR 0016).
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

  // What visitors see while the Blog is closed (lib/world.ts → status 'building').
  construction: {
    status: 'em construção',
    meta: {
      title: 'Blog — em construção',
      description: 'Artigos e anotações sobre tecnologia, economia, vida espiritual e filosofia. Em construção.',
    },
    statement: { before: 'O Blog ainda está sendo', emphasis: 'escrito', after: '.' },
    // REVIEW
    lead: 'Aqui vai abrir a Biblioteca: artigos e anotações sobre tecnologia, economia, vida espiritual e filosofia. As primeiras páginas ainda estão a lápis.',
    back: 'Voltar ao Mundo do Gustavo',
    drawing: 'Desenho de uma pequena biblioteca: as colunas a tinta, o frontão ainda a lápis e andaimes ao lado: uma obra em andamento.',
    // Strip over the Blog when it is opened in development or on a preview deployment.
    preview: 'só você vê o Blog — no ar, o público vê o aviso de obra',
  },

  /** The four broad themes; narrower subjects are tags. */
  themes: {
    tecnologia: { name: 'Tecnologia' },
    economia: { name: 'Economia' },
    'vida-espiritual': { name: 'Vida espiritual' },
    filosofia: { name: 'Filosofia' },
  } satisfies Record<PostTheme, { name: string }>,
  formats: {
    // gloss: the margin note on a post's page (ink and pencil, ADR 0015).
    article: { name: 'Artigo', plural: 'Artigos', gloss: 'passado a tinta: um texto acabado' },
    note: { name: 'Anotação', plural: 'Anotações', gloss: 'ainda a lápis: uma ideia em andamento' },
  } satisfies Record<PostFormat, { name: string; plural: string; gloss: string }>,
  /** The comments area (ADR 0016): shown on every post, closed until it has a backend. */
  comments: 'closed' as 'closed' | 'open',
  /** Likes (ADR 0019): the button is shown, closed until it has a backend. */
  likes: 'closed' as 'closed' | 'open',
} as const

export const POST_THEMES = Object.keys(BLOG.themes) as PostTheme[]
export const POST_FORMATS = Object.keys(BLOG.formats) as PostFormat[]
