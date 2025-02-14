import { env } from '@/env/client';
import type { Company } from '@/models';
import { requestAuth } from '@/utils/request';

export interface CompaniesResponse {
  message: string;
  companies: Company[];
}

export const getCompanies = async () => {
  const { data } = await requestAuth.get<CompaniesResponse>(
    env.NEXT_PUBLIC_API_USER_URL,
    '/companies',
  );

  return data;
};

export const getMyCompany = async () => {
  const { data } = await requestAuth.get<Company>(
    env.NEXT_PUBLIC_API_USER_URL,
    '/my-company',
  );

  return data;
};
