import { Control, FieldArrayWithId } from 'react-hook-form'
import { Box, LoadingContainer, SelectGroup } from 'src/components'
import {
  AnalysisTypeSelect,
  PersonForm,
  statusWithoutOptions,
  VehiclesForm,
} from 'src/features/analysis/components'
import { analysisTypesItems } from 'src/features/analysis/constants/analysis'
import {
  AnalysisType,
  FeatureFlags,
  RegionPersonAnalysis,
  UserType,
  VehicleAnalysisType,
} from 'src/models'
import { SelectItem } from 'src/types/select'
import {
  AnalysisArrayVehicleSchema,
  AnalysisPersonSchema,
  BasicVehicleFormSchema,
} from '../schema'

type VehicleField = FieldArrayWithId<
  AnalysisArrayVehicleSchema,
  'vehicles',
  'id'
>

export interface RequestAnalysisUIProps {
  isLoading: boolean
  featureFlags: FeatureFlags
  analysisType?: AnalysisType
  analysisTypeLoading: AnalysisType | VehicleAnalysisType | null
  vehicleAnalysisType: VehicleAnalysisType
  onChangeVehicleAnalysisType: (value: VehicleAnalysisType) => void
  fieldsVehicle: VehicleField[]
  userType?: UserType
  companiesSelectItems: SelectItem[]
  companiesLoading: boolean
  onChangeAnalysisType: (value: AnalysisType) => void
  controlPerson: Control<AnalysisPersonSchema>
  controlVehicle: Control<AnalysisArrayVehicleSchema>
  controlBasicFormVehicle: Control<BasicVehicleFormSchema>
  personAnalysis: RegionPersonAnalysis[]
  onChangePersonAnalysis: (value: RegionPersonAnalysis[]) => void
  addVehicleForm: () => void
  removeVehicleForm: (index: number) => void
  onRequestPersonAnalysis: () => void
  onRequestVehicleAnalysis: () => void
  onRequestBasicFormVehicleAnalysis: () => void
  onRequestComboAnalysis: (e: React.FormEvent<HTMLFormElement>) => void
}

export const RequestAnalysisUI: React.FC<RequestAnalysisUIProps> = ({
  isLoading,
  featureFlags,
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
  controlBasicFormVehicle,
  onChangeVehicleAnalysisType,
  onChangePersonAnalysis,
  onRequestPersonAnalysis,
  onRequestVehicleAnalysis,
  onChangeAnalysisType,
  addVehicleForm,
  removeVehicleForm,
  onRequestComboAnalysis,
  onRequestBasicFormVehicleAnalysis,
}) => {
  const showPersonForm = () =>
    personAnalysis?.some(
      (personAnalysis) =>
        personAnalysis.analysis_type.length > 0 ||
        (analysisType !== AnalysisType.COMBO &&
          statusWithoutOptions.includes(personAnalysis.region_type)),
    )

  const renderPersonForm = () => (
    <>
      <AnalysisTypeSelect
        analysisType={AnalysisType.PERSON}
        featureFlags={featureFlags}
        personAnalysis={personAnalysis}
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
        featureFlags={featureFlags}
        key={field.id + analysisType}
        controlVehicle={controlVehicle}
        controlBasicFormVehicle={controlBasicFormVehicle}
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
        onRequestBasicFormVehicleAnalysis={onRequestBasicFormVehicleAnalysis}
        index={index}
      />
    ))

  const renderComboForm = () => (
    <>
      <AnalysisTypeSelect
        featureFlags={featureFlags}
        analysisType={AnalysisType.COMBO}
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
              featureFlags={featureFlags}
              key={field.id + analysisType}
              controlVehicle={controlVehicle}
              userType={userType}
              analysisTypeLoading={analysisTypeLoading}
              companiesLoading={companiesLoading}
              companiesSelectItems={companiesSelectItems}
              controlBasicFormVehicle={controlBasicFormVehicle}
              onRequestAnalysis={onRequestComboAnalysis}
              analysisType={analysisType}
              addVehicleForm={addVehicleForm}
              removeVehicleForm={removeVehicleForm}
              vehiclesLength={fieldsVehicle.length}
              onRequestBasicFormVehicleAnalysis={
                onRequestBasicFormVehicleAnalysis
              }
              onChangeVehicleAnalysisType={onChangeVehicleAnalysisType}
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
          [AnalysisType.COMBO]: renderComboForm,
        }[analysisType]()}
    </>
  )
}
