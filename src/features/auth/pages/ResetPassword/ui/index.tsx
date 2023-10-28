import { Control } from 'react-hook-form'
import { Box, Button, ControlledInput } from 'src/components'
import { ResetPasswordFormData } from '../schema'

interface ResetPasswordUIProps {
  control: Control<ResetPasswordFormData>
  loading: boolean
  onSubmit: () => void
}

export function ResetPasswordUI({
  control,
  loading,
  onSubmit,
}: ResetPasswordUIProps) {
  return (
    <Box>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <ControlledInput
          control={control}
          name="password"
          label="Insira a sua nova senha"
          labelVariants={{ theme: 'dark', size: 'xs' }}
          placeholder="Insira a senha"
          type="password"
        />
        <ControlledInput
          control={control}
          name="confirm_password"
          label="Repita a nova senha"
          labelVariants={{ theme: 'dark', size: 'xs' }}
          placeholder="Repita sua senha"
          type="password"
        />
        <Button type="submit" size="sm" theme="primary" loading={loading}>
          Salvar
        </Button>
      </form>
    </Box>
  )
}
