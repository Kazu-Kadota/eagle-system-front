import { env } from '@/env';
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

type ChangePersonAnswerParams = {
  person_id: string;
  request_id: string;
  analysis_result: string;
  analysis_info: string;
  from_db: boolean;
};

type ChangeVehicleAnswerParams = {
  vehicle_id: string;
  request_id: string;
  analysis_result: string;
  analysis_info: string;
  from_db: boolean;
};

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

export const changeAnswerPersonAnalysis = async (
  params: ChangePersonAnswerParams,
) => {
  await requestAuth.post(
    env.NEXT_PUBLIC_API_REQUEST_URL,
    '/analysis/person/change-answer',
    { body: params },
  );
};

export const changeAnswerVehicleAnalysis = async (
  params: ChangeVehicleAnswerParams,
) => {
  await requestAuth.post(
    env.NEXT_PUBLIC_API_REQUEST_URL,
    '/analysis/vehicle/change-answer',
    { body: params },
  );
};
