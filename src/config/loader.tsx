'use client';

import { AppProgressProvider as ProgressProvider } from '@bprogress/next';

const LoaderProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <ProgressProvider
      height="3px"
      color="#9B6B0F"
      delay={100}
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  );
};

export default LoaderProvider;
