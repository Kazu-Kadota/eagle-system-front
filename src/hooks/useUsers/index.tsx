import { useQuery } from '@tanstack/react-query';
import { EMPTY_ARRAY } from '@/constants/primitives';

import {
  getUsersCompanyAccess,
  getUsersList,
  type GetUsersListParams,
} from '@/services/users';
import { useCallback, useMemo } from 'react';

export function useUsers({ user_type_filter }: GetUsersListParams) {
  const {
    data: usersList,
    isLoading: isUsersLoading,
    refetch: refetchUsers,
  } = useQuery({
    queryKey: ['users', user_type_filter],
    queryFn: () => getUsersList({ user_type_filter }),
    staleTime: Infinity,
  });

  const {
    data: companiesAccess,
    isLoading: isCompaniesAccessLoading,
    refetch: refetchCompaniesAccess,
  } = useQuery({
    queryKey: ['users', 'companiesAccess'],
    queryFn: () => getUsersCompanyAccess(),
  });

  const isLoading = isUsersLoading || isCompaniesAccessLoading;

  const users = useMemo(() => {
    if (!companiesAccess) return usersList ?? EMPTY_ARRAY;

    return (
      usersList?.map((user) => ({
        ...user,
        companiesAccess: companiesAccess[user.user_id],
      })) ?? EMPTY_ARRAY
    );
  }, [usersList, companiesAccess]);

  const refetch = useCallback(() => {
    refetchCompaniesAccess();
    refetchCompaniesAccess();
  }, [refetchUsers, refetchCompaniesAccess]);

  return {
    users,
    isLoading,
    refetch,
  };
}
