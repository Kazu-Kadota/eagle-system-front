import { env } from '@/env/client';
import { request } from '@/utils/request';

type RecoveryPasswordSendBody = {
  email: string;
};

const recoveryPasswordSend = async (body: RecoveryPasswordSendBody) => {
  await request.post(env.NEXT_PUBLIC_API_USER_URL, '/recovery-password', {
    body,
  });
};

export default recoveryPasswordSend;
