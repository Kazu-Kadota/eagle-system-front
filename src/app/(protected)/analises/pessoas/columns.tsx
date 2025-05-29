import { AnalysisResponseTimer } from '@/components/AnalysisResponseTimer';
import { getInitialStateAndFormat } from '@/components/AnalysisResponseTimer/utils';
import { AnalysisTableActions } from '@/components/AnalysisTableActions';
import { TableLink } from '@/components/TableLink';
import { customDayJs } from '@/config/dayjs';
import {
  AnalysisType,
  UserType,
  type AnalysisStatus,
  type PersonAnalysis,
} from '@/models';
import {
  analysisStatus,
  getAnalysisTypeColor,
  getAnalysisTypeString,
} from '@/utils/analysis/mappers';
import { hasUserType } from '@/utils/userType';
import type { ColumnDef } from '@tanstack/react-table';

const createPersonColumns = (userType: UserType) => {
  const columns: ColumnDef<PersonAnalysis, string>[] = [
    {
      id: 'request_id',
      accessorKey: 'request_id',
      header: 'ID da Solicitação',
      cell: (props) => (
        <TableLink
          text={props.getValue()}
          placeholder="Copiar ID da Solicitação"
          successMsg="ID da solicitação copiado com sucesso!"
        />
      ),
    },
    { id: 'name', accessorKey: 'name', header: 'Nome' },
    {
      id: 'document',
      accessorKey: 'document',
      header: 'CPF',
    },
    {
      id: 'status',
      accessorFn: (row) => analysisStatus[row.status as AnalysisStatus],
      header: 'Status',
    },
    {
      id: 'region_type',
      accessorFn: (row) => getAnalysisTypeString(row),
      header: 'Tipo',
      cell: (props) => (
        <span className={getAnalysisTypeColor(props.row.original)}>
          {props.getValue()}
        </span>
      ),
    },
    {
      id: 'combo_number',
      accessorFn: (row) => (row.combo_number ? 'Sim' : 'Não'),
      header: 'Combo',
      meta: {
        className: 'max-w-16 pl-2',
      },
    },
    {
      id: 'created_at',
      accessorFn: (row) =>
        customDayJs(row.created_at as string).format('DD/MM/YYYY'),
      header: 'Data',
      meta: {
        className: 'max-w-24 pl-2',
      },
    },
    {
      id: 'company_name',
      accessorKey: 'company_name',
      header: 'Cliente Solicitante',
    },
  ];

  if (hasUserType(userType, UserType.ADMIN, UserType.OPERATOR)) {
    columns.push({
      id: 'response-time',
      accessorFn: (row) => getInitialStateAndFormat(row),
      header: 'Tempo de resposta',
      cell: ({ row }) => <AnalysisResponseTimer analysis={row.original} />,
      meta: {
        className: 'max-w-24 pl-2',
      },
    });
  }

  columns.push({
    id: 'actions',
    enableSorting: false,
    header: 'Ações',
    cell: ({ row }) => (
      <AnalysisTableActions
        id={row.original.request_id}
        item={row.original}
        type={AnalysisType.PERSON}
      />
    ),
    meta: {
      className: 'max-w-20 pr-3',
    },
  });

  return columns;
};

export const personTableColumns = createPersonColumns(UserType.CLIENT);
export const personTableColumnsAdminOperator = createPersonColumns(
  UserType.ADMIN,
);
