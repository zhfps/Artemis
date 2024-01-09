import * as XLSX from 'xlsx'
/**
 * Excel download
 * @param fileName
 * @param data
 */
export function downloadExcel(fileName: string, data: any[]) {
  const sheetName = 'sheet1'
  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.aoa_to_sheet(data)
  //
  XLSX.utils.book_append_sheet(wb, ws, sheetName)
  XLSX.writeFile(wb, fileName)
}


export function splitArrayByLength(arr:any[], length:number) {
  const result = []
  for (let i = 0; i < arr.length; i += length) {
    result.push(arr.slice(i, i + length))
  }
  return result
}