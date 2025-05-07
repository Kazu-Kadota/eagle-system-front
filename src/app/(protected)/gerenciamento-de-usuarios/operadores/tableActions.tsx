import { EditIcon } from '@/assets/icons/EditIcon';
import { TrashIcon } from '@/assets/icons/TrashIcon';
import { Clickable } from '@/components/Clickable';
import { Link } from '@/components/Link';
import { RoutePaths } from '@/constants/paths';
import type { User } from '@/models';

type Props = {
  user: User;
};

export function OperatorTableActions({ user }: Props) {
  const handleDelete = () => {};

  return (
    <span className="flex flex-row items-center justify-center gap-4">
      <Clickable onClick={handleDelete} title="Excluir">
        <TrashIcon className="w-5 stroke-primary" />
      </Clickable>

      <Link
        href={RoutePaths.operatorDetail(user.user_id)}
        target="_blank"
        title="Atribuir empresas"
      >
        <EditIcon className="w-5 stroke-primary" />
      </Link>
    </span>
  );
}
