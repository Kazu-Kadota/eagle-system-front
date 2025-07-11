import { createPersist } from '@/utils/zustand';

export enum ConfigType {
  PERSON = 'person',
  VEHICLE = 'vehicle',
  OPERATOR = 'operator',
  COMPANIES = 'companies',
}

interface ConfigState {
  numOfItemsPerPagePeople: number;
  numOfItemsPerPageVehicles: number;
  numOfItemsPerPageOperators: number;
  numOfItemsPerPageCompanies: number;
}

export interface ConfigStore extends ConfigState {
  getNumOfItemsPerPage: (type: ConfigType) => number;
  setNumOfItemsPerPage: (type: ConfigType, value: number) => void;
}

const initialState: ConfigState = {
  numOfItemsPerPagePeople: 25,
  numOfItemsPerPageVehicles: 25,
  numOfItemsPerPageOperators: 25,
  numOfItemsPerPageCompanies: 25,
};

export const useConfigStore = createPersist<ConfigStore>(
  (set, get) => ({
    ...initialState,

    getNumOfItemsPerPage: (type) => {
      switch (type) {
        case ConfigType.PERSON:
          return get().numOfItemsPerPagePeople;
        case ConfigType.VEHICLE:
          return get().numOfItemsPerPageVehicles;
        case ConfigType.OPERATOR:
          return get().numOfItemsPerPageOperators;
        case ConfigType.COMPANIES:
          return get().numOfItemsPerPageCompanies;
      }
    },

    setNumOfItemsPerPage: (type, value) => {
      switch (type) {
        case ConfigType.PERSON:
          return set({ numOfItemsPerPagePeople: value });
        case ConfigType.VEHICLE:
          return set({ numOfItemsPerPageVehicles: value });
        case ConfigType.OPERATOR:
          return set({ numOfItemsPerPageOperators: value });
        case ConfigType.COMPANIES:
          return set({ numOfItemsPerPageCompanies: value });
      }
    },
  }),
  { name: 'config-store' },
);

export const useConfigStoreActions = () => {
  const getNumOfItemsPerPage = useConfigStore(
    (state) => state.getNumOfItemsPerPage,
  );
  const setNumOfItemsPerPage = useConfigStore(
    (state) => state.setNumOfItemsPerPage,
  );

  return { getNumOfItemsPerPage, setNumOfItemsPerPage };
};
