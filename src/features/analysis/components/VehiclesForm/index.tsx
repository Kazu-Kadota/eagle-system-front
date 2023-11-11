import { Control } from 'react-hook-form'
import { Button, ControlledInput, SelectGroup } from 'src/components'
import { AnalysisType, UserType } from 'src/models'
import { SelectItem } from 'src/types/select'
import { cn } from 'src/utils/classNames'
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
    <div
      key={AnalysisType.VEHICLE}
      className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-8"
    >
      <fieldset className="mt-3 flex-[2] lg:px-2">
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
              inputVariants={{ size: 'sm', theme: 'primaryLight' }}
              containerVariants={{ layout: 'row' }}
            />
          )}
        <ControlledInput
          control={controlVehicle}
          label="Nome do Proprietário"
          placeholder="Nome"
          name={`vehicles.${index}.owner_name`}
          required
          inputVariants={{ size: 'sm', theme: 'primaryLight' }}
          containerVariants={{ layout: 'row' }}
        />
        <ControlledInput
          control={controlVehicle}
          label="CPF/CNPJ do Proprietário"
          placeholder="XX.XXX.XXX/XXXX-XX"
          name={`vehicles.${index}.owner_document`}
          type="cpfOrCnpj"
          required
          inputVariants={{ size: 'sm', theme: 'primaryLight' }}
          containerVariants={{ layout: 'row' }}
        />
        <ControlledInput
          control={controlVehicle}
          label="Placa"
          placeholder="XXXXXXX"
          name={`vehicles.${index}.plate`}
          required
          type="plate"
          inputVariants={{ size: 'sm', theme: 'primaryLight' }}
          containerVariants={{ layout: 'row' }}
        />
        <ControlledInput
          control={controlVehicle}
          label="Estado da Placa do veículo"
          name={`vehicles.${index}.plate_state`}
          required
          items={estadosVehiclesSelectItems}
          inputVariants={{ size: 'sm', theme: 'primaryLight' }}
          containerVariants={{ layout: 'row' }}
        />
        <ControlledInput
          control={controlVehicle}
          label="Tipo de Veículo"
          name={`vehicles.${index}.vehicle_type`}
          required
          items={vehiclesTypesSelectItems}
          inputVariants={{ size: 'sm', theme: 'primaryLight' }}
          containerVariants={{ layout: 'row' }}
        />
        <ControlledInput
          control={controlVehicle}
          label="Modelo do Véiculo"
          placeholder="XXXXXXXXXX"
          name={`vehicles.${index}.vehicle_modal`}
          inputVariants={{ size: 'sm', theme: 'primaryLight' }}
          containerVariants={{ layout: 'row' }}
        />
        <ControlledInput
          control={controlVehicle}
          label="Nome do motorista"
          placeholder="Nome"
          name={`vehicles.${index}.driver_name`}
          inputVariants={{ size: 'sm', theme: 'primaryLight' }}
          containerVariants={{ layout: 'row' }}
        />
        <ControlledInput
          control={controlVehicle}
          label="Renavam"
          placeholder="XXXXXXXXXXXXXXXXXXXXXXX"
          name={`vehicles.${index}.renavam`}
          inputVariants={{ size: 'sm', theme: 'primaryLight' }}
          containerVariants={{ layout: 'row' }}
        />
        <ControlledInput
          control={controlVehicle}
          label="Chassi"
          placeholder="XXXXXXXXXXXXXXX"
          name={`vehicles.${index}.chassis`}
          inputVariants={{ size: 'sm', theme: 'primaryLight' }}
          containerVariants={{ layout: 'row' }}
        />
      </fieldset>
      <div className="flex-1">
        <div className="xs:gap-5 mb-1 flex flex-wrap justify-center gap-4 sm:flex-nowrap lg:mb-0 lg:w-max lg:flex-col lg:items-start">
          {analysisType === AnalysisType.COMBO ? (
            <>
              {index === vehiclesLength - 1 && (
                <Button
                  onClick={addVehicleForm}
                  className="shadow-3xl rounded-[0.2rem] lg:w-full"
                >
                  Adicionar veículo
                </Button>
              )}
              {vehiclesLength > 1 && (
                <Button
                  onClick={() => removeVehicleForm(index)}
                  className="shadow-3xl rounded-[0.2rem] lg:w-full"
                >
                  Remover veículo
                </Button>
              )}
            </>
          ) : (
            <Button
              onClick={onRequestAnalysis}
              className="shadow-3xl rounded-[0.2rem] lg:w-full"
              loading={analysisTypeLoading === AnalysisType.VEHICLE}
            >
              Solicitar análise de veículo
            </Button>
          )}
        </div>
      </div>
    </div>
  )

  const renderPlateHistoryForm = () => (
    <div
      key={AnalysisType.VEHICLE_PLATE_HISTORY}
      className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-8"
    >
      <fieldset className="mt-3 flex-[2] lg:px-2">
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
              inputVariants={{ size: 'sm', theme: 'primaryLight' }}
              containerVariants={{ layout: 'row' }}
            />
          )}
        <ControlledInput
          control={controlPlateHistory}
          label="Nome do Proprietário"
          placeholder="Nome"
          name="owner_name"
          required
          inputVariants={{ size: 'sm', theme: 'primaryLight' }}
          containerVariants={{ layout: 'row' }}
        />
        <ControlledInput
          control={controlPlateHistory}
          label="CPF/CNPJ do Proprietário"
          placeholder="XX.XXX.XXX/XXXX-XX"
          name="owner_document"
          type="cpfOrCnpj"
          required
          inputVariants={{ size: 'sm', theme: 'primaryLight' }}
          containerVariants={{ layout: 'row' }}
        />
        <ControlledInput
          control={controlPlateHistory}
          label="Placa"
          placeholder="XXXXXXX"
          name="plate"
          required
          type="plate"
          inputVariants={{ size: 'sm', theme: 'primaryLight' }}
          containerVariants={{ layout: 'row' }}
        />
        <ControlledInput
          control={controlPlateHistory}
          label="Estado da Placa do veículo"
          name="plate_state"
          required
          items={estadosVehiclesSelectItems}
          inputVariants={{ size: 'sm', theme: 'primaryLight' }}
          containerVariants={{ layout: 'row' }}
        />
      </fieldset>
      <div className="flex-1">
        <div className="xs:gap-5 mb-1 flex flex-wrap justify-center gap-4 sm:flex-nowrap lg:mb-0 lg:w-max lg:flex-col lg:items-start">
          <Button
            title=""
            onClick={onRequestPlateHistoryAnalysis}
            className="shadow-3xl rounded-[0.2rem] lg:w-full"
            loading={analysisTypeLoading === AnalysisType.VEHICLE_PLATE_HISTORY}
          >
            Solicitar análise de veículo
          </Button>
        </div>
      </div>
    </div>
  )

  return (
    <div
      className={cn(
        'bg-modal relative px-4 pb-5 lg:px-6',
        index === 0
          ? 'mt-6 rounded-xl pt-5'
          : 'z before:bg-modal rounded-b-xl before:absolute before:inset-x-0 before:-top-2 before:block before:h-2 after:absolute after:inset-0 after:-top-[0.2rem] after:block after:h-[1px] after:bg-primary',
      )}
    >
      {index === 0 && (
        <h2 className="mb-1 flex items-center gap-2 text-base font-bold text-primary">
          Insira os dados do veículo nos campos abaixo
        </h2>
      )}
      {analysisType !== AnalysisType.COMBO && (
        <SelectGroup
          title="Tipo da análise:"
          value={vehicleAnalysisType}
          onChange={onChangeVehicleAnalysisType}
          items={vehicleAnalysisSelectItems}
          styleType="row"
          className="mb-4 mt-5"
        />
      )}
      {index === 0 && (
        <small className=" text-primary/60">
          Campos com * são obrigatórios para a solicitação
        </small>
      )}
      {{
        [AnalysisType.VEHICLE]: renderVehicleForm,
        [AnalysisType.VEHICLE_PLATE_HISTORY]: renderPlateHistoryForm,
        [AnalysisType.COMBO]: returnNull,
        [AnalysisType.PERSON]: returnNull,
      }[vehicleAnalysisType]()}
    </div>
  )
}
