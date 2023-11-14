import { RouteObject } from 'react-router-dom'
import { UserType } from 'src/models'
import { AccessGuardLayout } from 'src/routes/layouts/AccessGuardLayout'
import { AnalysisHomePage } from './pages/AnalysisHome'
import { PersonAnalysisAnswerPage } from './pages/PersonAnalysisAnwser'
import { RequestAnalysisPage } from './pages/RequestAnalysis'
import { SearchPersonAnalysisPage } from './pages/SearchPersonAnalysis'
import { SearchVehicleAnalysisPage } from './pages/SearchVehicleAnalysis'
import { VehicleAnalysisAnswerPage } from './pages/VehicleAnalysisAnwser'
import { AnalysisRoutePaths } from './paths'

export const analysisProtectedRoutes: RouteObject[] = [
  {
    element: (
      <AccessGuardLayout userTypes={[UserType.ADMIN, UserType.CLIENT]} />
    ),
    children: [
      {
        path: AnalysisRoutePaths.requestAnalysis(),
        element: <RequestAnalysisPage />,
      },
    ],
  },
  {
    path: AnalysisRoutePaths.ANALYSIS_HOME,
    element: <AnalysisHomePage />,
  },
  {
    path: AnalysisRoutePaths.SEARCH_PEOPLE_ANALYSIS,
    element: <SearchPersonAnalysisPage />,
  },
  {
    path: AnalysisRoutePaths.SEARCH_VEHICLE_ANALYSIS,
    element: <SearchVehicleAnalysisPage />,
  },
  {
    path: AnalysisRoutePaths.peopleAnalysisDetail(),
    element: <PersonAnalysisAnswerPage />,
  },
  {
    path: AnalysisRoutePaths.vehicleAnalysisDetail(),
    element: <VehicleAnalysisAnswerPage />,
  },
]
