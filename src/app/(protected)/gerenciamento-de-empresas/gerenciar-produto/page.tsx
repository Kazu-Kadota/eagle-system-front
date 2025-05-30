'use client';

import { useMemo } from 'react';

import { createCompaniesColumns } from '@/app/(protected)/gerenciamento-de-empresas/gerenciar-produto/columns';
import { LoadingContainer } from '@/components/LoadingContainer';
import { Table } from '@/components/Table';
import { useCompanies } from '@/hooks/useCompanies';
import { ConfigType } from '@/store/config';

export default function OperatorsPage() {
  const { companies, isLoading } = useCompanies({
    enabled: true,
    refetchOnWindowFocus: true,
  });

  const columns = useMemo(() => createCompaniesColumns(), []);

  if (isLoading) {
    return <LoadingContainer />;
  }

  return (
    <div className="flex flex-col gap-10 sm:gap-[3.4rem]">
      <Table
        title="Empresas"
        configType={ConfigType.COMPANIES}
        rowIdAcessor={(item) => item.company_id}
        data={companies}
        columns={columns}
        actions={[]}
      />
    </div>
  );
}
