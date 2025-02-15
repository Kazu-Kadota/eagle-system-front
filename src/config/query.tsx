'use client';

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { logoutAction } from '@/app/(auth)/login/actions';
import { RoutePaths } from '@/constants/paths';
import { getErrorMsg } from '@/utils/errors';
import { TokenExpiredError } from '@/utils/request/TokenExpiredError';
import { useRouter } from 'next/navigation';

export function QueryProvider({ children }: React.PropsWithChildren) {
  const router = useRouter();

  const [queryClient] = useState(() => {
    const queryCache = new QueryCache({
      onError: async (error) => {
        if (error instanceof TokenExpiredError) {
          await logoutAction();
          router.push(RoutePaths.login());
        }

        const message = getErrorMsg(error);
        toast.error(message, { toastId: message });
      },
    });

    const mutationCache = new MutationCache({
      onError: async (error, _, _2, m) => {
        if (error instanceof TokenExpiredError) {
          await logoutAction();
          router.push(RoutePaths.login());
        }

        if (!m?.meta?.disableErrorToastMsg) {
          toast.error(getErrorMsg(error));
        }
      },
    });

    return new QueryClient({ queryCache, mutationCache });
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
