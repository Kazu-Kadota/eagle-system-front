import { cachedAuth } from '@/auth';
import { RoutePaths } from '@/constants/paths';
import type { UserType } from '@/models';
import { hasUserType } from '@/utils/userType';
import type { Session } from 'next-auth';
import { type JWT } from 'next-auth/jwt';
import { redirect } from 'next/navigation';

type GetSessionParams = {
  allowedUserTypes?: UserType[];
};

export const isTokenValid = (jwt: JWT['jwt']) =>
  new Date() < new Date(jwt.expiresIn);

export const getSessionOrRedirect = async ({
  allowedUserTypes,
}: GetSessionParams = {}): Promise<Session> => {
  const session = await cachedAuth();

  if (!session || !isTokenValid(session.jwt)) {
    redirect(RoutePaths.login({ callbackUrl: RoutePaths.HOME }));
  }

  if (
    allowedUserTypes &&
    !hasUserType(session.user.user_type, ...allowedUserTypes)
  ) {
    redirect(RoutePaths.ACCESS_DENIED);
  }

  return session;
};

export const verifyIsLoggedIn = async () => {
  const session = await cachedAuth();

  return session && isTokenValid(session.jwt);
};
