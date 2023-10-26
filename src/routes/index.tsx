import { createBrowserRouter } from 'react-router-dom'
import { authRoutes } from 'src/features/auth/routes'
import { commonRoutes } from 'src/features/common/routes'

export const router = createBrowserRouter([...commonRoutes, ...authRoutes])
