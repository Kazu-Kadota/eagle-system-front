import { Control } from 'react-hook-form'
import {
  Box,
  Button,
  ControlledInput,
  ControlledSelectGroup,
  InputRow,
} from 'src/components'
import {
  registerUserTypeSelectItems,
  userApiSelectItems,
} from 'src/features/auth/constants'
import { SelectItem } from 'src/types/select'
import { RegisterUserSchema } from '../schema'

interface RegisterUserUIProps {
  isLoading: boolean
  control: Control<RegisterUserSchema>
  companiesSelectItems: SelectItem[]
  companiesLoading: boolean
  onSubmit: () => void
}

export const RegisterUserUI: React.FC<RegisterUserUIProps> = ({
  isLoading,
  control,
  companiesSelectItems,
  companiesLoading,
  onSubmit,
}) => (
  <Box title="Cadastrar Usuário">
    <h2 className="mb-1 flex items-center gap-2 text-sm text-primary text-opacity-60">
      Preencha os campos abaixo para cadastrar um usuário
    </h2>
    <form
      className="mt-2 flex flex-col gap-3 sm:mt-4 sm:gap-4"
      onSubmit={onSubmit}
    >
      <InputRow>
        <ControlledInput
          control={control}
          label="Nome:"
          name="user_first_name"
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
        />
        <ControlledInput
          control={control}
          label="Sobrenome:"
          name="user_last_name"
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
        />
        <ControlledInput
          control={control}
          label="E-mail:"
          name="email"
          type="email"
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
        />
      </InputRow>

      <InputRow>
        <ControlledInput
          control={control}
          label="Nome da Empresa:"
          name="company_name"
          placeholder="Selecione uma empresa"
          items={companiesSelectItems}
          loading={companiesLoading}
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
        />
        <ControlledInput
          control={control}
          label="Senha:"
          name="password"
          type="password"
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
        />
        <ControlledInput
          control={control}
          label="Confirmação de Senha:"
          name="password_confirmation"
          type="password"
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
        />
      </InputRow>

      <ControlledSelectGroup
        control={control}
        title="Permissões de acesso:"
        name="user_type"
        items={registerUserTypeSelectItems}
        layout="row"
      />

      <ControlledSelectGroup
        control={control}
        title="Irá utilizar a API?"
        name="api"
        items={userApiSelectItems}
        layout="row"
        containerClassName="-mt-1"
      />

      <Button
        theme="primary"
        size="xsStrong"
        type="submit"
        className="mt-3 min-w-[10rem] self-center sm:mt-0"
        loading={isLoading}
      >
        Salvar
      </Button>
    </form>
  </Box>
)
