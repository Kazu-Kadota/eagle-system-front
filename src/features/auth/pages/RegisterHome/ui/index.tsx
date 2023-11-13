import { Box, Link } from 'src/components'
import { RoutePaths } from 'src/routes/paths'

export function RegisterHomeUI() {
  return (
    <Box title="Cadastrar Usuários" className="flex flex-col items-start gap-1">
      <Link to={RoutePaths.Common.HOME} className="my-1 px-1 text-xl text-link">
        Cadastrar Empresa
      </Link>
      <Link
        to={RoutePaths.Auth.REGISTER_USER}
        className="my-1 px-1 text-xl text-link"
      >
        Cadastrar Usuário
      </Link>
    </Box>
  )
}
