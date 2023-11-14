import { env } from 'src/config/env'
import { requestAuth } from 'src/utils/request'

type ChangePasswordBody = {
  password: string
  old_password: string
}

export const changePassword = async (body: ChangePasswordBody) => {
  const { data } = await requestAuth.post(
    env.VITE_API_USER_URL,
    '/change-password',
    { body },
  )

  return data
}
