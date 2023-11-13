import { env } from 'src/config/env'
import { UserType } from 'src/models'
import { requestAuth } from 'src/utils/request'

type RegisterUserBody = {
  company_name: string
  password: string
  user_first_name: string
  user_last_name: string
  email: string
  user_type: UserType
  api: boolean
}

export const registerUser = async (body: RegisterUserBody) => {
  await requestAuth.post(env.VITE_API_USER_URL, `/register/user`, { body })
}
