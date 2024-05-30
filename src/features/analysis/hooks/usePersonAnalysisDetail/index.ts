import { useQuery, useQueryClient } from '@tanstack/react-query'
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
  const queryKey = ['analysis', 'person', { requestId: id, personId }]

  const client = useQueryClient()

  const { data, isLoading, refetch } = useQuery({
    queryKey,
    queryFn: () =>
      getPersonDetailAnalysis({ request_id: id, person_id: personId }),
  })

  const updatePersonAnalysis = (person: PersonAnalysis) =>
    client.setQueryData(queryKey, { ...data, person })

  return {
    person: data?.person ?? ({} as PersonAnalysis),
    isLoading,
    refetch,
    updatePersonAnalysis,
  }
}
