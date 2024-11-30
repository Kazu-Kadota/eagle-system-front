import { ColumnDef } from '@tanstack/react-table'
import dayjs from 'dayjs'
import { TableLink } from 'src/components'
import {
  analysisStatus,
  getVehicleAnalysisType,
} from 'src/features/analysis/utils/mappers'
import { AnalysisStatus, VehicleAnalysis } from 'src/models'

export const columns: ColumnDef<VehicleAnalysis, string>[] = [
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
  { id: 'owner_name', accessorKey: 'owner_name', header: 'Nome' },
  {
    id: 'status',
    accessorFn: (row) => analysisStatus[row.status as AnalysisStatus],
    header: 'Status',
  },
  {
    id: 'plate',
    accessorFn: (row) => `${row.plate} - ${row.plate_state}`,
    header: 'Placa',
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
    id: 'vehicle_type',
    accessorFn: (row) => getVehicleAnalysisType(row),
    header: 'Tipo',
    meta: {
      className: 'max-w-24 pl-2',
    },
  },
  {
    id: 'created_at',
    accessorFn: (row) => dayjs(row.created_at as string).format('DD/MM/YYYY'),
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
]
