import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { login } from 'src/features/auth/services/login'
import { RoutePaths } from 'src/routes/paths'
import { useAuthStore } from 'src/store/auth'
import { LoginSchema, schema } from './schema'
import { LoginUI } from './ui'

export type LoginParams = {
  navigateTo?: string
}

export function LoginPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

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
    onSuccess: (data) => {
      setAuthState(data)
      navigate(searchParams.get('navigateTo') || RoutePaths.Common.HOME)
    },
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
