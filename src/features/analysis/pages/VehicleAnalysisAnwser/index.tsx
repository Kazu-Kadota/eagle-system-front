import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useParams, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useVehicleAnalysisDetail } from 'src/features/analysis/hooks'
import { AnalysisResult, AnalysisStatus, AnalysisType } from 'src/models'
import { useAuthStore } from 'src/store/auth'
import { useModal } from 'src/store/modal'
import { getErrorMsg } from 'src/utils/errors'
import { sendAnalysis } from '../../services/answer'
import { AnalysisAnswerSchema, analysisAnswerSchema } from './schema'
import { VehicleAnalysisAnswerUI } from './ui'

export const VehicleAnalysisAnswerPage = () => {
  const modal = useModal()
  const { user } = useAuthStore()

  const { id } = useParams()
  const [searchParams] = useSearchParams()

  const { vehicle, isLoading, updateVehicleAnalysis } =
    useVehicleAnalysisDetail({
      id: id ?? '',
      vehicleId: searchParams.get('vehicleId') ?? '',
    })

  const { control, watch, handleSubmit } = useForm<AnalysisAnswerSchema>({
    resolver: zodResolver(analysisAnswerSchema),
    values: {
      analysis_result: vehicle?.analysis_result ?? AnalysisResult.APPROVED,
      analysis_info: vehicle?.analysis_info ?? '',
      from_db: vehicle?.from_db ?? false,
      confirmed: false,
    },
  })

  const analysisResult = watch('analysis_result')

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
    onError: (error) =>
      toast.error(
        getErrorMsg(
          error,
          'Não foi possível responder a análise, verifique os dados e tente novamente.',
        ),
      ),
    onSuccess: (_, data) => {
      modal.open({
        title: 'Analise enviada com\nsucesso!',
        buttons: [
          {
            children: 'Fechar',
            onClick: modal.close,
          },
        ],
      })

      updateVehicleAnalysis({
        ...vehicle,
        analysis_result: data.analysis_result,
        analysis_info: data.analysis_info ?? '',
        from_db: data.from_db,
        status: AnalysisStatus.FINISHED,
      })
    },
  })

  return (
    <VehicleAnalysisAnswerUI
      control={control}
      vehicle={vehicle}
      userType={user.user_type}
      isLoading={isLoading}
      analysisResult={analysisResult}
      isSendAnalysisLoading={sendAnalysisMutation.isPending}
      onSubmit={handleSubmit((data) => sendAnalysisMutation.mutate(data))}
    />
  )
}
