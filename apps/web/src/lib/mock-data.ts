import type { Article, ArticleCard, Category } from '@my-world/types'

export const MOCK_CATEGORIES: Category[] = [
  {
    id: 1, documentId: 'cat-1',
    name: 'Espiritualidade', slug: 'espiritualidade',
    description: 'Vida interior, oração contemplativa e caminho de santidade.',
    icon: 'cross', articleCount: 12,
    createdAt: '2025-01-01', updatedAt: '2025-01-01',
  },
  {
    id: 2, documentId: 'cat-2',
    name: 'Santos', slug: 'santos',
    description: 'Vidas exemplares que nos apontam ao céu.',
    icon: 'sparkles', articleCount: 8,
    createdAt: '2025-01-01', updatedAt: '2025-01-01',
  },
  {
    id: 3, documentId: 'cat-3',
    name: 'Liturgia', slug: 'liturgia',
    description: 'A beleza e profundidade do culto católico.',
    icon: 'flame', articleCount: 6,
    createdAt: '2025-01-01', updatedAt: '2025-01-01',
  },
  {
    id: 4, documentId: 'cat-4',
    name: 'Teologia', slug: 'teologia',
    description: 'Doutrina, dogma e fé iluminada pela razão.',
    icon: 'book-open', articleCount: 8,
    createdAt: '2025-01-01', updatedAt: '2025-01-01',
  },
  {
    id: 5, documentId: 'cat-5',
    name: 'Filosofia', slug: 'filosofia',
    description: 'Razão, metafísica e pensamento clássico cristão.',
    icon: 'brain', articleCount: 7,
    createdAt: '2025-01-01', updatedAt: '2025-01-01',
  },
  {
    id: 6, documentId: 'cat-6',
    name: 'Vida Moral', slug: 'vida-moral',
    description: 'Ética, virtude e o bem agir segundo a tradição católica.',
    icon: 'scale', articleCount: 5,
    createdAt: '2025-01-01', updatedAt: '2025-01-01',
  },
]

export const MOCK_ARTICLES: ArticleCard[] = [
  {
    id: 1, documentId: 'art-1',
    title: 'Por que a vida interior é o fundamento de tudo o que fazemos',
    slug: 'vida-interior-fundamento',
    summary: 'Há uma tentação moderna de buscar a transformação de fora para dentro. Mas a tradição católica, de Agostinho a João da Cruz, ensina o caminho inverso.',
    readingTime: 12,
    publishedAt: '2025-06-01T10:00:00Z',
    coverImage: null,
    category: MOCK_CATEGORIES[0],
  },
  {
    id: 2, documentId: 'art-2',
    title: 'A oração como escola do silêncio interior',
    slug: 'oracao-escola-silencio',
    summary: 'Quando a oração deixa de ser palavra e se torna escuta, algo muda profundamente na alma.',
    readingTime: 8,
    publishedAt: '2025-06-03T10:00:00Z',
    coverImage: null,
    category: MOCK_CATEGORIES[0],
  },
  {
    id: 3, documentId: 'art-3',
    title: 'Introdução ao pensamento de São Tomás de Aquino',
    slug: 'pensamento-tomas-aquino',
    summary: 'Como o Doutor Angélico reconciliou fé e razão e por que isso ainda importa hoje.',
    readingTime: 14,
    publishedAt: '2025-05-18T10:00:00Z',
    coverImage: null,
    category: { ...MOCK_CATEGORIES[4], name: 'Filosofia · Santos' },
  },
  {
    id: 4, documentId: 'art-4',
    title: 'O que a Missa nos ensina sobre o tempo sagrado',
    slug: 'missa-tempo-sagrado',
    summary: 'A liturgia não é apenas um rito. É a forma pela qual a Igreja habita o tempo de um modo diferente do mundo.',
    readingTime: 10,
    publishedAt: '2025-05-07T10:00:00Z',
    coverImage: null,
    category: MOCK_CATEGORIES[2],
  },
  {
    id: 5, documentId: 'art-5',
    title: 'Santo Agostinho e a inquietação do coração',
    slug: 'agostinho-inquietacao-coracao',
    summary: 'As Confissões não são apenas uma autobiografia — são uma teologia da conversão que ressoa em cada geração.',
    readingTime: 9,
    publishedAt: '2025-04-20T10:00:00Z',
    coverImage: null,
    category: MOCK_CATEGORIES[1],
  },
  {
    id: 6, documentId: 'art-6',
    title: 'A virtude como hábito: o que Aristóteles e a tradição têm a dizer',
    slug: 'virtude-habito-aristoteles',
    summary: 'Virtude não é talento inato nem esforço isolado — é um modo de ser que se adquire pelo exercício constante.',
    readingTime: 8,
    publishedAt: '2025-03-10T10:00:00Z',
    coverImage: null,
    category: MOCK_CATEGORIES[5],
  },
]

export const MOCK_FEATURED_ARTICLE: ArticleCard = MOCK_ARTICLES[0]

export const MOCK_ARTICLE_FULL: Article = {
  ...MOCK_ARTICLES[0],
  content: `A tentação moderna é buscar a transformação de fora para dentro. Mudamos o ambiente, a rotina, os hábitos externos — e esperamos que o interior siga. Mas a tradição católica, em seus maiores mestres, ensina o caminho inverso.

## A inversão necessária

Santo Agostinho, no início das Confissões, escreve: *"Nosso coração está inquieto até que encontre repouso em Ti."* A inquietação não é um defeito a corrigir — é o sinal de que somos feitos para algo que o mundo não pode dar.

São João da Cruz, séculos depois, radicaliza essa intuição. No caminho para o cume do Monte Carmelo, é preciso esvaziar, não acrescentar. *"Para chegar a ser o que não és, deves ir por onde não és."*

> "Conhece-te a ti mesmo, e conhecerás a Deus." — Santo Agostinho, Solilóquios

## O que é a vida interior

Não é introspecção psicológica. Não é meditação para reduzir o estresse. A vida interior, no sentido espiritual cristão, é a progressiva abertura da alma à ação de Deus — o que a tradição chama de oração, contemplação e, no limite, união mística.

## Por que isso importa na prática

A tentação é pensar que a vida espiritual é uma área da vida — como o trabalho ou a família. Mas os mestres são unânimes: ela é o fundamento de todas as demais. A qualidade de nossa presença no mundo depende da qualidade de nossa presença interior.

Uma pessoa sem vida interior age por impulso, reação, medo ou orgulho. Uma pessoa com vida interior age por amor — mesmo que lentamente, mesmo que imperfeitamente.`,
  tags: [
    { id: 1, documentId: 'tag-1', name: 'Espiritualidade', slug: 'espiritualidade', createdAt: '2025-01-01', updatedAt: '2025-01-01' },
    { id: 2, documentId: 'tag-2', name: 'São João da Cruz', slug: 'sao-joao-da-cruz', createdAt: '2025-01-01', updatedAt: '2025-01-01' },
    { id: 3, documentId: 'tag-3', name: 'Santo Agostinho', slug: 'santo-agostinho', createdAt: '2025-01-01', updatedAt: '2025-01-01' },
  ],
  references: [
    'Santo Agostinho, Confissões (Paulus, 2017)',
    'São João da Cruz, Subida do Monte Carmelo (BAC, 2012)',
    'Thomas Dubay, Fire Within (Ignatius Press, 1989)',
  ],
  status: 'published',
  createdAt: '2025-06-01T10:00:00Z',
  updatedAt: '2025-06-01T10:00:00Z',
}

export const MOCK_CITATIONS = [
  { text: 'Nosso coração está inquieto até que encontre repouso em Ti.', author: 'Santo Agostinho', source: 'Confissões' },
  { text: 'A verdade é a adequação da inteligência à realidade.', author: 'São Tomás de Aquino', source: 'Suma Teológica' },
  { text: 'A fé procura entender.', author: 'Santo Anselmo de Cantuária', source: '' },
  { text: 'A santidade não é luxo de poucos, mas dever de todos.', author: 'Santa Teresa de Calcutá', source: '' },
  { text: 'Amar é querer o bem do outro.', author: 'São Tomás de Aquino', source: '' },
]
