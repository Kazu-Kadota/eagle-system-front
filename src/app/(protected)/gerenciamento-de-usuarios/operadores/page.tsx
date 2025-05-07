'use client';

import { operatorColumns } from '@/app/(protected)/gerenciamento-de-usuarios/operadores/columns';
import { LoadingContainer } from '@/components/LoadingContainer';
import { Table } from '@/components/Table';
import { useUsers } from '@/hooks/useUsers';
import { UserType } from '@/models';
import { ConfigType } from '@/store/config';

export default function OperatorsPage() {
  const { users: operators, isLoading } = useUsers({
    user_type_filter: UserType.OPERATOR,
  });

  if (isLoading) {
    return <LoadingContainer />;
  }

  return (
    <div className="flex flex-col gap-10 sm:gap-[3.4rem]">
      <Table
        title="Operadores"
        configType={ConfigType.OPERATOR}
        data={operators}
        columns={operatorColumns}
        actions={[]}
      />
    </div>
  );
}
