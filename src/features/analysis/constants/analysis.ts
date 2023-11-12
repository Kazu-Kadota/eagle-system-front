import { RadioGroupItem } from 'src/components'
import { AnalysisType, PersonAnalysisType, PersonRegionType } from 'src/models'
import { SelectItem } from 'src/types/select'

export const analysisTypesItems: RadioGroupItem<AnalysisType>[] = [
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

export const personAnalysisItems: RadioGroupItem[] = [
  {
    label: 'Simples',
    value: PersonAnalysisType.SIMPLE,
  },
  {
    label: 'Histórico',
    value: PersonAnalysisType.HISTORY,
  },
]

export const regionAnalysisItems: RadioGroupItem[] = [
  {
    label: 'Análise Estadual',
    value: PersonRegionType.STATES,
  },
  {
    label: 'Análise Nacional',
    value: PersonRegionType.NATIONAL,
  },
]

export const regionAnalysisItemsWithCNH: RadioGroupItem[] = [
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
]
