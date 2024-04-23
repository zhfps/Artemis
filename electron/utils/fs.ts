import { BrowserWindow, OpenDialogOptions, dialog } from 'electron'
import * as fs from 'node:fs'
import xlsx from 'node-xlsx'

/**
 * 
 * @param win 
 * @param content 
 */
export function saveToFile(win: BrowserWindow, content: string) {
  // Show a save dialog
  dialog.showSaveDialog(win, {
    title: 'Save File'
  })
    .then(result => {
      // result.filePath will contain the path selected by the user
      if (!result.canceled && result.filePath) {
        // Write content to the selected file
        fs.writeFileSync(result.filePath, content, 'utf-8')
      }
    })
    .catch(err => {
      console.error('Error saving file:', err)
    })
}

/**
 * 读取文件
 * @param win 
 * @param content 
 */
export function openFile() {
  const options: OpenDialogOptions = {
    title: '选择文件',
    properties: ['openFile'],
    filters: [
      { name: '文本文件', extensions: ['xlsx'] }
    ],
  }

  return dialog.showOpenDialog(options)
}

/**
 * 
 * @param path 
 * @returns 
 */
export function redeExcel(path: string){
  // 解析得到文档中的所有 sheet
  const sheets = xlsx.parse(path,{ cellDates: true })
  const sheet = sheets[0]
  return sheet.data
}