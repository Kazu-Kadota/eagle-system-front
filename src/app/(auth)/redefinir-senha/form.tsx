'use client';

import { Button } from '@/components/Button';
import { ControlledInput } from '@/components/ControlledInput';
import { RoutePaths } from '@/constants/paths';
import resetPasswordSend from '@/services/auth/reset-password';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { type ResetPasswordFormData, schema } from './schema';

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { control, handleSubmit } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(schema),
    defaultValues: { password: '', confirm_password: '' },
  });

  const { mutate: resetPasswordMutate, isPending } = useMutation({
    mutationFn: (data: ResetPasswordFormData) =>
      resetPasswordSend(data, {
        email: searchParams.get('email') ?? '',
        recovery_id: searchParams.get('recovery_id') ?? '',
      }),
    onSuccess: () => {
      toast.success('Sua senha foi redefinida com sucesso!');
      router.push(RoutePaths.login());
    },
  });

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit((data) => resetPasswordMutate(data))}
    >
      <ControlledInput
        control={control}
        name="password"
        label="Insira a sua nova senha"
        labelVariants={{ theme: 'dark', size: 'xs' }}
        placeholder="Insira a senha"
        type="password"
      />
      <ControlledInput
        control={control}
        name="confirm_password"
        label="Repita a nova senha"
        labelVariants={{ theme: 'dark', size: 'xs' }}
        placeholder="Repita sua senha"
        type="password"
      />
      <Button
        type="submit"
        size="sm"
        theme="primary"
        className="mt-2 w-36 self-center"
        loading={isPending}
      >
        Salvar
      </Button>
    </form>
  );
}
