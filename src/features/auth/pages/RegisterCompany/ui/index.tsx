import { Control } from 'react-hook-form'
import {
  Box,
  Button,
  ControlledInput,
  ControlledSelectGroup,
  InputRow,
} from 'src/components'
import { RegisterCompanySchema } from '../schema'
import { companyTypeSelectItems } from 'src/features/auth/constants'

interface RegisterCompanyUIProps {
  isLoading: boolean
  control: Control<RegisterCompanySchema>
  onSubmit: () => void
}

export const RegisterCompanyUI: React.FC<RegisterCompanyUIProps> = ({
  isLoading,
  control,
  onSubmit,
}) => (
  <Box title="Cadastrar Empresa">
    <h2 className="mb-1 flex items-center gap-2 text-sm text-primary text-opacity-60">
      Preencha os campos abaixo para cadastrar uma empresa
    </h2>
    <form className="mt-4 flex flex-col gap-3 sm:gap-4" onSubmit={onSubmit}>
      <InputRow>
        <ControlledInput
          control={control}
          label="Nome:"
          name="name"
          type="text"
          placeholder="Nome"
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
        />
        <ControlledInput
          control={control}
          label="CNPJ:"
          name="cnpj"
          type="cnpj"
          placeholder="XX.XXX.XXX/XXXX-XX"
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
        />
      </InputRow>

      <ControlledSelectGroup
        control={control}
        title="Tipo da empresa:"
        name="type"
        items={companyTypeSelectItems}
        layout="row"
      />

      <Button
        theme="primary"
        size="xsStrong"
        type="submit"
        className="min-w-[10rem] self-center"
        loading={isLoading}
      >
        Salvar
      </Button>
    </form>
  </Box>
)
