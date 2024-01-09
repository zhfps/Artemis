/**
 * 主窗口
 */

import { ipcMain, BrowserWindow, type BrowserWindowConstructorOptions, app } from 'electron'
import Config from '../config/Config'
import { mainLog } from '../utils/logger'
import Store from 'electron-store'
import { cacheSize, readBound } from '../plugin/WinPlugin'
import { Login } from '../msal/Login'
import { saveToFile, openFile, redeExcel } from '../utils/fs'

class WinMain {
  /** 窗口实例 */
  private static WIN_INST: BrowserWindow | null = null

  //
  private static store: Store | null

  //
  private static login: Login | null

  /** 窗口配置 */
  private static WIN_CONFIG: BrowserWindowConstructorOptions = {
    title: Config.getAppTitle(), // 如果由 loadURL() 加载的 HTML 文件中含有标签 <title>，此属性将被忽略
    icon: Config.APP_LOGO,
    minWidth: 800,
    minHeight: 600,
    show: false, // 是否在创建时显示, 默认值为 true
    frame: true, // 是否有边框
    center: true, // 是否在屏幕居中
    hasShadow: true, // 窗口是否有阴影. 默认值为 true
    resizable: true, // 是否允许拉伸大小
    fullscreenable: true, // 是否允许全屏，为 false 则插件 screenfull 不起作用
    autoHideMenuBar: false, // 自动隐藏菜单栏, 除非按了 Alt 键, 默认值为 false
    backgroundColor: 'rgba(255,255,255,0)', // 背景颜色
    transparent: false,
    webPreferences: {
      spellcheck: false, // 禁用拼写检查器
      disableBlinkFeatures: 'SourceMap', // 以 "," 分隔的禁用特性列表
      devTools: true, // 是否开启 DevTools, 如果设置为 false（默认值为 true）, 则无法使用 BrowserWindow.webContents.openDevTools()
      webSecurity: false, // 当设置为 false, 将禁用同源策略
      nodeIntegration: true, // 是否启用 Node 集成
      contextIsolation: false, // 是否在独立 JavaScript 环境中运行 Electron API 和指定的 preload 脚本，默认为 true
      backgroundThrottling: false, // 是否在页面成为背景时限制动画和计时器，默认值为 true
      nodeIntegrationInWorker: true // 是否在 Web 工作器中启用了 Node 集成
    }
  }

  /** 获取窗口实例 */
  static getWinInst() {
    return this.WIN_INST
  }
  static setWinInst() {
    this.WIN_INST = null
  }

  /** 显示窗口 */
  static show(key?: string, center?: boolean) {
    mainLog.log('[show main win] ', key)
    this.WIN_INST?.show()
    this.WIN_INST?.focus()
    center && this.WIN_INST?.center()
  }

  /** 创建窗口 */
  static create(store: Store | null) {
    //
    this.store = store
    //
    if (this.WIN_INST) return

    this.WIN_INST = new BrowserWindow(this.WIN_CONFIG)
    // this.WIN_INST.removeMenu()
    //
    // this.openDevTools()
    //读取缓存
    const config = readBound(this.store)
    if (config && config.size) {
      this.WIN_INST.setSize(config.size.width, config.size.height)
    }
    if (config && config.position) {
      this.WIN_INST.setBounds({
        x: config.position.x,
        y: config.position.y
      })
    }


    if (Config.IS_DEV_MODE) {
      this.WIN_INST.loadURL(Config.WIN_URL)
    } else {
      this.WIN_INST.loadFile(Config.WIN_URL)
    }
    // 在窗口的控制台中使用 F5 刷新时，也会触发该事件
    this.WIN_INST.on('ready-to-show', () => {
      this.show('win=>ready-to-show', true)
      //Config.IS_DEV_MODE && this.openDevTools()
    })

    // 窗口-已关闭
    this.WIN_INST.on('closed', () => (this.WIN_INST = null))

    this.WIN_INST.on('resize', () => {
      if (!this.WIN_INST?.isMaximized()) {
        const newSize = this.WIN_INST?.getSize() // 获取新的窗口大小 [width, height]
        if (newSize) {
          cacheSize(this.store, {
            width: newSize[0],
            height: newSize[1]
          })
        }

      }
      // 在这里执行你的自定义逻辑
    })
  }

  /** 打开控制台 */
  static openDevTools() {
    if (!this.WIN_INST) return
    const winCtns = this.WIN_INST.webContents
    if (winCtns.isDevToolsOpened()) return
    winCtns.openDevTools({ mode: 'undocked' })
  }
  /** 登录微软 */
  static createLogin() {
    if (this.login) return
    this.login = new Login()
  }


  /** 监听通信事件 */
  static ipcListening() {
    //

    // 中转消息-代替中央事件总线
    ipcMain.on('vue_bus', (_, { channel, data }) => {
      if (!this.WIN_INST || !channel) return
      this.WIN_INST.webContents.send(channel, data)
    })
    // 设置窗口最小值
    ipcMain.on('set_min_size', (_, dto: WinStateDTO) => {
      if (!this.WIN_INST) return
      const size = Config.adaptByScreen(dto, this.WIN_INST)
      const val = this.WIN_INST.isResizable()
      this.WIN_INST.setResizable(true)
      this.WIN_INST.setMinimumSize(size.width, size.height)
      this.WIN_INST.setResizable(val)
    })
    // 设置窗口大小
    ipcMain.on('set_win_size', (_, dto: WinStateDTO) => {
      if (!this.WIN_INST) return
      const size = Config.adaptByScreen(dto, this.WIN_INST)
      this.WIN_INST.setResizable(true)
      this.WIN_INST.setSize(size.width, size.height)
      dto.center && this.WIN_INST.center()
      this.WIN_INST.setMaximizable(dto.maxable)
      this.WIN_INST.setResizable(dto.resizable)
    })
    // 登录
    ipcMain.handle('login-request', async (event, args: { name: string, password: string }) => {
      this.createLogin()
      const res = await this.login?.getToken(args)
      return res
    })
    // 定时刷新token
    ipcMain.handle('refresh-token', async (event, args: {token: string}) => {
      this.createLogin()
      const res = await this.login?.refreshToken(args.token)
      return res
    })

    //最小化
    ipcMain.on('minimize', () => {
      this.WIN_INST?.minimize()
    })
    //打开控制台
    ipcMain.on('devtools', () => {
      this.WIN_INST?.webContents.openDevTools({
        mode: 'undocked'
      })
    })
    //设置标题
    ipcMain.on('title', (event, title: string) => {
      this.WIN_INST?.setTitle(title)
    })
    //是否全屏
    ipcMain.on('isMaximized', (event) => {
      event.sender.send('node-to-max', this.WIN_INST?.isMaximized())
    })
    //窗口最大化
    ipcMain.on('maximize', () => {
      if (this.WIN_INST?.isMaximized()) {
        // 如果窗口已经最大化，则恢复窗口
        this.WIN_INST?.restore()
      } else {
        // 否则，最大化窗口
        this.WIN_INST?.maximize()
      }
    })
    //恢复
    ipcMain.on('restore', () => {
      try {
        const config = readBound(this.store)
        if (config && config.size) {
          this.WIN_INST?.setSize(config.size.width, config.size.height)
        }
        if (config && config.position) {
          this.WIN_INST?.setBounds({
            x: config.position.x,
            y: config.position.y
          })
        }
      } catch {
        console.log('error')
      }
    })
    //关闭窗口
    ipcMain.on('window-all-closed', () => {
      this.WIN_INST = null
      if (process.platform !== 'darwin') {
        app.quit()
      }
    })

    //
    //关闭窗口
    ipcMain.on('save-file', (event, content: string) => {
      if (this.WIN_INST) {
        saveToFile(this.WIN_INST, content)
      }
    })
    ipcMain.on('open-excel', (event) => {
      if (this.WIN_INST) {
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

export default WinMain