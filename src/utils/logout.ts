import { useAuthStore } from 'src/store/auth'

export function clearStorage() {
  useAuthStore.getState().clearState()
}
