'use client';

import { Table } from '@/components/Table';
import type { ButtonProps } from '@/components/Button';
import { LoadingContainer } from '@/components/LoadingContainer';
import { RoutePaths } from '@/constants/paths';
import { usePersonAnalysis } from '@/hooks/usePersonAnalysis';
import { AnalysisType, UserType } from '@/models';
import { useSessionUserType } from '@/store/session';
import { hasUserType } from '@/utils/userType';
import { personTableColumns, personTableColumnsAdminOperator } from './columns';
import { ConfigType } from '@/store/config';

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

  const { personAnalysis, isLoading } = usePersonAnalysis();

  if (isLoading) {
    return <LoadingContainer />;
  }

  return (
    <div className="flex flex-col gap-10 sm:gap-[3.4rem]">
      <Table
        title="Pessoas"
        configType={ConfigType.PERSON}
        data={personAnalysis}
        columns={
          hasUserType(userType, UserType.ADMIN, UserType.OPERATOR)
            ? personTableColumnsAdminOperator
            : personTableColumns
        }
        actions={getTableActions(AnalysisType.PERSON, userType)}
      />
    </div>
  );
}
