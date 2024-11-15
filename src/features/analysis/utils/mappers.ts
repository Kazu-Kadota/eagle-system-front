import dayjs from 'dayjs'
import {
  AnalysisStatus,
  PersonAnalysis,
  PersonAnalysisType,
  PersonRegionType,
  regionTypesToAnalysisTypes,
  VehicleAnalysis,
  VehicleAnalysisType,
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
  [PersonRegionType.PROCESS]: 'Processo',
  [PersonRegionType.BASIC_DATA]: 'Dados Básicos',
  [PersonRegionType.CNH_BASIC]: 'CNH Básica',
  [PersonRegionType.NATIONAL_DB]: 'Nacional Histórico ou Banco de dados',
}

export const personAnalysis: {
  [key in PersonAnalysisType]: string
} = {
  [PersonAnalysisType.HISTORY]: 'Histórico',
  [PersonAnalysisType.SIMPLE]: 'Simples',
  [PersonAnalysisType.CNH_STATUS]: 'Status da CNH',
  [PersonAnalysisType.PROCESS]: 'Processo',
  [PersonAnalysisType.BASIC_DATA]: 'Dados Básicos',
  [PersonAnalysisType.CNH_BASIC]: 'CNH Básica',
  [PersonAnalysisType.NATIONAL_DB]: 'Nacional Histórico ou Banco de dados',
}

export const getAnalysisTypeString = (analysis: PersonAnalysis) => {
  if (
    Object.keys(regionTypesToAnalysisTypes).includes(
      analysis.person_analysis_type,
    )
  ) {
    return personAnalysis[analysis.person_analysis_type]
  }

  if (analysis.region_type === PersonRegionType.NATIONAL_DB) {
    return regionTypes[PersonRegionType.NATIONAL_DB]
  }

  const string = `${regionTypes[analysis.region_type]} ${
    personAnalysis[analysis.person_analysis_type]
  }`

  if (analysis.region) {
    return `${string} (${analysis.region})`
  }

  return string
}

export const getAnalysisTypeColor = (analysis: PersonAnalysis) => {
  if (analysis.region_type === PersonRegionType.STATES) {
    return 'text-brown'
  }

  return {
    [PersonRegionType.NATIONAL]: '',
    [PersonRegionType.CNH_STATUS]: 'text-blue',
    [PersonRegionType.PROCESS]: 'text-blue',
    [PersonRegionType.BASIC_DATA]: 'text-blue',
    [PersonRegionType.CNH_BASIC]: 'text-blue',
    [PersonRegionType.NATIONAL_DB]: '',
    [PersonAnalysisType.HISTORY]: '',
    [PersonAnalysisType.SIMPLE]: '',
  }[analysis.person_analysis_type]
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

export const getVehicleAnalysisType = (analysis: VehicleAnalysis) =>
  ({
    [VehicleAnalysisType.ANTT]: 'ANTT',
    [VehicleAnalysisType.BASIC_DATA]: 'Dados Básicos',
    [VehicleAnalysisType.VEHICLE_PLATE_HISTORY]: 'Histórico de Placa',
    [VehicleAnalysisType.VEHICLE_SECOND_DRIVER]: 'Segundo Motorista',
    [VehicleAnalysisType.SIMPLE]: analysis.vehicle_type,
  })[analysis.vehicle_analysis_type ?? VehicleAnalysisType.SIMPLE]
