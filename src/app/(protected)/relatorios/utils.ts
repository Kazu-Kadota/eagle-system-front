import { customDayJs } from '@/config/dayjs';
import type { ReportAnalysisQuery } from '@/services/report/report';
import type { ReportSchema } from './schema';

export const prepareReportQuery = (
  data: ReportSchema,
): ReportAnalysisQuery => ({
  company: data.company || undefined,
  start_date: customDayJs(data.start_date, 'DD/MM/YYYY').toISOString(),
  final_date: customDayJs(data.final_date, 'DD/MM/YYYY').toISOString(),
});
