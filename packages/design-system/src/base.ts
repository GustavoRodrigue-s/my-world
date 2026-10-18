export const baseTokens = {
  radius: {
    pill: '9999px',
    card: '8px',
    md:   '6px',
    sm:   '4px',
    xs:   '3px',
  },
  spacing: {
    sectionY:    '72px',
    sectionX:    '2rem',
    contentMaxW: '1100px',
    articleMaxW: '720px',
    navH:        '64px',
  },
  text: {
    xs:   '11px',
    sm:   '13px',
    base: '15px',
    md:   '17px',
    lg:   '20px',
    xl:   '24px',
    '2xl': '32px',
    '3xl': '40px',
    '4xl': '52px',
  },
  leading: {
    tight:   1.1,
    snug:    1.25,
    normal:  1.6,
    relaxed: 1.85,
  },
  zIndex: {
    nav:   100,
    modal: 200,
    toast: 300,
  },
  transition: {
    fast:   '150ms ease',
    normal: '200ms ease',
    slow:   '300ms ease',
  },
} as const

export type BaseTokens = typeof baseTokens
