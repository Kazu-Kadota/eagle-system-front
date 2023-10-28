import { Control } from 'react-hook-form'
import { Box, Button, ControlledInput } from 'src/components'
import { ForgotPasswordSchema } from '../schema'
import { StatesEnum } from './types'

interface ForgotPasswordUIProps {
  control: Control<ForgotPasswordSchema>
  state: StatesEnum
  onSubmit: () => void
}

export function ForgotPasswordUI({
  control,
  state,
  onSubmit,
}: ForgotPasswordUIProps) {
  const renderDefault = () => (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <ControlledInput
        control={control}
        name="email"
        label="Insira o e-mail cadastrado"
        placeholder="Insira o seu e-mail"
        labelVariants={{ theme: 'primary' }}
      />
      <Button
        type="submit"
        size="sm"
        theme="primary"
        loading={state === StatesEnum.LOADING}
      >
        Enviar
      </Button>
    </form>
  )

  const renderSuccess = () => {
    return (
      <>
        <p className="text-center text-md font-bold">
          Acesse seu e-mail para redefinir a senha!
        </p>
        <img
          src="/images/forget-password-success.png"
          className="w-80 self-center"
        ></img>
      </>
    )
  }

  return (
    <Box>
      {
        {
          [StatesEnum.DEFAULT]: renderDefault(),
          [StatesEnum.LOADING]: renderDefault(),
          [StatesEnum.SUCCESS]: renderSuccess(),
        }[state]
      }
    </Box>
  )
}
