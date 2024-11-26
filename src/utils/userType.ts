import { UserType } from 'src/models'

export function hasUserType(
  userType: UserType | undefined,
  ...allowedUserTypes: UserType[]
): boolean {
  return userType ? allowedUserTypes.includes(userType) : false
}
