import {
  getInitialState,
  getTimeColorClass,
} from '@/components/AnalysisResponseTimer/utils';
import type { PersonAnalysis, VehicleAnalysis } from '@/models';
import { formatTimeDifference } from '@/utils/date';
import { useEffect, useState } from 'react';

interface AnalysisResponseTimerProps {
  analysis: PersonAnalysis | VehicleAnalysis;
}

export function AnalysisResponseTimer({
  analysis,
}: AnalysisResponseTimerProps) {
  const [{ startDate, currentDate }, setState] = useState(() =>
    getInitialState(analysis),
  );

  const colorClass = getTimeColorClass(currentDate, startDate);

  useEffect(() => {
    const intervalId = setInterval(
      () =>
        setState((prev) => ({
          ...prev,
          currentDate: prev.currentDate.subtract(1, 'second'),
        })),
      1000,
    );

    return () => clearInterval(intervalId);
  }, []);

  return (
    <span className={`${colorClass} font-semibold lowercase`}>
      {formatTimeDifference(startDate, currentDate)}
    </span>
  );
}
