import { CompanyType, type Company } from '@/models';
import { getMyCompany } from '@/services/auth/companies';
import { parseFeatureFlags } from '@/utils/featureFlags';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

const initialCompany: Company = {
  company_id: '',
  updated_at: '',
  cnpj: '',
  created_at: '',
  name: '',
  type: CompanyType.FONT,
  feature_flag: [],
};

interface Options {
  isAdmin: boolean;
  token: string;
}

export const useMyCompany = ({ isAdmin, token }: Options) => {
  const { data, isFetching, refetch } = useQuery({
    queryFn: () => getMyCompany({ token }),
    queryKey: ['my-company'],
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: !isAdmin && !!token,
  });

  const company = data ?? initialCompany;

  const featureFlags = useMemo(
    () => parseFeatureFlags({ flagList: company.feature_flag, isAdmin }),
    [company.feature_flag, isAdmin],
  );

  return {
    featureFlags,
    company: data ?? initialCompany,
    isLoading: isFetching,
    refetch,
  };
};
