import { CompanyType, type MyCompany } from '@/models';
import { getMyCompany } from '@/services/auth/companies';
import { parseFeatureFlags } from '@/utils/featureFlags';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

const initialCompany: MyCompany = {
  company: { 
    company_id: '',
    updated_at: '',
    cnpj: '',
    created_at: '',
    name: '',
    type: CompanyType.FONT,
  },
  feature_flag: []
};

interface Options {
  isAdmin: boolean;
}

export const useMyCompany = ({ isAdmin }: Options) => {
  const { data, isFetching, refetch } = useQuery({
    queryFn: () => getMyCompany(),
    queryKey: ['my-company'],
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: !isAdmin,
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
