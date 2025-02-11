import { createBrowserRouter } from 'react-router-dom'
import { analysisProtectedRoutes } from 'src/features/analysis/routes'
import { authProtectedRoutes, authRoutes } from 'src/features/auth/routes'
import { commonProtectedRoutes } from 'src/features/common/routes'
import { reportProtectedRoutes } from 'src/features/report/routes'
import { ProtectedLayout } from 'src/routes/layouts/ProtectedLayout'

export const router = createBrowserRouter([
  ...authRoutes,
  {
    element: <ProtectedLayout />,
    children: [
      ...commonProtectedRoutes,
      ...analysisProtectedRoutes,
      ...authProtectedRoutes,
      ...reportProtectedRoutes,
    ],
  },
])
