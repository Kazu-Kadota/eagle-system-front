import type { Company } from '@/models';
import { getCompanies } from '@/services/auth/companies';
import type { SelectItem } from '@/types/select';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export interface UseCompaniesOptions {
  enabled?: boolean;
  token: string;
}

const initialCompanies: Company[] = [];

export const useCompanies = ({ enabled, token }: UseCompaniesOptions) => {
  const { data, isFetching, refetch } = useQuery({
    queryFn: () => getCompanies({ token }),
    queryKey: ['companies'],
    enabled: enabled && !!token,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const companies = data?.companies ?? initialCompanies;

  const companiesSelectItems: SelectItem[] = useMemo(
    () =>
      companies.map((company) => ({
        label: company.name,
        value: company.name,
      })),
    [companies],
  );

  return {
    companies,
    companiesSelectItems,
    isLoading: isFetching,
    refetch,
  };
};
