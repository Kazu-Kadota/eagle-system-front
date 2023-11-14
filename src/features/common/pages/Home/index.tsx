import { useAuthStore } from 'src/store/auth'
import { HomeUI } from './ui'

export function HomePage() {
  const { user } = useAuthStore()

  return <HomeUI userType={user.user_type} />
}
