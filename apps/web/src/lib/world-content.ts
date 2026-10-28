// O mundo — every visible word of the home page (the map of the world), in one
// place. Portuguese only for now; an English edition comes later.
// The person stays discreet here: no bio, no place, no routine. The world
// shows its places; the faith is only hinted at, in the drawing.

import type { SpaceId } from './world'

export interface PlaceCopy {
  /** The building on the map (old-map italic): "a Oficina". */
  place: string
  /** The space's literal name: "Projetos". */
  name: string
  /** Which part of the title it answers: "o que eu construo". */
  verb: string
  text: string
  href?: string
  /** Pages inside the space, listed under it. */
  moons?: Array<{ label: string; href: string }>
}

export const WORLD = {
  name: 'Mundo do Gustavo',

  meta: {
    title: 'Mundo do Gustavo',
    description:
      'Coisas boas precisam ser vistas. Este é o mapa delas: o portfólio, os projetos, os estudos e a Capela de Gustavo Rodrigues Fabiano.',
  },

  shell: {
    skipLink: 'Pular para o conteúdo',
    brandSub: 'carta do mundo',
    resume: 'Currículo',
    dayNight: { toDay: 'Mudar para o modo dia', toNight: 'Mudar para o modo noite' },
  },

  opening: {
    rubric: 'prancha 0 · carta do mundo',
    corner: 'rev. 2026.10',
    statement: { before: 'O que eu', emphasis: 'acredito', after: ', aprendo e construo.' },
    lead: 'Coisas boas precisam ser vistas. Este é o mapa delas.',
    // Old atlases opened with the cartographer's portrait in a medallion.
    owner: {
      role: 'cartógrafo deste mundo',
      alt: 'Retrato de Gustavo Rodrigues Fabiano',
      more: 'Conhecer',
    },
  },

  map: {
    label: 'Carta do mundo: um mapa antigo com os lugares deste mundo',
    cartouche: 'Carta do Mundo',
    plate: 'prancha 0 · rev. 2026.10',
    author: 'cartógrafo · G. R. Fabiano',
    youAreHere: 'você está aqui',
    incognita: 'terra incognita',
    incognitaNote: 'ainda não desenhada',
    scale: 'esc. 1 : ∞',
    north: 'N',
    // Under the Southern Cross, small and faint: "a luz brilha nas trevas" (Jo 1,5).
    inscription: 'lux in tenebris lucet',
    hint: 'arraste para explorar o mapa',
    legend: {
      title: 'legenda',
      open: 'aberto',
      building: 'em construção',
      planned: 'na prancheta',
      trail: 'trilha',
      here: 'você está aqui',
    },
  },

  places: {
    portfolio: {
      place: 'a Antena',
      name: 'Portfólio',
      verb: 'o que eu faço',
      text: 'Carreira, currículo e serviços. O sinal que este mundo manda para fora.',
      href: '/portfolio',
      moons: [{ label: 'Currículo', href: '/portfolio/resume' }],
    },
    projects: {
      place: 'a Oficina',
      name: 'Projetos',
      verb: 'o que eu construo',
      text: 'Projetos de tecnologia, robótica e sociais, explicados de ponta a ponta, com imagens, vídeos e links.',
    },
    studies: {
      place: 'a Biblioteca',
      name: 'Estudos',
      verb: 'o que eu aprendo',
      text: 'Artigos e anotações sobre tecnologia, economia, vida espiritual e filosofia.',
      href: '/studies',
      moons: [
        { label: 'Artigos', href: '/studies?format=article' },
        { label: 'Anotações', href: '/studies?format=note' },
      ],
    },
    chapel: {
      place: 'a Capela',
      name: 'Capela',
      verb: 'o que eu acredito',
      text: 'Um lugar para contemplar.',
      href: '/chapel',
    },
  } satisfies Record<SpaceId, PlaceCopy>,

  atlas: {
    label: 'atlas',
    note: 'quatro lugares, um mundo',
    title: 'Os lugares deste mundo',
    enter: 'Entrar',
    states: { open: 'aberto', building: 'em construção', planned: 'na prancheta' },
  },

  logbook: {
    label: 'diário de bordo',
    note: 'as últimas mudanças no mundo',
    title: 'Diário de bordo',
    /** Tag for an entry about the world as a whole. */
    world: 'mundo',
  },

  footer: {
    text: 'Um mundo só, com lugares para o trabalho, os projetos, os estudos e o silêncio.',
    places: 'lugares',
    world: 'este mundo',
    identity: 'Identidade visual',
    contact: 'contato',
    email: 'E-mail',
    motto: 'feito com capricho',
  },
}

/** Order of the places, on the map and in the atlas. */
export const PLACE_ORDER: SpaceId[] = ['portfolio', 'projects', 'studies', 'chapel']
