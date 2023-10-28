import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ResetPasswordUI } from './ui'
import { ResetPasswordFormData, schema } from './schema'
import { toast } from 'react-toastify'
import { getErrorMsg } from 'src/utils/errors'
import resetPasswordSend, {
  ResetPasswordSendQuery,
} from '../../services/reset-password'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { RoutePaths } from 'src/routes/paths'
import { useState } from 'react'

export function ResetPasswordPage() {
  const { control, handleSubmit } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(schema),
    defaultValues: { password: '', confirm_password: '' },
  })

  const [loading, setLoading] = useState(false)

  const [searchParams] = useSearchParams()

  const navigate = useNavigate()

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      setLoading(true)
      const query: ResetPasswordSendQuery = {
        email: searchParams.get('email') ?? '',
        recovery_id: searchParams.get('recovery_id') ?? '',
      }

      await resetPasswordSend(data, query)

      toast.success('Sua senha foi redefinida com sucesso!')

      navigate(RoutePaths.Auth.LOGIN)
    } catch (error) {
      setLoading(false)

      toast.error(getErrorMsg(error))
    }
  }

  return (
    <ResetPasswordUI
      control={control}
      onSubmit={handleSubmit(onSubmit)}
      loading={loading}
    />
  )
}
