import type React from 'react';
import { useState, useEffect } from 'react';
import { twJoin } from 'tailwind-merge';

interface FadeViewProps extends React.ComponentProps<'div'> {
  isVisible: boolean;
  duration?: number;
}

export function Fade({
  isVisible,
  duration = 300,
  className,
  ...rest
}: FadeViewProps) {
  const [shouldRender, setShouldRender] = useState(isVisible);
  const [opacity, setOpacity] = useState(isVisible ? 1 : 0);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      const timer = setTimeout(() => setOpacity(1), 10);
      return () => clearTimeout(timer);
    }

    setOpacity(0);
    const timer = setTimeout(() => setShouldRender(false), duration);
    return () => clearTimeout(timer);
  }, [isVisible, duration]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      {...rest}
      className={twJoin('transition-opacity ease-in-out', className)}
      style={{
        opacity,
        transitionDuration: `${duration}ms`,
        ...rest.style,
      }}
    />
  );
}
