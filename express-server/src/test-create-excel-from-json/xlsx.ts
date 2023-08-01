// import * as fs from 'fs';
// import path from 'path';
// import * as XLSX from 'xlsx';

// function populateXLSMFile(jsonData: string, xlsmFile: string): void {
//   // Load the .xlsm file with macros preserved
//   const workbook: XLSX.WorkBook = XLSX.readFile(xlsmFile, { bookVBA: true });

//   console.log('workbook', workbook);

//   // Select the first worksheet
//   const worksheet: XLSX.WorkSheet = workbook.Sheets[workbook.SheetNames[0]];

//   // Convert the JSON into a JavaScript object
//   const data: any[][] = JSON.parse(jsonData);

//   // Populate the cells in the .xlsm file with the JSON data
//   for (let row = 0; row < data.length; row++) {
//     const currentRow = data[row];
//     for (let col = 0; col < currentRow.length; col++) {
//       const value = currentRow[col];
//       const cellAddress = XLSX.utils.encode_cell({ r: row + 1, c: col });
//       worksheet[cellAddress] = { v: value };
//     }
//   }

//   const destinationPath = path.resolve('temp/uploads', 'file-keeping-macro.xlsm');

//   // Save the changes to the .xlsm file while preserving macros
//   XLSX.writeFile(workbook, destinationPath, { bookVBA: true });

//   console.log('Successfully populated the .xlsm file!');
// }

// export function teste() {
//   const jsonData: string = JSON.stringify([
//     ["Name", "Age", "Profession"],
//     ["John", 30, "Engineer"],
//     ["Maria", 25, "Designer"],
//     ["Peter", 35, "Programmer"]
//   ]);

//   populateXLSMFile(jsonData, 'files/file.xlsm');

//   return 'Teste';
// }
