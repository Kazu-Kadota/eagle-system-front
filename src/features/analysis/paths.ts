import queryString from 'query-string'
import { RequestAnalysisParams } from './pages/RequestAnalysis'
import { PersonAnalysis, VehicleAnalysis } from 'src/models'

export const AnalysisRoutePaths = {
  PEOPLE_ANALYSIS_HOME: '/analises/pessoas',
  VEHICLE_ANALYSIS_HOME: '/analises/veiculos',
  SEARCH_PEOPLE_ANALYSIS: '/analises/pessoas/consultar',
  SEARCH_VEHICLE_ANALYSIS: '/analises/veiculos/consultar',
  requestAnalysis: (params?: RequestAnalysisParams) =>
    queryString.stringifyUrl({
      url: '/analises/solicitar/',
      query: params,
    }),
  peopleAnalysisDetail: (item?: PersonAnalysis) =>
    queryString.stringifyUrl({
      url: `/analises/pessoas/${item?.request_id ?? ':id'}/`,
      query: { personId: item?.person_id },
    }),
  vehicleAnalysisDetail: (item?: VehicleAnalysis) =>
    queryString.stringifyUrl({
      url: `/analises/veiculos/${item?.request_id ?? ':id'}/`,
      query: { vehicleId: item?.vehicle_id },
    }),
}
