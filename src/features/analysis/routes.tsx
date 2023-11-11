import { RouteObject } from 'react-router-dom'
import { AnalysisHomePage } from './pages/AnalysisHome'
import { AnalysisRoutePaths } from './paths'
import { RequestAnalysisPage } from './pages/RequestAnalysis'

export const analysisProtectedRoutes: RouteObject[] = [
  {
    path: AnalysisRoutePaths.ANALYSIS_HOME,
    element: <AnalysisHomePage />,
  },
  {
    path: AnalysisRoutePaths.requestAnalysis(),
    element: <RequestAnalysisPage />,
  },
]
