import NextLink, { type LinkProps as NextLinkProps } from 'next/link';

import { cn } from '@/utils/classNames';

type LinkProps = NextLinkProps & {
  className?: string;
};

export function Link({ className, ...rest }: LinkProps) {
  return (
    <NextLink
      className={cn('transition-opacity hover:opacity-60', className)}
      {...rest}
    />
  );
}
