import { useQuery } from '@tanstack/react-query'
import { getVehiclesDetailAnalysis } from '../../services/vehicle'

interface UseVehicleAnalysisDetailProps {
  id: string
  vehicleId: string
}

export const useVehicleAnalysisDetail = ({
  id,
  vehicleId,
}: UseVehicleAnalysisDetailProps) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['analysis', 'vehicle', { requestId: id, vehicleId }],
    queryFn: () =>
      getVehiclesDetailAnalysis({ request_id: id, vehicle_id: vehicleId }),
  })

  return {
    person: data?.vehicle,
    isLoading,
    refetch,
  }
}
