import { app, dialog, ipcMain, type MessageBoxSyncOptions, BrowserWindow } from 'electron'
//
// import Store from 'electron-store'
// import { autoUpdater } from 'electron-updater'
import Config from '../config/Config'
//
import WinMain from './WinMain'

/**
 * 窗口管理
 */
class WinApp {
    /** 初始化 app 配置 */
    private static initAppConfig() {
        // 禁用 硬件加速
        app.disableHardwareAcceleration()
        // 禁用 Chromium 沙盒
        app.commandLine.appendSwitch('no-sandbox')
        // 忽略证书相关错误
        app.commandLine.appendSwitch('ignore-certificate-errors')
        // 禁用 GPU
        app.commandLine.appendSwitch('disable-gpu')
        // 禁用 GPU 沙盒
        app.commandLine.appendSwitch('disable-gpu-sandbox')
        // 禁用 HTTP 缓存
        app.commandLine.appendSwitch('disable-http-cache')
        // 禁用动画, 解决透明窗口打开闪烁问题
        app.commandLine.appendSwitch('wm-window-animations-disabled')
    }

    /** 启动应用 */
    static startApp() {
        // 检查是否已经启动
        if (!app.requestSingleInstanceLock()) {
            //
            return this.exitApp('There are already instances running.')
        }
        // 初始化 app 配置
        this.initAppConfig()
        // 加载环境变量
        Config.loadEnvFile()
        // 初始化完成
        app.whenReady().then(() => {
            //
            this.listening()
            //
            WinMain.create()
            // 更新
            // autoUpdater.updateConfigPath
            // if(app.isPackaged){
            //     autoUpdater.checkForUpdates()
            // }     
        })

        //
        app.on('second-instance', () => {
            if (WinMain.getWinInst()) {
                if (WinMain.getWinInst()?.isMinimized()) WinMain.getWinInst()?.restore()
                WinMain.getWinInst()?.focus()
            }
        })

        app.on('activate', () => {
            const allWindows = BrowserWindow.getAllWindows()
            if (allWindows.length > 0) {
                allWindows[0].focus()
            } else {
                WinMain.create()
            }
        })
     
        // 所有的窗口都被关闭
        app.on('window-all-closed', () => {
            this.exitApp()
        })

        // 程序退出之前
        app.on('before-quit', () => {
            // do nothing
        })

        // 程序退出
        app.on('quit', () => {
            // 释放锁
            app.releaseSingleInstanceLock()
        })
    }

    /** 重启应用 */
    static restartApp() {
        !Config.IS_DEV_MODE && app.relaunch()
        app.exit(0)
    }

    /** 退出应用 */
    static exitApp(title?: string, content?: string) {
        if (title && content) {
            const callback = () => {
                const opt: MessageBoxSyncOptions = {
                    type: 'warning',
                    icon: Config.APP_LOGO,
                    noLink: true,
                    title: title,
                    message: `${content}`,
                    buttons: ['确定'],
                    cancelId: -1,
                    defaultId: 0
                }
                //
                dialog.showMessageBoxSync(opt)
                //
                app.quit()
            }
            app.isReady() ? callback() : app.whenReady().then(callback)
        } else {
            app.quit()
        }
    }

    /** 
     * 监听相关事件 
     **/
    static listening() {
        // 重启
        ipcMain.on('restart_app', () => this.restartApp())
    }
}
export default WinApp