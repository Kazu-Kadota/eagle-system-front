'use client';

import { useParams } from 'next/navigation';
import { useMemo, useState, useTransition } from 'react';
import { toast } from 'react-toastify';

import { Box } from '@/components/Box';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { InputRow } from '@/components/InputRow';
import { LoadingContainer } from '@/components/LoadingContainer';
import { MultiSelect, type MultiSelectItem } from '@/components/MultiSelect';
import { SelectGroup } from '@/components/SelectGroup';
import { userApiSelectItems } from '@/constants/auth';
import { useCompaniesSelectItems } from '@/hooks/useCompanies';
import { useUserDetails } from '@/hooks/useUserDetail';
import { UserType } from '@/models';
import {
  deleteCompaniesAccess,
  registerCompaniesAccess,
} from '@/services/users';
import { getErrorMsg } from '@/utils/errors';

type Params = {
  id: string;
};

export default function OperatorDetailPage() {
  const params = useParams() as Params;

  const {
    user,
    companies: userCompanies,
    isLoading: isUserLoading,
    refetch: refetchUserDetails,
  } = useUserDetails(params.id, UserType.OPERATOR);

  const { companiesSelectItems, isLoading: isCompaniesLoading } =
    useCompaniesSelectItems({
      enabled: true,
    });

  const [isSubmitPending, startSubmitTransition] = useTransition();

  const [selectedCompaniesList, setSelectedCompaniesList] =
    useState<MultiSelectItem>([]);

  const companiesToSelect = useMemo<MultiSelectItem>(
    () =>
      companiesSelectItems.filter(
        (company) =>
          !userCompanies.includes(company.value) &&
          !selectedCompaniesList.some((item) => item.value === company.value),
      ),
    [selectedCompaniesList, userCompanies, companiesSelectItems],
  );

  const companiesToRegister = useMemo<MultiSelectItem>(
    () => selectedCompaniesList.filter((company) => company.type === 'success'),
    [selectedCompaniesList],
  );

  const companiesToDelete = useMemo<MultiSelectItem>(
    () => selectedCompaniesList.filter((company) => company.type === 'error'),
    [selectedCompaniesList],
  );

  const userCompaniesSelectItems = useMemo<MultiSelectItem>(
    () => userCompanies.map((item) => ({ label: item, value: item })),
    [userCompanies],
  );

  const handleSubmit = () =>
    startSubmitTransition(async () => {
      try {
        await Promise.all([
          companiesToRegister.length > 0 &&
            registerCompaniesAccess(
              params.id,
              companiesToRegister.map((item) => item.value),
            ),
          companiesToDelete.length > 0 &&
            deleteCompaniesAccess(
              params.id,
              companiesToDelete.map((item) => item.value),
            ),
        ]);

        await refetchUserDetails();
        setSelectedCompaniesList([]);

        toast.success('Empresas atribuídas com sucesso.');
      } catch (error) {
        toast.error(
          `Não foi possível atribuir as empresas. ${getErrorMsg(error)}`,
        );
      }
    });

  const handleUserCompaniesChange = (list: MultiSelectItem) => {
    const itemsRemoved: MultiSelectItem = userCompaniesSelectItems
      .filter((company) => !list.some((item) => company.value === item.value))
      .filter(
        (company) =>
          !selectedCompaniesList.some((item) => company.value === item.value),
      )
      .map((company) => ({ ...company, type: 'error' }));

    setSelectedCompaniesList((curr) => curr.concat(itemsRemoved));
  };
  const handleToDeleteCompaniesChange =
    (type: MultiSelectItem[0]['type']) => (list: MultiSelectItem) => {
      const itemsRemoved = selectedCompaniesList.filter(
        (company) =>
          company.type === type &&
          !list.some((item) => company.value === item.value),
      );

      setSelectedCompaniesList((curr) =>
        curr.filter(
          (currItem) =>
            !itemsRemoved.some((item) => item.value === currItem.value),
        ),
      );
    };

  const handleUserCompaniesAdd = (list: MultiSelectItem) => {
    setSelectedCompaniesList((curr) =>
      curr.concat(list.map((item) => ({ ...item, type: 'success' }))),
    );
  };

  if (isUserLoading) {
    return <LoadingContainer />;
  }

  return (
    <div className="grid gap-4">
      {!!user && (
        <Box
          title="Detalhes do Operador"
          className="flex flex-col gap-3 sm:gap-4"
        >
          <InputRow>
            <Input
              label="Nome:"
              name="first_name"
              type="text"
              disabled
              value={user.user_first_name}
              inputVariants={{ size: 'sm' }}
              labelVariants={{ size: 'sm' }}
              containerVariants={{ layout: 'row' }}
              containerClassName="flex-1"
            />
            <Input
              label="Sobrenome:"
              name="last_name"
              type="text"
              disabled
              value={user.user_last_name}
              inputVariants={{ size: 'sm' }}
              labelVariants={{ size: 'sm' }}
              containerVariants={{ layout: 'row' }}
              containerClassName="flex-1"
            />
          </InputRow>
          <InputRow>
            <Input
              label="E-mail"
              name="email"
              type="text"
              disabled
              value={user.email}
              inputVariants={{ size: 'sm' }}
              labelVariants={{ size: 'sm' }}
              containerVariants={{ layout: 'row' }}
              containerClassName="flex-1"
            />
          </InputRow>
          <SelectGroup
            title="Irá utilizar a API?"
            items={userApiSelectItems}
            layout="row"
            disabled
            value={user.api ? 'true' : 'false'}
          />
        </Box>
      )}

      <Box title="Atribuir Empresas">
        <h2 className="mb-2 mt-1 text-lg font-bold text-dark">
          Empresas já atribuídas:
        </h2>

        <div className="grid max-w-3xl gap-4">
          <MultiSelect
            isMulti
            disableSelection
            placeholder=""
            options={userCompaniesSelectItems}
            value={userCompaniesSelectItems}
            loading={isCompaniesLoading}
            onChange={handleUserCompaniesChange}
          />

          {(companiesToRegister.length > 0 || companiesToDelete.length > 0) && (
            <h2 className="-mb-1 mt-3 text-lg font-bold text-dark">
              Atribuições pendentes:
            </h2>
          )}

          {companiesToRegister.length > 0 && (
            <div>
              <label className="mb-1 inline-block text-base font-bold text-success">
                Empresas a adicionar:
              </label>
              <MultiSelect
                isMulti
                disableSelection
                placeholder=""
                options={companiesToRegister}
                value={companiesToRegister}
                loading={isCompaniesLoading}
                onChange={handleToDeleteCompaniesChange('success')}
              />
            </div>
          )}

          {companiesToDelete.length > 0 && (
            <div>
              <label className="mb-1 inline-block text-base font-bold text-error">
                Empresas a remover:
              </label>
              <MultiSelect
                isMulti
                disableSelection
                placeholder=""
                options={companiesToDelete}
                value={companiesToDelete}
                loading={isCompaniesLoading}
                onChange={handleToDeleteCompaniesChange('error')}
              />
            </div>
          )}

          <div>
            <h2 className="mb-2 mt-4 text-lg font-bold text-dark">
              Selecione as empresas que deseja atribuir ao operador
            </h2>
            <MultiSelect
              isMulti
              placeholder="Selecione as empresas"
              options={companiesToSelect}
              value={[]}
              loading={isCompaniesLoading}
              onChange={handleUserCompaniesAdd}
            />
          </div>
        </div>

        <Button
          loading={isSubmitPending}
          theme="primary"
          size="xsStrong"
          className="mt-8 min-w-[10rem] self-center"
          onClick={handleSubmit}
        >
          Enviar
        </Button>
      </Box>
    </div>
  );
}
