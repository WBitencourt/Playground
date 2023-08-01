const excel = require('excel4node');
const path = require('path');

function modifyXLSMCells() {
  try {
    const sourcePath = path.resolve('files', 'file_old.xlsm');
    const destinationPath = path.resolve('temp/uploads', 'file-keeping-macro.xlsm');

    const workbook = new excel.Workbook();
    workbook.xlsx.readFile(sourcePath)
      .then(() => {
        const worksheet = workbook.getWorksheet(1);
        console.log('worksheet', worksheet)
        // Modificar as células da planilha
        worksheet.getCell('A1').value = 'Novo valor';
        worksheet.getCell('B2').value = 123;
        worksheet.getCell('C3').value = true;

        // Salvar o arquivo modificado
        return workbook.xlsx.writeFile(destinationPath);
      })
      .then(() => {
        console.log('Arquivo modificado e salvo com sucesso!');
      })
      .catch((error: any) => {
        console.error('Erro ao modificar o arquivo:', error);
      });
  } catch (error) {
    console.error('Erro ao modificar o arquivo:', error);
  }
}

export function teste() {
  modifyXLSMCells();

  return 'Teste';
}
