import { toast } from 'react-toastify'
import { CopyIcon, EditIcon } from 'src/assets/icons'
import { Clickable, Link } from 'src/components'
import { AnalysisType, PersonAnalysis } from 'src/models'
import { RoutePaths } from 'src/routes/paths'
import {
  copyPersonToClipboard,
  copyVehicleToClipboard,
} from 'src/utils/clipboard'

interface AnalysisTableActionsProps {
  id: string
  item: PersonAnalysis
  type: AnalysisType
}

const copyToClipboardFn = {
  [AnalysisType.PERSON]: copyPersonToClipboard,
  [AnalysisType.COMBO]: copyPersonToClipboard,
  [AnalysisType.VEHICLE]: copyVehicleToClipboard,
}

const detailRouteFn = {
  [AnalysisType.PERSON]: RoutePaths.Analysis.peopleAnalysisDetail,
  [AnalysisType.COMBO]: RoutePaths.Analysis.peopleAnalysisDetail,
  [AnalysisType.VEHICLE]: RoutePaths.Analysis.vehicleAnalysisDetail,
}

export const AnalysisTableActions: React.FC<AnalysisTableActionsProps> = ({
  id,
  item,
  type,
}) => {
  const copyToClipboard = async () => {
    try {
      await copyToClipboardFn[type](item)

      toast.success('Dados copiados com sucesso!', {
        autoClose: 1000,
        hideProgressBar: true,
        toastId: id,
      })
    } catch (error) {
      toast.error('Houve um erro ao copiar os dados, tente novamente.')
    }
  }

  return (
    <span className="flex flex-row items-center justify-center gap-3">
      <Clickable onClick={copyToClipboard} title="Copiar dados">
        <CopyIcon className="w-5 stroke-primary" />
      </Clickable>
      <Link
        to={detailRouteFn[type](item as never)}
        target="_blank"
        title="Detalhes da análise"
      >
        <EditIcon className="w-5 stroke-primary" />
      </Link>
    </span>
  )
}
