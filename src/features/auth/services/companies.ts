import { env } from 'src/config/env'
import { Company } from 'src/models'
import { requestAuth } from 'src/utils/request'

export interface CompaniesResponse {
  message: string
  companies: Company[]
}

export const getCompanies = async () => {
  const { data } = await requestAuth.get<CompaniesResponse>(
    env.VITE_API_USER_URL,
    '/companies',
  )

  return data
}
