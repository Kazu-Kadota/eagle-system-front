'use client';

import { useCallback, useMemo } from 'react';

import { createPersonColumns } from '@/app/(protected)/analises/pessoas/columns';
import type { ButtonProps } from '@/components/Button';
import { DeleteAnalysisModal } from '@/components/DeleteAnalysisModal';
import { LoadingContainer } from '@/components/LoadingContainer';
import { Table } from '@/components/Table';
import { RoutePaths } from '@/constants/paths';
import { usePersonAnalysis } from '@/hooks/usePersonAnalysis';
import {
  AnalysisType,
  UserType,
  type AnalysisCategory,
  type PersonAnalysis,
} from '@/models';
import { ConfigType } from '@/store/config';
import { useModal } from '@/store/modal/store';
import { useSessionUserType } from '@/store/session';
import { hasUserType } from '@/utils/userType';

const analysisTypeLabel = {
  [AnalysisType.PERSON]: 'de Pessoa',
  [AnalysisType.VEHICLE]: 'de Veículo',
  [AnalysisType.COMBO]: 'Combo',
};

const analysisSearchRoute = {
  [AnalysisType.PERSON]: RoutePaths.SEARCH_PEOPLE_ANALYSIS,
  [AnalysisType.VEHICLE]: RoutePaths.SEARCH_VEHICLE_ANALYSIS,
  [AnalysisType.COMBO]: RoutePaths.SEARCH_PEOPLE_ANALYSIS,
};

function getTableActions(analysisType: AnalysisType, userType?: UserType) {
  const label = analysisTypeLabel[analysisType];

  const actions: ButtonProps[] = [
    {
      children: `Consultar Análise ${label}`,
      theme: 'placeholder',
      size: 'xs',
      href: analysisSearchRoute[analysisType],
    },
  ];

  if (hasUserType(userType, UserType.ADMIN, UserType.CLIENT)) {
    actions.unshift({
      children: `Solicitar Análise ${label}`,
      theme: 'darkPurple',
      size: 'xs',
      href: RoutePaths.requestAnalysis({ analysisType }),
    });
  }

  return actions;
}

export function PeopleAnalysisHomeClient() {
  const userType = useSessionUserType();
  const modal = useModal();

  const { personAnalysis, isLoading, refetch } = usePersonAnalysis();

  const handleDeleteAnalysis = useCallback(
    (item: PersonAnalysis, category: AnalysisCategory) => {
      modal.open({
        content: (
          <DeleteAnalysisModal
            item={item}
            category={category}
            onSuccess={() => refetch()}
          />
        ),
      });
    },
    [refetch],
  );

  const columns = useMemo(
    () =>
      userType
        ? createPersonColumns(userType, {
            onDeleteAnalysis: handleDeleteAnalysis,
          })
        : [],
    [handleDeleteAnalysis],
  );

  if (isLoading) {
    return <LoadingContainer />;
  }

  return (
    <div className="flex flex-col gap-10 sm:gap-[3.4rem]">
      <Table
        title="Pessoas"
        configType={ConfigType.PERSON}
        data={personAnalysis}
        columns={columns}
        rowIdAcessor={(item) => item.request_id + item.person_id}
        actions={getTableActions(AnalysisType.PERSON, userType)}
      />
    </div>
  );
}
