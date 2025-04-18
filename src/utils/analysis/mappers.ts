import { customDayJs } from '@/config/dayjs';
import {
  AnalysisStatus,
  type PersonAnalysis,
  PersonAnalysisType,
  PersonRegionType,
  regionTypesToAnalysisTypes,
  type VehicleAnalysis,
  VehicleAnalysisType,
} from '@/models';
import { decodeBase64Worker } from '@/utils/workers';

export const analysisStatus: { [key in AnalysisStatus]: string } = {
  [AnalysisStatus.PROCESSING]: 'Processando',
  [AnalysisStatus.WAITING]: 'Aguardando',

  [AnalysisStatus.FINISHED]: 'Finalizado',
};
export const regionTypes: { [key in PersonRegionType]: string } = {
  [PersonRegionType.NATIONAL]: 'Nacional',
  [PersonRegionType.STATES]: 'Estadual',
  [PersonRegionType.CNH_STATUS]: 'Status da CNH',
  [PersonRegionType.PROCESS]: 'Processo',
  [PersonRegionType.BASIC_DATA]: 'Dados Básicos',
  [PersonRegionType.CNH_BASIC]: 'CNH Básica',
  [PersonRegionType.NATIONAL_DB]: 'Nacional Histórico ou Banco de dados',
  [PersonRegionType.NATIONAL_STATES]: 'Nacional + Estadual',
};

export const personAnalysis: {
  [key in PersonAnalysisType]: string;
} = {
  [PersonAnalysisType.HISTORY]: 'Histórico',
  [PersonAnalysisType.SIMPLE]: 'Simples',
  [PersonAnalysisType.CNH_STATUS]: 'Status da CNH',
  [PersonAnalysisType.PROCESS]: 'Processo',
  [PersonAnalysisType.BASIC_DATA]: 'Dados Básicos',
  [PersonAnalysisType.CNH_BASIC]: 'CNH Básica',
  [PersonAnalysisType.NATIONAL_DB]: 'Nacional Histórico ou Banco de dados',
};

export const getAnalysisTypeString = (analysis: PersonAnalysis) => {
  if (
    Object.keys(regionTypesToAnalysisTypes).includes(
      analysis.person_analysis_type,
    )
  ) {
    return personAnalysis[analysis.person_analysis_type];
  }

  if (analysis.region_type === PersonRegionType.NATIONAL_DB) {
    return regionTypes[PersonRegionType.NATIONAL_DB];
  }

  const string = `${regionTypes[analysis.region_type]} ${
    personAnalysis[analysis.person_analysis_type]
  }`;

  if (analysis.region) {
    return `${string} (${analysis.region})`;
  }

  return string;
};

export const getAnalysisTypeColor = (analysis: PersonAnalysis) => {
  switch (analysis.region_type) {
    case PersonRegionType.STATES:
    case PersonRegionType.NATIONAL_STATES:
      return 'text-brown';
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
  }[analysis.person_analysis_type];
};

export const preparePersonDataFromApi = async (
  person: PersonAnalysis,
): Promise<PersonAnalysis> => ({
  ...person,
  birth_date: person.birth_date
    ? customDayJs(person.birth_date).format('YYYY-MM-DD')
    : '',
  expire_at_cnh: person.expire_at_cnh
    ? customDayJs(person.expire_at_cnh).format('YYYY-MM-DD')
    : '',
  analysis_info: person.analysis_info
    ? await decodeBase64Worker(person.analysis_info)
    : person.analysis_info,
});

export const getVehicleAnalysisType = (analysis: VehicleAnalysis) =>
  ({
    [VehicleAnalysisType.ANTT]: 'ANTT',
    [VehicleAnalysisType.BASIC_DATA]: 'Dados Básicos',
    [VehicleAnalysisType.VEHICLE_PLATE_HISTORY]: 'Histórico de Placa',
    [VehicleAnalysisType.VEHICLE_SECOND_DRIVER]: 'Segundo Motorista',
    [VehicleAnalysisType.SIMPLE]: analysis.vehicle_type,
  })[analysis.vehicle_analysis_type ?? VehicleAnalysisType.SIMPLE];
