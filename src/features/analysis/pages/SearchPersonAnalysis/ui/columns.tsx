import { ColumnDef } from '@tanstack/react-table'
import dayjs from 'dayjs'
import { TableLink } from 'src/components'
import {
  analysisStatus,
  getAnalysisTypeColor,
  getAnalysisTypeString,
} from 'src/features/analysis/utils/mappers'
import { AnalysisStatus, PersonAnalysis } from 'src/models'

export const columns: ColumnDef<PersonAnalysis, string>[] = [
  {
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
  { accessorKey: 'name', header: 'Nome' },
  {
    accessorKey: 'document',
    header: 'CPF',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (props) => analysisStatus[props.getValue() as AnalysisStatus],
  },
  {
    accessorKey: 'region_type',
    header: 'Tipo',
    cell: (props) => (
      <span className={getAnalysisTypeColor(props.row.original)}>
        {getAnalysisTypeString(props.row.original)}
      </span>
    ),
  },
  {
    accessorKey: 'combo_number',
    header: 'Combo',
    cell: (props) => (props.getValue() ? 'Sim' : 'Não'),
  },
  {
    accessorKey: 'created_at',
    header: 'Data',
    cell: (props) => dayjs(props.getValue() as string).format('DD/MM/YYYY'),
  },
  {
    accessorKey: 'company_name',
    header: 'Cliente Solicitante',
  },
]
