import { env } from '@/env';
import type { User, UserType } from '@/models';
import { requestAuth } from '@/utils/request';

export type GetUsersListParams = {
  user_type_filter: UserType;
};

type GetUsersListResponse = {
  message: string;
  users: User[];
};

type DeleteUsersBody = {
  user_ids: string[];
};

export const getUsersList = async (params: GetUsersListParams) => {
  const { data } = await requestAuth.get<GetUsersListResponse>(
    env.NEXT_PUBLIC_API_USER_URL,
    '/users',
    { query: params },
  );

  return data.users;
};

export const deleteUsers = async (body: DeleteUsersBody) => {
  await requestAuth.post(env.NEXT_PUBLIC_API_USER_URL, '/users/delete-users', {
    body,
  });
};
