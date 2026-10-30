import { cx } from '@/components/ui'

/**
 * The Biblioteca under construction: the colonnade already stands in ink, the
 * pediment is still in pencil (graphite, dashed) and the scaffolding beside it
 * is pencil too. The seed on the apex, in the rubric red, is what was planted.
 */
export function StudiesScaffold({ title, className }: { title: string; className?: string }) {
  return (
    <svg viewBox="0 0 180 130" role="img" aria-label={title} className={cx('h-auto w-2xs', className)}>
      <g fill="none" className="stroke-foreground" strokeWidth="1.2" strokeLinejoin="round">
        <path d="M10 120H170" />
        {/* Steps, colonnade and entablature, in ink */}
        <path d="M26 120V115H124V120M30 115V111H120V115" className="fill-surface" />
        <path d="M39 111V72M57 111V72M75 111V72M93 111V72M111 111V72" />
        <path d="M32 72H118V64H32Z" className="fill-surface" />
      </g>
      <g fill="none" className="stroke-support" strokeWidth="1" strokeLinejoin="round">
        {/* The pediment, still in pencil */}
        <path d="M28 64L75 40L122 64" strokeDasharray="3 3" />
        <circle cx="75" cy="55" r="4" strokeDasharray="2 2" />
        {/* Scaffolding */}
        <path d="M134 120V40M154 120V40M132 60H156M132 84H156M132 108H156M134 108L154 84M134 84L154 60" />
      </g>
      <path d="M75 30.4A5.6 5.6 0 0 1 75 39.6A5.6 5.6 0 0 1 75 30.4Z" className="fill-primary" />
    </svg>
  )
}
