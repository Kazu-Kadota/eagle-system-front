import { env } from 'src/config/env'
import { requestAuth } from 'src/utils/request'

interface SendAnalysisOptions {
  analysisCategory: string
  id: string
  person_id?: string
  vehicle_id?: string
  analysis_info?: string
  analysis_result: string
}

export const sendAnalysis = async ({
  id,
  person_id,
  vehicle_id,
  analysisCategory,
  analysis_info,
  analysis_result,
}: SendAnalysisOptions) => {
  const { data } = await requestAuth.post(
    env.VITE_API_REQUEST_URL,
    `/analysis/${analysisCategory}/${id}/answer`,
    {
      body: { analysis_info, analysis_result },
      query: { person_id, vehicle_id },
    },
  )

  return data
}
