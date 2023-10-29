import { Control } from 'react-hook-form'
import { Box, Button, ControlledInput, Link } from 'src/components'
import { RoutePaths } from 'src/routes/paths'
import { getErrorMsg } from 'src/utils/errors'
import { LoginSchema } from '../schema'

interface LoginUIProps {
  isLoading: boolean
  error: Error | null
  control: Control<LoginSchema>
  onSubmit: () => void
}

export function LoginUI({ isLoading, error, control, onSubmit }: LoginUIProps) {
  return (
    <Box className="pb-10">
      <p className="text-center text-base font-semibold text-primary">
        Bem vindo(a) de volta!
      </p>
      <form className="mt-4 flex flex-col gap-6" onSubmit={onSubmit}>
        <ControlledInput
          control={control}
          name="email"
          label="E-mail"
          placeholder="Insira o seu e-mail"
          type="email"
          labelVariants={{ size: '2xl' }}
        />
        <ControlledInput
          control={control}
          name="password"
          label="Senha"
          placeholder="Insira a senha"
          type="password"
          labelVariants={{ size: '2xl' }}
        />
        {error && (
          <p className="-mb-1 -mt-2 text-center text-sm text-error">
            {getErrorMsg(error)}
          </p>
        )}
        <Button type="submit" loading={isLoading}>
          Entrar
        </Button>
      </form>
      <Link
        to={RoutePaths.Auth.FORGOT_PASSWORD}
        className="mt-4 self-center text-center text-sm text-dark underline"
      >
        Esqueci minha senha
      </Link>
    </Box>
  )
}
