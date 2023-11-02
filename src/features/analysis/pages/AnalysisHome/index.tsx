import { useAuthStore } from 'src/store/auth'
import { usePersonAnalysis, useVehicleAnalysis } from '../../hooks'
import { AnalysisHomeUI } from './ui'

export function AnalysisHomePage() {
  const userType = useAuthStore((state) => state.user.user_type)

  const { personAnalysis, isLoading: isLoadingPerson } = usePersonAnalysis()

  const { vehicleAnalysis, isLoading: isLoadingVehicle } = useVehicleAnalysis()

  return (
    <AnalysisHomeUI
      userType={userType}
      isLoading={isLoadingPerson || isLoadingVehicle}
      personAnalysis={personAnalysis}
      vehicleAnalysis={vehicleAnalysis}
    />
  )
}
