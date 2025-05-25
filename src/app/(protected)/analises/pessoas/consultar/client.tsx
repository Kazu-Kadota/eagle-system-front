'use client';

import { useCompanies } from '@/hooks/useCompanies';
import { UserType, type PersonAnalysis } from '@/models';
import { searchPersonAnalysis } from '@/services/analysis/search';
import { useSessionUserType } from '@/store/session';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { hasUserType } from 'src/utils/userType';
import {
  analysisPersonSearchSchema,
  type AnalysisPersonSearchSchema,
} from './schema';
import { SearchPersonAnalysisUI } from './ui';
import { usePersonAnalysisDetail } from '@/hooks/usePersonAnalysisDetail';

export const SearchPersonAnalysisClient = () => {
  const userType = useSessionUserType();

  const { control, getValues, handleSubmit } =
    useForm<AnalysisPersonSearchSchema>({
      resolver: zodResolver(analysisPersonSearchSchema),
      defaultValues: { searchDocument: '', companyNameSearch: '' },
    });

  const [items, setItems] = useState<PersonAnalysis[] | null>(null);
  const [selectedItem, setSelectedItem] = useState<PersonAnalysis | null>(null);

  const { person, isLoading: isPersonLoading } = usePersonAnalysisDetail({
    id: selectedItem?.request_id ?? '',
    personId: selectedItem?.person_id ?? '',
  });

  const { companiesSelectItems, isLoading: companiesLoading } = useCompanies({
    enabled: hasUserType(userType, UserType.ADMIN, UserType.OPERATOR),
  });

  const { isPending, mutate: onSubmit } = useMutation({
    mutationFn: (data: AnalysisPersonSearchSchema) =>
      searchPersonAnalysis({
        document: data.searchDocument,
        company_name: data.companyNameSearch || undefined,
      }),
    onSuccess: (response) => {
      const analysis = response.data ?? [];

      setItems(analysis);
      setSelectedItem(analysis.length === 1 ? analysis[0] : null);
    },
  });

  return (
    <SearchPersonAnalysisUI
      control={control}
      isPersonLoading={isPersonLoading}
      isLoading={isPending}
      userType={userType}
      companiesSelectItems={companiesSelectItems}
      companiesLoading={companiesLoading}
      items={items}
      selectedItem={person}
      document={getValues().searchDocument}
      setSelectedItem={setSelectedItem}
      onSearchSubmit={handleSubmit((data) => onSubmit(data))}
    />
  );
};
