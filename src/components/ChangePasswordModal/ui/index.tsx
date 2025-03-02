import { Button } from '@/components/Button';
import type { ChangePasswordSchema } from '@/components/ChangePasswordModal/schema';
import { ControlledInput } from '@/components/ControlledInput';
import type { Control } from 'react-hook-form';

interface ChangePasswordUIProps {
  control: Control<ChangePasswordSchema>;
  isSuccess: boolean;
  isPending: boolean;
  onSubmit: () => void;
}

export function ChangePasswordUI({
  control,
  isSuccess,
  isPending,
  onSubmit,
}: ChangePasswordUIProps) {
  const renderDefault = () => (
    <form className="flex flex-col gap-4 px-4 py-6" onSubmit={onSubmit}>
      <h2 className="text-base font-bold text-primary">
        Para redefinir sua senha, preencha os campos abaixo
      </h2>

      <fieldset className="flex max-w-sm flex-col gap-3">
        <ControlledInput
          label="Insira sua senha atual"
          required
          control={control}
          name="old_password"
          type="password"
          placeholder="senha"
          labelVariants={{ size: 'sm' }}
          inputVariants={{ size: 'md' }}
        />
        <ControlledInput
          label="Insira a nova senha"
          required
          control={control}
          name="password"
          type="password"
          placeholder="nova senha"
          labelVariants={{ size: 'sm' }}
          inputVariants={{ size: 'md' }}
        />
        <ControlledInput
          label="Confirme a nova senha"
          required
          control={control}
          name="confirm_password"
          type="password"
          placeholder="nova senha"
          labelVariants={{ size: 'sm' }}
          inputVariants={{ size: 'md' }}
        />
      </fieldset>

      <Button
        type="submit"
        size="sm"
        theme="primary"
        className="mt-4 min-w-[10rem] self-center"
        loading={isPending}
      >
        Salvar
      </Button>
    </form>
  );

  const renderSuccess = () => (
    <div className="flex h-full items-center justify-center pb-2">
      <h2 className="text-center text-4xl font-semibold leading-tight text-dark">
        Senha redefinada com sucesso!
      </h2>
    </div>
  );

  if (isSuccess) {
    return renderSuccess();
  }

  return renderDefault();
}
