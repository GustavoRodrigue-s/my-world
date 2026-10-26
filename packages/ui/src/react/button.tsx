import { cx } from './utils'

type Variant = 'ink' | 'line' | 'quiet' | 'rubric' | 'stone'
type Size = 'sm' | 'md' | 'lg' | 'none'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

const sizeMap: Record<Size, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-[26px] py-3 text-sm',
  lg: 'px-8 py-[14px] text-base',
  none: '',
}

// Shared by the portfolio variants: near-square, grotesk, arrow-friendly.
const identityBase =
  'inline-flex items-center gap-2.5 font-sans font-medium no-underline whitespace-nowrap cursor-pointer ' +
  'transition-[background-color,color,border-color] duration-fast ' +
  '[&_svg]:transition-transform [&_svg]:duration-normal hover:[&_svg]:translate-x-0.5'

const variantMap: Record<Variant, string> = {
  // Mundo do Gustavo
  ink:   `${identityBase} rounded-xs bg-foreground text-surface border border-foreground hover:bg-primary hover:border-primary hover:text-on-primary`,
  line:  `${identityBase} rounded-xs bg-transparent text-foreground border border-border-strong hover:border-foreground`,
  quiet: `${identityBase} bg-transparent text-foreground border-0 underline decoration-border-strong decoration-1 underline-offset-[6px] hover:decoration-primary hover:text-primary`,
  // Flat (Capela): solid fills, no borders. The red one is the page's main action — small, never a large field.
  rubric: `${identityBase} rounded-xs bg-primary text-on-primary border-0 hover:bg-primary-hover`,
  stone:  `${identityBase} rounded-xs bg-surface-muted text-foreground border-0 hover:bg-foreground hover:text-surface`,
}

/** Button styling for elements that must be links (`<Link>` / `<a>`), so they match `<Button>`. */
export function buttonClasses({ variant = 'ink', size = 'md' }: { variant?: Variant; size?: Size } = {}) {
  return cx(variantMap[variant], sizeMap[size])
}

export function Button({
  variant = 'ink',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cx(variantMap[variant], sizeMap[size], className)}
      {...props}
    >
      {children}
    </button>
  )
}
