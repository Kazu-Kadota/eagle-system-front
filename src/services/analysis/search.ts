import { env } from '@/env';
import type { PersonAnalysis, VehicleAnalysis } from '@/models/analysis';
import { requestAuth } from '@/utils/request';

type SearchPersonQuery = {
  document: string;
  company_name?: string;
};

type SearchVehicleQuery = {
  plate: string;
  plate_state: string;
  company_name?: string;
};

interface SearchAnalysisPersonResponse {
  message: string;
  data: PersonAnalysis[];
}

interface SearchAnalysisVehicleResponse {
  message: string;
  data: VehicleAnalysis[];
}

export const searchPersonAnalysis = async (query: SearchPersonQuery) => {
  const { data } = await requestAuth.get<SearchAnalysisPersonResponse>(
    env.NEXT_PUBLIC_API_REQUEST_URL,
    '/person',
    { query },
  );

  return data;
};

export const searchVehicleAnalysis = async (query: SearchVehicleQuery) => {
  const { data } = await requestAuth.get<SearchAnalysisVehicleResponse>(
    env.NEXT_PUBLIC_API_REQUEST_URL,
    '/vehicle',
    { query },
  );

  return data;
};
