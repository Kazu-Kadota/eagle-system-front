import type {
  AnalysisType,
  PersonAnalysis,
  PersonRegionType,
  VehicleAnalysis,
} from '@/models';
import queryString from 'query-string';

export type LoginParams = {
  callbackUrl?: string;
};

export type RequestAnalysisParams = {
  analysisType: AnalysisType;
  regionType?: PersonRegionType;
};

export const RoutePaths = {
  HOME: '/',
  PEOPLE_ANALYSIS_HOME: '/analises/pessoas',
  VEHICLE_ANALYSIS_HOME: '/analises/veiculos',
  SEARCH_PEOPLE_ANALYSIS: '/analises/pessoas/consultar',
  SEARCH_VEHICLE_ANALYSIS: '/analises/veiculos/consultar',
  REPORT_HOME: '/relatorios',
  FORGOT_PASSWORD: '/esqueci-minha-senha',
  RESET_PASSWORD: '/redefinir-senha',
  REGISTER_HOME: '/gerenciamento-de-usuarios',
  REGISTER_USER: '/gerenciamento-de-usuarios/cadastrar-usuario',
  REGISTER_COMPANY: '/gerenciamento-de-usuarios/cadastrar-empresa',
  MANAGE_OPERATORS: '/gerenciamento-de-usuarios/operadores',
  operatorDetail: (userId: string) =>
    `/gerenciamento-de-usuarios/operadores/${userId}`,
  ACCOUNT_HOME: '/minha-conta',
  ACCESS_DENIED: '/acesso-negado',
  login: (query?: LoginParams) =>
    queryString.stringifyUrl({ url: '/login', query }),
  requestAnalysis: (params?: RequestAnalysisParams) =>
    queryString.stringifyUrl({
      url: '/analises/solicitar/',
      query: params,
    }),
  peopleAnalysisDetail: (item?: PersonAnalysis) =>
    queryString.stringifyUrl({
      url: `/analises/pessoas/${item?.request_id}`,
      query: { personId: item?.person_id },
    }),
  vehicleAnalysisDetail: (item?: VehicleAnalysis) =>
    queryString.stringifyUrl({
      url: `/analises/veiculos/${item?.request_id}`,
      query: { vehicleId: item?.vehicle_id },
    }),
};
