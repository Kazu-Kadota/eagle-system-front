import { Control } from 'react-hook-form'
import { TrashIcon } from 'src/assets/icons'
import {
  Box,
  Button,
  Clickable,
  ControlledInput,
  InputRow,
  SelectGroup,
} from 'src/components'
import {
  AnalysisType,
  FeatureFlags,
  UserType,
  VehicleAnalysisType,
} from 'src/models'
import { SelectItem } from 'src/types/select'
import { cn } from 'src/utils/classNames'
import { hasUserType } from 'src/utils/userType'
import {
  getVehicleAnalysisSelectItems,
  vehiclesTypesSelectItems,
} from '../../constants/analysis'
import { estadosVehiclesSelectItems } from '../../constants/estados'
import {
  AnalysisArrayVehicleSchema,
  BasicVehicleFormSchema,
} from '../../pages/RequestAnalysis/schema'

interface VehiclesFormProps {
  featureFlags: FeatureFlags
  analysisTypeLoading: AnalysisType | VehicleAnalysisType | null
  controlVehicle: Control<AnalysisArrayVehicleSchema>
  controlBasicFormVehicle: Control<BasicVehicleFormSchema>
  vehicleAnalysisType: VehicleAnalysisType
  analysisType?: AnalysisType
  userType?: UserType
  companiesSelectItems: SelectItem[]
  companiesLoading: boolean
  vehiclesLength: number
  index: number
  onChangeVehicleAnalysisType: (value: VehicleAnalysisType) => void
  onRequestAnalysis: (e: React.FormEvent<HTMLFormElement>) => void
  onRequestBasicFormVehicleAnalysis: () => void
  addVehicleForm: () => void
  removeVehicleForm: (index: number) => void
}

export const VehiclesForm: React.FC<VehiclesFormProps> = ({
  featureFlags,
  analysisTypeLoading,
  userType,
  companiesLoading,
  companiesSelectItems,
  vehicleAnalysisType,
  analysisType,
  index,
  vehiclesLength,
  controlVehicle,
  controlBasicFormVehicle,
  onChangeVehicleAnalysisType,
  onRequestAnalysis,
  addVehicleForm,
  removeVehicleForm,
  onRequestBasicFormVehicleAnalysis,
}) => {
  const renderVehicleForm = () => (
    <div className="flex">
      <form
        key={analysisType}
        className={cn(
          'flex flex-1 flex-col gap-3 sm:gap-4',
          analysisType !== AnalysisType.COMBO && 'mt-4',
        )}
        onSubmit={onRequestAnalysis}
      >
        <InputRow>
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
        </InputRow>

        <InputRow>
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
        </InputRow>

        <InputRow>
          <ControlledInput
            control={controlVehicle}
            label="Tipo de Veículo"
            name={`vehicles.${index}.vehicle_type`}
            required
            items={vehiclesTypesSelectItems}
            inputVariants={{ size: 'sm' }}
            labelVariants={{ size: 'sm' }}
            containerVariants={{ layout: 'row' }}
            containerClassName="flex-[0_0_auto] sm:min-w-[20rem]"
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
        </InputRow>

        <InputRow>
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
        </InputRow>

        <div className="mt-4 flex items-center justify-center gap-3">
          {analysisType === AnalysisType.COMBO &&
            index === vehiclesLength - 1 && (
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

          {index === vehiclesLength - 1 && (
            <Button
              type="submit"
              theme="success"
              size="xsStrong"
              shadow="base"
              className="min-w-[10rem] self-center"
              loading={
                analysisTypeLoading === AnalysisType.VEHICLE ||
                analysisTypeLoading === AnalysisType.COMBO
              }
            >
              Solicitar
            </Button>
          )}
        </div>
      </form>
      {analysisType === AnalysisType.COMBO && vehiclesLength > 1 && (
        <Clickable
          className="-mr-1 self-center pl-3 sm:mr-0 sm:pl-4"
          onClick={() => removeVehicleForm(index)}
        >
          <TrashIcon className="w-5 fill-placeholder" />
        </Clickable>
      )}
    </div>
  )

  const renderBasicForm = () => (
    <form
      key={analysisType}
      className={cn(
        'flex flex-col gap-3 sm:gap-4',
        analysisType !== AnalysisType.COMBO && 'mt-4',
      )}
      onSubmit={onRequestBasicFormVehicleAnalysis}
    >
      <InputRow>
        {hasUserType(userType, UserType.ADMIN) &&
          analysisType !== AnalysisType.COMBO && (
            <ControlledInput
              control={controlBasicFormVehicle}
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
          control={controlBasicFormVehicle}
          label="Nome do Proprietário"
          placeholder="Nome"
          name="owner_name"
          required
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-[3]"
        />
      </InputRow>

      <InputRow>
        <ControlledInput
          control={controlBasicFormVehicle}
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
          control={controlBasicFormVehicle}
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
          control={controlBasicFormVehicle}
          label="Estado da Placa do veículo"
          name="plate_state"
          required
          items={estadosVehiclesSelectItems}
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
        />
      </InputRow>

      <Button
        theme="success"
        size="xsStrong"
        shadow="base"
        className="mt-2 min-w-[10rem] self-center"
        loading={analysisTypeLoading === vehicleAnalysisType}
        onClick={onRequestBasicFormVehicleAnalysis}
      >
        Solicitar
      </Button>
    </form>
  )

  return (
    <Box
      spacing="sm"
      containerClassName={
        analysisType !== AnalysisType.COMBO ? 'mb-2' : '-mb-5'
      }
    >
      {index === 0 ? (
        <>
          <h2 className="text-sm font-bold text-dark">
            Insira os dados do veículo nos campos abaixo
          </h2>
          <small className="mb-4 mt-0.5 block text-placeholder/80">
            Campos com * são obrigatórios para a solicitação
          </small>
        </>
      ) : (
        <span className="-mt-5 mb-6 mr-8 border border-primary" />
      )}

      {analysisType !== AnalysisType.COMBO && (
        <SelectGroup
          title="Tipo da análise:"
          layout="row"
          value={vehicleAnalysisType}
          onChange={onChangeVehicleAnalysisType}
          items={getVehicleAnalysisSelectItems(featureFlags)}
          containerClassName="sm:mb-2"
        />
      )}

      {{
        [VehicleAnalysisType.SIMPLE]: renderVehicleForm,
        [VehicleAnalysisType.ANTT]: renderBasicForm,
        [VehicleAnalysisType.BASIC_DATA]: renderBasicForm,
        [VehicleAnalysisType.VEHICLE_PLATE_HISTORY]: renderBasicForm,
        [VehicleAnalysisType.VEHICLE_SECOND_DRIVER]: renderBasicForm,
      }[vehicleAnalysisType]()}
    </Box>
  )
}
