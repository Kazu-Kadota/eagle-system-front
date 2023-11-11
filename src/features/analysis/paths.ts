import queryString from 'query-string'
import { RequestAnalysisParams } from './pages/RequestAnalysis'

export const AnalysisRoutePaths = {
  ANALYSIS_HOME: '/analises',
  requestAnalysis: (params?: RequestAnalysisParams) =>
    queryString.stringifyUrl({
      url: '/solicitar-analise',
      query: params,
    }),
}
