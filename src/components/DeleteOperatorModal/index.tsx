import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';

import { Button } from '@/components/Button';
import type { User } from '@/models';
import { deleteUsers } from '@/services/users';
import { useModal } from '@/store/modal/store';

type Props = {
  operator: User;
  onSuccess: () => void;
};

export function DeleteOperatorModal({ operator, onSuccess }: Props) {
  const modal = useModal();

  const { isPending, mutate: onDeleteClick } = useMutation({
    onMutate: () => modal.update({ preventClosing: true }),
    mutationFn: () => deleteUsers({ user_ids: [operator.user_id] }),
    onSuccess: () => {
      modal.close({ force: true });
      toast.success('Limitações removidas com sucesso');
      onSuccess();
    },
    onError: () => modal.update({ preventClosing: false }),
  });

  return (
    <div className="flex flex-1 flex-col justify-center gap-8">
      <h2 className="whitespace-pre-line px-2 text-center text-2xl font-semibold leading-tight text-dark">
        Deseja excluir as limitações do operador{' '}
        <strong>
          {operator.user_first_name} {operator.user_last_name}
        </strong>{' '}
        ?
      </h2>

      <div className="flex items-center justify-center gap-3 px-7">
        <Button
          size="sm"
          shadow="base"
          theme="accent"
          className="max-w-[18rem] flex-1"
          onClick={() => modal.close()}
        >
          Voltar
        </Button>

        <Button
          loading={isPending}
          size="sm"
          shadow="base"
          theme="error"
          className="max-w-[18rem] flex-1"
          onClick={() => onDeleteClick()}
        >
          Sim, excluir
        </Button>
      </div>
    </div>
  );
}
