import { BrowserWindow, dialog } from 'electron'
import { autoUpdater } from 'electron-updater'
const message = {
  error: '检查更新出错',
  checking: '正在检查更新……',
  updateAva: '检测到新版本，正在下载……',
  updateNotAva: '现在使用的就是最新版本，不用更新',
}

/**
 * 更新配置
 * @param win 
 */
export function useUpdater(win: BrowserWindow | null){
 // 检测下载错误
  autoUpdater.on('error', (error) => {
    win?.webContents.send('message',`${message.error}:${error}`)
  })
  // 检测是否需要更新
  autoUpdater.on('checking-for-update', () => {
    win?.webContents.send('message',message.checking)
  })
  // 检测到可以更新时
  autoUpdater.on('update-available', () => {
    // 这里我们可以做一个提示，让用户自己选择是否进行更新
    dialog.showMessageBox({
        type: 'info',
        title: '应用有新的更新',
        message: '发现新版本，是否现在更新？',
        buttons: ['是', '否']
    }).then(({ response }) => {
        if (response === 0) {
            // 下载更新
            autoUpdater.downloadUpdate()
            win?.webContents.send('message', message.updateAva)
        }
    })
  })
  // 更新下载进度
  autoUpdater.on('download-progress', (progress) => {
    // 直接把当前的下载进度发送给渲染进程即可，有渲染层自己选择如何做展示
    win?.webContents.send('downloadProgress', progress)
  })
  // 当需要更新的内容下载完成后
  autoUpdater.on('update-downloaded', () => {
    // 给用户一个提示，然后重启应用；或者直接重启也可以，只是这样会显得很突兀
    dialog.showMessageBox({
        title: '安装更新',
        message: '更新下载完毕，应用将重启并进行安装'
    }).then(() => {
        // 退出并安装应用
        setImmediate(() => autoUpdater.quitAndInstall())
    })
  })
}