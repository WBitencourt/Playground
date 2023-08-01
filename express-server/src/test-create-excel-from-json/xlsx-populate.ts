const XlsxPopulate = require('xlsx-populate');
import path from 'path';

async function modifyXLSMCells() {
  try {
    const sourcePath = path.resolve('files', 'file.xlsm');
    const destinationPath = path.resolve('temp/uploads', 'file-keeping-macro.xlsm');

    const workbook = await XlsxPopulate.fromFileAsync(sourcePath);
    const sheet = workbook.sheet(0);
    console.log('workbook', workbook);

    // Modificar as células da planilha
    sheet.cell("A1").value("Novo valor");
    sheet.cell("B2").value(123);
    sheet.cell("C3").value(true);

    // Salvar o arquivo modificado
    await workbook.toFileAsync(destinationPath);

    console.log('Arquivo modificado e salvo com sucesso!');
  } catch (error) {
    console.error('Erro ao modificar o arquivo:', error);
  }
}

export function teste() {
  modifyXLSMCells();

  return 'Teste';
}
