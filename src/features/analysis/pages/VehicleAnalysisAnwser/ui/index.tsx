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
  analysisTypeButtonTheme,
  getAnalysisVehicleTypeLabel,
  vehiclesTypesSelectItems,
} from 'src/features/analysis/constants/analysis'
import { estadosVehiclesSelectItems } from 'src/features/analysis/constants/estados'
import { userApiSelectItems } from 'src/features/auth/constants'
import {
  AnalysisResult,
  AnalysisStatus,
  UserType,
  VehicleAnalysis,
} from 'src/models'
import { onChangeStringBoolean, toStringBoolean } from 'src/utils/boolean'
import { hasUserType } from 'src/utils/userType'
import { AnalysisAnswerSchema } from '../schema'

interface VehicleAnalysisAnswerUIProps {
  vehicle: VehicleAnalysis
  isLoading: boolean
  isSendAnalysisLoading: boolean
  analysisResult: AnalysisResult
  userType?: UserType
  control: Control<AnalysisAnswerSchema>
  onSubmit: () => void
}

export const VehicleAnalysisAnswerUI: React.FC<
  VehicleAnalysisAnswerUIProps
> = ({
  isLoading,
  vehicle,
  isSendAnalysisLoading,
  analysisResult,
  userType,
  control,
  onSubmit,
}) => {
  const isAnswered = !!(vehicle.analysis_result || vehicle.finished_at)
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
          ? 'Responder Análise de Veículo'
          : 'Status da Análise de Veículo'
      }
    >
      <div className="mb-2 flex flex-col-reverse flex-wrap items-center gap-3 sm:mb-0 sm:flex-row">
        {!!vehicle.finished_at && (
          <Button theme="purple" size="xxs" disabled shadow="base">
            Respondida em{' '}
            {dayjs(vehicle.finished_at).format('DD/MM/YYYY [às] HH:mm:ss')}
          </Button>
        )}
        <Button theme="opaque" size="xxs" disabled shadow="base">
          Solicitada em{' '}
          {dayjs(vehicle?.created_at).format('DD/MM/YYYY [às] HH:mm:ss')}
        </Button>
        <Button
          theme={analysisTypeButtonTheme[vehicle.analysis_type]}
          size="xxs"
          disabled
          shadow="base"
        >
          {getAnalysisVehicleTypeLabel(vehicle.vehicle_analysis_type)}
        </Button>
      </div>

      <InputRow>
        <Input
          label="ID da solicitação:"
          placeholder="ID da solicitação"
          name="request_id"
          value={vehicle.request_id}
          disabled
          required
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
        />
        <Input
          label="ID do veículo:"
          placeholder="ID do veículo"
          name="vehicle_id"
          value={vehicle.vehicle_id}
          disabled
          required
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
        />
      </InputRow>

      <Input
        label="Nome do Proprietário"
        placeholder="Nome"
        name="owner_name"
        value={vehicle.owner_name}
        required
        disabled
        inputVariants={{ size: 'sm' }}
        labelVariants={{ size: 'sm' }}
        containerVariants={{ layout: 'row' }}
      />

      <InputRow>
        <Input
          label="CPF/CNPJ do Proprietário"
          placeholder="XX.XXX.XXX/XXXX-XX"
          name="owner_document"
          type="cpfOrCnpj"
          required
          disabled
          value={vehicle.owner_document}
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
        />
        <Input
          label="Placa"
          placeholder="XXXXXXX"
          name="plate"
          required
          disabled
          value={vehicle.plate}
          type="plate"
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
        />
        <Input
          label="Estado da Placa do veículo"
          name="plate_state"
          required
          disabled
          value={vehicle.plate_state}
          items={estadosVehiclesSelectItems}
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
        />
      </InputRow>

      <InputRow>
        <Input
          label="Tipo de Veículo"
          name="vehicle_type"
          required
          disabled
          value={vehicle.vehicle_type}
          items={vehiclesTypesSelectItems}
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-[0_0_auto] sm:min-w-[20rem]"
        />
        <Input
          label="Nome do motorista"
          placeholder="Nome"
          name="driver_name"
          disabled
          value={vehicle.driver_name}
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
        />
      </InputRow>

      <InputRow>
        <Input
          label="Renavam"
          placeholder="XXXXXXXXXXXXXXXXXXXXXXX"
          name="renavam"
          disabled
          value={vehicle.renavam}
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
        />
        <Input
          label="Chassi"
          placeholder="XXXXXXXXXXXXXXX"
          name="chassi"
          disabled
          value={vehicle.chassis}
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
            shouldShowDisableStyle
            disabled={analysisResult === AnalysisResult.APPROVED}
            control={control}
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
      ) : vehicle.status === AnalysisStatus.FINISHED ? (
        <>
          <SelectGroup
            title="Resultado da análise"
            required
            disabled
            layout="row"
            value={vehicle.analysis_result}
            items={analysisResultsSelectItems}
          />
          <SelectGroup
            required
            title="Resposta do Banco de Dados?"
            items={userApiSelectItems}
            layout="row"
            value={toStringBoolean(vehicle.from_db)}
            containerClassName="mb-2"
            disabled
          />
          <TextArea
            label="Descrição da análise (registro de Bos, inquéritos, artigos e termos circunstanciais):"
            name="analysis_info"
            disabled
            value={vehicle.analysis_info}
          />
        </>
      ) : (
        <SelectGroup
          title="Status"
          value={vehicle.status}
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
