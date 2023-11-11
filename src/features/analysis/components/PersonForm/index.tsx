import { Control } from 'react-hook-form'
import { AnalysisType, UserType } from 'src/models'
import { AnalysisPersonSchema } from '../../pages/RequestAnalysis/schema'
import { SelectItem } from 'src/types/select'
import { hasUserType } from 'src/utils/userType'
import { Button, ControlledInput } from 'src/components'
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
  <div className="bg-modal mt-6 rounded-xl px-4 pb-5 pt-5 lg:px-6">
    <h2 className="mb-1 flex items-center gap-2  text-primary">
      Insira os dados da pessoa nos campos abaixo
    </h2>
    <small className=" text-primary/60">
      Campos com * são obrigatórios para a solicitação
    </small>
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-8">
      <fieldset className="mt-3 flex-[2] lg:px-2">
        {hasUserType(userType, UserType.ADMIN) && (
          <ControlledInput
            control={control}
            label="Empresa"
            placeholder="Selecione uma empresa"
            name="company_name"
            required
            items={companiesSelectItems}
            loading={companiesLoading}
            inputVariants={{ size: 'sm', theme: 'primaryLight' }}
            containerVariants={{ layout: 'row' }}
          />
        )}
        <ControlledInput
          control={control}
          label="Nome"
          placeholder="Nome"
          name="name"
          required
          inputVariants={{ size: 'sm', theme: 'primaryLight' }}
          containerVariants={{ layout: 'row' }}
        />
        <ControlledInput
          control={control}
          label="CPF"
          placeholder="XXX.XXX.XXX-XX"
          name="document"
          type="cpf"
          required
          inputVariants={{ size: 'sm', theme: 'primaryLight' }}
          containerVariants={{ layout: 'row' }}
        />
        <ControlledInput
          control={control}
          label="RG"
          placeholder="XXXXXXXXX"
          name="rg"
          required
          inputVariants={{ size: 'sm', theme: 'primaryLight' }}
          containerVariants={{ layout: 'row' }}
        />
        <ControlledInput
          control={control}
          label="Data de Nascimento"
          name="birth_date"
          required
          type="date"
          inputVariants={{ size: 'sm', theme: 'primaryLight' }}
          containerVariants={{ layout: 'row' }}
        />
        <ControlledInput
          control={control}
          label="Nome da mãe"
          placeholder="Nome"
          name="mother_name"
          required
          inputVariants={{ size: 'sm', theme: 'primaryLight' }}
          containerVariants={{ layout: 'row' }}
        />
        <ControlledInput
          control={control}
          label="Estado de Emissão"
          name="state_rg"
          required
          items={estadosSelectItems}
          inputVariants={{ size: 'sm', theme: 'primaryLight' }}
          containerVariants={{ layout: 'row' }}
        />
        <ControlledInput
          control={control}
          label="Nome do pai"
          placeholder="Nome"
          name="father_name"
          inputVariants={{ size: 'sm', theme: 'primaryLight' }}
          containerVariants={{ layout: 'row' }}
        />
        <ControlledInput
          control={control}
          label="Número da CNH"
          placeholder="XXXXXXXXX"
          name="cnh"
          inputVariants={{ size: 'sm', theme: 'primaryLight' }}
          containerVariants={{ layout: 'row' }}
        />
        <ControlledInput
          control={control}
          label="Número de segurança da CNH"
          placeholder="XXXXXXXXX"
          name="security_number_cnh"
          inputVariants={{ size: 'sm', theme: 'primaryLight' }}
          containerVariants={{ layout: 'row' }}
        />
        <ControlledInput
          control={control}
          label="Categoria da CNH"
          name="category_cnh"
          items={cnhTypesSelectItems}
          inputVariants={{ size: 'sm', theme: 'primaryLight' }}
          containerVariants={{ layout: 'row' }}
        />
        <ControlledInput
          control={control}
          label="Data de validade da CNH"
          name="expire_at_cnh"
          type="date"
          inputVariants={{ size: 'sm', theme: 'primaryLight' }}
          containerVariants={{ layout: 'row' }}
        />
        <ControlledInput
          control={control}
          label="Naturalidade"
          placeholder="XXXXXXXXX"
          name="naturalness"
          inputVariants={{ size: 'sm', theme: 'primaryLight' }}
          containerVariants={{ layout: 'row' }}
        />
      </fieldset>
      <div className="flex-1">
        {analysisType !== AnalysisType.COMBO && (
          <div className="xs:gap-5 flex flex-wrap justify-center gap-4 sm:flex-nowrap lg:w-max lg:flex-col lg:items-start">
            <Button
              title=""
              onClick={onRequestAnalysis}
              className="shadow-3xl rounded-[0.2rem] lg:w-full"
              loading={analysisTypeLoading === 'person'}
            >
              Solicitar análise de pessoa
            </Button>
          </div>
        )}
      </div>
    </div>
  </div>
)
