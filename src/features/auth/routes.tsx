import { RouteObject } from 'react-router-dom'
import { AuthLayout } from 'src/routes/layouts/AuthLayout'
import { ForgotPasswordPage } from './pages/ForgotPassword'
import { LoginPage } from './pages/Login'
import { ResetPasswordPage } from './pages/ResetPassword'
import { AuthRoutePaths } from './paths'

export const authRoutes: RouteObject[] = [
  {
    element: <AuthLayout />,
    children: [
      {
        path: AuthRoutePaths.login(),
        element: <LoginPage />,
      },
      {
        path: AuthRoutePaths.FORGOT_PASSWORD,
        element: <ForgotPasswordPage />,
      },
      {
        path: AuthRoutePaths.RESET_PASSWORD,
        element: <ResetPasswordPage />,
      },
    ],
  },
]
