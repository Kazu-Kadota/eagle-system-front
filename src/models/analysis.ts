import { State } from './states'

export enum AnalysisStatus {
  WAITING = 'WAITING',
  PROCESSING = 'PROCESSING',
  FINISHED = 'FINISHED',
}

export enum AnalysisType {
  COMBO = 'combo',
  PERSON = 'person',
  VEHICLE = 'vehicle',
  VEHICLE_PLATE_HISTORY = 'vehicle-plate-history',
  SECOND_DRIVER = 'vehicle-second-driver',
}

export enum PersonAnalysisType {
  SIMPLE = 'simple',
  HISTORY = 'history',
  NATIONAL_DB = 'national + db',
  BASIC_DATA = 'basic-data',
  CNH_STATUS = 'cnh-status',
  CNH_BASIC = 'cnh-basic',
  PROCESS = 'process',
}

export enum PersonRegionType {
  STATES = 'states',
  NATIONAL = 'national',
  NATIONAL_DB = 'national + db',
  BASIC_DATA = 'basic-data',
  CNH_STATUS = 'cnh-status',
  CNH_BASIC = 'cnh-basic',
  PROCESS = 'process',
}

export const regionTypesToAnalysisTypes = {
  [PersonRegionType.BASIC_DATA]: PersonAnalysisType.BASIC_DATA,
  [PersonRegionType.CNH_STATUS]: PersonAnalysisType.CNH_STATUS,
  [PersonRegionType.CNH_BASIC]: PersonAnalysisType.CNH_BASIC,
  [PersonRegionType.PROCESS]: PersonAnalysisType.PROCESS,
}

export enum AnalysisResult {
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export type Analysis = {
  created_at: string
  analysis_type: AnalysisType
  status: AnalysisStatus
  request_id: string
  combo_number?: number
  finished_at?: string
  analysis_info: string
  analysis_result: AnalysisResult
  user_id: string
  company_name: string
  updated_at: string
  from_db: boolean
}

export type PersonAnalysis = Analysis & {
  father_name: string
  birth_date: string
  expire_at_cnh: string
  person_id: string
  name: string
  category_cnh: string
  state_rg: string
  mother_name: string
  rg: string
  naturalness: string
  document: string
  cnh: string
  security_number_cnh: string
  region_type: PersonRegionType
  person_analysis_type: PersonAnalysisType
  region?: State
}

export type VehicleAnalysis = Analysis & {
  owner_name: string
  plate: string
  driver_name: string
  renavam: string
  vehicle_type: string
  plate_state: string
  chassis: string
  vehicle_id: string
  owner_document: string
}

export interface RegionPersonAnalysis {
  region_type: PersonRegionType
  analysis_type: PersonAnalysisType[]
  regions: State[]
}

export interface BackRegionPersonAnalysis {
  region_types?: PersonRegionType[]
  type: PersonAnalysisType
  regions?: State[]
}
