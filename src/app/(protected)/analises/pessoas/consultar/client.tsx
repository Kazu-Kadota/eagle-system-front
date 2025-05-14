'use client';

import {
  analysisAnswerSchema,
  type AnalysisAnswerSchema,
} from '@/app/(protected)/analises/pessoas/[id]/schema';
import { useCompaniesSelectItems } from '@/hooks/useCompanies';
import { usePersonAnalysisDetail } from '@/hooks/usePersonAnalysisDetail';
import { useToggle } from '@/hooks/useToggle';
import { AnalysisResult, UserType, type PersonAnalysis } from '@/models';
import { changeAnswerPersonAnalysis } from '@/services/analysis/answer';
import { searchPersonAnalysis } from '@/services/analysis/search';
import { useSessionUserType } from '@/store/session';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { hasUserType } from 'src/utils/userType';
import {
  analysisPersonSearchSchema,
  type AnalysisPersonSearchSchema,
} from './schema';
import { SearchPersonAnalysisUI } from './ui';

export const SearchPersonAnalysisClient = () => {
  const userType = useSessionUserType();

  const { control: controlSearch, handleSubmit: handleSearchSubmit } =
    useForm<AnalysisPersonSearchSchema>({
      resolver: zodResolver(analysisPersonSearchSchema),
      defaultValues: { searchDocument: '', companyNameSearch: '' },
    });

  const [items, setItems] = useState<PersonAnalysis[] | null>(null);
  const [selectedItem, setSelectedItem] = useState<PersonAnalysis | null>(null);
  const [isChangingAnwser, toggleChangeAnswer, setChangingAnswer] = useToggle();

  const {
    person,
    isLoading: isPersonLoading,
    refetch,
  } = usePersonAnalysisDetail({
    id: selectedItem?.request_id ?? '',
    personId: selectedItem?.person_id ?? '',
  });

  const { companiesSelectItems, isLoading: companiesLoading } =
    useCompaniesSelectItems({
      enabled: hasUserType(userType, UserType.ADMIN, UserType.OPERATOR),
    });

  const {
    control: controlEditAnswer,
    watch,
    handleSubmit: handleChangeAnswerSubmit,
  } = useForm<AnalysisAnswerSchema>({
    resolver: zodResolver(analysisAnswerSchema),
    values: {
      analysis_result: person?.analysis_result ?? AnalysisResult.APPROVED,
      analysis_info: person?.analysis_info ?? '',
      from_db: person?.from_db ?? false,
      confirmed: true,
    },
  });
  const changeAnswerResult = watch('analysis_result');

  const { isPending: isSubmitPending, mutate: onSubmit } = useMutation({
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

  const { isPending: isChangingAnswerPending, mutate: changeAnswer } =
    useMutation({
      mutationFn: async (data: AnalysisAnswerSchema) => {
        await changeAnswerPersonAnalysis({
          person_id: person.person_id,
          request_id: person.request_id,
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

  const onSelectItem = (item: PersonAnalysis) => {
    setSelectedItem(item);
    setChangingAnswer(false);
  };

  return (
    <SearchPersonAnalysisUI
      controlSearch={controlSearch}
      controlChangeAnswer={controlEditAnswer}
      changeAnswerResult={changeAnswerResult}
      isChangingAnwser={isChangingAnwser}
      isChangingAnswerLoading={isChangingAnswerPending}
      isPersonLoading={isPersonLoading}
      isLoading={isSubmitPending}
      userType={userType}
      companiesSelectItems={companiesSelectItems}
      companiesLoading={companiesLoading}
      items={items}
      selectedItem={person}
      setSelectedItem={onSelectItem}
      toggleChangeAnswer={toggleChangeAnswer}
      onSearchSubmit={handleSearchSubmit((data) => onSubmit(data))}
      onChangeAnswerSubmit={handleChangeAnswerSubmit((data) =>
        changeAnswer(data),
      )}
    />
  );
};
