import dayjs from 'dayjs'
import { Control } from 'react-hook-form'
import { SearchIcon } from 'src/assets/icons'
import {
  Box,
  Button,
  ControlledInput,
  Input,
  InputRow,
  SelectGroup,
  TextArea,
} from 'src/components'
import { AnalysisTable } from 'src/features/analysis/components'
import {
  analysisResultsSelectItems,
  analysisStatusSelectItems,
  analysisTypeButtonLabel,
  analysisTypeButtonTheme,
  vehiclesTypesSelectItems,
} from 'src/features/analysis/constants/analysis'
import { estadosVehiclesSelectItems } from 'src/features/analysis/constants/estados'
import {
  AnalysisStatus,
  AnalysisType,
  UserType,
  VehicleAnalysis,
} from 'src/models'
import { SelectItem } from 'src/types/select'
import { hasUserType } from 'src/utils/userType'
import { AnalysisVehicleSearchSchema } from '../schema'
import { columns } from './columns'

interface SearchVehicleAnalysisUIProps {
  userType: UserType
  isLoading: boolean
  control: Control<AnalysisVehicleSearchSchema>
  companiesSelectItems: SelectItem[]
  companiesLoading: boolean
  items: VehicleAnalysis[] | null
  selectedItem: VehicleAnalysis | null
  setSelectedItem: (item: VehicleAnalysis) => void
  onSearchSubmit: () => void
}

export function SearchVehicleAnalysisUI({
  control,
  isLoading,
  userType,
  companiesSelectItems,
  companiesLoading,
  items,
  selectedItem,
  setSelectedItem,
  onSearchSubmit,
}: SearchVehicleAnalysisUIProps) {
  return (
    <>
      <Box title="Consulta de Análise de Veículo">
        <h2 className="text-sm font-bold text-dark">
          Preencha os campos abaixo para consultar uma análise. O campo “placa”
          é obrigatório.
        </h2>
        <form
          className="mt-4 flex flex-col gap-5 md:max-w-lg md:flex-row md:items-center"
          onSubmit={onSearchSubmit}
        >
          <fieldset className="flex flex-[4] flex-col gap-4">
            <ControlledInput
              placeholder="Placa"
              name="plateSearch"
              type="plate"
              control={control}
              inputVariants={{ size: 'md' }}
              labelVariants={{ size: 'sm' }}
            />
            <ControlledInput
              placeholder="Selecione um estado"
              name="plateStateSearch"
              items={estadosVehiclesSelectItems}
              control={control}
              inputVariants={{ size: 'md' }}
              labelVariants={{ size: 'sm' }}
            />
            {hasUserType(userType, UserType.ADMIN, UserType.OPERATOR) && (
              <ControlledInput
                control={control}
                placeholder="Selecione uma empresa"
                name="companyNameSearch"
                items={companiesSelectItems}
                loading={companiesLoading}
                inputVariants={{ size: 'md' }}
                labelVariants={{ size: 'sm' }}
              />
            )}
          </fieldset>
          <Button
            theme="primary"
            size="xsStrong"
            className="flex-1 self-center"
            type="submit"
            loading={isLoading}
          >
            Pesquisar
            <SearchIcon className="ml-1 w-4 fill-light" />
          </Button>
        </form>
      </Box>

      {!!items && (
        <>
          <h4 className="py-3 text-base font-bold text-light">
            {items.length > 0
              ? `Foram encontrados ${items.length} resultados para sua busca`
              : 'Não foi encontrado nenhum resultado para essa busca'}
          </h4>
          {items.length > 0 && (
            <AnalysisTable
              columns={columns}
              analysisType={AnalysisType.VEHICLE}
              data={items}
              onClick={setSelectedItem}
              pageCount={5}
            />
          )}
        </>
      )}

      {!!selectedItem && (
        <Box
          spacing="sm"
          key={selectedItem.request_id}
          containerClassName="mt-3"
          className="flex flex-col gap-3 sm:gap-4"
        >
          <div className="mb-2 flex flex-col-reverse flex-wrap items-center gap-3 sm:mb-0 sm:flex-row">
            {!!selectedItem.finished_at && (
              <Button theme="purple" size="xxs" disabled shadow="base">
                Respondida em{' '}
                {dayjs(selectedItem.finished_at).format(
                  'DD/MM/YYYY [às] HH:mm:ss',
                )}
              </Button>
            )}
            <Button theme="opaque" size="xxs" disabled shadow="base">
              Solicitada em{' '}
              {dayjs(selectedItem?.created_at).format(
                'DD/MM/YYYY [às] HH:mm:ss',
              )}
            </Button>
            <Button
              theme={analysisTypeButtonTheme[selectedItem.analysis_type]}
              size="xxs"
              disabled
              shadow="base"
            >
              {analysisTypeButtonLabel[selectedItem.analysis_type]}
            </Button>
          </div>

          <Input
            label="Nome do Proprietário"
            placeholder="Nome"
            name="owner_name"
            value={selectedItem.owner_name}
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
              value={selectedItem.owner_document}
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
              value={selectedItem.plate}
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
              value={selectedItem.plate_state}
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
              value={selectedItem.vehicle_type}
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
              value={selectedItem.driver_name}
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
              value={selectedItem.renavam}
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
              value={selectedItem.chassis}
              inputVariants={{ size: 'sm' }}
              labelVariants={{ size: 'sm' }}
              containerVariants={{ layout: 'row' }}
              containerClassName="flex-1"
            />
          </InputRow>

          {selectedItem.status === AnalysisStatus.FINISHED ? (
            <>
              <SelectGroup
                title="Resultado da análise"
                required
                disabled
                layout="row"
                value={selectedItem.analysis_result}
                items={analysisResultsSelectItems}
                containerClassName="mt-2"
              />
              <TextArea
                label="Descrição da análise (registro de Bos, inquéritos, artigos e termos circunstanciais):"
                name="analysis_info"
                disabled
                value={selectedItem.analysis_info}
              />
            </>
          ) : (
            <SelectGroup
              title="Status"
              value={selectedItem.status}
              disabled
              required
              layout="row"
              items={analysisStatusSelectItems}
              containerClassName="mt-2"
            />
          )}
        </Box>
      )}
    </>
  )
}
