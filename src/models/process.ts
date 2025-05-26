export interface ProcessPart {
  documento: string | null;
  parte_ativa: boolean;
  nome: string;
  polaridade: string;
  detalhes_partes: {
    tipo_especifico: string;
  };
  data_ultima_captura: string;
}

export interface ProcessUpdate {
  conteudo: string;
  data_publicacao: string;
  data_captura: null;
}

export interface Process {
  numero: string;
  tipo: string;
  assunto_principal: string;
  nome_tribunal: string;
  nivel_tribunal: number;
  tipo_tribunal: string;
  distrito_tribunal: string | null;
  juiz: string;
  vara_tribunal: string;
  estado: string;
  status: null;
  servico_processo: string;
  processos_relacionados: [];
  assunto_cnj_inferido: string;
  numero_cnj_inferido: string;
  artigo: string;
  dispositivo_legal: string;
  glossario: string;
  tipo_processo_cnj_inferido: string;
  numero_tipo_processo_cnj_inferido: string | null;
  assunto_cnj_amplo_inferido: string | null;
  numero_assunto_cnj_amplo_inferido: string | null;
  outros_assuntos: string[];
  numero_volumes: null;
  numero_paginas: null;
  valor: number;
  data_transito_em_julgado: null;
  data_arquivamento: null;
  data_redistribuicao: null;
  data_publicacao: null;
  data_notificacao: string;
  data_ultima_movimentacao: string;
  data_captura: null;
  ultima_atualizacao: string;
  numero_partes: number;
  numero_atualizacoes: number;
  idade_processo: number;
  media_atualizacoes_por_mes: number;
  motivo_dados_ocultos: null;
  partes: ProcessPart[];
  atualizacoes: ProcessUpdate[];
  peticoes: [];
  decisoes: [];
}

export interface ProcessResponse {
  processos_judiciais_administrativos: {
    processos: Process[];
  };
}
