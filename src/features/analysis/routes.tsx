import { RouteObject } from 'react-router-dom'
import { AnalysisHomePage } from './pages/AnalysisHome'
import { PersonAnalysisAnswerPage } from './pages/PersonAnalysisAnwser'
import { RequestAnalysisPage } from './pages/RequestAnalysis'
import { VehicleAnalysisAnswerPage } from './pages/VehicleAnalysisAnwser'
import { AnalysisRoutePaths } from './paths'
import { SearchPersonAnalysisPage } from './pages/SearchPersonAnalysis'

export const analysisProtectedRoutes: RouteObject[] = [
  {
    path: AnalysisRoutePaths.ANALYSIS_HOME,
    element: <AnalysisHomePage />,
  },
  {
    path: AnalysisRoutePaths.SEARCH_PEOPLE_ANALYSIS,
    element: <SearchPersonAnalysisPage />,
  },
  {
    path: AnalysisRoutePaths.requestAnalysis(),
    element: <RequestAnalysisPage />,
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
