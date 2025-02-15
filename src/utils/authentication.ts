import { auth } from '@/auth';
import { RoutePaths } from '@/constants/paths';
import dayjs from 'dayjs';
import type { Session } from 'next-auth';
import { type JWT } from 'next-auth/jwt';
import { redirect } from 'next/navigation';

export const isAuthenticated = (jwt?: JWT['jwt']) =>
  !!(jwt?.token && jwt.expiresIn) && dayjs().isBefore(dayjs(jwt.expiresIn));

export const getSession = async (): Promise<Session> => {
  const session = await auth();

  if (!session) {
    redirect(RoutePaths.login({ callbackUrl: RoutePaths.HOME }));
  }

  return session;
};
