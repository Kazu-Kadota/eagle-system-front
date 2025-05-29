import { EditIcon } from '@/assets/icons/EditIcon';
import { Link } from '@/components/Link';
import { RoutePaths } from '@/constants/paths';
import type { Company } from '@/models';

type Props = {
  company: Company;
};

export function CompaniesTableActions({ company }: Props) {
  return (
    <span className="flex flex-row items-center justify-center gap-4">
      <Link
        href={RoutePaths.productDetails(company.company_id)}
        title="Editar feature flags"
      >
        <EditIcon className="w-5 stroke-primary" />
      </Link>
    </span>
  );
}
