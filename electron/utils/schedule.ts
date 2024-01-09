import cron from 'node-cron'

import Store from 'electron-store'
import { Login } from '../msal/Login'
const store = new Store()

const login  = new Login()

/**
 * 定时刷新token
 */
const task = cron.schedule('5 * * * * *', () =>  {
  console.log(store.get('token')) 
   const res = login.refreshToken(store.get('token') as string || '')
   console.log(res)
  }, {
    scheduled: false
  })

/**
 * 
 */
export function refreshToken() {
    //
    task.start()
}
 