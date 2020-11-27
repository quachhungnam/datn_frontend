
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

export const ExportData = (csvData, fileName) => {

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
    // var first_sheet_name = wb.SheetNames[0];
    // var address_of_cell = 'A1';

    // /* Get worksheet */
    // var worksheet = wb.Sheets[first_sheet_name];

    // /* Find desired cell */
    // var desired_cell = worksheet[address_of_cell];

    // /* Get the value */
    // var desired_value = (desired_cell ? desired_cell.v : undefined);
    // console.log(desired_value)
    // // var desired_value = desired_cell.v;
    // // console.log(desired_value)

    // const wb2 = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, "Data");
    // /* generate XLSX file and send to client */
    // XLSX.writeFile(wb2, fileName + fileExtension);





}