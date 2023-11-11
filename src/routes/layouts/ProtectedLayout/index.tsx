import { memo } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Navbar } from 'src/components'
import { RoutePaths } from 'src/routes/paths'
import { useAuthStore } from 'src/store/auth'

export const ProtectedLayout = memo(() => {
  const { pathname } = useLocation()
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

  if (!isLoggedIn) {
    return <Navigate to={RoutePaths.Auth.login({ navigateTo: pathname })} />
  }

  return (
    <main className="flex h-full flex-col md:flex-row">
      <img
        src="/images/bg-protected.jpg"
        className="absolute h-full w-full object-cover"
      />
      <Navbar />
      <div className="relative flex flex-1 flex-col overflow-x-auto px-4 py-7 md:px-8 md:py-16 xl:px-14">
        <Outlet />
      </div>
    </main>
  )
})
