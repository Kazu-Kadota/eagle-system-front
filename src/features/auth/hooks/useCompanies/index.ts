import { useQuery } from '@tanstack/react-query'
import { getCompanies } from '../../services/companies'
import { SelectItem } from 'src/types/select'
import { useMemo } from 'react'
import { Company } from 'src/models'

export interface UseCompaniesOptions {
  enabled?: boolean
}

const initialCompanies: Company[] = []

export const useCompanies = ({ enabled }: UseCompaniesOptions = {}) => {
  const { data, isLoading, refetch } = useQuery({
    queryFn: getCompanies,
    queryKey: ['companies'],
    enabled,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })

  const companies = data?.companies ?? initialCompanies

  const companiesSelectItems: SelectItem[] = useMemo(
    () =>
      companies.map((company) => ({
        label: company.name,
        value: company.name,
      })),
    [companies],
  )

  return {
    companies,
    companiesSelectItems,
    isLoading,
    refetch,
  }
}
