'use client';

import { useSessionStore } from '@/store/session';
import { useEffect } from 'react';

export function LogoutSessionClient() {
  useEffect(() => {
    const { session, actions } = useSessionStore.getState();

    if (session) {
      actions.clear();
    }
  }, []);

  return null;
}
