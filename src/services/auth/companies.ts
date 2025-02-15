import { env } from '@/env';
import type { Company } from '@/models';
import type { WithToken } from '@/types/auth';
import { requestAuth } from '@/utils/request';

export interface CompaniesResponse {
  message: string;
  companies: Company[];
}

export const getCompanies = async ({ token }: WithToken) => {
  const { data } = await requestAuth.get<CompaniesResponse>(
    env.NEXT_PUBLIC_API_USER_URL,
    '/companies',
    { token },
  );

  return data;
};

export const getMyCompany = async ({ token }: WithToken) => {
  const { data } = await requestAuth.get<Company>(
    env.NEXT_PUBLIC_API_USER_URL,
    '/my-company',
    { token },
  );

  return data;
};
