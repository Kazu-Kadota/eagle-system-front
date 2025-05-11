import { getUsersList, type GetUsersListParams } from '@/services/users';
import { useQuery } from '@tanstack/react-query';

export function useUsers({ user_type_filter }: GetUsersListParams) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['users', user_type_filter],
    queryFn: () => getUsersList({ user_type_filter }),
    staleTime: Infinity,
  });

  return {
    users: data ?? [],
    isLoading,
    refetch,
  };
}
