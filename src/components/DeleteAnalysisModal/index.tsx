import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { Button } from '@/components/Button';
import { deletePersonAnalysis } from '@/services/analysis/person';
import { deleteVehicleAnalysis } from '@/services/analysis/vehicle';
import { useModal } from '@/store/modal/store';
import type { AnalysisCategory } from '@/models';

export type Props = {
  item: any;
  category: AnalysisCategory;
  onSuccess: () => void;
};

export function DeleteAnalysisModal({ item, category, onSuccess }: Props) {
  const modal = useModal();

  const { isPending, mutate: onDeleteClick } = useMutation({
    onMutate: () => modal.update({ preventClosing: true }),
    mutationFn: async () => {
      await {
        person: () =>
          deletePersonAnalysis({
            request_id: item.request_id,
            person_id: item.person_id,
          }),
        vehicle: () =>
          deleteVehicleAnalysis({
            request_id: item.request_id,
            vehicle_id: item.vehicle_id,
          }),
      }[category]();
    },
    onSuccess: () => {
      modal.close({ force: true });
      toast.success('Análise excluída com sucesso!');
      onSuccess();
    },
    onError: () => modal.update({ preventClosing: false }),
  });

  return (
    <div className="flex flex-1 flex-col justify-center gap-8">
      <h2 className="whitespace-pre-line px-5 text-center text-3xl font-semibold leading-tight text-dark">
        Deseja realmente excluir a análise?
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
