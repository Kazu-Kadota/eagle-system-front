import { Control } from 'react-hook-form'
import { ChangePasswordSchema } from '../../AccountHome/schema'
import { Button, ControlledInput } from 'src/components'
import { ChangePasswordUIState } from './types'

interface ChangePasswordUIProps {
  control: Control<ChangePasswordSchema>
  state: ChangePasswordUIState
  onSubmit: () => void
}

export function ChangePasswordUI({
  control,
  state,
  onSubmit,
}: ChangePasswordUIProps) {
  const renderDefault = () => (
    <form className="flex flex-col gap-4 px-4 py-6" onSubmit={onSubmit}>
      <h2 className="text-base font-bold text-primary">
        Para redefinir sua senha, preencha os campos abaixo
      </h2>

      <fieldset className="flex max-w-sm flex-col gap-3">
        <ControlledInput
          label="Insira sua senha atual"
          required
          control={control}
          name="old_password"
          type="password"
          placeholder="senha"
          labelVariants={{ size: 'sm' }}
          inputVariants={{ size: 'md' }}
        />
        <ControlledInput
          label="Insira a nova senha"
          required
          control={control}
          name="password"
          type="password"
          placeholder="nova senha"
          labelVariants={{ size: 'sm' }}
          inputVariants={{ size: 'md' }}
        />
        <ControlledInput
          label="Confirme a nova senha"
          required
          control={control}
          name="confirm_password"
          type="password"
          placeholder="nova senha"
          labelVariants={{ size: 'sm' }}
          inputVariants={{ size: 'md' }}
        />
      </fieldset>

      <Button
        type="submit"
        size="sm"
        theme="primary"
        className="mt-4 min-w-[10rem] self-center"
        loading={state === ChangePasswordUIState.LOADING}
      >
        Salvar
      </Button>
    </form>
  )

  const renderSuccess = () => (
    <div className="flex h-full items-center justify-center pb-2">
      <h2 className="text-center text-4xl font-semibold leading-tight text-dark">
        Senha redefinada com sucesso!
      </h2>
    </div>
  )

  return {
    [ChangePasswordUIState.DEFAULT]: renderDefault,
    [ChangePasswordUIState.LOADING]: renderDefault,
    [ChangePasswordUIState.SUCCESS]: renderSuccess,
  }[state]()
}
