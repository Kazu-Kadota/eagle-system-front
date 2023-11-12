import { useQuery } from '@tanstack/react-query'
import { getPersonDetailAnalysis } from '../../services/person'
import { PersonAnalysis } from 'src/models'

interface UsePersonAnalysisDetailProps {
  id: string
  personId: string
}

export const usePersonAnalysisDetail = ({
  id,
  personId,
}: UsePersonAnalysisDetailProps) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['analysis', 'person', { requestId: id, personId }],
    queryFn: () =>
      getPersonDetailAnalysis({ request_id: id, person_id: personId }),
  })

  return {
    person: data?.person ?? ({} as PersonAnalysis),
    isLoading,
    refetch,
  }
}
