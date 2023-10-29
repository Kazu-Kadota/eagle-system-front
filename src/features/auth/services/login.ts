import { env } from 'src/config/env'
import { AuthResponse } from 'src/models'
import { request } from 'src/utils/request'

type LoginBody = {
  email: string
  password: string
}

export async function login(body: LoginBody) {
  const { data } = await request.post<AuthResponse>(
    env.VITE_API_USER_URL,
    '/login',
    { body },
  )

  return data
}
