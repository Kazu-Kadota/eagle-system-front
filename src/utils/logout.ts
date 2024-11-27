import { queryClient } from 'src/config/query'
import { useAuthStore } from 'src/store/auth'

export function clearStorage() {
  useAuthStore.getState().clearState()
  queryClient.clear()
}
