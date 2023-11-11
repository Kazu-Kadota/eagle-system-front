import dayjs from 'dayjs'
import {
  AnalysisType,
  BackRegionPersonAnalysis,
  PersonAnalysis,
  PersonAnalysisType,
  PersonRegionType,
  RegionPersonAnalysis,
} from 'src/models'
import {
  AnalysisPersonSchema,
  AnalysisVehiclesSchema,
  PlateHistorySchema,
} from './schema'
import { PersonAnalysisBody, VehicleAnalysisBody } from '../../services/request'

export const defaultVehicle: AnalysisVehiclesSchema = {
  owner_document: '',
  owner_name: '',
  plate: '',
  plate_state: '',
  vehicle_type: '',
  chassis: '',
  company_name: '',
  driver_name: '',
  renavam: '',
}

export const defaultPerson: AnalysisPersonSchema = {
  birth_date: '',
  document: '',
  mother_name: '',
  name: '',
  rg: '',
  state_rg: '',
  category_cnh: '',
  cnh: '',
  company_name: '',
  expire_at_cnh: '',
  father_name: '',
  naturalness: '',
  security_number_cnh: '',
}

export const defaultPlateHistory: PlateHistorySchema = {
  plate: '',
  plate_state: '',
  owner_document: '',
  owner_name: '',
}

export const preparePersonData = (
  data: AnalysisPersonSchema,
): PersonAnalysisBody => ({
  category_cnh: data.category_cnh ?? '',
  cnh: data.cnh ?? '',
  company_name: data.company_name ?? '',
  document: data.document,
  father_name: data.father_name ?? '',
  mother_name: data.mother_name ?? '',
  name: data.name,
  naturalness: data.naturalness ?? '',
  rg: data.rg,
  security_number_cnh: data.security_number_cnh ?? '',
  state_rg: data.state_rg,
  birth_date: data.birth_date ? dayjs(data.birth_date).toISOString() : '',
  expire_at_cnh: data.expire_at_cnh
    ? dayjs(data.expire_at_cnh).toISOString()
    : '',
})

export const prepareVehicleData = (
  data: AnalysisVehiclesSchema,
  personData?: AnalysisPersonSchema,
): VehicleAnalysisBody => ({
  chassis: data.chassis ?? '',
  company_name: personData?.company_name || data.company_name || '',
  driver_name: data.driver_name ?? '',
  owner_document: data.owner_document,
  owner_name: data.owner_name,
  plate: data.plate,
  plate_state: data.plate_state,
  renavam: data.renavam ?? '',
  vehicle_type: data.vehicle_type,
})

export const preparePersonAnalysis = (
  data: RegionPersonAnalysis[],
  analysisType: AnalysisType,
): BackRegionPersonAnalysis[] => {
  const regions = data.find((item) => item.regions.length > 0)?.regions ?? []

  const analysis = Object.values(PersonAnalysisType).reduce<
    BackRegionPersonAnalysis[]
  >((array, type) => {
    const item: BackRegionPersonAnalysis = { type, region_types: [] }

    data.forEach((region) => {
      if (region?.analysis_type.includes(item.type)) {
        item.region_types!.push(region.region_type)
      }
    })

    if (item.region_types!.includes(PersonRegionType.STATES)) {
      item.regions = regions
    }

    if (item.region_types!.length > 0) {
      array.push(item)
    }

    return array
  }, [])

  if (
    analysisType === AnalysisType.PERSON &&
    data.some((item) => item.region_type === PersonRegionType.CNH_STATUS)
  ) {
    analysis.push({ type: PersonAnalysisType.CNH_STATUS })
  }

  return analysis
}
