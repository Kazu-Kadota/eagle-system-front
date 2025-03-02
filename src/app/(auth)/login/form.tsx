'use client';

import { loginAction } from '@/app/(auth)/login/actions';
import { schema, type LoginSchema } from '@/app/(auth)/login/schema';
import { Button } from '@/components/Button';
import { ControlledInput } from '@/components/ControlledInput';
import { RoutePaths } from '@/constants/paths';
import { getErrorMsg } from '@/utils/errors';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { control, handleSubmit } = useForm<LoginSchema>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  const {
    error,
    isPending,
    mutate: loginMutate,
  } = useMutation({
    meta: { disableErrorToastMsg: true },
    mutationFn: async (data: LoginSchema) => {
      const { error } = await loginAction(data);

      if (error) throw error;
    },
    onSuccess: () => {
      router.push(searchParams.get('callbackUrl') || RoutePaths.HOME);
    },
  });

  return (
    <form
      className="mt-4 flex flex-col gap-6"
      onSubmit={handleSubmit((data) => loginMutate(data))}
    >
      <ControlledInput
        control={control}
        name="email"
        label="E-mail"
        placeholder="Insira o seu e-mail"
        type="email"
        labelVariants={{ size: '2xl' }}
      />
      <ControlledInput
        control={control}
        name="password"
        label="Senha"
        placeholder="Insira a senha"
        type="password"
        labelVariants={{ size: '2xl' }}
      />
      {error && (
        <p className="-mb-1 -mt-2 text-center text-sm text-error">
          {getErrorMsg(error)}
        </p>
      )}
      <Button type="submit" loading={isPending}>
        Entrar
      </Button>
    </form>
  );
}
