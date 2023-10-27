import { memo } from 'react'
import { Outlet } from 'react-router-dom'

export const AuthLayout = memo(() => {
  return (
    <>
      <img
        src="/images/bg-auth.jpg"
        className="absolute h-full w-full object-cover object-bottom"
      />
      <div className="relative flex h-full w-full flex-col items-center px-5 pt-[12vh] sm:px-[6vw] md:items-start">
        <Outlet />
      </div>
    </>
  )
})
