import { Control, FieldArrayWithId } from 'react-hook-form'
import { Box, LoadingContainer, SelectGroup } from 'src/components'
import {
  AnalysisTypeSelect,
  PersonForm,
  VehiclesForm,
} from 'src/features/analysis/components'
import { analysisTypesItems } from 'src/features/analysis/constants/analysis'
import {
  AnalysisType,
  PersonRegionType,
  RegionPersonAnalysis,
  UserType,
} from 'src/models'
import { SelectItem } from 'src/types/select'
import {
  AnalysisArrayVehicleSchema,
  AnalysisPersonSchema,
  PlateHistorySchema,
  SecondDriverSchema,
} from '../schema'

type VehicleField = FieldArrayWithId<
  AnalysisArrayVehicleSchema,
  'vehicles',
  'id'
>

export interface RequestAnalysisUIProps {
  isLoading: boolean
  isDbEnabled: boolean
  analysisType?: AnalysisType
  analysisTypeLoading: AnalysisType | null
  vehicleAnalysisType: AnalysisType
  onChangeVehicleAnalysisType: (value: AnalysisType) => void
  fieldsVehicle: VehicleField[]
  userType?: UserType
  companiesSelectItems: SelectItem[]
  companiesLoading: boolean
  onChangeAnalysisType: (value: AnalysisType) => void
  controlPerson: Control<AnalysisPersonSchema>
  controlVehicle: Control<AnalysisArrayVehicleSchema>
  controlPlateHistory: Control<PlateHistorySchema>
  controlSecondDriver: Control<SecondDriverSchema>
  personAnalysis: RegionPersonAnalysis[]
  onChangePersonAnalysis: (value: RegionPersonAnalysis[]) => void
  addVehicleForm: () => void
  removeVehicleForm: (index: number) => void
  onRequestPersonAnalysis: () => void
  onRequestVehicleAnalysis: () => void
  onRequestPlateHistoryAnalysis: () => void
  onRequestSecondDriverAnalysis: () => void
  onRequestComboAnalysis: (e: React.FormEvent<HTMLFormElement>) => void
}

export const RequestAnalysisUI: React.FC<RequestAnalysisUIProps> = ({
  isLoading,
  isDbEnabled,
  analysisType,
  analysisTypeLoading,
  fieldsVehicle,
  userType,
  companiesLoading,
  companiesSelectItems,
  vehicleAnalysisType,
  personAnalysis,
  controlPerson,
  controlVehicle,
  controlPlateHistory,
  controlSecondDriver,
  onChangeVehicleAnalysisType,
  onChangePersonAnalysis,
  onRequestPersonAnalysis,
  onRequestVehicleAnalysis,
  onChangeAnalysisType,
  addVehicleForm,
  removeVehicleForm,
  onRequestComboAnalysis,
  onRequestPlateHistoryAnalysis,
  onRequestSecondDriverAnalysis,
}) => {
  const showPersonForm = () =>
    personAnalysis?.some(
      (personAnalysis) =>
        personAnalysis.analysis_type.length > 0 ||
        personAnalysis.region_type === PersonRegionType.CNH_STATUS,
    )

  const renderPersonForm = () => (
    <>
      <AnalysisTypeSelect
        isDbEnabled={isDbEnabled}
        personAnalysis={personAnalysis}
        showCNHStatus
        onChangePersonAnalysis={onChangePersonAnalysis as never}
      />
      {showPersonForm() && (
        <PersonForm
          key={analysisType}
          control={controlPerson}
          userType={userType}
          analysisTypeLoading={analysisTypeLoading}
          companiesLoading={companiesLoading}
          companiesSelectItems={companiesSelectItems}
          onRequestAnalysis={onRequestPersonAnalysis}
        />
      )}
    </>
  )

  const renderVehicleForm = () =>
    fieldsVehicle.map((field: VehicleField, index: number) => (
      <VehiclesForm
        key={field.id + analysisType}
        controlVehicle={controlVehicle}
        controlPlateHistory={controlPlateHistory}
        controlSecondDriver={controlSecondDriver}
        userType={userType}
        analysisTypeLoading={analysisTypeLoading}
        companiesLoading={companiesLoading}
        companiesSelectItems={companiesSelectItems}
        onRequestAnalysis={onRequestVehicleAnalysis}
        analysisType={analysisType}
        addVehicleForm={addVehicleForm}
        removeVehicleForm={removeVehicleForm}
        vehiclesLength={fieldsVehicle.length}
        vehicleAnalysisType={vehicleAnalysisType}
        onChangeVehicleAnalysisType={onChangeVehicleAnalysisType}
        onRequestPlateHistoryAnalysis={onRequestPlateHistoryAnalysis}
        onRequestSecondDriverAnalysis={onRequestSecondDriverAnalysis}
        index={index}
      />
    ))

  const renderComboForm = () => (
    <>
      <AnalysisTypeSelect
        isDbEnabled={isDbEnabled}
        personAnalysis={personAnalysis}
        onChangePersonAnalysis={onChangePersonAnalysis as never}
      />
      {showPersonForm() && (
        <>
          <PersonForm
            key={analysisType}
            control={controlPerson}
            userType={userType}
            analysisTypeLoading={analysisTypeLoading}
            companiesLoading={companiesLoading}
            companiesSelectItems={companiesSelectItems}
            onRequestAnalysis={onRequestPersonAnalysis}
            analysisType={analysisType}
          />
          {fieldsVehicle.map((field: VehicleField, index: number) => (
            <VehiclesForm
              key={field.id + analysisType}
              controlVehicle={controlVehicle}
              userType={userType}
              analysisTypeLoading={analysisTypeLoading}
              companiesLoading={companiesLoading}
              companiesSelectItems={companiesSelectItems}
              controlSecondDriver={controlSecondDriver}
              onRequestAnalysis={onRequestComboAnalysis}
              analysisType={analysisType}
              addVehicleForm={addVehicleForm}
              removeVehicleForm={removeVehicleForm}
              vehiclesLength={fieldsVehicle.length}
              onRequestPlateHistoryAnalysis={onRequestPlateHistoryAnalysis}
              controlPlateHistory={controlPlateHistory}
              onChangeVehicleAnalysisType={onChangeVehicleAnalysisType}
              onRequestSecondDriverAnalysis={onRequestSecondDriverAnalysis}
              vehicleAnalysisType={vehicleAnalysisType}
              index={index}
            />
          ))}
        </>
      )}
    </>
  )

  if (isLoading) {
    return <LoadingContainer />
  }

  return (
    <>
      <Box title="Solicitação de Análise" radius="sm" containerClassName="mb-2">
        <SelectGroup
          title="Selecione a categoria da análise"
          items={analysisTypesItems}
          value={analysisType}
          onChange={onChangeAnalysisType}
        />
      </Box>

      {!!analysisType &&
        {
          [AnalysisType.PERSON]: renderPersonForm,
          [AnalysisType.VEHICLE]: renderVehicleForm,
          [AnalysisType.VEHICLE_PLATE_HISTORY]: renderVehicleForm,
          [AnalysisType.SECOND_DRIVER]: renderVehicleForm,
          [AnalysisType.COMBO]: renderComboForm,
        }[analysisType]()}
    </>
  )
}
