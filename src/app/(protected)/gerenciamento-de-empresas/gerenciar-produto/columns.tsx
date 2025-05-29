import type { ColumnDef } from '@tanstack/react-table';

import { CompaniesTableActions } from '@/app/(protected)/gerenciamento-de-empresas/gerenciar-produto/tableActions';
import { TableLink } from '@/components/TableLink';
import type { Company } from '@/models';

export const createCompaniesColumns = (): ColumnDef<Company, string>[] => [
  {
    id: 'company_id',
    accessorKey: 'company_id',
    header: 'ID',
    cell: (props) => (
      <TableLink
        text={props.getValue()}
        placeholder="Copiar ID da empresa"
        successMsg="ID da empresa copiado com sucesso!"
      />
    ),
    meta: {
      className: 'max-w-20',
    },
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    id: 'feature_flag',
    accessorFn: (item) =>
      item.feature_flag
        ?.filter((flag) => flag.enabled)
        ?.map((flag) => flag.label)
        ?.join(',') ?? '-',
    header: 'Produtos',
    cell: (row) => (
      <span className="flex flex-col items-center justify-center gap-2 py-2">
        {row
          .getValue()
          .split(',')
          .map((item) => (
            <span
              key={item}
              className="border-b-[0.5px] border-line-light px-2 pb-0.5 text-[0.7rem]"
            >
              {item}
            </span>
          ))}
      </span>
    ),
  },
  {
    id: 'actions',
    enableSorting: false,
    header: 'Ações',
    cell: ({ row }) => (
      <CompaniesTableActions
        key={row.original.company_id}
        company={row.original}
      />
    ),
    meta: {
      className: 'max-w-7',
    },
  },
];
