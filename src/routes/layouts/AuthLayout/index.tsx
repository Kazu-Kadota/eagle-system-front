import { memo } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { LogoTriangle } from 'src/assets/icons'
import { RoutePaths } from 'src/routes/paths'
import { useAuthStore } from 'src/store/auth'

export const AuthLayout = memo(() => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

  if (isLoggedIn) {
    return <Navigate to={RoutePaths.Common.HOME} />
  }

  return (
    <>
      <img
        src="/images/bg-auth.jpg"
        className="absolute h-full w-full object-cover"
      />
      <LogoTriangle className="absolute right-0 hidden h-full lg:block" />

      <div className="relative flex h-full w-full flex-col items-center px-5 pt-[12vh] lg:items-start lg:px-12 xl:px-[8vw]">
        <div className="w-full max-w-xl">
          <Outlet />
          <p className="mt-6 text-center text-xs font-light text-light/60">
            Todos os direitos reservados - EAGLE SYSTEM © 2023
          </p>
        </div>
      </div>
    </>
  )
})
