'use client';

import { Button } from '@/components/Button';
import { ControlledInput } from '@/components/ControlledInput';
import { RoutePaths } from '@/constants/paths';
import recoveryPasswordSend from '@/services/auth/recovery-password';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { type ForgotPasswordSchema, schema } from './schema';

export function ForgotPasswordForm() {
  const { control, handleSubmit } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(schema),
    defaultValues: { email: '' },
  });

  const {
    isPending,
    isSuccess,
    mutate: recoveryPasswordMutate,
  } = useMutation({
    mutationFn: recoveryPasswordSend,
  });

  if (isSuccess) {
    return (
      <>
        <p className="text-center text-lg font-bold">
          Acesse seu e-mail para redefinir a senha!
        </p>
        <img
          src="/images/forget-password-success.png"
          className="w-80 self-center"
        ></img>
        <Button
          size="xsx"
          theme="accent"
          className="mt-6 min-w-[12rem] self-center"
          href={RoutePaths.login()}
        >
          Voltar para o login
        </Button>
      </>
    );
  }

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={handleSubmit((data) => recoveryPasswordMutate(data))}
    >
      <ControlledInput
        control={control}
        name="email"
        label="Insira o e-mail cadastrado"
        placeholder="Insira o seu e-mail"
        labelVariants={{ theme: 'primary' }}
      />
      <Button type="submit" size="sm" theme="primary" loading={isPending}>
        Enviar
      </Button>
    </form>
  );
}
