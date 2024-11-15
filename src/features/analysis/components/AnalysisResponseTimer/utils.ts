import dayjs, { Dayjs } from 'dayjs'
import {
  PersonAnalysis,
  PersonAnalysisType,
  PersonRegionType,
  VehicleAnalysis,
  VehicleAnalysisType,
} from 'src/models'

export function getPersonInitialTime(analysis: PersonAnalysis) {
  switch (analysis.person_analysis_type) {
    case PersonAnalysisType.BASIC_DATA:
    case PersonAnalysisType.CNH_BASIC:
    case PersonAnalysisType.PROCESS:
      return 30
    case PersonAnalysisType.CNH_STATUS:
      return 240
  }

  switch (analysis.region_type) {
    case PersonRegionType.NATIONAL:
      return 120
    case PersonRegionType.STATES:
      return 210
    default:
      return 120
  }
}

function getVehicleInitialTime(analysis: VehicleAnalysis) {
  return {
    [VehicleAnalysisType.SIMPLE]: 120,
    [VehicleAnalysisType.BASIC_DATA]: 30,
    [VehicleAnalysisType.ANTT]: 30,
    [VehicleAnalysisType.VEHICLE_PLATE_HISTORY]: 240,
    [VehicleAnalysisType.VEHICLE_SECOND_DRIVER]: 240,
  }[analysis.vehicle_analysis_type ?? VehicleAnalysisType.SIMPLE]
}

function getInitialTime(analysis: PersonAnalysis | VehicleAnalysis) {
  if ('person_analysis_type' in analysis) return getPersonInitialTime(analysis)
  return getVehicleInitialTime(analysis)
}

export function getInitialState(analysis: PersonAnalysis | VehicleAnalysis) {
  const time = getInitialTime(analysis)
  const startDate = dayjs()
  const currentDate = dayjs(analysis.created_at).add(time, 'minute')

  return { startDate, currentDate }
}

export function getTimeColorClass(currentDate: Dayjs, startDate: Dayjs) {
  const diff = currentDate.diff(startDate, 'minute')

  if (diff <= 0) return 'text-error'
  if (diff <= 15) return 'text-orange'
  if (diff <= 30) return 'text-warning'

  return 'text-secondary'
}
