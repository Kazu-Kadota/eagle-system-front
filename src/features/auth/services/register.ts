import { env } from 'src/config/env'
import { CompanyType, UserType } from 'src/models'
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

type RegisterCompanyBody = {
  name: string
  cnpj: string
  type: CompanyType
}

export const registerUser = async (body: RegisterUserBody) => {
  await requestAuth.post(env.VITE_API_USER_URL, `/register/user`, { body })
}

export const registerCompany = async (body: RegisterCompanyBody) => {
  await requestAuth.post(env.VITE_API_USER_URL, `/register/company`, { body })
}
