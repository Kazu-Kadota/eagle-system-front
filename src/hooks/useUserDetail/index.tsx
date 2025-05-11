import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { useUsers } from '@/hooks/useUsers';
import type { User, UserType } from '@/models';
import { getUserCompaniesAccess } from '@/services/users';
import { EMPTY_ARRAY } from '@/constants/primitives';

export function useUserDetails(userId: string, userType: UserType) {
  const { data: companiesAccess, isLoading: isCompaniesAccessLoading } =
    useQuery({
      queryKey: ['users', userId],
      refetchOnWindowFocus: false,
      queryFn: () => getUserCompaniesAccess(userId),
    });

  const { users, isLoading: isUsersLoading } = useUsers({
    user_type_filter: userType,
  });

  const user = useMemo(() => users.find((u) => u.user_id === userId), [users]);

  return {
    companies: companiesAccess?.companies ?? EMPTY_ARRAY,
    user: user ?? ({} as User),
    isLoading: isCompaniesAccessLoading || isUsersLoading,
  };
}
