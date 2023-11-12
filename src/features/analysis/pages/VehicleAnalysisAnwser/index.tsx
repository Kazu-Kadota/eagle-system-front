import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useParams, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useVehicleAnalysisDetail } from 'src/features/analysis/hooks'
import { AnalysisResult, AnalysisType } from 'src/models'
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

  const { vehicle, isLoading } = useVehicleAnalysisDetail({
    id: id ?? '',
    vehicleId: searchParams.get('vehicleId') ?? '',
  })

  const { control, handleSubmit } = useForm<AnalysisAnswerSchema>({
    resolver: zodResolver(analysisAnswerSchema),
    values: {
      analysis_result: vehicle?.analysis_result ?? AnalysisResult.APPROVED,
      analysis_info: vehicle?.analysis_info ?? '',
      confirmed: false,
    },
  })

  const sendAnalysisMutation = useMutation({
    mutationFn: (data: AnalysisAnswerSchema) =>
      sendAnalysis({
        id: vehicle!.request_id,
        vehicle_id: vehicle!.vehicle_id,
        analysisCategory: AnalysisType.VEHICLE,
        analysis_info: data.analysis_info || undefined,
        analysis_result: data.analysis_result,
      }),
    onError: (error) =>
      toast.error(
        getErrorMsg(
          error,
          'Não foi possível solicitar a análise, verifique os dados e tente novamente.',
        ),
      ),
    onSuccess: () => {
      modal.open({
        title: 'Analise enviada!',
        buttons: [
          {
            children: 'Fechar',
            onClick: window.close,
          },
        ],
        disableOverlayClose: true,
      })
    },
  })

  return (
    <VehicleAnalysisAnswerUI
      control={control}
      vehicle={vehicle}
      userType={user.user_type}
      isLoading={isLoading}
      isSendAnalysisLoading={sendAnalysisMutation.isPending}
      onSubmit={handleSubmit((data) => sendAnalysisMutation.mutate(data))}
    />
  )
}
