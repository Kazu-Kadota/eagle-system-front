'use client';

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
import { useParams } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { toast } from 'react-toastify';

type Params = {
  id: string;
};

export default function OperatorDetailPage() {
  const params = useParams() as Params;

  const {
    user,
    companies: userCompanies,
    isLoading: isUserLoading,
  } = useUserDetails(params.id, UserType.OPERATOR);

  const { companiesSelectItems, isLoading: isCompaniesLoading } =
    useCompaniesSelectItems({
      enabled: true,
    });

  const [isSubmitPending, startSubmitTransition] = useTransition();

  const [selectedCompaniesList, setSelectedCompaniesList] =
    useState<MultiSelectItem>(() =>
      userCompanies.map((company) => ({ label: company, value: company })),
    );

  const handleSubmit = () =>
    startSubmitTransition(async () => {
      try {
        const selectedCompanies = selectedCompaniesList.map(
          (item) => item.value,
        );
        const companiesToDelete = userCompanies.filter(
          (company) => !selectedCompanies.includes(company),
        );
        const companiesToRegister = selectedCompanies.filter(
          (company) => !userCompanies.includes(company),
        );

        await Promise.all([
          companiesToRegister.length > 0 &&
            registerCompaniesAccess(params.id, companiesToRegister),
          companiesToDelete.length > 0 &&
            deleteCompaniesAccess(params.id, companiesToDelete),
        ]);

        toast.success('Empresas atribuídas com sucesso.');
      } catch (error) {
        toast.error(
          `Não foi possível atribuir as empresas. ${getErrorMsg(error)}`,
        );
      }
    });

  useEffect(() => {
    if (userCompanies) {
      setSelectedCompaniesList(
        userCompanies.map((company) => ({ label: company, value: company })),
      );
    }
  }, [userCompanies]);

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
        <div>
          <h2 className="mb-3 mt-1 text-sm font-bold text-dark">
            Selecione as empresas que deseja atribuir ao operador:
          </h2>

          <div className="flex max-w-3xl items-center gap-4">
            <div className="flex-1">
              <MultiSelect
                isMulti
                placeholder="Selecione as empresas"
                options={companiesSelectItems}
                value={selectedCompaniesList}
                loading={isCompaniesLoading}
                onChange={setSelectedCompaniesList}
              />
            </div>
            <Button
              loading={isSubmitPending}
              theme="primary"
              size="xsStrong"
              className="min-w-[10rem] self-center"
              onClick={handleSubmit}
            >
              Enviar
            </Button>
          </div>
        </div>
      </Box>
    </div>
  );
}
