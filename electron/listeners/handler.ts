import { BrowserWindow, ipcMain, screen } from 'electron'
//
import LocalDataBase from '../database'
//
import { request } from '../api'
//
import { AxiosRequestConfig } from 'axios'
/**
 * Handler
 */
export class Handler{
  //
  private win: BrowserWindow | null
  //
  private moveFlag: NodeJS.Timeout | null = null
  //
  constructor(win: BrowserWindow | null) {
    this.win = win
  }
  // 窗口移动监听
  winMove(){
    if (this.win) {
        ipcMain.handle('window-move-open', (_event, canMoving) => {
            //
            let winStartPosition = { x: 0, y: 0 }
            //
            let mouseStartPosition = { x: 0, y: 0 }
            // 获取当前聚焦的窗口
            const currentWindow = this.win || BrowserWindow.getFocusedWindow()
            //
            if (currentWindow) {
                if (canMoving) {
                    //
                    const currentWindowSize = currentWindow.getSize()
                    // 读取原位置
                    const winPosition = currentWindow.getPosition()
                    //
                    winStartPosition = { x: winPosition[0], y: winPosition[1] }
                    //
                    mouseStartPosition = screen.getCursorScreenPoint()
                    // 清除旧的定时器
                    if (this.moveFlag) {
                      //
                      clearInterval(this.moveFlag)
                    }
                    // 创建定时器，每10毫秒更新一次窗口位置，保证一致
                    this.moveFlag = setInterval(() => {
                        // 窗口销毁判断，高频率的更新有可能窗口已销毁，定时器还没结束，此时就会出现执行销毁窗口方法的错误
                        if (!currentWindow.isDestroyed()) {
                            // 如果窗口失去焦点，则停止移动
                            if (!currentWindow.isFocused()) {
                                // @ts-ignore
                                clearInterval(this.moveFlag)
                                this.moveFlag = null
                            }
                            // 实时更新位置
                            const cursorPosition = screen.getCursorScreenPoint()
                            const x =
                                winStartPosition.x + cursorPosition.x - mouseStartPosition.x
                            const y =
                                winStartPosition.y + cursorPosition.y - mouseStartPosition.y
                            // 更新位置的同时设置窗口原大小， windows上设置=>显示设置=>文本缩放 不是100%时，窗口会拖拽放大
                            currentWindow.setBounds({
                                x: x,
                                y: y,
                                width: currentWindowSize[0],
                                height: currentWindowSize[1],
                            })
                        }
                    }, 10)
                } else {
                    if (this.moveFlag) {
                        clearInterval(this.moveFlag)
                        this.moveFlag = null
                    }
                }
            }
        })
    }
  }
  //
  insert(){
    ipcMain.handle('insert-row', async (_event, args: { name: string, data: unknown}) => {
        return LocalDataBase.insert(args.name,args.data)
    }) 
  }
  //
  update(){
    ipcMain.handle('update-price', async (_event, args: { id: string, price: number, UpDate: number}) => {
        return LocalDataBase.price(args)
    }) 
  }
  //
  product(){
    ipcMain.handle('product', async (_event, args: { id: string}) => {
        return LocalDataBase.product(args.id)
    }) 
  }
  count(){
    ipcMain.handle('count', async () => {
        return LocalDataBase.count()
    })    
  }
  upCount(){
    ipcMain.handle('upCount', async () => {
        return LocalDataBase.upCount()
    })
  }
  productList(){
    ipcMain.handle('productList', async(_event, args: { page: number, pageSize: number}) =>{
        return LocalDataBase.productList(args.page,args.pageSize)
    })  
  }
  productUpList(){
    ipcMain.handle('productUpList', async(_event, args: { page: number, pageSize: number}) =>{
        return LocalDataBase.productUpList(args.page,args.pageSize)
    })
  }
  apiRequest(){
    ipcMain.handle('api-request',async(_event, config: AxiosRequestConfig) =>{
        return request(config)
    }) 
  }
}