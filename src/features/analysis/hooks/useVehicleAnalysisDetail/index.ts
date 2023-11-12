import { useQuery } from '@tanstack/react-query'
import { VehicleAnalysis } from 'src/models'
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
    vehicle: data?.vehicle ?? ({} as VehicleAnalysis),
    isLoading,
    refetch,
  }
}
