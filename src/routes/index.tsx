import { createBrowserRouter } from 'react-router-dom'
import { ProtectedLayout } from 'src/routes/layouts/ProtectedLayout'
import { authRoutes } from 'src/features/auth/routes'
import { commonProtectedRoutes } from 'src/features/common/routes'

export const router = createBrowserRouter([
  ...authRoutes,
  {
    element: <ProtectedLayout />,
    children: commonProtectedRoutes,
  },
])
