import { env } from '@/env';
import { CompanyType, UserType } from '@/models';
import { requestAuth } from '@/utils/request';

type RegisterUserBody = {
  company_name: string;
  password: string;
  user_first_name: string;
  user_last_name: string;
  email: string;
  user_type: UserType;
  api: boolean;
};

type RegisterCompanyBody = {
  name: string;
  cnpj: string;
  type: CompanyType;
};

export const registerUser = async (body: RegisterUserBody) => {
  await requestAuth.post(env.NEXT_PUBLIC_API_USER_URL, `/register/user`, {
    body,
  });
};

export const registerCompany = async (body: RegisterCompanyBody) => {
  await requestAuth.post(env.NEXT_PUBLIC_API_USER_URL, `/register/company`, {
    body,
  });
};
