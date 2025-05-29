import { getVehicleAnalysis } from '@/services/analysis/vehicle';
import { useQuery } from '@tanstack/react-query';

export function useVehicleAnalysis() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['vehicleAnalysis'],
    queryFn: getVehicleAnalysis,
  });

  return {
    vehicleAnalysis: data?.vehicles ?? [],
    isLoading,
    refetch,
  };
}
