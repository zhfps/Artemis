import { BrowserWindow, type BrowserWindowConstructorOptions } from 'electron'
import Config from '../config/Config'
import LoggerFactory from '../logger/logger'
import { WinEvent } from '../listeners/event '
import { Handler } from '../listeners/handler'

class WinMain {
  /** 窗口实例 */
  private static WIN_INST: BrowserWindow | null = null
  private static WIN_Event: WinEvent | null = null
  private static WIN_Handler: Handler | null = null
  private static logger: LoggerFactory | null = null

  /** 窗口配置 */
  private static WIN_CONFIG: BrowserWindowConstructorOptions = {
    title: Config.getAppTitle(), // 如果由 loadURL() 加载的 HTML 文件中含有标签 <title>，此属性将被忽略
    icon: Config.APP_LOGO,
    show: false, // 是否在创建时显示, 默认值为 true
    frame: false, // 是否有边框
    center: true, // 是否在屏幕居中
    hasShadow: true, // 窗口是否有阴影. 默认值为 true
    resizable: true, // 是否允许拉伸大小
    fullscreenable: true, // 是否允许全屏，为 false 则插件
    fullscreen:false,
    autoHideMenuBar: true, // 自动隐藏菜单栏, 除非按了 Alt 键, 默认值为 false
    backgroundColor: 'rgba(255,255,255,0)', // 背景颜色
    width: 1050,
    height: 750,
    minHeight: 600,
    minWidth: 800,
    transparent: true,
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
    this.logger?.log('[show main win] ', key)
    this.WIN_INST?.show()
    this.WIN_INST?.focus()
    center && this.WIN_INST?.center()
  }

  /** 创建窗口 */
  static create() {
    //
    if (this.WIN_INST) return

    this.WIN_INST = new BrowserWindow(this.WIN_CONFIG)
    // 设置最小宽高
    this.WIN_INST.setMinimumSize(800, 600)

    if (Config.IS_DEV_MODE) {
      this.WIN_INST.loadURL(Config.WIN_URL)
    } else {
      this.WIN_INST.loadFile(Config.WIN_URL)
    }
    // 在窗口的控制台中使用 F5 刷新时，也会触发该事件
    this.WIN_INST.on('ready-to-show', () => {
      this.show('win=>ready-to-show', true)
    })

    // 窗口-已关闭
    this.WIN_INST.on('closed', () => (this.WIN_INST = null))

    this.WIN_INST.on('resize', () => {
      if (!this.WIN_INST?.isMaximized()) {
        const newSize = this.WIN_INST?.getSize()
        if (newSize) {
         //
        }

      }
      // 在这里执行你的自定义逻辑
    })
    // 事件监听器
    this.WIN_Event = new WinEvent(this.WIN_INST)
    this.WIN_Handler = new Handler(this.WIN_INST)
    // logger
    this.logger = new LoggerFactory('WinMain')
    //
    this.eventListening()
  }

  /** 打开控制台 */
  static openDevTools() {
    if (!this.WIN_INST) return
    const winCtns = this.WIN_INST.webContents
    if (winCtns.isDevToolsOpened()) return
    winCtns.openDevTools({ mode: 'undocked' })
  }
  /** 监听通信事件 */
  static eventListening() {
    //
    // useUpdater(this.WIN_INST)
    
    // events
    this.WIN_Event?.vueBus()
    this.WIN_Event?.setMinSize()
    this.WIN_Event?.setWinSize()
    this.WIN_Event?.setMinimize()
    this.WIN_Event?.openDevtools()
    this.WIN_Event?.setTitle()
    this.WIN_Event?.isFullScreen()
    this.WIN_Event?.setMaximize()
    this.WIN_Event?.restoreScreen()
    this.WIN_Event?.closeWin()
    this.WIN_Event?.saveFileTo()
    this.WIN_Event?.openFileByExcel()
    // handler
    this.WIN_Handler?.winMove()
  }
}
export default WinMain