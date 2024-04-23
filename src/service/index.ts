// 导入electron
import { ipcRenderer } from 'electron'
// 监听主进程消息
ipcRenderer.on('main-process-message', (_event, ...args) => {
  console.log('[Receive Main-process message]:', ...args)
})

