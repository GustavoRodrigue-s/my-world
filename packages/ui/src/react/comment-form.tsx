import { Button } from './button'
import { TextArea, TextField } from './field'
import { cx } from './utils'

interface CommentFormProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'id'> {
  /** Prefix for the fields' ids (one form per page). */
  id: string
  labels: { legend: string; name: string; email: string; emailHint: string; body: string; submit: string }
  /** Closed: every field drawn in pencil and out of reach. */
  disabled?: boolean
  /** Id of the element that says why it is closed (read with the form). */
  reasonId?: string
}

/** Name, e-mail (never published) and the comment. Closed, it is shown but cannot be used. */
export function CommentForm({ id, labels, disabled = false, reasonId, className, ...props }: CommentFormProps) {
  return (
    <form className={cx('min-w-0', className)} {...props}>
      <fieldset disabled={disabled} aria-describedby={reasonId} className="m-0 grid min-w-0 gap-5 border-0 p-0 md:grid-cols-2">
        <legend className="sr-only">{labels.legend}</legend>
        <TextField id={`${id}-name`} name="name" label={labels.name} autoComplete="name" required />
        <TextField
          id={`${id}-email`}
          name="email"
          type="email"
          label={labels.email}
          hint={labels.emailHint}
          autoComplete="email"
          required
        />
        <TextArea id={`${id}-body`} name="body" label={labels.body} required className="md:col-span-2" />
        <div className="md:col-span-2">
          <Button type="submit" variant="ink" size="sm">
            {labels.submit}
          </Button>
        </div>
      </fieldset>
    </form>
  )
}
