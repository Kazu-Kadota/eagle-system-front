import { memo } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Navbar } from 'src/components'
import { RoutePaths } from 'src/routes/paths'
import { useAuthStore } from 'src/store/auth'

export const ProtectedLayout = memo(() => {
  const { pathname } = useLocation()
  const jwtToken = useAuthStore((state) => state.jwtToken)

  if (!jwtToken) {
    return <Navigate to={RoutePaths.Auth.login({ navigateTo: pathname })} />
  }

  return (
    <main className="flex flex-col md:flex-row">
      <img
        src="/images/bg-protected.jpg"
        className="absolute h-full w-full object-cover"
      />
      <Navbar />
      <div className="relative flex-1 px-5 py-7 md:px-8 md:py-16 lg:px-12 xl:px-16">
        <Outlet />
      </div>
    </main>
  )
})
