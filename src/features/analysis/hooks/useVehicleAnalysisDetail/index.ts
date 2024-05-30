import { useQuery, useQueryClient } from '@tanstack/react-query'
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
  const queryKey = ['analysis', 'vehicle', { requestId: id, vehicleId }]

  const client = useQueryClient()

  const { data, isLoading, refetch } = useQuery({
    queryKey,
    queryFn: () =>
      getVehiclesDetailAnalysis({ request_id: id, vehicle_id: vehicleId }),
  })

  const updateVehicleAnalysis = (vehicle: VehicleAnalysis) =>
    client.setQueryData(queryKey, { ...data, vehicle })

  return {
    vehicle: data?.vehicle ?? ({} as VehicleAnalysis),
    isLoading,
    refetch,
    updateVehicleAnalysis,
  }
}
