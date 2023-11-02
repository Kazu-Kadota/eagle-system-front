import { cn } from 'src/utils/classNames'

interface ClickableProps extends React.ComponentProps<'button'> {}

export function Clickable({ className, ...rest }: ClickableProps) {
  return (
    <button
      type="button"
      className={cn('transition-opacity hover:opacity-60', className)}
      {...rest}
    />
  )
}
