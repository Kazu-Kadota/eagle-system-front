'use client';

import { Button } from '@/components/Button';
import { ControlledInput } from '@/components/ControlledInput';
import { ControlledSelectGroup } from '@/components/ControlledSelectGroup';
import { InputRow } from '@/components/InputRow';
import { companyTypeSelectItems } from '@/constants/auth';
import { registerCompany } from '@/services/auth/register';
import { useModal } from '@/store/modal/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { CompanyType } from 'src/models';
import { type RegisterCompanySchema, registerCompanySchema } from './schema';

export const RegisterCompanyForm = () => {
  const modal = useModal();
  const router = useRouter();
  const queryClient = useQueryClient();
  const session = useSession();

  const { control, reset, handleSubmit } = useForm<RegisterCompanySchema>({
    resolver: zodResolver(registerCompanySchema),
    defaultValues: {
      name: '',
      cnpj: '',
      type: CompanyType.CLIENT,
    },
  });

  const { mutate: onSubmit, isPending } = useMutation({
    mutationFn: (data: RegisterCompanySchema) =>
      registerCompany(session.data?.jwt.token ?? ' ', data),
    onSuccess: () => {
      modal.open({
        title: 'Empresa criada com\nsucesso!',
        buttons: [{ children: 'OK', onClick: () => router.back() }],
      });

      reset();

      queryClient.invalidateQueries({ queryKey: ['companies'] });
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
          name="name"
          type="text"
          placeholder="Nome"
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
        />
        <ControlledInput
          control={control}
          label="CNPJ:"
          name="cnpj"
          type="cnpj"
          placeholder="XX.XXX.XXX/XXXX-XX"
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
        />
      </InputRow>

      <ControlledSelectGroup
        control={control}
        title="Tipo da empresa:"
        name="type"
        items={companyTypeSelectItems}
        layout="row"
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
