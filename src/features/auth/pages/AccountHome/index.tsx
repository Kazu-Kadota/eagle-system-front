import { UserType } from 'src/models'
import { useCompanies } from '../..'
import { AccountHomeUI } from './ui'
import { useAuthStore } from 'src/store/auth'
import { hasUserType } from 'src/utils/userType'

export function AccountHomePage() {
  const { user } = useAuthStore()

  const { companiesSelectItems, isLoading: companiesLoading } = useCompanies({
    enabled: hasUserType(user?.user_type, UserType.ADMIN),
  })

  const onChangePassword = () => {}

  return (
    <AccountHomeUI
      user={user}
      companiesLoading={companiesLoading}
      companiesSelectItems={companiesSelectItems}
      onChangePassword={onChangePassword}
    />
  )
}
