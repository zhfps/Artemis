import { app, dialog, Menu, ipcMain, type MessageBoxSyncOptions, BrowserWindow } from 'electron'
import Store from 'electron-store'
import Config from '../config/Config'
import { mainLog } from '../utils/logger'
import WinMain from './WinMain'
import menus from '../menu'

class WinApp {
    //缓存
    private static store: Store | null
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
        if (!app.requestSingleInstanceLock()) {
            return this.exitApp('There are already instances running.')
        }
        if (!this.store) {
            this.store = new Store()
        }
        //认系统菜单
         const menu = Menu.buildFromTemplate(menus)
         Menu.setApplicationMenu(menu)
        // 初始化 app 配置
        this.initAppConfig()
        // 加载环境变量
        Config.loadEnvFile()
        // 初始化完成
        app.whenReady().then(() => {
            this.ipcListening()
            WinMain.create(this.store)
            WinMain.ipcListening()
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
                WinMain.create(this.store)
            }
        })
     
        // 所有的窗口都被关闭
        app.on('window-all-closed', () => {
            this.exitApp()
        })

        // 程序退出之前
        app.on('before-quit', () => {
            this.store?.clear()
            mainLog.log('[before quit app] ')
        })

        // 程序退出
        app.on('quit', () => {
            mainLog.log('[app is quit] ')
            this.store?.clear()
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
        mainLog.log('[exit-app] ', title || '', content || '')
        this.store?.clear()
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
                dialog.showMessageBoxSync(opt)
                app.quit()
            }
            app.isReady() ? callback() : app.whenReady().then(callback)
        } else {
            app.quit()
        }
    }

    /** 监听相关事件 */
    static ipcListening() {
        // 重启
        ipcMain.on('restart_app', () => this.restartApp())
    }
}
export default WinApp