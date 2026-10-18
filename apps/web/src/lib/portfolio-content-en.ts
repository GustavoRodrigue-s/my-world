import type { PortfolioCopy } from './portfolio-content'

// English edition — a translation of portfolio-content-pt.ts, for international
// readers and recruiters. Same facts, same REVIEW markers; nothing added.
// "capricho" becomes "care" (the one emphasized word of the motto).
// Titles are literal; the metaphor stays in rubrics, glosses and captions.

export const en: PortfolioCopy = {
  profile: {
    role: 'Mid-level Full-stack Developer',
    focus: 'frontend focus',
    city: 'Londrina, Brazil',
    region: 'Paraná, Brazil',
    motto: 'made with care',
    purpose:
      'This space gathers what I believe, what I learn and what I build — as a developer, as a Christian and as a human being.',
    duality: 'reason and faith, craft and purpose',
  },

  meta: {
    defaultTitle: 'Gustavo Rodrigues — Full-stack Developer',
    description:
      'Portfolio of Gustavo Rodrigues Fabiano, a full-stack developer focused on frontend: React, Next.js, TypeScript, Design Systems and NestJS. Londrina, Brazil.',
    portfolio: {
      title: 'Gustavo Rodrigues — Full-stack Developer',
      description:
        'Software made with care, from the interface to the server. Portfolio, career and work of Gustavo Rodrigues Fabiano, a full-stack developer in Londrina, Brazil.',
    },
    resume: {
      title: 'Résumé',
      description:
        'Résumé of Gustavo Rodrigues Fabiano — Mid-level Full-stack Developer with a frontend focus. React, Next.js, TypeScript, NestJS and Design Systems.',
    },
    identity: {
      title: 'Visual identity',
      description:
        'The visual identity of Gustavo Rodrigues Fabiano: the G-orbit mark, colors, typography, graphic elements, motion and voice.',
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
    brandSub: 'full-stack · londrina',
    navLabel: 'Portfolio sections',
    nav: [
      { label: 'About', id: 'about' },
      { label: 'Career', id: 'journey' },
      { label: 'Work', id: 'artifacts' },
      { label: 'Tools', id: 'tools' },
      { label: 'Contact', id: 'contact' },
    ],
    resume: 'Résumé',
    language: { label: 'Language', switchTo: 'Ler em português' },
    dayNight: { toDay: 'Switch to day mode', toNight: 'Switch to night mode' },
    footer: {
      world: 'in this world',
      landscapes: 'other landscapes',
      contact: 'contact',
      portfolio: 'Portfolio',
      resume: 'Résumé',
      identity: 'Visual identity',
      email: 'Email',
      inCity: 'in Londrina',
    },
  },

  copy: {
    about: { label: 'about', note: 'who I am, what I do and why' },
    journey: {
      label: 'career',
      note: '2021 → today, in chronological order',
      title: 'From the first spark to the production line',
      intro: 'Each company was a new orbit: more responsibility, bigger systems and more people using what I build.', // REVIEW
    },
    artifacts: {
      label: 'artifacts',
      note: 'what left the workshop and is now in orbit',
      title: 'What I’ve built',
      intro:
        'Work in production is confidential, so here it appears as a spec sheet: what it is, what it does, what my part was and what it’s built with.',
      prototypesTitle: 'First projects',
      prototypes: 'Study prototypes from 2021 and 2022 — the first projects I took from start to finish.',
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
      intro: 'Instead of a grid of logos, an orbital chart: the distance from the center shows how often each tool is in my hands.',
      core: 'Gustavo — the core',
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
      intro: 'Every idea goes through the same workshop line before it goes into orbit. That’s how I work, on a team and on my own projects.', // REVIEW
      line: 'from idea to orbit',
      companies: 'companies I’ve worked with',
    },
    contact: { label: 'contact', resume: 'Résumé' },
  },

  hero: {
    rubric: 'plate i · gustavo’s world',
    kicker: 'Full-stack developer · frontend focus',
    statement: { before: 'Software made with', emphasis: 'care', after: ', from the interface to the server.' },
    lead:
      'I’m Gustavo. Today I evolve Big4Tech’s platforms and Design System with React, Next.js, TypeScript and NestJS — and make sure everything stays coherent as it grows.',
    ctaResume: 'View résumé',
    ctaArtifacts: 'See the work',
    caption: 'fig. 1 — gustavo’s world, orbital view',
    legend: [
      { n: '1', name: 'Southern Cross', text: 'the sky over home. Ideas come from above.' },
      { n: '2', name: 'Workshop', text: 'where ideas become code.' },
      { n: '3', name: 'Chapel', text: 'where it all makes sense.' },
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
      desc: 'A small planet drawn in fine line, with a workshop, a chapel and a cypress on its surface. A spark falls from the Southern Cross into the workshop chimney, which lights up and launches a new artifact into orbit, alongside other satellites.',
      scale: 'orbital view · scale 1 : ∞',
      pause: 'pause the world',
      play: 'spin the world',
    },
  },

  about: {
    title: { before: 'A piece of', emphasis: 'who I am' },
    paragraphs: [
      'I started programming in 2021, and since 2022 it has been my profession. I’ve worked at companies in the financial sector — EWZ Capital, MundoInvest and Cash2Pay — and today I’m a mid-level full-stack developer at Big4Tech, here in Londrina.',
      // REVIEW
      'My favorite place is the interface: the point where a technical decision becomes someone’s experience. I like Design Systems, architecture that holds up as it grows, and sitting down with product and design to decide together. On personal projects, I go beyond the frontend and build the whole system.',
      // REVIEW
      'I’m also Catholic, and that runs through the way I work: doing things well is a form of respect for whoever will use them. That’s where the care comes from — and that’s why this world also has a chapel.',
    ],
    facts: [
      { label: 'based in', value: 'Londrina, Brazil · UTC−3' },
      { label: 'role', value: 'Full-stack, frontend focus' },
      { label: 'degree', value: 'Systems Analysis and Development · UniFil, 2025' },
      { label: 'languages', value: 'Portuguese (native) · English (improving)' },
      { label: 'since', value: 'studying since 2021 · working since 2022' },
    ],
    principlesLabel: 'workshop principles',
    // REVIEW: the four principles are a draft manifesto.
    principles: [
      { title: 'Care is respect.', text: 'Doing things well is a way of looking after whoever will use them.' },
      { title: 'System before screen.', text: 'Tokens, components and patterns that keep the team fast without losing coherence.' },
      { title: 'Clarity over cleverness.', text: 'Code the next dev understands on the first read.' },
      { title: 'Learn in public.', text: 'Document the path, mistakes included.' },
    ],
    portraitAlt: 'Portrait of Gustavo Rodrigues Fabiano',
  },

  journey: [
    {
      period: '2021',
      title: 'First spark',
      kind: 'study',
      text: 'I started studying programming and built my first prototypes: a note-taking app with its own documentation, authentication with a separate frontend and backend, and an online store.',
    },
    {
      period: 'Sep 2022 — Dec 2024',
      title: 'EWZ Capital',
      role: 'Junior Frontend Developer',
      place: 'São Paulo',
      kind: 'work',
      text: 'First job as a frontend developer, in the financial sector.',
    },
    {
      period: 'Jan 2024 — Dec 2024',
      title: 'MundoInvest',
      role: 'Mid-level Frontend Developer',
      place: 'São Paulo',
      kind: 'work',
      text: 'New features for apps and websites. I proposed solutions, improved code standards and workflows, and supported the team to keep the quality of deliveries high.',
    },
    {
      period: 'Dec 2024 — Feb 2025',
      title: 'Cash2Pay',
      role: 'Junior Frontend Developer',
      place: 'Londrina',
      kind: 'work',
      text: 'New features and platform maintenance, with attention to performance and usability, in partnership with the backend team.',
    },
    {
      period: 'Feb 2025',
      title: 'UniFil',
      role: 'Technologist degree in Systems Analysis and Development',
      place: 'Londrina',
      kind: 'education',
      text: 'Graduated in Systems Analysis and Development.',
    },
    {
      period: 'Feb 2025 — present',
      title: 'Big4Tech',
      role: 'Mid-level Full-stack Developer',
      place: 'Londrina',
      kind: 'work',
      current: true,
      text: 'Several React and Next.js systems on an in-house Design System, a NestJS and RabbitMQ backend and React Native apps — end to end, from concept to production.',
    },
    {
      period: 'ongoing',
      title: 'Next maneuver',
      kind: 'now',
      text: 'Studying testing strategy, architecture at scale and technical English every day — with three new projects coming off the drawing board.',
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
        'Knowledge-based authentication (KBA)',
        'Electronic signature',
        'Liveness-based identity verification',
      ],
      role: 'Development of the platform and of the KBA, e-signature and liveness integrations.',
      stack: ['React', 'Next.js', 'TypeScript', 'Design System'], // REVIEW
      confidential: true,
    },
    {
      slug: 'painel-do-cliente',
      code: 'A-02',
      title: 'Customer Dashboard',
      org: 'Big4Tech',
      period: '2025 — present',
      kind: 'Web platform',
      status: 'production',
      what: 'A dashboard platform for end customers to track and operate the services they signed up for.', // REVIEW
      does: ['An experience designed for daily use', 'Performance as a requirement', 'Scales to many customers'],
      role: 'Building the platform, with a focus on experience, performance and scalability.',
      stack: ['React', 'Next.js', 'TypeScript'], // REVIEW
      confidential: true,
    },
    {
      slug: 'monorepo-design-system',
      code: 'A-03',
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
      stack: ['Monorepo', 'React', 'React Native', 'Expo', 'TypeScript'], // REVIEW
      confidential: true,
    },
    {
      slug: 'mundo-do-gustavo',
      code: 'A-04',
      title: 'Mundo do Gustavo',
      org: 'Personal project',
      period: '2026',
      kind: 'Website and identity',
      status: 'building',
      what: 'This site: portfolio, résumé and visual identity in a single system — and the showcase of my frontend work, end to end.',
      does: [
        'Its own identity, from TypeScript tokens to the generated CSS',
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
    { title: 'Composable Store', text: 'Next.js, GraphQL, Design System, performance and accessibility.' },
    { title: 'Catalog with its own API', text: 'Backend, database and algorithms.' },
  ],

  // REVIEW: which orbit each tool sits in is a judgment call.
  toolOrbits: [
    {
      name: 'every day',
      caption: 'orbit i',
      tools: ['TypeScript', 'React', 'Next.js', 'Node.js', 'NestJS', 'Design System'],
    },
    {
      name: 'often',
      caption: 'orbit ii',
      tools: ['React Native', 'Expo', 'TypeORM', 'RabbitMQ', 'PostgreSQL', 'Tailwind CSS', 'Docker', 'Git', 'Figma'],
    },
    {
      name: 'on the radar',
      caption: 'orbit iii',
      tools: ['Angular', 'Spring Boot', 'Redux', 'Jest', 'Testing Library', 'GraphQL', 'Prisma', 'MongoDB'],
    },
  ],

  // REVIEW: process wording.
  process: [
    { name: 'Intake', text: 'Understand the problem, who will use it and what has to be true at the end.' },
    { name: 'Workbench', text: 'Design the solution: flows, components and the technical decisions that hold it all up.' },
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
      period: 'completed Feb 2025',
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
    text: 'For opportunities, projects or a good conversation about frontend, write to me.',
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
      'Frontend-focused developer building websites and apps with modern, intuitive interfaces. In my current role I work across the stack — React, Next.js and TypeScript on the frontend; Node.js, NestJS and RabbitMQ on the backend; React Native on mobile — and maintain an in-house Design System. I’m driven by continuous learning and by mastering the whole cycle, from interface design to server integration.',
    experience: [
      {
        company: 'Big4Tech',
        role: 'Mid-level Full-stack Developer',
        period: 'Feb 2025 — present',
        place: 'Londrina, Brazil',
        text: 'Frontend: maintain and evolve multiple systems with React, Next.js, TypeScript and an in-house Design System, focusing on sustainable architecture, standardization and scalability; take part in UX, design and product decisions. Backend: end-to-end features with Node.js, NestJS and TypeORM — data modeling, APIs, migrations, integrations and asynchronous processing with RabbitMQ. Mobile: React Native and Expo, aligned with the web apps in the same environment.',
        highlights: [
          'Structured a cross-platform monorepo with shared application orchestration and a centralized Design System.',
          'Set up code-quality tooling, automation and workflows focused on team productivity and scale.',
          'Created an environment ready for AI engineering, with tools and flows for AI-assisted development.',
          'Built a digital onboarding web platform with KBA, e-signature and liveness-based identity verification.',
          'Built a dashboard platform for end customers, focused on experience, performance and scalability.',
          'Deliver products end to end, from technical design to maintenance in production.',
        ],
      },
      {
        company: 'Cash2Pay',
        role: 'Junior Frontend Developer',
        period: 'Dec 2024 — Feb 2025',
        place: 'Londrina, Brazil',
        text: 'Built new features and maintained the platform, ensuring performance, usability and a good experience, in collaboration with the backend team.',
        highlights: [],
      },
      {
        company: 'MundoInvest',
        role: 'Mid-level Frontend Developer',
        period: 'Jan 2024 — Dec 2024',
        place: 'São Paulo, Brazil',
        text: 'Developed and maintained features for apps and websites. Proposed solutions, improved code standards and optimized workflows and tooling, continuously supporting other developers to keep deliveries consistent and high-quality.',
        highlights: [],
      },
      {
        company: 'EWZ Capital',
        role: 'Junior Frontend Developer',
        period: 'Sep 2022 — Dec 2024',
        place: 'São Paulo, Brazil',
        text: 'First professional role as a frontend developer.',
        highlights: [],
      },
    ],
    skills: [
      { group: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Design Systems', 'Tailwind CSS', 'styled-components'] },
      { group: 'Backend', items: ['Node.js', 'NestJS', 'TypeORM', 'RabbitMQ', 'PostgreSQL', 'Prisma'] },
      { group: 'Mobile', items: ['React Native', 'Expo'] },
      { group: 'Tools', items: ['Git', 'Docker', 'Figma', 'Monorepo'] },
    ],
  },

  identity: {
    rubric: 'visual identity · living guide',
    title: { before: 'One world, many', emphasis: 'landscapes', after: '.' },
    lead: 'The identity of Gustavo Rodrigues Fabiano: a small world drawn as a technical plate — paper, ink and a single color, the red of the rubric. It applies to the portfolio, to Capela de Estudos and to whatever comes next.',
    caption: 'fig. 2 — the mark over its own construction',
    construction: {
      title: 'Mark construction: orbit of radius 17, opening between −40° and 0°, satellite at −20°',
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
          text: 'The Southern Cross is the sky over Londrina, the cross of those who are Christian and the star of those who navigate. In Fig. 1, ideas fall from it: faith comes before the work.',
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
        satellite: ['Satellite', 'workshop — portfolio, résumé, project signature'],
        star: ['Star', 'chapel — Capela de Estudos, writing on faith'],
        artifact: ['Artifact', 'lab — studies and experiments, once it exists'],
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
        star: 'chapel',
        favicon: 'adaptive favicon',
      },
    },
    color: {
      label: 'color',
      note: 'paper, ink and one color',
      title: 'Colors',
      intro:
        'Everything is paper and ink. The only color is red — rubric by day, ember by night, tuned to keep contrast in both. The blue cyanotype appears only on what is still on the drawing board; gold belongs to the Capela.',
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
        gold: ['Gold', 'the accent of Capela de Estudos'],
      },
    },
    type: {
      label: 'typography',
      note: 'three voices, one per job',
      title: 'Typography',
      sans: ['Bricolage Grotesque', 'headings and text. “Bricolage” is workbench tinkering — the voice of the workshop.'],
      sansSample: 'Software, carefully made',
      serif: ['Cormorant Garamond italic', 'the word that matters. One per sentence, in the accent color. The same serif as the Capela.'],
      serifSample: 'care',
      mono: ['IBM Plex Mono', 'annotations: rubrics, captions, spec sheets, coordinates.'],
      monoRubric: 'career',
      monoSample: 'fig. 1 — gustavo’s world, orbital view',
    },
    elements: {
      label: 'elements',
      note: 'the graphic vocabulary',
      title: 'Graphic elements',
      intro: 'The devices of a technical plate and of a manuscript, used sparingly: one or two per block at most.',
      rubricSample: 'artifacts',
      items: {
        rubric: ['Rubric', 'The red ¶ opens each section — in the manuscript and in the code editor.'],
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
        { name: 'Slow orbit', text: 'Ambient motion is linear and slow: 40 to 70 seconds per revolution.' },
        { name: 'Precision', text: 'The interface responds in 150–200 ms, with no springs or bounces.' },
        { name: 'One per page', text: 'Only one protagonist animation per page. Everything else stays still.' },
        { name: 'Always pausable', text: 'A visible pause button, and anyone who asks for less motion gets a still frame.' },
      ],
      vocabularyLabel: 'vocabulary',
      vocabulary: [
        ['artifact', 'a delivered project'],
        ['workshop', 'where things are built — the portfolio'],
        ['chapel', 'where one studies and prays — Capela de Estudos'],
        ['orbit', 'in production, in use'],
        ['drawing board', 'planned, not started yet'],
        ['care', 'the quality bar — “capricho” in Portuguese'],
      ],
      // REVIEW: mirrors the updated Portuguese note.
      languageNote:
        'Portuguese first in everything that is read — the portfolio, the résumé and this guide also have this English edition, where “capricho” becomes care. English in everything that is coded. One italic word per sentence — the one that matters.',
    },
  },
}
