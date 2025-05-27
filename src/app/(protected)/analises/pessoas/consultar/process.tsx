import ProcessDetailsModal from '@/app/(protected)/analises/pessoas/consultar/process-modal';
import { ProcessIcon } from '@/assets/icons/ProcessIcon';
import { Box } from '@/components/Box';
import { Button } from '@/components/Button';
import { Info, InfoRow } from '@/components/InfoCard';
import { ProcessPolarityItem } from '@/components/ProcessPolarityItem';
import type { Process, ProcessPart, ProcessResponse } from '@/models/process';
import { useModal } from '@/store/modal/store';
import { unmask } from '@/utils/masks';
import dayjs from 'dayjs';
import { memo, useCallback, useMemo } from 'react';

type Props = {
  analysis_info: string;
  document: string;
};

type CardProps = {
  process: Process;
  document: string;
  onDetailClick: (process: Process, part?: ProcessPart) => void;
};

function Card({ process, document, onDetailClick }: CardProps) {
  const part = process.partes.find(
    (part) => unmask(part.documento ?? '') === unmask(document),
  );

  return (
    <li className="flex flex-col justify-between gap-5 rounded-[0.1875rem] bg-card p-4 shadow-processCard sm:m-4">
      <div className="grid gap-3">
        <div className="flex items-center gap-2">
          <ProcessIcon className="w-4 text-placeholder" />
          <p className="break-all text-lg font-bold text-placeholder sm:text-2xl/none">
            {process.numero}
          </p>
        </div>

        <ProcessPolarityItem className="mt-0.5" part={part} />

        <InfoRow>
          <Info label="Tipo" value={process.tipo} />
          <Info label="Tribunal" value={process.nome_tribunal} />
        </InfoRow>

        <InfoRow>
          <Info label="Comarca" value={process.distrito_tribunal ?? ''} />
          <Info label="Estado" value={process.estado} />
        </InfoRow>

        <Info label="Orgão Julgador" value={process.vara_tribunal} />

        <InfoRow>
          <Info
            label="Data de Início"
            value={
              process.data_notificacao
                ? dayjs(process.data_notificacao, 'YYYY-MM-DD HH:MM:SS').format(
                    'DD/MM/YYYY',
                  )
                : ''
            }
          />

          <Info label="Artigo" value={process.artigo} />
        </InfoRow>
      </div>

      <Button
        size="xsStrong"
        theme="primaryLight"
        className="self-end"
        onClick={() => onDetailClick(process, part)}
      >
        Ver + detalhes
      </Button>
    </li>
  );
}

const MemoizedCard = memo(Card);

export function ProcessFinished({ analysis_info, document }: Props) {
  const modal = useModal();

  const processList = useMemo(() => {
    try {
      const response = JSON.parse(analysis_info) as ProcessResponse;

      return response?.processos_judiciais_administrativos?.processos ?? [];
    } catch (error) {
      console.error("Couldn't parse process analysis info", error);
      return [];
    }
  }, [analysis_info]);

  const handleDetails = useCallback(
    (process: Process, part: ProcessPart | undefined) => {
      modal.open({
        content: <ProcessDetailsModal process={process} part={part} />,
        fullScreen: true,
      });
    },
    [],
  );

  return (
    <Box title="Informações de Processos" containerClassName="mt-4">
      <ul className="grid grid-cols-1 justify-between gap-x-14 gap-y-4 px-2 pb-3 sm:grid-cols-[repeat(auto-fill,minmax(26rem,1fr))]">
        {processList.map((process) => (
          <MemoizedCard
            key={process.numero + process.data_notificacao}
            process={process}
            document={document}
            onDetailClick={handleDetails}
          />
        ))}
      </ul>
    </Box>
  );
}
