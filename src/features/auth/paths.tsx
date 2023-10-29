import { LoginParams } from './pages/Login'
import qs from 'query-string'

export const AuthRoutePaths = {
  FORGOT_PASSWORD: '/esqueci-minha-senha',
  RESET_PASSWORD: '/redefinir-senha',
  login: (params?: LoginParams) =>
    qs.stringifyUrl({ url: '/login', query: params }),
}
