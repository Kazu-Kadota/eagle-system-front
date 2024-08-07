import {
  AnalysisResult,
  AnalysisStatus,
  AnalysisType,
  PersonAnalysisType,
  PersonRegionType,
} from 'src/models'
import { SelectItem } from 'src/types/select'

export const analysisTypesItems: SelectItem<AnalysisType>[] = [
  {
    label: 'Pessoa',
    value: AnalysisType.PERSON,
  },
  {
    label: 'Veículo',
    value: AnalysisType.VEHICLE,
  },
  {
    label: 'Combo (pessoa+frota)',
    value: AnalysisType.COMBO,
  },
]

export const simpleAnalysisTypesItems: SelectItem<AnalysisType>[] = [
  {
    label: 'Pessoa',
    value: AnalysisType.PERSON,
  },
  {
    label: 'Veículo',
    value: AnalysisType.VEHICLE,
  },
]

export const getPersonAnalysisItems = (
  regionType: PersonRegionType,
  isDbEnabled: boolean,
): SelectItem[] => {
  const items = [
    {
      label: 'Simples',
      value: PersonAnalysisType.SIMPLE,
    },
    {
      label: 'Histórico',
      value: PersonAnalysisType.HISTORY,
    },
  ]

  if (regionType === PersonRegionType.NATIONAL && isDbEnabled) {
    items.push({
      label: 'Histórico ou Banco de dados',
      value: PersonAnalysisType.NATIONAL_DB,
    })
  }

  return items
}

export const regionAnalysisItems: SelectItem[] = [
  {
    label: 'Análise Estadual',
    value: PersonRegionType.STATES,
  },
  {
    label: 'Análise Nacional',
    value: PersonRegionType.NATIONAL,
  },
]

export const regionAnalysisItemsWithCNH: SelectItem[] = [
  ...regionAnalysisItems,
  {
    label: 'Status da CNH',
    value: PersonRegionType.CNH_STATUS,
  },
]

export const vehiclesTypesSelectItems: SelectItem[] = [
  { label: 'Cavalo', value: 'CAVALO' },
  { label: 'Carreta', value: 'CARRETA' },
]

export const vehicleAnalysisSelectItems: SelectItem<AnalysisType>[] = [
  { label: 'Veículo', value: AnalysisType.VEHICLE },
  { label: 'Histórico de placa', value: AnalysisType.VEHICLE_PLATE_HISTORY },
  { label: 'Segundo dono', value: AnalysisType.SECOND_DRIVER },
]

export const analysisResultsSelectItems: SelectItem<AnalysisResult>[] = [
  { label: 'Nada consta', value: AnalysisResult.APPROVED },
  { label: 'Possui informações substanciais', value: AnalysisResult.REJECTED },
]

export const analysisStatusSelectItems: SelectItem<AnalysisStatus>[] = [
  { label: 'Aguardando', value: AnalysisStatus.WAITING },
  { label: 'Processando', value: AnalysisStatus.PROCESSING },
  { label: 'Finalizado', value: AnalysisStatus.FINISHED },
]

export const analysisTypeButtonLabel = {
  [AnalysisType.PERSON]: 'Análise de Pessoa',
  [AnalysisType.VEHICLE]: 'Análise de Veículo',
  [AnalysisType.VEHICLE_PLATE_HISTORY]: 'Análise de Histórico de placa',
  [AnalysisType.SECOND_DRIVER]: 'Análise de Segundo dono',
  [AnalysisType.COMBO]: 'Análise de Combo',
} as const

export const personRegionTypeButtonTheme = {
  [PersonRegionType.NATIONAL]: 'blue',
  [PersonRegionType.NATIONAL_DB]: 'blue',
  [PersonRegionType.STATES]: 'brown',
  [PersonRegionType.CNH_STATUS]: 'placeholder',
} as const

export const analysisTypeButtonTheme = {
  [AnalysisType.PERSON]: 'blue',
  [AnalysisType.VEHICLE]: 'blue',
  [AnalysisType.VEHICLE_PLATE_HISTORY]: 'brown',
  [AnalysisType.SECOND_DRIVER]: 'brown',
  [AnalysisType.COMBO]: 'brown',
} as const
