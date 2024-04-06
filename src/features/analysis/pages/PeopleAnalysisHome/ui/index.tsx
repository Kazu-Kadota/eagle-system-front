import { ButtonProps, LoadingContainer } from 'src/components'
import { AnalysisTable } from 'src/features/analysis/components/AnalysisTable'
import { UserType } from 'src/models'
import { AnalysisType, PersonAnalysis } from 'src/models/analysis'
import { RoutePaths } from 'src/routes/paths'
import { hasUserType } from 'src/utils/userType'
import { personTableColumns, personTableColumnsAdminOperator } from './columns'

interface AnalysisHomeUIProps {
  userType: UserType
  isLoading: boolean
  personAnalysis: PersonAnalysis[]
}

const analysisTypeLabel = {
  [AnalysisType.PERSON]: 'de Pessoa',
  [AnalysisType.VEHICLE]: 'de Veículo',
  [AnalysisType.VEHICLE_PLATE_HISTORY]: 'de Veículo',
  [AnalysisType.SECOND_DRIVER]: 'de Veículo',
  [AnalysisType.COMBO]: 'Combo',
}

const analysisSearchRoute = {
  [AnalysisType.PERSON]: RoutePaths.Analysis.SEARCH_PEOPLE_ANALYSIS,
  [AnalysisType.VEHICLE]: RoutePaths.Analysis.SEARCH_VEHICLE_ANALYSIS,
  [AnalysisType.VEHICLE_PLATE_HISTORY]:
    RoutePaths.Analysis.SEARCH_VEHICLE_ANALYSIS,
  [AnalysisType.SECOND_DRIVER]: RoutePaths.Analysis.SEARCH_VEHICLE_ANALYSIS,
  [AnalysisType.COMBO]: RoutePaths.Analysis.SEARCH_PEOPLE_ANALYSIS,
}

function getTableActions(analysisType: AnalysisType, userType: UserType) {
  const label = analysisTypeLabel[analysisType]

  const actions: ButtonProps[] = [
    {
      children: `Consultar Análise ${label}`,
      theme: 'placeholder',
      size: 'xs',
      to: analysisSearchRoute[analysisType],
    },
  ]

  if (hasUserType(userType, UserType.ADMIN, UserType.CLIENT)) {
    actions.unshift({
      children: `Solicitar Análise ${label}`,
      theme: 'darkPurple',
      size: 'xs',
      to: RoutePaths.Analysis.requestAnalysis({ analysisType }),
    })
  }

  return actions
}

export function AnalysisHomeUI({
  isLoading,
  userType,
  personAnalysis,
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
    </div>
  )
}
