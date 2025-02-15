import { env } from '@/env';
import type { WithToken } from '@/types/auth';
import { requestAuth } from '@/utils/request';

type ChangePasswordBody = {
  password: string;
  old_password: string;
};

export const changePassword = async ({
  token,
  ...body
}: WithToken<ChangePasswordBody>) => {
  const { data } = await requestAuth.post(
    env.NEXT_PUBLIC_API_USER_URL,
    '/change-password',
    { body, token },
  );

  return data;
};
