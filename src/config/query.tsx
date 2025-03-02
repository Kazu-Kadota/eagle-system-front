'use client';

import { logoutAction } from '@/app/(auth)/login/actions';
import { RoutePaths } from '@/constants/paths';
import { useModalStore } from '@/store/modal/store';
import { getErrorMsg } from '@/utils/errors';
import { TokenExpiredError } from '@/utils/request/TokenExpiredError';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

export function QueryProvider({ children }: React.PropsWithChildren) {
  const router = useRouter();

  const [queryClient] = useState(() => {
    const logout = async () => {
      const { error } = await logoutAction();

      if (error) throw error;

      router.push(RoutePaths.login());
      useModalStore.getState().actions.close();
    };

    const queryCache = new QueryCache({
      onError: async (error) => {
        if (error instanceof TokenExpiredError) {
          await logout();
        }

        const message = getErrorMsg(error);
        toast.error(message, { toastId: message });
      },
    });

    const mutationCache = new MutationCache({
      onError: async (error, _, _2, m) => {
        if (error instanceof TokenExpiredError) {
          await logout();
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
