export enum CompanyType {
  CLIENT = 'client',
  FONT = 'font',
}

export enum FeatureFlag {
  DATABASE_ACCESS_CONSULT = 'database_access_consult',
  INFORMATION_ACCESS_PERSON_CNH_BASIC = 'information_access_person_cnh_basic',
  INFORMATION_ACCESS_PERSON_CNH_STATUS = 'information_access_person_cnh_status',
  INFORMATION_ACCESS_PERSON_PROCESS = 'information_access_person_process',
  INFORMATION_ACCESS_PERSON_BASIC_DATA = 'information_access_person_basic_data',
  INFORMATION_ACCESS_VEHICLE_ANTT = 'information_access_vehicle_antt',
  INFORMATION_ACCESS_VEHICLE_BASIC_DATA = 'information_access_vehicle_basic_data',
  ACCESS_PERSON_ANALYSIS_REGION_TYPE_NATIONAL_STATE = 'access_person_analysis_region_type_national_state',
  SYNTHESIS_INFORMATION_ACCESS = 'synthesis_information_access',
}

export const featureFlagLabel = {
  [FeatureFlag.ACCESS_PERSON_ANALYSIS_REGION_TYPE_NATIONAL_STATE]:
    'Nacional Histórico + SP',
  [FeatureFlag.SYNTHESIS_INFORMATION_ACCESS]: 'Síntese',
  [FeatureFlag.DATABASE_ACCESS_CONSULT]: 'Base de Dados',
  [FeatureFlag.INFORMATION_ACCESS_PERSON_CNH_BASIC]: 'CNH básico',
  [FeatureFlag.INFORMATION_ACCESS_PERSON_CNH_STATUS]: 'Status CNH',
  [FeatureFlag.INFORMATION_ACCESS_PERSON_PROCESS]: 'Processos',
  [FeatureFlag.INFORMATION_ACCESS_PERSON_BASIC_DATA]: 'Dados Básicos de Pessoa',
  [FeatureFlag.INFORMATION_ACCESS_VEHICLE_ANTT]: 'ANTT',
  [FeatureFlag.INFORMATION_ACCESS_VEHICLE_BASIC_DATA]:
    'Dados Básicos do Veículo',
};

export type FeatureFlagObj = {
  feature_flag: FeatureFlag;
  enabled: boolean;
  label: string;
  config?: Record<string, unknown>;
};

export type FeatureFlags = Record<FeatureFlag, boolean>;

export interface MyCompanyCompany {
  company_id: string;
  updated_at: string;
  cnpj: string;
  created_at: string;
  name: string;
  type: CompanyType;
}

export interface MyCompany {
  company: MyCompanyCompany
  feature_flag: Array<FeatureFlag>
}

export interface Company {
  company_id: string;
  name: string;
  enabled: boolean;
  feature_flag?: FeatureFlagObj[];
}
