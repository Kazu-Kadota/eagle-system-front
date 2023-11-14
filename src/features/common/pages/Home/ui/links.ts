import { LinkBoxItem } from 'src/features/common/components'
import { AnalysisType, PersonRegionType, UserType } from 'src/models'
import { RoutePaths } from 'src/routes/paths'
import { hasUserType } from 'src/utils/userType'

export const linksVehicles = (userType: UserType) => {
  const links: LinkBoxItem[] = [
    {
      label: 'Consultar Análise de Frota',
      path: RoutePaths.Analysis.SEARCH_VEHICLE_ANALYSIS,
    },
  ]

  if (hasUserType(userType, UserType.ADMIN, UserType.CLIENT)) {
    links.unshift(
      {
        label: 'Solicitar Análise de Frota',
        path: RoutePaths.Analysis.requestAnalysis({
          analysisType: AnalysisType.VEHICLE,
        }),
      },
      {
        label: 'Solicitar Análise de Combo',
        path: RoutePaths.Analysis.requestAnalysis({
          analysisType: AnalysisType.COMBO,
        }),
      },
    )
  }

  return links
}

export const linksPeople = (userType: UserType) => {
  const links: LinkBoxItem[] = [
    {
      label: 'Consultar Análise de Pessoa',
      path: RoutePaths.Analysis.SEARCH_PEOPLE_ANALYSIS,
    },
  ]

  if (hasUserType(userType, UserType.ADMIN, UserType.CLIENT)) {
    links.unshift(
      {
        label: 'Solicitar Análise Nacional',
        path: RoutePaths.Analysis.requestAnalysis({
          analysisType: AnalysisType.PERSON,
          regionType: PersonRegionType.NATIONAL,
        }),
      },
      {
        label: 'Solicitar Análise Estadual',
        path: RoutePaths.Analysis.requestAnalysis({
          analysisType: AnalysisType.PERSON,
          regionType: PersonRegionType.STATES,
        }),
      },
    )
  }

  return links
}

export const linksRegister: LinkBoxItem[] = [
  {
    label: 'Cadastrar Usuários',
    path: RoutePaths.Auth.REGISTER_USER,
  },
  {
    label: 'Cadastrar Empresas',
    path: RoutePaths.Auth.REGISTER_COMPANY,
  },
]
