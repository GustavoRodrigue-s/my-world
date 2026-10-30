import type { PortfolioCopy } from './portfolio-content'

// English edition — a translation of portfolio-content-pt.ts, for international
// readers and recruiters. Same facts; nothing added.
// "capricho" becomes "care" (the one emphasized word of the motto).
// Titles are literal; the metaphor stays in rubrics, glosses and captions.

export const en: PortfolioCopy = {
  profile: {
    role: 'Software and AI Engineer · Mid-level Full-stack',
    city: 'Londrina, Brazil',
    motto: 'made with care',
  },

  meta: {
    defaultTitle: 'Gustavo Rodrigues — Software and AI Engineer',
    description:
      'Portfolio of Gustavo Rodrigues Fabiano, a software and AI engineer: React, Next.js, TypeScript, NestJS, Design Systems and AI-assisted development. Londrina, Brazil.',
    portfolio: {
      title: 'Gustavo Rodrigues — Software and AI Engineer',
      description:
        'Software made with care, from the interface to the server. Portfolio, career and work of Gustavo Rodrigues Fabiano, a software and AI engineer in Londrina, Brazil.',
    },
    resume: {
      title: 'Résumé',
      description:
        'Résumé of Gustavo Rodrigues Fabiano — Software and AI Engineer, Mid-level Full-stack. React, Next.js, TypeScript, NestJS, Design Systems and AI-assisted development.',
    },
    identity: {
      title: 'Visual identity',
      description:
        'The visual identity of Gustavo Rodrigues: the G-orbit mark, colors, typography, graphic elements, motion and voice.',
    },
  },

  statusLabel: {
    production: 'in production',
    building: 'in progress',
    prototype: 'prototype',
    'drawing-board': 'on the drawing board',
  },

  shell: {
    skipLink: 'Skip to content',
    brandSub: 'Software and AI Engineer',
    navLabel: 'Portfolio sections',
    nav: [
      { label: 'About', id: 'about' },
      { label: 'Career', id: 'journey' },
      { label: 'Work', id: 'artifacts' },
      { label: 'Tools', id: 'tools' },
      { label: 'Contact', id: 'contact' },
    ],
    resume: 'Résumé',
    language: { label: 'Language' },
    dayNight: { toDay: 'Switch to day mode', toNight: 'Switch to night mode' },
    worldBar: { label: 'You are in', home: 'Mundo do Gustavo' },
  },

  copy: {
    about: { label: 'about', note: 'who I am, what I do and why' },
    journey: {
      label: 'career',
      note: '2021 → today, in chronological order',
      title: 'From the first spark to the production line',
      intro:
        'Each company was a new orbit: more responsibility, bigger systems and more people using what I build.',
    },
    artifacts: {
      label: 'artifacts',
      note: 'what left the workshop and is now in orbit',
      title: 'What I’ve built',
      intro:
        'Work in production is confidential, so here it appears as a spec sheet: what it is, what it does, what my part was and what it’s built with.',
      prototypesTitle: 'First projects',
      prototypes:
        'Study prototypes from 2021 and 2022 — the first projects I took from start to finish.',
      drawingBoardTitle: 'On the drawing board',
      drawingBoard: 'The next projects, chosen to cover what I still want to master.',
      labels: {
        role: 'my role',
        decision: 'decision',
        does: 'what it does',
        stack: 'built with',
        confidential: 'confidential project — no public screenshots',
        onGithub: 'on GitHub (opens in a new tab)',
      },
    },
    tools: {
      label: 'tools',
      note: 'the closer to the core, the more I use it',
      title: 'Tools of the trade',
      intro:
        'Instead of a grid of logos, an orbital chart: the distance from the center shows how often each tool is in my hands.',
      core: 'Gustavo — the core',
      aiLabel: 'ai · every day',
      aiTitle: 'AI in my daily work',
      aiText:
        'Tools and practices I use every day to move faster without losing the project’s structure.',
    },
    credentials: {
      label: 'education',
      note: 'degree, certificates and languages',
      title: 'Education and credentials',
      education: 'degree',
      certifications: 'certificates',
      languages: 'languages',
    },
    services: {
      label: 'services',
      note: 'how I work and where I can help',
      title: 'How I can help',
      intro:
        'Every idea goes through the same workshop line before it goes into orbit. That’s how I work, on a team and on my own projects.',
      line: 'from idea to orbit',
      companies: 'companies I’ve worked with',
    },
    contact: { label: 'contact', resume: 'Résumé' },
  },

  hero: {
    rubric: 'plate i · gustavo’s world',
    kicker: 'Software and AI Engineer',
    statement: {
      before: 'Software made with',
      emphasis: 'care',
      after: ', from the interface to the server.',
    },
    lead: 'Specialized in user experience: systems that are easy to use, from frontend to backend.',
    ctaResume: 'View résumé',
    ctaArtifacts: 'See the work',
    caption: 'fig. 1 — gustavo’s world, orbital view',
    legend: [
      { n: '1', name: 'Southern Cross', text: 'where ideas come from.' },
      { n: '2', name: 'Workshop', text: 'where ideas become code.' },
      { n: '3', name: 'Hidden treasure', text: 'where it all makes sense.' },
      { n: '4', name: 'Orbits', text: 'what is already in production.' },
    ],
    titleBlock: {
      work: 'work',
      author: 'author',
      place: 'place',
      coordinates: 'coordinates',
      timezone: 'time zone',
      revision: 'revision',
    },
    figure: {
      title: 'Fig. 1 — Gustavo’s world, orbital view',
      desc: 'A small planet drawn in fine line, with a workshop, a small house and a cypress on its surface. A spark falls from the Southern Cross into the workshop chimney, which lights up and launches a new artifact into orbit, alongside other satellites.',
      scale: 'orbital view · scale 1 : ∞',
      pause: 'pause the world',
      play: 'spin the world',
    },
  },

  about: {
    title: { before: 'A piece of', emphasis: 'who I am' },
    paragraphs: [
      'I started programming in 2021, teaching myself, and since 2022 it has been my profession. I’ve worked at companies in the financial sector — EWZ Capital, MundoInvest and Cash2Pay — and today I’m a mid-level full-stack developer at Big4Tech, here in Londrina.',
      'I have more experience on the frontend, but I work full-stack and want to keep growing on both sides. What I enjoy most is building things well — an interface, an API or the architecture that holds them both.',
      'I use AI every day and set projects up so they adapt to AI code generation, keeping the structure in step as the project grows: we gain speed and keep the quality. Claude, Codex, Copilot and MCPs are everyday tools, together with AI engineering and the planning and writing of requirements.',
      'I’m also Catholic, and that runs through the way I work: doing things well is a form of respect for whoever will use them. That’s where the care comes from.',
    ],
    facts: [
      { label: 'based in', value: 'Londrina, Brazil · UTC−3' },
      { label: 'role', value: 'Full-stack, most experience on the frontend' },
      { label: 'ai', value: 'Claude, Codex, Copilot, MCPs' },
      { label: 'degree', value: 'Systems Analysis and Development · UniFil, in progress' },
      { label: 'languages', value: 'Portuguese (native) · English (improving)' },
      { label: 'since', value: 'self-taught since 2021 · working since 2022' },
    ],
    principlesLabel: 'workshop principles',
    principles: [
      {
        title: 'Care is respect.',
        text: 'Doing things well is a way of looking after whoever will use them.',
      },
      {
        title: 'System before screen.',
        text: 'Tokens, components and patterns that keep the team fast without losing coherence.',
      },
      {
        title: 'Clarity over cleverness.',
        text: 'Code the next dev understands on the first read.',
      },
      { title: 'Learn in public.', text: 'Document the path, mistakes included.' },
    ],
    portraitAlt: 'Portrait of Gustavo Rodrigues Fabiano',
  },

  journey: [
    {
      period: '2021',
      title: 'First spark',
      kind: 'study',
      text: 'I started my journey teaching myself programming and built my first prototypes: a note-taking app with its own documentation, authentication with a separate frontend and backend, and an online store.',
    },
    {
      period: 'Sep 2022 — Dec 2023',
      title: 'EWZ Capital',
      role: 'Junior Frontend Developer',
      place: 'São Paulo',
      kind: 'work',
      text: 'First job, in the financial sector: my adaptation to the tech industry, with many people helping and teaching me along the way. Focused on frontend, I learned what a developer’s routine looks like and had my first contact with agile methodologies.',
    },
    {
      period: 'Jan 2024 — Dec 2024',
      title: 'MundoInvest',
      role: 'Mid-level Frontend Developer',
      place: 'São Paulo',
      kind: 'work',
      text: 'Already used to the routine, I had more freedom to build and deliver requirements, still with guidance. I worked mainly on a platform for tracking investments, the stock market and financial education; my biggest milestone was building an online learning environment from scratch — the whole frontend, plus support on the backend.',
    },
    {
      period: 'Dec 2024 — Feb 2025',
      title: 'Cash2Pay',
      role: 'Junior Frontend Developer',
      place: 'Londrina',
      kind: 'work',
      text: 'With enough experience to work more autonomously, I was responsible for the company’s frontend platform. My main milestone was organizing, in a structured and planned way, a more efficient environment for the frontend team to deliver with more quality and speed.',
    },
    {
      period: 'Feb 2025 — present',
      title: 'Big4Tech',
      role: 'Mid-level Full-stack Developer',
      place: 'Londrina',
      kind: 'work',
      current: true,
      text: 'Still responsible for several frontend platforms, now also with full-stack autonomy to deliver requirements end to end: customer onboarding with KYC and facial biometrics, the onboarding app in React Native, an efficient monorepo for the frontend systems, an automated billing pipeline and the web CRM.',
    },
    {
      period: 'ongoing',
      title: 'Next maneuver',
      kind: 'now',
      text: 'Studying Systems Analysis and Development at UniFil, plus testing strategy, architecture at scale and technical English every day — with three new projects coming off the drawing board.',
    },
  ],

  artifacts: [
    {
      slug: 'onboarding-digital',
      code: 'A-01',
      title: 'Digital Onboarding',
      org: 'Big4Tech',
      period: '2025 — present',
      kind: 'Web platform',
      status: 'production',
      what: 'The complete path for a customer to sign up and have their identity verified, without leaving the screen.',
      does: [
        'Customer verification (KYC)',
        'Facial biometrics with liveness detection',
        'Knowledge-based authentication (KBA)',
        'Electronic signature',
      ],
      role: 'Development of the product and of the KYC, facial biometrics, KBA and e-signature integrations.',
      stack: ['React', 'Next.js', 'TypeScript', 'Design System'],
      confidential: true,
    },
    {
      slug: 'app-onboarding-digital',
      code: 'A-02',
      title: 'Digital Onboarding App',
      org: 'Big4Tech',
      period: '2025 — present',
      kind: 'Mobile app',
      status: 'production',
      what: 'Digital onboarding on the phone: a React Native app, from project setup to publishing in the stores.',
      does: [
        'App setup and architecture',
        'The complete development flow, from local environment to delivery',
        'Deployment to the app stores',
      ],
      role: 'Building the app, setting up the project, deploying to the stores and the whole development flow.',
      stack: ['React Native', 'Expo', 'TypeScript'],
      confidential: true,
    },
    {
      slug: 'painel-do-cliente',
      code: 'A-03',
      title: 'Customer Dashboard and CRM',
      org: 'Big4Tech',
      period: '2025 — present',
      kind: 'Web platform',
      status: 'production',
      what: 'A dashboard and CRM platform, for end customers to track and operate the services they signed up for.',
      does: [
        'A dashboard for customers and a web CRM',
        'An experience designed for daily use',
        'Performance as a requirement',
        'Scales to many customers',
      ],
      role: 'Building the platform, with a focus on experience, performance and scalability.',
      stack: ['React', 'Next.js', 'TypeScript'],
      confidential: true,
    },
    {
      slug: 'monorepo-design-system',
      code: 'A-04',
      title: 'Monorepo and Design System',
      org: 'Big4Tech',
      period: '2025 — present',
      kind: 'Architecture',
      status: 'production',
      what: 'A cross-platform environment where web and mobile share orchestration, standards and a central Design System.',
      does: [
        'Shared orchestration of the applications',
        'A single Design System for web and mobile',
        'Code quality, automation and team workflows',
        'An environment ready for AI engineering',
      ],
      role: 'Structuring the monorepo and standardizing the Design System and the team’s tooling.',
      stack: ['Monorepo', 'React', 'React Native', 'Expo', 'TypeScript'],
      confidential: true,
    },
    {
      slug: 'mundo-do-gustavo',
      code: 'A-05',
      title: 'Mundo do Gustavo',
      org: 'Personal project',
      period: '2026',
      kind: 'Website and identity',
      status: 'building',
      what: 'This site: portfolio, résumé and visual identity in a single system — and the showcase of my frontend work, end to end.',
      does: [
        'Its own identity, from JSON tokens to the generated CSS',
        'Animated SVG illustration, lightweight and pausable',
        'Résumé generated from the same data, ready to print',
      ],
      role: 'Design and development.',
      note: 'The world at the top is SVG, not WebGL: the text is still the largest element on the page, and the animation stops for anyone who prefers less motion.',
      stack: ['Next.js 15', 'TypeScript', 'Tailwind CSS 4', 'Turborepo'],
    },
  ],

  prototypes: [
    {
      title: 'good-notes',
      year: '2022',
      text: 'Note-taking app, with its own project documentation.',
      links: [
        { label: 'docs', href: 'https://github.com/GustavoRodrigue-s/good-notes' },
        { label: 'front', href: 'https://github.com/GustavoRodrigue-s/good-notes-frontend' },
      ],
    },
    {
      title: 'auth-app',
      year: '2022',
      text: 'Authentication with a separate frontend and backend, in TypeScript.',
      links: [
        { label: 'front', href: 'https://github.com/GustavoRodrigue-s/Auth-app-frontend' },
        { label: 'back', href: 'https://github.com/GustavoRodrigue-s/Auth-app-backend' },
      ],
    },
    {
      title: 'tech-store',
      year: '2022',
      text: 'Online store in TypeScript.',
      links: [{ label: 'code', href: 'https://github.com/GustavoRodrigue-s/tech-store' }],
    },
    {
      title: 'links',
      year: '2022',
      text: 'React Native app, built from a Rocketseat course.',
      links: [{ label: 'code', href: 'https://github.com/GustavoRodrigue-s/links-rocketseat' }],
    },
  ],

  drawingBoard: [
    { title: 'Kanban Board with a Pipeline', text: 'Global state with Redux, tests and CI/CD.' },
    {
      title: 'Adaptive Learning',
      text: 'A personal, multidisciplinary project: a study platform where AI explains what it recommends and the decision stays with the learner, with research, wearables and robotics.',
    },
    { title: 'Catalog with its own API', text: 'Backend, database and algorithms.' },
  ],

  toolOrbits: [
    {
      name: 'every day',
      caption: 'orbit i',
      tools: ['TypeScript', 'React', 'Next.js', 'Node.js', 'NestJS', 'Design System'],
    },
    {
      name: 'often',
      caption: 'orbit ii',
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
      name: 'on the radar',
      caption: 'orbit iii',
      tools: [
        'Angular',
        'Vue',
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
    'AI engineering',
    'Requirements planning and writing',
  ],

  process: [
    {
      name: 'Intake',
      text: 'Understand the problem, who will use it and what has to be true at the end.',
    },
    {
      name: 'Workbench',
      text: 'Design the solution: flows, components and the technical decisions that hold it all up.',
    },
    { name: 'Forge', text: 'Build with care: clear, reviewed code that is easy to maintain.' },
    { name: 'Orbit', text: 'Ship to production, measure and keep it running.' },
  ],

  services: [
    {
      title: 'Interfaces people enjoy using',
      text: 'Websites, web applications and mobile apps with React, Next.js and React Native — from the Figma layout to deployment.',
    },
    {
      title: 'Design Systems and frontend architecture',
      text: 'Tokens, component libraries and monorepos that keep several products coherent and the team fast.',
    },
    {
      title: 'End-to-end product',
      text: 'APIs with Node.js and NestJS, data modeling, integrations and queues — connected to a well-made interface.',
    },
  ],

  companies: ['Big4Tech', 'MundoInvest', 'EWZ Capital', 'Cash2Pay'],

  education: [
    {
      title: 'Technologist degree in Systems Analysis and Development',
      org: 'UniFil — Centro Universitário Filadélfia',
      period: 'in progress',
    },
  ],

  certifications: [
    'NestJS Zero to Hero — Modern TypeScript Back-end Development',
    'React.js Program — First Framework Module',
    'JavaScript Course',
    'HTML5 and CSS3 Course — Modules 1 and 2',
  ],

  languages: [
    { name: 'Portuguese', level: 'native' },
    { name: 'English', level: 'limited working proficiency, improving daily' },
  ],

  contact: {
    title: { before: 'Have an idea? Let’s get it off the', emphasis: 'ground', after: '.' },
    text: 'For opportunities, projects or a good conversation about software, write to me.',
  },

  // International format: reverse-chronological, no photo or personal data, concise.
  resume: {
    back: 'Back to portfolio',
    printNote: 'prints on paper, even in night mode',
    print: 'Print or save as PDF',
    blocks: {
      experience: 'experience',
      education: 'education',
      skills: 'skills',
      languages: 'languages',
      certifications: 'certifications',
    },
    summary:
      'Software and AI engineer, full-stack, with more experience on the frontend and an interest in growing on both sides. I deliver requirements end to end — React, Next.js and TypeScript on the frontend; Node.js, NestJS and RabbitMQ on the backend; React Native on mobile — and maintain an in-house Design System. I use AI every day and set projects up for AI code generation, gaining speed without losing structure or quality. What I enjoy most is building things well.',
    experience: [
      {
        company: 'Big4Tech',
        role: 'Mid-level Full-stack Developer',
        period: 'Feb 2025 — present',
        place: 'Londrina, Brazil',
        text: 'Responsible for several frontend platforms — React, Next.js, TypeScript and an in-house Design System — now with full-stack autonomy to deliver requirements end to end: backend with Node.js, NestJS, TypeORM and RabbitMQ; mobile with React Native and Expo. Use AI every day and prepare the environment for AI code generation, keeping structure and quality while the team gains speed.',
        highlights: [
          'Built a customer onboarding product with KYC, facial biometrics (liveness), KBA and e-signature.',
          'Set up and built an efficient monorepo environment for the frontend systems, with a centralized Design System.',
          'Collaborated on building an automated billing pipeline product.',
          'Built the digital onboarding app in React Native: project setup, development flow and deployment to the stores.',
          'Collaborated on building the web CRM.',
          'Created an environment ready for AI engineering, with tools and flows for AI-assisted development.',
        ],
      },
      {
        company: 'Cash2Pay',
        role: 'Junior Frontend Developer',
        period: 'Dec 2024 — Feb 2025',
        place: 'Londrina, Brazil',
        text: 'Working more autonomously, responsible for the company’s frontend platform, in collaboration with the backend team.',
        highlights: [
          'Organized, in a structured and planned way, a more efficient environment for the frontend team to deliver with more quality and speed.',
        ],
      },
      {
        company: 'MundoInvest',
        role: 'Mid-level Frontend Developer',
        period: 'Jan 2024 — Dec 2024',
        place: 'São Paulo, Brazil',
        text: 'Built and delivered requirements with more freedom, still with guidance, on a platform for tracking investments, the stock market and financial education.',
        highlights: [
          'Built an online learning environment from scratch — the whole frontend, with support on the backend.',
        ],
      },
      {
        company: 'EWZ Capital',
        role: 'Junior Frontend Developer',
        period: 'Sep 2022 — Dec 2023',
        place: 'São Paulo, Brazil',
        text: 'First role in the tech industry, focused on frontend, with many people helping and teaching me along the way. Learned a developer’s routine and had my first contact with agile methodologies.',
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
      { group: 'AI', items: ['Claude', 'Codex', 'GitHub Copilot', 'MCPs', 'AI engineering'] },
      { group: 'Tools', items: ['Git', 'Docker', 'Figma', 'Monorepo'] },
    ],
  },

  identity: {
    rubric: 'visual identity · living guide',
    title: { before: 'One world, many', emphasis: 'landscapes', after: '.' },
    lead: 'The identity of Gustavo Rodrigues: a small world drawn as a technical plate — paper, ink and a single color, the red of the rubric. It applies to every place in this world.',
    caption: 'fig. 2 — the mark over its own construction',
    construction: {
      title:
        'Mark construction: orbit of radius 17, opening between −40° and 0°, satellite at −20°',
      core: 'core r 4.4',
      grid: 'grid 4 · box 48',
    },
    concept: {
      label: 'concept',
      note: 'faith → reason → work',
      title: 'Where each thing comes from',
      intro: 'Nothing here is loose decoration: every element tells a piece of the same story.',
      story: [
        {
          title: 'The sky',
          text: 'The Southern Cross is the sky on this side of the world, the cross of those who are Christian and the star of those who navigate. In Fig. 1, ideas fall from it: faith comes before the work.',
        },
        {
          title: 'The workshop',
          text: 'The idea falls down the chimney and becomes code. The workshop is the work: bench, forge, gears. It’s where care lives.',
        },
        {
          title: 'The orbit',
          text: 'What leaves the workshop goes into orbit: artifacts in production. The mark is exactly that — a G made of an orbit, with the core at the center and a satellite heading out.',
        },
        {
          title: 'The rubric',
          text: 'Red is the ink of the rubricators, who opened the paragraphs of liturgical manuscripts with a red ¶ — and it is also the ember of the forge. Reason and faith in the same color.',
        },
      ],
    },
    mark: {
      label: 'mark',
      note: 'a G made of an orbit',
      title: 'The mark',
      intro:
        'The open orbit draws the G. The bar points to the core — the world, the person. The satellite sits in the mouth of the G: the work heading out. Each landscape swaps only the satellite.',
      variants: {
        satellite: ['Satellite', 'antenna — portfolio, résumé, project signature'],
        star: ['Star', 'hidden treasure — kept, not displayed'],
        artifact: ['Artifact', 'workshop — tech, robotics and social projects'],
        seed: ['Seed', 'library — studies, articles and notes'],
      },
      rulesLabel: 'rules',
      rules: [
        'Minimum clear space of ¼ of the mark’s width around it.',
        'Minimum size of 16 px — the satellite must stay visible.',
        'One satellite only, always in the mouth of the G. Never rotate the whole G.',
        'In one color, the satellite follows the ink. In color, it is rubric (day) or ember (night).',
      ],
      filesLabel: 'files',
      files: {
        mark: 'ink + rubric',
        paper: 'paper + ember',
        mono: 'one color',
        star: 'star',
        seed: 'studies',
        favicon: 'adaptive favicon',
      },
    },
    color: {
      label: 'color',
      note: 'paper, ink and one color',
      title: 'Colors',
      intro:
        'Everything is paper and ink. The only color is red — rubric by day, ember by night, tuned to keep contrast in both. The blue cyanotype appears only on what is still on the drawing board; there is a hidden gold, which only shows up close; Estudos writes on the page of a book, in ink what is finished and in pencil what is still in progress.',
      large: 'AA large',
      swatches: {
        paper: ['Paper', 'day surface'],
        ink: ['Ink', 'day text and line'],
        rubric: ['Rubric', 'the accent, by day'],
        graphite: ['Graphite', 'secondary text'],
        night: ['Night', 'night surface'],
        parchment: ['Parchment', 'night text'],
        ember: ['Ember', 'the accent, by night'],
        cyanotype: ['Cyanotype', 'only what is on the drawing board'],
        gold: ['Gold', 'the hidden gold'],
        leaf: ['Leaf', 'the page of Estudos, by day'],
        lamp: ['Lamplight', 'the page of Estudos, by night'],
        pencil: ['Pencil', 'in Estudos, what is still in progress'],
      },
    },
    type: {
      label: 'typography',
      note: 'three voices, one per job',
      title: 'Typography',
      sans: [
        'Bricolage Grotesque',
        'headings and text. “Bricolage” is workbench tinkering — the voice of the workshop.',
      ],
      sansSample: 'Software made with care',
      serif: [
        'Cormorant Garamond italic',
        'the word that matters. One per sentence, in the accent color.',
      ],
      serifSample: 'care',
      mono: ['IBM Plex Mono', 'annotations: rubrics, captions, spec sheets, coordinates.'],
      monoRubric: 'career',
      monoSample: 'fig. 1 — gustavo’s world, orbital view',
    },
    elements: {
      label: 'elements',
      note: 'the graphic vocabulary',
      title: 'Graphic elements',
      intro:
        'The devices of a technical plate and of a manuscript, used sparingly: one or two per block at most.',
      rubricSample: 'artifacts',
      items: {
        rubric: [
          'Rubric',
          'The red ¶ opens each section — in the manuscript and in the code editor.',
        ],
        hatch: ['Hatching', 'Engraving shade, for the night side and for filling without color.'],
        registration: ['Registration marks', 'Print corners mark sheets and important figures.'],
        seal: ['Artifact seal', 'Each project gets a unique seal, generated from its own name.'],
        status: ['Status', 'The state of each artifact, always in the same vocabulary.'],
        stamp: ['Title block', 'Facts stated as part of the composition: author, place, revision.'],
      },
      stamp: { author: 'author', revision: 'rev.' },
    },
    voice: {
      label: 'motion and voice',
      note: 'how it moves, how it speaks',
      title: 'Motion and voice',
      intro:
        'The metaphor lives in the margins — rubrics, captions, labels. Titles and content stay literal: a reader in a hurry understands everything without knowing the world.',
      motionLabel: 'motion',
      motion: [
        {
          name: 'Slow orbit',
          text: 'Ambient motion is linear and slow: 40 to 70 seconds per revolution.',
        },
        {
          name: 'One per page',
          text: 'Only one protagonist animation per page — Fig. 1. Everything else moves only by the reader’s hand.',
        },
        {
          name: 'Plotted on scroll',
          text: 'As you scroll, the page is plotted: lines are traced, orbits open out and blocks rise, once. Nothing loops.',
        },
        {
          name: 'Precision',
          text: 'The interface responds in 150–200 ms, with no springs or bounces: an underline being traced, a rule turning red.',
        },
        {
          name: 'Brand gesture',
          text: 'Only brand objects make a longer gesture, once: the satellite makes one orbit, the seal turns.',
        },
        {
          name: 'Always pausable',
          text: 'A visible pause button, and anyone who asks for less motion gets the page still and complete.',
        },
      ],
      vocabularyLabel: 'vocabulary',
      vocabulary: [
        ['artifact', 'a delivered project'],
        ['workshop', 'where things are built'],
        ['hidden treasure', 'what is found, not what is shown'],
        ['ink and pencil', 'finished and in progress — Estudos'],
        ['orbit', 'in production, in use'],
        ['drawing board', 'planned, not started yet'],
        ['care', 'the quality bar — “capricho” in Portuguese'],
      ],
      languageNote:
        'Portuguese first in everything that is read — the portfolio, the résumé and this guide also have this English edition, where “capricho” becomes care. English in everything that is coded. One italic word per sentence — the one that matters.',
    },
  },
}
