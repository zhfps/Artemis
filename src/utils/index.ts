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

export function splitArrayByLength(arr: any[], length: number) {
  const result = []
  for (let i = 0; i < arr.length; i += length) {
    result.push(arr.slice(i, i + length))
  }
  return result
}
/**
 * 
 * @param num 
 * @returns 
 */
export function numberToFormattedString(num: number|string){
  // 将数字转为字符串
  const numberString = `${num}`

  // 使用正则表达式在数字字符串中插入逗号
  const formattedString = numberString.replace(/\B(?=(\d{4})+(?!\d))/g, ',')

  return formattedString
}