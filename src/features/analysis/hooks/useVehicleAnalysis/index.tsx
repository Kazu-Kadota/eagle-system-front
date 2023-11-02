import { useQuery } from '@tanstack/react-query'
import { getVehicleAnalysis } from 'src/features/analysis/services/vehicle'

export function useVehicleAnalysis() {
  const { data, isLoading } = useQuery({
    queryKey: ['vehicleAnalysis'],
    queryFn: getVehicleAnalysis,
  })

  return {
    vehicleAnalysis: data?.vehicles ?? [],
    isLoading,
  }
}
