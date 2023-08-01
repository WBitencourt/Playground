const XlsxPopulate = require('xlsx-populate');
import path from 'path';

interface Payload {
  origemReclamacao: string;
  padraoApuracao: string;
  objeto: string;
  subObjeto: string;
  demandante: string;
  tipoSolicitacao: string;
  dataDistribuicao: string;
  detalhesReclamacao: string;
  autor: string;
  cpfCnpj: string;
  enderecoAutor: string;
  codDocumentoCentral: string;
  acesso: string;
}

interface PayloadTranslated {
  origemReclamacao: number;
  padraoApuracao: number;
  objeto: number;
  subObjeto: number;
  demandante: number;
  tipoSolicitacao: number;
  dataDistribuicao: string;
  detalhesReclamacao: string;
  autor: string;
  cpfCnpj: string;
  enderecoAutor: string;
  codDocumentoCentral: string;
  acesso: string;
}

const subObjeto: any = {
  'ACIDENTE': {
    'PONTOS DE VENDA': 1,
    'REPAROS TIM/DANOS AO PATRIMÔNIO': 2
  },
  'ADVOGADO ADVERSO': {
    'CAPTAÇÃO DE CLIENTELA POR ADVOGADO OFENSOR': 1,
    'DETURPAÇÃO DOS FATOS/DOCUMENTOS': 2,
    'HONORÁRIOS SUCUMBENCIAIS': 3,
    'PATROCÍNIO INFIEL': 4,
    'TERGIVERSAÇÃO': 5
  },
  'ADVOGADO CORRESPONDENTE': {
    'COBRANÇA ADV. CORRESPONDENTE': 1
  },
  'AGUARDANDO CÓPIAS': {
    'DOCUMENTAÇÃO ILEGÍVEL OU INCOMPLETA': 1,
    'SEGREDO DE JUSTIÇA ': 2
  },
  'APARELHO': {
    'BLOQUEIO DE IMEI NÃO SOLICITADO': 1,
    'BLOQUEIO DE IMEI SOLICITADO E NÃO REALIZADO': 2,
    'CADASTRO NA LISTA DE APARELHOS BLOQUEADOS (CEMI/CAD)': 3,
    'DEFEITO DE APARELHO/ACESSÓRIOS': 4,
    'DEFEITO DE CHIP': 5,
    'DESBLOQUEIO DO APARELHO (SIM LOCK)': 6,
    'FALHA ALTERAÇÃO DE HORA': 7,
    'FALHA NA ENTREGA DO APARELHO': 8,
    'NÃO RECOLHIMENTO DO APARELHO': 9,
  },
  'ATENDIMENTO': {
    'APARELHO NÃO SOLICITADO': 1,
    'ATENDIMENTO CRC REALIZADO DE FORMA INADEQUADA': 2,
    'ATENDIMENTO LOJA REALIZADO DE FORMA INADEQUADA': 3,
    'ATENDIMENTO TÉCNICO/COMERCIAL REALIZADO DE FORMA INADEQUADA': 4,
    'ATIVAÇÃO/RESGATE DE CHIP': 5,
    'EXTRATO/FATURA NÃO DISPONIBILIZADO': 6,
    'TRATAMENTO NÃO ISONÔMICO': 7,
    'VENDA/ADESÃO RECUSADA': 8,
    
  },
  'COBRANÇA': {
    '515+LITIGÂNCIA': 1,
    '515-I': 2,
    'AUSÊNCIA DE NOTIFICAÇÃO': 3,
    'BLOQUEIO INDEVIDO': 4,
    'CADASTRO POSITIVO': 5,
    'CO BILLING': 6,
    'COBRANÇA POR SMP NEXTEL': 7,
    'DÉBITO AUTOMÁTICO': 8,
    'DEGUSTAÇÃO': 9,
    'DÍVIDAS DE TERCEIROS': 10,
    'FATURA RESIDUAL': 11,
    'INSTALAÇÃO NÃO REALIZADA': 12,
    'LIVE - OFERTA NÃO CUMPRIDA (SÍNDICO, GRATUIDADE, MUDANÇA DE PLANO)': 13,
    'NEGATIVAÇÃO INDEVIDA': 14,
    'NEGOCIAÇÃO DE DÉBITO': 15,
    'OFERTA NÃO CUMPRIDA (SÍNDICO, GRATUIDADE, MUDANÇA DE PLANO)': 16,
    'PRÓ-RATA': 17,
    'RECARGA CARTÃO DE CRÉDITO': 18,
    'RECUPERAÇÃO DE CRÉDITO': 19,
    'REDUÇÃO DO ICMS': 20,
    'SERASA LIMPA NOME': 21,
    'VALORES DE LITIGÂNCIA DE MÁ-FÉ': 22
  },
  'CONDUTA FUNCIONÁRIO PÚBLICO': undefined,
  'CONDUTA TIM NAS DEFESAS': undefined,
  'CONTA': {
    '2ª VIA': 1,
    'AJUSTE': 2,
    'BÔNUS NÃO CREDITADO': 3,
    'CHAMADAS NÃO RECONHECIDAS': 4,
    'CHAMADAS RETROATIVAS': 5,
    'CONTA JÁ PAGA': 6,
    'CRÉDITO/FRANQUIA NÃO DISPONIBILIZADO': 7,
    'ERRO NO CADASTRO DO CLIENTE': 8,
    'FATURA NÃO ENVIADA': 9,
    'LONGA DISTÂNCIA': 10,
    'PACOTE ADICIONAL DE DADOS NÃO RECONHECIDO': 11,
    'PACOTE ADICIONAL DE DADOS NÃO RECONHECIDO (CALISTENIA)': 12,
    'PARCELA DO APARELHO': 13,
    'PIS/CONFINS': 14,
    'RESTITUIÇÃO DE VALOR': 15,
    'ROAMING': 16,
    'SERVIÇO NÃO RECONHECIDO': 17,
    'SERVIÇO NÃO RECONHECIDO + ATENDIMENTO CRC': 18
  },
  'CONTRATO': {
    'ALTERAÇÃO DE PLANO SOLICITADA E NÃO REALIZADA': 1,
    'ALTERAÇÃO UNILATERAL': 2,
    'ALTERAÇÃO UNILATERAL + ATENDIMENTO CRC': 3,
    'BLOQUEIO': 4,
    'BLOQUEIO DE DADOS (CALISTENIA)': 5,
    'CANCELAMENTO DO CONTRATO NÃO SOLICITADO PORÉM REALIZADO': 6,
    'CANCELAMENTO DO CONTRATO NÃO SOLICITADO PORÉM REALIZADO + ATENDIMENTO CRC': 7,
    'CANCELAMENTO DO CONTRATO SOLICITADO MAS NÃO REALIZADO': 8,
    'CANCELAMENTO DO CONTRATO SOLICITADO MAS NÃO REALIZADO + ATENDIMENTO CRC': 9,
    'CANCELAMENTO DO SERVIÇO NÃO SOLICITADO PORÉM REALIZADO': 10,
    'CANCELAMENTO DO SERVIÇO NÃO SOLICITADO PORÉM REALIZADO + ATENDIMENTO CRC': 11,
    'CANCELAMENTO DO SERVIÇO SOLICITADO MAS NÃO REALIZADO': 12,
    'CANCELAMENTO DO SERVIÇO SOLICITADO MAS NÃO REALIZADO + ATENDIMENTO CRC': 13,
    'CANCELAMENTO EM RAZÃO DE NÃO ATUALIZAÇÃO CADASTRAL': 0,
    'CANCELAMENTO POR FALTA DE RECARGA': 14,
    'COMODATO': 15,
    'CÓPIA DO CONTRATO': 16,
    'DESCUMPRIMENTO DE CONTRATO_ QUANTIDADE DE ACESSOS DIVERGENTE': 17,
    'DESCUMPRIMENTO DE CONTRATO_ SERVIÇOS DIVERGENTES': 18,
    'DESCUMPRIMENTO DE CONTRATO_ VALORES DIVERGENTES': 19,
    'INCAPACIDADE DA PARTE': 20,
    'MEU BEM, VOLTO JÁ': 21,
    'MIGRAÇÃO PARA PRÉ-PAGO': 22,
    'MULTA DE FIDELIZAÇÃO': 23,
    'PRICE UP': 24,
    'REAPROVEITAMENTO DE LINHA': 25,
    'SERVIÇO NÃO PRESTADO': 26,
    'TROCA DE TITULARIDADE': 27,
    'VALIDADE DO CRÉDITO': 28,
    'VENDA CASADA': 29
  },
  'DECRETO SAC': {
    'DESCUMPRIMENTO DE REGRAS': 1,
    'VEICULAÇÃO DE MENSAGEM PUBLICITÁRIA / NÃO PERTURBE': 2,
    'VEICULAÇÃO DE MENSAGEM PUBLICITÁRIA / NÃO PERTURBE+ATENDIMENTO CRC': 3
  },
  'Descumprimento de Lei/Decreto': {
    'IMPOSSIBILIDADE DE BLOQUEIO MESMO COM DÉBITO EM ABERTO': 1,
    'IMPOSSIBILIDADE DE COBRANÇA DE MULTA DE FIDELIZAÇÃO': 2, 
  },
  'DIREITOS AUTORAIS': {
    'RINGTONE': 1
  },
  'FRAUDE': {
    'ATIVAÇÃO - HABILITAÇÃO INDEVIDA': 1,
    'ATIVAÇÃO - HABILITAÇÃO INDEVIDA_NEGATIVAÇÃO': 2,
    'BYPASS/RÁDIO': 3,
    'CALL SPOFF/ATIVAÇÃO EM DUPLICIDADE': 4,
    'E-MAIL COBRANÇA (PHISHING)': 5,
    'FRAUDE DE SUBSCRIÇÃO': 6,
    'FRAUDE DE SUBSCRIÇÃO_NEGATIVAÇÃO': 7,
    'LINK MALICIOSO': 8,
    'SERASA LIMPA NOME': 9,
    'TRANSFERÊNCIA DE TITULARIDADE': 10,
    'TROCA DE CHIP': 11,
    'VIOLAÇÃO DE PRIVACIDADE': 12
  },
  'INSTALAÇÃO_MUDANÇA_DE_ENDEREÇO': {
    'ADEQUAÇÃO PREDIAL': 1,
    'AGENDAMENTO - INVIABILIDADE TÉCNICA': 2,
    'AGENDAMENTO - NÃO REALIZADO': 3,
    'AGENDAMENTO - TÉCNICO NÃO COMPARECEU': 4,
    'DANOS DECORRENTES DA INSTALAÇÃO': 5,
    'DIVERGÊNCIA CADASTRAL - ENDEREÇO INCORRETO/SEM COMPLEMENTO/PLANO': 6
  },
  'LGPD': {
    'Base de dados compartilhada - Outras Operadoras': 1,
    'Base de dados compartilhada - Televendas TIM': 2,
  },
  'PORTABILIDADE': {
    'COBRANÇA INDEVIDA/ NÃO CANCELAMENTO DO NÚMERO PROVISÓRIO': 1,
    'PORT IN - CANCELAMENTO SOLICITADO MAS NÃO REALIZADO': 2,
    'PORT IN - NÃO REALIZADO': 3,
    'PORT IN - NÃO SOLICITADO': 4,
    'PORT OUT - CANCELAMENTO SOLICITADO MAS NÃO REALIZADO': 5,
    'PORT OUT - NÃO REALIZADO': 6,
    'PORT OUT - NÃO SOLICITADO': 7,
    'PRÉ MIGRAÇÃO OI': 8
  },
  'PROPAGANDA': {
    'PUBLICIDADE ENGANOSA': 1
  },
  'QUEBRA DE SIGILO': {
    'COM PEDIDO DE DANO MORAL': 1
  },
  'REDE': {
    'ÁREAS FRONTEIRIÇAS': 1,
    'COBERTURA': 2,
    'COBERTURA 4.5G': 3,
    'DESLIGAMENTO TDMA/AMPS': 4,
    'DIFICULDADE EM CHAMADAS DE SERVIÇOS ESSENCIAIS': 5,
    'FALHA DO SATÉLITE INTELSAT': 6,
    'LIVE - BAIXA VELOCIDADE': 7,
    'LIVE - INDISPONIBILIDADE SERVIÇO': 8,
    'LIVE - OSCILAÇÃO DO SERVIÇO': 9,
    'QUALIDADE DE SERVIÇO': 10,
    'QUALIDADE DE SERVIÇO + ATENDIMENTO CRC': 11,
    'ULTRAFIBRA - BAIXA VELOCIDADE': 12,
    'ULTRAFIBRA - INDISPONIBILIDADE SERVIÇO': 13,
    'ULTRAFIBRA - OSCILAÇÃO DO SERVIÇO': 14,
    'VOIP - NÃO ORIGINA CHAMADAS/LIGAÇÃO MUDA': 15,
    'VOIP - NÃO RECEBE CHAMADAS': 16
  },
  'REPARO': {
    'AGENDAMENTO - AGENDAMENTO NÃO REALIZADO': 1,
    'AGENDAMENTO - TÉCNICO NÃO COMPARECEU': 2,
    'REPARO NÃO REALIZADO': 3,
    'TROCA DE MODEM': 4
  },
  'SEGREDO DE JUSTIÇA': {
    'AGUARDANDO CÓPIAS': 1
  },
  'SENIOR ACCOUNT': {
    'COMISSÃO': 1
  }
}

const options: any = {
  origemReclamacao: {
    'CRIMINAL': 1,
    'ESTRATÉGICO': 2,
    'EXPRESSINHO': 3,
    'JEC - JUIZADO ESPECIAL CÍVEL': 4,
    'PRÉ - PROCESSUAL': 5,
    'PROCON': 6,
    'VARA CÍVEL': 7
  },
  padraoApuracao: {
    '1. PADRÃO TIM': 1,
    '2. LIVE TIM': 2,
    '3. OUTROS - CASOS NÃO CONSUMIDOR': 3
  },
  objeto: {
    'ACIDENTE': 1,
    'ADVOGADO ADVERSO': 2,
    'ADVOGADO CORRESPONDENTE': 3,
    'AGUARDANDO CÓPIAS': 4,
    'APARELHO': 5,
    'ATENDIMENTO': 6,
    'COBRANÇA': 7,
    'CONDUTA FUNCIONÁRIO PÚBLICO': 8,
    'CONDUTA TIM NAS DEFESAS': 9,
    'CONTA': 10,
    'CONTRATO': 11,
    'DECRETO SAC': 12,
    'Descumprimento de Lei/Decreto': 13,
    'DIREITOS AUTORAIS': 14,
    'FRAUDE': 15,
    'INSTALAÇÃO_MUDANÇA_DE_ENDEREÇO': 16,
    'LGPD': 17,
    'PORTABILIDADE': 18,
    'PROPAGANDA': 19,
    'QUEBRA DE SIGILO': 20,
    'REDE': 21,
    'REPARO': 22,
    'SEGREDO DE JUSTIÇA': 23,
    'SENIOR ACCOUNT': 24
  },
  subObjeto: subObjeto,
  demandante: {
    'CENTRO DE DOCUMENTAÇÃO - CD': 1,
    'ESCRITÓRIO': 2,
    'JURÍDICO INTERNO': 3,
    'GRI - OITO': 4
  },
  tipoSolicitacao: {
    'APURAÇÃO': 1,
    'COMPLEMENTO': 2,
    'CUMPRIMENTO': 3,
    'DESCUMPRIMENTO': 4,
    'LIMINAR': 5
  },
};

const json = `{
  "origemReclamacao": "JEC - JUIZADO ESPECIAL CÍVEL",
  "padraoApuracao": "3. OUTROS - CASOS NÃO CONSUMIDOR",
  "objeto": "LGPD",
  "subObjeto": "Base de dados compartilhada - Outras Operadoras",
  "demandante": "GRI - OITO",
  "tipoSolicitacao": "APURAÇÃO",
  "dataDistribuicao": "20/06/2023",
  "detalhesReclamacao": "Um texto de reclamação aqui",
  "autor": "Wendell Bitencourt",
  "cpfCnpj": "949.181.968-29",
  "enderecoAutor": "Alameda Manacá",
  "codDocumentoCentral": "1234",
  "acesso": "publico"
}`;

const translateJSON = (payload: Payload): PayloadTranslated  => {
  try {
    const payloadTranslated: PayloadTranslated = {
      origemReclamacao: options.origemReclamacao[payload.origemReclamacao],
      padraoApuracao: options.padraoApuracao[payload.padraoApuracao],
      objeto: options.objeto[payload.objeto],
      subObjeto: options.subObjeto[payload.objeto][payload.subObjeto],
      demandante: options.demandante[payload.demandante],
      tipoSolicitacao: options.tipoSolicitacao[payload.tipoSolicitacao],
      dataDistribuicao: payload.dataDistribuicao,
      detalhesReclamacao: payload.detalhesReclamacao,
      autor: payload.autor,
      cpfCnpj: payload.cpfCnpj,
      enderecoAutor: payload.enderecoAutor,
      codDocumentoCentral: payload.codDocumentoCentral,
      acesso: payload.acesso,
    };
  
    return payloadTranslated;
  } catch (error: any) {
    throw new Error(error);
  }
}

const modifyXLSMCells = async (workbook: any, translatedJSON: PayloadTranslated) => {
  try {
    console.log('translatedJSON', translatedJSON)
    //Modifica o valor das células
    const sheet = workbook.sheet('SOLICITAÇÃO JURIDICO');
    sheet.cell("O13").value(translatedJSON.origemReclamacao);
    sheet.cell("M1").value(translatedJSON.padraoApuracao);
    sheet.cell("AI7").value(translatedJSON.demandante);
    sheet.cell("L1").value(translatedJSON.tipoSolicitacao);
    sheet.cell("C21").value(translatedJSON.detalhesReclamacao);
    sheet.cell("AI176").value(translatedJSON.dataDistribuicao);
    sheet.cell("AI5").value(translatedJSON.cpfCnpj);
    sheet.cell("AI8").value(translatedJSON.enderecoAutor);
    sheet.cell("AI170").value(translatedJSON.autor);
    sheet.cell("AI6").value(translatedJSON.acesso);

    const sheet2 = workbook.sheet('Vínculos de Objeto e Sub Objeto');
    sheet2.cell("H2").value(translatedJSON.subObjeto);
    sheet2.cell("H3").value(translatedJSON.objeto);

    const destinationPath = path.resolve(
      'temp/uploads', 
      `${translatedJSON.codDocumentoCentral.replace(/[a-z]/gi, '')}.xlsm` //only unicode letters
    ); 

    // Salva o arquivo modificado
    await workbook.toFileAsync(destinationPath);

    console.log('Arquivo modificado e salvo com sucesso!');
  } catch (error) {
    console.error('Erro ao modificar o arquivo:', error);
  }
}

export async function generateXLSMTim() {
  const jsonParsed: Payload = JSON.parse(json);
  const translatedJSON = translateJSON(jsonParsed);
  const sourcePath = path.resolve('files', 'file.xlsm');
  const workbook = await XlsxPopulate.fromFileAsync(sourcePath);

  const response = await modifyXLSMCells(workbook, translatedJSON);

  //Devolve link no bucket ou o arquivo .xlsm
  return new Date().toISOString();
}