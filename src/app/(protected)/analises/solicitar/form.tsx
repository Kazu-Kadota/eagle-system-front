'use client';

import { RequestAnalysisFormUI } from '@/app/(protected)/analises/solicitar/form-ui';
import {
  analysisArrayVehicleSchema,
  analysisPersonSchema,
  basicVehicleFormSchema,
  type AnalysisArrayVehicleSchema,
  type AnalysisPersonSchema,
  type BasicVehicleFormSchema,
} from '@/app/(protected)/analises/solicitar/schema';
import {
  defaultBasicForm,
  defaultPerson,
  defaultVehicle,
  preparePersonAnalysis,
  preparePersonData,
  prepareVehicleData,
  validatePersonAnalysis,
} from '@/app/(protected)/analises/solicitar/utils';
import { RoutePaths } from '@/constants/paths';
import { useCompanies } from '@/hooks/useCompanies';
import { useMyCompany } from '@/hooks/useMyCompany';
import {
  AnalysisType,
  PersonRegionType,
  UserType,
  VehicleAnalysisType,
  type RegionPersonAnalysis,
} from '@/models';
import {
  requestAnalysisCombo,
  requestAnalysisPerson,
  requestAnalysisVehicle,
  requestBasicVehicleAnalysis,
} from '@/services/analysis/request';
import { useModal } from '@/store/modal/store';
import { useSessionUserType } from '@/store/session';
import { submitFormPromise } from '@/utils/form';
import { hasUserType } from '@/utils/userType';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

export function RequestAnalysisForm() {
  const router = useRouter();

  const modal = useModal();
  const userType = useSessionUserType();
  const isAdmin = hasUserType(userType, UserType.ADMIN);

  const searchParams = useSearchParams();
  const analysisTypeFromUrl = searchParams.get('analysisType') as AnalysisType;
  const regionTypeFromUrl = searchParams.get('regionType') as PersonRegionType;

  const [analysisType, setAnalysisType] = useState(
    analysisTypeFromUrl ?? AnalysisType.PERSON,
  );
  const [personAnalysis, setPersonAnalysis] = useState<RegionPersonAnalysis[]>(
    regionTypeFromUrl
      ? [{ region_type: regionTypeFromUrl, analysis_type: [], regions: [] }]
      : [],
  );
  const [vehicleAnalysisType, setVehicleAnalysisType] = useState(
    VehicleAnalysisType.SIMPLE,
  );

  const formValuesOnlyForValidation = {
    userType,
    analysisType,
  };

  const { featureFlags, isLoading: myCompanyLoading } = useMyCompany({
    isAdmin,
  });

  const { companiesSelectItems, isLoading: companiesLoading } = useCompanies({
    enabled: isAdmin,
  });

  const {
    control: controlPerson,
    reset: resetPerson,
    handleSubmit: handleSubmitPerson,
  } = useForm<AnalysisPersonSchema>({
    resolver: zodResolver(analysisPersonSchema),
    values: { ...defaultPerson, ...formValuesOnlyForValidation },
  });

  const {
    control: controlVehicle,
    reset: resetVehicle,
    handleSubmit: handleSubmitVehicle,
  } = useForm<AnalysisArrayVehicleSchema>({
    resolver: zodResolver(analysisArrayVehicleSchema),
    values: {
      vehicles: [{ ...defaultVehicle, ...formValuesOnlyForValidation }],
    },
  });

  const {
    fields: fieldsVehicle,
    append: appendVehicle,
    remove: removeVehicle,
  } = useFieldArray({
    name: 'vehicles',
    control: controlVehicle,
  });

  const {
    control: controlBasicFormVehicle,
    reset: resetBasicFormVehicle,
    handleSubmit: handleSubmitBasicFormVehicle,
  } = useForm<BasicVehicleFormSchema>({
    resolver: zodResolver(basicVehicleFormSchema),
    values: { ...defaultBasicForm, ...formValuesOnlyForValidation },
  });

  const handleClear = () => {
    resetPerson();
    resetVehicle();
    resetBasicFormVehicle();
    setPersonAnalysis([]);
    setVehicleAnalysisType(VehicleAnalysisType.SIMPLE);
    setAnalysisType(analysisTypeFromUrl ?? AnalysisType.PERSON);
  };

  const onSuccessRequestAnalysis = (analysisType: AnalysisType) => {
    const goBackRoute = {
      [AnalysisType.PERSON]: RoutePaths.PEOPLE_ANALYSIS_HOME,
      [AnalysisType.VEHICLE]: RoutePaths.VEHICLE_ANALYSIS_HOME,
      [AnalysisType.COMBO]: RoutePaths.PEOPLE_ANALYSIS_HOME,
    }[analysisType];

    modal.open({
      title: 'Solicitação enviada!',
      buttons: [
        { children: 'Fazer outra solicitação', onClick: handleClear },
        {
          children: 'Ir para página inicial',
          theme: 'dark',
          onClick: () => router.push(goBackRoute),
        },
      ],
    });
  };

  const { isPending: isPersonPending, mutate: onRequestPersonAnalysis } =
    useMutation({
      mutationFn: (data: AnalysisPersonSchema) => {
        const { isValid, msg } = validatePersonAnalysis(personAnalysis);

        if (!isValid) {
          throw new Error(msg);
        }

        return requestAnalysisPerson({
          person: preparePersonData(data),
          person_analysis: preparePersonAnalysis(
            personAnalysis,
            AnalysisType.PERSON,
          ),
        });
      },
      onSuccess: () => onSuccessRequestAnalysis(AnalysisType.PERSON),
    });

  const { isPending: isVehiclePending, mutate: onRequestVehicleAnalysis } =
    useMutation({
      mutationFn: ({ vehicles: [data] }: AnalysisArrayVehicleSchema) => {
        const { isValid, msg } = validatePersonAnalysis(personAnalysis);

        if (!isValid) {
          throw new Error(msg);
        }

        return requestAnalysisVehicle(prepareVehicleData(data));
      },
      onSuccess: () => onSuccessRequestAnalysis(AnalysisType.VEHICLE),
    });

  const { isPending: isComboPending, mutate: onRequestComboAnalysis } =
    useMutation({
      mutationFn: async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { isValid, msg } = validatePersonAnalysis(personAnalysis);

        if (!isValid) {
          throw new Error(msg);
        }

        const [personData, vehiclesData] = await Promise.all([
          submitFormPromise(handleSubmitPerson),
          submitFormPromise(handleSubmitVehicle),
        ]);

        if (!personData || !vehiclesData) {
          return;
        }

        return requestAnalysisCombo({
          combo_number: vehiclesData.vehicles.length,
          person: preparePersonData(personData),
          person_analysis: preparePersonAnalysis(
            personAnalysis,
            AnalysisType.COMBO,
          ),
          vehicles: vehiclesData.vehicles.map((data) =>
            prepareVehicleData(data, personData),
          ),
        });
      },
      onSuccess: () => onSuccessRequestAnalysis(AnalysisType.COMBO),
    });

  const {
    isPending: isBasicVehiclePending,
    mutate: onRequestBasicFormVehicle,
  } = useMutation({
    mutationFn: async (data: BasicVehicleFormSchema) =>
      requestBasicVehicleAnalysis(
        {
          plate: data.plate,
          plate_state: data.plate_state,
          company_name: data.company_name,
          owner_document: data.owner_document,
          owner_name: data.owner_name,
        },
        vehicleAnalysisType,
      ),
    onSuccess: () => onSuccessRequestAnalysis(AnalysisType.COMBO),
  });

  const handleAddVehicleForm = () =>
    appendVehicle({ ...defaultVehicle, ...formValuesOnlyForValidation });

  const handleChangePersonAnalysis = (analysis: RegionPersonAnalysis[]) => {
    setPersonAnalysis(analysis);
    setVehicleAnalysisType(VehicleAnalysisType.SIMPLE);
  };

  return (
    <RequestAnalysisFormUI
      isLoading={myCompanyLoading}
      featureFlags={featureFlags}
      userType={userType}
      analysisType={analysisType}
      personAnalysis={personAnalysis}
      vehicleAnalysisType={vehicleAnalysisType}
      isBasicVehicleLoading={isBasicVehiclePending}
      isComboLoading={isComboPending}
      isPersonLoading={isPersonPending}
      isVehicleLoading={isVehiclePending}
      fieldsVehicle={fieldsVehicle}
      companiesLoading={companiesLoading}
      companiesSelectItems={companiesSelectItems}
      controlPerson={controlPerson}
      controlVehicle={controlVehicle}
      controlBasicFormVehicle={controlBasicFormVehicle}
      onChangePersonAnalysis={handleChangePersonAnalysis}
      onChangeVehicleAnalysisType={setVehicleAnalysisType}
      onChangeAnalysisType={setAnalysisType}
      onRequestPersonAnalysis={handleSubmitPerson((data) =>
        onRequestPersonAnalysis(data),
      )}
      onRequestComboAnalysis={(e) => onRequestComboAnalysis(e)}
      onRequestVehicleAnalysis={handleSubmitVehicle((data) =>
        onRequestVehicleAnalysis(data),
      )}
      onRequestBasicFormVehicleAnalysis={handleSubmitBasicFormVehicle((data) =>
        onRequestBasicFormVehicle(data),
      )}
      addVehicleForm={handleAddVehicleForm}
      removeVehicleForm={removeVehicle}
    />
  );
}
