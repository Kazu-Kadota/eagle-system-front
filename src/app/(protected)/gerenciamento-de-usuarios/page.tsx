import { Box } from '@/components/Box';
import { Link } from '@/components/Link';
import { RoutePaths } from '@/constants/paths';

export default function RegisterHomePage() {
  return (
    <div className="grid gap-6">
      <Box
        title="Cadastrar Usuários"
        className="flex flex-col items-start gap-1"
      >
        <Link
          href={RoutePaths.REGISTER_COMPANY}
          className="my-1 px-1 text-xl text-link"
        >
          Cadastrar Empresa
        </Link>
        <Link
          href={RoutePaths.REGISTER_USER}
          className="my-1 px-1 text-xl text-link"
        >
          Cadastrar Usuário
        </Link>
      </Box>

      <Box title="Gerenciar Usuários">
        <Link
          href={RoutePaths.MANAGE_OPERATORS}
          className="my-1 px-1 text-xl text-link"
        >
          Gerenciar Operadores
        </Link>
      </Box>
    </div>
  );
}
