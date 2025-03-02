import {
  AnalysisResult,
  AnalysisStatus,
  AnalysisType,
  type FeatureFlags,
  PersonAnalysisType,
  PersonRegionType,
  VehicleAnalysisType,
} from 'src/models';
import { type SelectItem } from 'src/types/select';

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
];

export const simpleAnalysisTypesItems: SelectItem<AnalysisType>[] = [
  {
    label: 'Pessoa',
    value: AnalysisType.PERSON,
  },
  {
    label: 'Veículo',
    value: AnalysisType.VEHICLE,
  },
];

export const getPersonAnalysisItems = (
  regionType: PersonRegionType,
  featureFlags: FeatureFlags,
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
  ];

  if (
    regionType === PersonRegionType.NATIONAL &&
    featureFlags.database_access_consult
  ) {
    items.push({
      label: 'Histórico ou Banco de dados',
      value: PersonAnalysisType.NATIONAL_DB,
    });
  }

  return items;
};

export const getRegionAnalysisItems = (
  analysisType: AnalysisType,
  featureFlags: FeatureFlags,
): SelectItem[] => {
  const items = [
    {
      label: 'Análise Estadual',
      value: PersonRegionType.STATES,
    },
    {
      label: 'Análise Nacional',
      value: PersonRegionType.NATIONAL,
    },
  ];

  if (analysisType === AnalysisType.PERSON) {
    if (featureFlags.access_person_analysis_region_type_national_state) {
      items.push({
        label: 'Análise Nacional + 1 Estado',
        value: PersonRegionType.NATIONAL_STATES,
      });
    }

    if (featureFlags.information_access_person_basic_data) {
      items.push({
        label: 'Dados Básicos',
        value: PersonRegionType.BASIC_DATA,
      });
    }
    if (featureFlags.information_access_person_cnh_basic) {
      items.push({
        label: 'CNH Básica',
        value: PersonRegionType.CNH_BASIC,
      });
    }
    if (featureFlags.information_access_person_cnh_status) {
      items.push({
        label: 'Status da CNH',
        value: PersonRegionType.CNH_STATUS,
      });
    }
    if (featureFlags.information_access_person_process) {
      items.push({
        label: 'Processo',
        value: PersonRegionType.PROCESS,
      });
    }
  }

  return items;
};

export const vehiclesTypesSelectItems: SelectItem[] = [
  { label: 'Cavalo', value: 'CAVALO' },
  { label: 'Carreta', value: 'CARRETA' },
];

export const getVehicleAnalysisSelectItems = (
  featureFlags: FeatureFlags,
): SelectItem<VehicleAnalysisType>[] => {
  const items = [
    { label: 'Veículo', value: VehicleAnalysisType.SIMPLE },
    {
      label: 'Histórico de placa',
      value: VehicleAnalysisType.VEHICLE_PLATE_HISTORY,
    },
    { label: 'Segundo dono', value: VehicleAnalysisType.VEHICLE_SECOND_DRIVER },
  ];

  if (featureFlags.information_access_vehicle_basic_data) {
    items.push({
      label: 'Dados Básicos',
      value: VehicleAnalysisType.BASIC_DATA,
    });
  }
  if (featureFlags.information_access_vehicle_antt) {
    items.push({ label: 'ANTT', value: VehicleAnalysisType.ANTT });
  }

  return items;
};

export const analysisResultsSelectItems: SelectItem<AnalysisResult>[] = [
  { label: 'Nada consta', value: AnalysisResult.APPROVED },
  { label: 'Possui informações substanciais', value: AnalysisResult.REJECTED },
];

export const analysisStatusSelectItems: SelectItem<AnalysisStatus>[] = [
  { label: 'Aguardando', value: AnalysisStatus.WAITING },
  { label: 'Processando', value: AnalysisStatus.PROCESSING },
  { label: 'Finalizado', value: AnalysisStatus.FINISHED },
];

export const getAnalysisVehicleTypeLabel = (type: VehicleAnalysisType) =>
  ({
    [VehicleAnalysisType.ANTT]: 'Análise ANTT',
    [VehicleAnalysisType.BASIC_DATA]: 'Análise de Dados Básicos',
    [VehicleAnalysisType.VEHICLE_PLATE_HISTORY]:
      'Análise de Histórico de Placa',
    [VehicleAnalysisType.VEHICLE_SECOND_DRIVER]: 'Análise de Segundo Motorista',
    [VehicleAnalysisType.SIMPLE]: 'Análise de Veículo',
  })[type ?? VehicleAnalysisType.SIMPLE];

export const personRegionTypeButtonTheme = {
  [PersonRegionType.NATIONAL]: 'blue',
  [PersonRegionType.NATIONAL_DB]: 'blue',
  [PersonRegionType.STATES]: 'brown',
  [PersonRegionType.NATIONAL_STATES]: 'brown',
  [PersonRegionType.BASIC_DATA]: 'blue',
  [PersonRegionType.CNH_BASIC]: 'blue',
  [PersonRegionType.CNH_STATUS]: 'blue',
  [PersonRegionType.PROCESS]: 'blue',
} as const;

export const analysisTypeButtonTheme = {
  [AnalysisType.PERSON]: 'blue',
  [AnalysisType.VEHICLE]: 'blue',
  [AnalysisType.COMBO]: 'brown',
} as const;
