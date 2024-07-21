import dayjs from 'dayjs'
import { Control, Controller } from 'react-hook-form'
import {
  Box,
  Button,
  ControlledCheckbox,
  ControlledSelectGroup,
  ControlledTextArea,
  Input,
  InputRow,
  LoadingContainer,
  SelectGroup,
  TextArea,
} from 'src/components'
import {
  analysisResultsSelectItems,
  analysisStatusSelectItems,
  personRegionTypeButtonTheme,
} from 'src/features/analysis/constants/analysis'
import { cnhTypesSelectItems } from 'src/features/analysis/constants/cnh'
import { estadosSelectItems } from 'src/features/analysis/constants/estados'
import { getAnalysisTypeString } from 'src/features/analysis/utils/mappers'
import { userApiSelectItems } from 'src/features/auth/constants'
import {
  AnalysisResult,
  AnalysisStatus,
  PersonAnalysis,
  UserType,
} from 'src/models'
import { onChangeStringBoolean, toStringBoolean } from 'src/utils/boolean'
import { hasUserType } from 'src/utils/userType'
import { AnalysisAnswerSchema } from '../schema'

interface AnalysisAnswerUIProps {
  person: PersonAnalysis
  isLoading: boolean
  isSendAnalysisLoading: boolean
  analysisResult: AnalysisResult
  userType?: UserType
  control: Control<AnalysisAnswerSchema>
  onSubmit: () => void
}

export const PersonAnalysisAnswerUI: React.FC<AnalysisAnswerUIProps> = ({
  isLoading,
  person,
  isSendAnalysisLoading,
  analysisResult,
  userType,
  control,
  onSubmit,
}) => {
  const isAnswered = !!(person.analysis_result || person.finished_at)
  const isAdminOrOperator = hasUserType(
    userType,
    UserType.ADMIN,
    UserType.OPERATOR,
  )
  const shouldAnswer = isAdminOrOperator && !isAnswered

  const renderContent = () => (
    <Box
      className="flex flex-col gap-3 sm:gap-4"
      title={
        shouldAnswer
          ? 'Responder Análise de Pessoa'
          : 'Status da Análise de Pessoas'
      }
    >
      <div className="mb-2 flex flex-col-reverse flex-wrap items-center gap-3 sm:mb-0 sm:flex-row">
        {!!person.finished_at && (
          <Button theme="purple" size="xxs" disabled shadow="base">
            Respondida em{' '}
            {dayjs(person.finished_at).format('DD/MM/YYYY [às] HH:mm:ss')}
          </Button>
        )}
        <Button theme="opaque" size="xxs" disabled shadow="base">
          Solicitada em{' '}
          {dayjs(person?.created_at).format('DD/MM/YYYY [às] HH:mm:ss')}
        </Button>
        <Button
          theme={
            personRegionTypeButtonTheme[
              person.region_type ?? person.person_analysis_type
            ]
          }
          size="xxs"
          disabled
          shadow="base"
        >
          Análise {getAnalysisTypeString(person)}
        </Button>
      </div>

      <Input
        label="Nome:"
        placeholder="Nome"
        name="name"
        value={person.name}
        disabled
        required
        inputVariants={{ size: 'sm' }}
        labelVariants={{ size: 'sm' }}
        containerVariants={{ layout: 'row' }}
      />

      <InputRow>
        <Input
          label="CPF:"
          placeholder="XXX.XXX.XXX-XX"
          name="document"
          disabled
          required
          value={person?.document}
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
        />
        <Input
          label="Data de Nascimento:"
          name="birth_date"
          placeholder="dd/mm/aaaa"
          type="date"
          disabled
          required
          value={
            person?.birth_date
              ? dayjs(person.birth_date).format('DD/MM/YYYY')
              : ''
          }
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
        />
        <Input
          label="RG:"
          placeholder="XXXXXXXXX"
          name="rg"
          disabled
          required
          value={person?.rg}
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
        />
      </InputRow>

      <InputRow>
        <Input
          label="Estado de Emissão:"
          name="state_rg"
          items={estadosSelectItems}
          disabled
          required
          value={person?.state_rg}
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-[0_0_auto] sm:min-w-[20rem]"
        />
        <Input
          label="Nome da mãe:"
          placeholder="Nome"
          name="mother_name"
          disabled
          required
          value={person?.mother_name}
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-[3]"
        />
      </InputRow>

      <InputRow>
        <Input
          label="Nome do pai:"
          placeholder="Nome"
          name="father_name"
          disabled
          value={person?.father_name}
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-[1.5]"
        />
        <Input
          label="Naturalidade:"
          placeholder="XXXXXXXXX"
          name="naturalness"
          disabled
          value={person?.naturalness}
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
        />
        <Input
          label="Número da CNH:"
          placeholder="XXXXXXXXX"
          name="cnh"
          disabled
          value={person?.cnh}
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
        />
      </InputRow>

      <InputRow>
        <Input
          label="Número de segurança da CNH:"
          placeholder="XXXXXXXXX"
          name="security_number_cnh"
          disabled
          value={person?.security_number_cnh}
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
        />
        <Input
          label="Categoria da CNH:"
          name="category_cnh"
          items={cnhTypesSelectItems}
          disabled
          value={person?.category_cnh}
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
        />
        <Input
          label="Data de validade da CNH:"
          name="expire_at_cnh"
          type="date"
          placeholder="dd/mm/aaaa"
          disabled
          value={
            person?.expire_at_cnh
              ? dayjs(person.expire_at_cnh).format('DD/MM/YYYY')
              : ''
          }
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
        />
      </InputRow>

      {shouldAnswer ? (
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <ControlledSelectGroup
            title="Selecione o resultado da análise"
            control={control}
            name="analysis_result"
            required
            layout="row"
            items={analysisResultsSelectItems}
            containerClassName="mt-2"
          />
          <Controller
            control={control}
            name="from_db"
            render={({ field, fieldState: { error } }) => (
              <SelectGroup
                required
                title="Resposta do Banco de Dados?"
                items={userApiSelectItems}
                layout="row"
                value={toStringBoolean(field.value)}
                error={error?.message}
                containerClassName="mb-2 mt-1"
                onChange={onChangeStringBoolean(field.onChange)}
              />
            )}
          />
          <ControlledTextArea
            control={control}
            shouldShowDisableStyle
            disabled={analysisResult === AnalysisResult.APPROVED}
            label="Descrição da análise (registro de Bos, inquéritos, artigos e termos circunstanciais):"
            name="analysis_info"
          />
          <ControlledCheckbox
            control={control}
            label="Confirmo que todos os artigos encontrados na pesquisa relacionados a pessoa foram enviados."
            name="confirmed"
          />
          <Button
            type="submit"
            theme="primary"
            size="sm"
            className="mb-1 mt-4 min-w-[8rem] self-center md:mt-0 md:self-end"
            loading={isSendAnalysisLoading}
          >
            Enviar
          </Button>
        </form>
      ) : person.status === AnalysisStatus.FINISHED ? (
        <>
          <SelectGroup
            title="Resultado da análise"
            required
            disabled
            layout="row"
            value={person.analysis_result}
            items={analysisResultsSelectItems}
          />
          <SelectGroup
            required
            title="Resposta do Banco de Dados?"
            items={userApiSelectItems}
            layout="row"
            value={toStringBoolean(person.from_db)}
            containerClassName="mb-2"
            disabled
          />
          <TextArea
            label="Descrição da análise (registro de Bos, inquéritos, artigos e termos circunstanciais):"
            name="analysis_info"
            disabled
            value={person.analysis_info}
          />
        </>
      ) : (
        <SelectGroup
          title="Status"
          value={person.status}
          disabled
          required
          layout="row"
          items={analysisStatusSelectItems}
          containerClassName="mt-2"
        />
      )}
    </Box>
  )

  const renderLoading = () => <LoadingContainer />

  if (isLoading) {
    return renderLoading()
  }

  return renderContent()
}
