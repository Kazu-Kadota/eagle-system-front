import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ForgotPasswordUI } from './ui'
import { ForgotPasswordSchema, schema } from './schema'

export function ForgotPasswordPage() {
  const { control, handleSubmit } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(schema),
    defaultValues: { email: '' },
  })

  return (
    <ForgotPasswordUI
      control={control}
      onSubmit={handleSubmit(() => undefined)}
    />
  )
}
