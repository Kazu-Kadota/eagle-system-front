import { RouteObject } from 'react-router-dom'
import { AnalysisHomePage } from './pages/AnalysisHome'
import { RequestAnalysisPage } from './pages/RequestAnalysis'
import { AnalysisRoutePaths } from './paths'
import { PersonAnalysisAnswerPage } from './pages/PersonAnalysisAnwser'

export const analysisProtectedRoutes: RouteObject[] = [
  {
    path: AnalysisRoutePaths.ANALYSIS_HOME,
    element: <AnalysisHomePage />,
  },
  {
    path: AnalysisRoutePaths.requestAnalysis(),
    element: <RequestAnalysisPage />,
  },
  {
    path: AnalysisRoutePaths.peopleAnalysisDetail(),
    element: <PersonAnalysisAnswerPage />,
  },
]
