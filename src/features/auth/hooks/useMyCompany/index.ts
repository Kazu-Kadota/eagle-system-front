import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { Company, CompanyType } from 'src/models'
import { parseFeatureFlags } from 'src/utils/featureFlags'
import { getMyCompany } from '../../services/companies'

const initialCompany: Company = {
  company_id: '',
  updated_at: '',
  cnpj: '',
  created_at: '',
  name: '',
  type: CompanyType.FONT,
  feature_flag: [],
}

export const useMyCompany = () => {
  const { data, isFetching, refetch } = useQuery({
    queryFn: getMyCompany,
    queryKey: ['my-company'],
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })

  const company = data ?? initialCompany

  const featureFlags = useMemo(
    () => parseFeatureFlags(company.feature_flag),
    [company.feature_flag],
  )

  return {
    featureFlags,
    company: data ?? initialCompany,
    isLoading: isFetching,
    refetch,
  }
}
