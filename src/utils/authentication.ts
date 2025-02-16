import { auth } from '@/auth';
import { RoutePaths } from '@/constants/paths';
import type { UserType } from '@/models';
import { hasUserType } from '@/utils/userType';
import dayjs from 'dayjs';
import type { Session } from 'next-auth';
import { type JWT } from 'next-auth/jwt';
import { redirect } from 'next/navigation';

type GetSessionParams = {
  allowedUserTypes?: UserType[];
};

export const isAuthenticated = (jwt?: JWT['jwt']) =>
  !!(jwt?.token && jwt.expiresIn) && dayjs().isBefore(dayjs(jwt.expiresIn));

export const getSession = async ({
  allowedUserTypes,
}: GetSessionParams = {}): Promise<Session> => {
  const session = await auth();

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
