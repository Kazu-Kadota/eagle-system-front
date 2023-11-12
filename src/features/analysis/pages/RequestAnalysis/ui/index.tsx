import { Control, FieldArrayWithId } from 'react-hook-form'
import {
  AnalysisType,
  PersonRegionType,
  RegionPersonAnalysis,
  UserType,
} from 'src/models'
import {
  AnalysisArrayVehicleSchema,
  AnalysisPersonSchema,
  PlateHistorySchema,
} from '../schema'
import { SelectItem } from 'src/types/select'
import {
  AnalysisTypeSelect,
  PersonForm,
  VehiclesForm,
} from 'src/features/analysis/components'
import { Box, Button, SelectGroup } from 'src/components'
import { analysisTypesItems } from 'src/features/analysis/constants/analysis'

type VehicleField = FieldArrayWithId<
  AnalysisArrayVehicleSchema,
  'vehicles',
  'id'
>

export interface RequestAnalysisUIProps {
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
  personAnalysis: RegionPersonAnalysis[]
  onChangePersonAnalysis: (value: RegionPersonAnalysis[]) => void
  addVehicleForm: () => void
  removeVehicleForm: (index: number) => void
  onRequestPersonAnalysis: () => void
  onRequestVehicleAnalysis: () => void
  onRequestPlateHistoryAnalysis: () => void
  onRequestComboAnalysis: () => void
}

export const RequestAnalysisUI: React.FC<RequestAnalysisUIProps> = ({
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
  onChangeVehicleAnalysisType,
  onChangePersonAnalysis,
  onRequestPersonAnalysis,
  onRequestVehicleAnalysis,
  onChangeAnalysisType,
  addVehicleForm,
  removeVehicleForm,
  onRequestComboAnalysis,
  onRequestPlateHistoryAnalysis,
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
        index={index}
      />
    ))

  const renderComboForm = () => (
    <>
      <AnalysisTypeSelect
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
              onRequestAnalysis={onRequestVehicleAnalysis}
              analysisType={analysisType}
              addVehicleForm={addVehicleForm}
              removeVehicleForm={removeVehicleForm}
              vehiclesLength={fieldsVehicle.length}
              onRequestPlateHistoryAnalysis={onRequestPlateHistoryAnalysis}
              controlPlateHistory={controlPlateHistory}
              onChangeVehicleAnalysisType={onChangeVehicleAnalysisType}
              vehicleAnalysisType={vehicleAnalysisType}
              index={index}
            />
          ))}
          <Button
            theme="success"
            size="xsStrong"
            shadow="base"
            className="mt-10 min-h-[2rem] min-w-[10rem] self-center"
            loading={analysisTypeLoading === AnalysisType.COMBO}
            onClick={onRequestComboAnalysis}
          >
            Solicitar
          </Button>
        </>
      )}
    </>
  )

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
          [AnalysisType.COMBO]: renderComboForm,
        }[analysisType]()}
    </>
  )
}
