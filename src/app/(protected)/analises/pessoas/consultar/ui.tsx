import { columns } from '@/app/(protected)/analises/pessoas/consultar/columns';
import { ProcessFinished } from '@/app/(protected)/analises/pessoas/consultar/process';
import type { AnalysisPersonSearchSchema } from '@/app/(protected)/analises/pessoas/consultar/schema';
import { SearchIcon } from '@/assets/icons/SearchIcon';
import { AnalysisTable } from '@/components/AnalysisTable';
import { Box } from '@/components/Box';
import { Button } from '@/components/Button';
import { ControlledInput } from '@/components/ControlledInput';
import { Input } from '@/components/Input';
import { InputRow } from '@/components/InputRow';
import { LoadingContainer } from '@/components/LoadingContainer';
import { SelectGroup } from '@/components/SelectGroup';
import { TextArea } from '@/components/TextArea';
import { customDayJs } from '@/config/dayjs';
import {
  analysisResultsSelectItems,
  analysisStatusSelectItems,
  personRegionTypeButtonTheme,
} from '@/constants/analysis';
import { userApiSelectItems } from '@/constants/auth';
import { cnhTypesSelectItems } from '@/constants/cnh';
import { estadosSelectItems } from '@/constants/estados';
import {
  AnalysisStatus,
  AnalysisType,
  PersonAnalysisType,
  UserType,
  type PersonAnalysis,
} from '@/models';
import type { SelectItem } from '@/types/select';
import { getAnalysisTypeString } from '@/utils/analysis/mappers';
import { toStringBoolean } from '@/utils/boolean';
import { hasUserType } from '@/utils/userType';
import type { Control } from 'react-hook-form';

interface SearchPersonAnalysisUIProps {
  userType?: UserType;
  isPersonLoading: boolean;
  isLoading: boolean;
  document: string;
  control: Control<AnalysisPersonSearchSchema>;
  companiesSelectItems: SelectItem[];
  companiesLoading: boolean;
  items: PersonAnalysis[] | null;
  selectedItem: PersonAnalysis | null;
  setSelectedItem: (item: PersonAnalysis) => void;
  onSearchSubmit: () => void;
}

export function SearchPersonAnalysisUI({
  control,
  isLoading,
  isPersonLoading,
  userType,
  companiesSelectItems,
  companiesLoading,
  items,
  document,
  selectedItem,
  setSelectedItem,
  onSearchSubmit,
}: SearchPersonAnalysisUIProps) {
  const renderFinished = () => {
    if (!selectedItem) return null;

    if (selectedItem.person_analysis_type === PersonAnalysisType.PROCESS) {
      return null;
    }

    return (
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
        <SelectGroup
          required
          title="Resposta do Banco de Dados?"
          items={userApiSelectItems}
          layout="row"
          value={toStringBoolean(selectedItem.from_db)}
          containerClassName="mb-2"
          disabled
        />
        <TextArea
          label="Descrição da análise (registro de Bos, inquéritos, artigos e termos circunstanciais):"
          name="analysis_info"
          disabled
          value={selectedItem.analysis_info}
        />
      </>
    );
  };

  const renderPerson = () => {
    if (isPersonLoading) {
      return <LoadingContainer />;
    }

    if (!selectedItem || Object.keys(selectedItem).length === 0) return null;

    return (
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
              {customDayJs(selectedItem.finished_at).format(
                'DD/MM/YYYY [às] HH:mm:ss',
              )}
            </Button>
          )}
          <Button theme="opaque" size="xxs" disabled shadow="base">
            Solicitada em{' '}
            {customDayJs(selectedItem?.created_at).format(
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

        <InputRow>
          <Input
            label="ID da solicitação:"
            placeholder="ID da solicitação"
            name="request_id"
            value={selectedItem.request_id}
            disabled
            required
            inputVariants={{ size: 'sm' }}
            labelVariants={{ size: 'sm' }}
            containerVariants={{ layout: 'row' }}
            containerClassName="flex-1"
          />
          <Input
            label="ID da pessoa:"
            placeholder="ID da pessoa"
            name="person_id"
            value={selectedItem.person_id}
            disabled
            required
            inputVariants={{ size: 'sm' }}
            labelVariants={{ size: 'sm' }}
            containerVariants={{ layout: 'row' }}
            containerClassName="flex-1"
          />
        </InputRow>

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
                ? customDayJs(selectedItem.birth_date).format('DD/MM/YYYY')
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
                ? customDayJs(selectedItem.expire_at_cnh).format('DD/MM/YYYY')
                : ''
            }
            inputVariants={{ size: 'sm' }}
            labelVariants={{ size: 'sm' }}
            containerVariants={{ layout: 'row' }}
            containerClassName="flex-1"
          />
        </InputRow>

        {selectedItem.status === AnalysisStatus.FINISHED ? (
          renderFinished()
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
    );
  };

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
            <span>Pesquisar</span>
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
              analysisType={AnalysisType.PERSON}
              data={items}
              onClick={setSelectedItem}
              pageCount={5}
            />
          )}
        </>
      )}

      {renderPerson()}

      {selectedItem?.status === AnalysisStatus.FINISHED &&
        selectedItem.person_analysis_type === PersonAnalysisType.PROCESS && (
          <ProcessFinished
            analysis_info={selectedItem.analysis_info}
            requestId={selectedItem.request_id}
            personId={selectedItem.person_id}
            document={document}
          />
        )}
    </>
  );
}
