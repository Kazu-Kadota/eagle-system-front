import type { LinkBoxItem } from '@/components/LinksBox';
import { RoutePaths } from '@/constants/paths';
import { AnalysisType, PersonRegionType, UserType } from 'src/models';
import { hasUserType } from 'src/utils/userType';

export const linksVehicles = (userType: UserType) => {
  const links: LinkBoxItem[] = [
    {
      label: 'Consultar Análise de Frota',
      path: RoutePaths.SEARCH_VEHICLE_ANALYSIS,
    },
  ];

  if (hasUserType(userType, UserType.ADMIN, UserType.CLIENT)) {
    links.unshift(
      {
        label: 'Solicitar Análise de Frota',
        path: RoutePaths.requestAnalysis({
          analysisType: AnalysisType.VEHICLE,
        }),
      },
      {
        label: 'Solicitar Análise de Combo',
        path: RoutePaths.requestAnalysis({ analysisType: AnalysisType.COMBO }),
      },
    );
  }

  return links;
};

export const linksPeople = (userType: UserType) => {
  const links: LinkBoxItem[] = [
    {
      label: 'Consultar Análise de Pessoa',
      path: RoutePaths.SEARCH_PEOPLE_ANALYSIS,
    },
  ];

  if (hasUserType(userType, UserType.ADMIN, UserType.CLIENT)) {
    links.unshift(
      {
        label: 'Solicitar Análise Nacional',
        path: RoutePaths.requestAnalysis({
          analysisType: AnalysisType.PERSON,
          regionType: PersonRegionType.NATIONAL,
        }),
      },
      {
        label: 'Solicitar Análise Estadual',
        path: RoutePaths.requestAnalysis({
          analysisType: AnalysisType.PERSON,
          regionType: PersonRegionType.STATES,
        }),
      },
    );
  }

  return links;
};

export const linksRegister: LinkBoxItem[] = [
  {
    label: 'Cadastrar Usuários',
    path: RoutePaths.REGISTER_USER,
  },
  {
    label: 'Cadastrar Empresas',
    path: RoutePaths.REGISTER_COMPANY,
  },
];
