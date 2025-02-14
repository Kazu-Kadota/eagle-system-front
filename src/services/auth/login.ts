import { env } from '@/env/client';
import type { AuthResponse } from '@/models';
import { request } from '@/utils/request';

type LoginBody = {
  email: string;
  password: string;
};

export async function login(body: LoginBody) {
  const { data } = await request.post<AuthResponse>(
    env.NEXT_PUBLIC_API_USER_URL,
    '/login',
    { body },
  );

  return data;
}
