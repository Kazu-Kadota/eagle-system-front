import { ColumnDef } from '@tanstack/react-table'
import dayjs from 'dayjs'
import {
  AnalysisResponseHeader,
  AnalysisResponseTimer,
  AnalysisTableActions,
} from 'src/features/analysis/components'
import {
  analysisStatus,
  getAnalysisTypeString,
} from 'src/features/analysis/utils/mappers'
import {
  AnalysisStatus,
  AnalysisType,
  PersonAnalysis,
  PersonRegionType,
  UserType,
} from 'src/models'
import { hasUserType } from 'src/utils/userType'

const createPersonColumns = (userType: UserType) => {
  const columns: ColumnDef<PersonAnalysis, unknown>[] = [
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
        item={row.original}
        type={AnalysisType.PERSON}
      />
    ),
  })

  return columns
}

export const personTableColumns = createPersonColumns(UserType.CLIENT)
export const personTableColumnsAdminOperator = createPersonColumns(
  UserType.ADMIN,
)
