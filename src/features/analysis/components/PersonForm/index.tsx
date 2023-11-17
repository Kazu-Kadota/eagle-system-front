import { Control } from 'react-hook-form'
import { AnalysisType, UserType } from 'src/models'
import { AnalysisPersonSchema } from '../../pages/RequestAnalysis/schema'
import { SelectItem } from 'src/types/select'
import { hasUserType } from 'src/utils/userType'
import { Box, Button, ControlledInput, InputRow } from 'src/components'
import { estadosSelectItems } from '../../constants/estados'
import { cnhTypesSelectItems } from '../../constants/cnh'

interface PersonFormProps {
  analysisTypeLoading: AnalysisType | null
  control: Control<AnalysisPersonSchema>
  analysisType?: AnalysisType
  userType?: UserType
  onRequestAnalysis: () => void
  companiesSelectItems: SelectItem[]
  companiesLoading: boolean
}

export const PersonForm: React.FC<PersonFormProps> = ({
  analysisTypeLoading,
  analysisType,
  userType,
  companiesLoading,
  companiesSelectItems,
  control,
  onRequestAnalysis,
}) => (
  <Box spacing="sm" containerClassName="mb-2">
    <h2 className="text-sm font-bold text-dark">
      Insira os dados da pessoa nos campos abaixo
    </h2>
    <small className="mt-0.5 block text-placeholder/80">
      Campos com * são obrigatórios para a solicitação
    </small>
    <form
      className="mt-4 flex flex-col gap-3 sm:gap-4"
      onSubmit={onRequestAnalysis}
    >
      <InputRow>
        {hasUserType(userType, UserType.ADMIN) && (
          <ControlledInput
            control={control}
            label="Empresa:"
            placeholder="Selecione uma empresa"
            name="company_name"
            required
            items={companiesSelectItems}
            loading={companiesLoading}
            inputVariants={{ size: 'sm' }}
            labelVariants={{ size: 'sm' }}
            containerVariants={{ layout: 'row' }}
            containerClassName="flex-1"
          />
        )}
        <ControlledInput
          control={control}
          label="Nome:"
          placeholder="Nome"
          name="name"
          required
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-[3]"
        />
      </InputRow>

      <InputRow>
        <ControlledInput
          control={control}
          label="Data de Nascimento:"
          name="birth_date"
          required
          type="date"
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
          placeholder="dd/mm/aaaa"
        />
        <ControlledInput
          control={control}
          label="CPF:"
          placeholder="XXX.XXX.XXX-XX"
          name="document"
          type="cpf"
          required
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
        />
        <ControlledInput
          control={control}
          label="RG:"
          placeholder="XXXXXXXXX"
          name="rg"
          required
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
        />
      </InputRow>

      <InputRow>
        <ControlledInput
          control={control}
          label="Estado de Emissão:"
          name="state_rg"
          required
          items={estadosSelectItems}
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-[0_0_auto] sm:min-w-[20rem]"
        />
        <ControlledInput
          control={control}
          label="Nome da mãe:"
          placeholder="Nome"
          name="mother_name"
          required
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-[3]"
        />
      </InputRow>

      <InputRow>
        <ControlledInput
          control={control}
          label="Nome do pai:"
          placeholder="Nome"
          name="father_name"
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-[1.5]"
        />
        <ControlledInput
          control={control}
          label="Naturalidade:"
          placeholder="XXXXXXXXX"
          name="naturalness"
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
        />
        <ControlledInput
          control={control}
          label="Número da CNH:"
          placeholder="XXXXXXXXX"
          name="cnh"
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
        />
      </InputRow>

      <InputRow>
        <ControlledInput
          control={control}
          label="Número de segurança da CNH:"
          placeholder="XXXXXXXXX"
          name="security_number_cnh"
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
        />
        <ControlledInput
          control={control}
          label="Categoria da CNH:"
          name="category_cnh"
          items={cnhTypesSelectItems}
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
        />
        <ControlledInput
          control={control}
          label="Data de validade da CNH:"
          name="expire_at_cnh"
          type="date"
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
          placeholder="dd/mm/aaaa"
        />
      </InputRow>

      {analysisType !== AnalysisType.COMBO && (
        <Button
          type="submit"
          theme="success"
          size="xsStrong"
          shadow="base"
          className="mt-3 min-w-[10rem] self-center"
          loading={analysisTypeLoading === AnalysisType.PERSON}
        >
          Solicitar
        </Button>
      )}
    </form>
  </Box>
)
