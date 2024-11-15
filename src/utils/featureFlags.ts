import { FeatureFlag, FeatureFlags } from 'src/models'

export const parseFeatureFlags = (flagList: FeatureFlag[]) =>
  flagList.reduce(
    (flagObj, flag) => ({
      ...flagObj,
      [flag]: flagList.includes(flag),
    }),
    {} as FeatureFlags,
  )
