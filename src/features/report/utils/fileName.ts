import { getIsoDate } from 'src/utils/date'

export const getPersonFileName = () => `person_report_${getIsoDate()}`

export const getVehicleFileName = () => `vehicle_report_${getIsoDate()}`
