
import logger from 'electron-log'

/** 可选项, 调用后可在渲染进程使用 window.__electronLog */
logger.initialize()

/** 设置日志文件等级, 默认为 silly */
logger.transports.file.level = 'info'

/**
 * 设置日志文件大小 1048576 (1M)
 * 达到规定大小, 备份文件并重命名为 {name}.old.log
 * 有且仅有一个备份日志文件
 */
logger.transports.file.maxSize = 1048576

/** 设置日志文件的数据格式 */
logger.transports.file.format = '[{y}-{m}-{d} {h}:{i}:{s}.{ms}] {text}'

/** 设置日志控制台等级, 默认为 silly */
logger.transports.console.level = 'info'
//
logger.transports.console.format = '[{h}:{i}:{s}.{ms}] {text}'

/** 日志工厂 */
export default class LogFactory {
  /** 文件名称 */
  private fileName: string
  /** 日志器实例 */
  private logInst: logger.MainLogger | null
  //
  private static logger: LogFactory

  /** 构造函数 */
  constructor(name: string) {
    this.fileName = name + '.log'
    this.logInst = logger.create({ logId: name })
    this.logInst.transports.file.fileName = this.fileName
    this.logInst.transports.file.format = '[{y}-{m}-{d} {h}:{i}:{s}.{ms}] {text}'
    this.logInst.transports.console.level = false
    // 禁止修改
    Object.freeze(this)
  }

  static getInstance(fileName: string): LogFactory {
    if (!LogFactory.logger) {
      this.logger = new LogFactory(fileName)
    }
    return this.logger
  }

  /** 统一处理, 可在这里对日志进行加密 */
  private handle(type: string, ...params: any[]) {
    try {
      // @ts-ignore
      this.logInst[type]('\n', ...params, '\n')
    } catch (reason: any) {
      console.log('\n\n[LogFactory.handle] ', reason)
    }
  }

  log(...params: any[]) {
    this.handle('log', ...params)
  }
  info(...params: any[]) {
    this.handle('info', ...params)
  }
  error(...params: any[]) {
    this.handle('error', ...params)
  }
  warn(...params: any[]) {
    this.handle('warn', ...params)
  }
  verbose(...params: any[]) {
    this.handle('verbose', ...params)
  }
  debug(...params: any[]) {
    this.handle('debug', ...params)
  }
  silly(...params: any[]) {
    this.handle('silly', ...params)
  }
}
