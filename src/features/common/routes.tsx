import { RouteObject } from 'react-router-dom'
import { HomePage } from './pages/Home'
import { CommonRoutePaths } from './paths'

export const commonProtectedRoutes: RouteObject[] = [
  {
    path: CommonRoutePaths.HOME,
    element: <HomePage />,
  },
]
