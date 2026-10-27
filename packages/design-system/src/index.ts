// The design tokens, resolved: every value Style Dictionary built from
// tokens/*.json. For code that needs a literal (swatches, brand SVGs); styling
// uses the CSS vars in generated/css/ instead.
import tokens from '../generated/tokens.json'

export { tokens }
export type Tokens = typeof tokens
export type ThemeName = 'portfolio' | 'chapel'

export * from './mark'
