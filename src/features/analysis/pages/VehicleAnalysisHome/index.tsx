import { useAuthStore } from 'src/store/auth'
import { useVehicleAnalysis } from '../../hooks'
import { AnalysisHomeUI } from './ui'

export function VehicleAnalysisHomePage() {
  const userType = useAuthStore((state) => state.user.user_type)

  const { vehicleAnalysis, isLoading: isLoadingVehicle } = useVehicleAnalysis()

  return (
    <AnalysisHomeUI
      userType={userType}
      isLoading={isLoadingVehicle}
      vehicleAnalysis={vehicleAnalysis}
    />
  )
}
