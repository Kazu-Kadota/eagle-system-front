import { LinkBoxItem, LinksBox } from 'src/features/common/components'
import { AnalysisType, PersonRegionType } from 'src/models'
import { RoutePaths } from 'src/routes/paths'

const linksVehicles: LinkBoxItem[] = [
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
  {
    label: 'Consultar Análise de Frota',
    path: RoutePaths.Analysis.SEARCH_VEHICLE_ANALYSIS,
  },
]

const linksPeople: LinkBoxItem[] = [
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
  {
    label: 'Consultar Análise de Pessoa',
    path: RoutePaths.Analysis.SEARCH_PEOPLE_ANALYSIS,
  },
]

const linksRegister: LinkBoxItem[] = [
  {
    label: 'Cadastrar Usuários',
    path: RoutePaths.Auth.REGISTER_USER,
  },
  {
    label: 'Cadastrar Empresas',
    path: '',
  },
]

export function HomeUI() {
  return (
    <>
      <h2 className="text-3xl font-bold tracking-wider text-light md:text-4xl lg:text-5xl">
        Seja bem vindo ao Eagle
      </h2>
      <div className="mt-6 flex flex-col gap-8 md:mt-10">
        <LinksBox title="Acesso Rápido à Frota" links={linksVehicles} />
        <LinksBox title="Acesso Rápido à Pessoas" links={linksPeople} />
        <LinksBox title="Acesso Rápido à Cadastros" links={linksRegister} />
      </div>
    </>
  )
}
