import { env } from '@/env/client';
import { request } from '@/utils/request';

type ResetPasswordSendBody = {
  password: string;
  confirm_password: string;
};

export type ResetPasswordSendQuery = {
  email: string;
  recovery_id: string;
};

const resetPasswordSend = async (
  body: ResetPasswordSendBody,
  query: ResetPasswordSendQuery,
) => {
  await request.post(env.NEXT_PUBLIC_API_USER_URL, '/reset-password', {
    body,
    query,
  });
};

export default resetPasswordSend;
