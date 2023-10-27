import { VariantProps, tv } from 'tailwind-variants'

const style = tv({
  base: 'text-light block text-center font-bold transition-opacity hover:opacity-80',
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
    React.ComponentProps<'button'> {}

export function Button({ className, type, theme, size, ...rest }: ButtonProps) {
  return (
    <button
      className={style({ theme, size, className })}
      type={type ?? 'button'}
      {...rest}
    />
  )
}
