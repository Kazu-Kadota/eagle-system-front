import type { VehicleAnalysis } from '@/models';
import { getVehiclesDetailAnalysis } from '@/services/analysis/vehicle';
import { useQuery, useQueryClient } from '@tanstack/react-query';

interface UseVehicleAnalysisDetailProps {
  id: string;
  vehicleId: string;
}

export const useVehicleAnalysisDetail = ({
  id,
  vehicleId,
}: UseVehicleAnalysisDetailProps) => {
  const queryKey = ['analysis', 'vehicle', { requestId: id, vehicleId }];

  const client = useQueryClient();

  const { data, isLoading, refetch } = useQuery({
    queryKey,
    queryFn: () =>
      getVehiclesDetailAnalysis({ request_id: id, vehicle_id: vehicleId }),
  });

  const updateVehicleAnalysis = (vehicle: VehicleAnalysis) =>
    client.setQueryData(queryKey, { ...data, vehicle });

  return {
    vehicle: data?.vehicle ?? ({} as VehicleAnalysis),
    isLoading,
    refetch,
    updateVehicleAnalysis,
  };
};
