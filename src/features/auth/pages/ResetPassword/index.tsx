import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { RoutePaths } from 'src/routes/paths'
import { getErrorMsg } from 'src/utils/errors'
import resetPasswordSend from '../../services/reset-password'
import { ResetPasswordFormData, schema } from './schema'
import { ResetPasswordUI } from './ui'

export function ResetPasswordPage() {
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()

  const { control, handleSubmit } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(schema),
    defaultValues: { password: '', confirm_password: '' },
  })

  const { mutate: resetPasswordMutate, isPending } = useMutation({
    mutationFn: (data: ResetPasswordFormData) =>
      resetPasswordSend(data, {
        email: searchParams.get('email') ?? '',
        recovery_id: searchParams.get('recovery_id') ?? '',
      }),
    onSuccess: () => {
      toast.success('Sua senha foi redefinida com sucesso!')
      navigate(RoutePaths.Auth.login())
    },
    onError: (error) => toast.error(getErrorMsg(error)),
  })

  return (
    <ResetPasswordUI
      control={control}
      loading={isPending}
      onSubmit={handleSubmit((data) => resetPasswordMutate(data))}
    />
  )
}
