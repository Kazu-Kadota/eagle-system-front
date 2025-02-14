import Link, { type LinkProps } from 'next/link';
import { type VariantProps, tv } from 'tailwind-variants';

import { Spinner } from '@/components/Spinner';

const style = tv({
  base: 'flex min-w-0 max-w-full items-center justify-center rounded-[0.1875rem] px-3 text-center text-light transition-opacity hover:opacity-80 disabled:opacity-100',
  variants: {
    theme: {
      primary: 'bg-primary',
      dark: 'bg-dark',
      placeholder: 'bg-placeholder',
      success: 'bg-success',
      accent: 'bg-accent',
      error: 'bg-error',
      blue: 'bg-blue',
      opaque: 'bg-opaque',
      brown: 'bg-brown',
      purple: 'bg-purple',
      darkPurple: 'bg-dark-purple',
    },
    size: {
      xxs: 'min-h-[1.75rem] text-xs font-semibold',
      xs: 'min-h-[1.75rem] text-sm font-medium',
      xsStrong: 'min-h-[2rem] text-sm font-bold',
      xsx: 'min-h-[2.2rem] text-base font-bold',
      sm: 'min-h-[2.25rem] text-base font-bold',
      md: 'min-h-[2.75rem] text-xl font-bold',
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
});

export type ButtonProps = VariantProps<typeof style> &
  React.ComponentProps<'button'> &
  Partial<LinkProps> & {
    loading?: boolean;
  };

export function Button({
  href,
  className,
  type,
  theme,
  size,
  shadow,
  loading,
  disabled,
  children,
  ...rest
}: ButtonProps) {
  const commonProps = {
    disabled: disabled || loading,
    className: style({ theme, size, shadow, className }),
    children: loading ? <Spinner className="w-5 fill-light" /> : children,
  };

  if (href) {
    return <Link {...commonProps} href={href} />;
  }

  return <button {...commonProps} {...rest} type={type ?? 'button'} />;
}
