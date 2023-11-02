import { env } from 'src/config/env'
import { PersonAnalysis } from 'src/models/analysis'
import { requestAuth } from 'src/utils/request'

interface PersonAnalysisResponse {
  people: PersonAnalysis[]
}

export const getPersonAnalysis = async () => {
  const { data } = await requestAuth.get<PersonAnalysisResponse>(
    env.VITE_API_REQUEST_URL,
    '/analysis/people',
  )

  return data
}
