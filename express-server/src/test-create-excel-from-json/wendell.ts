const XlsxPopulate = require('xlsx-populate');
import path from 'path';

// Origem da Reclamação - Cell: O13
// 1- Criminal
// 2- Estratégico
// 3- Expressinho
// 4- JEC - Juizado especial cível
// 5- Pré - Processual
// 6- Procon
// 7- Vara Cível

// Origem da Reclamação - Cell: O13
// 1- Criminal
// 2- Estratégico
// 3- Expressinho
// 4- JEC - Juizado especial cível
// 5- Pré - Processual
// 6- Procon
// 7- Vara Cível

// Padrão de Apurações- Cell: M1
// 1- Padrão TIM
// 2- Live TIM
// 3- Outros - Caso não consumidor

// Objeto - Cell: 'Vínculos de Objeto e Sub Objeto'!$H$3
// 1- ACIDENTE
// 2- ADVOGADO ADVERSO
// 3- ADVOGADO CORRESPONDENTE
// 4- AGUARDANDO CÓPIAS
// 5- APARELHO
// 6- ATENDIMENTO
// 7- COBRANÇA
// 8- CONDUTA FUNCIONÁRIO PÚBLICO
// 9- CONDUTA TIM NAS DEFESAS
// 10- CONTA
// 11- CONTRATO
// 12- DECRETO SAC
// 13- DIREITOS AUTORAIS
// 14- FRAUDE
// 15- INSTALAÇÃO_MUDANÇA_DE_ENDEREÇO
// 16- PORTABILIDADE
// 17- PROPAGANDA
// 18- QUEBRA DE SIGILO
// 19- REDE
// 20- REPARO
// 21- SEGREDO DE JUSTIÇA
// 22- SENIOR ACCOUNT

// Sub Objeto - Cell:

// Demandante - Cell: AI7
// 1- Centro de documentação - CD
// 2- Escritório
// 3- Jurídico interno
// 4- GRI - OITO

// Tipo de Solicitação - Cell: L1			
// 1- Apuração
// 2- Complemento
// 3- Cumprimento
// 4- Descumprimento
// 5- Liminar

// Data da distribuição do Processo - Cell: AI176
// Resumo da reclamação - Cell: C21
// Autor Nome - Cell: AI170
// Autor CPF/CNPJ - Cell: AI5
// Autor endereco - Cell: AI8
// Autor tem outro processo - Cell: AI72

//FORMATO 1
// type OrigemReclamacao = 1 | 2 | 3 | 4 | 5 | 6 | 7;
// type PadraoApuracoes = 1 | 2 | 3;
// type Objeto = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22;
// type SubObjeto = 0;
// type Demandante = 1 | 2 | 3 | 4;
// type TipoSolicitacao = 1 | 2 | 3 | 4 | 5;
// type DataDistribuicaoDoProcesso = string; //DD/MM/YYYY
// type ResumoReclamacao = string;
// type AutorNome = string;
// type AutorCpfCnpj = string;
// type AutorEndereco = string;
// type AutorTemOutroProcesso = boolean;

// const json = `{
//   "origem_da_reclamacao": 4,
//   "padrao_de_apuracoes": 3,
//   "objeto": 14,
//   "sub_objeto": 0,
//   "demandante": 4,
//   "tipo_de_solicitacao": 1,
//   "data_da_distribuicao_do_processo": "2023-06-20T12:34:56Z",
//   "resumo_da_reclamacao": "Um texto de reclamação aqui",
//   "autor_nome": "Wendell Bitencourt",
//   "autor_cpf_cnpj": "949.181.968-29",
//   "autor_endereco": "Alameda Manacá",
//   "autor_tem_outro_processo": true.
//   "numero_processo: 88148509220231008633"
// }`;

//FORMATO 2
type OrigemReclamacao = 
    'criminal' 
  | 'estrategico' 
  | 'expressinho' 
  | 'jec_juizado_especial_civel' 
  | 'pre_processual' 
  | 'procon' 
  | 'vara_civel';

type PadraoApuracoes = 
  'padrao_tim' 
| 'live_tim' 
| 'outros_caso_nao_consumidor';

type Objeto = 
  'acidente' 
  | 'advogado_adverso' 
  | 'advogado_correspondente' 
  | 'aguardando_copias' 
  | 'aparelho' 
  | 'atendimento' 
  | 'cobranca' 
  | 'conduta_funcionario_publico' 
  | 'conduta_tim_nas_defesas' 
  | 'conta' 
  | 'contrato' 
  | 'decreto_sac' 
  | 'direitos_autorais' 
  | 'fraude' 
  | 'instalacao_mudanca_de_endereco' 
  | 'portabilidade' 
  | 'propaganda' 
  | 'quebra_de_sigilo' 
  | 'rede' 
  | 'reparo' 
  | 'segredo_de_justica' 
  | 'senior_account';

type SubObjeto = undefined;

type Demandante = 
  'centro_de_documentacao_cd' 
| 'escritorio' 
| 'juridico_interno' 
| 'gri_oito';

type TipoSolicitacao = 
  'apuracao' 
| 'complemento' 
| 'cumprimento' 
| 'descumprimento' 
| 'liminar';

type DataDistribuicaoDoProcesso = string; //DD/MM/YYYY
type ResumoReclamacao = string;
type AutorNome = string;
type AutorCpfCnpj = string;
type AutorEndereco = string;
type AutorTemOutroProcesso = boolean;

const json = `{
  "origem_da_reclamacao": "jec_juizado_especial_civel",
  "padrao_de_apuracoes": "outros_caso_nao_consumidor",
  "objeto": "advogado_adverso",
  "sub_objeto": null,
  "demandante": "gri_oito",
  "tipo_de_solicitacao": "apuracao",
  "data_da_distribuicao_do_processo": "2023-06-20T12:34:56Z",
  "resumo_da_reclamacao": "Um texto de reclamação aqui",
  "autor_nome": "Wendell Bitencourt",
  "autor_cpf_cnpj": "949.181.968-29",
  "autor_endereco": "Alameda Manacá",
  "autor_tem_outro_processo": true,
  "numero_processo": "88148509220231008633"
}`;

interface JSONParseFormat {
  origem_da_reclamacao: OrigemReclamacao;
  padrao_de_apuracoes: PadraoApuracoes;
  objeto: Objeto;
  sub_objeto: SubObjeto;
  demandante: Demandante;
  tipo_de_solicitacao: TipoSolicitacao;
  data_da_distribuicao_do_processo: DataDistribuicaoDoProcesso;
  resumo_da_reclamacao: ResumoReclamacao;
  autor_nome: AutorNome;
  autor_cpf_cnpj: AutorCpfCnpj;
  autor_endereco: AutorEndereco;
  autor_tem_outro_processo: AutorTemOutroProcesso;
  numero_processo: string;
}

interface JSONTranslatedFormat {
  origemDaReclamacao: number;
  padraoDeApuracoes: number;
  objeto: number;
  subObjeto: number;
  demandante: number;
  tipoDeSolicitacao: number;
  dataDaDistribuicaoDoProcesso: string;
  resumoDaReclamacao: string;
  autorNome: string;
  autorCpfCnpj: string;
  autorEndereco: string;
  autorTemOutroProcesso: boolean;
  numeroProcesso: string;
}

const translateJSON = (json: JSONParseFormat): JSONTranslatedFormat  => {
  try {
    //Apenas FORMATO 2
    const options = {
      origem_da_reclamacao: {
        criminal: 1,
        estrategico: 2,
        expressinho: 3,
        jec_juizado_especial_civel: 4,
        pre_processual: 5,
        procon: 6,
        vara_civel: 7
      },
      padrao_de_apuracoes: {
        padrao_tim: 1,
        live_tim: 2,
        outros_caso_nao_consumidor: 3
      },
      objeto: {
        acidente: 1,
        advogado_adverso: 2,
        advogado_correspondente: 3,
        aguardando_copias: 4,
        aparelho: 5,
        atendimento: 6,
        cobranca: 7,
        conduta_funcionario_publico: 8,
        conduta_tim_nas_defesas: 9,
        conta: 10,
        contrato: 11,
        decreto_sac: 12,
        direitos_autorais: 13,
        fraude: 14,
        instalacao_mudanca_de_endereco: 15,
        portabilidade: 16,
        propaganda: 17,
        quebra_de_sigilo: 18,
        rede: 19,
        reparo: 20,
        segredo_de_justica: 21,
        senior_account: 22
      },
      demandante: {
        centro_de_documentacao_cd: 1,
        escritorio: 2,
        juridico_interno: 3,
        gri_oito: 4
      },
      tipo_de_solicitacao: {
        apuracao: 1,
        complemento: 2,
        cumprimento: 3,
        descumprimento: 4,
        liminar: 5
      },
    };
  
    //FORMATO 1
    // const newJSON: JSONTranslatedFormat = {
    //   origemDaReclamacao: json.origem_da_reclamacao,
    //   padraoDeApuracoes: json.padrao_de_apuracoes,
    //   objeto: json.objeto,
    //   subObjeto: json.sub_objeto,
    //   demandante: json.demandante,
    //   tipoDeSolicitacao: json.tipo_de_solicitacao,
    //   dataDaDistribuicaoDoProcesso: json.data_da_distribuicao_do_processo,
    //   resumoDaReclamacao: json.resumo_da_reclamacao,
    //   autorNome: json.autor_nome,
    //   autorCpfCnpj: json.autor_cpf_cnpj,
    //   autorEndereco: json.autor_endereco,
    //   autorTemOutroProcesso: json.autor_tem_outro_processo,
    // };

    //FORMATO 2
    const newJSON: JSONTranslatedFormat = {
      origemDaReclamacao: options.origem_da_reclamacao[json.origem_da_reclamacao],
      padraoDeApuracoes: options.padrao_de_apuracoes[json.padrao_de_apuracoes],
      objeto: options.objeto[json.objeto],
      subObjeto: json.sub_objeto ?? 0,
      demandante: options.demandante[json.demandante],
      tipoDeSolicitacao: options.tipo_de_solicitacao[json.tipo_de_solicitacao],
      dataDaDistribuicaoDoProcesso: json.data_da_distribuicao_do_processo,
      resumoDaReclamacao: json.resumo_da_reclamacao,
      autorNome: json.autor_nome,
      autorCpfCnpj: json.autor_cpf_cnpj,
      autorEndereco: json.autor_endereco,
      autorTemOutroProcesso: json.autor_tem_outro_processo,
      numeroProcesso: json.numero_processo,
    };
  
    return newJSON;
  } catch (error: any) {
    throw new Error(error);
  }
}

const modifyXLSMCells = async (workbook: any, translatedJSON: JSONTranslatedFormat) => {
  try {
    //Modifica o valor das células
    const sheet = workbook.sheet('SOLICITAÇÃO JURIDICO');
    sheet.cell("O13").value(translatedJSON.origemDaReclamacao);
    sheet.cell("M1").value(translatedJSON.padraoDeApuracoes);
    sheet.cell("AI7").value(translatedJSON.demandante);
    sheet.cell("L1").value(translatedJSON.tipoDeSolicitacao);
    sheet.cell("C21").value(translatedJSON.resumoDaReclamacao);
    sheet.cell("AI176").value(new Date(translatedJSON.dataDaDistribuicaoDoProcesso).toLocaleDateString('pt-BR'));
    sheet.cell("AI5").value(translatedJSON.autorCpfCnpj);
    sheet.cell("AI8").value(translatedJSON.autorEndereco);
    sheet.cell("AI170").value(translatedJSON.autorNome);
    sheet.cell("AI72").value(translatedJSON.autorTemOutroProcesso ? 1 : 2);

    const sheet2 = workbook.sheet('Vínculos de Objeto e Sub Objeto');
    sheet2.cell("H3").value(translatedJSON.objeto);

    const destinationPath = path.resolve(
      'temp/uploads', 
      `${translatedJSON.numeroProcesso.replace(/[a-z]/gi, '')}.xlsm` //only unicode letters
      ); 

    // Salva o arquivo modificado
    await workbook.toFileAsync(destinationPath);

    console.log('Arquivo modificado e salvo com sucesso!');
  } catch (error) {
    console.error('Erro ao modificar o arquivo:', error);
  }
}

export async function generateXLSMTim() {
  const jsonParsed: JSONParseFormat = JSON.parse(json);
  const translatedJSON = translateJSON(jsonParsed);
  const sourcePath = path.resolve('files', 'file.xlsm');
  const workbook = await XlsxPopulate.fromFileAsync(sourcePath);

  const response = await modifyXLSMCells(workbook, translatedJSON);

  //Devolve link no bucket ou o arquivo .xlsm
  return new Date().toISOString();
}


