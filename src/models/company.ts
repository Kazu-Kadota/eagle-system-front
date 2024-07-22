export enum CompanyType {
  CLIENT = 'client',
  FONT = 'font',
}

export enum FeatureFlag {
  DATABASE_ACCESS_CONSULT = 'database_access_consult',
}

export interface Company {
  company_id: string
  updated_at: string
  cnpj: string
  created_at: string
  name: string
  type: CompanyType
  feature_flag: FeatureFlag[]
}
