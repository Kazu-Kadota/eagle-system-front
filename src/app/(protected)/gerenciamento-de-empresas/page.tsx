import { Box } from '@/components/Box';
import { Link } from '@/components/Link';
import { RoutePaths } from '@/constants/paths';

export default function ManageCompaniesPage() {
  return (
    <div className="grid gap-6">
      <Box
        title="Gerenciamento de empresas"
        className="flex flex-col items-start gap-1"
      >
        <Link
          href={RoutePaths.MANAGE_PRODUCTS}
          className="my-1 px-1 text-xl text-link"
        >
          Gerenciar produto
        </Link>
      </Box>
    </div>
  );
}
