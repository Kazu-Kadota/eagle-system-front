import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { login } from 'src/features/auth/services/login'
import { useAuthStore } from 'src/store/auth'
import { LoginSchema, schema } from './schema'
import { LoginUI } from './ui'

export type LoginParams = {
  navigateTo?: string
}

export function LoginPage() {
  const setAuthState = useAuthStore((state) => state.setState)

  const { control, handleSubmit } = useForm<LoginSchema>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  })

  const {
    error,
    isPending,
    mutate: loginMutate,
  } = useMutation({
    mutationFn: login,
    onSuccess: (data) => setAuthState(data),
  })

  return (
    <LoginUI
      error={error}
      isLoading={isPending}
      control={control}
      onSubmit={handleSubmit((data) => loginMutate(data))}
    />
  )
}
