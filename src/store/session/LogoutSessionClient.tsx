'use client';

import { useSessionStore } from '@/store/session';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export function LogoutSessionClient() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const { session, actions } = useSessionStore.getState();

    if (session) {
      actions.clear();
      queryClient.clear();
    }
  }, []);

  return null;
}
