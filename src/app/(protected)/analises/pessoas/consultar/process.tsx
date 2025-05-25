import { ProcessIcon } from '@/assets/icons/ProcessIcon';
import { Box } from '@/components/Box';
import { Button } from '@/components/Button';
import { Info, InfoRow } from '@/components/InfoCard';
import { ProcessPolarityItem } from '@/components/ProcessPolarityItem';
import { RoutePaths } from '@/constants/paths';
import type { Process, ProcessResponse } from '@/models/process';
import { unmask } from '@/utils/masks';
import dayjs from 'dayjs';
import { memo, useMemo } from 'react';

type Props = {
  analysis_info: string;
  requestId: string;
  personId: string;
  document: string;
};

type CardProps = {
  process: Process;
  document: string;
  detailRoute: string;
};

function Card({ process, document, detailRoute }: CardProps) {
  const polarity = process.partes.find(
    (part) => unmask(part.documento ?? '') === unmask(document),
  )?.polaridade;

  return (
    <li className="flex flex-col justify-between gap-5 rounded-[0.1875rem] bg-card p-4 shadow-processCard sm:m-4">
      <div className="grid gap-3">
        <div className="flex items-center gap-2">
          <ProcessIcon className="w-4 text-placeholder" />
          <p className="break-all text-lg font-bold text-placeholder sm:text-2xl/none">
            {process.numero}
          </p>
        </div>

        <ProcessPolarityItem className="mt-0.5" polarity={polarity} />

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
        href={detailRoute}
        size="xsStrong"
        theme="primaryLight"
        className="self-end"
        target="_blank"
      >
        Ver + detalhes
      </Button>
    </li>
  );
}

const MemoizedCard = memo(Card);

export function ProcessFinished({
  analysis_info,
  requestId,
  personId,
  document,
}: Props) {
  const processList = useMemo(() => {
    try {
      const response = JSON.parse(analysis_info) as ProcessResponse;

      return (
        response?.data?.processos_judiciais_administrativos?.processos ?? []
      );
    } catch (error) {
      console.error("Couldn't parse process analysis info", error);
      return [];
    }
  }, [analysis_info]);

  return (
    <Box title="Informações de Processos" containerClassName="mt-4">
      <ul className="grid grid-cols-1 justify-between gap-x-14 gap-y-4 px-2 pb-3 sm:grid-cols-[repeat(auto-fill,minmax(26rem,1fr))]">
        {processList.map((process) => (
          <MemoizedCard
            key={process.numero}
            process={process}
            document={document}
            detailRoute={RoutePaths.personProcessDetail(
              requestId,
              personId,
              process.numero,
            )}
          />
        ))}
      </ul>
    </Box>
  );
}
