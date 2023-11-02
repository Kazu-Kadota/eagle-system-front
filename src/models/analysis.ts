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
}

export enum PersonAnalysisType {
  SIMPLE = 'simple',
  HISTORY = 'history',
  CNH_STATUS = 'cnh-status',
}

export enum PersonRegionType {
  STATES = 'states',
  NATIONAL = 'national',
}

export interface Analysis {
  created_at: string
  analysis_type: AnalysisType
  status: AnalysisStatus
  request_id: string
  combo_number?: number
  finished_at?: string
  analysis_info: string
  analysis_result: string
  user_id: string
  company_name: string
}

export interface PersonAnalysis extends Analysis {
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

export interface VehicleAnalysis extends Analysis {
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
