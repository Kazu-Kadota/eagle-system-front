import { memo } from 'react'
import { Outlet } from 'react-router-dom'

export const AuthLayout = memo(() => {
  return (
    <>
      <img
        src="/images/bg-auth.jpg"
        className="absolute h-full w-full object-cover object-bottom"
      />
      <div className="relative flex h-full w-full flex-col items-center px-5 pt-[12vh] sm:px-[8vw] md:items-start">
        <div className="w-full max-w-xl">
          <Outlet />
          <p className="text-light/60 mt-6 text-center text-xs font-light">
            Todos os direitos reservados - EAGLE SYSTEM © 2023
          </p>
        </div>
      </div>
    </>
  )
})
