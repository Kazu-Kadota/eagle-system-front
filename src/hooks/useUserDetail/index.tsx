import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { EMPTY_ARRAY } from '@/constants/primitives';
import type { UserType } from '@/models';
import { getUserCompaniesAccess, getUsersList } from '@/services/users';

export function useUserDetails(userId: string, userType: UserType) {
  const {
    data: companiesAccess,
    isLoading: isCompaniesAccessLoading,
    refetch,
  } = useQuery({
    queryKey: ['users', userId],
    refetchOnWindowFocus: false,
    queryFn: () => getUserCompaniesAccess(userId),
  });

  const { data: usersList, isLoading: isUsersLoading } = useQuery({
    queryKey: ['users', userType],
    queryFn: () => getUsersList({ user_type_filter: userType }),
    staleTime: Infinity,
  });

  const user = useMemo(
    () => usersList?.find((u) => u.user_id === userId),
    [usersList],
  );

  return {
    user,
    companies: companiesAccess?.companies ?? EMPTY_ARRAY,
    isLoading: isCompaniesAccessLoading || isUsersLoading,
    refetch,
  };
}
