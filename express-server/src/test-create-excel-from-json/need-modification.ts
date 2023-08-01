const XlsxPopulate = require('xlsx-populate');
import path from 'path';
import fs from 'fs';
import * as ExcelJS from 'exceljs';

const file = 'file_old';

async function makeCopyFileDefault() {
  try {
    const sourcePath = path.resolve('files', `${file}.xlsm`);
    const destinationPath = path.resolve('temp/uploads', `${file}-keeping-macro.xlsm`);

    const workbookXLSXPopulate = await XlsxPopulate.fromFileAsync(sourcePath);
    const sheet = workbookXLSXPopulate.sheet(0);
    console.log('workbookXLSXPopulate', workbookXLSXPopulate);

    //Salvar objeto workbookXLSXPopulate em um arquivo .txt
    const jsonString = JSON.stringify(workbookXLSXPopulate, getCircularReplacer());
    fs.writeFile(path.resolve('temp/uploads', 'log.txt'), jsonString, 'utf8', (error) => {
      if (error) {
        console.error('Erro ao salvar o arquivo:', error);
      } else {
        console.log('Arquivo salvo com sucesso!');
      }
    });

    //Modificar as células da planilha com xlsx-populate
    sheet.cell("A1").value(new Date().toISOString());
    sheet.cell("B2").value(123);
    sheet.cell("C3").value(true);

    // Salvar o arquivo modificado
    await workbookXLSXPopulate.toFileAsync(destinationPath);

    console.log('XLSX-POPULATE: Arquivo modificado e salvo com sucesso!');
  } catch (error) {
    console.error('ERRO-XLSX-POPULATE: Erro ao modificar o arquivo:', error);
  }
}

async function modifyXLSMFile() {
  try {
    const sourcePath = path.resolve('temp/uploads', `${file}-keeping-macro.xlsm`);

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(sourcePath);
  
    const worksheet = workbook.getWorksheet('Sheet1');
  
    // Exemplo 1: Alterar o valor de uma célula
    const cellA1 = worksheet.getCell('A1');
    cellA1.value = 'Novo Valor';
  
    // Exemplo 2: Adicionar um estilo a uma célula
    const cellB2 = worksheet.getCell('B2');
    cellB2.value = 123;
    cellB2.font = { bold: true, italic: true };
  
    // Exemplo 3: Inserir uma nova linha
    const newRow = worksheet.addRow(['Novo Valor', 456, true]);
    newRow.getCell('A').font = { bold: true };
  
    // Exemplo 4: Remover uma coluna
    worksheet.spliceColumns(2, 1);
  
    // Salve as alterações no mesmo arquivo
    await workbook.xlsx.writeFile(sourcePath);
  
    console.log('EXCEL-JS: Arquivo modificado e salvo com sucesso!');
  } catch (error) {
    console.error('ERRO-EXCEL-JS: Erro ao modificar o arquivo:', error);
  }
}

export async function teste() {
  await makeCopyFileDefault();
  //await modifyXLSMFile();

  return 'Teste!!!';
}

// Função para tratar objetos circulares
function getCircularReplacer() {
  const seen = new WeakSet<any>();
  return function (this: any, key: string, value: any) {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return '[Circular Reference]';
      }
      seen.add(value);
    }
    return value;
  };
}