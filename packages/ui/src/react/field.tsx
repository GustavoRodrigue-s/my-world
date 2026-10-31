import { Text } from './text'
import { cx } from './utils'

// Near-square, a hairline that inks on hover. Disabled, a field is still in
// pencil: a dashed outline in the support color, nothing to type into yet.
const controlClasses =
  'w-full rounded-xs border border-border-strong bg-transparent px-3 py-3 font-sans text-base text-foreground ' +
  'placeholder:text-foreground-subtle transition-colors duration-fast hover:border-foreground ' +
  'disabled:pointer-events-none disabled:border-dashed disabled:border-support'

interface FieldFrameProps {
  id: string
  label: string
  /** A short note beside the label ("não será publicado"). */
  hint?: string
  className?: string
  children: React.ReactNode
}

function FieldFrame({ id, label, hint, className, children }: FieldFrameProps) {
  return (
    <div className={cx('flex min-w-0 flex-col gap-2', className)}>
      <div className="flex flex-wrap items-baseline gap-x-2">
        <label htmlFor={id} className="font-mono text-xs leading-none text-foreground">
          {label}
        </label>
        {hint && (
          <Text as="span" id={`${id}-hint`} family="mono" size="xs" color="muted" leading="none">
            {hint}
          </Text>
        )}
      </div>
      {children}
    </div>
  )
}

interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id'> {
  id: string
  label: string
  hint?: string
}

/** A one-line text field with its label (and an optional hint) above it. */
export function TextField({ id, label, hint, className, ...props }: TextFieldProps) {
  return (
    <FieldFrame id={id} label={label} hint={hint} className={className}>
      <input id={id} aria-describedby={hint ? `${id}-hint` : undefined} className={controlClasses} {...props} />
    </FieldFrame>
  )
}

interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> {
  id: string
  label: string
  hint?: string
}

/** A text box for a few paragraphs, with its label above it. Grows only by the reader's hand (vertical resize). */
export function TextArea({ id, label, hint, rows = 5, className, ...props }: TextAreaProps) {
  return (
    <FieldFrame id={id} label={label} hint={hint} className={className}>
      <textarea
        id={id}
        rows={rows}
        aria-describedby={hint ? `${id}-hint` : undefined}
        className={cx(controlClasses, 'resize-y leading-relaxed')}
        {...props}
      />
    </FieldFrame>
  )
}
