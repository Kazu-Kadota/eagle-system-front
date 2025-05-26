import { useTransition } from '@/hooks/useTransition';
import React from 'react';
import { twJoin } from 'tailwind-merge';

interface FadeViewProps extends React.ComponentProps<'div'> {
  isVisible: boolean;
}

export function Fade({ isVisible, className, ...rest }: FadeViewProps) {
  const { shouldMount, stage } = useTransition(isVisible, 1000);

  if (!shouldMount) {
    return null;
  }

  return (
    <div
      {...rest}
      className={twJoin(
        className,
        'transition-opacity',
        stage === 'enter' ? 'opacity-100' : 'opacity-0',
      )}
    />
  );
}
