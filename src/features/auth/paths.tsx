import { LoginParams } from './pages/Login'
import qs from 'query-string'

export const AuthRoutePaths = {
  FORGOT_PASSWORD: '/esqueci-minha-senha',
  RESET_PASSWORD: '/redefinir-senha',
  REGISTER_HOME: '/gerenciamento-de-usuarios',
  REGISTER_USER: '/gerenciamento-de-usuarios/cadastrar-usuario',
  REGISTER_COMPANY: '/gerenciamento-de-usuarios/cadastrar-empresa',
  ACCOUNT_HOME: '/minha-conta',
  login: (params?: LoginParams) =>
    qs.stringifyUrl({ url: '/login', query: params }),
}
