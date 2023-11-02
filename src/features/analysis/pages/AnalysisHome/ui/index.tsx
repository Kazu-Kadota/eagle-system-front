import { ButtonProps, LoadingContainer } from 'src/components'
import { AnalysisTable } from 'src/features/analysis/components/AnalysisTable'
import { UserType } from 'src/models'
import {
  AnalysisType,
  PersonAnalysis,
  VehicleAnalysis,
} from 'src/models/analysis'
import { RoutePaths } from 'src/routes/paths'
import { hasUserType } from 'src/utils/userType'
import {
  personTableColumns,
  personTableColumnsAdminOperator,
  vehicleTableColumns,
  vehicleTableColumnsAdminOperator,
} from './columns'

interface AnalysisHomeUIProps {
  userType: UserType
  isLoading: boolean
  personAnalysis: PersonAnalysis[]
  vehicleAnalysis: VehicleAnalysis[]
}

const analysisTypeLabel = {
  [AnalysisType.PERSON]: 'de Pessoa',
  [AnalysisType.VEHICLE]: 'de Veículo',
  [AnalysisType.VEHICLE_PLATE_HISTORY]: 'de Veículo',
  [AnalysisType.COMBO]: 'Combo',
}

function getTableActions(analysisType: AnalysisType, userType: UserType) {
  const label = analysisTypeLabel[analysisType]

  const actions: ButtonProps[] = [
    {
      children: `Consultar Análise ${label}`,
      theme: 'placeholder',
      size: 'xs',
      to: RoutePaths.Analysis.ANALYSIS_HOME,
    },
  ]

  if (hasUserType(userType, UserType.ADMIN, UserType.CLIENT)) {
    actions.push({
      children: `Solicitar Análise ${label}`,
      theme: 'primary',
      size: 'xs',
      to: RoutePaths.Analysis.ANALYSIS_HOME,
    })
  }

  return actions
}

export function AnalysisHomeUI({
  isLoading,
  userType,
  personAnalysis,
  vehicleAnalysis,
}: AnalysisHomeUIProps) {
  if (isLoading) {
    return <LoadingContainer />
  }

  return (
    <div className="flex flex-col gap-10 sm:gap-[3.4rem]">
      <AnalysisTable
        title="Pessoas"
        data={personAnalysis}
        columns={
          hasUserType(userType, UserType.ADMIN, UserType.OPERATOR)
            ? personTableColumnsAdminOperator
            : personTableColumns
        }
        actions={getTableActions(AnalysisType.PERSON, userType)}
      />

      <AnalysisTable
        title="Veículos"
        data={vehicleAnalysis}
        columns={
          hasUserType(userType, UserType.ADMIN, UserType.OPERATOR)
            ? vehicleTableColumnsAdminOperator
            : vehicleTableColumns
        }
        actions={getTableActions(AnalysisType.VEHICLE, userType)}
      />
    </div>
  )
}
