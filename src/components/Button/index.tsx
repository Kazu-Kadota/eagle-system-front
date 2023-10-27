import { VariantProps, tv } from 'tailwind-variants'

const style = tv({
  base: 'text-light block h-11 text-center text-xl font-bold transition-opacity hover:opacity-80',
  variants: {
    theme: {
      primary: 'bg-primary',
      dark: 'bg-dark',
    },
  },
  defaultVariants: {
    theme: 'dark',
  },
})

interface ButtonProps
  extends VariantProps<typeof style>,
    React.ComponentProps<'button'> {}

export function Button({ className, type, ...rest }: ButtonProps) {
  return (
    <button
      className={style({ className })}
      type={type ?? 'button'}
      {...rest}
    />
  )
}
