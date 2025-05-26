'use client';

import { prepareReportQuery } from '@/app/(protected)/relatorios/utils';
import { DownloadIcon } from '@/assets/icons/DownloadIcon';
import { Box } from '@/components/Box';
import { Button } from '@/components/Button';
import { ControlledInput } from '@/components/ControlledInput';
import { SelectGroup } from '@/components/SelectGroup';
import { simpleAnalysisTypesItems } from '@/constants/analysis';
import { RoutePaths } from '@/constants/paths';
import { useCompaniesSelectItems } from '@/hooks/useCompanies';
import {
  downloadPersonAnalysisReport,
  downloadVehicleAnalysisReport,
} from '@/services/report/report';
import { useModal } from '@/store/modal/store';
import { useSessionUserType } from '@/store/session';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AnalysisType, UserType } from 'src/models';
import { hasUserType } from 'src/utils/userType';
import { reportSchema, type ReportSchema } from './schema';

export function ReportHomeForm() {
  const modal = useModal();

  const router = useRouter();
  const userType = useSessionUserType();

  const { companiesSelectItems, isLoading: companiesLoading } =
    useCompaniesSelectItems({
      enabled: hasUserType(userType, UserType.ADMIN),
    });

  const { control, reset, handleSubmit } = useForm<ReportSchema>({
    resolver: zodResolver(reportSchema),
    values: {
      start_date: '',
      final_date: '',
      company: '',
      userType: userType,
    },
  });

  const [analysisType, setAnalysisType] = useState(AnalysisType.PERSON);

  const downloadAnalysisReport = (analysisType: AnalysisType) =>
    ({
      [AnalysisType.PERSON]: downloadPersonAnalysisReport,
      [AnalysisType.COMBO]: downloadPersonAnalysisReport,
      [AnalysisType.VEHICLE]: downloadVehicleAnalysisReport,
    })[analysisType];

  const onSuccessRequestAnalysis = () => {
    const goBackRoute = {
      [AnalysisType.PERSON]: RoutePaths.PEOPLE_ANALYSIS_HOME,
      [AnalysisType.VEHICLE]: RoutePaths.VEHICLE_ANALYSIS_HOME,
      [AnalysisType.COMBO]: RoutePaths.PEOPLE_ANALYSIS_HOME,
    }[analysisType];

    modal.open({
      title: 'Download concluído com\nsucesso!',
      buttons: [
        { children: 'Emitir outro relatório', onClick: () => reset() },
        {
          children: 'Ir para página inicial',
          theme: 'dark',
          onClick: () => router.push(goBackRoute),
        },
      ],
    });
  };

  const { isPending, mutate: onSubmit } = useMutation({
    onMutate: console.log,
    mutationFn: async (data: ReportSchema) => {
      const query = prepareReportQuery(data);

      await downloadAnalysisReport(analysisType)(query);
    },
    onSuccess: onSuccessRequestAnalysis,
  });

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
          onSubmit={handleSubmit((data) => onSubmit(data))}
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
            loading={isPending}
          >
            <span>Gerar relatório </span>
            <DownloadIcon className="ml-1 w-6 fill-light" />
          </Button>
        </form>
      </Box>
    </>
  );
}
