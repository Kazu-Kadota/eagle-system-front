import React from 'react';

interface FadeViewProps extends React.ComponentProps<'div'> {
  isVisible: boolean;
}

export function Fade({ isVisible, ...rest }: FadeViewProps) {
  if (!isVisible) {
    return null;
  }

  return <div {...rest} />;
}
