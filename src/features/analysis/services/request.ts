import { env } from 'src/config/env'
import { BackRegionPersonAnalysis, VehicleAnalysis } from 'src/models'
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

type RequestAnalysisPlateHistoryBody = {
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

export const requestAnalysisPlateHistory = async (
  body: RequestAnalysisPlateHistoryBody,
) => {
  await requestAuth.post(
    env.VITE_API_REQUEST_URL,
    `/analysis/vehicle/plate-history`,
    { body },
  )
}

export const requestAnalysisCombo = async (body: RequestAnalysisComboBody) => {
  const { data } = await requestAuth.post(
    env.VITE_API_REQUEST_URL,
    `/analysis/combo`,
    { body },
  )

  return data
}
