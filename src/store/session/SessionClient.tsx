'use client';

import { useSessionStore } from '@/store/session';
import type { Session } from 'next-auth';
import { useRef } from 'react';

type Props = {
  session: Session;
};

export function SessionClient({ session }: Props) {
  const isInitialized = useRef(false);

  if (!isInitialized.current) {
    useSessionStore.setState({ session });
    isInitialized.current = true;
  }

  return null;
}
