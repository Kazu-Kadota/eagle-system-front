import { UserType } from 'src/models'

export function hasUserType(
  userType: UserType | undefined,
  ...allowedUserTypes: UserType[]
) {
  return userType && allowedUserTypes.includes(userType)
}
