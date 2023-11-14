import { RouteObject } from 'react-router-dom'
import { AuthLayout } from 'src/routes/layouts/AuthLayout'
import { AccountHomePage } from './pages/AccountHome'
import { ForgotPasswordPage } from './pages/ForgotPassword'
import { LoginPage } from './pages/Login'
import { RegisterCompanyPage } from './pages/RegisterCompany'
import { RegisterHomePage } from './pages/RegisterHome'
import { RegisterUserPage } from './pages/RegisterUser'
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

export const authProtectedRoutes: RouteObject[] = [
  {
    path: AuthRoutePaths.REGISTER_HOME,
    element: <RegisterHomePage />,
  },
  {
    path: AuthRoutePaths.REGISTER_USER,
    element: <RegisterUserPage />,
  },
  {
    path: AuthRoutePaths.REGISTER_COMPANY,
    element: <RegisterCompanyPage />,
  },
  {
    path: AuthRoutePaths.ACCOUNT_HOME,
    element: <AccountHomePage />,
  },
]
