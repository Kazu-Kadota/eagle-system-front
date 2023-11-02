import { Link, LinkProps } from 'react-router-dom'
import { VariantProps, tv } from 'tailwind-variants'
import { Spinner } from '..'

const style = tv({
  base: 'flex min-w-0 max-w-full items-center justify-center rounded-sm text-center text-light transition-opacity hover:opacity-80',
  variants: {
    theme: {
      primary: 'bg-primary ',
      dark: 'bg-dark',
      placeholder: 'bg-placeholder',
    },
    size: {
      xs: 'h-7 text-sm font-medium',
      sm: 'h-9 text-base font-bold',
      md: 'h-11 text-xl font-bold',
    },
    shadow: {
      base: 'shadow-button',
      none: '',
    },
  },
  defaultVariants: {
    theme: 'dark',
    size: 'md',
    shadow: 'none',
  },
})

export type ButtonProps = VariantProps<typeof style> &
  React.ComponentProps<'button'> &
  Partial<LinkProps> & {
    loading?: boolean
  }

export function Button({
  to,
  className,
  type,
  theme,
  size,
  shadow,
  loading,
  children,
  ...rest
}: ButtonProps) {
  const commonProps = {
    className: style({ theme, size, shadow, className }),
    children: loading ? <Spinner className="w-5 fill-light" /> : children,
  }

  if (to) {
    return <Link {...commonProps} to={to} />
  }

  return <button {...commonProps} {...rest} type={type ?? 'button'} />
}
