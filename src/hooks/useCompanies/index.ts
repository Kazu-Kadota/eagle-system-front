import { EMPTY_ARRAY } from '@/constants/primitives';
import { getCompanies } from '@/services/auth/companies';
import type { SelectItem } from '@/types/select';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export interface UseCompaniesOptions {
  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
}

export const useCompanies = ({
  enabled,
  refetchOnWindowFocus = false,
}: UseCompaniesOptions) => {
  const { data, isFetching, refetch } = useQuery({
    queryFn: () => getCompanies(),
    queryKey: ['companies'],
    enabled,
    refetchOnWindowFocus,
    staleTime: Infinity,
  });

  const companies = data?.companies ?? EMPTY_ARRAY;

  return {
    companies,
    isLoading: isFetching,
    refetch,
  };
};

export const useCompaniesSelectItems = (options: UseCompaniesOptions) => {
  const { companies, isLoading, refetch } = useCompanies(options);

  const companiesSelectItems: SelectItem[] = useMemo(
    () =>
      companies.map((company) => ({
        label: company.name,
        value: company.name,
      })),
    [companies],
  );

  return { companiesSelectItems, isLoading, refetch };
};
