import { useAuthStore } from 'src/store/auth'
import { usePersonAnalysis } from '../../hooks'
import { AnalysisHomeUI } from './ui'

export function PeopleAnalysisHomePage() {
  const userType = useAuthStore((state) => state.user.user_type)

  const { personAnalysis, isLoading: isLoadingPerson } = usePersonAnalysis()

  return (
    <AnalysisHomeUI
      userType={userType}
      isLoading={isLoadingPerson}
      personAnalysis={personAnalysis}
    />
  )
}
