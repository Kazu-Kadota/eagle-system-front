'use client';

import {
  analysisAnswerSchema,
  type AnalysisAnswerSchema,
} from '@/app/(protected)/analises/pessoas/[id]/schema';
import { PersonAnalysisAnswerUI } from '@/app/(protected)/analises/pessoas/[id]/ui';
import { usePersonAnalysisDetail } from '@/hooks/usePersonAnalysisDetail';
import { AnalysisResult, AnalysisStatus, AnalysisType } from '@/models';
import { sendAnalysis } from '@/services/analysis/answer';
import { useModal } from '@/store/modal/store';
import { useSessionUserType } from '@/store/session';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

type Params = { id: string };

export const PersonAnalysisAnswerClient = () => {
  const modal = useModal();
  const userType = useSessionUserType();

  const { id } = useParams<Params>();
  const searchParams = useSearchParams();

  const { person, isLoading, updatePersonAnalysis } = usePersonAnalysisDetail({
    id,
    personId: searchParams.get('personId') ?? '',
  });

  const { control, watch, handleSubmit } = useForm<AnalysisAnswerSchema>({
    resolver: zodResolver(analysisAnswerSchema),
    values: {
      analysis_result: person?.analysis_result ?? AnalysisResult.APPROVED,
      analysis_info: person?.analysis_info ?? '',
      from_db: person?.from_db ?? false,
      confirmed: false,
    },
  });

  const analysisResult = watch('analysis_result');

  const sendAnalysisMutation = useMutation({
    mutationFn: (data: AnalysisAnswerSchema) =>
      sendAnalysis({
        id: person!.request_id,
        person_id: person!.person_id,
        analysisCategory: AnalysisType.PERSON,
        analysis_info: data.analysis_info || undefined,
        analysis_result: data.analysis_result,
        from_db: data.from_db,
      }),
    onSuccess: (_, data) => {
      modal.open({
        title: 'Analise enviada com\nsucesso!',
        buttons: [
          {
            children: 'OK',
            onClick: modal.close,
          },
        ],
      });

      updatePersonAnalysis({
        ...person,
        analysis_result: data.analysis_result,
        analysis_info: data.analysis_info ?? '',
        from_db: data.from_db,
        status: AnalysisStatus.FINISHED,
      });
    },
  });

  return (
    <PersonAnalysisAnswerUI
      control={control}
      person={person}
      userType={userType}
      analysisResult={analysisResult}
      isLoading={isLoading}
      isSendAnalysisLoading={sendAnalysisMutation.isPending}
      onSubmit={handleSubmit((data) => sendAnalysisMutation.mutate(data))}
    />
  );
};
