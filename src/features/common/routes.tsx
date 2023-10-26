import { RouteObject } from 'react-router-dom'
import { HomePage } from './pages/Home'
import { CommonRoutePaths } from './paths'

export const commonRoutes: RouteObject[] = [
  {
    path: CommonRoutePaths.HOME,
    element: <HomePage />,
  },
]
