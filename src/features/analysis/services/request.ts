import { env } from 'src/config/env'
import { BackRegionPersonAnalysis, VehicleAnalysisType } from 'src/models'
import { requestAuth } from 'src/utils/request'

export type PersonAnalysisBody = {
  category_cnh: string
  cnh: string
  company_name: string
  document: string
  father_name: string
  mother_name: string
  name: string
  naturalness: string
  rg: string
  security_number_cnh: string
  state_rg: string
  birth_date: string
  expire_at_cnh: string
}

export type VehicleAnalysisBody = {
  chassis: string
  company_name: string
  driver_name: string
  owner_document: string
  owner_name: string
  plate: string
  plate_state: string
  renavam: string
  vehicle_type: string
}

type RequestAnalysisPersonBody = {
  person_analysis: BackRegionPersonAnalysis[]
  person: PersonAnalysisBody
}

type RequestAnalysisBasicVehicleBody = {
  company_name?: string
  plate_state: string
  plate: string
  owner_name: string
  owner_document: string
}

type RequestAnalysisComboBody = {
  combo_number: number
  person_analysis: BackRegionPersonAnalysis[]
  person: PersonAnalysisBody
  vehicles: VehicleAnalysisBody[]
}

export const requestAnalysisPerson = async (
  body: RequestAnalysisPersonBody,
) => {
  await requestAuth.post(env.VITE_API_REQUEST_URL, `/analysis/person`, { body })
}

export const requestAnalysisVehicle = async (body: VehicleAnalysisBody) => {
  const { data } = await requestAuth.post(
    env.VITE_API_REQUEST_URL,
    `/analysis/vehicle`,
    { body },
  )

  return data
}

export const requestBasicVehicleAnalysis = async (
  body: RequestAnalysisBasicVehicleBody,
  type: VehicleAnalysisType,
) => {
  const path = {
    [VehicleAnalysisType.VEHICLE_PLATE_HISTORY]: `/analysis/vehicle/plate-history`,
    [VehicleAnalysisType.VEHICLE_SECOND_DRIVER]: `/analysis/vehicle/second-driver`,
    [VehicleAnalysisType.ANTT]: `/analysis/vehicle/antt`,
    [VehicleAnalysisType.SIMPLE]: `/analysis/vehicle/simples`,
    [VehicleAnalysisType.BASIC_DATA]: `/analysis/vehicle/basic-data`,
  }[type]

  await requestAuth.post(env.VITE_API_REQUEST_URL, path, { body })
}

export const requestAnalysisCombo = async (body: RequestAnalysisComboBody) => {
  const { data } = await requestAuth.post(
    env.VITE_API_REQUEST_URL,
    `/analysis/combo`,
    { body },
  )

  return data
}
