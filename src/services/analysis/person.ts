import { env } from '@/env';
import type { PersonAnalysis } from '@/models';
import { preparePersonDataFromApi } from '@/utils/analysis/mappers';
import { requestAuth } from '@/utils/request';

interface PersonAnalysisResponse {
  people: PersonAnalysis[];
}

interface PersonAnalysisDetailResponse {
  person: PersonAnalysis;
}

interface PersonAnalysisDetailQuery {
  person_id: string;
  request_id: string;
}

export const getPersonAnalysis = async () => {
  const { data } = await requestAuth.get<PersonAnalysisResponse>(
    env.NEXT_PUBLIC_API_REQUEST_URL,
    '/analysis/people',
  );

  return data;
};

export const getPersonDetailAnalysis = async ({
  person_id,
  request_id,
}: PersonAnalysisDetailQuery) => {
  const { data } = await requestAuth.get<PersonAnalysisDetailResponse>(
    env.NEXT_PUBLIC_API_REQUEST_URL,
    `/analysis/person/${person_id}`,
    { query: { request_id } },
  );

  return {
    ...data,
    person: await preparePersonDataFromApi(data.person),
  };
};
