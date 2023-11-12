import queryString from 'query-string'
import { RequestAnalysisParams } from './pages/RequestAnalysis'
import { PersonAnalysis } from 'src/models'

export const AnalysisRoutePaths = {
  ANALYSIS_HOME: '/analises',
  requestAnalysis: (params?: RequestAnalysisParams) =>
    queryString.stringifyUrl({
      url: '/analises/solicitar',
      query: params,
    }),
  peopleAnalysisDetail: (item?: PersonAnalysis) =>
    queryString.stringifyUrl({
      url: `/analises/pessoas/${item?.request_id ?? ':id'}`,
      query: { personId: item?.person_id },
    }),
}
