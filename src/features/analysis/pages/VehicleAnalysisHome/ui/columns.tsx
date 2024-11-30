import { ColumnDef } from '@tanstack/react-table'
import dayjs from 'dayjs'
import { TableLink } from 'src/components'
import {
  AnalysisResponseHeader,
  AnalysisResponseTimer,
  AnalysisTableActions,
} from 'src/features/analysis/components'
import {
  analysisStatus,
  getVehicleAnalysisType,
} from 'src/features/analysis/utils/mappers'
import {
  AnalysisStatus,
  AnalysisType,
  UserType,
  VehicleAnalysis,
} from 'src/models'
import { hasUserType } from 'src/utils/userType'

const createVehicleColumns = (userType: UserType) => {
  const columns: ColumnDef<VehicleAnalysis, string>[] = [
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
    },
    {
      id: 'vehicle_type',
      accessorFn: (row) => getVehicleAnalysisType(row),
      header: 'Tipo',
    },
    {
      id: 'created_at',
      accessorFn: (row) => dayjs(row.created_at as string).format('DD/MM/YYYY'),
      header: 'Data',
    },
    {
      id: 'company_name',
      accessorKey: 'company_name',
      header: 'Cliente Solicitante',
    },
  ]

  if (hasUserType(userType, UserType.ADMIN, UserType.OPERATOR)) {
    columns.push({
      id: 'response-time',
      header: AnalysisResponseHeader,
      cell: ({ row }) => <AnalysisResponseTimer analysis={row.original} />,
    })
  }

  columns.push({
    id: 'actions',
    header: 'Ações',
    cell: ({ row }) => (
      <AnalysisTableActions
        id={row.original.request_id}
        item={row.original as never}
        type={AnalysisType.VEHICLE}
      />
    ),
  })

  return columns
}

export const vehicleTableColumns = createVehicleColumns(UserType.CLIENT)
export const vehicleTableColumnsAdminOperator = createVehicleColumns(
  UserType.ADMIN,
)
