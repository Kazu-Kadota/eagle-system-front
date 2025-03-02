import { env } from '@/env';
import type { VehicleAnalysis } from '@/models';
import { requestAuth } from '@/utils/request';

interface VehicleAnalysisResponse {
  vehicles: VehicleAnalysis[];
}

interface VehicleAnalysisDetailResponse {
  vehicle: VehicleAnalysis;
}

interface VehicleAnalysisDetailQuery {
  vehicle_id: string;
  request_id: string;
}

export const getVehicleAnalysis = async () => {
  const { data } = await requestAuth.get<VehicleAnalysisResponse>(
    env.NEXT_PUBLIC_API_REQUEST_URL,
    '/analysis/vehicles',
  );

  return data;
};

export const getVehiclesDetailAnalysis = async ({
  vehicle_id,
  request_id,
}: VehicleAnalysisDetailQuery) => {
  const { data } = await requestAuth.get<VehicleAnalysisDetailResponse>(
    env.NEXT_PUBLIC_API_REQUEST_URL,
    `/analysis/vehicle/${vehicle_id}`,
    { query: { request_id } },
  );

  return data;
};
