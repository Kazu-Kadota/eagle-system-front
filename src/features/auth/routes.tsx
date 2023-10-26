import { RouteObject } from 'react-router-dom'
import { LoginPage } from './pages/Login'
import { AuthRoutePaths } from './paths'

export const authRoutes: RouteObject[] = [
  {
    path: AuthRoutePaths.LOGIN,
    element: <LoginPage />,
  },
]
