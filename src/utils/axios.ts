import axios, { AxiosRequestConfig } from 'axios'
import { ipcRenderer } from 'electron'
import { ElNotification } from 'element-plus'
let baseURL = 'dev/api/data/v9.2'
if(import.meta.env.MODE !== 'development'){
  baseURL='https://orgb98b7aba.crm5.dynamics.com/api/data/v9.2'
}
// 创建 axios 请求实例
const instance = axios.create({
  baseURL: baseURL,
  timeout: 10000*60,
  withCredentials: true
})

// 创建请求拦截
instance.interceptors.request.use(
  (config) => {
    // 设置请求头
    const token = sessionStorage.getItem('token')
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json'
    }
    Object.assign(config.headers, {
      Authorization: `Bearer  ${token}`
    })
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// 创建响应拦截
instance.interceptors.response.use(
  (res) => {
    return res.data
  },
  (error) => {
    let message = ''
    if (error && error.response) {
      switch (error.response.status) {
        case 302:
          message = '接口重定向了！'
          break
        case 304:
          message = '数据为修改成功！'
          break
        case 400:
          message = '参数不正确！' + error.response?.data?.error?.message
          break
        case 401:
          ipcRenderer.send('login-request')
          message = '无权限访问401' + error.response?.data?.error?.message
          break
        case 403:
          message = '您没有权限操作！'+ error.response?.data?.error?.message
          break
        case 404:
          message = '请求地址出错'+ error.response?.data?.error?.message
          break
        case 408:
          message = '请求超时！'+ error.response?.data?.error?.message
          break
        case 409:
          message = '系统已存在相同数据！'+ error.response?.data?.error?.message
          break
        case 412:
          message = '重复的提交!'+ error.response?.data?.error?.message
          break
        case 413:
          message = '数据量超过限制!'+ error.response?.data?.error?.message
          break
        case 500:
          message = '服务器内部错误！'+ error.response?.data?.error?.message
          break
        case 501:
          message = '服务未实现！'+ error.response?.data?.error?.message
          break
        case 502:
          message = '网关错误！'+ error.response?.data?.error?.message
          break
        case 503:
          message = '服务不可用！'+ error.response?.data?.error?.message
          break
        case 504:
          message = '服务暂时无法访问，请稍后再试！'+ error.response?.data?.error?.message
          break
        case 505:
          message = 'HTTP 版本不受支持！'+ error.response?.data?.error?.message
          break
        default:
          message = '异常问题，请联系管理员！'+ error.response?.data?.error?.message
          break
      }
    }
    ElNotification.error({
      message: message || error.message
    })
    return Promise.reject({
      //
      code: error?.response?.status || 500,
      message: message || error.message
    })
  }
)

const request = async <T>(config: AxiosRequestConfig): Promise<T> => {
  return instance(config)
}

export default request
