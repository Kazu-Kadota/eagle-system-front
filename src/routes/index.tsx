import { createBrowserRouter } from 'react-router-dom'
import { analysisProtectedRoutes } from 'src/features/analysis/routes'
import { authRoutes } from 'src/features/auth/routes'
import { commonProtectedRoutes } from 'src/features/common/routes'
import { ProtectedLayout } from 'src/routes/layouts/ProtectedLayout'

export const router = createBrowserRouter([
  ...authRoutes,
  {
    element: <ProtectedLayout />,
    children: [...commonProtectedRoutes, ...analysisProtectedRoutes],
  },
])
