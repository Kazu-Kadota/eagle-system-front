import type { InputType } from '@/components/Input';
import { env } from '@/env';
import {
  featureFlagLabel,
  type Company,
  type FeatureFlag,
  type MyCompany,
} from '@/models';
import { requestAuth } from '@/utils/request';

export interface CompaniesResponse {
  message: string;
  companies: Company[];
}

interface FeatureFlagsBffResponse {
  message: string;
  feature_flags_bff: {
    updated_at: string;
    feature_flag: FeatureFlag;
    fields: {
      name: string;
      label: string;
      type: InputType;
      'place-holder': string;
    }[];
    created_at: string;
  }[];
}

type SetFeatureFlagsParams = {
  company_id: string;
  feature_flags: {
    feature_flag: FeatureFlag;
    enabled: boolean;
    config?: Record<string, unknown>;
  }[];
};

export const getCompanies = async () => {
  const { data } = await requestAuth.get<CompaniesResponse>(
    env.NEXT_PUBLIC_API_USER_URL,
    '/companies',
  );

  return data.companies.map((company) => {
    const flags = company.feature_flag
      ?.filter((flag) => flag.enabled)
      ?.map((flag) => ({
        ...flag,
        label: featureFlagLabel[flag.feature_flag] ?? flag.feature_flag,
      }));

    return {
      ...company,
      feature_flag: flags,
    };
  });
};

export const getMyCompany = async () => {
  const { data } = await requestAuth.get<MyCompany>(
    env.NEXT_PUBLIC_API_USER_URL,
    '/my-company',
  );

  return data;
};

export const getFeatureFlagsBff = async () => {
  const { data } = await requestAuth.get<FeatureFlagsBffResponse>(
    env.NEXT_PUBLIC_API_USER_URL,
    '/feature-flag/bff',
  );

  return data.feature_flags_bff ?? [];
};

export const setCompaniesFeatureFlags = async (
  params: SetFeatureFlagsParams,
) => {
  await requestAuth.put(env.NEXT_PUBLIC_API_USER_URL, '/feature-flag/company', {
    body: params,
  });
};

export const updateCompaniesFeatureFlags = async (
  params: SetFeatureFlagsParams,
) => {
  await requestAuth.post(
    env.NEXT_PUBLIC_API_USER_URL,
    '/feature-flag/company',
    { body: params },
  );
};
