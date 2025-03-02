import { FeatureFlag, type FeatureFlags } from 'src/models';

interface Options {
  flagList: FeatureFlag[];
  isAdmin: boolean;
}

export const parseFeatureFlags = ({ flagList, isAdmin }: Options) => {
  return Object.values(FeatureFlag).reduce((acc, flag) => {
    acc[flag] = isAdmin || flagList.includes(flag);
    return acc;
  }, {} as FeatureFlags);
};
