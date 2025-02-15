import {
  changePasswordSchema,
  type ChangePasswordSchema,
} from '@/components/ChangePasswordModal/schema';
import { ChangePasswordUI } from '@/components/ChangePasswordModal/ui';
import { changePassword } from '@/services/auth/change-password';
import { useModal } from '@/store/modal/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';

export function ChangePasswordModalContent() {
  const modal = useModal();
  const session = useSession();

  const { control, handleSubmit } = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      old_password: '',
      password: '',
      confirm_password: '',
    },
  });

  const {
    mutate: changePasswordMutate,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn: (data: ChangePasswordSchema) =>
      changePassword({
        password: data.password,
        old_password: data.old_password,
        token: session.data?.jwt.token ?? '',
      }),
    onSuccess: () => modal.update({ disableOverlayClose: false }),
  });

  return (
    <ChangePasswordUI
      control={control}
      isPending={isPending}
      isSuccess={isSuccess}
      onSubmit={handleSubmit((data) => changePasswordMutate(data))}
    />
  );
}
