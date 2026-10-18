// Line icons for the four stages of the workshop — drawn in the same engraving
// hand as Fig. 1 (1.2 stroke, square joins, one red detail each).

const PATHS: Record<string, { ink: string; red: string }> = {
  // Entrada — a spark falling
  entrada: {
    ink: 'M6 6L13 13M3 18L10 16M16 3L14 10',
    red: 'M22 15l1.6 4.4L28 21l-4.4 1.6L22 27l-1.6-4.4L16 21l4.4-1.6Z',
  },
  // Bancada — set square on the drawing board
  bancada: {
    ink: 'M4 28H28M6 28V6L26 28M10 24V18.5L15.5 24ZM6 10H8.5M6 14H8.5M6 18H8.5',
    red: 'M23 4l5 5-3 3-5-5Z',
  },
  // Forja — anvil and the hammer's spark
  forja: {
    ink: 'M5 14H23C23 18 20 20 16 20V24H21V28H7V24H12V20C8 20 5 18 5 14Z',
    red: 'M26 6v4M24 8h4M22 12l1.4 1.4',
  },
  // Órbita — planet, orbit, satellite
  orbita: {
    ink: 'M16 22a6 6 0 1 0 0-12 6 6 0 0 0 0 12ZM4 19C2 15 9 10 16 9s15 1 13 5',
    red: 'M26.5 20.5h4v4h-4Z',
  },
}

export function ProcessIcon({ stage }: { stage: keyof typeof PATHS }) {
  const p = PATHS[stage]
  return (
    <svg viewBox="0 0 32 32" width="36" height="36" aria-hidden className="text-foreground">
      <path d={p.ink} fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d={p.red} className="fill-accent stroke-accent" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  )
}
