import { Control } from 'react-hook-form'
import { Box, Button, ControlledInput, SelectGroup } from 'src/components'
import { AnalysisType, UserType } from 'src/models'
import { SelectItem } from 'src/types/select'
import { hasUserType } from 'src/utils/userType'
import { returnNull } from 'src/utils/utils'
import {
  vehicleAnalysisSelectItems,
  vehiclesTypesSelectItems,
} from '../../constants/analysis'
import { estadosVehiclesSelectItems } from '../../constants/estados'
import {
  AnalysisArrayVehicleSchema,
  PlateHistorySchema,
} from '../../pages/RequestAnalysis/schema'
import { cn } from 'src/utils/classNames'

interface VehiclesFormProps {
  analysisTypeLoading: AnalysisType | null
  controlVehicle: Control<AnalysisArrayVehicleSchema>
  controlPlateHistory: Control<PlateHistorySchema>
  vehicleAnalysisType: AnalysisType
  analysisType?: AnalysisType
  userType?: UserType
  companiesSelectItems: SelectItem[]
  companiesLoading: boolean
  vehiclesLength: number
  index: number
  onChangeVehicleAnalysisType: (value: AnalysisType) => void
  onRequestAnalysis: () => void
  onRequestPlateHistoryAnalysis: () => void
  addVehicleForm: () => void
  removeVehicleForm: (index: number) => void
}

export const VehiclesForm: React.FC<VehiclesFormProps> = ({
  analysisTypeLoading,
  userType,
  companiesLoading,
  companiesSelectItems,
  vehicleAnalysisType,
  analysisType,
  index,
  vehiclesLength,
  controlPlateHistory,
  controlVehicle,
  onChangeVehicleAnalysisType,
  onRequestAnalysis,
  addVehicleForm,
  removeVehicleForm,
  onRequestPlateHistoryAnalysis,
}) => {
  const renderVehicleForm = () => (
    <form
      key={AnalysisType.VEHICLE}
      className={cn(
        'flex flex-col gap-4',
        analysisType !== AnalysisType.COMBO && 'mt-4',
      )}
      onSubmit={onRequestAnalysis}
    >
      <fieldset className="flex flex-col gap-4 xl:flex-row">
        {hasUserType(userType, UserType.ADMIN) &&
          analysisType !== AnalysisType.COMBO && (
            <ControlledInput
              control={controlVehicle}
              label="Empresa"
              placeholder="Selecione uma empresa"
              name={`vehicles.${index}.company_name`}
              required
              items={companiesSelectItems}
              loading={companiesLoading}
              inputVariants={{ size: 'sm' }}
              labelVariants={{ size: 'sm' }}
              containerVariants={{ layout: 'row' }}
              containerClassName="flex-1"
            />
          )}
        <ControlledInput
          control={controlVehicle}
          label="Nome do Proprietário"
          placeholder="Nome"
          name={`vehicles.${index}.owner_name`}
          required
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-[3]"
        />
      </fieldset>

      <fieldset className="flex flex-col gap-4 xl:flex-row">
        <ControlledInput
          control={controlVehicle}
          label="CPF/CNPJ do Proprietário"
          placeholder="XX.XXX.XXX/XXXX-XX"
          name={`vehicles.${index}.owner_document`}
          type="cpfOrCnpj"
          required
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
        />
        <ControlledInput
          control={controlVehicle}
          label="Placa"
          placeholder="XXXXXXX"
          name={`vehicles.${index}.plate`}
          required
          type="plate"
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
        />
        <ControlledInput
          control={controlVehicle}
          label="Estado da Placa do veículo"
          name={`vehicles.${index}.plate_state`}
          required
          items={estadosVehiclesSelectItems}
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
        />
      </fieldset>

      <fieldset className="flex flex-col gap-4 xl:flex-row">
        <ControlledInput
          control={controlVehicle}
          label="Tipo de Veículo"
          name={`vehicles.${index}.vehicle_type`}
          required
          items={vehiclesTypesSelectItems}
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-[0_0_auto] min-w-[20rem]"
        />
        <ControlledInput
          control={controlVehicle}
          label="Nome do motorista"
          placeholder="Nome"
          name={`vehicles.${index}.driver_name`}
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
        />
        <ControlledInput
          control={controlVehicle}
          label="Modelo do Véiculo"
          placeholder="XXXXXXXXXX"
          name={`vehicles.${index}.vehicle_modal`}
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-[0_0_auto] min-w-[30rem]"
        />
      </fieldset>

      <fieldset className="flex flex-col gap-4 xl:flex-row">
        <ControlledInput
          control={controlVehicle}
          label="Renavam"
          placeholder="XXXXXXXXXXXXXXXXXXXXXXX"
          name={`vehicles.${index}.renavam`}
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
        />
        <ControlledInput
          control={controlVehicle}
          label="Chassi"
          placeholder="XXXXXXXXXXXXXXX"
          name={`vehicles.${index}.chassis`}
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
        />
      </fieldset>
      <div className="mt-2 flex items-center justify-center gap-3">
        {analysisType === AnalysisType.COMBO ? (
          <>
            {vehiclesLength > 1 && (
              <Button
                theme="error"
                size="xsStrong"
                shadow="base"
                className="min-w-[10rem] self-center"
                onClick={() => removeVehicleForm(index)}
              >
                Remover veículo
              </Button>
            )}
            {index === vehiclesLength - 1 && (
              <Button
                theme="placeholder"
                size="xsStrong"
                shadow="base"
                className="min-w-[10rem] self-center"
                onClick={addVehicleForm}
              >
                Adicionar veículo
              </Button>
            )}
          </>
        ) : (
          <Button
            type="submit"
            theme="success"
            size="xsStrong"
            shadow="base"
            className="min-w-[10rem] self-center"
            loading={analysisTypeLoading === AnalysisType.VEHICLE}
          >
            Solicitar
          </Button>
        )}
      </div>
    </form>
  )

  const renderPlateHistoryForm = () => (
    <form
      key={AnalysisType.VEHICLE_PLATE_HISTORY}
      className={cn(
        'flex flex-col gap-4',
        analysisType !== AnalysisType.COMBO && 'mt-4',
      )}
      onSubmit={onRequestPlateHistoryAnalysis}
    >
      <fieldset className="flex flex-col gap-4 xl:flex-row">
        {hasUserType(userType, UserType.ADMIN) &&
          analysisType !== AnalysisType.COMBO && (
            <ControlledInput
              control={controlPlateHistory}
              label="Empresa"
              placeholder="Selecione uma empresa"
              name="company_name"
              required
              items={companiesSelectItems}
              loading={companiesLoading}
              inputVariants={{ size: 'sm' }}
              labelVariants={{ size: 'sm' }}
              containerVariants={{ layout: 'row' }}
              containerClassName="flex-1"
            />
          )}
        <ControlledInput
          control={controlPlateHistory}
          label="Nome do Proprietário"
          placeholder="Nome"
          name="owner_name"
          required
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-[3]"
        />
      </fieldset>

      <fieldset className="flex flex-col gap-4 xl:flex-row">
        <ControlledInput
          control={controlPlateHistory}
          label="CPF/CNPJ do Proprietário"
          placeholder="XX.XXX.XXX/XXXX-XX"
          name="owner_document"
          type="cpfOrCnpj"
          required
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
        />
        <ControlledInput
          control={controlPlateHistory}
          label="Placa"
          placeholder="XXXXXXX"
          name="plate"
          required
          type="plate"
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
        />
        <ControlledInput
          control={controlPlateHistory}
          label="Estado da Placa do veículo"
          name="plate_state"
          required
          items={estadosVehiclesSelectItems}
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
        />
      </fieldset>

      <Button
        theme="success"
        size="xsStrong"
        shadow="base"
        className="mt-2 min-w-[10rem] self-center"
        loading={analysisTypeLoading === AnalysisType.VEHICLE_PLATE_HISTORY}
        onClick={onRequestPlateHistoryAnalysis}
      >
        Solicitar
      </Button>
    </form>
  )

  return (
    <Box
      spacing="sm"
      containerClassName={
        analysisType !== AnalysisType.COMBO ? 'mb-2' : '-mb-4'
      }
    >
      {index === 0 && (
        <>
          <h2 className="text-sm font-bold text-dark">
            Insira os dados do veículo nos campos abaixo
          </h2>
          <small className="mb-4 mt-0.5 block text-placeholder/80">
            Campos com * são obrigatórios para a solicitação
          </small>
        </>
      )}

      {analysisType !== AnalysisType.COMBO && (
        <SelectGroup
          title="Tipo da análise:"
          layout="row"
          value={vehicleAnalysisType}
          onChange={onChangeVehicleAnalysisType}
          items={vehicleAnalysisSelectItems}
          containerClassName="mb-2"
        />
      )}

      {{
        [AnalysisType.VEHICLE]: renderVehicleForm,
        [AnalysisType.VEHICLE_PLATE_HISTORY]: renderPlateHistoryForm,
        [AnalysisType.COMBO]: returnNull,
        [AnalysisType.PERSON]: returnNull,
      }[vehicleAnalysisType]()}
    </Box>
  )
}
