import { env } from '@/env';
import type { VehicleAnalysis } from '@/models';
import { requestAuth } from '@/utils/request';
import { decodeBase64Worker } from '@/utils/workers';

interface VehicleAnalysisResponse {
  vehicles: VehicleAnalysis[];
}

interface VehicleAnalysisDetailResponse {
  vehicle: VehicleAnalysis;
}

type VehicleAnalysisDetailQuery = {
  vehicle_id: string;
  request_id: string;
};

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

  return {
    ...data,
    vehicle: {
      ...data.vehicle,
      analysis_info: data.vehicle.analysis_info
        ? await decodeBase64Worker(data.vehicle.analysis_info)
        : data.vehicle.analysis_info,
    },
  };
};

export const deleteVehicleAnalysis = async (
  params: VehicleAnalysisDetailQuery,
) => {
  await requestAuth.post(
    env.NEXT_PUBLIC_API_REQUEST_URL,
    '/analysis/vehicle/delete-waiting',
    { body: params },
  );
};
