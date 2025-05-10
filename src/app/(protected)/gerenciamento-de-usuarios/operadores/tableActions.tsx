import { EditIcon } from '@/assets/icons/EditIcon';
import { TrashIcon } from '@/assets/icons/TrashIcon';
import { Clickable } from '@/components/Clickable';
import { Link } from '@/components/Link';
import { RoutePaths } from '@/constants/paths';
import type { User } from '@/models';

type Props = {
  user: User;
  onDeleteAction: (user: User) => void;
};

export function OperatorTableActions({ user, onDeleteAction }: Props) {
  return (
    <span className="flex flex-row items-center justify-center gap-4">
      <Clickable onClick={() => onDeleteAction(user)} title="Excluir">
        <TrashIcon className="w-[1.16rem] stroke-primary" />
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
