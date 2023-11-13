import { Link, LinkProps } from 'react-router-dom'
import { VariantProps, tv } from 'tailwind-variants'
import { Spinner } from '..'

const style = tv({
  base: 'flex min-w-0 max-w-full items-center justify-center rounded-[0.1875rem] px-3 text-center text-light transition-opacity hover:opacity-80 disabled:opacity-100',
  variants: {
    theme: {
      primary: 'bg-primary ',
      dark: 'bg-dark',
      placeholder: 'bg-placeholder',
      success: 'bg-success',
      accent: 'bg-accent',
      error: 'bg-error',
      blue: 'bg-blue',
      opaque: 'bg-opaque',
      brown: 'bg-brown',
      purple: 'bg-purple',
    },
    size: {
      xxs: 'h-7 text-xs font-semibold',
      xs: 'h-7 text-sm font-medium',
      xsStrong: 'h-8 text-sm font-bold',
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
