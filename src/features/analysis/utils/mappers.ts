import dayjs from 'dayjs'
import {
  AnalysisStatus,
  AnalysisType,
  PersonAnalysis,
  PersonAnalysisType,
  PersonRegionType,
  VehicleAnalysis,
} from 'src/models'

export const analysisStatus: { [key in AnalysisStatus]: string } = {
  [AnalysisStatus.PROCESSING]: 'Processando',
  [AnalysisStatus.WAITING]: 'Aguardando',

  [AnalysisStatus.FINISHED]: 'Finalizado',
}
export const regionTypes: { [key in PersonRegionType]: string } = {
  [PersonRegionType.NATIONAL]: 'Nacional',
  [PersonRegionType.STATES]: 'Estadual',
  [PersonRegionType.CNH_STATUS]: 'Status da CNH',
}

export const personAnalysis: {
  [key in PersonAnalysisType]: string
} = {
  [PersonAnalysisType.HISTORY]: 'Histórico',
  [PersonAnalysisType.SIMPLE]: 'Simples',
  [PersonAnalysisType.CNH_STATUS]: 'Status da CNH',
}

export const getAnalysisTypeString = (analysis: PersonAnalysis) => {
  if (analysis.person_analysis_type === PersonAnalysisType.CNH_STATUS) {
    return personAnalysis[PersonAnalysisType.CNH_STATUS]
  }

  const string = `${regionTypes[analysis.region_type]} ${
    personAnalysis[analysis.person_analysis_type]
  }`

  if (analysis.region) {
    return `${string} (${analysis.region})`
  }

  return string
}

export const preparePersonDataFromApi = (
  person: PersonAnalysis,
): PersonAnalysis => ({
  ...person,
  birth_date: person.birth_date
    ? dayjs(person.birth_date).format('YYYY-MM-DD')
    : '',
  expire_at_cnh: person.expire_at_cnh
    ? dayjs(person.expire_at_cnh).format('YYYY-MM-DD')
    : '',
})

export const getVehicleAnalysisType = (analysis: VehicleAnalysis) => {
  if (analysis.analysis_type === AnalysisType.VEHICLE_PLATE_HISTORY) {
    return 'Histórico de placa'
  }
  return analysis.vehicle_type
}
