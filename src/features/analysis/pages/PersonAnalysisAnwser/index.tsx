import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useParams, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { usePersonAnalysisDetail } from 'src/features/analysis/hooks'
import { AnalysisResult } from 'src/models'
import { useAuthStore } from 'src/store/auth'
import { useModal } from 'src/store/modal'
import { getErrorMsg } from 'src/utils/errors'
import { sendAnalysis } from '../../services/answer'
import { AnalysisAnswerSchema, analysisAnswerSchema } from './schema'
import { PersonAnalysisAnswerUI } from './ui'

export const PersonAnalysisAnswerPage = () => {
  const modal = useModal()
  const { user } = useAuthStore()

  const { id } = useParams()
  const [searchParams] = useSearchParams()

  const { person, isLoading } = usePersonAnalysisDetail({
    id: id ?? '',
    personId: searchParams.get('personId') ?? '',
  })

  const { control, handleSubmit } = useForm<AnalysisAnswerSchema>({
    resolver: zodResolver(analysisAnswerSchema),
    values: {
      analysis_result: person?.analysis_result ?? AnalysisResult.APPROVED,
      analysis_info: person?.analysis_info ?? '',
      confirmed: false,
    },
  })

  const sendAnalysisMutation = useMutation({
    mutationFn: (data: AnalysisAnswerSchema) =>
      sendAnalysis({
        id: person!.request_id,
        person_id: person!.person_id,
        analysisCategory: 'person',
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
    <PersonAnalysisAnswerUI
      control={control}
      person={person}
      userType={user.user_type}
      isLoading={isLoading}
      isSendAnalysisLoading={sendAnalysisMutation.isPending}
      onSubmit={handleSubmit((data) => sendAnalysisMutation.mutate(data))}
    />
  )
}
