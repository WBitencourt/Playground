const xlsx = require('node-xlsx');
const path = require('path');
const fs = require('fs');

function modifyXLSMCells() {
  try {
    const sourcePath = path.resolve('files', 'file.xlsm');
    const destinationPath = path.resolve('temp/uploads', 'file-keeping-macro.xlsm');

    const workbook = xlsx.parse(fs.readFileSync(sourcePath));
    const sheet = workbook[0].data;
    console.log('workbook', workbook);

    // Modificar as células da planilha
    sheet[0][0] = 'Novo valor';
    sheet[1][1] = 123;
    sheet[2][2] = true;

    // Salvar o arquivo modificado
    const buffer = xlsx.build([{ name: 'Sheet1', data: sheet }]);
    fs.writeFileSync(destinationPath, buffer);

    console.log('Arquivo modificado e salvo com sucesso!');
  } catch (error) {
    console.error('Erro ao modificar o arquivo:', error);
  }
}

export function teste() {
  modifyXLSMCells();

  return 'Teste';
}
