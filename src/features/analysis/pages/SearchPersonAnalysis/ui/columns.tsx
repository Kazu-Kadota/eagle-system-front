import { ColumnDef } from '@tanstack/react-table'
import dayjs from 'dayjs'
import {
  analysisStatus,
  getAnalysisTypeString,
} from 'src/features/analysis/utils/mappers'
import { AnalysisStatus, PersonAnalysis, PersonRegionType } from 'src/models'

export const columns: ColumnDef<PersonAnalysis, unknown>[] = [
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
      <span
        className={
          props.getValue() === PersonRegionType.STATES ? 'text-brown' : ''
        }
      >
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
