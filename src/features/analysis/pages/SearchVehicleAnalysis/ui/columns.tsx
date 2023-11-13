import { ColumnDef } from '@tanstack/react-table'
import dayjs from 'dayjs'
import {
  analysisStatus,
  getVehicleAnalysisType,
} from 'src/features/analysis/utils/mappers'
import { AnalysisStatus, VehicleAnalysis } from 'src/models'

export const columns: ColumnDef<VehicleAnalysis, unknown>[] = [
  { accessorKey: 'owner_name', header: 'Nome' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (props) => analysisStatus[props.getValue() as AnalysisStatus],
  },
  {
    accessorKey: 'plate',
    header: 'Placa',
    cell: (props) =>
      `${props.row.original.plate} - ${props.row.original.plate_state}`,
  },
  {
    accessorKey: 'combo_number',
    header: 'Combo',
    cell: (props) => (props.getValue() ? 'Sim' : 'Não'),
  },
  {
    accessorKey: 'vehicle_type',
    header: 'Tipo',
    cell: (props) => getVehicleAnalysisType(props.cell.row.original),
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
