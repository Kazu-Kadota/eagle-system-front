import { memo } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Navbar } from 'src/components'
import { RoutePaths } from 'src/routes/paths'
import { useAuthStore } from 'src/store/auth'

export const ProtectedLayout = memo(() => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

  if (!isLoggedIn) {
    return (
      <Navigate
        to={RoutePaths.Auth.login({ navigateTo: window.location.pathname })}
      />
    )
  }

  return (
    <main className="flex h-full flex-col md:flex-row">
      <img
        src="/images/bg-protected.jpg"
        className="fixed h-full w-full object-cover"
      />
      <Navbar />
      <div className="relative flex flex-1 flex-col overflow-x-auto px-4 py-7 md:px-8 md:py-14 xl:px-14">
        <Outlet />
      </div>
    </main>
  )
})
