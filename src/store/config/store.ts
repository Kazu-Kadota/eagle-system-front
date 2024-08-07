import { AnalysisType } from 'src/models'
import { createPersist } from 'src/utils/zustand'

interface ConfigState {
  numOfItemsPerPagePeople: number
  numOfItemsPerPageVehicles: number
}

export interface ConfigStore extends ConfigState {
  getNumOfItemsPerPage: (type: AnalysisType) => number
  setNumOfItemsPerPage: (type: AnalysisType, value: number) => void
}

const initialState: ConfigState = {
  numOfItemsPerPagePeople: 25,
  numOfItemsPerPageVehicles: 25,
}

export const useConfigStore = createPersist<ConfigStore>(
  (set, get) => ({
    ...initialState,

    getNumOfItemsPerPage: (type) => {
      switch (type) {
        case AnalysisType.PERSON:
        case AnalysisType.COMBO:
          return get().numOfItemsPerPagePeople
        case AnalysisType.VEHICLE:
        case AnalysisType.VEHICLE_PLATE_HISTORY:
        case AnalysisType.SECOND_DRIVER:
          return get().numOfItemsPerPageVehicles
      }
    },

    setNumOfItemsPerPage: (type, value) => {
      switch (type) {
        case AnalysisType.PERSON:
        case AnalysisType.COMBO:
          return set({ numOfItemsPerPagePeople: value })
        case AnalysisType.VEHICLE:
        case AnalysisType.VEHICLE_PLATE_HISTORY:
        case AnalysisType.SECOND_DRIVER:
          return set({ numOfItemsPerPageVehicles: value })
      }
    },
  }),
  { name: 'config-store' },
)
