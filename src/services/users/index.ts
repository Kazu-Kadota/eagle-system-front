import { env } from '@/env';
import type { OperatorCompaniesAccess, User, UserType } from '@/models';
import { requestAuth } from '@/utils/request';

export type GetUsersListParams = {
  user_type_filter: UserType;
};

type GetUsersListResponse = {
  message: string;
  users: User[];
};

type GetUserDetailResponse = {
  message: string;
  operator_companies_access?: OperatorCompaniesAccess;
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
  await requestAuth.post(
    env.NEXT_PUBLIC_API_USER_URL,
    '/operator-companies-access/delete-users',
    { body },
  );
};

export const getUserCompaniesAccess = async (userId: string) => {
  const { data } = await requestAuth.get<GetUserDetailResponse>(
    env.NEXT_PUBLIC_API_USER_URL,
    '/operator-companies-access',
    { query: { user_id: userId } },
  );

  return data.operator_companies_access;
};

export const registerCompaniesAccess = async (
  userId: string,
  companies: string[],
) => {
  const { data } = await requestAuth.post(
    env.NEXT_PUBLIC_API_USER_URL,
    '/operator-companies-access',
    { body: { user_id: userId, companies } },
  );

  return data;
};

export const deleteCompaniesAccess = async (
  userId: string,
  companies: string[],
) => {
  const { data } = await requestAuth.post(
    env.NEXT_PUBLIC_API_USER_URL,
    '/operator-companies-access/delete-companies',
    { body: { user_id: userId, companies } },
  );

  return data;
};
