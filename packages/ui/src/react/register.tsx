import { Text } from './text'

/** A titled register: a mono label over a ruled list (degrees, certificates, references…). */
export function Register({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="plot-rise">
      <Text family="mono" size="xs" color="muted" className="mb-3">
        {title}
      </Text>
      <ul className="list-none border-t border-border-strong">{children}</ul>
    </div>
  )
}
