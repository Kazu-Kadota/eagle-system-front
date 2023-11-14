import dayjs from 'dayjs'
import { ReportAnalysisQuery } from '../../services/report'
import { ReportSchema } from './schema'

export const prepareReportQuery = (
  data: ReportSchema,
): ReportAnalysisQuery => ({
  company: data.company || undefined,
  start_date: dayjs(data.start_date, 'DD/MM/YYYY').toISOString(),
  final_date: dayjs(data.final_date, 'DD/MM/YYYY').toISOString(),
})
