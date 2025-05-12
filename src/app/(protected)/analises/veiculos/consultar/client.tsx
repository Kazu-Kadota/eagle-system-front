'use client';

import {
  analysisAnswerSchema,
  type AnalysisAnswerSchema,
} from '@/app/(protected)/analises/pessoas/[id]/schema';
import {
  analysisVehicleSearchSchema,
  type AnalysisVehicleSearchSchema,
} from '@/app/(protected)/analises/veiculos/consultar/schema';
import { SearchVehicleAnalysisUI } from '@/app/(protected)/analises/veiculos/consultar/ui';
import { useCompanies } from '@/hooks/useCompanies';
import { useToggle } from '@/hooks/useToggle';
import { useVehicleAnalysisDetail } from '@/hooks/useVehicleAnalysisDetail';
import { AnalysisResult, UserType, type VehicleAnalysis } from '@/models';
import { changeAnswerVehicleAnalysis } from '@/services/analysis/answer';
import { searchVehicleAnalysis } from '@/services/analysis/search';
import { useSessionUserType } from '@/store/session';
import { hasUserType } from '@/utils/userType';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export const SearchVehicleAnalysisClient = () => {
  const userType = useSessionUserType();

  const { control: controlSearch, handleSubmit: handleSearchSubmit } =
    useForm<AnalysisVehicleSearchSchema>({
      resolver: zodResolver(analysisVehicleSearchSchema),
      defaultValues: {
        plateSearch: '',
        plateStateSearch: '',
        companyNameSearch: '',
      },
    });

  const [selectedItem, setSelectedItem] = useState<VehicleAnalysis | null>(
    null,
  );
  const [isChangingAnwser, toggleChangeAnswer, setChangingAnswer] = useToggle();

  const {
    vehicle,
    isLoading: isVehicleLoading,
    refetch,
  } = useVehicleAnalysisDetail({
    id: selectedItem?.request_id ?? '',
    vehicleId: selectedItem?.vehicle_id ?? '',
  });

  const { companiesSelectItems, isLoading: companiesLoading } = useCompanies({
    enabled: hasUserType(userType, UserType.ADMIN, UserType.OPERATOR),
  });

  const {
    control: controlEditAnswer,
    watch,
    handleSubmit: handleChangeAnswerSubmit,
  } = useForm<AnalysisAnswerSchema>({
    resolver: zodResolver(analysisAnswerSchema),
    values: {
      analysis_result: vehicle?.analysis_result ?? AnalysisResult.APPROVED,
      analysis_info: vehicle?.analysis_info ?? '',
      from_db: vehicle?.from_db ?? false,
      confirmed: true,
    },
  });
  const changeAnswerResult = watch('analysis_result');

  const {
    data: items,
    isPending: isSubmitPending,
    mutate: onSubmit,
  } = useMutation({
    mutationFn: async (data: AnalysisVehicleSearchSchema) => {
      const response = await searchVehicleAnalysis({
        plate: data.plateSearch,
        plate_state: data.plateStateSearch,
        company_name: data.companyNameSearch || undefined,
      });

      return response.data ?? [];
    },
    onSuccess: (analysis) => {
      setSelectedItem(analysis.length === 1 ? analysis[0] : null);
    },
  });

  const { isPending: isChangingAnswerPending, mutate: changeAnswer } =
    useMutation({
      mutationFn: async (data: AnalysisAnswerSchema) => {
        await changeAnswerVehicleAnalysis({
          vehicle_id: vehicle.vehicle_id,
          request_id: vehicle.request_id,
          analysis_info: data.analysis_info ?? '',
          analysis_result: data.analysis_result,
          from_db: data.from_db,
        });
        await refetch();
      },
      onSuccess: () => {
        toggleChangeAnswer();
        toast.success('Resultado alterado com sucesso!');
      },
    });

  const onSelectItem = (item: VehicleAnalysis) => {
    setSelectedItem(item);
    setChangingAnswer(false);
  };

  return (
    <SearchVehicleAnalysisUI
      isVehicleLoading={isVehicleLoading}
      controlSearch={controlSearch}
      controlChangeAnswer={controlEditAnswer}
      changeAnswerResult={changeAnswerResult}
      isChangingAnwser={isChangingAnwser}
      isChangingAnswerLoading={isChangingAnswerPending}
      isLoading={isSubmitPending}
      userType={userType}
      companiesSelectItems={companiesSelectItems}
      companiesLoading={companiesLoading}
      items={items}
      selectedItem={vehicle}
      setSelectedItem={onSelectItem}
      toggleChangeAnswer={toggleChangeAnswer}
      onSearchSubmit={handleSearchSubmit((data) => onSubmit(data))}
      onChangeAnswerSubmit={handleChangeAnswerSubmit((data) =>
        changeAnswer(data),
      )}
    />
  );
};
