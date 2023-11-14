import { useForm } from 'react-hook-form'
import { useCompanies } from 'src/features/auth'
import { AnalysisType, UserType } from 'src/models'
import { useAuthStore } from 'src/store/auth'
import { hasUserType } from 'src/utils/userType'
import { ReportSchema, reportSchema } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import {
  downloadPersonAnalysisReport,
  downloadVehicleAnalysisReport,
} from '../../services/report'
import { prepareReportQuery } from './utils'
import { toast } from 'react-toastify'
import { getErrorMsg } from 'src/utils/errors'
import { ReportHomeUI } from './ui'
import { useModal } from 'src/store/modal'
import { useNavigate } from 'react-router-dom'
import { RoutePaths } from 'src/routes/paths'

const downloadAnalysisReport = (analysisType: AnalysisType) =>
  ({
    [AnalysisType.PERSON]: downloadPersonAnalysisReport,
    [AnalysisType.COMBO]: downloadPersonAnalysisReport,
    [AnalysisType.VEHICLE]: downloadVehicleAnalysisReport,
    [AnalysisType.VEHICLE_PLATE_HISTORY]: downloadVehicleAnalysisReport,
  })[analysisType]

export function ReportHomePage() {
  const modal = useModal()
  const { user } = useAuthStore()

  const navigate = useNavigate()

  const { companiesSelectItems, isLoading: companiesLoading } = useCompanies({
    enabled: hasUserType(user.user_type, UserType.ADMIN),
  })

  const { control, reset, handleSubmit } = useForm<ReportSchema>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      start_date: '',
      final_date: '',
      company: '',
      userType: user.user_type,
    },
  })

  const [analysisType, setAnalysisType] = useState(AnalysisType.PERSON)
  const [isLoading, setLoading] = useState(false)

  const onSuccessRequestAnalysis = () => {
    modal.open({
      title: 'Download concluído com\nsucesso!',
      buttons: [
        { children: 'Emitir outro relatório', onClick: () => reset() },
        {
          children: 'Ir para página inicial',
          theme: 'dark',
          onClick: () => navigate(RoutePaths.Analysis.ANALYSIS_HOME),
        },
      ],
    })
  }

  const onSubmit = async (data: ReportSchema) => {
    try {
      setLoading(true)

      const query = prepareReportQuery(data)

      await downloadAnalysisReport(analysisType)(query)

      onSuccessRequestAnalysis()
    } catch (error) {
      toast.error(getErrorMsg(error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <ReportHomeUI
      userType={user.user_type}
      control={control}
      isLoading={isLoading}
      companiesLoading={companiesLoading}
      companiesSelectItems={companiesSelectItems}
      analysisType={analysisType}
      setAnalysisType={setAnalysisType}
      onSubmit={handleSubmit(onSubmit)}
    />
  )
}
