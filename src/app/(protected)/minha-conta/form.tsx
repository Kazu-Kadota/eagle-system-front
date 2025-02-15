'use client';

import { ChangePasswordModalContent } from '@/components/ChangePasswordModal';
import { Clickable } from '@/components/Clickable';
import { Input } from '@/components/Input';
import { InputRow } from '@/components/InputRow';
import { SelectGroup } from '@/components/SelectGroup';
import {
  registerUserTypeSelectItems,
  userApiSelectItems,
} from '@/constants/auth';
import { useCompanies } from '@/hooks/useCompanies';
import { UserType } from '@/models';
import { useModal } from '@/store/modal/store';
import { hasUserType } from '@/utils/userType';
import { useSession } from 'next-auth/react';

export function AccountHomeForm() {
  const modal = useModal();
  const session = useSession();
  const user = session.data?.user;

  const { companiesSelectItems, isLoading: companiesLoading } = useCompanies({
    enabled: hasUserType(user?.user_type, UserType.ADMIN),
    token: session.data?.jwt.token ?? '',
  });

  const onChangePassword = () => {
    modal.open({
      content: <ChangePasswordModalContent />,
      showCloseIcon: true,
      disableOverlayClose: true,
    });
  };

  return (
    <>
      <InputRow>
        <Input
          label="Nome:"
          name="first_name"
          type="text"
          disabled
          value={user?.user_first_name ?? ''}
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
          value={user?.user_last_name ?? ''}
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
          value={user?.email ?? ''}
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
        />
        {hasUserType(user?.user_type, UserType.ADMIN) && (
          <Input
            label="Nome da Empresa:"
            name="company_name"
            type="text"
            disabled
            placeholder="Selecione uma empresa"
            items={companiesSelectItems}
            loading={companiesLoading}
            value={user?.company_name}
            inputVariants={{ size: 'sm' }}
            labelVariants={{ size: 'sm' }}
            containerVariants={{ layout: 'row' }}
            containerClassName="flex-1"
          />
        )}
      </InputRow>

      {hasUserType(user?.user_type, UserType.ADMIN) && (
        <>
          <SelectGroup
            title="Permissões de acesso:"
            disabled
            items={registerUserTypeSelectItems}
            layout="row"
            value={user?.user_type}
          />
          <SelectGroup
            title="Irá utilizar a API?"
            items={userApiSelectItems}
            layout="row"
            disabled
            value={user?.api ? 'true' : 'false'}
          />
        </>
      )}

      <Clickable
        className="mt-1 self-start text-base font-medium text-link outline-none"
        onClick={onChangePassword}
      >
        Redefinir senha
      </Clickable>
    </>
  );
}
