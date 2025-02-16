import { cachedAuth } from '@/auth';
import { customDayJs } from '@/config/dayjs';
import { RoutePaths } from '@/constants/paths';
import type { UserType } from '@/models';
import { hasUserType } from '@/utils/userType';
import type { Session } from 'next-auth';
import { type JWT } from 'next-auth/jwt';
import { redirect } from 'next/navigation';

type GetSessionParams = {
  allowedUserTypes?: UserType[];
};

export const isAuthenticated = (jwt?: JWT['jwt']) =>
  !!(jwt?.token && jwt.expiresIn) &&
  customDayJs().isBefore(customDayJs(jwt.expiresIn));

export const getSessionOrRedirect = async ({
  allowedUserTypes,
}: GetSessionParams = {}): Promise<Session> => {
  const session = await cachedAuth();

  if (!session) {
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
