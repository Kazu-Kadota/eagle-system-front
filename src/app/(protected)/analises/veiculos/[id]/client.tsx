'use client';

import {
  analysisAnswerSchema,
  type AnalysisAnswerSchema,
} from '@/app/(protected)/analises/pessoas/[id]/schema';
import { VehicleAnalysisAnswerUI } from '@/app/(protected)/analises/veiculos/[id]/ui';
import { useVehicleAnalysisDetail } from '@/hooks/useVehicleAnalysisDetail';
import { AnalysisResult, AnalysisStatus, AnalysisType } from '@/models';
import { sendAnalysis } from '@/services/analysis/answer';
import { useModal } from '@/store/modal/store';
import { useSessionUserType } from '@/store/session';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

type Params = { id: string };

export const VehicleAnalysisAnswerClient = () => {
  const modal = useModal();
  const userType = useSessionUserType();

  const { id } = useParams<Params>();
  const searchParams = useSearchParams();

  const { vehicle, isLoading, updateVehicleAnalysis } =
    useVehicleAnalysisDetail({
      id: id ?? '',
      vehicleId: searchParams.get('vehicleId') ?? '',
    });

  const { control, watch, handleSubmit } = useForm<AnalysisAnswerSchema>({
    resolver: zodResolver(analysisAnswerSchema),
    values: {
      analysis_result: vehicle?.analysis_result ?? AnalysisResult.APPROVED,
      analysis_info: vehicle?.analysis_info ?? '',
      from_db: vehicle?.from_db ?? false,
      confirmed: false,
    },
  });

  const analysisResult = watch('analysis_result');

  const sendAnalysisMutation = useMutation({
    mutationFn: (data: AnalysisAnswerSchema) =>
      sendAnalysis({
        id: vehicle!.request_id,
        vehicle_id: vehicle!.vehicle_id,
        analysisCategory: AnalysisType.VEHICLE,
        analysis_info: data.analysis_info || undefined,
        analysis_result: data.analysis_result,
        from_db: data.from_db,
      }),
    onSuccess: (_, data) => {
      modal.open({
        title: 'Analise enviada com\nsucesso!',
        buttons: [
          {
            children: 'Fechar',
            onClick: modal.close,
          },
        ],
      });

      updateVehicleAnalysis({
        ...vehicle,
        analysis_result: data.analysis_result,
        analysis_info: data.analysis_info ?? '',
        from_db: data.from_db,
        status: AnalysisStatus.FINISHED,
      });
    },
  });

  return (
    <VehicleAnalysisAnswerUI
      control={control}
      vehicle={vehicle}
      userType={userType}
      isLoading={isLoading}
      analysisResult={analysisResult}
      isSendAnalysisLoading={sendAnalysisMutation.isPending}
      onSubmit={handleSubmit((data) => sendAnalysisMutation.mutate(data))}
    />
  );
};
