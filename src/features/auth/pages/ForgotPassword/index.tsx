import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { getErrorMsg } from 'src/utils/errors'
import recoveryPasswordSend from '../../services/recovery-password'
import { ForgotPasswordSchema, schema } from './schema'
import { ForgotPasswordUI } from './ui'

export function ForgotPasswordPage() {
  const { control, handleSubmit } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(schema),
    defaultValues: { email: '' },
  })

  const { status, mutate: recoveryPasswordMutate } = useMutation({
    mutationFn: recoveryPasswordSend,
    onError: (error) => toast.error(getErrorMsg(error)),
  })

  return (
    <ForgotPasswordUI
      control={control}
      status={status}
      onSubmit={handleSubmit((data) => recoveryPasswordMutate(data))}
    />
  )
}
