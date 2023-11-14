import { RouteObject } from 'react-router-dom'
import { AccessDeniedPage } from './pages/AccessDenied'
import { HomePage } from './pages/Home'
import { CommonRoutePaths } from './paths'

export const commonProtectedRoutes: RouteObject[] = [
  {
    path: CommonRoutePaths.HOME,
    element: <HomePage />,
  },
  {
    path: CommonRoutePaths.ACCESS_DENIED,
    element: <AccessDeniedPage />,
  },
]
