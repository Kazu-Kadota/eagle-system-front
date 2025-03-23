import type {
  AnalysisArrayVehicleSchema,
  BasicVehicleFormSchema,
} from '@/app/(protected)/analises/solicitar/schema';
import { TrashIcon } from '@/assets/icons/TrashIcon';
import { Box } from '@/components/Box';
import { Button } from '@/components/Button';
import { Clickable } from '@/components/Clickable';
import { ControlledInput } from '@/components/ControlledInput';
import { InputRow } from '@/components/InputRow';
import { SelectGroup } from '@/components/SelectGroup';
import {
  getVehicleAnalysisSelectItems,
  vehiclesTypesSelectItems,
} from '@/constants/analysis';
import { estadosVehiclesSelectItems } from '@/constants/estados';
import {
  AnalysisType,
  UserType,
  VehicleAnalysisType,
  type FeatureFlags,
} from '@/models';
import type { SelectItem } from '@/types/select';
import { cn } from '@/utils/classNames';
import { hasUserType } from '@/utils/userType';
import type { Control } from 'react-hook-form';

interface VehiclesFormProps {
  featureFlags: FeatureFlags;
  controlVehicle: Control<AnalysisArrayVehicleSchema>;
  controlBasicFormVehicle: Control<BasicVehicleFormSchema>;
  vehicleAnalysisType: VehicleAnalysisType;
  analysisType?: AnalysisType;
  userType?: UserType;
  companiesSelectItems: SelectItem[];
  companiesLoading: boolean;
  vehiclesLength: number;
  index: number;
  isVehicleLoading: boolean;
  isBasicVehicleLoading: boolean;
  onChangeVehicleAnalysisType: (value: VehicleAnalysisType) => void;
  onRequestAnalysis: (e: React.FormEvent<HTMLFormElement>) => void;
  onRequestBasicFormVehicleAnalysis: () => void;
  addVehicleForm: () => void;
  removeVehicleForm: (index: number) => void;
}

export const VehiclesForm: React.FC<VehiclesFormProps> = ({
  featureFlags,
  isVehicleLoading,
  isBasicVehicleLoading,
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
              loading={isVehicleLoading}
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
  );

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
        {vehicleAnalysisType === VehicleAnalysisType.VEHICLE_PLATE_HISTORY && (
          <ControlledInput
            control={controlBasicFormVehicle}
            label="Estado da Análise"
            name="region"
            required
            items={estadosVehiclesSelectItems}
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
          containerClassName="flex-[2]"
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
        loading={isBasicVehicleLoading}
        onClick={onRequestBasicFormVehicleAnalysis}
      >
        Solicitar
      </Button>
    </form>
  );

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
  );
};
