import { UserType } from 'src/models'

export function hasUserType(
  userType: UserType,
  ...allowedUserTypes: UserType[]
) {
  return allowedUserTypes.includes(userType)
}
