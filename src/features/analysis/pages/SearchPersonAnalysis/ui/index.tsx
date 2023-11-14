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
import { AnalysisStatus, PersonAnalysis, UserType } from 'src/models'
import { SelectItem } from 'src/types/select'
import { hasUserType } from 'src/utils/userType'
import { AnalysisPersonSearchSchema } from '../schema'
import { columns } from './columns'
import dayjs from 'dayjs'
import {
  analysisResultsSelectItems,
  analysisStatusSelectItems,
  personRegionTypeButtonTheme,
} from 'src/features/analysis/constants/analysis'
import { getAnalysisTypeString } from 'src/features/analysis/utils/mappers'
import { estadosSelectItems } from 'src/features/analysis/constants/estados'
import { cnhTypesSelectItems } from 'src/features/analysis/constants/cnh'

interface SearchPersonAnalysisUIProps {
  userType: UserType
  isLoading: boolean
  control: Control<AnalysisPersonSearchSchema>
  companiesSelectItems: SelectItem[]
  companiesLoading: boolean
  items: PersonAnalysis[] | null
  selectedItem: PersonAnalysis | null
  setSelectedItem: (item: PersonAnalysis) => void
  onSearchSubmit: () => void
}

export function SearchPersonAnalysisUI({
  control,
  isLoading,
  userType,
  companiesSelectItems,
  companiesLoading,
  items,
  selectedItem,
  setSelectedItem,
  onSearchSubmit,
}: SearchPersonAnalysisUIProps) {
  return (
    <>
      <Box title="Consulta de Análise de Pessoa">
        <h2 className="text-sm font-bold text-dark">
          Preencha os campos abaixo para consultar uma análise. O campo “CPF” é
          obrigatório.
        </h2>
        <form
          className="mt-4 flex flex-col gap-5 md:max-w-lg md:flex-row md:items-center"
          onSubmit={onSearchSubmit}
        >
          <fieldset className="flex flex-[4] flex-col gap-4">
            <ControlledInput
              placeholder="CPF"
              name="searchDocument"
              type="cpf"
              inputVariants={{ size: 'md' }}
              labelVariants={{ size: 'sm' }}
              control={control}
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
          <div className="mb-2 flex flex-col-reverse items-center gap-3 sm:mb-0 sm:flex-row">
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
              theme={
                personRegionTypeButtonTheme[
                  selectedItem.region_type ?? selectedItem.person_analysis_type
                ]
              }
              size="xxs"
              disabled
              shadow="base"
            >
              Análise {getAnalysisTypeString(selectedItem)}
            </Button>
          </div>

          <Input
            label="Nome:"
            placeholder="Nome"
            name="name"
            value={selectedItem.name}
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
              value={selectedItem?.document}
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
                selectedItem?.birth_date
                  ? dayjs(selectedItem.birth_date).format('DD/MM/YYYY')
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
              value={selectedItem?.rg}
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
              value={selectedItem?.state_rg}
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
              value={selectedItem?.mother_name}
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
              value={selectedItem?.father_name}
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
              value={selectedItem?.naturalness}
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
              value={selectedItem?.cnh}
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
              value={selectedItem?.security_number_cnh}
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
              value={selectedItem?.category_cnh}
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
                selectedItem?.expire_at_cnh
                  ? dayjs(selectedItem.expire_at_cnh).format('DD/MM/YYYY')
                  : ''
              }
              inputVariants={{ size: 'sm' }}
              labelVariants={{ size: 'sm' }}
              containerVariants={{ layout: 'row' }}
              containerClassName="flex-1"
            />
          </InputRow>

          {hasUserType(userType, UserType.ADMIN, UserType.OPERATOR) &&
          selectedItem.status === AnalysisStatus.FINISHED ? (
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
