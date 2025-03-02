import { cn } from '@/utils/classNames';

export function Clickable({
  className,
  ...rest
}: React.ComponentProps<'button'>) {
  return (
    <button
      type="button"
      className={cn('transition-opacity hover:opacity-60', className)}
      {...rest}
    />
  );
}
