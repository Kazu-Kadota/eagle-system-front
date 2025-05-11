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
    accessorFn: (item) => `${item.user_first_name} ${item.user_last_name}`,
    header: 'Nome',
  },
  {
    id: 'email',
    accessorKey: 'email',
    header: 'E-mail',
  },
  {
    id: 'companiesAccess',
    accessorFn: (item) => item.companiesAccess?.companies?.join(',') ?? '-',
    header: 'Empresas',
    cell: (row) =>
      row
        .getValue()
        .split(',')
        .map((item) => (
          <span key={item} className="block">
            {item}
          </span>
        )),
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
