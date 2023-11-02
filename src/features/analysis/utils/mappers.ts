import {
  AnalysisStatus,
  PersonAnalysis,
  PersonAnalysisType,
  PersonRegionType,
} from 'src/models'

export const analysisStatus: { [key in AnalysisStatus]: string } = {
  [AnalysisStatus.PROCESSING]: 'Processando',
  [AnalysisStatus.WAITING]: 'Aguardando',

  [AnalysisStatus.FINISHED]: 'Finalizado',
}
export const regionTypes: { [key in PersonRegionType]: string } = {
  [PersonRegionType.NATIONAL]: 'Nacional',
  [PersonRegionType.STATES]: 'Estadual',
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
