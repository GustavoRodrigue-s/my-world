/**
 * The Capela under construction, in hairline: the nave already stands (red
 * cross, the rose window's gold heart), the tower is still a dashed outline
 * and the scaffolding rises beside it.
 */
export function ChapelScaffold({ title, className }: { title: string; className?: string }) {
  return (
    <svg viewBox="0 0 180 130" width="180" height="130" role="img" aria-label={title} className={className}>
      <g fill="none" className="stroke-foreground" strokeWidth="1.2" strokeLinejoin="round">
        <path d="M10 120H170" />
        {/* The nave */}
        <path d="M46 120V64H106V120" className="fill-surface" />
        <path d="M40 66L76 34L112 66" />
        <circle cx="76" cy="52" r="6" />
        <path d="M68 120V100A8 8 0 0 1 84 100V120" />
        {/* The tower, still on paper */}
        <path d="M106 120V44H124V120M104 46L115 30L126 46" strokeDasharray="3 3" />
        {/* Scaffolding */}
        <path d="M130 120V36M150 120V36M128 56H152M128 80H152M128 104H152M130 104L150 80M130 80L150 56" strokeWidth="1" />
      </g>
      <path d="M76 34V14M69 21H83" fill="none" className="stroke-accent" strokeWidth="1.4" />
      <circle cx="76" cy="52" r="2" className="fill-support-1" />
    </svg>
  )
}
