import { cn } from 'src/utils/classNames'

export function Box({ className, ...rest }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'bg-light flex w-full flex-col rounded-md px-5 pb-8 pt-6 sm:px-6',
        className,
      )}
      {...rest}
    />
  )
}
