import type { ColumnDef } from '@tanstack/react-table';

import type { User } from '@/models';
import { TableLink } from '@/components/TableLink';
import { OperatorTableActions } from '@/app/(protected)/gerenciamento-de-usuarios/operadores/tableActions';

type Actions = {
  onDelete: (user: User) => void;
};

export const createOperatorColumns = (
  actions: Actions,
): ColumnDef<User, string>[] => [
  {
    id: 'user_id',
    accessorKey: 'user_id',
    header: 'ID',
    cell: (props) => (
      <TableLink
        text={props.getValue()}
        placeholder="Copiar ID do operador"
        successMsg="ID do operador copiado com sucesso!"
      />
    ),
    meta: {
      className: 'max-w-20',
    },
  },
  {
    id: 'user_first_name',
    accessorKey: 'user_first_name',
    header: 'Nome',
    cell: ({ row }) =>
      `${row.original.user_first_name} ${row.original.user_last_name}`,
  },
  {
    id: 'email',
    accessorKey: 'email',
    header: 'E-mail',
  },
  {
    id: 'company_name',
    accessorKey: 'company_name',
    header: 'Empresa',
  },
  {
    id: 'actions',
    enableSorting: false,
    header: 'Ações',
    cell: ({ row }) => (
      <OperatorTableActions
        user={row.original}
        onDeleteAction={actions.onDelete}
      />
    ),
    meta: {
      className: 'max-w-20 ',
    },
  },
];
