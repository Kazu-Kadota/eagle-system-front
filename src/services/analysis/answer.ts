import { env } from '@/env/client';
import { requestAuth } from '@/utils/request';

interface SendAnalysisOptions {
  analysisCategory: string;
  id: string;
  person_id?: string;
  vehicle_id?: string;
  analysis_info?: string;
  analysis_result: string;
  from_db: boolean;
}

export const sendAnalysis = async ({
  id,
  person_id,
  vehicle_id,
  analysisCategory,
  analysis_info,
  analysis_result,
  from_db,
}: SendAnalysisOptions) => {
  const { data } = await requestAuth.post(
    env.NEXT_PUBLIC_API_REQUEST_URL,
    `/analysis/${analysisCategory}/${id}/answer`,
    {
      body: { analysis_info, analysis_result, from_db },
      query: { person_id, vehicle_id },
    },
  );

  return data;
};
