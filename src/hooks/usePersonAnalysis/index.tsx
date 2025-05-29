import { getPersonAnalysis } from '@/services/analysis/person';
import { useQuery } from '@tanstack/react-query';

export function usePersonAnalysis() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['personAnalysis'],
    queryFn: getPersonAnalysis,
  });

  return {
    personAnalysis: data?.people ?? [],
    isLoading,
    refetch,
  };
}
