import { Control } from 'react-hook-form'
import { Box, Button, ControlledInput, Link } from 'src/components'
import { LoginSchema } from '../schema'
import { RoutePaths } from 'src/routes/paths'

interface LoginUIProps {
  control: Control<LoginSchema>
  onSubmit: () => void
}

export function LoginUI({ control, onSubmit }: LoginUIProps) {
  return (
    <Box className="pb-10">
      <p className="text-primary text-center text-base font-semibold">
        Bem vindo(a) de volta!
      </p>
      <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-6">
        <ControlledInput
          control={control}
          name="email"
          label="E-mail"
          placeholder="Insira o seu e-mail"
        />
        <ControlledInput
          control={control}
          name="password"
          label="Senha"
          placeholder="Insira a senha"
        />
        <Button type="submit">Entrar</Button>
      </form>
      <Link
        to={RoutePaths.Auth.FORGOT_PASSWORD}
        className="text-dark mt-4 self-center text-center text-sm underline"
      >
        Esqueci minha senha
      </Link>
    </Box>
  )
}
