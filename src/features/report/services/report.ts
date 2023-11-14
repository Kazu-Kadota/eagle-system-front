import { env } from 'src/config/env'
import { requestDownloadAuth } from 'src/utils/request'
import { getPersonFileName, getVehicleFileName } from '../utils/fileName'

export type ReportAnalysisQuery = {
  company?: string | undefined
  start_date: string
  final_date: string
}

export const downloadPersonAnalysisReport = async (
  query: ReportAnalysisQuery,
) => {
  await requestDownloadAuth.post(env.VITE_API_REPORT_URL, `/analysis/person`, {
    query,
    fileName: getPersonFileName(),
  })
}

export const downloadVehicleAnalysisReport = async (
  query: ReportAnalysisQuery,
) => {
  await requestDownloadAuth.post(env.VITE_API_REPORT_URL, `/analysis/vehicle`, {
    query,
    fileName: getVehicleFileName(),
  })
}
