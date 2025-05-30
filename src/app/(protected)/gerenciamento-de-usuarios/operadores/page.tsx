'use client';

import { useCallback, useMemo } from 'react';

import { createOperatorColumns } from '@/app/(protected)/gerenciamento-de-usuarios/operadores/columns';
import { DeleteOperatorModal } from '@/components/DeleteOperatorModal';
import { LoadingContainer } from '@/components/LoadingContainer';
import { Table } from '@/components/Table';
import { useUsers } from '@/hooks/useUsers';
import { UserType, type User } from '@/models';
import { ConfigType } from '@/store/config';
import { useModal } from '@/store/modal/store';

export default function OperatorsPage() {
  const modal = useModal();
  const {
    users: operators,
    isLoading,
    refetch: refetchUsers,
  } = useUsers({
    user_type_filter: UserType.OPERATOR,
  });

  const handleDelete = useCallback(
    (user: User) => {
      modal.open({
        content: (
          <DeleteOperatorModal
            operator={user}
            onSuccess={() => refetchUsers()}
          />
        ),
      });
    },
    [refetchUsers],
  );

  const columns = useMemo(
    () => createOperatorColumns({ onDelete: handleDelete }),
    [handleDelete],
  );

  if (isLoading) {
    return <LoadingContainer />;
  }

  return (
    <div className="flex flex-col gap-10 sm:gap-[3.4rem]">
      <Table
        title="Operadores"
        configType={ConfigType.OPERATOR}
        data={operators}
        rowIdAcessor={(item) => item.user_id}
        columns={columns}
        actions={[]}
      />
    </div>
  );
}
