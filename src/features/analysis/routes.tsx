import { RouteObject } from 'react-router-dom'
import { UserType } from 'src/models'
import { AccessGuardLayout } from 'src/routes/layouts/AccessGuardLayout'
import { PeopleAnalysisHomePage } from './pages/PeopleAnalysisHome'
import { PersonAnalysisAnswerPage } from './pages/PersonAnalysisAnwser'
import { RequestAnalysisPage } from './pages/RequestAnalysis'
import { SearchPersonAnalysisPage } from './pages/SearchPersonAnalysis'
import { SearchVehicleAnalysisPage } from './pages/SearchVehicleAnalysis'
import { VehicleAnalysisAnswerPage } from './pages/VehicleAnalysisAnwser'
import { VehicleAnalysisHomePage } from './pages/VehicleAnalysisHome'
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
    path: AnalysisRoutePaths.PEOPLE_ANALYSIS_HOME,
    element: <PeopleAnalysisHomePage />,
  },
  {
    path: AnalysisRoutePaths.VEHICLE_ANALYSIS_HOME,
    element: <VehicleAnalysisHomePage />,
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
