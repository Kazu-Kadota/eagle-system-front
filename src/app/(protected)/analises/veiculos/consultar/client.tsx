'use client';

import {
  analysisVehicleSearchSchema,
  type AnalysisVehicleSearchSchema,
} from '@/app/(protected)/analises/veiculos/consultar/schema';
import { SearchVehicleAnalysisUI } from '@/app/(protected)/analises/veiculos/consultar/ui';
import { useCompanies } from '@/hooks/useCompanies';
import { UserType, type VehicleAnalysis } from '@/models';
import { searchVehicleAnalysis } from '@/services/analysis/search';
import { useSessionUserType } from '@/store/session';
import { hasUserType } from '@/utils/userType';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const SearchVehicleAnalysisClient = () => {
  const userType = useSessionUserType();

  const { control, handleSubmit } = useForm<AnalysisVehicleSearchSchema>({
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

  const { companiesSelectItems, isLoading: companiesLoading } = useCompanies({
    enabled: hasUserType(userType, UserType.ADMIN, UserType.OPERATOR),
  });

  const {
    data: items,
    isPending,
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

  return (
    <SearchVehicleAnalysisUI
      control={control}
      isLoading={isPending}
      userType={userType}
      companiesSelectItems={companiesSelectItems}
      companiesLoading={companiesLoading}
      items={items}
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
      onSearchSubmit={handleSubmit((data) => onSubmit(data))}
    />
  );
};
