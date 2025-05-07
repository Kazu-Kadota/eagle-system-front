'use client';

import type { ButtonProps } from '@/components/Button';
import { LoadingContainer } from '@/components/LoadingContainer';
import { Table } from '@/components/Table';
import { RoutePaths } from '@/constants/paths';
import { useVehicleAnalysis } from '@/hooks/useVehicleAnalysis';
import { AnalysisType, UserType } from '@/models';
import { ConfigType } from '@/store/config';
import { useSessionUserType } from '@/store/session';
import { hasUserType } from '@/utils/userType';
import {
  vehicleTableColumns,
  vehicleTableColumnsAdminOperator,
} from './columns';

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

export function VehicleAnalysisHomeClient() {
  const userType = useSessionUserType();

  const { vehicleAnalysis, isLoading } = useVehicleAnalysis();

  if (isLoading) {
    return <LoadingContainer />;
  }

  return (
    <div className="flex flex-col gap-10 sm:gap-[3.4rem]">
      <Table
        title="Veículos"
        configType={ConfigType.VEHICLE}
        data={vehicleAnalysis}
        columns={
          hasUserType(userType, UserType.ADMIN, UserType.OPERATOR)
            ? vehicleTableColumnsAdminOperator
            : vehicleTableColumns
        }
        actions={getTableActions(AnalysisType.VEHICLE, userType)}
      />
    </div>
  );
}
