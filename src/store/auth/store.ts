import { AuthResponse, User } from 'src/models'
import { createPersist } from 'src/utils/zustand'

export interface AuthStore extends AuthResponse {
  setState: (state: Partial<AuthResponse>) => void
  clearState: () => void
}

const initialState: AuthResponse = {
  user: {} as User,
  jwtToken: '',
  expires_date: '',
}

export const useAuthStore = createPersist<AuthStore>(
  (set) => ({
    ...initialState,
    setState: (state) => set(state),
    clearState: () => set(initialState),
  }),
  { name: 'auth-store' },
)
