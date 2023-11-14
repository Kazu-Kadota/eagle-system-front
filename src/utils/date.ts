import { Dayjs } from 'dayjs'
import { padNumber } from './utils'

export function formatTimeDifference(startDate: Dayjs, endDate: Dayjs) {
  const duration = endDate.diff(startDate, 'minute')

  const isNegative = duration < 0
  const absoluteDuration = Math.abs(duration)
  const hoursDuration = Math.floor(absoluteDuration / 60)
  const minutesDuration = absoluteDuration % 60

  const hours = padNumber(hoursDuration)
  const minutes = padNumber(minutesDuration)

  const timeDifference = isNegative
    ? `-${hours}h${minutes}m`
    : `${hours}h${minutes}m`

  return timeDifference
}

export function getIsoDate(date = new Date()) {
  return date.toISOString().split('T')[0]
}
