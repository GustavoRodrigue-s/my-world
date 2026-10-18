import { cx } from './utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean
}

export function Card({ hover = true, className, ...props }: CardProps) {
  return (
    <div
      className={cx(
        'bg-surface border border-border rounded-card overflow-hidden',
        hover && 'transition-[border-color,transform,box-shadow] duration-200',
        hover && 'hover:border-border-strong hover:-translate-y-0.5 hover:shadow-card',
        className
      )}
      {...props}
    />
  )
}

interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardBody({ className, ...props }: CardBodyProps) {
  return <div className={cx('p-5 flex flex-col flex-1', className)} {...props} />
}
