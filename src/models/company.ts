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
}

export type FeatureFlags = Record<FeatureFlag, boolean>

export interface Company {
  company_id: string
  updated_at: string
  cnpj: string
  created_at: string
  name: string
  type: CompanyType
  feature_flag: FeatureFlag[]
}
