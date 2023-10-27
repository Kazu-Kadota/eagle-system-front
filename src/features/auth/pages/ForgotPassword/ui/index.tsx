import { Control } from 'react-hook-form'
import { Box, Button, ControlledInput } from 'src/components'
import { ForgotPasswordSchema } from '../schema'

interface ForgotPasswordUIProps {
  control: Control<ForgotPasswordSchema>
  onSubmit: () => void
}

export function ForgotPasswordUI({ control, onSubmit }: ForgotPasswordUIProps) {
  return (
    <Box>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <ControlledInput
          control={control}
          name="email"
          label="Insira o e-mail cadastrado"
          placeholder="Insira o seu e-mail"
          labelVariants={{ theme: 'primary' }}
        />
        <Button type="submit" size="sm" theme="primary">
          Enviar
        </Button>
      </form>
    </Box>
  )
}
