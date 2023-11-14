import { memo } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserType } from 'src/models'
import { RoutePaths } from 'src/routes/paths'
import { useAuthStore } from 'src/store/auth'
import { hasUserType } from 'src/utils/userType'

interface AccessGuardLayoutProps {
  userTypes: UserType[]
}

export const AccessGuardLayout = memo(
  ({ userTypes }: AccessGuardLayoutProps) => {
    const userType = useAuthStore((state) => state.user.user_type)

    if (!hasUserType(userType, ...userTypes)) {
      return <Navigate to={RoutePaths.Common.ACCESS_DENIED} />
    }

    return <Outlet />
  },
)
