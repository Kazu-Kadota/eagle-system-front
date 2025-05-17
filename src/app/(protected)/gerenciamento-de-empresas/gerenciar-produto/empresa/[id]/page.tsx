'use client';

import { useParams } from 'next/navigation';
import { useMemo } from 'react';

import { Box } from '@/components/Box';
import { Input } from '@/components/Input';
import { InputRow } from '@/components/InputRow';
import { LoadingContainer } from '@/components/LoadingContainer';
import { useCompanies } from '@/hooks/useCompanies';
import { useFeatureFlagsBff } from '@/hooks/useFeatureFlagsBff';

type Params = {
  id: string;
};

export default function ManageCompanyFeatureFlagsPage() {
  const params = useParams() as Params;

  const { isLoading: isCompanyLoading, companies } = useCompanies({
    enabled: true,
  });
  const { isLoading: isFeatureFlagsLoading } = useFeatureFlagsBff();
  const company = useMemo(
    () => companies.find((c) => c.company_id === params.id),
    [params.id, companies],
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
        </Box>
      )}

      <Box title="Atribuir Feature Flags">
        <div>
          <h2 className="mb-3 mt-1 text-sm font-bold text-dark">
            Selecione as flags que deseja atribuir a empresa:
          </h2>
        </div>
      </Box>
    </div>
  );
}
