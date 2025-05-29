'use client';

import {
  registerUserSchema,
  type RegisterUserSchema,
} from '@/app/(protected)/gerenciamento-de-usuarios/cadastrar-usuario/schema';
import { Button } from '@/components/Button';
import { ControlledInput } from '@/components/ControlledInput';
import { ControlledSelectGroup } from '@/components/ControlledSelectGroup';
import { InputRow } from '@/components/InputRow';
import {
  registerUserTypeSelectItems,
  userApiSelectItems,
} from '@/constants/auth';
import { useCompaniesSelectItems } from '@/hooks/useCompanies';
import { UserType } from '@/models';
import { registerUser } from '@/services/auth/register';
import { useModal } from '@/store/modal/store';
import { useSessionUserType } from '@/store/session';
import { hasUserType } from '@/utils/userType';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export const RegisterUserForm = () => {
  const modal = useModal();
  const router = useRouter();

  const userType = useSessionUserType();

  const { control, reset, handleSubmit } = useForm<RegisterUserSchema>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      user_type: UserType.ADMIN,
      api: 'false',
      company_name: '',
      password: '',
      user_last_name: '',
      user_first_name: '',
      email: '',
      password_confirmation: '',
    },
  });

  const { companiesSelectItems, isLoading: companiesLoading } =
    useCompaniesSelectItems({
      enabled: hasUserType(userType, UserType.ADMIN),
    });

  const { mutate: onSubmit, isPending } = useMutation({
    mutationFn: (data: RegisterUserSchema) =>
      registerUser({
        company_name: data.company_name,
        email: data.email,
        user_first_name: data.user_first_name,
        user_last_name: data.user_last_name,
        user_type: data.user_type,
        password: data.password,
        api: data.api === 'true',
      }),
    onSuccess: () => {
      modal.open({
        title: 'Usuário criado com\nsucesso!',
        buttons: [{ children: 'OK', onClick: () => router.back() }],
      });

      reset();
    },
  });

  return (
    <form
      className="mt-2 flex flex-col gap-3 sm:mt-4 sm:gap-4"
      onSubmit={handleSubmit((data) => onSubmit(data))}
    >
      <InputRow>
        <ControlledInput
          control={control}
          label="Nome:"
          name="user_first_name"
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
        />
        <ControlledInput
          control={control}
          label="Sobrenome:"
          name="user_last_name"
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
        />
        <ControlledInput
          control={control}
          label="E-mail:"
          name="email"
          type="email"
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
        />
      </InputRow>

      <InputRow>
        <ControlledInput
          control={control}
          label="Nome da Empresa:"
          name="company_name"
          placeholder="Selecione uma empresa"
          items={companiesSelectItems}
          loading={companiesLoading}
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
        />
        <ControlledInput
          control={control}
          label="Senha:"
          name="password"
          type="password"
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
        />
        <ControlledInput
          control={control}
          label="Confirmação de Senha:"
          name="password_confirmation"
          type="password"
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
        />
      </InputRow>

      <ControlledSelectGroup
        control={control}
        title="Permissões de acesso:"
        name="user_type"
        items={registerUserTypeSelectItems}
        layout="row"
      />

      <ControlledSelectGroup
        control={control}
        title="Irá utilizar a API?"
        name="api"
        items={userApiSelectItems}
        layout="row"
        containerClassName="-mt-1"
      />

      <Button
        theme="primary"
        size="xsStrong"
        type="submit"
        className="mt-3 min-w-[10rem] self-center sm:mt-0"
        loading={isPending}
      >
        Salvar
      </Button>
    </form>
  );
};
