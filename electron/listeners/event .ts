import { BrowserWindow, screen, app } from 'electron'
import { ipcMain } from 'electron'
import Config from '../config/Config'
import { saveToFile, openFile, redeExcel } from '../utils/fs'
/**
 * 通信监听
 * @param win 
 */
export class WinEvent {
  //
  private win: BrowserWindow | null
  //
  constructor(win: BrowserWindow | null) {
    this.win = win
  }
  //
  vueBus() {
    // 中转消息-代替中央事件总线
     ipcMain.on('vue_bus', (_, { channel, data }) => {
      if (!this.win || !channel) return
      this.win.webContents.send(channel, data)
    })
  }
  // 设置窗口最小值
  setMinSize() {
     ipcMain.on('set_min_size', (_, dto: WinStateDTO) => {
      if (!this.win) return
      const size = Config.adaptByScreen(dto, this.win)
      const val = this.win.isResizable()
      this.win.setResizable(true)
      this.win.setMinimumSize(size.width, size.height)
      this.win.setResizable(val)
    })
  }
  // 设置窗口大小
  setWinSize() {
     ipcMain.on('set_win_size', (_, dto: WinStateDTO) => {
      if (!this.win) return
      const size = Config.adaptByScreen(dto, this.win)
      this.win.setResizable(true)
      this.win.setSize(size.width, size.height)
      dto.center && this.win.center()
      this.win.setMaximizable(dto.maxable)
      this.win.setResizable(dto.resizable)
    })
  }
  // 设置最小化
  setMinimize() {
     ipcMain.on('minimize', () => {
      this.win?.minimize()
    })
  }
  // 打开控制台
  openDevtools() {   
     ipcMain.on('devtools', () => {
      //
      if (this.win?.webContents.isDevToolsOpened()) {
        this.win?.webContents.closeDevTools()
      } else {
        this.win?.webContents.openDevTools({
          mode: 'bottom',
          activate: true,   // 设置为 false 以不激活 DevTools 窗口
        })
      }
    })
  }
  // 设置title 
  setTitle() {
    ipcMain.on('title', (_event, title: string) => {
      this.win?.setTitle(title)
    })
  }
  // 是否全屏
  isFullScreen() {
     ipcMain.on('isMaximized', (event) => {
      event.sender.send('node-to-max', this.win?.isMaximized())
    })
  }
  // 窗口最大化
  setMaximize() {
     ipcMain.on('maximize', () => {
      this.win?.maximize()
    })
  }
  restoreScreen() {
     ipcMain.on('restore', () => {
      this.win?.setSize(1050, 740)
      // 获取当前窗口的大小
      const { width, height } = this.win!.getBounds()
  
      // 计算屏幕中心位置
      const centerX = Math.floor((screen.getPrimaryDisplay().workAreaSize.width - width) / 2)
      const centerY = Math.floor((screen.getPrimaryDisplay().workAreaSize.height - height) / 2)
  
      // 设置窗口位置
      this.win?.setPosition(centerX, centerY)
  
    })
  }
  //
  closeWin(){
      ipcMain.on('window-all-closed', () => {
      this.win = null
      if (process.platform !== 'darwin') {
        app.quit()
      }
    })
  }
  //
  saveFileTo(){
     ipcMain.on('save-file', (_event, content: string) => {
      if (this.win) {
        saveToFile(this.win, content)
      }
    })
  }
  //
  openFileByExcel(){
    ipcMain.on('open-excel', (event) => {
      if (this.win) {
        openFile().then(result => {
          if (!result.canceled) {
            const data = redeExcel(result.filePaths[0])
            event.sender.send('excel-data', data)
          }
        })
      }
    })
  }
}
