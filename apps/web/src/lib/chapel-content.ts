// Capela — every visible word of the environment, in one place
// (same rule as the portfolio's content files). Portuguese only for now.
// Studies, categories and quotes come from lib/mock-data.ts until Strapi is wired.

import type { Route } from 'next'

export const CHAPEL_BASE = '/chapel'

export type ChapelPath = '' | '/articles' | '/categories' | '/saints' | '/about'

/** `/chapel` + a page path (and optional slug). */
export function chapelPath(path: ChapelPath, slug?: string): Route {
  return `${CHAPEL_BASE}${path}${slug ? `/${slug}` : ''}` as Route
}

export const CHAPEL = {
  name: 'Capela',
  author: 'Gustavo Rodrigues Fabiano',
  purpose: 'Uma biblioteca digital pessoal de estudos sobre espiritualidade católica, teologia e filosofia.',
  motto: 'Fides quaerens intellectum',

  meta: {
    title: 'Capela',
    description: 'Uma biblioteca de estudos sobre espiritualidade católica, teologia e filosofia.',
  },

  // What visitors see while the Capela is closed (lib/world.ts → status 'building').
  construction: {
    status: 'em construção',
    meta: {
      title: 'Capela — em construção',
      description: 'Um lugar para contemplar a beleza da Igreja e da vida espiritual. Em construção.',
    },
    statement: { before: 'A Capela ainda está sendo', emphasis: 'erguida', after: '.' },
    // REVIEW
    lead: 'Aqui vai nascer um lugar para contemplar a beleza da Igreja e da vida espiritual. Ele está sendo construído com calma e abre quando chegar a hora.',
    verse: { text: '“Se o Senhor não edificar a casa, em vão trabalham os que a edificam.”', source: 'Sl 127,1' },
    back: 'Voltar ao Mundo do Gustavo',
    drawing: 'Desenho de uma pequena capela com a torre ainda tracejada e andaimes ao lado: uma obra em andamento.',
    // Strip over the Capela when it is opened in development or on a preview deployment.
    preview: 'só você vê a Capela — no ar, o público vê o aviso de obra',
  },

  shell: {
    skipLink: 'Pular para o conteúdo',
    brandSub: 'estudos · gustavo rodrigues',
    navLabel: 'Seções da Capela',
    menu: 'Menu',
    nav: [
      { label: 'Início', path: '' as ChapelPath, exact: true },
      { label: 'Estudos', path: '/articles' as ChapelPath },
      { label: 'Categorias', path: '/categories' as ChapelPath },
      { label: 'Santos', path: '/saints' as ChapelPath },
      { label: 'Sobre', path: '/about' as ChapelPath },
    ],
    dayNight: { toDay: 'Mudar para o modo dia', toNight: 'Mudar para o modo noite' },
    worldBar: { label: 'Você está em', home: 'Mundo do Gustavo' },
    search: {
      open: 'Buscar',
      dialogLabel: 'Buscar estudos',
      placeholder: 'Buscar estudos…',
      close: 'Fechar',
      empty: 'Nenhum estudo encontrado.',
      hint: 'Digite ao menos duas letras.',
      loading: 'Buscando…',
    },
    footer: {
      chapel: 'nesta capela',
      themes: 'temas',
      landscapes: 'outras paisagens',
      world: 'Mundo do Gustavo',
      portfolio: 'Portfólio',
      notes: ['feito com capricho em Londrina'],
    },
  },

  home: {
    label: 'Fides quaerens intellectum',
    statement: { before: 'Conhecimento para ordenar a', emphasis: 'inteligência', after: ' a Deus.' },
    lead: 'Uma biblioteca de estudos sobre espiritualidade católica, teologia e filosofia. Para quem busca profundidade, não superfície.',
    ctaStudies: 'Explorar estudos',
    ctaThemes: 'Navegar por tema',
    // The altar at the end of the nave: Duccio's Last Supper (public domain).
    supper: {
      label: 'A Última Ceia',
      alt: 'Última Ceia, de Duccio: Jesus à mesa com os doze apóstolos, as auréolas em folha de ouro; João recosta-se junto ao Mestre.',
      verse: '“Fazei isto em memória de mim.”',
      verseSource: 'Lc 22,19',
      credit: 'Duccio di Buoninsegna · Última Ceia, painel da Maestà (1308–1311) · Siena · domínio público',
    },
    citations: {
      pause: 'pausar',
      play: 'continuar',
      next: 'próxima',
      label: 'Citações dos santos e doutores da Igreja',
    },
    latest: {
      title: 'Últimos estudos',
      note: 'o que saiu da escrivaninha',
      featured: 'Em destaque',
      read: 'Ler o estudo',
      all: 'Ver todos os estudos',
    },
    themes: {
      title: 'Navegar por tema',
      note: 'por onde começar',
    },
    author: {
      title: 'Quem escreve',
      note: 'um estudante, não um mestre',
      text: 'Sou Gustavo Rodrigues Fabiano — desenvolvedor de software e católico praticante. Não sou teólogo. Não sou filósofo. Sou um estudante. Tudo aqui é uma tentativa honesta de compreender — não um pronunciamento de autoridade.',
      role: 'desenvolvedor e estudante · Londrina, PR',
      more: 'Sobre a Capela',
      portfolio: 'Conhecer o portfólio',
    },
  },

  studies: {
    label: 'Biblioteca',
    title: 'Todos os estudos',
    intro: 'Reflexões e aprofundamentos sobre a fé católica.',
    filterLabel: 'Filtrar por tema',
    all: 'Todos',
    empty: 'Nenhum estudo neste tema ainda.',
  },

  study: {
    label: 'Estudo',
    tags: 'Marcadores',
    references: 'Referências',
    back: 'Voltar aos estudos',
    notFound: 'Não encontrado',
  },

  categories: {
    label: 'Temas',
    labelOne: 'Tema',
    title: 'Explorar por tema',
    intro: 'Escolha uma área e mergulhe nos estudos relacionados.',
    empty: 'Nenhum estudo publicado nesta categoria ainda.',
    back: 'Todos os temas',
  },

  saints: {
    label: 'Santos',
    title: 'Vidas que apontam ao Céu',
    intro: 'Estudos sobre a vida e o pensamento dos santos da Igreja Católica.',
    empty: 'Ainda não há estudos sobre Santos publicados.',
  },

  about: {
    label: 'Sobre a Capela',
    statement: { before: 'Uma busca por', emphasis: 'profundidade', after: ', não por superfície.' },
    sections: [
      {
        paragraphs: [
          'Sou Gustavo Rodrigues Fabiano — desenvolvedor de software e católico praticante. Há alguns anos comecei a sentir que a fé que recebi na infância precisava ser aprofundada. Não era insatisfação. Era fome.',
          'Comecei a ler: Santo Agostinho, São Tomás de Aquino, Santa Teresa de Ávila, São João da Cruz. Descobri que quanto mais estudava, mais a fé se tornava viva, inteligente, enraizada — e mais eu queria partilhá-la.',
        ],
      },
      {
        title: 'Por que este espaço existe',
        paragraphs: [
          'Criei este espaço para registrar o que estou aprendendo. Escrever obriga a pensar com clareza. E partilhar convida outros a pensar junto.',
          'Não sou teólogo. Não sou filósofo. Sou um estudante. Tudo aqui é uma tentativa honesta de compreender — não um pronunciamento de autoridade.',
        ],
      },
      {
        title: 'O que você vai encontrar aqui',
        paragraphs: [
          'Estudos sobre espiritualidade, teologia, filosofia e vida cristã. Às vezes breves — uma ideia, uma citação. Às vezes longos — um tema desenvolvido com cuidado.',
        ],
      },
    ],
    // The closing thread: the motto in the voice face, then its gloss.
    thread: {
      before: 'O fio que une tudo:',
      motto: 'fides quaerens intellectum',
      after: '— a fé em busca de compreensão. A convicção de que crer e pensar não se excluem, mas se iluminam.',
    },
    cta: 'Começar a explorar',
    quote: { text: 'Nosso coração está inquieto até que encontre repouso em Ti.', source: 'Santo Agostinho, Confissões' },
  },

  /** "12 estudos" / "1 estudo". */
  studyCount: (n: number) => `${n} ${n === 1 ? 'estudo' : 'estudos'}`,
  /** "6 temas" / "1 tema". */
  themeCount: (n: number) => `${n} ${n === 1 ? 'tema' : 'temas'}`,
}
