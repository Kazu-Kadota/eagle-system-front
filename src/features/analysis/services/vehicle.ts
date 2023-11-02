import { env } from 'src/config/env'
import { VehicleAnalysis } from 'src/models/analysis'
import { requestAuth } from 'src/utils/request'

interface VehicleAnalysisResponse {
  vehicles: VehicleAnalysis[]
}

export const getVehicleAnalysis = async () => {
  const { data } = await requestAuth.get<VehicleAnalysisResponse>(
    env.VITE_API_REQUEST_URL,
    '/analysis/vehicles',
  )

  return data
}
