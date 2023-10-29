import { Control } from 'react-hook-form'
import { Box, Button, ControlledInput } from 'src/components'
import { MutationStatus } from 'src/types/mutation'
import { ForgotPasswordSchema } from '../schema'

interface ForgotPasswordUIProps {
  control: Control<ForgotPasswordSchema>
  status: MutationStatus
  onSubmit: () => void
}

export function ForgotPasswordUI({
  control,
  status,
  onSubmit,
}: ForgotPasswordUIProps) {
  const renderDefault = () => (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
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
        loading={status === MutationStatus.PENDING}
      >
        Enviar
      </Button>
    </form>
  )

  const renderSuccess = () => {
    return (
      <>
        <p className="text-center text-lg font-bold">
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
          [MutationStatus.IDLE]: renderDefault(),
          [MutationStatus.PENDING]: renderDefault(),
          [MutationStatus.ERROR]: renderDefault(),
          [MutationStatus.SUCCESS]: renderSuccess(),
        }[status]
      }
    </Box>
  )
}
