import { useEffect, useState } from 'react'
import { PersonAnalysis, VehicleAnalysis } from 'src/models'
import { formatTimeDifference } from 'src/utils/date'
import { getInitialState, getTimeColorClass } from './utils'

interface AnalysisResponseTimerProps {
  analysis: PersonAnalysis | VehicleAnalysis
}

export function AnalysisResponseTimer({
  analysis,
}: AnalysisResponseTimerProps) {
  const [{ startDate, currentDate }, setState] = useState(() =>
    getInitialState(analysis),
  )

  const colorClass = getTimeColorClass(currentDate, startDate)

  useEffect(() => {
    const intervalId = setInterval(
      () =>
        setState((prev) => ({
          ...prev,
          currentDate: prev.currentDate.subtract(1, 'second'),
        })),
      1000,
    )

    return () => clearInterval(intervalId)
  }, [])

  return (
    <span className={`${colorClass} font-semibold lowercase`}>
      {formatTimeDifference(startDate, currentDate)}
    </span>
  )
}
