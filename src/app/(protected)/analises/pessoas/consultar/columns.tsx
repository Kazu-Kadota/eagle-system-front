import { TableLink } from '@/components/TableLink';
import { customDayJs } from '@/config/dayjs';
import { AnalysisStatus, type PersonAnalysis } from '@/models';
import {
  analysisStatus,
  getAnalysisTypeColor,
  getAnalysisTypeString,
} from '@/utils/analysis/mappers';
import type { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<PersonAnalysis, string>[] = [
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
