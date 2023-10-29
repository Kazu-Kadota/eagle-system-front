import { memo } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { RoutePaths } from 'src/routes/paths'
import { useAuthStore } from 'src/store/auth'

export const ProtectedLayout = memo(() => {
  const { pathname } = useLocation()
  const jwtToken = useAuthStore((state) => state.jwtToken)

  if (!jwtToken) {
    return <Navigate to={RoutePaths.Auth.login({ navigateTo: pathname })} />
  }

  return <Outlet />
})
