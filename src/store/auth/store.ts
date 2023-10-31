import { AuthResponse, User } from 'src/models'
import { createPersist } from 'src/utils/zustand'

export interface AuthStore extends AuthResponse {
  isLoggedIn: boolean
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
    isLoggedIn: false,
    setState: (state) => set({ ...state, isLoggedIn: !!state.jwtToken }),
    clearState: () => set(initialState),
  }),
  { name: 'auth-store' },
)
