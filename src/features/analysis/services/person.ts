import { env } from 'src/config/env'
import { PersonAnalysis } from 'src/models/analysis'
import { requestAuth } from 'src/utils/request'
import { preparePersonDataFromApi } from '../utils/mappers'

interface PersonAnalysisResponse {
  people: PersonAnalysis[]
}

interface PersonAnalysisDetailResponse {
  person: PersonAnalysis
}

interface PersonAnalysisDetailQuery {
  person_id: string
  request_id: string
}

export const getPersonAnalysis = async () => {
  const { data } = await requestAuth.get<PersonAnalysisResponse>(
    env.VITE_API_REQUEST_URL,
    '/analysis/people',
  )

  return data
}

export const getPersonDetailAnalysis = async ({
  person_id,
  request_id,
}: PersonAnalysisDetailQuery) => {
  const { data } = await requestAuth.get<PersonAnalysisDetailResponse>(
    env.VITE_API_REQUEST_URL,
    `/analysis/person/${person_id}`,
    { query: { request_id } },
  )

  return {
    ...data,
    person: preparePersonDataFromApi(data.person),
  }
}
