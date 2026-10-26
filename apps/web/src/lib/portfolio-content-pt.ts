import type { PortfolioCopy } from './portfolio-content'

// Portuguese — the original. The English edition (portfolio-content-en.ts) mirrors it.

export const pt: PortfolioCopy = {
  profile: {
    role: 'Desenvolvedor Fullstack Pleno',
    city: 'Londrina, PR',
    region: 'Paraná, Brasil',
    motto: 'feito com capricho',
    purpose:
      'Este espaço reúne o que acredito, o que aprendo e o que construo — como desenvolvedor, como cristão e como ser humano.',
    duality: 'razão e fé, técnica e propósito',
  },

  meta: {
    defaultTitle: 'Gustavo Rodrigues — Desenvolvedor Fullstack',
    description:
      'Portfólio de Gustavo Rodrigues Fabiano, desenvolvedor fullstack: React, Next.js, TypeScript, NestJS, Design Systems e desenvolvimento com IA. Londrina, PR.',
    portfolio: {
      title: 'Gustavo Rodrigues — Desenvolvedor Fullstack',
      description:
        'Software feito com capricho, da interface ao servidor. Portfólio, trajetória e artefatos de Gustavo Rodrigues Fabiano, desenvolvedor fullstack em Londrina.',
    },
    resume: {
      title: 'Currículo',
      description:
        'Currículo de Gustavo Rodrigues Fabiano — Desenvolvedor Fullstack Pleno. React, Next.js, TypeScript, NestJS, Design Systems e desenvolvimento com IA.',
    },
    identity: {
      title: 'Identidade visual',
      description:
        'A identidade visual de Gustavo Rodrigues Fabiano: a marca G-órbita, cores, tipografia, elementos gráficos, movimento e voz.',
    },
  },

  statusLabel: {
    production: 'em produção',
    building: 'em construção',
    prototype: 'protótipo',
    'drawing-board': 'na prancheta',
  },

  shell: {
    skipLink: 'Pular para o conteúdo',
    brandSub: 'fullstack · londrina',
    navLabel: 'Seções do portfólio',
    nav: [
      { label: 'Sobre', id: 'about' },
      { label: 'Trajetória', id: 'journey' },
      { label: 'Artefatos', id: 'artifacts' },
      { label: 'Ferramentas', id: 'tools' },
      { label: 'Contato', id: 'contact' },
    ],
    resume: 'Currículo',
    language: { label: 'Idioma' },
    dayNight: { toDay: 'Mudar para o modo dia', toNight: 'Mudar para o modo noite' },
    worldBar: { label: 'Você está em', home: 'Mundo do Gustavo' },
    footer: {
      home: 'Carta do mundo',
      world: 'neste mundo',
      landscapes: 'outras paisagens',
      contact: 'contato',
      portfolio: 'Portfólio',
      resume: 'Currículo',
      identity: 'Identidade visual',
      email: 'E-mail',
      inCity: 'em Londrina',
      building: 'em construção',
    },
  },

  // Section headings and glosses. Titles stay literal; the metaphor lives in the margins.
  copy: {
    about: { label: 'sobre', note: 'quem eu sou, o que eu faço e por quê' },
    journey: {
      label: 'trajetória',
      note: '2021 → hoje, em ordem cronológica',
      title: 'Da primeira faísca à linha de produção',
      intro:
        'Cada empresa foi uma órbita nova: mais responsabilidade, sistemas maiores e mais gente usando o que eu construo.', // REVIEW
    },
    artifacts: {
      label: 'artefatos',
      note: 'o que saiu da oficina e está em órbita',
      title: 'Artefatos em órbita',
      intro:
        'O trabalho em produção é confidencial, então aqui ele aparece como ficha técnica: o que é, o que faz, qual foi a minha parte e com o que foi feito.',
      prototypesTitle: 'Primeiras peças da oficina',
      prototypes:
        'Protótipos de estudo, de 2021 e 2022 — os primeiros projetos que levei do começo ao fim.',
      drawingBoardTitle: 'Na prancheta',
      drawingBoard: 'Os próximos artefatos, escolhidos para cobrir o que ainda quero dominar.',
      labels: {
        role: 'meu papel',
        decision: 'decisão',
        does: 'o que faz',
        stack: 'ferramentas',
        confidential: 'projeto sob confidencialidade — sem capturas públicas',
        onGithub: 'no GitHub (abre em nova aba)',
      },
    },
    tools: {
      label: 'ferramentas',
      note: 'quanto mais perto do núcleo, mais uso',
      title: 'Ferramentas da oficina',
      intro:
        'Em vez de uma grade de logos, uma carta orbital: a distância do centro mostra com que frequência cada ferramenta está na minha mão.',
      core: 'Gustavo — o núcleo',
      aiLabel: 'ia · todo dia',
      aiTitle: 'IA no dia a dia',
      aiText:
        'Ferramentas e práticas que uso todos os dias para ganhar agilidade sem perder a estrutura do projeto.',
    },
    credentials: {
      label: 'formação',
      note: 'formação, certificados e idiomas',
      title: 'Formação e registros',
      education: 'formação acadêmica',
      certifications: 'certificados',
      languages: 'idiomas',
    },
    services: {
      label: 'serviços',
      note: 'como eu trabalho e onde posso ajudar',
      title: 'Como posso ajudar',
      intro:
        'Toda ideia passa pela mesma linha da oficina antes de entrar em órbita. É assim que eu trabalho em time e em projetos próprios.', // REVIEW
      line: 'da ideia à órbita',
      companies: 'já trabalhei com',
    },
    contact: { label: 'contato', resume: 'Currículo' },
  },

  hero: {
    rubric: 'prancha i · o mundo do gustavo',
    kicker: 'Engenheiro de software e IA',
    // The emphasized word is rendered in the voice face (serif italic, rubric red).
    statement: {
      before: 'Software feito com',
      emphasis: 'capricho',
      after: ', da interface ao servidor.',
    },
    lead: 'Especializado em experiência do usuário e na construção de sistemas amigáveis ao usuário final — do frontend ao backend.',
    ctaResume: 'Ver currículo',
    ctaArtifacts: 'Conhecer os artefatos',
    caption: 'fig. 1 — o mundo do gustavo, em vista orbital',
    legend: [
      { n: '1', name: 'Cruzeiro do Sul', text: 'o céu de casa. As ideias chegam de cima.' },
      { n: '2', name: 'Oficina', text: 'onde a ideia vira código.' },
      { n: '3', name: 'Capela', text: 'onde tudo ganha sentido.' },
      { n: '4', name: 'Órbitas', text: 'o que já está em produção.' },
    ],
    titleBlock: {
      work: 'obra',
      author: 'autor',
      place: 'local',
      coordinates: 'coordenadas',
      timezone: 'fuso',
      revision: 'revisão',
    },
    figure: {
      title: 'Fig. 1 — O mundo do Gustavo, em vista orbital',
      desc: 'Um pequeno planeta desenhado em traço fino, com uma oficina, uma capela e um cipreste na superfície. Uma faísca cai do Cruzeiro do Sul na chaminé da oficina, que se acende e lança um novo artefato em órbita, ao lado de outros satélites.',
      scale: 'vista orbital · esc. 1 : ∞',
      pause: 'pausar o mundo',
      play: 'girar o mundo',
    },
  },

  about: {
    title: { before: 'Um pedaço de', emphasis: 'quem eu sou' },
    paragraphs: [
      'Comecei a programar em 2021, estudando por conta própria, e desde 2022 é a minha profissão. Passei por empresas do mercado financeiro — EWZ Capital, MundoInvest e Cash2Pay — e hoje sou desenvolvedor fullstack pleno na Big4Tech, aqui em Londrina.',
      'Tenho mais experiência no frontend, mas trabalho como fullstack e meu interesse é evoluir nos dois ambientes. O que eu mais gosto é construir coisas bem-feitas — seja uma interface, uma API ou a arquitetura que sustenta as duas.',
      'Uso IA no dia a dia e configuro os projetos para se adaptarem à geração de código por IA, de forma que a estrutura acompanhe o crescimento: ganhamos agilidade e mantemos a qualidade. Claude, Codex, Copilot e MCPs são ferramentas de todo dia, junto com engenharia de IA e o planejamento e a construção de requisitos.',
      // REVIEW
      'Também sou católico, e isso atravessa o meu jeito de trabalhar: fazer bem-feito é uma forma de respeito com quem vai usar. É daí que vem o capricho — e é por isso que este mundo também tem uma capela.',
    ],
    facts: [
      { label: 'base', value: 'Londrina, PR · UTC−3' },
      { label: 'atuação', value: 'Fullstack, mais experiência no frontend' },
      { label: 'ia', value: 'Claude, Codex, Copilot, MCPs' },
      { label: 'formação', value: 'ADS · UniFil, em andamento' },
      { label: 'idiomas', value: 'Português nativo · Inglês em evolução' },
      { label: 'desde', value: '2021 autodidata · 2022 trabalhando' },
    ],
    principlesLabel: 'princípios da oficina',
    // REVIEW: the four principles are a draft manifesto.
    principles: [
      {
        title: 'Capricho é respeito.',
        text: 'Fazer bem-feito é uma forma de cuidar de quem vai usar.',
      },
      {
        title: 'Sistema antes de tela.',
        text: 'Tokens, componentes e padrões que deixam o time rápido sem perder a coerência.',
      },
      {
        title: 'Clareza antes de esperteza.',
        text: 'Código que o próximo dev entende de primeira.',
      },
      { title: 'Aprender em público.', text: 'Documentar o caminho, inclusive os erros.' },
    ],
    portraitAlt: 'Retrato de Gustavo Rodrigues Fabiano',
  },

  // Chronological on purpose (Notion: "timeline … em ordem cronológica"); the résumé is reverse-chronological.
  journey: [
    {
      period: '2021',
      title: 'Primeira faísca',
      kind: 'study',
      text: 'Comecei minha jornada estudando programação de forma autodidata e montei os primeiros protótipos: um app de anotações com documentação própria, autenticação com front e back separados e uma loja virtual.',
    },
    {
      period: 'set 2022 — dez 2024',
      title: 'EWZ Capital',
      role: 'Frontend Developer Júnior',
      place: 'São Paulo',
      kind: 'work',
      text: 'Primeiro emprego, no mercado financeiro: minha adaptação ao mercado de tecnologia, com várias pessoas me ajudando e ensinando no processo. Com foco em frontend, aprendi como é a rotina de um desenvolvedor e tive os primeiros contatos com metodologias ágeis.',
    },
    {
      period: 'jan 2024 — dez 2024',
      title: 'MundoInvest',
      role: 'Frontend Developer Pleno',
      place: 'São Paulo',
      kind: 'work',
      text: 'Já adaptado à rotina, tive mais liberdade para desenvolver e entregar requisitos, ainda com acompanhamento. Trabalhei principalmente numa plataforma de acompanhamento de investimentos, bolsa de valores e educação financeira; meu grande marco foi o desenvolvimento completo de um ambiente de aulas online — o frontend inteiro e apoio no backend.',
    },
    {
      period: 'dez 2024 — fev 2025',
      title: 'Cash2Pay',
      role: 'Desenvolvedor Frontend Júnior',
      place: 'Londrina',
      kind: 'work',
      text: 'Já com bagagem para trabalhar de forma mais autônoma, fui responsável pela plataforma frontend do negócio. Meu principal marco foi organizar, de forma estruturada e planejada, um ambiente mais eficiente para o time de frontend entregar com mais qualidade e agilidade.',
    },
    {
      period: 'fev 2025 — hoje',
      title: 'Big4Tech',
      role: 'Desenvolvedor Fullstack Pleno',
      place: 'Londrina',
      kind: 'work',
      current: true,
      text: 'Sigo responsável por várias plataformas frontend, agora também com autonomia fullstack para entregar requisitos de ponta a ponta: o onboarding de clientes com KYC e biometria facial, um monorepo eficiente para os sistemas frontend, uma esteira de cobrança automatizada e telas do app mobile e do CRM web.',
    },
    {
      period: 'em curso',
      title: 'Próxima manobra',
      kind: 'now',
      text: 'Cursando ADS na UniFil e estudando estratégia de testes, arquitetura em escala e inglês técnico todos os dias — com três projetos novos saindo da prancheta.',
    },
  ],

  artifacts: [
    {
      slug: 'onboarding-digital',
      code: 'A-01',
      title: 'Onboarding Digital',
      org: 'Big4Tech',
      period: '2025 — hoje',
      kind: 'Plataforma web',
      status: 'production',
      what: 'O caminho completo para um cliente se cadastrar e ter a identidade validada, sem sair da tela.',
      does: [
        'Verificação de clientes (KYC)',
        'Biometria facial com prova de vida (liveness)',
        'Autenticação baseada em conhecimento (KBA)',
        'Assinatura eletrônica',
      ],
      role: 'Desenvolvimento do produto e das integrações de KYC, biometria facial, KBA e assinatura.',
      stack: ['React', 'Next.js', 'TypeScript', 'Design System'], // REVIEW
      confidential: true,
    },
    {
      slug: 'painel-do-cliente',
      code: 'A-02',
      title: 'Painel do Cliente',
      org: 'Big4Tech',
      period: '2025 — hoje',
      kind: 'Plataforma web',
      status: 'production',
      what: 'Plataforma de dashboard para os clientes finais acompanharem e operarem o que contrataram.', // REVIEW
      does: [
        'Experiência pensada para uso diário',
        'Performance como requisito',
        'Escala para muitos clientes',
      ],
      role: 'Construção da plataforma, com foco em experiência, performance e escalabilidade.',
      stack: ['React', 'Next.js', 'TypeScript'], // REVIEW
      confidential: true,
    },
    {
      slug: 'monorepo-design-system',
      code: 'A-03',
      title: 'Monorepo e Design System',
      org: 'Big4Tech',
      period: '2025 — hoje',
      kind: 'Arquitetura',
      status: 'production',
      what: 'Um ambiente multiplataforma em que web e mobile compartilham orquestração, padrões e um Design System central.',
      does: [
        'Orquestração compartilhada das aplicações',
        'Design System único para web e mobile',
        'Qualidade de código, automações e workflows do time',
        'Ambiente preparado para AI Engineering',
      ],
      role: 'Estruturação do monorepo, padronização do Design System e das ferramentas do time.',
      stack: ['Monorepo', 'React', 'React Native', 'Expo', 'TypeScript'], // REVIEW
      confidential: true,
    },
    {
      slug: 'mundo-do-gustavo',
      code: 'A-04',
      title: 'Mundo do Gustavo',
      org: 'Projeto pessoal',
      period: '2026',
      kind: 'Site e identidade',
      status: 'building',
      what: 'Este site: portfólio, currículo e identidade visual num só sistema — e a vitrine do meu frontend de ponta a ponta.',
      does: [
        'Identidade própria, de tokens em TypeScript até o CSS gerado',
        'Ilustração animada em SVG, leve e pausável',
        'Currículo gerado dos mesmos dados, pronto para imprimir',
      ],
      role: 'Design e desenvolvimento.',
      note: 'O mundo do topo é SVG, não WebGL: o texto continua sendo o maior elemento da página, e a animação para para quem prefere menos movimento.',
      stack: ['Next.js 15', 'TypeScript', 'Tailwind CSS 4', 'Turborepo'],
    },
  ],

  prototypes: [
    {
      title: 'good-notes',
      year: '2022',
      text: 'App de anotações, com documentação própria do projeto.',
      links: [
        { label: 'docs', href: 'https://github.com/GustavoRodrigue-s/good-notes' },
        { label: 'front', href: 'https://github.com/GustavoRodrigue-s/good-notes-frontend' },
      ],
    },
    {
      title: 'auth-app',
      year: '2022',
      text: 'Autenticação com front e back separados, em TypeScript.',
      links: [
        { label: 'front', href: 'https://github.com/GustavoRodrigue-s/Auth-app-frontend' },
        { label: 'back', href: 'https://github.com/GustavoRodrigue-s/Auth-app-backend' },
      ],
    },
    {
      title: 'tech-store',
      year: '2022',
      text: 'Loja virtual em TypeScript.',
      links: [{ label: 'código', href: 'https://github.com/GustavoRodrigue-s/tech-store' }],
    },
    {
      title: 'links',
      year: '2022',
      text: 'App em React Native, feito a partir de um curso da Rocketseat.',
      links: [{ label: 'código', href: 'https://github.com/GustavoRodrigue-s/links-rocketseat' }],
    },
  ],

  drawingBoard: [
    { title: 'Painel Kanban com Pipeline', text: 'Estado global com Redux, testes e CI/CD.' },
    {
      title: 'Loja Composable',
      text: 'Next.js, GraphQL, Design System, performance e acessibilidade.',
    },
    { title: 'Catálogo com API própria', text: 'Backend, banco de dados e algoritmos.' },
  ],

  // REVIEW: which orbit each tool sits in is a judgment call.
  toolOrbits: [
    {
      name: 'todo dia',
      caption: 'órbita i',
      tools: ['TypeScript', 'React', 'Next.js', 'Node.js', 'NestJS', 'Design System'],
    },
    {
      name: 'com frequência',
      caption: 'órbita ii',
      tools: [
        'React Native',
        'Expo',
        'TypeORM',
        'RabbitMQ',
        'PostgreSQL',
        'Tailwind CSS',
        'Docker',
        'Git',
        'Figma',
      ],
    },
    {
      name: 'no radar',
      caption: 'órbita iii',
      tools: [
        'Angular',
        'Spring Boot',
        'Redux',
        'Jest',
        'Testing Library',
        'GraphQL',
        'Prisma',
        'MongoDB',
      ],
    },
  ],

  aiTools: [
    'Claude',
    'Codex',
    'GitHub Copilot',
    'MCPs',
    'Engenharia de IA',
    'Planejamento e construção de requisitos',
  ],

  // REVIEW: process wording.
  process: [
    {
      name: 'Entrada',
      text: 'Entender o problema, quem vai usar e o que precisa ser verdade no fim.',
    },
    {
      name: 'Bancada',
      text: 'Desenhar a solução: fluxos, componentes e as decisões técnicas que sustentam tudo.',
    },
    { name: 'Forja', text: 'Construir com capricho: código claro, revisado e fácil de manter.' },
    { name: 'Órbita', text: 'Colocar em produção, medir e manter funcionando.' },
  ],

  services: [
    {
      title: 'Interfaces que dão gosto de usar',
      text: 'Sites, aplicações web e apps mobile com React, Next.js e React Native — do layout no Figma ao deploy.',
    },
    {
      title: 'Design Systems e arquitetura de frontend',
      text: 'Tokens, bibliotecas de componentes e monorepos que mantêm vários produtos coerentes e o time rápido.',
    },
    {
      title: 'Produto de ponta a ponta',
      text: 'APIs com Node.js e NestJS, modelagem de dados, integrações e filas — ligadas a uma interface bem-feita.',
    },
  ],

  companies: ['Big4Tech', 'MundoInvest', 'EWZ Capital', 'Cash2Pay'],

  education: [
    {
      title: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
      org: 'UniFil — Centro Universitário Filadélfia',
      period: 'em andamento',
    },
  ],

  certifications: [
    'NestJS Zero to Hero — Modern TypeScript Back-end Development',
    'Formação React.js — Módulo Primeiro Framework',
    'Curso JavaScript',
    'Curso HTML5 e CSS3 — Módulos 1 e 2',
  ],

  languages: [
    { name: 'Português', level: 'nativo' },
    { name: 'Inglês', level: 'profissional limitado, em evolução diária' },
  ],

  contact: {
    title: { before: 'Tem uma ideia? Vamos tirá-la do', emphasis: 'papel', after: '.' },
    text: 'Para oportunidades, projetos ou uma boa conversa sobre frontend, escreva para mim.',
  },

  // Résumé (reverse-chronological, recruiter format).
  resume: {
    back: 'Voltar ao portfólio',
    printNote: 'sai em papel, mesmo no modo noite',
    print: 'Imprimir ou salvar PDF',
    blocks: {
      experience: 'experiência',
      education: 'formação',
      skills: 'competências',
      languages: 'idiomas',
      certifications: 'certificados',
    },
    summary:
      'Desenvolvedor fullstack, com mais experiência no frontend e interesse em evoluir nos dois ambientes. Hoje entrego requisitos de ponta a ponta — React, Next.js e TypeScript no front; Node.js, NestJS e RabbitMQ no back; React Native no mobile — e mantenho um Design System próprio. Uso IA no dia a dia e configuro os projetos para a geração de código por IA, ganhando agilidade sem perder estrutura nem qualidade. O que mais gosto é construir coisas bem-feitas.',
    experience: [
      {
        company: 'Big4Tech',
        role: 'Desenvolvedor Fullstack Pleno',
        period: 'fev 2025 — hoje',
        place: 'Londrina, PR',
        text: 'Responsável por várias plataformas frontend — React, Next.js, TypeScript e um Design System próprio —, agora com autonomia fullstack para entregar requisitos de ponta a ponta: backend com Node.js, NestJS, TypeORM e RabbitMQ; mobile com React Native e Expo. Uso IA no dia a dia e preparo o ambiente para a geração de código por IA, mantendo a estrutura e a qualidade enquanto o time ganha agilidade.',
        highlights: [
          'Desenvolvi um produto de onboarding de clientes, com KYC, biometria facial (liveness), KBA e assinatura eletrônica.',
          'Configurei e desenvolvi um ambiente monorepo eficiente para os sistemas frontend, com Design System centralizado.',
          'Colaborei no desenvolvimento de um produto de esteira de cobrança automatizada.',
          'Colaborei no desenvolvimento de telas do app mobile e do CRM web.',
          'Criei um ambiente preparado para AI Engineering, com ferramentas e fluxos para desenvolvimento assistido por IA.',
        ],
      },
      {
        company: 'Cash2Pay',
        role: 'Desenvolvedor Frontend Júnior',
        period: 'dez 2024 — fev 2025',
        place: 'Londrina, PR',
        text: 'Com mais autonomia, fui responsável pela plataforma frontend do negócio, em colaboração com o time de backend.',
        highlights: [
          'Organizei, de forma estruturada e planejada, um ambiente mais eficiente para o time de frontend entregar com mais qualidade e agilidade.',
        ],
      },
      {
        company: 'MundoInvest',
        role: 'Frontend Developer Pleno',
        period: 'jan 2024 — dez 2024',
        place: 'São Paulo, SP',
        text: 'Desenvolvi e entreguei requisitos com mais liberdade, ainda com acompanhamento, numa plataforma de acompanhamento de investimentos, bolsa de valores e educação financeira.',
        highlights: [
          'Desenvolvi por completo um ambiente de aulas online — o frontend inteiro, com apoio no backend.',
        ],
      },
      {
        company: 'EWZ Capital',
        role: 'Frontend Developer Júnior',
        period: 'set 2022 — dez 2024',
        place: 'São Paulo, SP',
        text: 'Primeira experiência no mercado de tecnologia, com foco em frontend e várias pessoas me ajudando e ensinando no processo. Aprendi a rotina de um desenvolvedor e tive os primeiros contatos com metodologias ágeis.',
        highlights: [],
      },
    ],
    skills: [
      {
        group: 'Frontend',
        items: [
          'React',
          'Next.js',
          'TypeScript',
          'Design Systems',
          'Tailwind CSS',
          'styled-components',
        ],
      },
      {
        group: 'Backend',
        items: ['Node.js', 'NestJS', 'TypeORM', 'RabbitMQ', 'PostgreSQL', 'Prisma'],
      },
      { group: 'Mobile', items: ['React Native', 'Expo'] },
      { group: 'IA', items: ['Claude', 'Codex', 'GitHub Copilot', 'MCPs', 'engenharia de IA'] },
      { group: 'Ferramentas', items: ['Git', 'Docker', 'Figma', 'Monorepo'] },
    ],
  },

  identity: {
    rubric: 'identidade visual · manual vivo',
    title: { before: 'Um mundo, várias', emphasis: 'paisagens', after: '.' },
    lead: 'A identidade de Gustavo Rodrigues: um pequeno mundo desenhado como lâmina técnica — papel, tinta e uma única cor, o vermelho da rubrica. Vale para o portfólio, para a Capela e para tudo o que vier depois.',
    caption: 'fig. 2 — a marca sobre a própria construção',
    construction: {
      title: 'Construção da marca: órbita de raio 17, abertura entre −40° e 0°, satélite a −20°',
      core: 'núcleo r 4,4',
      grid: 'grade 4 · caixa 48',
    },
    concept: {
      label: 'conceito',
      note: 'fé → razão → obra',
      title: 'De onde vem cada coisa',
      intro: 'Nada aqui é decoração solta: cada elemento conta um pedaço da mesma história.',
      story: [
        {
          title: 'O céu',
          text: 'O Cruzeiro do Sul é o céu de Londrina, a cruz de quem é cristão e a estrela de quem navega. Na Fig. 1, as ideias caem dele: a fé vem antes da obra.',
        },
        {
          title: 'A oficina',
          text: 'A ideia cai na chaminé e vira código. A oficina é o trabalho: bancada, forja, engrenagem. É onde mora o capricho.',
        },
        {
          title: 'A órbita',
          text: 'O que sai da oficina entra em órbita: artefatos em produção. A marca é exatamente isso — um G feito de órbita, com o núcleo no centro e um satélite saindo.',
        },
        {
          title: 'A rubrica',
          text: 'O vermelho é a tinta dos rubricadores, que abriam os parágrafos dos manuscritos litúrgicos com um ¶ vermelho — e é também a brasa da forja. Razão e fé na mesma cor.',
        },
      ],
    },
    mark: {
      label: 'marca',
      note: 'um G feito de órbita',
      title: 'A marca',
      intro:
        'A órbita aberta desenha o G. A barra aponta para o núcleo — o mundo, a pessoa. O satélite ocupa a boca do G: o trabalho saindo. Cada paisagem troca só o satélite.',
      variants: {
        satellite: ['Satélite', 'oficina — portfólio, currículo, assinatura de projetos'],
        star: ['Estrela', 'capela — textos de fé'],
        artifact: ['Artefato', 'oficina — projetos de tecnologia, robótica e sociais'],
        seed: ['Semente', 'biblioteca — estudos, artigos e anotações'],
      },
      rulesLabel: 'regras',
      rules: [
        'Respiro mínimo de ¼ da largura da marca em volta dela.',
        'Tamanho mínimo de 16 px — o satélite precisa continuar visível.',
        'Um satélite só, sempre na boca do G. Nunca girar o G inteiro.',
        'Em uma cor só, o satélite acompanha a tinta. Em cores, ele é rubrica (dia) ou brasa (noite).',
      ],
      filesLabel: 'arquivos',
      files: {
        mark: 'tinta + rubrica',
        paper: 'papel + brasa',
        mono: 'uma cor',
        star: 'capela',
        favicon: 'favicon adaptativo',
      },
    },
    color: {
      label: 'cor',
      note: 'papel, tinta e uma cor',
      title: 'Cores',
      intro:
        'Tudo é papel e tinta. A única cor é o vermelho — rubrica de dia, brasa à noite, ajustado para manter contraste nos dois. A cianotipia azul só aparece no que ainda está na prancheta; a Capela usa o mesmo vermelho sobre cal e pedra, com um ouro escondido que só aparece de perto.',
      large: 'AA grande',
      swatches: {
        paper: ['Papel', 'superfície do dia'],
        ink: ['Tinta', 'texto e traço do dia'],
        rubric: ['Rubrica', 'o acento, de dia'],
        graphite: ['Grafite', 'texto secundário'],
        night: ['Noite', 'superfície da noite'],
        parchment: ['Pergaminho', 'texto da noite'],
        ember: ['Brasa', 'o acento, à noite'],
        cyanotype: ['Cianotipia', 'só o que está na prancheta'],
        gold: ['Ouro', 'o ouro escondido da Capela'],
      },
    },
    type: {
      label: 'tipografia',
      note: 'três vozes, uma por função',
      title: 'Tipografia',
      sans: [
        'Bricolage Grotesque',
        'títulos e texto. “Bricolage” é o trabalho de bancada — a voz da oficina.',
      ],
      sansSample: 'Software feito com cuidado',
      serif: [
        'Cormorant Garamond itálico',
        'a palavra que importa. Uma por frase, na cor do acento. É a mesma serifa da Capela.',
      ],
      serifSample: 'capricho',
      mono: ['IBM Plex Mono', 'anotações: rubricas, legendas, fichas técnicas, coordenadas.'],
      monoRubric: 'trajetória',
      monoSample: 'fig. 1 — o mundo do gustavo, em vista orbital',
    },
    elements: {
      label: 'elementos',
      note: 'o vocabulário gráfico',
      title: 'Elementos gráficos',
      intro:
        'Os recursos de uma lâmina técnica e de um manuscrito, usados com moderação: no máximo um ou dois por bloco.',
      rubricSample: 'artefatos',
      items: {
        rubric: ['Rubrica', 'O ¶ vermelho abre cada seção — no manuscrito e no editor de código.'],
        hatch: ['Hachura', 'Sombra de gravura, para o lado da noite e para preencher sem cor.'],
        registration: [
          'Marcas de registro',
          'Os cantos de impressão marcam folhas e figuras importantes.',
        ],
        seal: [
          'Selo do artefato',
          'Cada projeto ganha um selo único, gerado a partir do próprio nome.',
        ],
        status: ['Status', 'O estado de cada artefato, sempre com o mesmo vocabulário.'],
        stamp: ['Carimbo', 'Fatos ditos como parte da composição: autor, local, revisão.'],
      },
      stamp: { author: 'autor', revision: 'rev.' },
    },
    voice: {
      label: 'movimento e voz',
      note: 'como se move, como fala',
      title: 'Movimento e voz',
      intro:
        'A metáfora mora nas margens — rubricas, legendas, rótulos. Títulos e conteúdo continuam literais: quem lê com pressa entende tudo sem conhecer o mundo.',
      motionLabel: 'movimento',
      motion: [
        {
          name: 'Órbita lenta',
          text: 'Movimento ambiente é linear e lento: 40 a 70 segundos por volta.',
        },
        {
          name: 'Uma por página',
          text: 'Só uma animação protagonista por página — a Fig. 1. O resto só se move pela mão de quem lê.',
        },
        {
          name: 'Traço no scroll',
          text: 'Ao rolar, a página é plotada: linhas se traçam, órbitas se abrem e blocos sobem, uma vez. Nada fica em loop.',
        },
        {
          name: 'Precisão',
          text: 'A interface responde em 150–200 ms, sem molas nem quiques: um sublinhado que se traça, uma régua que fica vermelha.',
        },
        {
          name: 'Gesto da marca',
          text: 'Só objetos da marca fazem um gesto mais longo, uma vez: o satélite dá uma volta, o selo gira.',
        },
        {
          name: 'Sempre pausável',
          text: 'Botão de pausa visível, e quem pede menos movimento recebe a página parada e inteira.',
        },
      ],
      vocabularyLabel: 'vocabulário',
      vocabulary: [
        ['artefato', 'um projeto entregue'],
        ['oficina', 'onde se constrói — o portfólio'],
        ['capela', 'onde se estuda e reza — a Capela'],
        ['órbita', 'em produção, em uso'],
        ['prancheta', 'planejado, ainda não começou'],
        ['capricho', 'o padrão de qualidade'],
      ],
      // REVIEW: updated for the English edition (was "Português em tudo o que se lê; inglês em tudo o que se programa.").
      languageNote:
        'Português primeiro em tudo o que se lê — portfólio, currículo e este manual também têm uma edição em inglês, com “care” no lugar de capricho. Inglês em tudo o que se programa. Uma palavra em itálico por frase — a que importa.',
    },
  },
}
