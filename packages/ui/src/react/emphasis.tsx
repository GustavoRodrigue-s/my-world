import { cx } from './utils'

/**
 * "A palavra que importa" — the one word per statement set in the voice face
 * (serif italic) and the environment's accent. Shared by every landscape: the
 * chapel's gold "inteligência", the workshop's red "capricho".
 */
export function Emphasis({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <em
      className={cx(
        // Cormorant's x-height is small next to a grotesk; 1.08em evens the optical size.
        'font-serif italic font-normal text-accent text-[1.08em] leading-[0] tracking-[-0.01em]',
        className
      )}
      {...props}
    />
  )
}
