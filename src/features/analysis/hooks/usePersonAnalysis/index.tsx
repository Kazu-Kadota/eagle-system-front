import { useQuery } from '@tanstack/react-query'
import { getPersonAnalysis } from 'src/features/analysis/services/person'

export function usePersonAnalysis() {
  const { data, isLoading } = useQuery({
    queryKey: ['personAnalysis'],
    queryFn: getPersonAnalysis,
  })

  return {
    personAnalysis: data?.people ?? [],
    isLoading,
  }
}
