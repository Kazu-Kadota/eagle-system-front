import { env } from '@/env';
import { requestAuth } from '@/utils/request';

type ChangePasswordBody = {
  password: string;
  old_password: string;
};

export const changePassword = async (body: ChangePasswordBody) => {
  const { data } = await requestAuth.post(
    env.NEXT_PUBLIC_API_USER_URL,
    '/change-password',
    { body },
  );

  return data;
};
