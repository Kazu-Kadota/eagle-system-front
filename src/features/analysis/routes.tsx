import { RouteObject } from 'react-router-dom'
import { AnalysisHomePage } from './pages/AnalysisHome'
import { AnalysisRoutePaths } from './paths'

export const analysisProtectedRoutes: RouteObject[] = [
  {
    path: AnalysisRoutePaths.ANALYSIS_HOME,
    element: <AnalysisHomePage />,
  },
]
