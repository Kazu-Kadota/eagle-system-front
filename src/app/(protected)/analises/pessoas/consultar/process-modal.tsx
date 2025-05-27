'use client';

import { LawHammerIcon } from '@/assets/icons/LawHammerIcon';
import { MovementIcon } from '@/assets/icons/MovementIcon';
import { PartiesIcon } from '@/assets/icons/PartiesIcon';
import { RoundInfoIcon } from '@/assets/icons/RoundInfoIcon';
import { ScaleIcon } from '@/assets/icons/ScaleIcon';
import { TimesIcon } from '@/assets/icons/TimesIcon';
import { Box } from '@/components/Box';
import { Clickable } from '@/components/Clickable';
import {
  Info,
  InfoCard,
  InfoCol,
  InfoContent,
  InfoRow,
  InfoTitle,
} from '@/components/InfoCard';
import { ProcessPolarityItem } from '@/components/ProcessPolarityItem';
import { Tab } from '@/components/Tab';
import { Table } from '@/components/Table';
import { Timeline, type TimelineItem } from '@/components/Timeline';
import type { Process, ProcessPart } from '@/models/process';
import { useModal } from '@/store/modal/store';
import { formatCurrency } from '@/utils/currency';
import { maskCpfOrCnpj } from '@/utils/masks';
import type { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';

type Props = {
  process: Process;
  part?: ProcessPart;
};

export function getPartInfo(tipoEspecifico: string) {
  const tipo = tipoEspecifico.toUpperCase();

  const poloAtivo = [
    'AUTOR',
    'RECLAMANTE',
    'IMPETRANTE',
    'EXEQUENTE',
    'AGRAVANTE',
    'APELANTE',
    'EMBARGANTE',
    'DENUNCIANTE LIDE',
    'OPOENTE',
    'DEPRECANTE',
    'QUERELANTE',
    'CREDOR',
    'REPRESENTANTE DO MP',
  ];

  const poloPassivo = [
    'RÉU',
    'RECLAMADO',
    'IMPETRADO',
    'EXECUTADO',
    'AGRAVADO',
    'APELADO',
    'EMBARGADO',
    'DENUNCIADO LIDE',
    'OPOSITOR',
    'DEPRECADO',
    'INDICIADO',
    'INVESTIGADO',
    'ACUSADO',
    'DENUNCIADO',
    'AUTOR DO FATO',
    'QUERELADO',
    'DEVEDOR',
    'SOCIEDADE EMPRESÁRIA',
  ];

  const neutros = [
    'TERCEIRO INTERESSADO',
    'ASSISTENTE SIMPLES',
    'ASSISTENTE LITISCONSORCIAL',
    'AMICUS CURIAE',
    'TESTEMUNHA',
    'VÍTIMA',
    'ADVOGADO',
    'SUCESSOR',
  ];

  if (poloAtivo.includes(tipo)) {
    return { polo: 'Ativo' as const, papel: 'Autor' as const };
  } else if (poloPassivo.includes(tipo)) {
    return { polo: 'Passivo' as const, papel: 'Réu' as const };
  } else if (neutros.includes(tipo)) {
    return { polo: 'Neutro' as const, papel: 'Neutro' as const };
  } else {
    return { polo: 'Desconhecido' as const, papel: 'Desconhecido' as const };
  }
}

const partsColumns: ColumnDef<ProcessPart>[] = [
  {
    header: 'Nome',
    accessorKey: 'nome',
  },
  {
    header: 'Documento',
    accessorFn: (row) =>
      row.documento ? maskCpfOrCnpj(row.documento) : 'Não informado',
    meta: {
      className: 'sm:w-20 break-all',
    },
  },
  {
    header: 'Tipo',
    accessorFn: (row) => getPartInfo(row.detalhes_partes.tipo_especifico).papel,
    meta: {
      className: 'sm:w-20 break-all',
    },
  },
  {
    header: 'Polaridade',
    accessorFn: (row) => getPartInfo(row.detalhes_partes.tipo_especifico).polo,
    cell: (value) => (
      <span
        className={`min-w-[4.5rem] rounded-md px-2 py-1 text-center text-sm font-bold text-card ${{ Ativo: 'bg-successLight', Passivo: 'bg-errorLight', Neutro: 'bg-warningLight' }[value.getValue() as string] ?? 'bg-placeholder'}`}
      >
        {value.getValue() as string}
      </span>
    ),
    meta: {
      className: 'sm:w-16',
    },
  },
  {
    header: 'Parte ativa',
    accessorFn: (row) => (row.parte_ativa ? 'Sim' : 'Não'),
    meta: {
      className: 'sm:w-16',
    },
  },
];

export default function ProcessDetailsModal({ process, part }: Props) {
  const modal = useModal();

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

  const renderSubjectsCard = () => {
    const subjects = [
      { label: 'Assunto principal', value: process.assunto_principal },
      { label: 'Assunto CNJ Inferido', value: process.assunto_cnj_inferido },
      {
        label: 'Assunto CNJ Amplo Inferido',
        value: process.assunto_cnj_amplo_inferido,
      },
      { label: 'Outros assuntos', value: process.outros_assuntos },
    ].filter((subject) =>
      Array.isArray(subject.value) ? subject.value.length > 0 : !!subject.value,
    );

    let content;

    if (subjects.length === 0) {
      content = (
        <InfoContent className="flex flex-col items-center">
          <LawHammerIcon className="text-empty w-10" />
          <p className="text-empty text-center text-lg font-bold">
            Nenhum assunto registrado.
          </p>
        </InfoContent>
      );
    } else {
      content = (
        <InfoContent className="grid grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] gap-6">
          {subjects.map((subject) => (
            <InfoCard key={subject.label} variant="accent">
              <InfoTitle variant="accent">{subject.label}</InfoTitle>
              <InfoContent variant="accent">
                {Array.isArray(subject.value)
                  ? subject.value.map((text) => <span key={text}>{text}</span>)
                  : subject.value}
              </InfoContent>
            </InfoCard>
          ))}
        </InfoContent>
      );
    }

    return (
      <InfoCard>
        <InfoTitle>Assuntos</InfoTitle>
        {content}
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

        {renderSubjectsCard()}

        {renderDecisionsCard()}
      </div>
    </>
  );

  const renderParts = () => (
    <InfoCard className="mt-4">
      <InfoContent className="pb-6 max-sm:p-0">
        <Table columns={partsColumns} data={process.partes} />
      </InfoContent>
    </InfoCard>
  );

  const renderMovements = () => {
    const itemsByDate = process.atualizacoes.reduce(
      (obj, item) => {
        obj[item.data_publicacao] = {
          date: item.data_publicacao,
          content: (obj[item.data_publicacao]?.content ?? []).concat(
            item.conteudo,
          ),
        } as TimelineItem;

        return obj;
      },
      {} as Record<string, TimelineItem>,
    );

    return (
      <div className="sm:px-4 sm:pt-4">
        <Timeline items={Object.values(itemsByDate)} />
      </div>
    );
  };

  return (
    <Box
      containerClassName="flex-1 overflow-hidden"
      className="overflow-hidden pb-0"
      title={
        <>
          <span className="mt-3 flex flex-col items-center gap-1 text-center sm:mt-0 sm:flex-row sm:gap-3 sm:text-left">
            <ScaleIcon className="min-w-[2rem] max-w-[2rem] text-dark" />
            <span className="max-sm:break-all">
              Detalhes do Processo nº {process.numero}
            </span>
          </span>

          <div className="flex gap-6">
            <ProcessPolarityItem className="mt-0.5" part={part} size="xl" />

            <Clickable
              onClick={() => modal.close()}
              className="absolute right-1 top-4 px-2 sm:static"
            >
              <TimesIcon className="w-5" />
            </Clickable>
          </div>
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
          {
            label: 'Movimentações',
            key: 'movimentsKey',
            renderIcon: (props) => <MovementIcon {...props} />,
            renderContent: renderMovements,
          },
        ]}
      />
    </Box>
  );
}
