import { UserType } from 'src/models'
import { useCompanies } from '../..'
import { AccountHomeUI } from './ui'
import { useAuthStore } from 'src/store/auth'
import { hasUserType } from 'src/utils/userType'
import { useModal } from 'src/store/modal'
import { ChangePasswordModalContent } from '../ChangePassword'

export function AccountHomePage() {
  const modal = useModal()
  const { user } = useAuthStore()

  const { companiesSelectItems, isLoading: companiesLoading } = useCompanies({
    enabled: hasUserType(user?.user_type, UserType.ADMIN),
  })

  const onChangePassword = () => {
    modal.open({
      content: <ChangePasswordModalContent />,
      showCloseIcon: true,
      disableOverlayClose: true,
    })
  }

  return (
    <AccountHomeUI
      user={user}
      companiesLoading={companiesLoading}
      companiesSelectItems={companiesSelectItems}
      onChangePassword={onChangePassword}
    />
  )
}
