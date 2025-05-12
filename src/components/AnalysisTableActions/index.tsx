import { CopyIcon } from '@/assets/icons/CopyIcon';
import { EditIcon } from '@/assets/icons/EditIcon';
import { TrashIcon } from '@/assets/icons/TrashIcon';
import { Clickable } from '@/components/Clickable';
import { Link } from '@/components/Link';
import { RoutePaths } from '@/constants/paths';
import {
  AnalysisType,
  type AnalysisCategory,
  type PersonAnalysis,
} from '@/models';
import { getErrorMsg } from '@/utils/errors';
import { toast } from 'react-toastify';
import {
  copyPersonToClipboard,
  copyVehicleToClipboard,
} from 'src/utils/clipboard';

interface AnalysisTableActionsProps {
  id: string;
  item: PersonAnalysis;
  type: AnalysisType;
  onDeleteAnalysis?: (item: PersonAnalysis, category: AnalysisCategory) => void;
}

const copyToClipboardFn = {
  [AnalysisType.PERSON]: copyPersonToClipboard,
  [AnalysisType.COMBO]: copyPersonToClipboard,
  [AnalysisType.VEHICLE]: copyVehicleToClipboard,
};

const detailRouteFn = {
  [AnalysisType.PERSON]: RoutePaths.peopleAnalysisDetail,
  [AnalysisType.COMBO]: RoutePaths.peopleAnalysisDetail,
  [AnalysisType.VEHICLE]: RoutePaths.vehicleAnalysisDetail,
};

export const AnalysisTableActions: React.FC<AnalysisTableActionsProps> = ({
  id,
  item,
  type,
  onDeleteAnalysis,
}) => {
  const copyToClipboard = async () => {
    try {
      await copyToClipboardFn[type](item);

      toast.success('Dados copiados com sucesso!', {
        autoClose: 1000,
        hideProgressBar: true,
        toastId: id,
      });
    } catch (error) {
      toast.error(`Houve um erro ao copiar os dados. ${getErrorMsg(error)}`);
    }
  };

  return (
    <span className="flex flex-row items-center justify-center gap-3">
      {onDeleteAnalysis && (
        <Clickable
          onClick={() => onDeleteAnalysis(item, type as AnalysisCategory)}
          title="Excluir limitações"
        >
          <TrashIcon className="w-[1.16rem] stroke-primary" />
        </Clickable>
      )}

      <Clickable onClick={copyToClipboard} title="Copiar dados">
        <CopyIcon className="w-5 stroke-primary" />
      </Clickable>

      <Link
        href={detailRouteFn[type](item as never)}
        target="_blank"
        title="Detalhes da análise"
      >
        <EditIcon className="w-5 stroke-primary" />
      </Link>
    </span>
  );
};
