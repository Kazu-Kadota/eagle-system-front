import { AuthResponse, User } from 'src/models'
import { createPersist } from 'src/utils/zustand'

interface AuthState extends AuthResponse {
  isLoggedIn: boolean
}

export interface AuthStore extends AuthState {
  setState: (state: Partial<AuthResponse>) => void
  clearState: () => void
}

const initialState: AuthState = {
  user: {} as User,
  isLoggedIn: false,
  jwtToken: '',
  expires_date: '',
}

export const useAuthStore = createPersist<AuthStore>(
  (set) => ({
    ...initialState,
    setState: (state) => set({ ...state, isLoggedIn: !!state.jwtToken }),
    clearState: () => set(initialState),
  }),
  { name: 'auth-store' },
)
