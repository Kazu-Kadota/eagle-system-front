import { VariantProps, tv } from 'tailwind-variants'
import { Spinner } from '..'

const style = tv({
  base: 'flex items-center justify-center text-center font-bold text-light transition-opacity hover:opacity-80',
  variants: {
    theme: {
      primary: 'bg-primary',
      dark: 'bg-dark',
    },
    size: {
      sm: 'h-9 text-base',
      md: 'h-11 text-xl',
    },
  },
  defaultVariants: {
    theme: 'dark',
    size: 'md',
  },
})

interface ButtonProps
  extends VariantProps<typeof style>,
    React.ComponentProps<'button'> {
  loading?: boolean
}

export function Button({
  className,
  type,
  theme,
  size,
  loading,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={style({ theme, size, className })}
      type={type ?? 'button'}
      {...rest}
    >
      {loading ? <Spinner className="w-5 fill-light" /> : children}
    </button>
  )
}
