import { Control } from 'react-hook-form'
import { ReportSchema } from '../schema'
import { SelectItem } from 'src/types/select'
import { Box, Button, ControlledInput, SelectGroup } from 'src/components'
import { AnalysisType, UserType } from 'src/models'
import { simpleAnalysisTypesItems } from 'src/features/analysis/constants/analysis'
import { hasUserType } from 'src/utils/userType'
import { DownloadIcon } from 'src/assets/icons'

interface ReportHomeUIProps {
  userType: UserType
  control: Control<ReportSchema>
  isLoading: boolean
  companiesSelectItems: SelectItem[]
  companiesLoading: boolean
  analysisType: AnalysisType
  setAnalysisType: (analysisType: AnalysisType) => void
  onSubmit: () => void
}

export function ReportHomeUI({
  userType,
  control,
  isLoading,
  companiesLoading,
  companiesSelectItems,
  analysisType,
  setAnalysisType,
  onSubmit,
}: ReportHomeUIProps) {
  return (
    <>
      <Box title="Relatórios de Análise de Fonte">
        <SelectGroup
          title="Selecione o tipo de relatório desejado"
          items={simpleAnalysisTypesItems}
          value={analysisType}
          onChange={setAnalysisType}
        />
      </Box>

      <Box spacing="sm" containerClassName="mt-3">
        <h2 className="mb-4 text-sm font-bold text-dark">
          Preencha os campos abaixo para emitir o relatório
        </h2>
        <form
          className="flex flex-col gap-3 pb-2 xl:max-w-6xl xl:flex-row"
          onSubmit={onSubmit}
        >
          <ControlledInput
            control={control}
            label="Data inicial"
            name="start_date"
            type="date"
            placeholder="dd/mm/aaaa"
            required
            inputVariants={{ size: 'sm' }}
            labelVariants={{ size: 'sm' }}
            containerVariants={{ layout: 'row' }}
            containerClassName="flex-1"
          />
          <ControlledInput
            control={control}
            label="Data final"
            name="final_date"
            type="date"
            placeholder="dd/mm/aaaa"
            required
            inputVariants={{ size: 'sm' }}
            labelVariants={{ size: 'sm' }}
            containerVariants={{ layout: 'row' }}
            containerClassName="flex-1"
          />
          {hasUserType(userType, UserType.ADMIN) && (
            <ControlledInput
              control={control}
              label="Empresa:"
              placeholder="Selecione uma empresa"
              name="company"
              required
              items={companiesSelectItems}
              loading={companiesLoading}
              inputVariants={{ size: 'sm' }}
              labelVariants={{ size: 'sm' }}
              containerVariants={{ layout: 'row' }}
              containerClassName="flex-[1.6]"
            />
          )}
          <Button
            size="xsx"
            type="submit"
            className="mt-4 min-w-[12rem] self-center xl:-mt-1 xl:self-start"
            loading={isLoading}
          >
            Gerar relatório <DownloadIcon className="ml-1 w-6 fill-light" />
          </Button>
        </form>
      </Box>
    </>
  )
}
