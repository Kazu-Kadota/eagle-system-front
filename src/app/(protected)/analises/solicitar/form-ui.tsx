import type {
  AnalysisArrayVehicleSchema,
  AnalysisPersonSchema,
  BasicVehicleFormSchema,
} from '@/app/(protected)/analises/solicitar/schema';
import {
  AnalysisTypeSelect,
  statusWithoutOptions,
} from '@/components/AnalysisTypeSelect';
import { Box } from '@/components/Box';
import { LoadingContainer } from '@/components/LoadingContainer';
import { PersonForm } from '@/components/PersonForm';
import { SelectGroup } from '@/components/SelectGroup';
import { VehiclesForm } from '@/components/VehiclesForm';
import { analysisTypesItems } from '@/constants/analysis';
import {
  AnalysisType,
  type FeatureFlags,
  type RegionPersonAnalysis,
  type UserType,
  type VehicleAnalysisType,
} from '@/models';
import type { SelectItem } from '@/types/select';
import type { Control, FieldArrayWithId } from 'react-hook-form';

type VehicleField = FieldArrayWithId<
  AnalysisArrayVehicleSchema,
  'vehicles',
  'id'
>;

interface RequestAnalysisFormUIProps {
  isLoading: boolean;
  featureFlags: FeatureFlags;
  analysisType?: AnalysisType;
  isPersonLoading: boolean;
  isVehicleLoading: boolean;
  isComboLoading: boolean;
  isBasicVehicleLoading: boolean;
  vehicleAnalysisType: VehicleAnalysisType;
  onChangeVehicleAnalysisType: (value: VehicleAnalysisType) => void;
  fieldsVehicle: VehicleField[];
  userType?: UserType;
  companiesSelectItems: SelectItem[];
  companiesLoading: boolean;
  onChangeAnalysisType: (value: AnalysisType) => void;
  controlPerson: Control<AnalysisPersonSchema>;
  controlVehicle: Control<AnalysisArrayVehicleSchema>;
  controlBasicFormVehicle: Control<BasicVehicleFormSchema>;
  personAnalysis: RegionPersonAnalysis[];
  onChangePersonAnalysis: (value: RegionPersonAnalysis[]) => void;
  addVehicleForm: () => void;
  removeVehicleForm: (index: number) => void;
  onRequestPersonAnalysis: () => void;
  onRequestVehicleAnalysis: () => void;
  onRequestBasicFormVehicleAnalysis: () => void;
  onRequestComboAnalysis: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const RequestAnalysisFormUI: React.FC<RequestAnalysisFormUIProps> = ({
  isLoading,
  featureFlags,
  analysisType,
  isBasicVehicleLoading,
  isComboLoading,
  isPersonLoading,
  isVehicleLoading,
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
    );

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
          isSubmitLoading={isPersonLoading}
          companiesLoading={companiesLoading}
          companiesSelectItems={companiesSelectItems}
          onRequestAnalysis={onRequestPersonAnalysis}
        />
      )}
    </>
  );

  const renderVehicleForm = () =>
    fieldsVehicle.map((field: VehicleField, index: number) => (
      <VehiclesForm
        featureFlags={featureFlags}
        key={field.id + analysisType}
        controlVehicle={controlVehicle}
        controlBasicFormVehicle={controlBasicFormVehicle}
        userType={userType}
        isVehicleLoading={isVehicleLoading}
        isBasicVehicleLoading={isBasicVehicleLoading}
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
    ));

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
            isSubmitLoading={isComboLoading}
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
              isVehicleLoading={isComboLoading}
              isBasicVehicleLoading={isBasicVehicleLoading}
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
  );

  if (isLoading) {
    return <LoadingContainer />;
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
  );
};
