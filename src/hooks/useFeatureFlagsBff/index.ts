import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { FeatureFlag, featureFlagLabel } from '@/models';
import { getFeatureFlagsBff } from '@/services/auth/companies';

export const useFeatureFlagsBff = () => {
  const { data, isFetching, refetch } = useQuery({
    queryFn: () => getFeatureFlagsBff(),
    queryKey: ['featureFlagsBff'],
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const flags = useMemo(
    () =>
      Object.values(FeatureFlag)
        .map((flag) => {
          const config = data?.find((item) => item.feature_flag === flag);

          return {
            label: featureFlagLabel[flag] ?? flag,
            config,
            featureFlag: flag,
          };
        })
        .sort((a, b) => a.featureFlag.localeCompare(b.featureFlag)),
    [data],
  );

  return {
    flags,
    isLoading: isFetching,
    refetch,
  };
};
