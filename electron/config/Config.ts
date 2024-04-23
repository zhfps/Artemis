/**
 * 全局配置
 */

import NodeOS from 'node:os'
import NodePath from 'node:path'
import { config } from 'dotenv'
import { app, screen, BrowserWindow } from 'electron'
import PKG from '../../package.json'

class Config {

  /** 是否为 Windows 平台 */
  static readonly IS_WIN32 = process.platform === 'win32'
  /** 是否为 macOS 平台 */
  static readonly IS_MACOS = process.platform === 'darwin'
  /** 是否为 Linux 平台 */
  static readonly IS_LINUX = process.platform === 'linux'
  /** 是否为开发模式 */
  static readonly IS_DEV_MODE = !app.isPackaged
  /** 项目名称 */
  static readonly PROJECT_NAME = PKG.name

  static readonly DIR_APP = app.getAppPath()
  /** 静态资源目录 */
  static readonly DIR_STATIC = NodePath.resolve(this.DIR_APP, 'static')
  /** 存放资源文件的目录 */
  static readonly DIR_RESOURCES = NodePath.resolve(this.DIR_APP, this.IS_DEV_MODE ? '' : 'resources')
  /** 根目录/安装目录 */
  static readonly DIR_ROOT = this.IS_DEV_MODE ? this.DIR_APP : NodePath.resolve(this.DIR_RESOURCES, '..')
  /** 图标路径 */
  static readonly LOGO_PATH =  this.IS_DEV_MODE ? NodePath.resolve(this.DIR_APP,  'public/favicon.ico') : NodePath.resolve(this.DIR_APP, NodePath.join('dist', 'favicon.ico'))
  static readonly DB_PATH =  this.IS_DEV_MODE ? NodePath.resolve(this.DIR_APP,  'public/database.db') : NodePath.resolve(this.DIR_APP, NodePath.join('dist', 'database.db'))
  /** 客户端图标 APP_LOGO */
  static readonly APP_LOGO = Config.LOGO_PATH
  /** 客户端图标 DOCKER_LOGO */
  static readonly DOCKER_LOGO =  Config.LOGO_PATH
  /** 运行地址 */
  static readonly WIN_URL = this.IS_DEV_MODE
    ? 'http://localhost:2345'
    : NodePath.join(this.DIR_APP, 'dist', 'index.html')
  /**
   * 加载环境变量, 默认为 .env 文件
   * 若要打包后在主进程中也能访问环境变量, 需要将配置文件一起打包
   * 在 package.json 的 build.files 中添加文件名即可
   */
  static loadEnvFile() {
    if (this.IS_DEV_MODE) {
      config()
    } else {
      config({ path: NodePath.resolve(this.DIR_APP, '.env') })
    }
  }

  /** 程序名称 */
  static getAppTitle() {
    return process.env.VITE_APP_TITLE || this.PROJECT_NAME
  }

  /** 本地日志路径 */
  static getLocalLogsPath() {
    switch (true) {
      case this.IS_WIN32:
        return app.getPath('logs')
      case this.IS_MACOS:
        return NodePath.join(NodeOS.homedir(), 'Library/Logs', this.PROJECT_NAME)
    }
    return ''
  }

  /** 根据分辨率适配窗口大小 */
  static adaptByScreen(dto: WinStateDTO, win: BrowserWindow | null) {
    const devWidth = 1920
    const devHeight = 1080
    /** 显示器工作区域大小 */
    const workAreaSize = screen.getPrimaryDisplay().workAreaSize
    const zoomFactor = Math.max(workAreaSize.width / devWidth, workAreaSize.height / devHeight)
    const realSize = { width: 0, height: 0 }
    realSize.width = Math.round(dto.width * zoomFactor)
    realSize.height = Math.round(dto.height * zoomFactor)
    win?.webContents.setZoomFactor(zoomFactor)
    return realSize
  }
}

export default Config