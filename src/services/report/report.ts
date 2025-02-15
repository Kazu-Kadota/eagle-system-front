import { env } from '@/env';
import { getPersonFileName, getVehicleFileName } from '@/utils/report/files';
import { requestDownloadAuth } from '@/utils/request';

export type ReportAnalysisQuery = {
  company?: string | undefined;
  start_date: string;
  final_date: string;
};

export const downloadPersonAnalysisReport = async (
  query: ReportAnalysisQuery,
) => {
  await requestDownloadAuth.post(
    env.NEXT_PUBLIC_API_REPORT_URL,
    `/analysis/person`,
    {
      query,
      fileName: getPersonFileName(),
    },
  );
};

export const downloadVehicleAnalysisReport = async (
  query: ReportAnalysisQuery,
) => {
  await requestDownloadAuth.post(
    env.NEXT_PUBLIC_API_REPORT_URL,
    `/analysis/vehicle`,
    {
      query,
      fileName: getVehicleFileName(),
    },
  );
};
