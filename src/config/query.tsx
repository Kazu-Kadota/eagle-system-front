import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { getErrorMsg } from '@/utils/errors';

export function QueryProvider({ children }: React.PropsWithChildren) {
  const [queryClient] = useState(() => {
    const queryCache = new QueryCache({
      onError: (error) => {
        const message = getErrorMsg(error);
        return toast.error(message, { toastId: message });
      },
    });

    return new QueryClient({ queryCache });
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
