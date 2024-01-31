import dayjs, { Dayjs } from 'dayjs'
import {
  AnalysisType,
  PersonAnalysis,
  PersonAnalysisType,
  PersonRegionType,
  VehicleAnalysis,
} from 'src/models'

export function getPersonInitialTime(analysis: PersonAnalysis) {
  switch (analysis.person_analysis_type) {
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
  switch (analysis.analysis_type) {
    case AnalysisType.VEHICLE_PLATE_HISTORY:
    case AnalysisType.SECOND_DRIVER:
      return 240
    default:
      return 120
  }
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
