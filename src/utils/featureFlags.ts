import { FeatureFlag } from 'src/models'

export const parseFeatureFlags = (flagList: FeatureFlag[]) =>
  flagList.reduce(
    (flagObj, flag) => ({
      ...flagObj,
      [flag]: flagList.includes(flag),
    }),
    {} as Record<FeatureFlag, boolean>,
  )
