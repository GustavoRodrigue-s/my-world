// Minimal class name helper — no external dependency
export function cx(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

/** The icon scale (size.icon.*), as whole class names so Tailwind finds them. */
export const ICON_SIZE = {
  '2xs': 'size-icon-2xs',
  xs: 'size-icon-xs',
  sm: 'size-icon-sm',
  md: 'size-icon-md',
  lg: 'size-icon-lg',
  xl: 'size-icon-xl',
  '2xl': 'size-icon-2xl',
  '3xl': 'size-icon-3xl',
  '4xl': 'size-icon-4xl',
  '5xl': 'size-icon-5xl',
  '6xl': 'size-icon-6xl',
} as const
export type IconSize = keyof typeof ICON_SIZE

// FNV-1a → mulberry32: tiny, deterministic, identical on server and client.
function hash(seed: string): number {
  let h = 0x811c9dc5
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return h >>> 0
}

/** A seeded random generator in [0, 1): same seed, same sequence, forever. */
export function prng(seed: string) {
  let a = hash(seed)
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
