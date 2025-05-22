'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import { useMemo, useTransition } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

import {
  schema,
  type Schema,
} from '@/app/(protected)/gerenciamento-de-empresas/gerenciar-produto/empresa/[id]/schema';
import { Box } from '@/components/Box';
import { Button } from '@/components/Button';
import { ControlledInput } from '@/components/ControlledInput';
import { Input, type InputType } from '@/components/Input';
import { InputRow } from '@/components/InputRow';
import { LoadingContainer } from '@/components/LoadingContainer';
import { useCompanies } from '@/hooks/useCompanies';
import { useFeatureFlagsBff } from '@/hooks/useFeatureFlagsBff';
import type { FeatureFlag } from '@/models';
import {
  setCompaniesFeatureFlags,
  updateCompaniesFeatureFlags,
} from '@/services/auth/companies';
import { getErrorMsg } from '@/utils/errors';
import { toast } from 'react-toastify';

type Params = {
  id: string;
};

export default function ManageCompanyFeatureFlagsPage() {
  const params = useParams() as Params;

  const [isSubmitPending, startSubmitTransition] = useTransition();

  const {
    isLoading: isCompanyLoading,
    companies,
    refetch: refetchCompany,
  } = useCompanies({
    enabled: true,
  });
  const { flags, isLoading: isFeatureFlagsLoading } = useFeatureFlagsBff();

  const company = useMemo(
    () => companies.find((c) => c.company_id === params.id),
    [params.id, companies],
  );

  const defaultFlags = useMemo(
    () => ({
      flags: flags.map((flag) => {
        const selectedFlag = company?.feature_flag?.find(
          (item) => item.feature_flag === flag.featureFlag,
        );

        return {
          selected: !!selectedFlag,
          flag: flag.featureFlag,
          fields:
            flag.config?.fields?.map((field) => ({
              label: field.label,
              placeholder: field['place-holder'],
              name: field.name,
              value: selectedFlag?.config?.[field.name]?.toString() ?? '',
              type: field.type,
            })) ?? [],
        };
      }),
    }),
    [flags, company],
  );

  const { control, handleSubmit } = useForm<Schema>({
    resolver: zodResolver(schema),
    values: defaultFlags,
  });

  const flagsFields = useFieldArray({
    control,
    name: 'flags',
  });

  const handleSend = (data: Schema) =>
    startSubmitTransition(async () => {
      try {
        const itemsToSend =
          data.flags?.map((item) => ({
            feature_flag: item.flag as FeatureFlag,
            enabled: item.selected,
            config:
              item.selected && item.fields && item.fields.length > 0
                ? item.fields.reduce(
                    (obj, field) => ({
                      ...obj,
                      [field.name]:
                        field.type === 'number'
                          ? Number(field.value)
                          : field.value,
                    }),
                    {},
                  )
                : undefined,
          })) ?? [];

        if (itemsToSend.length === 0) {
          toast.error('Nenhum item para enviar');
          return;
        }

        const params = {
          company_id: company?.company_id ?? '',
          feature_flags: itemsToSend,
        };

        await Promise.all([
          setCompaniesFeatureFlags(params),
          updateCompaniesFeatureFlags(params),
        ]);

        await refetchCompany();

        toast.success('Produtos atribuídos com sucesso');
      } catch (error) {
        toast.error(`Erro ao enviar a request. ${getErrorMsg(error)}`);
      }
    });

  const flagsAssignedJsx = useMemo(
    () =>
      !!company?.feature_flag && (
        <div>
          <h2 className="mb-3 text-sm font-bold text-dark">
            Produtos já atribuídos:
          </h2>
          <div className="flex flex-wrap gap-3">
            {company.feature_flag.map((flag) => (
              <div key={flag.feature_flag} className="flex items-center gap-2">
                <span className="h-4 w-4 bg-link" />
                <span className="text-sm font-medium text-placeholder">
                  {flag.feature_flag}
                  {!!flag.config &&
                    ` (${Object.entries(flag.config)
                      .map(
                        ([key, value]) =>
                          `${flags?.find((item) => item.featureFlag === flag.feature_flag)?.config?.fields?.find((field) => field.name === key)?.label ?? key}: ${value}`,
                      )
                      .join(', ')})`}
                </span>
              </div>
            ))}
          </div>
        </div>
      ),
    [company, flags],
  );

  if (isCompanyLoading || isFeatureFlagsLoading) {
    return <LoadingContainer />;
  }

  return (
    <div className="grid gap-4">
      {!!company && (
        <Box
          title="Detalhes da Empresa"
          className="flex flex-col gap-3 sm:gap-4"
        >
          <InputRow>
            <Input
              label="ID:"
              name="company_id"
              type="text"
              disabled
              value={company.company_id}
              inputVariants={{ size: 'sm' }}
              labelVariants={{ size: 'sm' }}
              containerVariants={{ layout: 'row' }}
              containerClassName="flex-[0.6]"
            />
            <Input
              label="Nome:"
              name="name"
              type="text"
              disabled
              value={company.name}
              inputVariants={{ size: 'sm' }}
              labelVariants={{ size: 'sm' }}
              containerVariants={{ layout: 'row' }}
              containerClassName="flex-1"
            />
          </InputRow>

          {flagsAssignedJsx}
        </Box>
      )}

      <Box title="Configurar Produtos">
        <h2 className="mb-3 text-base font-bold text-dark">
          Selecione os produtos que deseja atribuir a empresa:
        </h2>

        <div className="grid max-w-5xl xl:grid-cols-2">
          {flagsFields.fields.map((field, index) => (
            <Controller
              key={field.id}
              control={control}
              name={`flags.${index}`}
              render={({ field: { value, onChange } }) => (
                <div>
                  <button
                    role="radio"
                    type="button"
                    aria-checked={value.selected}
                    className="flex items-center gap-2 py-2"
                    onClick={() =>
                      onChange({ ...value, selected: !value.selected })
                    }
                  >
                    {value.selected ? (
                      <span className="h-4 w-4 bg-link" />
                    ) : (
                      <span className="h-4 w-4 border border-placeholder" />
                    )}
                    <span className="text-sm font-medium text-placeholder">
                      {value.flag}
                    </span>
                  </button>

                  {value.selected && value.fields.length > 0 && (
                    <div className="max-w-sm px-1 pb-4">
                      <p className="my-2 flex items-center gap-2 text-sm font-semibold text-primary text-opacity-60">
                        Preencha as configurações adicionais:
                      </p>

                      {value.fields.map((config, configIndex) => (
                        <ControlledInput
                          key={field.id + config.name}
                          control={control}
                          label={`${config.label}:`}
                          name={`flags.${index}.fields.${configIndex}.value`}
                          type={config.type as InputType}
                          required
                          placeholder={config.placeholder}
                          inputVariants={{ size: 'sm' }}
                          labelVariants={{ size: 'sm' }}
                          containerClassName="flex-1"
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            />
          ))}
        </div>

        <Button
          loading={isSubmitPending}
          theme="primary"
          size="xsStrong"
          className="mt-8 min-w-[10rem] self-center"
          onClick={handleSubmit(handleSend)}
        >
          Alterar
        </Button>
      </Box>
    </div>
  );
}
