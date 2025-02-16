import type { Session } from 'next-auth';
import { useMemo } from 'react';
import { create } from 'zustand';

interface SessionActions {
  clear: () => void;
}

interface SessionStore {
  session: Session | null;
  actions: SessionActions;
}

export const useSessionStore = create<SessionStore>((set) => ({
  session: null,
  actions: {
    clear: () => set({ session: null }),
  },
}));

export const useSessionUser = () =>
  useMemo(() => useSessionStore.getState().session?.user, []);

export const useSessionUserType = () =>
  useMemo(() => useSessionStore.getState().session?.user.user_type, []);
