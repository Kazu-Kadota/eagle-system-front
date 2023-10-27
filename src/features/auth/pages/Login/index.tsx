import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginUI } from './ui'
import { LoginSchema, schema } from './schema'

export function LoginPage() {
  const { control, handleSubmit } = useForm<LoginSchema>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  })

  return <LoginUI control={control} onSubmit={handleSubmit(() => undefined)} />
}
