'use client';

import { LawHammerIcon } from '@/assets/icons/LawHammerIcon';
import { PartiesIcon } from '@/assets/icons/PartiesIcon';
import { RoundInfoIcon } from '@/assets/icons/RoundInfoIcon';
import { ScaleIcon } from '@/assets/icons/ScaleIcon';
import { Box } from '@/components/Box';
import {
  Info,
  InfoCard,
  InfoCol,
  InfoContent,
  InfoRow,
  InfoTitle,
} from '@/components/InfoCard';
import { LoadingContainer } from '@/components/LoadingContainer';
import { ProcessPolarityItem } from '@/components/ProcessPolarityItem';
import { Tab } from '@/components/Tab';
import { usePersonAnalysisDetail } from '@/hooks/usePersonAnalysisDetail';
import type { ProcessResponse } from '@/models/process';
import { formatCurrency } from '@/utils/currency';
import { unmask } from '@/utils/masks';
import dayjs from 'dayjs';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

type Params = {
  requestId: string;
  personId: string;
  processId: string;
};

export default function ProcessDetailsPage() {
  const params = useParams() as Params;

  const { person, isLoading } = usePersonAnalysisDetail({
    id: params.requestId,
    personId: params.personId,
  });

  const process = useMemo(() => {
    if (!person.analysis_info) return null;

    try {
      const response = JSON.parse(person.analysis_info) as ProcessResponse;
      const processList =
        response.data.processos_judiciais_administrativos.processos;

      return processList.find((proc) => proc.numero === params.processId);
    } catch (error) {
      console.error("Couldn't parse process analysis info", error);
      return null;
    }
  }, [person.analysis_info]);

  const polarity = useMemo(
    () =>
      process?.partes?.find(
        (part) => unmask(part.documento ?? '') === unmask(person.document),
      )?.polaridade,
    [process, person.document],
  );

  if (isLoading) return <LoadingContainer />;

  if (!process) return null;

  const renderAgeCircle = () => (
    <div className="shadow-infoCard flex size-36 flex-col items-center justify-center rounded-full border-[1.45px] border-primary text-center text-primary">
      <p className="text-4xl/none font-extrabold">
        {Math.floor(process.idade_processo)}
      </p>
      <p className="text-2xs/tight font-extrabold">
        IDADE DO PROCESSO
        <br />
        (DIAS)
      </p>
    </div>
  );

  const renderDecisionsCard = () => {
    let content;

    if (process.decisoes.length === 0) {
      content = (
        <>
          <LawHammerIcon className="text-empty w-10" />
          <p className="text-empty text-center text-lg font-bold">
            Nenhuma decisão registrada.
          </p>
        </>
      );
    } else {
      // TODO:
    }

    return (
      <InfoCard>
        <InfoTitle>Decisões</InfoTitle>
        <InfoContent className="flex-1 items-center justify-center">
          {content}
        </InfoContent>
      </InfoCard>
    );
  };

  const renderGeneralInfo = () => (
    <>
      <div className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <InfoCard>
          <InfoTitle>Ficha Técnica do Processo</InfoTitle>
          <InfoContent>
            <InfoRow>
              <Info label="Número" value={process.numero} />
              <Info label="Tipo" value={process.tipo} />
            </InfoRow>
            <InfoRow>
              <Info label="Tribunal" value={process.nome_tribunal} />
              <Info label="Tema" value={process.assunto_principal} />
            </InfoRow>
            <InfoRow>
              <Info label="Comarca" value={process.distrito_tribunal ?? ''} />
              <Info label="Estado" value={process.estado} />
            </InfoRow>
            <InfoRow>
              <Info label="Orgão Julgador" value={process.vara_tribunal} />
              <Info label="Juiz" value={process.juiz} />
            </InfoRow>
            <InfoRow>
              <Info label="Artigo" value={process.artigo} />
              <Info
                label="Valor"
                value={
                  typeof process.valor === 'number'
                    ? formatCurrency(process.valor)
                    : ''
                }
              />
            </InfoRow>
          </InfoContent>
        </InfoCard>

        <InfoCard>
          <InfoTitle>Datas do Processo</InfoTitle>
          <InfoContent className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-20">
            <InfoCol>
              <Info
                label="Data de Início"
                value={
                  process.data_notificacao
                    ? dayjs(
                        process.data_notificacao,
                        'YYYY-MM-DD HH:MM:SS',
                      ).format('DD/MM/YYYY')
                    : ''
                }
              />
              <Info
                label="Data de Notificação"
                value={
                  process.data_notificacao
                    ? dayjs(
                        process.data_notificacao,
                        'YYYY-MM-DD HH:MM:SS',
                      ).format('DD/MM/YYYY')
                    : ''
                }
              />
              <Info
                label="Data do Julgamento"
                value={
                  process.data_transito_em_julgado
                    ? dayjs(
                        process.data_transito_em_julgado,
                        'YYYY-MM-DD HH:MM:SS',
                      ).format('DD/MM/YYYY')
                    : ''
                }
              />
              <Info
                label="Data de Redistribuição"
                value={
                  process.data_redistribuicao
                    ? dayjs(
                        process.data_redistribuicao,
                        'YYYY-MM-DD HH:MM:SS',
                      ).format('DD/MM/YYYY')
                    : ''
                }
              />
              <Info
                label="Data de Arquivamento"
                value={
                  process.data_arquivamento
                    ? dayjs(
                        process.data_arquivamento,
                        'YYYY-MM-DD HH:MM:SS',
                      ).format('DD/MM/YYYY')
                    : ''
                }
              />
            </InfoCol>

            <InfoCol className="self-center">{renderAgeCircle()}</InfoCol>
          </InfoContent>
        </InfoCard>

        <InfoCard>
          <InfoTitle>Assuntos</InfoTitle>
          <InfoContent className="grid grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] gap-6">
            {!!process.assunto_principal && (
              <InfoCard variant="accent">
                <InfoTitle variant="accent">Assunto Principal</InfoTitle>
                <InfoContent variant="accent">
                  {process.assunto_principal}
                </InfoContent>
              </InfoCard>
            )}
            {!!process.assunto_cnj_inferido && (
              <InfoCard variant="accent">
                <InfoTitle variant="accent">Assunto CNJ Inferido</InfoTitle>
                <InfoContent variant="accent">
                  {process.assunto_cnj_inferido}
                </InfoContent>
              </InfoCard>
            )}
            {!!process.assunto_cnj_amplo_inferido && (
              <InfoCard variant="accent">
                <InfoTitle variant="accent">
                  Assunto CNJ Amplo Inferido
                </InfoTitle>
                <InfoContent variant="accent">
                  {process.assunto_cnj_amplo_inferido}
                </InfoContent>
              </InfoCard>
            )}
            {!!process.outros_assuntos &&
              process.outros_assuntos.length > 0 && (
                <InfoCard variant="accent">
                  <InfoTitle variant="accent">Outros assuntos</InfoTitle>
                  <InfoContent variant="accent" className="whitespace-pre-line">
                    {process.outros_assuntos.map((text) => (
                      <span key={text}>{text}</span>
                    ))}
                  </InfoContent>
                </InfoCard>
              )}
          </InfoContent>
        </InfoCard>

        {renderDecisionsCard()}
      </div>
    </>
  );

  const renderParts = () => <></>;

  return (
    <Box
      title={
        <>
          <span className="flex flex-col items-center gap-1 text-center sm:flex-row sm:gap-3 sm:text-left">
            <ScaleIcon className="min-w-[2rem] max-w-[2rem] text-dark" />
            <span className="max-sm:break-all">
              Detalhes do Processo nº {process.numero}
            </span>
          </span>

          <ProcessPolarityItem
            className="mt-0.5"
            polarity={polarity}
            size="xl"
          />
        </>
      }
      titleClassName="flex max-sm:text-lg sm:flex-row items-center justify-center gap-2 flex-col sm:justify-between py-4"
    >
      <Tab
        items={[
          {
            label: 'Visão Geral',
            key: 'generalInfoKey',
            renderIcon: (props) => <RoundInfoIcon {...props} />,
            renderContent: renderGeneralInfo,
          },
          {
            label: 'Partes',
            key: 'partsKey',
            renderIcon: () => <PartiesIcon className="w-10" />,
            renderContent: renderParts,
          },
        ]}
      />
    </Box>
  );
}
