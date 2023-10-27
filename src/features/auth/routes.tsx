import { RouteObject } from 'react-router-dom'
import { AuthLayout } from './layouts/AuthLayout'
import { ForgotPasswordPage } from './pages/ForgotPassword'
import { LoginPage } from './pages/Login'
import { AuthRoutePaths } from './paths'

export const authRoutes: RouteObject[] = [
  {
    element: <AuthLayout />,
    children: [
      {
        path: AuthRoutePaths.LOGIN,
        element: <LoginPage />,
      },
      {
        path: AuthRoutePaths.FORGOT_PASSWORD,
        element: <ForgotPasswordPage />,
      },
    ],
  },
]
