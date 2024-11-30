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
  getAnalysisTypeColor,
  getAnalysisTypeString,
} from 'src/features/analysis/utils/mappers'
import {
  AnalysisStatus,
  AnalysisType,
  PersonAnalysis,
  UserType,
} from 'src/models'
import { hasUserType } from 'src/utils/userType'

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
