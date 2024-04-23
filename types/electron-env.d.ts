/// <reference types="vite-plugin-electron/electron-env" />

declare namespace NodeJS {
  interface ProcessEnv {
    VSCODE_DEBUG?: 'true'
    DIST_ELECTRON: string
    DIST: string
    /** /dist/ or /public/ */
    VITE_PUBLIC: string
  }
}
/** 设置窗口状态 */
interface WinStateDTO {
  width: number
  height: number
  center: boolean
  maxable: boolean
  resizable: boolean
}